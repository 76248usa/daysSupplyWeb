import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
if (!STRIPE_SECRET_KEY) throw new Error("Missing STRIPE_SECRET_KEY");

const stripe = new Stripe(STRIPE_SECRET_KEY);

const SUPABASE_URL =
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!SUPABASE_URL) throw new Error("Missing SUPABASE_URL");

const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!SUPABASE_ANON_KEY) throw new Error("Missing SUPABASE_ANON_KEY");

const supabaseAuth = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

function jsonNoStore(body: any, status = 200) {
  const res = NextResponse.json(body, { status });
  res.headers.set("Cache-Control", "no-store, max-age=0");
  res.headers.set("Vary", "Authorization");
  return res;
}

export async function GET() {
  return new Response("create-checkout OK", { status: 200 });
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice("Bearer ".length).trim()
      : "";

    if (!token) {
      return jsonNoStore({ ok: false, error: "not_authenticated" }, 401);
    }

    const { data: userData, error: userErr } =
      await supabaseAuth.auth.getUser(token);

    if (userErr || !userData?.user) {
      return jsonNoStore({ ok: false, error: "not_authenticated" }, 401);
    }

    const user = userData.user;

    const origin = new URL(req.url).origin;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || origin;

    // const priceId = process.env.STRIPE_PRICE_YEARLY_PRO;
    // if (!priceId || !priceId.startsWith("price_")) {
    //   return jsonNoStore(
    //     {
    //       ok: false,
    //       error: "missing_or_invalid_price",
    //       detail: "Missing or invalid STRIPE_PRICE_YEARLY_PRO",
    //       priceId: priceId ?? null,
    //     },
    //     500,
    //   );
    // }

    // const session = await stripe.checkout.sessions.create({
    //   mode: "subscription",
    //   customer_email: user.email ?? undefined,
    //   line_items: [{ price: priceId, quantity: 1 }],
    //   success_url: `${appUrl}/app?checkout=success`,
    //   cancel_url: `${appUrl}/app?checkout=cancel`,
    //   client_reference_id: user.id,
    //   metadata: { supabase_user_id: user.id },
    //   subscription_data: { metadata: { supabase_user_id: user.id } },
    // });

    const priceId = process.env.STRIPE_PRICE_YEARLY_PRO;

    console.log("STRIPE_PRICE_YEARLY_PRO =", JSON.stringify(priceId));
    console.log(
      "STRIPE_SECRET_KEY prefix =",
      process.env.STRIPE_SECRET_KEY?.slice(0, 8),
    );

    if (
      !priceId ||
      typeof priceId !== "string" ||
      !priceId.startsWith("price_")
    ) {
      return NextResponse.json(
        { error: "missing_or_invalid_price", priceId: priceId ?? null },
        { status: 500 },
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: user.email ?? undefined,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/app?checkout=success`,
      cancel_url: `${appUrl}/app?checkout=cancel`,
      client_reference_id: user.id,
      metadata: { supabase_user_id: user.id },
      subscription_data: { metadata: { supabase_user_id: user.id } },
    });

    return jsonNoStore({ ok: true, url: session.url }, 200);
  } catch (err: any) {
    console.error("Stripe checkout error:", err);
    return jsonNoStore(
      {
        ok: false,
        error: "checkout_failed",
        detail: err?.message ?? String(err),
      },
      500,
    );
  }
}
