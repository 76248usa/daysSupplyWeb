import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: Stripe.LatestApiVersion,
});

export async function GET() {
  return new Response("create-portal OK", { status: 200 });
}

const supabaseAuth = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice("Bearer ".length).trim()
      : "";

    if (!token) {
      return NextResponse.json({ error: "not_authenticated" }, { status: 401 });
    }

    const { data: userData, error: userErr } =
      await supabaseAuth.auth.getUser(token);

    if (userErr || !userData?.user) {
      return NextResponse.json({ error: "not_authenticated" }, { status: 401 });
    }

    const user = userData.user;
    const origin = new URL(req.url).origin;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || origin;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: user.email ?? undefined,
      line_items: [
        { price: process.env.STRIPE_PRICE_YEARLY_PRO!, quantity: 1 },
      ],
      success_url: `${appUrl}/app?checkout=success`,
      cancel_url: `${appUrl}/app?checkout=cancel`,
      client_reference_id: user.id,
      metadata: { supabase_user_id: user.id },
      subscription_data: { metadata: { supabase_user_id: user.id } },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "checkout_failed", detail: err?.message ?? String(err) },
      { status: 500 },
    );
  }
}
