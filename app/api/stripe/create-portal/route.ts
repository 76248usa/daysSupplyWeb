import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Service role for DB lookup
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

// Public client only to validate JWT -> user
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

    const userId = userData.user.id;

    // Look up the Stripe customer id for this user
    const { data: subRow, error: subErr } = await supabaseAdmin
      .from("subscriptions")
      .select("stripe_customer_id")
      .eq("user_id", userId)
      .maybeSingle();

    if (subErr) {
      console.error("[portal] subscriptions lookup error:", subErr);
      return NextResponse.json({ error: "db_error" }, { status: 500 });
    }

    const customerId = subRow?.stripe_customer_id;
    if (!customerId) {
      return NextResponse.json(
        { error: "no_subscription", detail: "No Stripe customer found." },
        { status: 400 },
      );
    }

    const origin = new URL(req.url).origin;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || origin;

    // Create Stripe Billing Portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${appUrl}/app`,
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (err: any) {
    console.error("[portal] error:", err);
    return NextResponse.json(
      { error: "portal_failed", detail: err?.message ?? String(err) },
      { status: 500 },
    );
  }
}
