import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const PRO_STATUSES = new Set(["trialing", "active"]);

export async function GET(req: Request) {
  const url = new URL(req.url);
  const email = (url.searchParams.get("email") || "").trim().toLowerCase();

  if (!email) {
    return NextResponse.json(
      { isPro: false, status: "no_email" },
      { status: 200 },
    );
  }

  const { data, error } = await supabaseAdmin
    .from("subscriptions")
    .select("status,current_period_end,updated_at")
    .eq("email", email)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("pro-status query error:", error);
    return NextResponse.json(
      { isPro: false, status: "db_error" },
      { status: 200 },
    );
  }

  const status = data?.status ?? null;
  const isPro = status ? PRO_STATUSES.has(status) : false;

  return NextResponse.json({ isPro, status }, { status: 200 });
}
