"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { medicineData } from "@/lib/medicineData";
import EyeDropsCalculator from "@/components/EyeDropsCalculator";
import EarDropsCalculator from "@/components/EarDropsCalculator";
import { Search } from "lucide-react";
import { usePro } from "@/context/ProContext";
import { useSearchParams, useRouter } from "next/navigation";

const TRIAL_LINE =
  "1-month free trial, then $3.99/year. Auto-renews until canceled.";

type Tab = "medicines" | "eye" | "ear";

const RECENT_KEY = "ds_recent_checkout_ts";
const RECENT_MS = 10 * 60 * 1000; // 10 minutes

function hasRecentCheckout(): boolean {
  if (typeof window === "undefined") return false;
  const raw = window.sessionStorage.getItem(RECENT_KEY);
  const ts = raw ? Number(raw) : 0;
  return Number.isFinite(ts) && ts > 0 && Date.now() - ts < RECENT_MS;
}

function setRecentCheckoutNow() {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(RECENT_KEY, String(Date.now()));
}

export default function AppHome() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<Tab>("medicines");

  const router = useRouter();
  const searchParams = useSearchParams();
  const checkout = searchParams.get("checkout"); // success/cancel/null

  const { effectiveIsPro, isLoading, refreshWithRetry } = usePro();

  // “Activating” is now persistent across back navigation (for a while)
  const [activating, setActivating] = useState(false);

  // 1) If we returned from Stripe with checkout=success, persist it and retry refresh.
  useEffect(() => {
    if (checkout === "success") {
      setRecentCheckoutNow();
      setActivating(true);

      refreshWithRetry({ attempts: 8, delayMs: 1500 }).catch(() => {});

      // Optional: clean the URL so you don't keep the param around
      router.replace("/app");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkout]);

  // 2) On Home mount (including when you come back from Details), if we recently checked out,
  // keep activating on and retry refresh again.
  useEffect(() => {
    if (effectiveIsPro) {
      setActivating(false);
      return;
    }

    if (hasRecentCheckout()) {
      setActivating(true);
      refreshWithRetry({ attempts: 6, delayMs: 1500 })
        .catch(() => {})
        .finally(() => {
          // Keep activating true for the entire RECENT window
          // (so Home doesn’t flip back to “Start Free Trial” between taps)
          setActivating(hasRecentCheckout() && !effectiveIsPro);
        });
    } else {
      setActivating(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectiveIsPro]);

  // If they are Pro, or they recently checked out, allow navigation to details
  const canOpenDetails = effectiveIsPro || activating;

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

        {/* ✅ Gate card (only place that gates) */}
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
          ) : activating ? (
            <div className="mt-3 rounded-xl border border-slate-700/40 bg-slate-950/30 p-3 text-slate-200 text-sm font-semibold">
              Activating your subscription…
              <div className="mt-1 text-xs text-slate-400 font-normal">
                You can keep selecting medications while this syncs.
              </div>
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
            {filtered.map((m) =>
              canOpenDetails ? (
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
              ) : (
                <Link
                  key={m.id}
                  href="/pricing"
                  className="block rounded-xl border border-slate-800 bg-slate-900 p-4 hover:bg-slate-800 opacity-70"
                >
                  <div className="text-lg font-bold">{m.name}</div>
                  {m.addToName ? (
                    <div className="text-sm text-slate-300">{m.addToName}</div>
                  ) : null}
                  <div className="mt-2 text-xs text-amber-200">
                    Start trial to calculate
                  </div>
                </Link>
              ),
            )}
          </div>
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
