import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

// Prefer NEXT_PUBLIC_SUPABASE_URL everywhere to avoid mismatched projects
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;

if (!SUPABASE_URL) {
  throw new Error(
    "Missing SUPABASE URL. Set NEXT_PUBLIC_SUPABASE_URL (preferred) or SUPABASE_URL.",
  );
}

// Service role for DB query (bypasses RLS)
const supabaseAdmin = createClient(
  SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

// Public client (anon) used only to validate the JWT and get the user
const supabaseAuth = createClient(
  SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

const PRO_STATUSES = new Set(["trialing", "active"]);

function parseMs(iso: string | null | undefined): number | null {
  if (!iso) return null;
  const t = Date.parse(iso);
  return Number.isFinite(t) ? t : null;
}

function isNotExpired(currentPeriodEnd: string | null | undefined) {
  // If your webhook hasn't set this yet, treat as "not expired" and rely on status.
  // If you prefer stricter behavior, change this to `return false;`
  if (!currentPeriodEnd) return true;
  const ms = parseMs(currentPeriodEnd);
  if (ms == null) return true;
  return ms > Date.now();
}

function daysUntilIso(iso: string | null | undefined): number | null {
  const ms = parseMs(iso ?? null);
  if (ms == null) return null;
  const diff = ms - Date.now();
  // clamp so you never show negative days
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice("Bearer ".length).trim()
      : "";

    if (!token) {
      return NextResponse.json(
        {
          isPro: false,
          status: "no_user",
          effectiveStatus: "no_user",
          rawStatus: "no_user",
          reason: "missing_token",
          current_period_end: null,
          stripe_subscription_id: null,
          updated_at: null,
          trialEndsInDays: null,
        },
        { status: 200 },
      );
    }

    // Validate token -> get user
    const { data: userData, error: userErr } =
      await supabaseAuth.auth.getUser(token);

    if (userErr || !userData?.user) {
      console.error("[pro-status] getUser failed", userErr);
      return NextResponse.json(
        {
          isPro: false,
          status: "no_user",
          effectiveStatus: "no_user",
          rawStatus: "no_user",
          reason: "invalid_token",
          current_period_end: null,
          stripe_subscription_id: null,
          updated_at: null,
          trialEndsInDays: null,
        },
        { status: 200 },
      );
    }

    const userId = userData.user.id;

    const { data: row, error } = await supabaseAdmin
      .from("subscriptions")
      .select("status,current_period_end,updated_at,stripe_subscription_id")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      console.error("[pro-status] subscriptions query error:", error);
      return NextResponse.json(
        {
          isPro: false,
          status: "unknown",
          effectiveStatus: "unknown",
          rawStatus: "unknown",
          reason: "db_error",
          current_period_end: null,
          stripe_subscription_id: null,
          updated_at: null,
          trialEndsInDays: null,
        },
        { status: 200 },
      );
    }

    // If there is no row yet, we are not Pro (key signal: “webhook didn’t write”)
    if (!row) {
      console.warn("[pro-status] no subscription row for user:", userId);
      return NextResponse.json(
        {
          isPro: false,
          status: "unknown",
          effectiveStatus: "unknown",
          rawStatus: "unknown",
          reason: "no_row",
          current_period_end: null,
          stripe_subscription_id: null,
          updated_at: null,
          trialEndsInDays: null,
        },
        { status: 200 },
      );
    }

    const rawStatus = String(row.status ?? "unknown");
    const current_period_end = (row.current_period_end ?? null) as
      | string
      | null;
    const notExpired = isNotExpired(current_period_end);

    const isPro = PRO_STATUSES.has(rawStatus) && notExpired;

    // If expired but still marked active/trialing, downgrade to canceled
    const effectiveStatus =
      !notExpired && PRO_STATUSES.has(rawStatus) ? "canceled" : rawStatus;

    const trialEndsInDays =
      effectiveStatus === "trialing" ? daysUntilIso(current_period_end) : null;

    // Helpful debug so you can see exactly what the server is using
    console.log("[pro-status] user:", userId, {
      rawStatus,
      effectiveStatus,
      isPro,
      current_period_end,
      stripe_subscription_id: row.stripe_subscription_id ?? null,
      updated_at: row.updated_at ?? null,
      trialEndsInDays,
    });

    return NextResponse.json(
      {
        isPro,
        status: effectiveStatus, // keep backward compatibility with your existing clients
        effectiveStatus,
        rawStatus,
        current_period_end,
        stripe_subscription_id: row.stripe_subscription_id ?? null,
        updated_at: row.updated_at ?? null,
        trialEndsInDays,
      },
      { status: 200 },
    );
  } catch (e: any) {
    console.error("[pro-status] route error:", e?.message ?? e);
    return NextResponse.json(
      {
        isPro: false,
        status: "unknown",
        effectiveStatus: "unknown",
        rawStatus: "unknown",
        reason: "exception",
        current_period_end: null,
        stripe_subscription_id: null,
        updated_at: null,
        trialEndsInDays: null,
      },
      { status: 200 },
    );
  }
}
