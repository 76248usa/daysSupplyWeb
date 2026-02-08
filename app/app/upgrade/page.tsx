"use client";

import Link from "next/link";

const TRIAL_LABEL = "1-month";
const PRICE = "$3.99";
const PERIOD = "year";

const KEY_LINE = `${TRIAL_LABEL} free trial, then ${PRICE}/${PERIOD}. Auto-renews until canceled.`;

export default function Upgrade() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-2xl p-6">
        <h1 className="text-2xl font-extrabold">Unlock Unlimited Use</h1>
        <p className="mt-2 text-slate-300">
          Unlock unlimited Days’ Supply calculations (priming included).
        </p>

        <p className="mt-4 rounded-xl border border-slate-800 bg-slate-900 p-4 font-extrabold">
          {KEY_LINE}
        </p>

        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900 p-4">
          <div className="text-lg font-bold">Yearly Pro</div>
          <div className="mt-2 text-slate-300">
            Unlimited calculations, priming included.
          </div>
          <div className="mt-3 text-xl font-extrabold">
            {PRICE}/{PERIOD}
          </div>

          <button
            className="mt-4 w-full rounded-xl bg-green-400 px-4 py-3 font-extrabold text-slate-900"
            onClick={() => alert("Next step: connect Stripe Checkout")}
          >
            Start Free Trial
          </button>

          <p className="mt-3 text-xs text-slate-400">
            Payment will be charged at confirmation. Subscription automatically
            renews unless canceled at least 24 hours before the end of the
            current period.
          </p>
        </div>

        <div className="mt-5">
          <Link
            href="/app"
            className="inline-block w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-center font-bold hover:bg-slate-800"
          >
            Not Now
          </Link>
        </div>
      </div>
    </main>
  );
}
