import Link from "next/link";

export default function BillingSuccessPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-xl p-6">
        <h1 className="text-2xl font-extrabold text-center">
          You’re all set ✅
        </h1>

        <p className="mt-3 text-center text-slate-300">
          Your free trial is active. You can return to the app now.
        </p>

        <div className="mt-6 space-y-3">
          <Link
            href="/app"
            className="block w-full rounded-xl bg-cyan-400 px-4 py-3 text-center font-extrabold text-slate-900"
          >
            Go to the app
          </Link>

          <Link
            href="/pricing"
            className="block w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-center font-semibold text-slate-100 hover:bg-slate-800"
          >
            Back to pricing
          </Link>
        </div>

        <div className="mt-6 rounded-xl border border-amber-700/40 bg-amber-900/20 p-3 text-xs text-amber-200">
          <p className="font-semibold">If access doesn’t unlock immediately</p>
          <p className="mt-1">
            It can take a few seconds for Stripe to notify the app. Refresh the
            page in a moment.
          </p>
        </div>
      </div>
    </main>
  );
}
