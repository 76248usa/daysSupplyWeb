"use client";

import { useEffect, useState } from "react";
import { usePro } from "@/context/ProContext";
import Link from "next/link";

export default function BillingSuccess() {
  const { refresh, effectiveIsPro, isLoading, status } = usePro();
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setMessage(null);

      // Try a few times in case webhook hasn’t written to Supabase yet
      for (let i = 0; i < 3; i++) {
        const result = await refresh();
        if (cancelled) return;

        if (result.isPro) return;

        await new Promise((r) => setTimeout(r, 2000));
      }

      if (!cancelled) {
        setMessage(
          "We’re still waiting for confirmation. If you just checked out, this can take a moment. Tap Refresh Status.",
        );
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [refresh]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="mx-auto max-w-xl rounded-xl border border-slate-800 bg-slate-900 p-6 text-center">
        <h1 className="text-2xl font-extrabold">You’re all set ✅</h1>

        <p className="mt-2 text-slate-300">
          {effectiveIsPro
            ? "Your subscription is active (or trialing). You can use the app now."
            : "Confirming your subscription…"}
        </p>

        <div className="mt-2 text-xs text-slate-400">
          Status: <span className="font-mono">{status}</span>
        </div>

        {message ? (
          <div className="mt-4 rounded-xl border border-amber-700/40 bg-amber-900/20 p-3 text-sm text-amber-200 text-left">
            {message}
          </div>
        ) : null}

        <div className="mt-5 grid gap-3">
          <Link
            href="/app"
            className="inline-block w-full rounded-xl bg-cyan-400 px-4 py-3 font-extrabold text-slate-900"
          >
            Go to App
          </Link>

          <button
            type="button"
            onClick={() => refresh()}
            disabled={isLoading}
            className={[
              "w-full rounded-xl px-4 py-3 font-extrabold transition border",
              isLoading
                ? "border-slate-700 text-slate-300 bg-slate-950 cursor-not-allowed"
                : "border-slate-700 text-slate-100 hover:bg-slate-950",
            ].join(" ")}
          >
            {isLoading ? "Refreshing…" : "Refresh Status"}
          </button>
        </div>

        <p className="mt-4 text-xs text-slate-500">
          If this page stays locked, it usually means the webhook hasn’t written
          to the database yet, or your email doesn’t match the one used at
          checkout.
        </p>
      </div>
    </div>
  );
}
