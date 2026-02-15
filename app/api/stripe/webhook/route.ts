import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

function normEmail(v: unknown) {
  const s = typeof v === "string" ? v.trim().toLowerCase() : "";
  return s || null;
}

async function upsertSubscriptionRow(payload: {
  email: string | null;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  status: string | null;
  current_period_end: string | null;
  price_id?: string | null;
}) {
  if (!payload.stripe_subscription_id) {
    // Without a subscription id, we can't safely upsert (avoid polluting the table)
    console.warn(
      "Webhook upsert skipped: missing stripe_subscription_id",
      payload,
    );
    return;
  }

  const { error } = await supabaseAdmin.from("subscriptions").upsert(
    {
      email: payload.email,
      stripe_customer_id: payload.stripe_customer_id,
      stripe_subscription_id: payload.stripe_subscription_id,
      status: payload.status,
      current_period_end: payload.current_period_end,
      price_id: payload.price_id ?? null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "stripe_subscription_id" },
  );

  if (error) {
    console.error("Supabase upsert error:", error);
    throw new Error(`Supabase upsert failed: ${error.message}`);
  }
}

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !secret) {
    console.error("Missing stripe-signature or STRIPE_WEBHOOK_SECRET");
    return NextResponse.json(
      { error: "webhook_not_configured" },
      { status: 400 },
    );
  }

  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (err: any) {
    console.error("Invalid webhook signature:", err?.message);
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  try {
    // A) Checkout completion — good moment to record customer/subscription + email
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const email =
        normEmail(session.customer_details?.email) ??
        normEmail(session.customer_email) ??
        normEmail((session.metadata as any)?.email);

      const stripeCustomerId =
        typeof session.customer === "string" ? session.customer : null;

      const stripeSubscriptionId =
        typeof session.subscription === "string" ? session.subscription : null;

      await upsertSubscriptionRow({
        email,
        stripe_customer_id: stripeCustomerId,
        stripe_subscription_id: stripeSubscriptionId,
        status: "checkout_completed",
        current_period_end: null,
      });
    }

    // B) Subscription lifecycle — this is where trialing/active/canceled comes from
    if (
      event.type === "customer.subscription.created" ||
      event.type === "customer.subscription.updated" ||
      event.type === "customer.subscription.deleted"
    ) {
      const sub = event.data.object as Stripe.Subscription;

      const stripeCustomerId =
        typeof sub.customer === "string" ? sub.customer : null;

      // Try to keep email if we stored it earlier via checkout metadata/email.
      // If you later add metadata.email during checkout, this will always be present.
      const email = normEmail((sub.metadata as any)?.email);

      const currentPeriodEnd =
        typeof sub.current_period_end === "number"
          ? new Date(sub.current_period_end * 1000).toISOString()
          : null;

      const priceId = sub.items?.data?.[0]?.price?.id
        ? String(sub.items.data[0].price.id)
        : null;

      await upsertSubscriptionRow({
        email,
        stripe_customer_id: stripeCustomerId,
        stripe_subscription_id: sub.id,
        status: sub.status ?? null,
        current_period_end: currentPeriodEnd,
        price_id: priceId,
      });
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("Webhook handler failed:", err?.message ?? err);
    return NextResponse.json({ error: "webhook_failed" }, { status: 500 });
  }
}
