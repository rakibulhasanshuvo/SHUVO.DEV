import { NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseClient } from "@/lib/supabase/server";

// 1. Establish Zod schema for runtime payload validation
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid corporate email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  quoteSummary: z.string().optional(),
  confirm_corporate_website: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const rawData = await request.json();

    // 2. Perform Honeypot verification (silently discard bots)
    if (rawData.confirm_corporate_website) {
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
    const supabase = await createServerSupabaseClient();

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

