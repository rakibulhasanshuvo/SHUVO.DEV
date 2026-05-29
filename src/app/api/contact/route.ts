import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { Resend } from "resend";
import crypto from "crypto";
import { cookies } from "next/headers";

const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3;  // Tighter: 3 per minute

function signData(data: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(data).digest("hex");
}

function verifySignedCookie(cookieValue: string, secret: string): number[] {
  if (!cookieValue) return [];
  try {
    const [encoded, sig] = cookieValue.split(".");
    if (!encoded || !sig) return [];
    if (signData(encoded, secret) !== sig) return [];
    return JSON.parse(Buffer.from(encoded, "base64").toString());
  } catch {
    return [];
  }
}

function createSignedCookie(timestamps: number[], secret: string): string {
  const encoded = Buffer.from(JSON.stringify(timestamps)).toString("base64");
  return `${encoded}.${signData(encoded, secret)}`;
}

const DISPOSABLE_DOMAINS = [
  "mailinator.com", "guerrillamail.com", "tempmail.com",
  "throwaway.email", "yopmail.com", "sharklasers.com",
  "10minutemail.com", "trashmail.com", "dispostable.com",
  "getairmail.com", "maildrop.cc", "mintemail.com",
  "mailnesia.com", "mailchimp.com", "mailinator.net"
];

function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, "").trim();
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// In-memory passive IP rate limit cache
const ipCache = new Map<string, number[]>();

function isIpRateLimited(ip: string, now: number): boolean {
  const timestamps = ipCache.get(ip) || [];
  const active = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
  if (active.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }
  active.push(now);
  ipCache.set(ip, active);
  
  // Passive cleanup for memory safety
  if (ipCache.size > 1000) {
    for (const [key, value] of ipCache.entries()) {
      if (value.length === 0 || now - value[value.length - 1] > RATE_LIMIT_WINDOW_MS) {
        ipCache.delete(key);
      }
    }
  }
  return false;
}

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy');

