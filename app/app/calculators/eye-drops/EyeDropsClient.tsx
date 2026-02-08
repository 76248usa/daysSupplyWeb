"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export default function EyeDropsClient() {
  const [volumeMl, setVolumeMl] = useState("5"); // bottle size
  const [dropsPerDose, setDropsPerDose] = useState("1");
  const [dosesPerDay, setDosesPerDay] = useState("4");
  const [dropsPerMl, setDropsPerMl] = useState("20"); // common default

  const result = useMemo(() => {
    const v = Number(volumeMl);
    const d = Number(dropsPerDose);
    const t = Number(dosesPerDay);
    const dpm = Number(dropsPerMl);

    if (![v, d, t, dpm].every((x) => Number.isFinite(x) && x > 0)) return null;

    const totalDrops = v * dpm;
    const dailyDrops = d * t;
    const days = Math.floor(totalDrops / dailyDrops);

    return { days };
  }, [volumeMl, dropsPerDose, dosesPerDay, dropsPerMl]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="flex items-center justify-between">
        <Link
          href="/app"
          className="px-4 py-2 rounded border border-slate-600 hover:bg-slate-900"
        >
          Home
        </Link>
        <div className="text-sm text-slate-400">Eye Drops Calculator</div>
      </div>

      <h1 className="text-2xl font-extrabold text-center mt-5">Eye Drops</h1>

      {result && (
        <div className="mt-6 max-w-xl mx-auto border border-slate-800 rounded-xl p-4 bg-slate-950">
          <div className="text-center">
            <div className="text-slate-400 text-sm">Days&apos; supply</div>
            <div className="text-yellow-300 text-5xl font-black">
              {result.days}
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 max-w-md mx-auto space-y-4">
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
        <p className="text-center text-xs text-slate-500 pt-2">
          Note: drops/mL varies by product. Use manufacturer info when
          available.
        </p>
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
