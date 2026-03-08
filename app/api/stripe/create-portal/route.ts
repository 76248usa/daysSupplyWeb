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

const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
}

const supabaseAuth = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

function jsonNoStore(body: any, status = 200) {
  const res = NextResponse.json(body, { status });
  res.headers.set("Cache-Control", "no-store, max-age=0");
  res.headers.set("Vary", "Authorization");
  return res;
}

export async function GET() {
  return new Response("create-portal OK", { status: 200 });
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

    const { data: rows, error: subErr } = await supabaseAdmin
      .from("subscriptions")
      .select("stripe_customer_id,status,updated_at")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false })
      .limit(1);

    if (subErr) {
      console.error("Portal subscription lookup error:", subErr);
      return jsonNoStore(
        {
          ok: false,
          error: "subscription_lookup_failed",
          detail: subErr.message,
        },
        500,
      );
    }

    const row = rows?.[0];

    if (!row) {
      return jsonNoStore(
        {
          ok: false,
          error: "no_subscription_row",
        },
        404,
      );
    }

    const customerId =
      typeof row.stripe_customer_id === "string" &&
      row.stripe_customer_id.startsWith("cus_")
        ? row.stripe_customer_id
        : null;

    if (!customerId) {
      return jsonNoStore(
        {
          ok: false,
          error: "missing_customer_id",
        },
        400,
      );
    }

    const origin = new URL(req.url).origin;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || origin;

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${appUrl}/app`,
    });

    return jsonNoStore({ ok: true, url: session.url }, 200);
  } catch (err: any) {
    console.error("Stripe portal error:", err);
    return jsonNoStore(
      {
        ok: false,
        error: "portal_failed",
        detail: err?.message ?? String(err),
      },
      500,
    );
  }
}
