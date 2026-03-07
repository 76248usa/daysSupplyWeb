import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;

if (!SUPABASE_URL) {
  throw new Error(
    "Missing SUPABASE URL. Set NEXT_PUBLIC_SUPABASE_URL (preferred) or SUPABASE_URL.",
  );
}

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY env var.");
}

// For server-side auth token validation, prefer a non-public key.
// Keep NEXT_PUBLIC fallback so your current setup keeps working.
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_ANON_KEY) {
  throw new Error(
    "Missing SUPABASE_ANON_KEY (preferred) or NEXT_PUBLIC_SUPABASE_ANON_KEY.",
  );
}

const supabaseAdmin = createClient(
  SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: { persistSession: false, autoRefreshToken: false },
  },
);

const supabaseAuth = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const PRO_STATUSES = new Set(["trialing", "active"]);

function parseMs(iso: string | null | undefined): number | null {
  if (!iso) return null;
  const t = Date.parse(iso);
  return Number.isFinite(t) ? t : null;
}

function isNotExpired(currentPeriodEnd: string | null | undefined) {
  // Keep your prior behavior:
  // if webhook hasn't set it yet, allow status to control access
  if (!currentPeriodEnd) return true;
  const ms = parseMs(currentPeriodEnd);
  if (ms == null) return true;
  return ms > Date.now();
}

function calcDaysLeft(iso: string | null | undefined): number | null {
  const ms = parseMs(iso);
  if (ms == null) return null;
  const diff = ms - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function jsonNoStore(body: any, status = 200) {
  const res = NextResponse.json(body, { status });
  res.headers.set("Cache-Control", "no-store, max-age=0");
  res.headers.set("Vary", "Authorization");
  return res;
}

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice("Bearer ".length).trim()
      : "";

    if (!token) {
      return jsonNoStore(
        {
          ok: true,
          isPro: false,
          status: "no_user",
          effectiveStatus: "no_user",
          current_period_end: null,
          trialEndsInDays: null,
          cancel_at_period_end: false,
          reason: "missing_token",
        },
        200,
      );
    }

    const { data: userData, error: userErr } =
      await supabaseAuth.auth.getUser(token);

    if (userErr || !userData?.user) {
      return jsonNoStore(
        {
          ok: true,
          isPro: false,
          status: "no_user",
          effectiveStatus: "no_user",
          current_period_end: null,
          trialEndsInDays: null,
          cancel_at_period_end: false,
          reason: "invalid_token",
        },
        200,
      );
    }

    const userId = userData.user.id;

    const { data: rows, error } = await supabaseAdmin
      .from("subscriptions")
      .select(
        "status,current_period_end,updated_at,stripe_subscription_id,cancel_at_period_end",
      )
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })
      .limit(1);

    if (error) {
      return jsonNoStore(
        {
          ok: true,
          isPro: false,
          status: "unknown",
          effectiveStatus: "unknown",
          current_period_end: null,
          trialEndsInDays: null,
          cancel_at_period_end: false,
          reason: "db_error",
        },
        200,
      );
    }

    const row = rows?.[0];

    if (!row) {
      return jsonNoStore(
        {
          ok: true,
          isPro: false,
          status: "unknown",
          effectiveStatus: "unknown",
          current_period_end: null,
          trialEndsInDays: null,
          cancel_at_period_end: false,
          reason: "no_row",
        },
        200,
      );
    }

    const status = String(row.status ?? "unknown");
    const current_period_end =
      (row.current_period_end as string | null) ?? null;
    const cancel_at_period_end = Boolean(row.cancel_at_period_end);

    const notExpired = isNotExpired(current_period_end);
    const isPro = PRO_STATUSES.has(status) && notExpired;

    // Preserve your “treat expired pro statuses as canceled”
    const effectiveStatus =
      !notExpired && PRO_STATUSES.has(status) ? "canceled" : status;

    const trialEndsInDays =
      effectiveStatus === "trialing" ? calcDaysLeft(current_period_end) : null;

    return jsonNoStore(
      {
        ok: true,
        isPro,
        status,
        effectiveStatus,
        current_period_end,
        trialEndsInDays,
        cancel_at_period_end,
        updated_at: row.updated_at ?? null,
        // stripe_subscription_id: row.stripe_subscription_id ?? null,
      },
      200,
    );
  } catch {
    return jsonNoStore(
      {
        ok: true,
        isPro: false,
        status: "unknown",
        effectiveStatus: "unknown",
        current_period_end: null,
        trialEndsInDays: null,
        cancel_at_period_end: false,
        reason: "exception",
      },
      200,
    );
  }
}
