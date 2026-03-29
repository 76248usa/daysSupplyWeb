"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { medicineData } from "@/lib/medicineData";
import { Search, ShieldCheck } from "lucide-react";
import { usePro } from "@/context/ProContext";
import { useSearchParams, useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseBrowser";
import { motion } from "framer-motion";
import InstallCalculatorCard from "@/components/InstallCalculatorCard";
//import FallbackBanner from "@/components/FallbackBanner";

const RECENT_KEY = "ds_recent_checkout_ts";
const RECENT_MS = 10 * 60 * 1000; // 10 minutes

function hasRecentCheckout(): boolean {
  if (typeof window === "undefined") return false;
  const raw = window.sessionStorage.getItem(RECENT_KEY);
  const ts = raw ? Number(raw) : 0;
  return Number.isFinite(ts) && ts > 0 && Date.now() - ts < RECENT_MS;
}

function setRecentCheckoutNow() {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(RECENT_KEY, String(Date.now()));
}

function clearRecentCheckout() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(RECENT_KEY);
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

const PRESS =
  "select-none cursor-pointer active:scale-[0.97] transition-transform";

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

export default function AppHome() {
  const [search, setSearch] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const checkout = searchParams.get("checkout");

  const { effectiveIsPro, isLoading, status, refreshWithRetry } = usePro();

  const [activating, setActivating] = useState(false);

  const AUTH_DISABLED = process.env.NEXT_PUBLIC_AUTH_DISABLED === "1";

  const [portalLoading, setPortalLoading] = useState(false);
  const [portalError, setPortalError] = useState<string | null>(null);

  const [subStatus, setSubStatus] = useState<string | null>(null);
  const [currentPeriodEnd, setCurrentPeriodEnd] = useState<string | null>(null);
  const [trialEndsInDays, setTrialEndsInDays] = useState<number | null>(null);
  const [cancelAtPeriodEnd, setCancelAtPeriodEnd] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }

    function onClickOutside(e: MouseEvent) {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (t.closest?.("[data-more-menu]")) return;
      setMenuOpen(false);
    }

    if (menuOpen) {
      window.addEventListener("keydown", onKeyDown);
      window.addEventListener("click", onClickOutside);
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("click", onClickOutside);
    };
  }, [menuOpen]);

  useEffect(() => {
    const id = window.setTimeout(() => {
      if (shouldAvoidStealingFocus()) return;
      const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      if (isTouch) return;

      const el = document.getElementById(
        "insulin-search",
      ) as HTMLInputElement | null;

      el?.focus();
    }, 80);

    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (checkout !== "success") return;

    setRecentCheckoutNow();
    setActivating(true);

    refreshWithRetry({ attempts: 10, delayMs: 1200 }).catch(() => {});

    router.replace("/app");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkout]);

  useEffect(() => {
    if (!effectiveIsPro) return;
    clearRecentCheckout();
    setActivating(false);
  }, [effectiveIsPro]);

  useEffect(() => {
    if (effectiveIsPro) return;

    if (!hasRecentCheckout()) {
      setActivating(false);
      return;
    }

    let cancelled = false;
    setActivating(true);

    refreshWithRetry({ attempts: 8, delayMs: 1500 })
      .catch(() => {})
      .finally(() => {
        if (cancelled) return;
        if (!effectiveIsPro) clearRecentCheckout();
        setActivating(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectiveIsPro]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        if (AUTH_DISABLED) {
          if (!cancelled) {
            setSubStatus("active");
            setCurrentPeriodEnd(null);
            setTrialEndsInDays(null);
            setCancelAtPeriodEnd(false);
          }
          return;
        }

        const { data } = await supabaseBrowser.auth.getSession();
        const token = data.session?.access_token;

        if (!token) {
          if (!cancelled) {
            setSubStatus(null);
            setCurrentPeriodEnd(null);
            setTrialEndsInDays(null);
            setCancelAtPeriodEnd(false);
          }
          return;
        }

        const res = await fetch("/api/pro-status", {
          method: "GET",
          cache: "no-store",
          headers: { Authorization: `Bearer ${token}` },
        });

        const json = await res.json().catch(() => ({}));

        const eff =
          (json?.effectiveStatus as string | undefined) ??
          (json?.status as string | undefined) ??
          null;

        const cpe =
          (json?.current_period_end as string | null | undefined) ?? null;

        const ted =
          typeof json?.trialEndsInDays === "number"
            ? json.trialEndsInDays
            : null;

        const cape = Boolean(json?.cancel_at_period_end);

        if (!cancelled) {
          setSubStatus(eff);
          setCurrentPeriodEnd(cpe);
          setTrialEndsInDays(ted);
          setCancelAtPeriodEnd(cape);
        }
      } catch {
        if (!cancelled) {
          setSubStatus(null);
          setCurrentPeriodEnd(null);
          setTrialEndsInDays(null);
          setCancelAtPeriodEnd(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [AUTH_DISABLED, effectiveIsPro, status]);

  async function signOut() {
    await supabaseBrowser.auth.signOut();
  }

  async function openBillingPortal() {
    setPortalError(null);
    setPortalLoading(true);

    try {
      const { data } = await supabaseBrowser.auth.getSession();
      const token = data.session?.access_token;

      if (!token) throw new Error("Please sign in to manage billing.");

      const res = await fetch("/api/stripe/create-portal", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok)
        throw new Error(json?.error || "Failed to open billing portal.");
      if (!json?.url) throw new Error("No billing portal URL returned.");

      window.location.href = json.url;
    } catch (e: any) {
      setPortalError(e?.message ?? "Failed to open billing portal.");
    } finally {
      setPortalLoading(false);
    }
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return medicineData;
    return medicineData.filter((m) => m.name.toLowerCase().includes(q));
  }, [search]);

  const showManageBilling =
    !AUTH_DISABLED && status !== "no_user" && effectiveIsPro && !isLoading;

  const proConfidenceLine = useMemo(() => {
    if (AUTH_DISABLED) return "Pro enabled (dev mode)";

    const s = (subStatus ?? "").toLowerCase();
    const dt = formatDateShort(currentPeriodEnd);

    if (cancelAtPeriodEnd) {
      if (dt) return `Ends ${dt} • Cancellation scheduled`;
      return "Cancellation scheduled";
    }

    if (s === "trialing") {
      const d = trialEndsInDays ?? daysUntil(currentPeriodEnd);
      if (d == null) return "Trial active";
      if (d === 0) return "Trial ends today";
      if (d === 1) return "Trial ends in 1 day";
      return `Trial ends in ${d} days`;
    }

    if (dt) return `Renews ${dt}`;

    return "Subscription verified";
  }, [
    AUTH_DISABLED,
    subStatus,
    trialEndsInDays,
    currentPeriodEnd,
    cancelAtPeriodEnd,
  ]);

  const searchSection = (
    <section className="mt-4 rounded-2xl border-2 border-cyan-100 bg-white p-4 shadow-sm sm:mt-6 sm:rounded-3xl sm:border sm:border-slate-200 sm:p-8">
      <h2 className="text-lg font-bold leading-tight text-slate-900 sm:text-2xl">
        Search insulin products
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-700 sm:mt-3 sm:text-base">
        Select an insulin product to open the calculator and estimate days
        supply using product-specific priming and expiration logic.
      </p>

      <section className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
        <Link
          href="/insulin-days-supply-calculator"
          className="rounded-xl border border-cyan-200 bg-cyan-50 p-3 text-center text-xs font-semibold text-slate-900 shadow-sm"
        >
          💉 Insulin
        </Link>
        <Link
          href="/eye-drops-days-supply-calculator"
          className="rounded-xl border border-slate-200 bg-white p-3 text-center text-xs font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
        >
          👁️ Eye Drops
        </Link>

        <Link
          href="/ear-drops-days-supply-calculator"
          className="rounded-xl border border-slate-200 bg-white p-3 text-center text-xs font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
        >
          👂 Ear Drops
        </Link>
      </section>

      <div className="mt-4 relative sm:mt-5">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 sm:left-4 sm:size-[18px]"
        />
        <input
          id="insulin-search"
          className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 sm:py-3 sm:pl-10 sm:pr-4"
          placeholder="Search insulin name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <p className="mt-2 text-[11px] text-slate-500 flex gap-4">
        See full calculation method →
        <Link
          href="/insulin-days-supply-calculator"
          className="text-cyan-700 underline ml-1"
        >
          insulin day supply explanation
        </Link>
        <Link
          href="/insulin-days-supply-calculator"
          className="text-xs text-cyan-700 underline"
        >
          Learn how insulin days supply is calculated →
        </Link>
      </p>

      <div className="mt-4 grid gap-2.5 sm:mt-5 sm:grid-cols-2 sm:gap-3">
        {filtered.map((m) => (
          <Link
            key={m.id}
            href={`/app/medicine/${m.id}`}
            className={`${PRESS} block rounded-xl border border-slate-200 bg-slate-50 p-3 transition hover:bg-slate-100 sm:rounded-2xl sm:p-4`}
          >
            <div className="text-base font-bold tracking-tight text-slate-900 sm:text-lg">
              {m.name}
            </div>

            {m.addToName ? (
              <div className="mt-0.5 text-xs font-medium text-slate-600 sm:text-sm">
                {m.addToName}
              </div>
            ) : null}
          </Link>
        ))}
      </div>
    </section>
  );

  const installSection = (
    <div className="mt-4 sm:mt-6">
      <InstallCalculatorCard appName="Insulin Calculator" />
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
    >
      <main className="min-h-screen bg-white text-slate-900">
        <div className="mx-auto max-w-5xl px-3 py-5 sm:px-6 sm:py-8 lg:px-8">
          <div className="flex items-center justify-end gap-2 sm:gap-3">
            {showManageBilling ? (
              <div className="flex flex-col items-end gap-1">
                <button
                  onClick={openBillingPortal}
                  disabled={portalLoading}
                  className={`${PRESS} rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60 sm:rounded-xl sm:px-3 sm:py-2 sm:text-xs`}
                >
                  {portalLoading ? "Opening billing…" : "Manage billing"}
                </button>
                {portalError ? (
                  <div className="text-[10px] text-rose-700 sm:text-[11px]">
                    {portalError}
                  </div>
                ) : null}
              </div>
            ) : null}

            {!AUTH_DISABLED && status !== "no_user" ? (
              <button
                onClick={signOut}
                className={`${PRESS} rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 sm:rounded-xl sm:px-3 sm:py-2 sm:text-xs`}
              >
                Sign out
              </button>
            ) : null}

            <div className="relative" data-more-menu>
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="More"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                className={`${PRESS} rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 sm:rounded-xl sm:px-3 sm:py-2 sm:text-xs`}
              >
                ⋯
              </button>

              {menuOpen ? (
                <div
                  role="menu"
                  className="absolute right-0 z-20 mt-2 w-44 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg"
                >
                  <Link
                    href="/terms"
                    onClick={closeMenu}
                    role="menuitem"
                    className={`${PRESS} block px-4 py-3 text-sm text-slate-700 hover:bg-slate-50`}
                  >
                    Terms
                  </Link>

                  <Link
                    href="/privacy"
                    onClick={closeMenu}
                    role="menuitem"
                    className={`${PRESS} block px-4 py-3 text-sm text-slate-700 hover:bg-slate-50`}
                  >
                    Privacy
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      closeMenu();
                      document.getElementById("disclaimer")?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
                    role="menuitem"
                    className={`${PRESS} w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-50`}
                  >
                    Disclaimer
                  </button>
                </div>
              ) : null}
            </div>
          </div>
          {/* </div>

          <section className="mt-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:mt-4 sm:rounded-3xl sm:p-8">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-700 sm:mb-3 sm:text-sm">
              Pharmacist Tool
            </p>

            <h1 className="text-xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Insulin Days Supply Calculator with Priming
            </h1>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-700 sm:mt-4 sm:text-lg sm:leading-8">
              Professional insulin day-supply calculations with priming and
              expiration logic.
            </p>

            <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 sm:mt-5 sm:rounded-2xl sm:px-4 sm:py-3">
              <div className="flex items-start gap-2.5 sm:gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 sm:h-5 sm:w-5" />

                <div className="text-xs leading-5 text-slate-700 sm:text-sm sm:leading-relaxed">
                  <span className="font-semibold text-slate-900">
                    Free for Pharmacists, Pharmacy Technicians and other
                    Healthcare Professionals.
                  </span>
                  <div className="mt-0.5 text-[11px] text-slate-500 sm:mt-1 sm:text-xs">
                    Designed to support accurate day-supply calculations in
                    pharmacy workflow.
                  </div>
                </div>
              </div>
            </div>

            {effectiveIsPro && (
              <div className="mt-3 inline-flex flex-col items-start rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-2 sm:mt-4 sm:px-3">
                <div className="text-[11px] font-semibold text-emerald-800 sm:text-xs">
                  Pro active ✓
                </div>
                <div className="mt-0.5 text-[10px] text-emerald-700 sm:text-[11px]">
                  {proConfidenceLine}
                </div>
              </div>
            )}
          </section> */}

          <section className="mt-3 rounded-2xl border border-slate-200 bg-white px-3 py-3 shadow-sm sm:mt-4 sm:px-5 sm:py-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <img
                    src="/icons/icon-192.png"
                    alt="Insulin Days Supply Calculator"
                    className="h-7 w-7 rounded-md sm:h-8 sm:w-8"
                  />
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-700 sm:text-[11px]">
                      Pharmacist Tool
                    </p>
                    <h1 className="truncate text-sm font-bold leading-tight text-slate-900 sm:text-lg">
                      Insulin Days Supply Calculator with Priming
                    </h1>
                  </div>
                </div>

                <p className="mt-1 text-[11px] leading-4 text-slate-600 sm:mt-1.5 sm:text-xs">
                  Free for Pharmacists, Pharmacy Technicians and other
                  Healthcare Professionals.
                </p>
              </div>

              {effectiveIsPro ? (
                <div className="shrink-0 rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-1.5 text-right">
                  <div className="text-[10px] font-semibold text-emerald-800">
                    Pro active ✓
                  </div>
                  <div className="text-[10px] text-emerald-700">
                    {proConfidenceLine}
                  </div>
                </div>
              ) : (
                <div className="shrink-0 rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-1.5">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="text-[10px] font-semibold text-emerald-800">
                      Free professional tool
                    </span>
                  </div>
                </div>
              )}
            </div>
          </section>
          {/* <FallbackBanner /> */}

          <p className="mt-2 text-[11px] text-slate-600">
            Learn how insulin days supply is calculated →
            <Link
              href="/insulin-days-supply-calculator"
              className="text-cyan-700 underline ml-1"
            >
              insulin days supply calculator guide
            </Link>
          </p>

          <div className="sm:hidden">{searchSection}</div>
          <div className="hidden sm:block">{installSection}</div>
          <div className="sm:hidden">{installSection}</div>
          <div className="hidden sm:block">{searchSection}</div>

          <div
            id="disclaimer"
            className="mx-auto mt-6 max-w-3xl rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-800 shadow-sm sm:mt-8 sm:rounded-3xl sm:p-6 sm:text-sm"
          >
            <p className="font-semibold text-amber-900">
              Professional Use Notice
            </p>
            <p className="mt-2 sm:mt-3">
              This calculator is intended for licensed healthcare professionals.
              It provides insulin day-supply estimates based on user-entered
              dosing information, product characteristics, priming assumptions,
              and expiration limits.
            </p>
            <p className="mt-2 sm:mt-3">
              Results are provided for clinical support only and do not replace
              independent professional judgment. Users must verify all
              calculations against the prescription, manufacturer labeling,
              payer requirements, and applicable regulations.
            </p>
            <p className="mt-2 sm:mt-3">
              By using this tool, users acknowledge that final responsibility
              for prescription verification and documentation remains with the
              dispensing professional.
            </p>
            <p className="mt-2 sm:mt-3">
              This software is independently developed, not affiliated with any
              pharmaceutical manufacturer, does not provide medical advice, and
              is not intended for patient use.
            </p>
            <p className="mt-3 sm:mt-4 text-amber-700">
              We do not sell user information.
            </p>
            <p className="mt-1.5 sm:mt-2 text-amber-700">
              Support: support@insulinprimingdayssupply.com
            </p>
          </div>
        </div>
      </main>
    </motion.div>
  );
}
