import { NextResponse } from "next/server";
import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  throw new Error(
    "Missing STRIPE_SECRET_KEY env var (set it in Vercel Project Settings)",
  );
}
const stripe = new Stripe(key);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

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
    return NextResponse.json(
      { error: err?.message ?? "Unknown error" },
      { status: 500 },
    );
  }
}
