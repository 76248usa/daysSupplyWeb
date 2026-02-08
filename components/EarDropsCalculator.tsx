"use client";

import { useMemo, useState } from "react";

export default function EarDropsCalculator() {
  const [volumeMl, setVolumeMl] = useState("10");
  const [dropsPerDose, setDropsPerDose] = useState("3");
  const [dosesPerDay, setDosesPerDay] = useState("2");
  const [dropsPerMl, setDropsPerMl] = useState("20");
  const [discardDays, setDiscardDays] = useState("");

  const result = useMemo(() => {
    const v = Number(volumeMl);
    const d = Number(dropsPerDose);
    const t = Number(dosesPerDay);
    const dpm = Number(dropsPerMl);
    const cap = Number(discardDays);

    if (![v, d, t, dpm].every((x) => Number.isFinite(x) && x > 0)) return null;

    const totalDrops = v * dpm;
    const dailyDrops = d * t;
    const rawDays = Math.floor(totalDrops / dailyDrops);

    if (Number.isFinite(cap) && cap > 0)
      return Math.min(rawDays, Math.floor(cap));
    return rawDays;
  }, [volumeMl, dropsPerDose, dosesPerDay, dropsPerMl, discardDays]);

  return (
    <div className="mt-6 max-w-xl mx-auto">
      <h2 className="text-xl font-extrabold text-center">Ear Drops</h2>
      <p className="text-center text-sm text-slate-400 mt-1">
        Days’ supply updates instantly as you type.
      </p>

      {result !== null && (
        <div className="mt-5 border border-slate-800 rounded-xl p-4 bg-slate-950">
          <div className="text-center">
            <div className="text-slate-400 text-sm">Days&apos; supply</div>
            <div className="text-yellow-300 text-5xl font-black">{result}</div>
          </div>
        </div>
      )}

      <div className="mt-5 space-y-4">
        <Field
          label="Bottle size (mL)"
          value={volumeMl}
          setValue={setVolumeMl}
        />
        <Field
          label="Drops per dose"
          value={dropsPerDose}
          setValue={setDropsPerDose}
        />
        <Field
          label="Doses per day"
          value={dosesPerDay}
          setValue={setDosesPerDay}
        />
        <Field
          label="Drops per mL (default 20)"
          value={dropsPerMl}
          setValue={setDropsPerMl}
        />
        <Field
          label="Discard after opening (days) — optional"
          value={discardDays}
          setValue={setDiscardDays}
        />
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  setValue,
}: {
  label: string;
  value: string;
  setValue: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-slate-200 mb-2">{label}</label>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value.replace(/[^0-9.]/g, ""))}
        inputMode="decimal"
        className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 text-slate-100"
      />
    </div>
  );
}
