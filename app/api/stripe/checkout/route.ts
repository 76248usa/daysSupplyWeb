export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY;
if (!key) throw new Error("Missing STRIPE_SECRET_KEY");

const stripe = new Stripe(key);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const price = process.env.STRIPE_PRICE_YEARLY_PRO;
    const appUrl = process.env.APP_URL;

    if (!price)
      return NextResponse.json(
        { error: "Missing STRIPE_PRICE_YEARLY_PRO" },
        { status: 500 },
      );
    if (!appUrl)
      return NextResponse.json({ error: "Missing APP_URL" }, { status: 500 });
    if (!email)
      return NextResponse.json({ error: "Missing email" }, { status: 400 });

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: email,
      line_items: [{ price, quantity: 1 }],
      subscription_data: {
        trial_period_days: 30,
        metadata: { email },
      },
      success_url: `${appUrl}/billing/success`,
      cancel_url: `${appUrl}/pricing?canceled=1`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    // Log full Stripe error details to Vercel logs
    console.error("Stripe checkout error:", {
      message: err?.message,
      type: err?.type,
      code: err?.code,
      statusCode: err?.statusCode,
      requestId: err?.requestId,
      raw: err?.raw,
    });

    // Return more helpful info to the browser (safe subset)
    return NextResponse.json(
      {
        error: err?.message ?? "Checkout failed",
        type: err?.type ?? null,
        code: err?.code ?? null,
        requestId: err?.requestId ?? null,
      },
      { status: 500 },
    );
  }
}
