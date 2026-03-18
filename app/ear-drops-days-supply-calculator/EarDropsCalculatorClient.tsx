"use client";

import { useMemo, useState } from "react";

const DEFAULT_DROPS_PER_ML = 20;

function formatNumber(value: number | null, digits = 1) {
  if (value == null || Number.isNaN(value)) return "—";
  return value.toFixed(digits);
}

export default function EarDropsCalculatorClient() {
  const [bottleCount, setBottleCount] = useState("1");
  const [bottleSizeMl, setBottleSizeMl] = useState("10");
  const [dropsPerMl, setDropsPerMl] = useState(String(DEFAULT_DROPS_PER_ML));
  const [leftEarDropsPerDose, setLeftEarDropsPerDose] = useState("0");
  const [rightEarDropsPerDose, setRightEarDropsPerDose] = useState("0");
  const [timesPerDay, setTimesPerDay] = useState("2");
  const [durationDays, setDurationDays] = useState("");

  const bottleCountNum = Number.parseFloat(bottleCount);
  const bottleSizeMlNum = Number.parseFloat(bottleSizeMl);
  const dropsPerMlNum = Number.parseFloat(dropsPerMl);
  const leftEarDropsPerDoseNum = Number.parseFloat(leftEarDropsPerDose);
  const rightEarDropsPerDoseNum = Number.parseFloat(rightEarDropsPerDose);
  const timesPerDayNum = Number.parseFloat(timesPerDay);
  const durationDaysNum = Number.parseFloat(durationDays);

  const totalDrops = useMemo(() => {
    if (
      !Number.isFinite(bottleCountNum) ||
      !Number.isFinite(bottleSizeMlNum) ||
      !Number.isFinite(dropsPerMlNum)
    ) {
      return null;
    }

    if (bottleCountNum <= 0 || bottleSizeMlNum <= 0 || dropsPerMlNum <= 0) {
      return null;
    }

    return bottleCountNum * bottleSizeMlNum * dropsPerMlNum;
  }, [bottleCountNum, bottleSizeMlNum, dropsPerMlNum]);

  const dropsPerDay = useMemo(() => {
    if (
      !Number.isFinite(leftEarDropsPerDoseNum) ||
      !Number.isFinite(rightEarDropsPerDoseNum) ||
      !Number.isFinite(timesPerDayNum)
    ) {
      return null;
    }

    if (
      leftEarDropsPerDoseNum < 0 ||
      rightEarDropsPerDoseNum < 0 ||
      timesPerDayNum <= 0
    ) {
      return null;
    }

    const totalDropsPerAdministration =
      leftEarDropsPerDoseNum + rightEarDropsPerDoseNum;

    if (totalDropsPerAdministration <= 0) {
      return null;
    }

    return totalDropsPerAdministration * timesPerDayNum;
  }, [leftEarDropsPerDoseNum, rightEarDropsPerDoseNum, timesPerDayNum]);

  const estimatedDaysSupply = useMemo(() => {
    if (totalDrops == null || dropsPerDay == null || dropsPerDay <= 0) {
      return null;
    }

    return totalDrops / dropsPerDay;
  }, [totalDrops, dropsPerDay]);

  const uncappedRoundedDownDaysSupply = useMemo(() => {
    if (estimatedDaysSupply == null) return null;
    return Math.floor(estimatedDaysSupply);
  }, [estimatedDaysSupply]);

  const finalRoundedDownDaysSupply = useMemo(() => {
    if (uncappedRoundedDownDaysSupply == null) return null;

    if (!Number.isFinite(durationDaysNum) || durationDaysNum <= 0) {
      return uncappedRoundedDownDaysSupply;
    }

    return Math.min(uncappedRoundedDownDaysSupply, Math.floor(durationDaysNum));
  }, [uncappedRoundedDownDaysSupply, durationDaysNum]);

  const durationCapApplied = useMemo(() => {
    if (
      finalRoundedDownDaysSupply == null ||
      uncappedRoundedDownDaysSupply == null ||
      !Number.isFinite(durationDaysNum) ||
      durationDaysNum <= 0
    ) {
      return false;
    }

    return finalRoundedDownDaysSupply < uncappedRoundedDownDaysSupply;
  }, [
    finalRoundedDownDaysSupply,
    uncappedRoundedDownDaysSupply,
    durationDaysNum,
  ]);

  return (
    <>
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">Calculator inputs</h2>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="bottleCount"
              className="block text-sm font-semibold text-slate-900"
            >
              Number of bottles
            </label>
            <input
              id="bottleCount"
              type="number"
              min="1"
              step="1"
              value={bottleCount}
              onChange={(e) => setBottleCount(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900"
            />
          </div>

          <div>
            <label
              htmlFor="bottleSizeMl"
              className="block text-sm font-semibold text-slate-900"
            >
              Bottle size (mL)
            </label>
            <input
              id="bottleSizeMl"
              type="number"
              min="0"
              step="0.1"
              value={bottleSizeMl}
              onChange={(e) => setBottleSizeMl(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900"
            />
          </div>

          <div>
            <label
              htmlFor="dropsPerMl"
              className="block text-sm font-semibold text-slate-900"
            >
              Estimated drops per mL
            </label>
            <input
              id="dropsPerMl"
              type="number"
              min="1"
              step="1"
              value={dropsPerMl}
              onChange={(e) => setDropsPerMl(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900"
            />
            <p className="mt-2 text-xs text-slate-500">
              Default workflow value is {DEFAULT_DROPS_PER_ML} drops per mL.
            </p>
          </div>

          <div>
            <label
              htmlFor="timesPerDay"
              className="block text-sm font-semibold text-slate-900"
            >
              Administrations per day
            </label>
            <input
              id="timesPerDay"
              type="number"
              min="1"
              step="1"
              value={timesPerDay}
              onChange={(e) => setTimesPerDay(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900"
            />
          </div>

          <div>
            <label
              htmlFor="leftEarDropsPerDose"
              className="block text-sm font-semibold text-slate-900"
            >
              Left ear drops per administration
            </label>
            <input
              id="leftEarDropsPerDose"
              type="number"
              min="0"
              step="1"
              value={leftEarDropsPerDose}
              onChange={(e) => setLeftEarDropsPerDose(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900"
            />
          </div>

          <div>
            <label
              htmlFor="rightEarDropsPerDose"
              className="block text-sm font-semibold text-slate-900"
            >
              Right ear drops per administration
            </label>
            <input
              id="rightEarDropsPerDose"
              type="number"
              min="0"
              step="1"
              value={rightEarDropsPerDose}
              onChange={(e) => setRightEarDropsPerDose(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="durationDays"
              className="block text-sm font-semibold text-slate-900"
            >
              Optional duration cap (days)
            </label>
            <input
              id="durationDays"
              type="number"
              min="1"
              step="1"
              value={durationDays}
              onChange={(e) => setDurationDays(e.target.value)}
              placeholder="Example: 7"
              className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900"
            />
            <p className="mt-2 text-xs text-slate-500">
              Enter 0 for an ear that is not being treated. If directions say
              “for 7 days,” you can cap the calculated supply here.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <section className="rounded-3xl border border-cyan-100 bg-cyan-50 p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">Results</h2>

            <div className="mt-5 space-y-4">
              <div className="rounded-2xl bg-white p-4">
                <p className="text-sm font-medium text-slate-600">
                  Total drops
                </p>
                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {formatNumber(totalDrops, 0)}
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4">
                <p className="text-sm font-medium text-slate-600">
                  Drops used per day
                </p>
                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {formatNumber(dropsPerDay, 0)}
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4">
                <p className="text-sm font-medium text-slate-600">
                  Estimated days supply
                </p>
                <p className="mt-1 text-3xl font-bold text-cyan-700">
                  {formatNumber(estimatedDaysSupply, 1)}
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4">
                <p className="text-sm font-medium text-slate-600">
                  Rounded down whole days
                </p>
                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {uncappedRoundedDownDaysSupply ?? "—"}
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4">
                <p className="text-sm font-medium text-slate-600">
                  Final billed days supply
                </p>
                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {finalRoundedDownDaysSupply ?? "—"}
                </p>
                {durationCapApplied ? (
                  <p className="mt-2 text-xs text-slate-500">
                    Duration cap applied from prescription directions.
                  </p>
                ) : null}
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Formula used</h2>

            <div className="mt-4 rounded-2xl bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">
                Days Supply = Total Drops in Bottle ÷ Drops Used Per Day
              </p>
            </div>

            <p className="mt-4 text-sm leading-7 text-slate-700">
              Total Drops = bottle count × bottle size (mL) × drops per mL
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              Drops Used Per Day = (left ear drops + right ear drops) × times
              per day
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              Final billed days supply = lesser of rounded-down calculated days
              supply or optional duration cap
            </p>
          </section>
        </div>

        <div>
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900">
              Notes for pharmacy workflow
            </h2>

            <div className="mt-6 grid gap-4">
              {[
                "Left and right ear dosing can be entered separately.",
                "Drops per mL is an estimate and may vary by bottle design.",
                "A fixed duration such as 7 days may cap billed supply.",
                "Always follow your pharmacy workflow and payer requirements.",
              ].map((note) => (
                <div
                  key={note}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-700"
                >
                  {note}
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
