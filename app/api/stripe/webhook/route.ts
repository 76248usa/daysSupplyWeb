import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

// ---------- Stripe ----------
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// ---------- Supabase (service role) ----------
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

function subscriptionIdFromInvoice(invoice: Stripe.Invoice): string | null {
  const anyInv: any = invoice as any;
  return typeof anyInv.subscription === "string"
    ? (anyInv.subscription as string)
    : (anyInv.subscription?.id ?? null);
}

async function getSubInfo(subId: string): Promise<{
  current_period_end: string | null;
  price_id: string | null;
  status: string | null;
  user_id: string | null;
  stripe_customer_id: string | null;
  cancel_at_period_end: boolean;
}> {
  try {
    const sub = await stripe.subscriptions.retrieve(subId);
    const anySub: any = sub as any;

    console.log("[webhook] sub retrieve:", {
      subId,
      status: sub.status,
      current_period_end: anySub?.current_period_end ?? null,
      cancel_at_period_end: Boolean(anySub?.cancel_at_period_end),
      metadata: sub.metadata,
    });

    const current_period_end =
      typeof anySub?.current_period_end === "number"
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

    const cancel_at_period_end = Boolean(anySub?.cancel_at_period_end);

    return {
      current_period_end,
      price_id,
      status,
      user_id,
      stripe_customer_id,
      cancel_at_period_end,
    };
  } catch (e: any) {
    console.warn("[webhook] getSubInfo failed:", e?.message ?? e);
    return {
      current_period_end: null,
      price_id: null,
      status: null,
      user_id: null,
      stripe_customer_id: null,
      cancel_at_period_end: false,
    };
  }
}

// async function upsertByUserId(userId: string, row: any) {
//   const payload = {
//     user_id: userId,
//     ...row,
//     updated_at: new Date().toISOString(),
//   };

  

  // const { error } = await supabaseAdmin
  //   .from("subscriptions")
  //   .upsert(payload, { onConflict: "user_id" });
  async function upsertByUserId(userId: string, row: any) {
  const payload = {
    user_id: userId,
    ...row,
    updated_at: new Date().toISOString(),
  };

  console.log("[webhook] upsert payload:", payload);   // 👈 ADD HERE

  const { error } = await supabaseAdmin
    .from("subscriptions")
    .upsert(payload, { onConflict: "user_id" });

  if (error) {
    console.error("[webhook] Supabase upsert error:", error, payload);
    throw error;
  }

  console.log("[webhook] ✅ upserted subscriptions row for user:", userId);
}

  if (error) {
    console.error("[webhook] Supabase upsert error:", error, payload);
    throw error;
  }

  console.log("[webhook] ✅ upserted subscriptions row for user:", userId);
}

async function updateByStripeSubscriptionId(subId: string, patch: any) {
  const payload = { ...patch, updated_at: new Date().toISOString() };

  console.log("[webhook] update-by-sub-id payload:", {
    stripe_subscription_id: subId,
    ...payload,
  });

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

async function applySubscriptionUpdate(args: {
  stripeSubscriptionId: string;
  stripeCustomerId: string | null;
  userId: string | null;
  status: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
}) {
  const {
    stripeSubscriptionId,
    stripeCustomerId,
    userId,
    status,
    current_period_end,
    cancel_at_period_end,
  } = args;

  if (userId) {
    const row: any = {
      stripe_customer_id: stripeCustomerId,
      stripe_subscription_id: stripeSubscriptionId,
      status,
      cancel_at_period_end,
    };

    if (current_period_end) {
      row.current_period_end = current_period_end;
    }

    await upsertByUserId(userId, row);
    return;
  }

  console.warn(
    "[webhook] Missing supabase user id; falling back to updateByStripeSubscriptionId",
    { stripeSubscriptionId },
  );

  const patch: any = {
    stripe_customer_id: stripeCustomerId,
    status,
    cancel_at_period_end,
  };

  if (current_period_end) {
    patch.current_period_end = current_period_end;
  }

  await updateByStripeSubscriptionId(stripeSubscriptionId, patch);
}

async function assertNotProcessed(eventId: string): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from("stripe_webhook_events")
    .insert({ id: eventId });

  if (!error) return true;

  const code = (error as any).code;
  if (code === "23505") return false;

  console.error("[webhook] stripe_webhook_events insert failed:", error);
  throw error;
}

// ---------- Handler ----------
export async function GET() {
  return NextResponse.json(
    { ok: true, route: "stripe-webhook" },
    { status: 200 },
  );
}

export async function POST(req: Request) {
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

  try {
    const firstTime = await assertNotProcessed(event.id);
    if (!firstTime) {
      return NextResponse.json(
        { received: true, duplicate: true },
        { status: 200 },
      );
    }
  } catch (e: any) {
    console.error("[webhook] ❌ idempotency check failed:", e?.message ?? e);
    return NextResponse.json({ error: "idempotency_failed" }, { status: 500 });
  }

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

        if (!stripeSubscriptionId) break;

        const subInfo = await getSubInfo(stripeSubscriptionId);
        const effectiveUserId = userId || subInfo.user_id;

        await applySubscriptionUpdate({
          stripeSubscriptionId,
          stripeCustomerId: stripeCustomerId ?? subInfo.stripe_customer_id,
          userId: effectiveUserId,
          status: subInfo.status ?? "trialing",
          current_period_end: subInfo.current_period_end,
          cancel_at_period_end: subInfo.cancel_at_period_end,
        });

        break;
      }

      case "invoice.paid":
      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        const stripeSubscriptionId = subscriptionIdFromInvoice(invoice);

        if (!stripeSubscriptionId) break;

        const subInfo = await getSubInfo(stripeSubscriptionId);

        await applySubscriptionUpdate({
          stripeSubscriptionId,
          stripeCustomerId: subInfo.stripe_customer_id,
          userId: subInfo.user_id,
          status: "active",
          current_period_end: subInfo.current_period_end,
          cancel_at_period_end: subInfo.cancel_at_period_end,
        });

        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const stripeSubscriptionId = subscriptionIdFromInvoice(invoice);

        if (!stripeSubscriptionId) break;

        const subInfo = await getSubInfo(stripeSubscriptionId);

        await applySubscriptionUpdate({
          stripeSubscriptionId,
          stripeCustomerId: subInfo.stripe_customer_id,
          userId: subInfo.user_id,
          status: subInfo.status ?? "past_due",
          current_period_end: subInfo.current_period_end,
          cancel_at_period_end: subInfo.cancel_at_period_end,
        });

        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;

        const stripeSubscriptionId = sub.id ?? null;
        if (!stripeSubscriptionId) break;

        const userId =
          (sub.metadata?.supabase_user_id as string | undefined) ?? null;

        const stripeCustomerId =
          typeof sub.customer === "string"
            ? sub.customer
            : (sub.customer?.id ?? null);

        const status = (sub.status ?? "unknown") as string;

        const anySub: any = sub as any;
        const current_period_end =
          typeof anySub?.current_period_end === "number"
            ? isoFromUnixSeconds(anySub.current_period_end)
            : null;

        const cancel_at_period_end = Boolean(anySub?.cancel_at_period_end);

        await applySubscriptionUpdate({
          stripeSubscriptionId,
          stripeCustomerId,
          userId,
          status,
          current_period_end,
          cancel_at_period_end,
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
