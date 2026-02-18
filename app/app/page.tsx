import { Suspense } from "react";
import AppHome from "./AppHome";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<AppLoading />}>
      <AppHome />
    </Suspense>
  );
}

function AppLoading() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-2xl p-6">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-center">
          <div className="text-lg font-extrabold">
            Insulin Days’ Supply with Priming
          </div>
          <div className="mt-2 text-sm text-slate-400">Loading…</div>
        </div>
      </div>
    </main>
  );
}
