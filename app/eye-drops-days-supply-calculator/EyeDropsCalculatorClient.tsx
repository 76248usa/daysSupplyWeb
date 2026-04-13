"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type EyeDropItem = {
  productNdc: string;
  packageNdc: string;
  brandName: string;
  genericName: string;
  labelerName: string;
  dosageForm: string;
  route: string;
  marketingStatus: string;
  packageDescription: string;
  bottleSizeMl: number | null;
};

const DEFAULT_DROPS_PER_ML = 20;

const PRESS =
  "select-none cursor-pointer active:scale-[0.97] transition-transform";

function formatNumber(value: number | null, digits = 1) {
  if (value == null || Number.isNaN(value)) return "—";
  return value.toFixed(digits);
}

function buildProductLabel(item: EyeDropItem) {
  const primary =
    item.genericName || item.brandName || item.packageNdc || "Product";
  const ndc = item.packageNdc ? ` • NDC ${item.packageNdc}` : "";
  const bottle = item.bottleSizeMl != null ? ` • ${item.bottleSizeMl} mL` : "";
  return `${primary}${ndc}${bottle}`;
}

export default function EyeDropsCalculatorClient() {
  const [items, setItems] = useState<EyeDropItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [productSearch, setProductSearch] = useState("");
  const [selectedPackageNdc, setSelectedPackageNdc] = useState("");
  const [bottleCount, setBottleCount] = useState("1");
  const [bottleSizeMl, setBottleSizeMl] = useState("");
  const [dropsPerMl, setDropsPerMl] = useState(String(DEFAULT_DROPS_PER_ML));
  const [leftEyeDropsPerDose, setLeftEyeDropsPerDose] = useState("1");
  const [rightEyeDropsPerDose, setRightEyeDropsPerDose] = useState("1");
  const [timesPerDay, setTimesPerDay] = useState("2");

  useEffect(() => {
    let active = true;

    async function loadData() {
      try {
        setIsLoading(true);
        setLoadError(null);

        const res = await fetch("/api/eye-drops-ndc", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const json = (await res.json()) as { items?: EyeDropItem[] };
        if (!active) return;

        const loaded = Array.isArray(json.items) ? json.items : [];
        setItems(loaded);
      } catch {
        if (!active) return;
        setLoadError("Failed to load eye-drop reference data.");
      } finally {
        if (active) setIsLoading(false);
      }
    }

    loadData();

    return () => {
      active = false;
    };
  }, []);

  // const filteredItems = useMemo(() => {
  //   const q = productSearch.trim().toLowerCase();
  //   if (!q) return items.slice(0, 24);

  //   return items
  //     .filter((item) => {
  //       const haystack = [
  //         item.genericName,
  //         item.brandName,
  //         item.packageNdc,
  //         item.productNdc,
  //         item.labelerName,
  //         item.packageDescription,
  //       ]
  //         .filter(Boolean)
  //         .join(" ")
  //         .toLowerCase();

  //       return haystack.includes(q);
  //     })
  //     .slice(0, 50);
  // }, [items, productSearch]);

  const filteredItems = useMemo(() => {
    const q = productSearch.trim().toLowerCase();

    if (!q) return items.slice(0, 24);

    const scored = items
      .map((item) => {
        const generic = (item.genericName || "").toLowerCase().trim();
        const brand = (item.brandName || "").toLowerCase().trim();
        const packageNdc = (item.packageNdc || "").toLowerCase().trim();
        const productNdc = (item.productNdc || "").toLowerCase().trim();

        const searchablePrimary = [
          generic,
          brand,
          packageNdc,
          productNdc,
        ].filter(Boolean);

        let score = -1;

        // Best match: starts with generic or brand
        if (generic.startsWith(q)) score = Math.max(score, 100);
        if (brand.startsWith(q)) score = Math.max(score, 95);

        // Word-start match: e.g. "tim" matches second word too
        if (generic.split(/\s+/).some((word) => word.startsWith(q))) {
          score = Math.max(score, 90);
        }

        if (brand.split(/\s+/).some((word) => word.startsWith(q))) {
          score = Math.max(score, 85);
        }

        // Exact/partial NDC match
        if (packageNdc.startsWith(q) || productNdc.startsWith(q)) {
          score = Math.max(score, 80);
        }

        // Broader contains match only on main product identity fields
        if (searchablePrimary.some((value) => value.includes(q))) {
          score = Math.max(score, 60);
        }

        return { item, score };
      })
      .filter((entry) => entry.score >= 0)
      .sort((a, b) => b.score - a.score);

    return scored.slice(0, 50).map((entry) => entry.item);
  }, [items, productSearch]);

  const selectedItem = useMemo(
    () => items.find((item) => item.packageNdc === selectedPackageNdc) ?? null,
    [items, selectedPackageNdc],
  );

  useEffect(() => {
    if (!selectedItem) return;

    if (selectedItem.bottleSizeMl != null) {
      setBottleSizeMl(String(selectedItem.bottleSizeMl));
    }
  }, [selectedItem]);

  const bottleCountNum = Number.parseFloat(bottleCount);
  const bottleSizeMlNum = Number.parseFloat(bottleSizeMl);
  const dropsPerMlNum = Number.parseFloat(dropsPerMl);
  const leftEyeDropsPerDoseNum = Number.parseFloat(leftEyeDropsPerDose);
  const rightEyeDropsPerDoseNum = Number.parseFloat(rightEyeDropsPerDose);
  const timesPerDayNum = Number.parseFloat(timesPerDay);

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
      !Number.isFinite(leftEyeDropsPerDoseNum) ||
      !Number.isFinite(rightEyeDropsPerDoseNum) ||
      !Number.isFinite(timesPerDayNum)
    ) {
      return null;
    }

    if (
      leftEyeDropsPerDoseNum < 0 ||
      rightEyeDropsPerDoseNum < 0 ||
      timesPerDayNum <= 0
    ) {
      return null;
    }

    const totalDropsPerAdministration =
      leftEyeDropsPerDoseNum + rightEyeDropsPerDoseNum;

    if (totalDropsPerAdministration <= 0) {
      return null;
    }

    return totalDropsPerAdministration * timesPerDayNum;
  }, [leftEyeDropsPerDoseNum, rightEyeDropsPerDoseNum, timesPerDayNum]);

  const estimatedDaysSupply = useMemo(() => {
    if (totalDrops == null || dropsPerDay == null || dropsPerDay <= 0) {
      return null;
    }

    return totalDrops / dropsPerDay;
  }, [totalDrops, dropsPerDay]);

  const roundedDownDaysSupply = useMemo(() => {
    if (estimatedDaysSupply == null) return null;
    return Math.floor(estimatedDaysSupply);
  }, [estimatedDaysSupply]);

  return (
    <div className="bg-white text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-cyan-700">
          <span className="text-slate-500">Resources:</span>

          <Link
            href="/how-to-calculate-eye-drop-days-supply"
            className="underline hover:no-underline"
          >
            Guide
          </Link>

          <span>•</span>

          <Link
            href="/eye-drops-ndc-reference"
            className="underline hover:no-underline"
          >
            NDC Reference
          </Link>
        </div>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900">
              Calculator inputs
            </h2>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="productSearch"
                  className="block text-sm font-semibold text-slate-900"
                >
                  Search eye-drop product
                </label>
                <input
                  id="productSearch"
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="e.g. latanoprost, timolol, NDC"
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />

                {productSearch.trim() && !isLoading && !loadError ? (
                  <p className="mt-2 text-xs text-slate-500">
                    {filteredItems.length} matching product
                    {filteredItems.length === 1 ? "" : "s"}
                  </p>
                ) : null}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-900">
                  Matching products
                </label>

                <div className="mt-2 max-h-72 overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50 p-2">
                  {isLoading ? (
                    <p className="p-3 text-sm text-slate-500">
                      Loading FDA eye-drop data…
                    </p>
                  ) : loadError ? (
                    <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
                      {loadError}
                    </div>
                  ) : filteredItems.length === 0 ? (
                    <p className="p-3 text-sm text-slate-500">
                      No matching products found.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {filteredItems.map((item) => {
                        const isSelected =
                          item.packageNdc === selectedPackageNdc;

                        return (
                          <button
                            key={item.packageNdc || buildProductLabel(item)}
                            type="button"
                            onClick={() =>
                              setSelectedPackageNdc(item.packageNdc)
                            }
                            className={[
                              PRESS,
                              "w-full rounded-xl border px-4 py-3 text-left transition",
                              isSelected
                                ? "border-cyan-300 bg-cyan-50"
                                : "border-slate-200 bg-white hover:border-cyan-200 hover:bg-cyan-50/40",
                            ].join(" ")}
                          >
                            <div className="text-sm font-semibold text-slate-900">
                              {item.genericName || item.brandName || "Product"}
                            </div>

                            <div className="mt-1 text-xs text-slate-600">
                              {item.brandName &&
                              item.brandName !== item.genericName
                                ? `${item.brandName} • `
                                : ""}
                              {item.packageNdc ? `NDC ${item.packageNdc}` : ""}
                              {item.bottleSizeMl != null
                                ? ` • ${item.bottleSizeMl} mL`
                                : ""}
                            </div>

                            {item.packageDescription ? (
                              <div className="mt-1 text-xs text-slate-500">
                                {item.packageDescription}
                              </div>
                            ) : null}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {selectedItem && (
                <div className="sm:col-span-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">
                    Selected product
                  </div>
                  <div className="mt-1 text-sm text-slate-700">
                    {buildProductLabel(selectedItem)}
                  </div>
                  {selectedItem.packageDescription ? (
                    <div className="mt-1 text-xs text-slate-500">
                      {selectedItem.packageDescription}
                    </div>
                  ) : null}
                </div>
              )}

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
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-400"
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
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
                {selectedItem?.bottleSizeMl != null && (
                  <p className="mt-2 text-xs text-slate-500">
                    Auto-detected from NDC package description.
                  </p>
                )}
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
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-400"
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
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>

              <div>
                <label
                  htmlFor="leftEyeDropsPerDose"
                  className="block text-sm font-semibold text-slate-900"
                >
                  Left eye drops per administration
                </label>
                <input
                  id="leftEyeDropsPerDose"
                  type="number"
                  min="0"
                  step="1"
                  value={leftEyeDropsPerDose}
                  onChange={(e) => setLeftEyeDropsPerDose(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>

              <div>
                <label
                  htmlFor="rightEyeDropsPerDose"
                  className="block text-sm font-semibold text-slate-900"
                >
                  Right eye drops per administration
                </label>
                <input
                  id="rightEyeDropsPerDose"
                  type="number"
                  min="0"
                  step="1"
                  value={rightEyeDropsPerDose}
                  onChange={(e) => setRightEyeDropsPerDose(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>

              <div className="sm:col-span-2">
                <p className="text-xs text-slate-500">
                  Enter 0 for an eye that is not being treated.
                </p>
              </div>
            </div>
          </div>

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
                    {roundedDownDaysSupply ?? "—"}
                  </p>
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
                Drops Used Per Day = (left eye drops + right eye drops) × times
                per day
              </p>
            </section>
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Notes for pharmacy workflow
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              "Bottle size may be auto-detected from FDA package description.",
              "Drops per mL is an estimate and may vary by bottle design.",
              "Left and right eye dosing can be entered separately.",
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
    </div>
  );
}
