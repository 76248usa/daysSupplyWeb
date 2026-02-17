import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

// Only these count as "pro", *if not expired*

const PRO_STATUSES = new Set(["trialing", "active"]);

function isNotExpired(currentPeriodEnd: string | null | undefined) {
  if (!currentPeriodEnd) return true; // if you don't store it, don't block
  const t = Date.parse(currentPeriodEnd);
  if (!Number.isFinite(t)) return true;
  return t > Date.now();
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const email = (url.searchParams.get("email") || "").trim().toLowerCase();

  if (!email) {
    return NextResponse.json(
      { isPro: false, status: "no_email" },
      { status: 200 },
    );
  }

  // Prefer most recently updated record for that email
  const { data, error } = await supabaseAdmin
    .from("subscriptions")
    .select("status,current_period_end,updated_at")
    .eq("email", email)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("pro-status query error:", error);
    // IMPORTANT: keep status in your client union, or update your union to include db_error
    return NextResponse.json(
      { isPro: false, status: "unknown" },
      { status: 200 },
    );
  }

  const status = (data?.status ?? "unknown") as string;
  const notExpired = isNotExpired(data?.current_period_end ?? null);

  const isPro = PRO_STATUSES.has(status as any) && notExpired;

  // Optional: if expired but status still says active/trialing, you can surface that:
  const effectiveStatus =
    !notExpired && PRO_STATUSES.has(status as any) ? "canceled" : status;

  return NextResponse.json({ isPro, status: effectiveStatus }, { status: 200 });
}
