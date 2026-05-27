import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

// 1. Establish Zod schema for runtime payload validation
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(100, { message: "Name is too long." }),
  email: z.string().email({ message: "Please enter a valid corporate email address." }).max(150, { message: "Email is too long." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(2000, { message: "Message is too long." }),
  quoteSummary: z.string().max(1000, { message: "Quote summary is too long." }).optional(),
  confirm_corporate_website: z.string().max(200, { message: "Confirm URL is too long." }).optional(),
});

export async function POST(request: Request) {
  try {
    // 1.5 Rate Limiting
    // Extract IP address from standard proxy headers or fallback
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown_ip";
    const now = Date.now();

    if (ip !== "unknown_ip") {
      const timestamps = rateLimitMap.get(ip) || [];
      // Filter out timestamps older than the window
      const recentTimestamps = timestamps.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW_MS);

      if (recentTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
        return NextResponse.json(
          { success: false, error: "Too many requests. Please try again later." },
          { status: 429 } // 429 Too Many Requests
        );
      }

      // Add current request timestamp
      recentTimestamps.push(now);
      rateLimitMap.set(ip, recentTimestamps);
    }


    const rawData = await request.json();

    // 2. Perform Honeypot verification (silently discard bots)
    if (rawData.confirm_corporate_website) {
      console.log("Honeypot triggered! Bot submission rejected silently.");
      return NextResponse.json({
        success: true,
        message: "Message processed successfully. Secure thread opened.",
        status: "silent_dropped",
      });
    }

    // 3. Validate form data with Zod
    const validation = contactSchema.safeParse(rawData);
    if (!validation.success) {
      const errorMsg = validation.error.issues[0]?.message || "Validation failure.";
      return NextResponse.json(
        { success: false, error: errorMsg },
        { status: 400 }
      );
    }

    const { name, email, message, quoteSummary } = validation.data;

    // 4. Parse Estimator metrics to map into database-safe fields
    let service_tier: "conversion" | "fullstack" | "premium" = "conversion";
    let estimated_budget = 0;

    if (quoteSummary) {
      if (quoteSummary.includes("Tier 2")) {
        service_tier = "fullstack";
      } else if (quoteSummary.includes("Tier 3") || quoteSummary.includes("High-End Motion")) {
        service_tier = "premium";
      }

      const costMatch = quoteSummary.match(/Estimated Investment:\s*\$(\d+)/i);
      if (costMatch) {
        estimated_budget = parseFloat(costMatch[1]);
      }
    }

    // 5. Connect to Supabase via server-side client
    const supabase = createAdminSupabaseClient();

    // 6. Insert lead record into PostgreSQL
    const { error } = await supabase.from("leads").insert({
      name,
      email,
      message,
      subject: quoteSummary || "Direct Contact Form Submission",
      service_tier,
      estimated_budget,
      status: "new",
    });

    if (error) {
      console.error("Supabase error inserting contact lead:", error.message);
      throw new Error(error.message);
    }

    // 7. Fire off background email notification
    if (process.env.RESEND_API_KEY && process.env.ADMIN_EMAIL) {
      // Intentionally avoiding await so we don't block the API response
      resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: [process.env.ADMIN_EMAIL],
        subject: `New Lead: ${name} - ${quoteSummary || 'Direct Contact'}`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Service Tier:</strong> ${service_tier}</p>
          <p><strong>Estimated Budget:</strong> $${estimated_budget}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `
      }).catch(err => {
         console.error("Failed to send background email notification:", err);
      });
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been securely compiled and delivered to Muhammad Rakibul Hasan Shuvo's pipeline.",
    });
  } catch (error: any) {
    console.error("API Error in secure contact handler:", error.message || "Unknown error");
    return NextResponse.json(
      { success: false, error: "Internal compilation failure." },
      { status: 500 }
    );
  }
}
