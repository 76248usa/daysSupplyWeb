import Link from "next/link";

export const metadata = {
  title: "Eye Drops Days Supply Calculator for Pharmacists",
  description:
    "Professional eye drops day-supply calculator for pharmacy documentation, ophthalmic NDC reference, and pharmacist workflow guidance.",
};

export default function EyeDropsLanding() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-4xl p-6">
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

        <p className="mt-3 max-w-2xl text-slate-300">
          A pharmacist-focused calculator to support consistent day-supply
          documentation for ophthalmic products using bottle size, drops per mL,
          dosing frequency, and one-eye or both-eyes directions.
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
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
              Open Eye Drops Calculator in App
            </Link>

            <Link
              href="/eye-drops-days-supply-calculator"
              className="mt-3 inline-block w-full rounded-xl border border-slate-700 px-4 py-3 text-center font-bold text-slate-100 hover:bg-slate-800"
            >
              Open Standalone Eye Drops Calculator
            </Link>

            <div className="mt-4 rounded-xl border border-amber-700/40 bg-amber-900/20 p-3 text-xs text-amber-200">
              <div className="font-semibold">Professional Use Notice</div>
              <div className="mt-1">
                Clinical support tool only. Verify against the prescription,
                labeling, payer requirements, and professional judgment. Not
                intended for direct patient use.
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="text-sm font-semibold text-slate-200">
              Eye drop references
            </div>

            <p className="mt-2 text-sm text-slate-400">
              Browse pharmacist reference pages for ophthalmic NDC data and
              eye-drop day-supply guidance.
            </p>

            <div className="mt-4 space-y-3">
              <Link
                href="/how-to-calculate-eye-drop-days-supply"
                className="block rounded-xl border border-slate-700 px-4 py-3 font-semibold text-slate-100 hover:bg-slate-800"
              >
                How to Calculate Eye Drop Days Supply
              </Link>

              <Link
                href="/eye-drops-ndc-reference"
                className="block rounded-xl border border-slate-700 px-4 py-3 font-semibold text-slate-100 hover:bg-slate-800"
              >
                Eye Drops NDC Reference
              </Link>

              <Link
                href="/eye-drop-days-supply-guides/timolol"
                className="block rounded-xl border border-slate-700 px-4 py-3 font-semibold text-slate-100 hover:bg-slate-800"
              >
                Timolol Eye Drop Days Supply Guide
              </Link>
            </div>
          </section>
        </div>

        <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="text-sm font-semibold text-slate-200">
            What this supports
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              "Bottle-size based eye-drop calculations",
              "Estimated drops-per-mL workflow support",
              "One-eye and both-eyes dosing",
              "FDA ophthalmic NDC reference integration",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm text-slate-300"
              >
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
