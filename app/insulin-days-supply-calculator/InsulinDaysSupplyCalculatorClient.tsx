"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { medicineData, type Medicine } from "@/lib/medicineData";
import DetailsClient from "@/app/app/medicine/[id]/DetailsClient";

const PRESS =
  "select-none cursor-pointer active:scale-[0.97] transition-transform";

export default function InsulinDaysSupplyCalculatorClient() {
  const [search, setSearch] = useState("");
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(
    null,
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return medicineData;

    return medicineData.filter((m) => {
      const haystack = [
        m.name,
        m.addToName ?? "",
        m.ndc ?? "",
        m.seoTitle ?? "",
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [search]);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
        <h3 className="text-xl font-semibold text-slate-900">
          Select an insulin product
        </h3>

        <p className="mt-2 text-slate-700">
          Search for an insulin product, then use the calculator below to
          estimate days supply with priming and expiration considerations.
        </p>

        <div className="mt-5 relative">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search insulin name..."
            className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {filtered.map((m) => {
            const isSelected = selectedMedicine?.id === m.id;

            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelectedMedicine(m)}
                className={[
                  PRESS,
                  "rounded-2xl border p-4 text-left transition",
                  isSelected
                    ? "border-cyan-500 bg-cyan-50"
                    : "border-slate-200 bg-white hover:bg-slate-50",
                ].join(" ")}
              >
                <div className="text-base font-bold tracking-tight text-slate-900">
                  {m.name}
                </div>

                {m.addToName ? (
                  <div className="mt-0.5 text-sm font-medium text-slate-600">
                    {m.addToName}
                  </div>
                ) : null}

                {m.ndc ? (
                  <div className="mt-2 text-xs text-slate-500">{m.ndc}</div>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      {selectedMedicine ? (
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <DetailsClient medicine={selectedMedicine} />
        </section>
      ) : (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-slate-700">
            Select an insulin product above to begin calculating days supply.
          </p>
        </section>
      )}
    </div>
  );
}
