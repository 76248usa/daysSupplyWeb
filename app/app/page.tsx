//

"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { medicineData } from "@/lib/medicineData";
import EyeDropsCalculator from "@/components/EyeDropsCalculator";
import EarDropsCalculator from "@/components/EarDropsCalculator";

const TRIAL_LINE =
  "1-month free trial, then $3.99/year. Auto-renews until canceled.";

type Tab = "medicines" | "eye" | "ear";

export default function AppHome() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<Tab>("medicines");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return medicineData;
    return medicineData.filter((m) => m.name.toLowerCase().includes(q));
  }, [search]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-2xl p-6">
        <h1 className="text-2xl font-extrabold text-center">
          Insulin Days’ Supply with Priming
        </h1>
        <p className="text-center text-slate-300 mt-2">
          Fast, audit-safe day-supply calculations
        </p>

        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900 p-4 text-center">
          <p className="text-slate-200 font-semibold">{TRIAL_LINE}</p>
          <Link
            href="/app/upgrade"
            className="mt-3 inline-block w-full rounded-xl bg-cyan-400 px-4 py-3 text-center font-extrabold text-slate-900"
          >
            Start Free Trial
          </Link>
        </div>

        {/* Segmented toggle */}
        <div className="mt-5 flex justify-center">
          <div className="inline-flex rounded-xl border border-slate-800 bg-slate-900 p-1">
            <TabButton
              active={tab === "medicines"}
              onClick={() => setTab("medicines")}
            >
              Medicines
            </TabButton>
            <TabButton active={tab === "eye"} onClick={() => setTab("eye")}>
              Eye drops
            </TabButton>
            <TabButton active={tab === "ear"} onClick={() => setTab("ear")}>
              Ear drops
            </TabButton>
          </div>
        </div>

        {/* Search only when on Medicines tab */}
        {tab === "medicines" ? (
          <div className="mt-5">
            <input
              className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 placeholder:text-slate-400"
              placeholder="Search insulin name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        ) : null}

        {/* Content area */}
        {tab === "eye" ? (
          <EyeDropsCalculator />
        ) : tab === "ear" ? (
          <EarDropsCalculator />
        ) : (
          <div className="mt-4 space-y-3">
            {filtered.map((m) => (
              <Link
                key={m.id}
                href={`/app/medicine/${m.id}`}
                className="block rounded-xl border border-slate-800 bg-slate-900 p-4 hover:bg-slate-800"
              >
                <div className="text-lg font-bold">{m.name}</div>
                {m.addToName ? (
                  <div className="text-sm text-slate-300">{m.addToName}</div>
                ) : null}
              </Link>
            ))}
          </div>
        )}

        <p className="mt-6 text-center text-xs text-slate-400">
          Trial begins when you tap “Start Free Trial” and confirm payment.
        </p>
        <div className="mt-2 text-center text-sm text-slate-400">
          Locked — {TRIAL_LINE}
        </div>
      </div>
    </main>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "px-4 py-2 rounded-lg text-sm font-semibold transition",
        active
          ? "bg-slate-950 text-white border border-slate-700"
          : "text-slate-300 hover:text-white",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
