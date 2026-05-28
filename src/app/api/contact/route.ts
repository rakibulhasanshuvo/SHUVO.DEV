import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { Resend } from "resend";

// Basic in-memory rate limiting map
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy');

// 1. Establish Zod schema for runtime payload validation
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(100, { message: "Name is too long." }),
  email: z.string().email({ message: "Please enter a valid corporate email address." }).max(150, { message: "Email is too long." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(2000, { message: "Message is too long." }),
  quoteSummary: z.string().min(0).max(1000, { message: "Quote summary is too long." }).optional(),
  confirm_corporate_website: z.string().min(0).max(200, { message: "Confirm URL is too long." }).optional(),
});

/**
 * Safely extracts client IP address preventing HTTP header spoofing.
 */
function getClientIP(request: Request): string {
  const xRealIp = request.headers.get("x-real-ip");
  if (xRealIp) return xRealIp.trim();

  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    const ips = xForwardedFor.split(",");
    const clientIp = ips[0]?.trim();
    if (clientIp) return clientIp;
  }

  return "unknown_ip";
}

export async function POST(request: Request) {
  try {
    // 1.5 Rate Limiting with Spoofing Protection
    const ip = getClientIP(request);
    const now = Date.now();

    if (ip !== "unknown_ip") {
      // Memory leak mitigation sweep: evict expired IPs when Map reaches threshold size
      if (rateLimitMap.size > 1000) {
        const nowTime = Date.now();
        for (const [key, timestamps] of rateLimitMap.entries()) {
          const active = timestamps.filter(timestamp => nowTime - timestamp < RATE_LIMIT_WINDOW_MS);
          if (active.length === 0) {
            rateLimitMap.delete(key);
          } else {
            rateLimitMap.set(key, active);
          }
        }
      }

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

    // 5. Connect to Supabase via server-side client safely
    // Wrap database write in separate try/catch so database failures don't drop lead emails
    let dbInserted = false;
    try {
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
        console.error("Supabase database lead insert failed:", error.message);
      } else {
        dbInserted = true;
      }
    } catch (dbErr: any) {
      console.error("Supabase unconfigured or connection failed. Bypassing database lead save:", dbErr?.message || dbErr);
    }

    // 7. Fire off email notification via Resend
    if (process.env.RESEND_API_KEY && process.env.ADMIN_EMAIL) {
      try {
        await resend.emails.send({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: [process.env.ADMIN_EMAIL],
          subject: `New Lead: ${name} - ${quoteSummary || 'Direct Contact'}`,
          html: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Service Tier:</strong> ${service_tier}</p>
            <p><strong>Estimated Budget:</strong> $${estimated_budget}</p>
            <p><strong>Database Status:</strong> ${dbInserted ? "Saved successfully" : "Skipped/Failed"}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `
        });
      } catch (err: any) {
        console.error("Failed to send email notification:", err?.message || err);
      }
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
