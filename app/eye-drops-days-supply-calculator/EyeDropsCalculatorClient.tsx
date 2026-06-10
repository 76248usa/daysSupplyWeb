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

const LATANOPROST_NDC_OVERRIDES: Record<
  string,
  {
    manufacturer: string;
    bottleSizeMl: number;
    dropsPerBottle: number;
    standardDaysSupply: number;
    message: string;
  }
> = {
  "68462094403": {
    manufacturer: "Glenmark",
    bottleSizeMl: 2.5,
    dropsPerBottle: 50,
    standardDaysSupply: 25,
    message:
      "This manufacturer specifies that each 2.5 mL bottle has 50 drops. Standard dosing: 1 bottle is 25 days.",
  },
  "70069042101": {
    manufacturer: "Somerset",
    bottleSizeMl: 2.5,
    dropsPerBottle: 70,
    standardDaysSupply: 35,
    message:
      "This manufacturer specifies that each 2.5 mL bottle has 70 drops. Standard dosing: 1 bottle is 35 days.",
  },
  "24208046325": {
    manufacturer: "Bausch + Lomb",
    bottleSizeMl: 2.5,
    dropsPerBottle: 89,
    standardDaysSupply: 44,
    message:
      "This manufacturer specifies that each 2.5 mL bottle has 89 drops. Standard dosing: 1 bottle is 44 days.",
  },
  "61314054701": {
    manufacturer: "Sandoz",
    bottleSizeMl: 2.5,
    dropsPerBottle: 87,
    standardDaysSupply: 43,
    message:
      "This manufacturer specifies that each 2.5 mL bottle has 87 drops. Standard dosing: 1 bottle is 43 days.",
  },
  "61314054703": {
    manufacturer: "Sandoz",
    bottleSizeMl: 2.5,
    dropsPerBottle: 87,
    standardDaysSupply: 43,
    message:
      "This manufacturer specifies that each 2.5 mL bottle has 87 drops. Standard dosing: 1 bottle is 43 days.",
  },
  "59762033302": {
    manufacturer: "Viatris",
    bottleSizeMl: 2.5,
    dropsPerBottle: 80,
    standardDaysSupply: 40,
    message:
      "This manufacturer specifies that each 2.5 mL bottle has 80 drops. Standard dosing: 1 bottle is 40 days.",
  },
  "58151041935": {
    manufacturer: "Viatris",
    bottleSizeMl: 2.5,
    dropsPerBottle: 80,
    standardDaysSupply: 40,
    message:
      "This manufacturer specifies that each 2.5 mL bottle has 80 drops. Standard dosing: 1 bottle is 40 days.",
  },
};

const PRESS =
  "select-none cursor-pointer active:scale-[0.97] transition-transform";

