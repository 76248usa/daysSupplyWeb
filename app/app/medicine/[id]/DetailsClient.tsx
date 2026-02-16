"use client";

import { useMemo, useState } from "react";
import { usePro } from "@/context/ProContext";
import Link from "next/link";
import type { Medicine } from "@/lib/medicineData";

export default function DetailsClient({ medicine }: { medicine: Medicine }) {
  const { effectiveIsPro } = usePro();

  const [units, setUnits] = useState("");
  const [times, setTimes] = useState("");
  const [answer, setAnswer] = useState<number | null>(null);
  const [boxAnswer, setBoxAnswer] = useState<number | null>(null);

  const prime = Number(medicine?.prime ?? 0);

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
    if (!effectiveIsPro) return; // ✅ gated

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
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") calculate();
  };

  const locked = !effectiveIsPro;

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

        {locked && (
          <Link
            href="/pricing"
            className="px-4 py-2 rounded-full border border-cyan-400/40 bg-cyan-300/10 text-cyan-200 font-semibold"
          >
            Free Trial • Upgrade
          </Link>
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

      {/* ✅ Locked banner (instead of alert) */}
      {locked && (
        <div className="mt-4 max-w-2xl mx-auto rounded-xl border border-amber-700/40 bg-amber-900/20 p-4 text-amber-200">
          <div className="font-extrabold">Free trial available</div>
          <div className="text-sm mt-1 text-amber-100/90">
            Calculations require a subscription. Trial begins after you confirm
            payment and will auto-renew unless canceled.
          </div>

          <Link
            href="/pricing"
            className="mt-3 inline-block w-full rounded-xl bg-cyan-400 px-4 py-3 text-center font-extrabold text-slate-900"
          >
            Start Free Trial
          </Link>
        </div>
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
        {/* subtle lock overlay by disabling inputs/buttons */}
        <div className={locked ? "opacity-60" : ""}>
          <div>
            <label className="block text-slate-200 mb-2">Units per dose</label>
            <input
              value={units}
              disabled={locked}
              onChange={(e) => setUnits(e.target.value.replace(/[^0-9.]/g, ""))}
              onKeyDown={onKeyDown}
              inputMode="decimal"
              className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 disabled:cursor-not-allowed"
              placeholder="e.g. 20"
            />
            {!locked && !parsed.valid && units !== "" && times !== "" ? (
              <p className="mt-2 text-xs text-amber-200">
                Please enter valid numbers.
              </p>
            ) : null}
          </div>

          <div className="mt-4">
            <label className="block text-slate-200 mb-2">Times per day</label>
            <input
              value={times}
              disabled={locked}
              onChange={(e) => setTimes(e.target.value.replace(/[^0-9.]/g, ""))}
              onKeyDown={onKeyDown}
              inputMode="decimal"
              className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 disabled:cursor-not-allowed"
              placeholder="e.g. 1"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={calculate}
              disabled={locked}
              className="flex-1 bg-green-500 text-black py-3 rounded-lg font-extrabold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm
            </button>
            <button
              onClick={reset}
              disabled={locked}
              className="flex-1 border border-slate-500 py-3 rounded-lg font-semibold text-slate-100 hover:bg-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reset
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 pt-2">
          Prime: {prime} units • Exp: {medicine.expire ?? "—"} days • Total
          units: {medicine.unitsInPen ?? "—"}
        </p>
      </div>
    </div>
  );
}
