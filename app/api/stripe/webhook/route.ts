import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@/lib/supabase/server"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

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
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  const supabase = await createClient()

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session

    const userId = session.metadata?.supabase_user_id
    const customerId =
      typeof session.customer === "string" ? session.customer : null
    const subscriptionId =
      typeof session.subscription === "string" ? session.subscription : null

    if (userId) {
      await supabase
        .from("profiles")
        .update({
          plan: "premium",
          stripe_customer_id: customerId,
          stripe_subscription_id: subscriptionId,
        })
        .eq("id", userId)
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription
    const customerId =
      typeof subscription.customer === "string" ? subscription.customer : null

    if (customerId) {
      await supabase
        .from("profiles")
        .update({
          plan: "free",
          stripe_subscription_id: null,
        })
        .eq("stripe_customer_id", customerId)
    }
  }

  return NextResponse.json({ received: true })
}