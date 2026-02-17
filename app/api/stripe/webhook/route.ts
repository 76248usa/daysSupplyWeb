import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

// ---------- Stripe ----------
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// ---------- Supabase (service role) ----------
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

// ---------- Helpers ----------
function normEmail(v: unknown): string | null {
  const s = String(v ?? "")
    .trim()
    .toLowerCase();
  return s ? s : null;
}

function isoFromUnixSeconds(sec: number | null | undefined): string | null {
  if (!sec || !Number.isFinite(sec)) return null;
  return new Date(sec * 1000).toISOString();
}

// ✅ Backfill email from Stripe Customer when webhook payload has no email
async function getCustomerEmail(
  customerId: string | null,
): Promise<string | null> {
  if (!customerId) return null;
  try {
    const c = await stripe.customers.retrieve(customerId);
    if ((c as any)?.deleted) return null;
    return normEmail((c as Stripe.Customer).email);
  } catch (e) {
    console.warn("getCustomerEmail failed:", e);
    return null;
  }
}

// ✅ Pull authoritative period end + price_id from Stripe subscription
async function getSubTimingAndPrice(stripeSubscriptionId: string): Promise<{
  current_period_end: string | null;
  price_id: string | null;
  status: string | null;
}> {
  try {
    const sub = await stripe.subscriptions.retrieve(stripeSubscriptionId);

    const cpe =
      typeof (sub as any).current_period_end === "number"
        ? (sub as any).current_period_end
        : null;

    const current_period_end = cpe ? new Date(cpe * 1000).toISOString() : null;

    const price_id =
      (sub as any)?.items?.data?.[0]?.price?.id ??
      (sub as any)?.items?.data?.[0]?.plan?.id ??
      null;

    const status = (sub as any)?.status ?? null;

    return { current_period_end, price_id, status };
  } catch (e) {
    console.warn("getSubTimingAndPrice failed:", e);
    return { current_period_end: null, price_id: null, status: null };
  }
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
    console.error("Invalid webhook signature:", err?.message);
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      /**
       * 1) Checkout completion
       * Capture email + customer + subscription id as early as possible.
       * ✅ IMPORTANT: write status "trialing" (NOT "unknown") so Home can flip immediately.
       */
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        const stripeCustomerId =
          typeof session.customer === "string" ? session.customer : null;

        const stripeSubscriptionId =
          typeof session.subscription === "string"
            ? session.subscription
            : null;

        if (!stripeSubscriptionId) {
          console.warn("checkout.session.completed: missing subscription id");
          break;
        }

        let email =
          normEmail(session.customer_details?.email) ??
          normEmail(session.customer_email) ??
          normEmail((session.metadata as any)?.email) ??
          null;

        if (!email) {
          email = await getCustomerEmail(stripeCustomerId);
        }

        // Try to fill these right away (nice-to-have)
        const subInfo = await getSubTimingAndPrice(stripeSubscriptionId);

        const { error } = await supabaseAdmin.from("subscriptions").upsert(
          {
            email,
            stripe_customer_id: stripeCustomerId,
            stripe_subscription_id: stripeSubscriptionId,

            // ✅ Make Pro flip immediately after successful checkout
            status: "trialing",

            // nice-to-have if available
            current_period_end: subInfo.current_period_end,
            price_id: subInfo.price_id,

            updated_at: new Date().toISOString(),
          },
          { onConflict: "stripe_subscription_id" },
        );

        if (error) {
          console.error(
            "Supabase upsert error (checkout.session.completed):",
            error,
          );
        }

        break;
      }

      /**
       * 2) Invoice payment succeeded
       * ✅ Set status active + fill current_period_end + price_id reliably from subscription.
       */
      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;

        const stripeCustomerId =
          typeof invoice.customer === "string"
            ? invoice.customer
            : (invoice.customer?.id ?? null);

        const stripeSubscriptionId =
          typeof invoice.subscription === "string"
            ? invoice.subscription
            : (invoice.subscription?.id ?? null);

        if (!stripeSubscriptionId) {
          console.warn("invoice.payment_succeeded: missing subscription id");
          break;
        }

        let email =
          normEmail(invoice.customer_email) ??
          normEmail((invoice as any)?.customer_details?.email) ??
          null;

        if (!email) {
          email = await getCustomerEmail(stripeCustomerId);
        }

        const subInfo = await getSubTimingAndPrice(stripeSubscriptionId);

        const { error } = await supabaseAdmin.from("subscriptions").upsert(
          {
            email,
            stripe_customer_id: stripeCustomerId,
            stripe_subscription_id: stripeSubscriptionId,

            status: "active",

            // ✅ filled from subscription (more reliable than invoice.lines)
            current_period_end: subInfo.current_period_end,

            // ✅ fill price_id too
            price_id: subInfo.price_id,

            updated_at: new Date().toISOString(),
          },
          { onConflict: "stripe_subscription_id" },
        );

        if (error) {
          console.error(
            "Supabase upsert error (invoice.payment_succeeded):",
            error,
          );
        }

        break;
      }

      /**
       * 3) Subscription lifecycle updates
       * Keeps status in sync (trialing/active/past_due/canceled/etc)
       * ✅ Also fills current_period_end + price_id from subscription.
       */
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;

        const stripeSubscriptionId = sub.id ?? null;
        const stripeCustomerId =
          typeof sub.customer === "string"
            ? sub.customer
            : (sub.customer?.id ?? null);

        if (!stripeSubscriptionId) {
          console.warn(`${event.type}: missing subscription id`);
          break;
        }

        const stripeStatus = (sub.status ?? "unknown") as string;

        // Backfill email (subscription objects usually don't include it)
        const email = await getCustomerEmail(stripeCustomerId);

        const subInfo = await getSubTimingAndPrice(stripeSubscriptionId);

        const { error } = await supabaseAdmin.from("subscriptions").upsert(
          {
            email,
            stripe_customer_id: stripeCustomerId,
            stripe_subscription_id: stripeSubscriptionId,

            // Prefer Stripe’s canonical status here
            status: stripeStatus,

            current_period_end: subInfo.current_period_end,
            price_id: subInfo.price_id,

            updated_at: new Date().toISOString(),
          },
          { onConflict: "stripe_subscription_id" },
        );

        if (error) {
          console.error(`Supabase upsert error (${event.type}):`, error);
        }

        break;
      }

      default:
        // ignore
        break;
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err: any) {
    console.error("Webhook handler error:", err?.message || err);
    return NextResponse.json(
      { error: "webhook_handler_failed" },
      { status: 500 },
    );
  }
}
