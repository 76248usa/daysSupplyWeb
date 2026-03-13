"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

export default function UpgradePage() {
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const AUTH_DISABLED = useMemo(
    () => process.env.NEXT_PUBLIC_AUTH_DISABLED === "1",
    [],
  );

  useEffect(() => {
    if (AUTH_DISABLED) {
      setCheckingAuth(false);
      return;
    }

    (async () => {
      const { data } = await supabaseBrowser.auth.getSession();
      const token = data.session?.access_token;

      if (!token) {
        router.replace(`/login?next=${encodeURIComponent("/app/upgrade")}`);
        return;
      }

      setCheckingAuth(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [AUTH_DISABLED]);

  async function startCheckout() {
    if (AUTH_DISABLED) return;

    setLoading(true);
    setError(null);

    try {
      const { data } = await supabaseBrowser.auth.getSession();
      const token = data.session?.access_token;

      if (!token) {
        router.replace(`/login?next=${encodeURIComponent("/app/upgrade")}`);
        return;
      }

      const res = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json?.detail || json?.error || "Checkout failed");
        return;
      }

      if (json?.url) {
        window.location.href = json.url;
        return;
      }

      setError("No checkout URL returned.");
    } catch (e: any) {
      setError(e?.message || String(e));
    } finally {
      setLoading(false);
    }
  }

  if (!AUTH_DISABLED && checkingAuth) {
    return (
      <main className="min-h-screen bg-white text-slate-900">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8">
            <h1 className="text-2xl font-bold text-slate-900">
              Checking sign-in…
            </h1>
            <p className="mt-3 text-slate-600">
              Please wait while we verify your session.
            </p>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-cyan-700">
            Pharmacist Subscription
          </p>

          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Upgrade to Pro
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-700">
            {AUTH_DISABLED
              ? "Pro is enabled in development mode. Checkout is disabled for now."
              : "Start a 1-month free trial. Then $10 per year. Cancel anytime."}
          </p>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900">
              What&apos;s included in Pro
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                "Unlimited insulin calculations",
                "Priming logic included",
                "Expiration-aware day supply",
                "Audit documentation support",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-cyan-100 bg-cyan-50 p-4 text-sm text-slate-700">
              Designed for pharmacists who want faster, more consistent insulin
              day-supply workflow with priming and expiration considerations.
            </div>
          </div>

          <div className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-bold text-slate-900">
                Billing summary
              </h2>

              <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
                <div className="text-sm font-medium text-slate-600">Trial</div>
                <div className="mt-1 text-2xl font-bold text-slate-900">
                  30 days free
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
                <div className="text-sm font-medium text-slate-600">
                  After trial
                </div>
                <div className="mt-1 text-2xl font-bold text-cyan-700">
                  $10/year
                </div>
              </div>

              <p className="mt-4 text-sm text-slate-600">
                Cancel anytime through the billing portal.
              </p>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              {AUTH_DISABLED ? (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                  Checkout disabled (dev). When auth is re-enabled, this button
                  will start Stripe checkout.
                </div>
              ) : (
                <button
                  onClick={startCheckout}
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-cyan-600 px-4 py-3 text-base font-bold text-white transition hover:bg-cyan-700 disabled:opacity-60"
                >
                  {loading
                    ? "Redirecting to secure checkout…"
                    : "Start Free Trial"}
                </button>
              )}

              {!AUTH_DISABLED && error ? (
                <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
                  {error}
                </div>
              ) : null}

              <button
                onClick={() => router.push("/app")}
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Back to App
              </button>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
