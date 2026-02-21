import Link from "next/link";

export const metadata = {
  title: "Eye Drops Days Supply Calculator for Pharmacists",
  description:
    "Professional eye drops day-supply calculator for pharmacy documentation. Clinical support tool only; verify per labeling and payer requirements.",
};

export default function EyeDropsLanding() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-2xl p-6">
        <div className="flex items-center justify-between">
          <Link
            href="/app"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-800"
          >
            ← Back to App
          </Link>
          <div className="text-xs text-slate-400">Professional tool</div>
        </div>

        <h1 className="mt-6 text-3xl font-extrabold tracking-tight">
          Eye Drops Days Supply Calculator
        </h1>

        <p className="mt-3 text-slate-300">
          A pharmacy-focused calculator to support consistent day-supply
          documentation for ophthalmic products.
        </p>

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="text-sm font-semibold text-slate-200">
            Use in the app
          </div>
          <p className="mt-2 text-sm text-slate-400">
            Open the calculator workspace and select the Eye Drops tab.
          </p>

          <Link
            href="/app?tab=eye"
            className="mt-4 inline-block w-full rounded-xl bg-cyan-400 px-4 py-3 text-center font-extrabold text-slate-900 hover:brightness-110"
          >
            Open Eye Drops Calculator
          </Link>

          <div className="mt-4 rounded-xl border border-amber-700/40 bg-amber-900/20 p-3 text-xs text-amber-200">
            <div className="font-semibold">Professional Use Notice</div>
            <div className="mt-1">
              Clinical support tool only. Verify against the prescription,
              labeling, payer requirements, and professional judgment. Not
              intended for direct patient use.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
