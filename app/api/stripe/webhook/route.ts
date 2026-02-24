import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

// ---------- Stripe ----------
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// ---------- Supabase (service role) ----------
// Use ONE consistent URL (same project as your app)
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;

if (!SUPABASE_URL) {
  throw new Error(
    "Missing Supabase URL. Set NEXT_PUBLIC_SUPABASE_URL (preferred) or SUPABASE_URL.",
  );
}
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY env var.");
}

const supabaseAdmin = createClient(
  SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

// ---------- Helpers ----------
function isoFromUnixSeconds(sec: number | null | undefined): string | null {
  if (!sec || typeof sec !== "number") return null;
  return new Date(sec * 1000).toISOString();
}

function getPriceIdFromSubscription(sub: Stripe.Subscription): string | null {
  const anySub: any = sub as any;
  return (
    anySub?.items?.data?.[0]?.price?.id ??
    anySub?.items?.data?.[0]?.plan?.id ??
    null
  );
}

async function getSubInfo(subId: string): Promise<{
  current_period_end: string | null;
  price_id: string | null;
  status: string | null;
  user_id: string | null;
  stripe_customer_id: string | null;
}> {
  try {
    const sub = await stripe.subscriptions.retrieve(subId);
    const anySub: any = sub as any;

    const current_period_end =
      typeof anySub.current_period_end === "number"
        ? isoFromUnixSeconds(anySub.current_period_end)
        : null;

    const price_id = getPriceIdFromSubscription(sub);
    const status = (sub.status ?? null) as string | null;

    const user_id =
      (sub.metadata?.supabase_user_id as string | undefined) ?? null;

    const stripe_customer_id =
      typeof sub.customer === "string"
        ? sub.customer
        : (sub.customer?.id ?? null);

    return {
      current_period_end,
      price_id,
      status,
      user_id,
      stripe_customer_id,
    };
  } catch (e: any) {
    console.warn("[webhook] getSubInfo failed:", e?.message ?? e);
    return {
      current_period_end: null,
      price_id: null,
      status: null,
      user_id: null,
      stripe_customer_id: null,
    };
  }
}

async function upsertByUserId(userId: string, row: any) {
  // IMPORTANT: Only include columns that actually exist in your table.
  // If your table does not have price_id, remove it (or add the column).
  const payload = {
    user_id: userId,
    ...row,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabaseAdmin
    .from("subscriptions")
    .upsert(payload, { onConflict: "user_id" });

  if (error) {
    console.error("[webhook] Supabase upsert error:", error, payload);
    throw error;
  }

  console.log("[webhook] ✅ upserted subscriptions row for user:", userId);
}

async function updateByStripeSubscriptionId(subId: string, patch: any) {
  const payload = { ...patch, updated_at: new Date().toISOString() };

  const { error } = await supabaseAdmin
    .from("subscriptions")
    .update(payload)
    .eq("stripe_subscription_id", subId);

  if (error) {
    console.error("[webhook] Supabase update-by-sub-id error:", error, payload);
    throw error;
  }

  console.log("[webhook] ✅ updated by stripe_subscription_id:", subId);
}

// ---------- Handler ----------

export async function GET() {
  console.log("🔥 WEBHOOK GET HIT");
  return NextResponse.json(
    { ok: true, route: "stripe-webhook" },
    { status: 200 },
  );
}
export async function POST(req: Request) {
  console.log("🔥 WEBHOOK POST HIT");
  console.log("🔥 WEBHOOK POST HIT", new Date().toISOString());

  console.log(
    "🔥 stripe-signature present?",
    Boolean(req.headers.get("stripe-signature")),
  );
  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "missing_signature" }, { status: 400 });
  }

  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error("[webhook] ❌ Invalid signature:", err?.message ?? err);
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  console.log("🔥 WEBHOOK POST HIT");
  console.log("🔥 EVENT TYPE:", event.type);

  // THIS is the log you should see in your Next.js terminal
  console.log("[webhook] ✅ HIT:", event.type);

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        const stripeSubscriptionId =
          typeof session.subscription === "string"
            ? session.subscription
            : null;

        const stripeCustomerId =
          typeof session.customer === "string" ? session.customer : null;

        const userId =
          (typeof session.client_reference_id === "string" &&
            session.client_reference_id) ||
          (session.metadata?.supabase_user_id as string | undefined) ||
          null;

        console.log("[webhook] checkout.session.completed fields:", {
          stripeSubscriptionId,
          stripeCustomerId,
          client_reference_id: session.client_reference_id,
          metadata: session.metadata,
        });

        if (!stripeSubscriptionId) {
          console.warn(
            "[webhook] checkout.session.completed: missing subscription id",
          );
          break;
        }

        const subInfo = await getSubInfo(stripeSubscriptionId);
        const effectiveUserId = userId || subInfo.user_id;

        if (!effectiveUserId) {
          console.error(
            "[webhook] ❌ Missing supabase user id (session + subscription metadata).",
          );

          // If you have rows keyed by stripe_subscription_id already, this can update them.
          // If not, this won't do anything, but we log it.
          await updateByStripeSubscriptionId(stripeSubscriptionId, {
            stripe_customer_id: stripeCustomerId ?? subInfo.stripe_customer_id,
            status: subInfo.status ?? "trialing",
            current_period_end: subInfo.current_period_end,
            // price_id: subInfo.price_id, // uncomment ONLY if column exists
          });

          break;
        }

        await upsertByUserId(effectiveUserId, {
          stripe_customer_id: stripeCustomerId ?? subInfo.stripe_customer_id,
          stripe_subscription_id: stripeSubscriptionId,
          status: subInfo.status ?? "trialing",
          current_period_end: subInfo.current_period_end,
          // price_id: subInfo.price_id, // uncomment ONLY if column exists
        });

        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;

        const stripeSubscriptionId =
          typeof (invoice as any).subscription === "string"
            ? ((invoice as any).subscription as string)
            : ((invoice as any).subscription?.id ?? null);

        console.log("[webhook] invoice.payment_succeeded fields:", {
          stripeSubscriptionId,
        });

        if (!stripeSubscriptionId) {
          console.warn(
            "[webhook] invoice.payment_succeeded: missing subscription id",
          );
          break;
        }

        const subInfo = await getSubInfo(stripeSubscriptionId);

        if (!subInfo.user_id) {
          console.error(
            "[webhook] ❌ invoice.payment_succeeded: missing supabase_user_id on subscription metadata",
          );
          await updateByStripeSubscriptionId(stripeSubscriptionId, {
            stripe_customer_id: subInfo.stripe_customer_id,
            status: "active",
            current_period_end: subInfo.current_period_end,
            // price_id: subInfo.price_id,
          });
          break;
        }

        await upsertByUserId(subInfo.user_id, {
          stripe_customer_id: subInfo.stripe_customer_id,
          stripe_subscription_id: stripeSubscriptionId,
          status: "active",
          current_period_end: subInfo.current_period_end,
          // price_id: subInfo.price_id,
        });

        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;

        const stripeSubscriptionId = sub.id ?? null;
        const userId =
          (sub.metadata?.supabase_user_id as string | undefined) ?? null;

        const stripeCustomerId =
          typeof sub.customer === "string"
            ? sub.customer
            : (sub.customer?.id ?? null);

        const status = (sub.status ?? "unknown") as string;

        const anySub: any = sub as any;
        const current_period_end =
          typeof anySub.current_period_end === "number"
            ? isoFromUnixSeconds(anySub.current_period_end)
            : null;

        const price_id = getPriceIdFromSubscription(sub);

        console.log(`[webhook] ${event.type} fields:`, {
          stripeSubscriptionId,
          userId,
          stripeCustomerId,
          status,
          current_period_end,
          price_id,
        });

        if (!stripeSubscriptionId) break;

        if (!userId) {
          console.warn(
            `[webhook] ${event.type}: missing supabase_user_id on subscription metadata`,
          );
          await updateByStripeSubscriptionId(stripeSubscriptionId, {
            stripe_customer_id: stripeCustomerId,
            status,
            current_period_end,
            // price_id,
          });
          break;
        }

        await upsertByUserId(userId, {
          stripe_customer_id: stripeCustomerId,
          stripe_subscription_id: stripeSubscriptionId,
          status,
          current_period_end,
          // price_id,
        });

        break;
      }

      default:
        break;
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err: any) {
    console.error("[webhook] ❌ handler failed:", err?.message ?? err);
    return NextResponse.json(
      { error: "webhook_handler_failed" },
      { status: 500 },
    );
  }
}
