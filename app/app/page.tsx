"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { medicineData } from "@/lib/medicineData";
import EyeDropsCalculator from "@/components/EyeDropsCalculator";
import EarDropsCalculator from "@/components/EarDropsCalculator";
import { Search } from "lucide-react";
import { usePro } from "@/context/ProContext";

const TRIAL_LINE =
  "1-month free trial, then $3.99/year. Auto-renews until canceled.";

type Tab = "medicines" | "eye" | "ear";

export default function AppHome() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<Tab>("medicines");

  const { effectiveIsPro, isLoading } = usePro();

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

        {/* ✅ Gate card */}
        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900 p-4 text-center">
          <p className="text-slate-200 font-semibold">{TRIAL_LINE}</p>

          {isLoading ? (
            <div className="mt-3 text-sm text-slate-400">
              Checking subscription…
            </div>
          ) : effectiveIsPro ? (
            <div className="mt-3 rounded-xl border border-emerald-700/40 bg-emerald-900/20 p-3 text-emerald-200 text-sm font-semibold">
              Pro unlocked ✅
            </div>
          ) : (
            <Link
              href="/pricing"
              className="mt-3 inline-block w-full rounded-xl bg-cyan-400 px-4 py-3 text-center font-extrabold text-slate-900"
            >
              Start Free Trial
            </Link>
          )}
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

        <DisclaimerAccordion />

        {/* ✅ If locked, show a gentle notice; still allow browsing list */}
        {!isLoading && !effectiveIsPro ? (
          <div className="mt-4 rounded-xl border border-amber-700/40 bg-amber-900/20 p-3 text-xs text-amber-200">
            <p className="font-semibold">Free trial available</p>
            <p className="mt-1">
              You can browse medicines, but calculations require starting the
              trial.
            </p>
          </div>
        ) : null}

        {/* Search only when on Medicines tab */}
        {tab === "medicines" ? (
          <div className="mt-5 relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              className="w-full rounded-xl border border-slate-800 bg-slate-900 pl-10 pr-4 py-3 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
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

        {/* Bottom line only when locked */}
        {!isLoading && !effectiveIsPro ? (
          <div className="mt-2 text-center text-sm text-slate-400">
            Locked — {TRIAL_LINE}
          </div>
        ) : (
          <p className="mt-6 text-center text-xs text-slate-400">
            Trial begins when you tap “Start Free Trial” and confirm payment.
          </p>
        )}

        <div className="mt-3 text-center text-xs text-slate-400">
          We do not sell user information.
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

function DisclaimerAccordion() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 p-4 text-left"
        aria-expanded={open}
      >
        <div>
          <div className="text-sm font-extrabold text-slate-100">
            Tap to view disclaimer
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Professional use only
          </div>
        </div>

        <span
          className={[
            "text-slate-300 transition-transform",
            open ? "rotate-180" : "rotate-0",
          ].join(" ")}
        >
          ▼
        </span>
      </button>

      {open ? (
        <div className="px-4 pb-4 text-xs text-slate-300">
          <div className="rounded-lg border border-amber-700/40 bg-amber-900/20 p-3 text-amber-200">
            <p className="font-semibold">Professional Use Disclaimer</p>
            <p className="mt-1">
              Calculations are provided as a clinical aid only. Always verify
              against the prescription, product labeling, payer requirements,
              and professional judgment.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
