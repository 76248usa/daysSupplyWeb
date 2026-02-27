"use client";

// components/EarDropsCalculatorClient.tsx

import React, { useEffect, useMemo, useState } from "react";
import {
  DEFAULT_DROPS_PER_ML,
  earDropProducts,
  type EarDropProduct,
} from "@/lib/calculators/earDropsData";

function parseNumber(s: string): number | null {
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

function isPositive(n: number | null): n is number {
  return typeof n === "number" && Number.isFinite(n) && n > 0;
}

function productKey(p: EarDropProduct) {
  // de-dupe key for dropdown display:
  // brand + volume + actives (ignores NDC/manufacturer)
  return `${p.brand}__${p.volumeMl}__${p.activeIngredients.join("|")}`;
}

export default function EarDropsCalculatorClient({
  showBackToApp = true,
}: {
  showBackToApp?: boolean;
}) {
  // ✅ De-dupe for dropdown (keep first match)
  const uniqueProducts = useMemo(() => {
    const map = new Map<string, EarDropProduct>();
    for (const p of earDropProducts) {
      const key = productKey(p);
      if (!map.has(key)) map.set(key, p);
    }
    return Array.from(map.values());
  }, []);

  const [productId, setProductId] = useState(
    uniqueProducts[0]?.ndc11 ?? earDropProducts[0]?.ndc11 ?? "",
  );

  // ✅ If productId is no longer valid (data changed), reset to first
  useEffect(() => {
    if (!productId) return;
    const exists = earDropProducts.some((p) => p.ndc11 === productId);
    if (!exists) {
      setProductId(uniqueProducts[0]?.ndc11 ?? earDropProducts[0]?.ndc11 ?? "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uniqueProducts]);

  const product = useMemo(
    () => earDropProducts.find((p) => p.ndc11 === productId) ?? null,
    [productId],
  );

  // ✅ drops/mL is a first-class, required input (default 20)
  const [dropsPerMl, setDropsPerMl] = useState(String(DEFAULT_DROPS_PER_ML));

  // SIG inputs
  const [dropsPerDose, setDropsPerDose] = useState("");
  const [timesPerDay, setTimesPerDay] = useState("");
  const [ears, setEars] = useState<1 | 2>(1);

  // Optional duration cap
  const [durationDays, setDurationDays] = useState("");

  // Output
  const [result, setResult] = useState<{
    daysSupply: number;
    rawDays: number;
    totalDrops: number;
    dailyDrops: number;
    dropsPerMlUsed: number;
    cappedByDuration: boolean;
    durationCap: number | null;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);

  const suggestedDuration = product?.suggestedDurationDays ?? null;

  function calculate() {
    setError(null);
    setResult(null);

    if (!product) {
      setError("Please select a product.");
      return;
    }

    const dpm = parseNumber(dropsPerMl);
    const d = parseNumber(dropsPerDose);
    const t = parseNumber(timesPerDay);
    const dur = parseNumber(durationDays);

    if (!isPositive(dpm)) return setError("Enter a valid drops per mL value.");
    if (!isPositive(d)) return setError("Enter a valid drops-per-dose value.");
    if (!isPositive(t)) return setError("Enter a valid times-per-day value.");

    const totalDrops = product.volumeMl * dpm;
    const dailyDrops = d * t * ears;

    if (!isPositive(totalDrops)) return setError("Invalid bottle volume.");
    if (!isPositive(dailyDrops)) return setError("Invalid dosing inputs.");

    const rawDays = totalDrops / dailyDrops;
    const floored = Math.floor(rawDays);

    const durationCap = isPositive(dur) ? Math.floor(dur) : null;
    const daysSupply =
      durationCap !== null ? Math.min(floored, durationCap) : floored;

    setResult({
      daysSupply,
      rawDays,
      totalDrops,
      dailyDrops,
      dropsPerMlUsed: dpm,
      cappedByDuration: durationCap !== null && durationCap < floored,
      durationCap,
    });
  }

  function reset() {
    setDropsPerMl(String(DEFAULT_DROPS_PER_ML));
    setDropsPerDose("");
    setTimesPerDay("");
    setEars(1);
    setDurationDays("");
    setResult(null);
    setError(null);

    // optional: reset product too
    setProductId(uniqueProducts[0]?.ndc11 ?? earDropProducts[0]?.ndc11 ?? "");
  }

  return (
    <div className="mt-6">
      {/* Product */}
      <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <div className="text-sm font-extrabold text-slate-100">Product</div>

        <div className="mt-3">
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            Select ear drops product
          </label>
          <select>
            {Array.from(
              new Map(
                earDropProducts.map((p) => {
                  const label = `${p.brand} (${p.volumeMl} mL)`;
                  return [label, p] as const; // keep first product for this label
                }),
              ).values(),
            ).map((p) => (
              <option key={`${p.brand}-${p.volumeMl}`} value={p.ndc11}>
                {p.brand} ({p.volumeMl} mL)
              </option>
            ))}
          </select>

          {product ? (
            <div className="mt-3 text-xs text-slate-400">
              <div>
                <span className="text-slate-300 font-semibold">NDC:</span>{" "}
                <span className="font-mono text-slate-200">
                  {product.ndc11}
                </span>
              </div>
              <div>
                <span className="text-slate-300 font-semibold">Actives:</span>{" "}
                {product.activeIngredients.join(" + ")}
              </div>
              <div className="mt-1">
                <span className="text-slate-300 font-semibold">Volume:</span>{" "}
                {product.volumeMl} mL
                {suggestedDuration ? (
                  <>
                    {" "}
                    •{" "}
                    <span className="text-slate-300 font-semibold">
                      Common duration:
                    </span>{" "}
                    {suggestedDuration} days
                  </>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* SIG */}
      <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <div className="text-sm font-extrabold text-slate-100">
          Directions (SIG)
        </div>

        {/* drops/mL */}
        <div className="mt-4">
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            Drops per mL <span className="text-slate-500">(required)</span>
          </label>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              value={dropsPerMl}
              onChange={(e) =>
                setDropsPerMl(e.target.value.replace(/[^0-9.]/g, ""))
              }
              inputMode="decimal"
              placeholder="e.g. 20"
              className="w-full sm:max-w-[220px] rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />

            <div className="flex flex-wrap gap-2">
              {[12, 15, 16, 20].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setDropsPerMl(String(n))}
                  className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-900"
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-1 text-[11px] text-slate-500">
            Default is 20 drops/mL. Some payers/products may use 12, 15, or 16.
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Drops per dose
            </label>
            <input
              value={dropsPerDose}
              onChange={(e) =>
                setDropsPerDose(e.target.value.replace(/[^0-9.]/g, ""))
              }
              inputMode="decimal"
              placeholder="e.g. 4"
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Times per day
            </label>
            <input
              value={timesPerDay}
              onChange={(e) =>
                setTimesPerDay(e.target.value.replace(/[^0-9.]/g, ""))
              }
              inputMode="decimal"
              placeholder="e.g. 2 (BID)"
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Ear(s)
            </label>
            <div className="inline-flex rounded-xl border border-slate-800 bg-slate-950 p-1">
              <button
                type="button"
                onClick={() => setEars(1)}
                className={[
                  "px-4 py-2 rounded-lg text-sm font-semibold transition",
                  ears === 1
                    ? "bg-slate-900 text-white border border-slate-700"
                    : "text-slate-300 hover:text-white",
                ].join(" ")}
              >
                One ear (AD/AS)
              </button>
              <button
                type="button"
                onClick={() => setEars(2)}
                className={[
                  "px-4 py-2 rounded-lg text-sm font-semibold transition",
                  ears === 2
                    ? "bg-slate-900 text-white border border-slate-700"
                    : "text-slate-300 hover:text-white",
                ].join(" ")}
              >
                Both ears (AU)
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Duration cap (optional)
            </label>
            <input
              value={durationDays}
              onChange={(e) =>
                setDurationDays(e.target.value.replace(/[^0-9.]/g, ""))
              }
              inputMode="decimal"
              placeholder={
                suggestedDuration ? `e.g. ${suggestedDuration}` : "e.g. 7"
              }
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <div className="mt-1 text-[11px] text-slate-500">
              If the prescription specifies “x 7 days”, enter 7 to cap the
              result.
            </div>
          </div>
        </div>

        {error ? (
          <div className="mt-4 rounded-xl border border-rose-900/40 bg-rose-900/20 p-3 text-sm text-rose-200">
            {error}
          </div>
        ) : null}

        <div className="mt-5 flex gap-3">
          <button
            onClick={calculate}
            className="flex-1 rounded-xl bg-cyan-400 px-4 py-3 text-center font-extrabold text-slate-900 hover:brightness-110"
          >
            Calculate
          </button>
          <button
            onClick={reset}
            className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-center font-semibold text-slate-100 hover:bg-slate-900"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Results */}
      {result ? (
        <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-slate-400 text-sm">Days’ supply</div>
              <div className="text-yellow-300 text-5xl font-black">
                {result.daysSupply}
              </div>
              {result.cappedByDuration ? (
                <div className="mt-2 text-xs text-amber-200">
                  Capped by prescribed duration ({result.durationCap} days).
                </div>
              ) : null}
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-xs text-slate-300">
              <div className="font-semibold text-slate-200">
                Calculation details
              </div>
              <div className="mt-2 space-y-1">
                <div>
                  Total drops = {product?.volumeMl} mL × {result.dropsPerMlUsed}{" "}
                  drops/mL ={" "}
                  <span className="text-slate-100 font-semibold">
                    {Math.round(result.totalDrops)}
                  </span>
                </div>
                <div>
                  Daily drops = {dropsPerDose || "—"} × {timesPerDay || "—"} ×{" "}
                  {ears} ear(s) ={" "}
                  <span className="text-slate-100 font-semibold">
                    {Math.round(result.dailyDrops)}
                  </span>
                </div>
                <div>
                  Raw days ={" "}
                  <span className="text-slate-100 font-semibold">
                    {result.rawDays.toFixed(2)}
                  </span>
                </div>
                <div>
                  Billed days supply = floor(raw days{" "}
                  <span className="text-slate-400">(rounded down)</span>)
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-amber-700/40 bg-amber-900/20 p-3 text-xs text-amber-200">
            <div className="font-semibold">Professional Use Notice</div>
            <div className="mt-1">
              Clinical support tool only. Verify against the prescription,
              labeling, payer requirements, and professional judgment.
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
