"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import type { Medicine } from "@/lib/medicineData";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

function formatDateShort(iso?: string | null) {
  if (!iso) return null;
  const d = new Date(iso);
  if (!Number.isFinite(d.getTime())) return null;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function daysUntil(iso?: string | null) {
  if (!iso) return null;
  const end = new Date(iso);
  if (!Number.isFinite(end.getTime())) return null;
  const ms = end.getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}

function shouldAvoidStealingFocus() {
  if (typeof document === "undefined") return false;
  const el = document.activeElement as HTMLElement | null;
  if (!el) return false;
  const tag = el.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    el.getAttribute("contenteditable") === "true"
  );
}

export default function DetailsClient({ medicine }: { medicine: Medicine }) {
  const [units, setUnits] = useState("");
  const [times, setTimes] = useState("");
  const [answer, setAnswer] = useState<number | null>(null);
  const [boxAnswer, setBoxAnswer] = useState<number | null>(null);

  const prime = Number(medicine?.prime ?? 0);

  // ✅ Autofocus ref for "Units per dose"
  const unitsRef = useRef<HTMLInputElement | null>(null);

  /* ---------------------------------------------------
     ✅ Subscription confidence state
  --------------------------------------------------- */

  const [effectiveIsPro, setEffectiveIsPro] = useState(false);
  const [subStatus, setSubStatus] = useState<string | null>(null);
  const [currentPeriodEnd, setCurrentPeriodEnd] = useState<string | null>(null);
  const [trialEndsInDays, setTrialEndsInDays] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const { data } = await supabaseBrowser.auth.getSession();
        const token = data.session?.access_token;

        if (!token) return;

        const res = await fetch("/api/pro-status", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const json = await res.json().catch(() => ({}));

        if (cancelled) return;

        setEffectiveIsPro(Boolean(json?.isPro));
        setSubStatus(json?.effectiveStatus ?? json?.status ?? null);
        setCurrentPeriodEnd(json?.current_period_end ?? null);

        if (typeof json?.trialEndsInDays === "number") {
          setTrialEndsInDays(json.trialEndsInDays);
        }
      } catch {
        // silent — UI just won't show confidence line
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const proConfidenceLine = useMemo(() => {
    const s = (subStatus ?? "").toLowerCase();

    if (s === "trialing") {
      const d = trialEndsInDays ?? daysUntil(currentPeriodEnd);

      if (d == null) return "Trial active";
      if (d === 0) return "Trial ends today";
      if (d === 1) return "Trial ends in 1 day";
      return `Trial ends in ${d} days`;
    }

    const dt = formatDateShort(currentPeriodEnd);
    if (dt) return `Renews ${dt}`;

    if (effectiveIsPro) return "Subscription verified";

    return null;
  }, [subStatus, trialEndsInDays, currentPeriodEnd, effectiveIsPro]);

  /* ---------------------------------------------------
     ✅ Autofocus "Units per dose" on mount
  --------------------------------------------------- */
  useEffect(() => {
    const id = window.setTimeout(() => {
      if (shouldAvoidStealingFocus()) return;
      unitsRef.current?.focus();
    }, 80);

    return () => window.clearTimeout(id);
  }, []);

  /* ---------------------------------------------------
     Calculator logic (unchanged)
  --------------------------------------------------- */

  const parsed = useMemo(() => {
    const u = Number(units);
    const t = Number(times);
    return {
      u,
      t,
      valid: Number.isFinite(u) && Number.isFinite(t) && u > 0 && t > 0,
    };
  }, [units, times]);

  const calculate = () => {
    if (!parsed.valid) return;

    const totalUnits = Number(medicine?.unitsInPen ?? 0);
    const expire = Number(medicine?.expire ?? 0);

    if (!Number.isFinite(totalUnits) || totalUnits <= 0) return;

    const dailyUnits = parsed.t * parsed.u;
    const dailyPrime = parsed.t * prime;
    const dailyTotal = dailyUnits + dailyPrime;

    if (!Number.isFinite(dailyTotal) || dailyTotal <= 0) return;

    const rawDays = totalUnits / dailyTotal;
    const cappedDays = expire ? Math.min(rawDays, expire) : rawDays;
    const floorDays = Math.floor(cappedDays);

    setAnswer(floorDays);

    const pensPerBox = Number(medicine?.pensAmount ?? 0);
    if (Number.isFinite(pensPerBox) && pensPerBox > 0) {
      setBoxAnswer(floorDays * pensPerBox);
    } else {
      setBoxAnswer(null);
    }
  };

  const reset = () => {
    setUnits("");
    setTimes("");
    setAnswer(null);
    setBoxAnswer(null);

    // ✅ Re-focus after reset
    window.setTimeout(() => {
      unitsRef.current?.focus();
    }, 0);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") calculate();
  };

  /* ---------------------------------------------------
     UI
  --------------------------------------------------- */

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/app"
          className="px-4 py-2 rounded border border-slate-600 text-slate-100 hover:bg-slate-900"
        >
          Home
        </Link>

        {/* ✅ Pro Badge */}
        {effectiveIsPro && (
          <div className="inline-flex flex-col items-start rounded-lg border border-emerald-700/40 bg-emerald-900/20 px-3 py-2">
            <div className="text-emerald-200 text-xs font-semibold">
              Pro active ✓
            </div>

            {proConfidenceLine && (
              <div className="text-[11px] text-emerald-100/80">
                {proConfidenceLine}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Title */}
      <h1 className="text-2xl font-extrabold text-center mt-5">
        {medicine.name}
      </h1>

      {medicine.addToName && (
        <p className="text-center text-slate-400 mt-1">{medicine.addToName}</p>
      )}

      {medicine.ndc && (
        <p className="text-center text-slate-500 mt-1">{medicine.ndc}</p>
      )}

      {medicine.dosage && (
        <p className="text-center text-orange-400 italic mt-3">
          {medicine.dosage}
        </p>
      )}

      {/* Results */}
      {(answer !== null || boxAnswer !== null) && (
        <div className="mt-6 max-w-xl mx-auto border border-slate-800 rounded-xl p-4 bg-slate-950">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {answer !== null && (
              <div className="text-center">
                <div className="text-slate-400 text-sm">Days&apos; supply</div>
                <div className="text-yellow-300 text-4xl font-black">
                  {answer}
                </div>
              </div>
            )}

            {boxAnswer !== null && (
              <div className="text-center">
                <div className="text-slate-400 text-sm">
                  Days&apos; supply per box
                </div>
                <div className="text-yellow-300 text-4xl font-black">
                  {boxAnswer}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Inputs */}
      <div className="mt-6 max-w-md mx-auto space-y-4">
        <div>
          <label className="block text-slate-200 mb-2">Units per dose</label>
          <input
            ref={unitsRef}
            value={units}
            onChange={(e) => setUnits(e.target.value.replace(/[^0-9.]/g, ""))}
            onKeyDown={onKeyDown}
            inputMode="decimal"
            className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 text-slate-100"
            placeholder="e.g. 20"
          />
        </div>

        <div>
          <label className="block text-slate-200 mb-2">Times per day</label>
          <input
            value={times}
            onChange={(e) => setTimes(e.target.value.replace(/[^0-9.]/g, ""))}
            onKeyDown={onKeyDown}
            inputMode="decimal"
            className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 text-slate-100"
            placeholder="e.g. 1"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            onClick={calculate}
            className="flex-1 bg-green-500 text-black py-3 rounded-lg font-extrabold hover:opacity-90"
          >
            Confirm
          </button>

          <button
            onClick={reset}
            className="flex-1 border border-slate-500 py-3 rounded-lg font-semibold text-slate-100 hover:bg-slate-900"
          >
            Reset
          </button>
        </div>

        <p className="text-center text-xs text-slate-500 pt-2">
          Prime: {prime} units • Exp: {medicine.expire ?? "—"} days • Total
          units: {medicine.unitsInPen ?? "—"}
        </p>
      </div>
    </div>
  );
}
