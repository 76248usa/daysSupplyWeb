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
    // lightweight validation (enough for UI)
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
        // ✅ MUST be client-side (browser)
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
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-lg p-6">
        <div className="flex items-center justify-between">
          <Link
            href="/app"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-800"
          >
            ← Back
          </Link>

          <div className="text-xs text-slate-400">
            Secure checkout via Stripe
          </div>
        </div>

        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-center">
          Professional Access
        </h1>
        <p className="mt-2 text-center text-slate-300">
          Unlimited calculations for insulin day-supply (including priming and
          expiration), plus eye and ear drops tools.
        </p>

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-lg border border-slate-800 bg-slate-950 px-2 py-1 text-slate-300">
              🔒
            </div>

            <div className="flex-1">
              <div className="text-lg font-extrabold text-slate-100">
                Pro Subscription
              </div>
              <div className="mt-1 text-sm text-slate-300">{PLAN_LINE}</div>

              <div className="mt-4">
                <div className="text-4xl font-black text-center">
                  $10
                  <span className="text-base font-semibold text-slate-400">
                    {" "}
                    / year
                  </span>
                </div>
                <div className="text-center text-xs text-slate-400 mt-2">
                  1-month free trial • Cancel anytime
                </div>
              </div>

              <ul className="mt-6 space-y-2 text-sm text-slate-300">
                <li>• Unlimited insulin calculations</li>
                <li>• Priming-aware dose adjustments</li>
                <li>• Expiration-based day caps</li>
                <li>• Supports consistent, audit-ready documentation</li>
              </ul>

              <div className="mt-6 grid gap-3">
                <label className="text-xs font-semibold text-slate-300">
                  Email address
                </label>

                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                    ✉️
                  </span>
                  <input
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-11 pr-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
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
                  <div className="rounded-xl border border-rose-900/40 bg-rose-900/20 p-3 text-sm text-rose-200">
                    {error}
                  </div>
                ) : null}

                <button
                  onClick={startTrial}
                  disabled={loading}
                  className={[
                    "w-full rounded-xl px-4 py-3 text-center font-extrabold transition",
                    loading
                      ? "bg-slate-700 text-slate-200 cursor-not-allowed"
                      : "bg-cyan-400 text-slate-900 hover:brightness-110",
                  ].join(" ")}
                >
                  {loading
                    ? "Opening secure checkout…"
                    : "Start Professional Trial"}
                </button>

                <p className="text-xs text-slate-400">
                  A payment method is required to start the trial. You won’t be
                  charged until the trial ends. Cancel anytime in the Stripe
                  billing portal.
                </p>

                <div className="mt-3 rounded-xl border border-amber-700/40 bg-amber-900/20 p-3 text-xs text-amber-200">
                  <div className="font-semibold">Professional Use Notice</div>
                  <div className="mt-1">
                    This calculator is intended for licensed healthcare
                    professionals. Results are provided as a clinical support
                    tool only and do not replace professional judgment. Users
                    are responsible for verifying calculations against the
                    prescription, manufacturer labeling, payer requirements, and
                    applicable regulations. This service does not sell,
                    dispense, or distribute medication.
                  </div>
                </div>

                <div className="mt-3 rounded-xl border border-slate-800 bg-slate-950/30 p-3 text-xs text-slate-300">
                  <div className="font-semibold text-slate-200">
                    Credibility
                  </div>
                  <div className="mt-1 text-slate-400">
                    Built to standardize priming calculations and reduce manual
                    math errors in day-supply documentation.
                  </div>
                  <div className="mt-2 space-y-1 text-slate-400">
                    <div>• Priming + expiration logic included</div>
                    <div>• Designed for pharmacy workflows</div>
                    <div>• No user data is sold</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-2 text-xs text-slate-400">
            <div>• Trial: 1 month</div>
            <div>• Then: $10/year auto-renewing</div>
            <div>• Cancel anytime</div>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-slate-500">
          By continuing, you agree to our{" "}
          <Link className="underline hover:text-slate-300" href="/terms">
            Terms
          </Link>{" "}
          and{" "}
          <Link className="underline hover:text-slate-300" href="/privacy">
            Privacy Policy
          </Link>
          .
        </div>
      </div>
    </main>
  );
}
