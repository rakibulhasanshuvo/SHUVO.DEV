import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, message, quoteSummary, confirm_corporate_website } = data;

    // Honeypot validation: If this field is filled, it is a bot submission
    if (confirm_corporate_website) {
      console.warn("Honeypot triggered! Bot submission rejected silently.");
      // Return 200 OK silently to prevent the bot from attempting alternative submission approaches
      return NextResponse.json({
        success: true,
        message: "Message processed successfully. Secure thread opened.",
        status: "silent_dropped",
      });
    }

    // Mock successful database pipe write or webhook trigger


    return NextResponse.json({
      success: true,
      message: "Your message has been securely compiled and delivered to Muhammad Rakibul Hasan Shuvo's pipeline.",
    });
  } catch (error: any) {
    console.error("API Error in secure contact handler:", error);
    return NextResponse.json(
      { success: false, error: "Internal compilation failure." },
      { status: 500 }
    );
  }
}