function normalizeNdc(value?: string | null) {
  return (value ?? "").replace(/\D/g, "");
}

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
  const [hasChosenProduct, setHasChosenProduct] = useState(false);

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

  const filteredItems = useMemo(() => {
    const q = productSearch.trim().toLowerCase();

    if (!q) return items.slice(0, 24);

    return items
      .filter((item) => {
        const generic = (item.genericName || "").toLowerCase().trim();
        const brand = (item.brandName || "").toLowerCase().trim();
        const packageNdc = (item.packageNdc || "").toLowerCase().trim();
        const productNdc = (item.productNdc || "").toLowerCase().trim();

        return (
          generic.startsWith(q) ||
          brand.startsWith(q) ||
          generic.split(/\s+/).some((word) => word.startsWith(q)) ||
          brand.split(/\s+/).some((word) => word.startsWith(q)) ||
          packageNdc.startsWith(q) ||
          productNdc.startsWith(q)
        );
      })
      .slice(0, 50);
  }, [items, productSearch]);

  const selectedItem = useMemo(
    () => items.find((item) => item.packageNdc === selectedPackageNdc) ?? null,
    [items, selectedPackageNdc],
  );

  const latanoprostOverride = useMemo(() => {
    if (!selectedItem) return null;

    const packageNdc = normalizeNdc(selectedItem.packageNdc);
    const productNdc = normalizeNdc(selectedItem.productNdc);

    return (
      LATANOPROST_NDC_OVERRIDES[packageNdc] ??
      LATANOPROST_NDC_OVERRIDES[productNdc] ??
      null
    );
  }, [selectedItem]);

  useEffect(() => {
    if (!selectedItem) return;

    if (latanoprostOverride) {
      setBottleSizeMl(String(latanoprostOverride.bottleSizeMl));
      setDropsPerMl("");
      setTimesPerDay("1");
      setLeftEyeDropsPerDose("1");
      setRightEyeDropsPerDose("1");
      return;
    }

    if (selectedItem.bottleSizeMl != null) {
      setBottleSizeMl(String(selectedItem.bottleSizeMl));
    }

    if (!dropsPerMl) {
      setDropsPerMl(String(DEFAULT_DROPS_PER_ML));
    }
  }, [selectedItem, latanoprostOverride, dropsPerMl]);

  const bottleCountNum = Number.parseFloat(bottleCount);
  const bottleSizeMlNum = Number.parseFloat(bottleSizeMl);
  const dropsPerMlNum = Number.parseFloat(dropsPerMl);
  const leftEyeDropsPerDoseNum = Number.parseFloat(leftEyeDropsPerDose);
  const rightEyeDropsPerDoseNum = Number.parseFloat(rightEyeDropsPerDose);
  const timesPerDayNum = Number.parseFloat(timesPerDay);

  const totalDrops = useMemo(() => {
    if (!Number.isFinite(bottleCountNum) || bottleCountNum <= 0) {
      return null;
    }

    if (latanoprostOverride) {
      return bottleCountNum * latanoprostOverride.dropsPerBottle;
    }

    if (!Number.isFinite(bottleSizeMlNum) || !Number.isFinite(dropsPerMlNum)) {
      return null;
    }

    if (bottleSizeMlNum <= 0 || dropsPerMlNum <= 0) {
      return null;
    }

    return bottleCountNum * bottleSizeMlNum * dropsPerMlNum;
  }, [bottleCountNum, bottleSizeMlNum, dropsPerMlNum, latanoprostOverride]);

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
                  onChange={(e) => {
                    const value = e.target.value;
                    setProductSearch(value);
                    setHasChosenProduct(false);

                    if (!value.trim()) {
                      setSelectedPackageNdc("");
                    }
                  }}
                  placeholder="e.g. latanoprost, timolol, NDC"
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />

                {productSearch.trim() &&
                !hasChosenProduct &&
                !isLoading &&
                !loadError ? (
                  <p className="mt-2 text-xs text-slate-500">
                    {filteredItems.length} matching product
                    {filteredItems.length === 1 ? "" : "s"}
                  </p>
                ) : null}
              </div>

              {!hasChosenProduct && (
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
                        {filteredItems.map((item) => (
                          <button
                            key={item.packageNdc || buildProductLabel(item)}
                            type="button"
                            onClick={() => {
                              setSelectedPackageNdc(item.packageNdc);
                              setProductSearch(
                                item.genericName ||
                                  item.brandName ||
                                  item.packageNdc ||
                                  "",
                              );
                              setHasChosenProduct(true);
                            }}
                            className={`${PRESS} w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-left transition hover:border-cyan-200 hover:bg-cyan-50/40`}
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
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {selectedItem && (
                <div className="sm:col-span-2 rounded-2xl border border-cyan-200 bg-cyan-50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        Selected product
                      </div>
                      <div className="mt-1 text-sm font-semibold text-slate-900">
                        {selectedItem.genericName ||
                          selectedItem.brandName ||
                          "Product"}
                      </div>
                      <div className="mt-1 text-xs text-slate-600">
                        {selectedItem.brandName &&
                        selectedItem.brandName !== selectedItem.genericName
                          ? `${selectedItem.brandName} • `
                          : ""}
                        {selectedItem.packageNdc
                          ? `NDC ${selectedItem.packageNdc}`
                          : ""}
                        {selectedItem.bottleSizeMl != null
                          ? ` • ${selectedItem.bottleSizeMl} mL`
                          : ""}
                      </div>
                      {selectedItem.packageDescription ? (
                        <div className="mt-1 text-xs text-slate-500">
                          {selectedItem.packageDescription}
                        </div>
                      ) : null}

                      {latanoprostOverride ? (
                        <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs leading-5 text-emerald-800">
                          <div className="font-bold text-emerald-900">
                            Manufacturer-specific latanoprost edit
                          </div>
                          <div className="mt-1">
                            {latanoprostOverride.message}
                          </div>
                          <div className="mt-1">
                            Manufacturer: {latanoprostOverride.manufacturer}
                          </div>
                          <div className="mt-1">
                            Drops per bottle:{" "}
                            {latanoprostOverride.dropsPerBottle}
                          </div>
                        </div>
                      ) : null}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setHasChosenProduct(false);
                        setProductSearch("");
                        setSelectedPackageNdc("");
                        setBottleSizeMl("");
                        setDropsPerMl(String(DEFAULT_DROPS_PER_ML));
                      }}
                      className={`${PRESS} rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50`}
                    >
                      Change
                    </button>
                  </div>
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
                  disabled={Boolean(latanoprostOverride)}
                  onChange={(e) => setBottleSizeMl(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:bg-slate-100 disabled:text-slate-500"
                />
                {latanoprostOverride ? (
                  <p className="mt-2 text-xs text-slate-500">
                    Bottle size is fixed from the manufacturer-specific
                    latanoprost edit.
                  </p>
                ) : selectedItem?.bottleSizeMl != null ? (
                  <p className="mt-2 text-xs text-slate-500">
                    Auto-detected from NDC package description.
                  </p>
                ) : null}
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
                  disabled={Boolean(latanoprostOverride)}
                  onChange={(e) => setDropsPerMl(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:bg-slate-100 disabled:text-slate-500"
                />
                <p className="mt-2 text-xs text-slate-500">
                  {latanoprostOverride
                    ? "Manufacturer-specific drops per bottle are being used for this NDC."
                    : `Default workflow value is ${DEFAULT_DROPS_PER_ML} drops per mL.`}
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
                  {latanoprostOverride ? (
                    <p className="mt-1 text-xs font-semibold text-emerald-700">
                      Using {latanoprostOverride.dropsPerBottle} drops per
                      bottle × {bottleCount || "—"} bottle
                      {bottleCount === "1" ? "" : "s"}.
                    </p>
                  ) : null}
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

              {latanoprostOverride ? (
                <>
                  <p className="mt-4 text-sm leading-7 text-slate-700">
                    Total Drops = bottle count × manufacturer-specific drops per
                    bottle
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-700">
                    For this NDC, the manufacturer-specific value is{" "}
                    <span className="font-semibold">
                      {latanoprostOverride.dropsPerBottle} drops per 2.5 mL
                      bottle
                    </span>
                    .
                  </p>
                </>
              ) : (
                <p className="mt-4 text-sm leading-7 text-slate-700">
                  Total Drops = bottle count × bottle size (mL) × drops per mL
                </p>
              )}

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
              latanoprostOverride
                ? "This selected latanoprost NDC uses a manufacturer-specific drops-per-bottle value."
                : "Drops per mL is an estimate and may vary by bottle design.",
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
