"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import { usePro } from "@/context/ProContext";

export default function UpgradePage() {
  const { effectiveIsPro, isLoading, status, refreshWithRetry } = usePro();

  // On first mount, refresh status (helpful after returning from Stripe)
  useEffect(() => {
    refreshWithRetry({ attempts: 3, delayMs: 1200 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If Pro is active, get out of here
  useEffect(() => {
    if (effectiveIsPro) {
      window.location.href = "/app";
    }
  }, [effectiveIsPro]);

  const showUpgrade = useMemo(() => !effectiveIsPro, [effectiveIsPro]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-xl mx-auto">
        <div className="flex items-center justify-between">
          <Link
            href="/app"
            className="px-4 py-2 rounded border border-slate-600 text-slate-100 hover:bg-slate-900"
          >
            Home
          </Link>

          <Link
            href="/pricing"
            className="px-4 py-2 rounded-full border border-cyan-400/40 bg-cyan-300/10 text-cyan-200 font-semibold"
          >
            Pricing
          </Link>
        </div>

        <h1 className="text-3xl font-extrabold mt-8">Upgrade</h1>
        <p className="text-slate-300 mt-2">
          Unlock unlimited calculations and Pro features.
        </p>

        {/* Loading / syncing */}
        {isLoading && (
          <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900/20 p-4 text-slate-200">
            Checking subscription status…
          </div>
        )}

        {/* Only show the trial CTA if NOT Pro */}
        {showUpgrade && !isLoading && (
          <div className="mt-6 rounded-xl border border-amber-700/40 bg-amber-900/20 p-5">
            <div className="text-amber-200 font-extrabold text-lg">
              Start your free trial
            </div>
            <div className="text-amber-100/90 text-sm mt-1">
              Trial begins after you confirm payment and will auto-renew unless
              canceled.
            </div>

            <Link
              href="/pricing"
              className="mt-4 inline-block w-full rounded-xl bg-cyan-400 px-4 py-3 text-center font-extrabold text-slate-900"
            >
              Start Free Trial
            </Link>

            <div className="mt-2 text-[11px] text-amber-100/70">
              Status: {status}
            </div>
          </div>
        )}

        {/* If Pro (briefly visible before redirect) */}
        {!showUpgrade && (
          <div className="mt-6 rounded-xl border border-emerald-700/30 bg-emerald-900/10 p-4 text-emerald-200">
            Pro is active. Redirecting…
          </div>
        )}
      </div>
    </div>
  );
}
