import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, filePath, fileName } = body

    if (!email || !filePath || !fileName) {
      return NextResponse.json(
        { error: "Missing email or CV file details" },
        { status: 400 }
      )
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          price: process.env.STRIPE_CV_PRICE_ID!,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/?cv=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/?cv=cancelled`,
      metadata: {
        type: "cv_review",
        email,
        file_path: filePath,
        file_name: fileName,
      },
    })

    return NextResponse.json({
      url: session.url,
    })
  } catch (error) {
    console.error("CV checkout error:", error)
    return NextResponse.json(
      { error: "Unable to start CV checkout" },
      { status: 500 }
    )
  }
}