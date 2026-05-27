import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import { createServerSupabaseClient } from "@/lib/supabase/server";

// Initialize Stripe instance. Pass a fallback key so the server build doesn't crash if env var is missing.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_mock123", {
  apiVersion: "2025-01-27.acacia" as any, // Using type casting to bypass strict apiVersion typing if needed
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    // 1. Verify the webhook signature to ensure it came from Stripe
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (error: any) {
    console.error("Webhook signature verification failed:", error.message);
    return NextResponse.json(
      { error: `Webhook Error: ${error.message}` },
      { status: 400 }
    );
  }

  // 2. Handle specific Stripe events
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        // Connect to Supabase
        const supabase = await createServerSupabaseClient();

        // Example: Update lead or create a new order record based on session data
        // For now, we'll just log it. In a real app, you'd match the session.client_reference_id
        // or customer email to a record in your DB and update its status to 'paid'.

        console.log("Checkout session completed for:", session.customer_email);

        // Optional: Insert into an 'orders' or 'transactions' table
        /*
        await supabase.from("transactions").insert({
          stripe_session_id: session.id,
          amount_total: session.amount_total,
          currency: session.currency,
          customer_email: session.customer_details?.email || session.customer_email,
          status: 'completed',
        });
        */

        break;
      }

      // Add other event types here as needed
      // case "invoice.paid":
      // case "customer.subscription.created":

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // 3. Return a 200 response to acknowledge receipt of the event
    return NextResponse.json({ received: true });

  } catch (error: any) {
    console.error("Error processing webhook event:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
