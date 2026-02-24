"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

export default function UpgradePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const AUTH_DISABLED = useMemo(
    () => process.env.NEXT_PUBLIC_AUTH_DISABLED === "1",
    [],
  );

  async function startCheckout() {
    if (AUTH_DISABLED) return;

    setLoading(true);
    setError(null);

    try {
      const { data } = await supabaseBrowser.auth.getSession();
      const token = data.session?.access_token;

      if (!token) {
        setError("Please sign in first.");
        setLoading(false);
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
        setLoading(false);
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

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-xl p-6">
        <h1 className="text-2xl font-extrabold text-center">Upgrade to Pro</h1>

        <p className="text-center text-slate-300 mt-3">
          {AUTH_DISABLED
            ? "Pro is enabled in development mode. Checkout is disabled for now."
            : "Start a 1-month free trial. Then $10 per year. Cancel anytime."}
        </p>

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <ul className="space-y-3 text-sm text-slate-300">
            <li>✓ Unlimited insulin calculations</li>
            <li>✓ Priming logic included</li>
            <li>✓ Expiration-aware day supply</li>
            <li>✓ Audit documentation support</li>
          </ul>

          {AUTH_DISABLED ? (
            <div className="mt-6 rounded-xl border border-slate-700/40 bg-slate-950/30 p-3 text-sm text-slate-200">
              Checkout disabled (dev). When auth is re-enabled, this button will
              start Stripe checkout.
            </div>
          ) : (
            <button
              onClick={startCheckout}
              disabled={loading}
              className="mt-6 w-full rounded-xl bg-cyan-400 px-4 py-3 font-extrabold text-slate-900 hover:brightness-110 disabled:opacity-60"
            >
              {loading ? "Redirecting to secure checkout…" : "Start Free Trial"}
            </button>
          )}

          {!AUTH_DISABLED && error ? (
            <div className="mt-4 rounded-xl border border-rose-900/40 bg-rose-900/20 p-3 text-sm text-rose-200">
              {error}
            </div>
          ) : null}

          <button
            onClick={() => router.push("/app")}
            className="mt-4 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
          >
            Back to App
          </button>
        </div>
      </div>
    </main>
  );
}