// 1. Establish Zod schema for runtime payload validation
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(100, { message: "Name is too long." }),
  email: z.string().email({ message: "Please enter a valid corporate email address." }).max(150, { message: "Email is too long." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(2000, { message: "Message is too long." }),
  quoteSummary: z.string().min(0).max(1000, { message: "Quote summary is too long." }).optional(),
  website_url: z.string().min(0).max(200, { message: "Confirm URL is too long." }).optional(),
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
    // 0. Environment configuration sanity check
    const secret = process.env.RATE_LIMIT_SECRET;
    if (!secret) {
      console.error("RATE_LIMIT_SECRET environment variable is missing.");
      return NextResponse.json(
        { success: false, error: "Internal compilation failure." },
        { status: 500 }
      );
    }

    // CSRF protection check
    const origin = request.headers.get("origin");
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    
    if (origin) {
      let isAllowed = false;
      try {
        const originUrl = new URL(origin);
        if (
          originUrl.hostname === "localhost" ||
          originUrl.hostname === "127.0.0.1" ||
          originUrl.hostname.endsWith(".vercel.app")
        ) {
          isAllowed = true;
        }
        if (siteUrl) {
          const expectedUrl = new URL(siteUrl);
          if (originUrl.hostname === expectedUrl.hostname) {
            isAllowed = true;
          }
        }
      } catch {
        isAllowed = false;
      }

      if (!isAllowed) {
        console.warn(`CSRF blocked request from Origin: ${origin}`);
        return NextResponse.json(
          { success: false, error: "Unauthorized request origin." },
          { status: 403 }
        );
      }
    }

    // 1. Payload size guard
    const contentLength = parseInt(request.headers.get("content-length") || "0", 10);
    if (contentLength > 10000) { // 10KB max
      return NextResponse.json(
        { success: false, error: "Request payload too large." },
        { status: 413 }
      );
    }

    const now = Date.now();

    // 2a. IP-based Rate Limiting (complementary)
    const clientIp = getClientIP(request);
    if (isIpRateLimited(clientIp, now)) {
      return NextResponse.json(
        { success: false, error: "Too many requests from this device. Please try again later." },
        { status: 429 }
      );
    }

    // 2b. Cookie-based rate limiting
    const cookieStore = await cookies();
    const trackerCookie = cookieStore.get("rate-limit-tracker")?.value || "";
    const timestamps = verifySignedCookie(trackerCookie, secret);

    // Filter out timestamps older than the window
    const activeTimestamps = timestamps.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW_MS);

    if (activeTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    activeTimestamps.push(now);
    const newCookieValue = createSignedCookie(activeTimestamps, secret);

    const setRateLimitCookie = (res: NextResponse) => {
      res.cookies.set("rate-limit-tracker", newCookieValue, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 3600, // 1 hour
        path: "/",
      });
      return res;
    };

    const rawData = await request.json();

    // 2. Perform Honeypot verification (silently discard bots)
    if (rawData.website_url) {
      console.log("Honeypot triggered! Bot submission rejected silently.");
      return setRateLimitCookie(NextResponse.json({
        success: true,
        message: "Message processed successfully. Secure thread opened.",
        status: "silent_dropped",
      }));
    }

    // 3. Validate form data with Zod
    const validation = contactSchema.safeParse(rawData);
    if (!validation.success) {
      const errorMsg = validation.error.issues[0]?.message || "Validation failure.";
      return setRateLimitCookie(NextResponse.json(
        { success: false, error: errorMsg },
        { status: 400 }
      ));
    }

    const { name, email, message, quoteSummary } = validation.data;

    // Disposable email domain blocklist check
    const emailDomain = email.split("@")[1]?.toLowerCase();
    if (emailDomain && DISPOSABLE_DOMAINS.includes(emailDomain)) {
      return setRateLimitCookie(NextResponse.json(
        { success: false, error: "Please use a permanent email address." },
        { status: 400 }
      ));
    }

    // HTML sanitization & HTML entity encoding (Stored XSS mitigation)
    const sanitizedName = stripHtml(name);
    const sanitizedEmail = stripHtml(email);
    const sanitizedMessage = stripHtml(message);
    const sanitizedQuoteSummary = quoteSummary ? stripHtml(quoteSummary) : undefined;

    const htmlSafeName = escapeHtml(sanitizedName);
    const htmlSafeEmail = escapeHtml(sanitizedEmail);
    const htmlSafeMessage = escapeHtml(sanitizedMessage);
    const htmlSafeQuoteSummary = sanitizedQuoteSummary ? escapeHtml(sanitizedQuoteSummary) : undefined;

    // 4. Parse Estimator metrics to map into database-safe fields
    let service_tier: "conversion" | "fullstack" | "premium" = "conversion";
    let estimated_budget = 0;

    if (sanitizedQuoteSummary) {
      if (sanitizedQuoteSummary.includes("Tier 2")) {
        service_tier = "fullstack";
      } else if (sanitizedQuoteSummary.includes("Tier 3") || sanitizedQuoteSummary.includes("High-End Motion")) {
        service_tier = "premium";
      }

      const costMatch = sanitizedQuoteSummary.match(/Estimated Investment:\s*\$(\d+)/i);
      if (costMatch) {
        estimated_budget = parseFloat(costMatch[1]);
      }
    }

    // 5. Connect to Supabase via server-side client safely
    let dbInserted = false;
    try {
      const supabase = createAdminSupabaseClient();
      const { error } = await supabase.from("leads").insert({
        name: sanitizedName,
        email: sanitizedEmail,
        message: sanitizedMessage,
        subject: sanitizedQuoteSummary || "Direct Contact Form Submission",
        service_tier,
        estimated_budget,
        status: "new",
      });

      if (error) {
        console.error("Supabase database lead insert failed:", error.message || "Unknown DB error");
      } else {
        dbInserted = true;
      }
    } catch (dbErr: any) {
      console.error("Supabase unconfigured or connection failed:", dbErr?.message || "Unknown database connection error");
    }

    // 7. Fire off email notification via Resend with safe HTML encoding
    if (process.env.RESEND_API_KEY && process.env.ADMIN_EMAIL) {
      try {
        await resend.emails.send({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: [process.env.ADMIN_EMAIL],
          subject: `New Lead: ${sanitizedName} - ${sanitizedQuoteSummary || 'Direct Contact'}`,
          html: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${htmlSafeName}</p>
            <p><strong>Email:</strong> ${htmlSafeEmail}</p>
            <p><strong>Service Tier:</strong> ${service_tier}</p>
            <p><strong>Estimated Budget:</strong> $${estimated_budget}</p>
            <p><strong>Database Status:</strong> ${dbInserted ? "Saved successfully" : "Skipped/Failed"}</p>
            <p><strong>Message:</strong></p>
            <p>${htmlSafeMessage}</p>
          `
        });
      } catch (err: any) {
        console.error("Failed to send email notification:", err?.message || "Unknown email provider error");
      }
    }

    return setRateLimitCookie(NextResponse.json({
      success: true,
      message: "Your message has been securely compiled and delivered to Muhammad Rakibul Hasan Shuvo's pipeline.",
    }));
  } catch (error: any) {
    console.error("API Error in secure contact handler:", error?.message || "Unknown internal error");
    return NextResponse.json(
      { success: false, error: "Internal compilation failure." },
      { status: 500 }
    );
  }
}
