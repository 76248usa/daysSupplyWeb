"use client";

import { useState } from "react";
import Link from "next/link";

const PLAN_LINE =
  "Start a 1-month free trial. Then $10 per year. Cancel anytime.";

export default function PricingPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function normalizeEmail(raw: string) {
    return raw.trim().toLowerCase();
  }

  function isValidEmail(e: string) {
    return e.includes("@") && e.includes(".") && e.length >= 6;
  }

  async function startTrial() {
    setError(null);

    const e = normalizeEmail(email);
    if (!isValidEmail(e)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: e }),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json?.error ?? "Unable to start checkout.");
        return;
      }

      if (json?.url) {
        localStorage.setItem("ds_email", e);
        localStorage.setItem(
          "ds_last_checkout_started_at",
          new Date().toISOString(),
        );
        window.location.href = json.url;
      } else {
        setError("Checkout link not returned.");
      }
    } catch (err: any) {
      setError(err?.message ?? "Network error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/app"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            ← Back
          </Link>

          <div className="text-xs text-slate-500">
            Secure checkout via Stripe
          </div>
        </div>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-cyan-700">
            Pharmacist Subscription
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Professional Access
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
            Unlimited calculations for insulin day-supply, including priming and
            expiration logic, plus eye and ear drops tools.
          </p>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900">
              Pro Subscription
            </h2>

            <p className="mt-3 text-slate-700">{PLAN_LINE}</p>

            <div className="mt-6 rounded-2xl border border-cyan-100 bg-cyan-50 p-5">
              <div className="text-sm font-medium text-slate-600">Price</div>
              <div className="mt-1 text-4xl font-black text-slate-900">
                $10
                <span className="text-base font-semibold text-slate-500">
                  {" "}
                  / year
                </span>
              </div>
              <div className="mt-2 text-sm text-slate-600">
                1-month free trial • Cancel anytime
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                "Unlimited insulin calculations",
                "Priming-aware dose adjustments",
                "Expiration-based day caps",
                "Supports consistent, audit-ready documentation",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-2 text-sm text-slate-600">
              <div>• Trial: 1 month</div>
              <div>• Then: $10/year auto-renewing</div>
              <div>• Cancel anytime</div>
            </div>
          </div>

          <div className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-bold text-slate-900">
                Start your trial
              </h2>

              <div className="mt-5 grid gap-3">
                <label className="text-sm font-semibold text-slate-900">
                  Email address
                </label>

                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                    ✉️
                  </span>
                  <input
                    className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !loading) startTrial();
                    }}
                    autoComplete="email"
                    inputMode="email"
                  />
                </div>

                {error ? (
                  <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
                    {error}
                  </div>
                ) : null}

                <button
                  onClick={startTrial}
                  disabled={loading}
                  className={[
                    "inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-base font-bold transition",
                    loading
                      ? "cursor-not-allowed bg-slate-200 text-slate-500"
                      : "bg-cyan-600 text-white hover:bg-cyan-700",
                  ].join(" ")}
                >
                  {loading
                    ? "Opening secure checkout…"
                    : "Start Professional Trial"}
                </button>

                <p className="text-xs text-slate-500">
                  A payment method is required to start the trial. You won’t be
                  charged until the trial ends. Cancel anytime in the Stripe
                  billing portal.
                </p>
              </div>
            </section>

            <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
              <h2 className="text-xl font-bold text-amber-900">
                Professional Use Notice
              </h2>
              <p className="mt-3 text-sm leading-7 text-amber-800">
                This calculator is intended for licensed healthcare
                professionals. Results are provided as a clinical support tool
                only and do not replace professional judgment. Users are
                responsible for verifying calculations against the prescription,
                manufacturer labeling, payer requirements, and applicable
                regulations. This service does not sell, dispense, or distribute
                medication.
              </p>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">Credibility</h2>
              <div className="mt-3 text-sm text-slate-700">
                Built to standardize priming calculations and reduce manual math
                errors in day-supply documentation.
              </div>
              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <div>• Priming + expiration logic included</div>
                <div>• Designed for pharmacy workflows</div>
                <div>• No user data is sold</div>
              </div>
            </section>
          </div>
        </section>

        <div className="mt-8 text-center text-xs text-slate-500">
          By continuing, you agree to our{" "}
          <Link className="underline hover:text-slate-700" href="/terms">
            Terms
          </Link>{" "}
          and{" "}
          <Link className="underline hover:text-slate-700" href="/privacy">
            Privacy Policy
          </Link>
          .
        </div>
      </div>
    </main>
  );
}
