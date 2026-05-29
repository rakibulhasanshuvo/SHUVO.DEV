import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    // 1. Verify admin session
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    const adminEmails = (process.env.AUTHORIZED_ADMIN_EMAILS || "hasanshuvo541@gmail.com,m.rakibul.h45@gmail.com")
      .split(",")
      .map(e => e.trim().toLowerCase())
      .filter(Boolean);

    if (!user || !adminEmails.includes(user.email?.toLowerCase() || "")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Retrieve Cloudinary secret settings from environment variables
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || "dv2tnlb40";

    if (!apiSecret || !apiKey) {
      return NextResponse.json({ error: "Cloudinary credentials not configured." }, { status: 503 });
    }

    // 3. Define the upload options to be signed (must exactly match client-side payload)
    const timestamp = Math.round(Date.now() / 1000);
    const params = {
      folder: "shuvo-dev-admin",
      timestamp,
      upload_preset: "ml_default",
    };

    // Sort the parameters and create signature string
    const sortedParams = Object.entries(params)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}=${v}`)
      .join("&");

    const signature = crypto
      .createHash("sha1")
      .update(sortedParams + apiSecret)
      .digest("hex");

    return NextResponse.json({
      signature,
      timestamp,
      apiKey,
      cloudName,
      folder: "shuvo-dev-admin",
      uploadPreset: "ml_default",
    });
  } catch (error: any) {
    console.error("API error during Cloudinary signed parameter generation:", error?.message || error);
    return NextResponse.json({ error: "Signature generation failure." }, { status: 500 });
  }
}
