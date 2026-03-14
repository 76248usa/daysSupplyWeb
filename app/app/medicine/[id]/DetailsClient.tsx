"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import type { Medicine } from "@/lib/medicineData";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

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

const PRESS =
  "select-none cursor-pointer active:scale-[0.97] transition-transform";

export default function DetailsClient({ medicine }: { medicine: Medicine }) {
  const [units, setUnits] = useState("");
  const [times, setTimes] = useState("");
  const [answer, setAnswer] = useState<number | null>(null);
  const [boxAnswer, setBoxAnswer] = useState<number | null>(null);

  const prime = Number(medicine?.prime ?? 0);

  const unitsRef = useRef<HTMLInputElement | null>(null);

  const [attempted, setAttempted] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        setSubStatus(
          (json?.effectiveStatus ?? json?.status ?? null) as string | null,
        );
        setCurrentPeriodEnd(
          (json?.current_period_end ?? null) as string | null,
        );

        setTrialEndsInDays(
          typeof json?.trialEndsInDays === "number"
            ? json.trialEndsInDays
            : null,
        );
      } catch {
        // silent
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

  useEffect(() => {
    const id = window.setTimeout(() => {
      if (shouldAvoidStealingFocus()) return;
      unitsRef.current?.focus();
    }, 80);
    return () => window.clearTimeout(id);
  }, []);

  const parsed = useMemo(() => {
    const u = Number(units);
    const t = Number(times);

    const unitsValid = Number.isFinite(u) && u > 0;
    const timesValid = Number.isFinite(t) && t > 0;

    return {
      u,
      t,
      unitsValid,
      timesValid,
      valid: unitsValid && timesValid,
    };
  }, [units, times]);

  useEffect(() => {
    if (!attempted) return;
    if (parsed.valid) setError(null);
  }, [attempted, parsed.valid]);

  const calculate = () => {
    setAttempted(true);
    setError(null);

    if (!parsed.valid) {
      if (!parsed.unitsValid && !parsed.timesValid) {
        setError("Enter valid numbers for Units per dose and Times per day.");
        return;
      }
      if (!parsed.unitsValid) {
        setError("Enter a valid Units per dose value.");
        return;
      }
      if (!parsed.timesValid) {
        setError("Enter a valid Times per day value.");
        return;
      }
      return;
    }

    const totalUnits = Number(medicine?.unitsInPen ?? 0);
    const expire = Number(medicine?.expire ?? 0);

    if (!Number.isFinite(totalUnits) || totalUnits <= 0) {
      setError("This product has an invalid total units value.");
      return;
    }

    const dailyUnits = parsed.t * parsed.u;
    const dailyPrime = parsed.t * prime;
    const dailyTotal = dailyUnits + dailyPrime;

    if (!Number.isFinite(dailyTotal) || dailyTotal <= 0) {
      setError("Invalid dosing inputs.");
      return;
    }

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

    window.gtag?.("event", "insulin_calculation", {
      insulin: medicine.name,
    });
  };

  const reset = () => {
    setUnits("");
    setTimes("");
    setAnswer(null);
    setBoxAnswer(null);
    setAttempted(false);
    setError(null);

    window.setTimeout(() => {
      unitsRef.current?.focus();
    }, 0);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") calculate();
  };

  return (
    <div className="bg-white text-slate-900">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/app"
            className={`${PRESS} inline-flex items-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50`}
          >
            Home
          </Link>

          {effectiveIsPro && (
            <div className="inline-flex flex-col items-start rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2">
              <div className="text-xs font-semibold text-emerald-800">
                Pro active ✓
              </div>
              {proConfidenceLine ? (
                <div className="text-[11px] text-emerald-700">
                  {proConfidenceLine}
                </div>
              ) : null}
            </div>
          )}
        </div>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            {medicine.name}
          </h1>

          {medicine.addToName ? (
            <p className="mt-2 text-lg text-slate-600">{medicine.addToName}</p>
          ) : null}

          {medicine.ndc ? (
            <p className="mt-2 text-sm text-slate-500">{medicine.ndc}</p>
          ) : null}

          {medicine.dosage ? (
            <p className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-medium text-amber-800">
              {medicine.dosage}
            </p>
          ) : null}
        </section>

        {(answer !== null || boxAnswer !== null) && (
          <section className="mt-6 rounded-3xl border border-cyan-100 bg-cyan-50 p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">Results</h2>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {answer !== null && (
                <div className="rounded-2xl bg-white p-5 text-center">
                  <div className="text-sm font-medium text-slate-600">
                    Days&apos; supply
                  </div>
                  <div className="mt-1 text-4xl font-bold text-cyan-700">
                    {answer}
                  </div>
                </div>
              )}

              {boxAnswer !== null && (
                <div className="rounded-2xl bg-white p-5 text-center">
                  <div className="text-sm font-medium text-slate-600">
                    Days&apos; supply per box
                  </div>
                  <div className="mt-1 text-4xl font-bold text-cyan-700">
                    {boxAnswer}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900">
              Calculator inputs
            </h2>

            <div className="mt-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-900">
                  Units per dose
                </label>
                <input
                  ref={unitsRef}
                  value={units}
                  onChange={(e) =>
                    setUnits(e.target.value.replace(/[^0-9.]/g, ""))
                  }
                  onKeyDown={onKeyDown}
                  inputMode="decimal"
                  className={[
                    "mt-2 w-full rounded-xl border bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2",
                    attempted && !parsed.unitsValid
                      ? "border-rose-300 focus:ring-rose-300"
                      : "border-slate-300 focus:ring-cyan-400",
                  ].join(" ")}
                  placeholder="e.g. 20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900">
                  Times per day
                </label>
                <input
                  value={times}
                  onChange={(e) =>
                    setTimes(e.target.value.replace(/[^0-9.]/g, ""))
                  }
                  onKeyDown={onKeyDown}
                  inputMode="decimal"
                  className={[
                    "mt-2 w-full rounded-xl border bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2",
                    attempted && !parsed.timesValid
                      ? "border-rose-300 focus:ring-rose-300"
                      : "border-slate-300 focus:ring-cyan-400",
                  ].join(" ")}
                  placeholder="e.g. 1"
                />
              </div>

              {error ? (
                <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
                  {error}
                </div>
              ) : null}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={calculate}
                  className={`${PRESS} flex-1 rounded-xl bg-cyan-600 py-3 text-sm font-semibold text-white hover:bg-cyan-700`}
                >
                  Confirm
                </button>

                <button
                  onClick={reset}
                  className={`${PRESS} flex-1 rounded-xl border border-slate-300 bg-white py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50`}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-bold text-slate-900">
                Product details
              </h2>

              <div className="mt-4 space-y-3 text-sm text-slate-700">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <span className="font-semibold text-slate-900">Prime:</span>{" "}
                  {prime} units
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <span className="font-semibold text-slate-900">
                    Expiration:
                  </span>{" "}
                  {medicine.expire ?? "—"} days
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <span className="font-semibold text-slate-900">
                    Total units:
                  </span>{" "}
                  {medicine.unitsInPen ?? "—"}
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <span className="font-semibold text-slate-900">
                    Pens per box:
                  </span>{" "}
                  {medicine.pensAmount ?? "—"}
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
              <h2 className="text-xl font-bold text-amber-900">
                Professional use notice
              </h2>

              <p className="mt-3 text-sm leading-7 text-amber-800">
                Verify calculations against the prescription, product labeling,
                payer requirements, and professional judgment before using the
                result for dispensing or billing.
              </p>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}
