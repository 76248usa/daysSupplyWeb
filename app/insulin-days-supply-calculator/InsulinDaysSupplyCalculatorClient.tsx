"use client";

import { useMemo, useState } from "react";
import { Search, ArrowLeft, ChevronDown } from "lucide-react";
import { medicineData } from "@/lib/medicineData";
import DetailsClient from "@/app/app/medicine/[id]/DetailsClient";

const PRESS =
  "select-none cursor-pointer active:scale-[0.97] transition-transform";

export default function InsulinDaysSupplyCalculatorClient() {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectorOpen, setSelectorOpen] = useState(true);

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

  const selectedMedicine = useMemo(
    () => medicineData.find((m) => m.id === selectedId) ?? null,
    [selectedId],
  );

  function handleSelect(id: number) {
    setSelectedId(id);
    setSelectorOpen(false);
  }

  function handleBackHome() {
    setSelectedId(null);
    setSelectorOpen(true);
  }

  return (
    <div className="space-y-2">
      {selectedMedicine ? (
        <div className="sticky top-0 z-20 rounded-2xl border border-slate-200 bg-white/95 shadow-sm backdrop-blur">
          <div className="flex items-center justify-between gap-2 px-3 py-2">
            <button
              type="button"
              onClick={handleBackHome}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-semibold text-cyan-700 hover:bg-slate-100"
            >
              <ArrowLeft className="h-4 w-4" />
              Home
            </button>

            <button
              type="button"
              onClick={() => setSelectorOpen((v) => !v)}
              className="inline-flex min-w-0 items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
            >
              <span className="truncate max-w-[180px] sm:max-w-none">
                {selectedMedicine.name}
              </span>
              <ChevronDown
                className={[
                  "h-4 w-4 shrink-0 transition-transform",
                  selectorOpen ? "rotate-180" : "",
                ].join(" ")}
              />
            </button>
          </div>
        </div>
      ) : null}

      {!selectedMedicine || selectorOpen ? (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-2.5 sm:p-3">
          {!selectedMedicine ? (
            <>
              <h3 className="text-lg font-semibold text-slate-900 sm:text-xl">
                Select an insulin product
              </h3>

              <p className="mt-1 text-[11px] text-slate-700 sm:text-xs">
                Search for an insulin product, then use the calculator below to
                estimate days supply with priming and expiration considerations.
              </p>
            </>
          ) : (
            <div className="mb-2 flex items-center justify-between gap-2">
              <div className="text-sm font-semibold text-slate-900">
                Change insulin product
              </div>
              <button
                type="button"
                onClick={() => setSelectorOpen(false)}
                className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Hide
              </button>
            </div>
          )}

          <div className="relative mt-3">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search insulin name..."
              className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {filtered.map((m) => {
              const isSelected = selectedId === m.id;

              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => handleSelect(m.id)}
                  className={[
                    PRESS,
                    "rounded-xl border p-3 text-left transition",
                    isSelected
                      ? "border-cyan-500 bg-cyan-50"
                      : "border-slate-200 bg-white hover:bg-slate-50",
                  ].join(" ")}
                >
                  <div className="text-sm font-bold tracking-tight text-slate-900 sm:text-base">
                    {m.name}
                  </div>

                  {m.addToName ? (
                    <div className="mt-0.5 text-xs font-medium text-slate-600 sm:text-sm">
                      {m.addToName}
                    </div>
                  ) : null}

                  {m.ndc ? (
                    <div className="mt-1.5 text-[11px] text-slate-500">
                      {m.ndc}
                    </div>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {selectedMedicine ? (
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <DetailsClient
            key={selectedMedicine.id}
            medicine={selectedMedicine}
          />
        </section>
      ) : (
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <p className="text-sm text-slate-700 sm:text-base">
            Select an insulin product above to begin calculating days supply.
          </p>
        </section>
      )}
    </div>
  );
}
