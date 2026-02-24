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

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice("Bearer ".length).trim()
      : "";

    if (!token) {
      return NextResponse.json(
        { isPro: false, status: "no_user", reason: "missing_token" },
        { status: 200 },
      );
    }

    // Validate token -> get user
    const { data: userData, error: userErr } =
      await supabaseAuth.auth.getUser(token);

    if (userErr || !userData?.user) {
      console.error("[pro-status] getUser failed", userErr);
      return NextResponse.json(
        { isPro: false, status: "no_user", reason: "invalid_token" },
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
        { isPro: false, status: "unknown", reason: "db_error" },
        { status: 200 },
      );
    }

    // If there is no row yet, we are not Pro (this is the key signal for “webhook didn’t write”)
    if (!row) {
      console.warn("[pro-status] no subscription row for user:", userId);
      return NextResponse.json(
        { isPro: false, status: "unknown", reason: "no_row" },
        { status: 200 },
      );
    }

    const status = String(row.status ?? "unknown");
    const notExpired = isNotExpired(row.current_period_end ?? null);

    const isPro = PRO_STATUSES.has(status) && notExpired;

    // If expired but still marked active/trialing, downgrade to canceled
    const effectiveStatus =
      !notExpired && PRO_STATUSES.has(status) ? "canceled" : status;

    // Helpful debug so you can see exactly what the server is using
    console.log("[pro-status] user:", userId, {
      status,
      effectiveStatus,
      isPro,
      current_period_end: row.current_period_end ?? null,
      stripe_subscription_id: row.stripe_subscription_id ?? null,
      updated_at: row.updated_at ?? null,
    });

    return NextResponse.json(
      { isPro, status: effectiveStatus },
      { status: 200 },
    );
  } catch (e: any) {
    console.error("[pro-status] route error:", e?.message ?? e);
    return NextResponse.json(
      { isPro: false, status: "unknown", reason: "exception" },
      { status: 200 },
    );
  }
}
