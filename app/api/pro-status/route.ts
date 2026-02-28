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

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY env var.");
}

const supabaseAdmin = createClient(
  SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const supabaseAuth = createClient(
  SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

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
          current_period_end: null,
          trialEndsInDays: null,
          reason: "missing_token",
        },
        { status: 200 },
      );
    }

    const { data: userData, error: userErr } =
      await supabaseAuth.auth.getUser(token);

    if (userErr || !userData?.user) {
      return NextResponse.json(
        {
          isPro: false,
          status: "no_user",
          effectiveStatus: "no_user",
          current_period_end: null,
          trialEndsInDays: null,
          reason: "invalid_token",
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
      return NextResponse.json(
        {
          isPro: false,
          status: "unknown",
          effectiveStatus: "unknown",
          current_period_end: null,
          trialEndsInDays: null,
          reason: "db_error",
        },
        { status: 200 },
      );
    }

    if (!row) {
      return NextResponse.json(
        {
          isPro: false,
          status: "unknown",
          effectiveStatus: "unknown",
          current_period_end: null,
          trialEndsInDays: null,
          reason: "no_row",
        },
        { status: 200 },
      );
    }

    const status = String(row.status ?? "unknown");
    const current_period_end =
      (row.current_period_end as string | null) ?? null;

    const notExpired = isNotExpired(current_period_end);
    const isPro = PRO_STATUSES.has(status) && notExpired;

    const effectiveStatus =
      !notExpired && PRO_STATUSES.has(status) ? "canceled" : status;

    const trialEndsInDays =
      effectiveStatus === "trialing" ? calcDaysLeft(current_period_end) : null;

    return NextResponse.json(
      {
        isPro,
        status,
        effectiveStatus,
        current_period_end,
        trialEndsInDays,
        stripe_subscription_id: row.stripe_subscription_id ?? null,
        updated_at: row.updated_at ?? null,
      },
      { status: 200 },
    );
  } catch (e: any) {
    return NextResponse.json(
      {
        isPro: false,
        status: "unknown",
        effectiveStatus: "unknown",
        current_period_end: null,
        trialEndsInDays: null,
        reason: "exception",
      },
      { status: 200 },
    );
  }
}
