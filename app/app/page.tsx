import { Suspense } from "react";
import type { Metadata } from "next";
import AppHome from "./AppHome";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Insulin Days Supply Calculator for Pharmacists",
  description:
    "Professional insulin day-supply calculator incorporating priming units and expiration limits. Designed for pharmacists to support accurate, audit-ready documentation.",
  keywords: [
    "insulin days supply calculator",
    "insulin day supply calculation",
    "insulin priming calculator",
    "pharmacy day supply tool",
    "insulin expiration calculation",
    "pharmacist insulin calculator",
  ],
};

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
            Insulin Days’ Supply Calculator with Priming
          </div>
          <div className="mt-2 text-sm text-slate-400">Loading…</div>
        </div>
      </div>
    </main>
  );
}
