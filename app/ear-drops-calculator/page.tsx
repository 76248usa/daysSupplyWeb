import Link from "next/link";

export const metadata = {
  title: "Ear Drops Days Supply Calculator for Pharmacists",
  description:
    "Professional ear drops day-supply calculator for pharmacy documentation.",
};

export default function EarDropsLanding() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-2xl p-6">
        {/* Top nav */}
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-800"
          >
            ← Home
          </Link>

          <span className="text-xs text-slate-400">Professional tool</span>
        </div>

        {/* Header */}
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight">
          Ear Drops Days Supply Calculator
        </h1>

        <p className="mt-3 text-slate-300">
          A pharmacy-focused calculator to support consistent, audit-friendly
          day-supply documentation for prescription otic drops.
        </p>

        {/* What it does */}
        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="text-sm font-semibold text-slate-200">
            What this calculator covers
          </div>

          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>• Uses bottle volume and standard drops/mL assumptions</li>
            <li>• Accounts for one ear vs both ears (AD/AS vs AU)</li>
            <li>• Supports optional duration caps (e.g., “x 7 days”)</li>
          </ul>

          <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <div className="text-xs font-semibold text-slate-200">
              Typical workflow
            </div>
            <div className="mt-2 text-xs text-slate-400">
              Select product → enter drops per dose + frequency → choose ear(s)
              → (optional) cap by duration → calculate days’ supply (rounded
              down).
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="text-sm font-semibold text-slate-200">
            Use in the app
          </div>
          <p className="mt-2 text-sm text-slate-400">
            Open the calculator workspace and select the Ear Drops tab.
          </p>

          <Link
            href="/app?tab=ear"
            className="mt-4 inline-block w-full rounded-xl bg-cyan-400 px-4 py-3 text-center font-extrabold text-slate-900 hover:brightness-110"
          >
            Open Ear Drops Calculator
          </Link>

          <div className="mt-3 text-center text-xs text-slate-500">
            Secure access via your Pro subscription.
          </div>
        </div>

        {/* Minimal footer */}
        <div className="mt-8 text-center text-xs text-slate-600">
          Built for licensed pharmacy professionals.
        </div>
      </div>
    </main>
  );
}
