import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  const body = await request.text()
  const signature = (await headers()).get("stripe-signature")

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error("Webhook signature error:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session

      const userId = session.metadata?.supabase_user_id
      const customerId =
        typeof session.customer === "string" ? session.customer : null
      const subscriptionId =
        typeof session.subscription === "string" ? session.subscription : null

      if (!userId) {
        console.error("Missing supabase_user_id in checkout session metadata")
        return NextResponse.json({ error: "Missing user metadata" }, { status: 400 })
      }

      const { error } = await supabaseAdmin
        .from("profiles")
        .update({
          plan: "premium",
          stripe_customer_id: customerId,
          stripe_subscription_id: subscriptionId,
        })
        .eq("id", userId)

      if (error) {
        console.error("Supabase update error on checkout.session.completed:", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
    }

    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object as Stripe.Subscription
      const customerId =
        typeof subscription.customer === "string" ? subscription.customer : null

      if (!customerId) {
        return NextResponse.json({ received: true })
      }

      const { error } = await supabaseAdmin
        .from("profiles")
        .update({
          plan: "free",
          stripe_subscription_id: null,
        })
        .eq("stripe_customer_id", customerId)

      if (error) {
        console.error("Supabase update error on customer.subscription.deleted:", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error("Webhook handler error:", err)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}