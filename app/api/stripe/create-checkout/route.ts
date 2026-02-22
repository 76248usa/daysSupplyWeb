import { NextResponse } from "next/server";
import Stripe from "stripe";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST() {
  // ✅ Get logged-in Supabase user from cookies (server-side)
  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();

  if (userErr || !user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_URL?.startsWith("http")
      ? process.env.VERCEL_URL
      : `https://${process.env.VERCEL_URL}`;

  const successUrl = `${siteUrl}/app?checkout=success`;
  const cancelUrl = `${siteUrl}/pricing?checkout=cancel`;

  // ✅ Create Stripe Checkout Session with Supabase user id embedded
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],

    success_url: successUrl,
    cancel_url: cancelUrl,

    // 🔑 Primary linkage (easy to read in webhook)
    client_reference_id: user.id,

    // optional convenience (Stripe may prefill)
    customer_email: user.email ?? undefined,

    // ✅ Put user id into metadata too (belt + suspenders)
    subscription_data: {
      metadata: {
        supabase_user_id: user.id,
      },
    },
    metadata: {
      supabase_user_id: user.id,
    },
  });

  return NextResponse.json({ url: session.url });
}
