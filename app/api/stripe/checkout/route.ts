import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Basic checks so errors are obvious
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Missing STRIPE_SECRET_KEY" },
        { status: 500 },
      );
    }
    if (!process.env.STRIPE_PRICE_YEARLY_PRO) {
      return NextResponse.json(
        { error: "Missing STRIPE_PRICE_YEARLY_PRO" },
        { status: 500 },
      );
    }
    if (!process.env.APP_URL) {
      return NextResponse.json({ error: "Missing APP_URL" }, { status: 500 });
    }
    if (!email) {
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: email,
      line_items: [{ price: process.env.STRIPE_PRICE_YEARLY_PRO, quantity: 1 }],
      subscription_data: { trial_period_days: 30 },
      success_url: `${process.env.APP_URL}/billing/success`,
      cancel_url: `${process.env.APP_URL}/pricing?canceled=1`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe checkout error:", err?.message, err);
    return NextResponse.json(
      { error: err?.message || "Unknown error" },
      { status: 500 },
    );
  }
}
