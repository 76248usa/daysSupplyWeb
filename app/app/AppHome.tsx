"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { medicineData } from "@/lib/medicineData";
import { Search } from "lucide-react";
import { usePro } from "@/context/ProContext";
import { useSearchParams, useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseBrowser";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const TRIAL_LINE =
  "Start a 1-month free trial. Then $10 per year. Cancel anytime.";

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

// ✅ One consistent “native tap” style you can reuse everywhere
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

  const checkout = searchParams.get("checkout"); // success/cancel/null

  const { effectiveIsPro, isLoading, status, refreshWithRetry } = usePro();

  const [activating, setActivating] = useState(false);

  const AUTH_DISABLED = process.env.NEXT_PUBLIC_AUTH_DISABLED === "1";

  // Stripe billing portal
  const [portalLoading, setPortalLoading] = useState(false);
  const [portalError, setPortalError] = useState<string | null>(null);

  // ✅ Subscription confidence (from /api/pro-status)
  const [subStatus, setSubStatus] = useState<string | null>(null);
  const [currentPeriodEnd, setCurrentPeriodEnd] = useState<string | null>(null);
  const [trialEndsInDays, setTrialEndsInDays] = useState<number | null>(null);

  // ✅ App-style header menu (Terms/Privacy/Disclaimer)
  const [menuOpen, setMenuOpen] = useState(false);
  function closeMenu() {
    setMenuOpen(false);
  }

  // Close menu on ESC + outside click
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    function onClickOutside(e: MouseEvent) {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (t.closest?.("[data-more-menu]")) return; // clicks inside menu
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

  // ✅ Autofocus search (nice app feel)
  // useEffect(() => {
  //   const id = window.setTimeout(() => {
  //     if (shouldAvoidStealingFocus()) return;
  //     const el = document.getElementById(
  //       "insulin-search",
  //     ) as HTMLInputElement | null;
  //     el?.focus();
  //   }, 80);
  //   return () => window.clearTimeout(id);
  // }, []);

  // ✅ Autofocus search (desktop only – avoid iPhone keyboard pop)
  useEffect(() => {
    const id = window.setTimeout(() => {
      if (shouldAvoidStealingFocus()) return;

      // Prevent keyboard auto-open on touch devices
      const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

      if (isTouch) return;

      const el = document.getElementById(
        "insulin-search",
      ) as HTMLInputElement | null;

      el?.focus();
    }, 80);

    return () => window.clearTimeout(id);
  }, []);

  // B) If we returned from Stripe with checkout=success, persist it and retry refresh.
  useEffect(() => {
    if (checkout !== "success") return;

    setRecentCheckoutNow();
    setActivating(true);

    refreshWithRetry({ attempts: 8, delayMs: 1500 }).catch(() => {});

    // ✅ Clean the URL
    router.replace("/app");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkout]);

  // C1) If Pro becomes true, stop activating + clear flag immediately
  useEffect(() => {
    if (!effectiveIsPro) return;
    clearRecentCheckout();
    setActivating(false);
  }, [effectiveIsPro]);

  // C2) If not Pro but we recently checked out, retry a few times then stop
  useEffect(() => {
    if (effectiveIsPro) return;

    if (!hasRecentCheckout()) {
      setActivating(false);
      return;
    }

    let cancelled = false;
    setActivating(true);

    refreshWithRetry({ attempts: 6, delayMs: 1500 })
      .catch(() => {})
      .finally(() => {
        if (cancelled) return;

        if (!effectiveIsPro) {
          clearRecentCheckout();
        }
        setActivating(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectiveIsPro]);

  // ✅ D) Fetch pro-status details (renewal date + trial countdown)
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        if (AUTH_DISABLED) {
          if (!cancelled) {
            setSubStatus("active");
            setCurrentPeriodEnd(null);
            setTrialEndsInDays(null);
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
          }
          return;
        }

        const res = await fetch("/api/pro-status", {
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

        if (!cancelled) {
          setSubStatus(eff);
          setCurrentPeriodEnd(cpe);
          setTrialEndsInDays(ted);
        }
      } catch {
        if (!cancelled) {
          setSubStatus(null);
          setCurrentPeriodEnd(null);
          setTrialEndsInDays(null);
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

      if (!token) {
        throw new Error("Please sign in to manage billing.");
      }

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

  const canOpenDetails = effectiveIsPro || activating;

  const showAlreadyProSignIn =
    !AUTH_DISABLED && status === "no_user" && !effectiveIsPro && !activating;

  const showManageBilling =
    !AUTH_DISABLED && status !== "no_user" && effectiveIsPro && !isLoading;

  const proConfidenceLine = useMemo(() => {
    if (AUTH_DISABLED) return "Pro enabled (dev mode)";

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

    return "Subscription verified";
  }, [AUTH_DISABLED, subStatus, trialEndsInDays, currentPeriodEnd]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
    >
      <main className="min-h-screen bg-slate-950 text-slate-100">
        <div className="mx-auto max-w-2xl p-6">
          {/* Header actions */}
          <div className="flex items-center justify-end gap-3">
            {showManageBilling ? (
              <div className="flex flex-col items-end gap-1">
                <button
                  onClick={openBillingPortal}
                  disabled={portalLoading}
                  className={`${PRESS} rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 disabled:opacity-60 disabled:hover:bg-slate-900`}
                >
                  {portalLoading ? "Opening billing…" : "Manage billing"}
                </button>
                {portalError ? (
                  <div className="text-[11px] text-rose-300">{portalError}</div>
                ) : null}
              </div>
            ) : null}

            {!AUTH_DISABLED && status !== "no_user" ? (
              <button
                onClick={signOut}
                className={`${PRESS} rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-slate-300 hover:bg-slate-800`}
              >
                Sign out
              </button>
            ) : null}

            {/* ✅ More menu */}
            <div className="relative" data-more-menu>
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="More"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                className={`${PRESS} rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-slate-300 hover:bg-slate-800`}
              >
                ⋯
              </button>

              {menuOpen ? (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border border-slate-800 bg-slate-950 shadow-xl"
                >
                  <Link
                    href="/terms"
                    onClick={closeMenu}
                    role="menuitem"
                    className={`${PRESS} block px-4 py-3 text-sm text-slate-200 hover:bg-slate-900`}
                  >
                    Terms
                  </Link>

                  <Link
                    href="/privacy"
                    onClick={closeMenu}
                    role="menuitem"
                    className={`${PRESS} block px-4 py-3 text-sm text-slate-200 hover:bg-slate-900`}
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
                    className={`${PRESS} w-full text-left px-4 py-3 text-sm text-slate-200 hover:bg-slate-900`}
                  >
                    Disclaimer
                  </button>
                </div>
              ) : null}
            </div>
          </div>

          <h1 className="mt-3 text-2xl font-extrabold text-center">
            Insulin Days’ Supply Calculator with Priming
          </h1>

          <p className="text-center text-slate-300 mt-2">
            Professional insulin day-supply calculations with priming and
            expiration logic.
          </p>

          {/* ✅ Compact Pro banner */}
          <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/60 p-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="text-sm text-slate-200 font-semibold">
                {AUTH_DISABLED
                  ? "Pro is enabled in development mode."
                  : TRIAL_LINE}
                <div className="text-xs text-slate-400 mt-1">
                  {AUTH_DISABLED
                    ? "Checkout is disabled while auth is disabled."
                    : "Secure checkout via Stripe • Cancel anytime"}
                </div>

                {showAlreadyProSignIn ? (
                  <div className="mt-2 text-xs">
                    <Link
                      href={`/login?next=${encodeURIComponent("/app")}`}
                      className={`${PRESS} inline-flex text-cyan-400 hover:brightness-110 text-sm font-semibold underline underline-offset-4`}
                    >
                      Already Pro? Sign in
                    </Link>
                  </div>
                ) : null}
              </div>

              <div className="sm:text-right">
                {isLoading ? (
                  <div className="text-xs text-slate-400">Checking…</div>
                ) : effectiveIsPro ? (
                  <div className="inline-flex flex-col items-start rounded-lg border border-emerald-700/40 bg-emerald-900/20 px-3 py-2">
                    <div className="text-emerald-200 text-xs font-semibold">
                      Pro active ✓
                    </div>
                    <div className="mt-0.5 text-[11px] text-emerald-100/80">
                      {proConfidenceLine}
                    </div>
                  </div>
                ) : activating ? (
                  <div className="inline-flex items-center rounded-lg border border-slate-700/40 bg-slate-950/30 px-3 py-2 text-slate-200 text-xs font-semibold">
                    Activating…
                  </div>
                ) : AUTH_DISABLED ? (
                  <div className="inline-flex items-center rounded-lg border border-slate-700/40 bg-slate-950/30 px-3 py-2 text-slate-200 text-xs font-semibold">
                    Checkout disabled (dev)
                  </div>
                ) : (
                  <button
                    onClick={async () => {
                      const AUTH_DISABLED =
                        process.env.NEXT_PUBLIC_AUTH_DISABLED === "1";
                      if (AUTH_DISABLED) {
                        // In dev auth-disabled mode, just go to upgrade (or do nothing)
                        window.location.href = "/app/upgrade";
                        return;
                      }

                      const { data } = await supabaseBrowser.auth.getSession();
                      const token = data.session?.access_token;

                      if (!token) {
                        window.location.href = `/login?next=${encodeURIComponent("/app/upgrade")}`;
                        return;
                      }

                      window.location.href = "/app/upgrade";
                    }}
                    className={`${PRESS} inline-flex items-center justify-center rounded-lg bg-cyan-400 px-4 py-2 text-sm font-extrabold text-slate-900 hover:brightness-110`}
                  >
                    Start Free Trial
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="mt-5 relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none"
            />
            <input
              id="insulin-search"
              className="w-full rounded-xl border border-slate-800 bg-slate-900 pl-10 pr-4 py-3 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="Search insulin name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Medicines list */}
          <div className="mt-4 space-y-3">
            {filtered.map((m) =>
              canOpenDetails ? (
                <Link
                  key={m.id}
                  href={`/app/medicine/${m.id}`}
                  className={`${PRESS} block rounded-xl border border-slate-800 bg-slate-900 p-4 hover:bg-slate-800`}
                >
                  <div className="text-lg font-bold tracking-tight text-white">
                    {m.name}
                  </div>
                  {m.addToName ? (
                    <div className="mt-0.5 text-base font-semibold text-white">
                      {m.addToName}
                    </div>
                  ) : null}
                </Link>
              ) : (
                <Link
                  key={m.id}
                  href="/app/upgrade"
                  className={`${PRESS} block rounded-xl border border-slate-800 bg-slate-900 p-4 hover:bg-slate-800 opacity-75`}
                >
                  <div className="text-lg font-bold tracking-tight text-white">
                    {m.name}
                  </div>
                  {m.addToName ? (
                    <div className="mt-0.5 text-base font-semibold text-white">
                      {m.addToName}
                    </div>
                  ) : null}
                  <div className="mt-2 text-xs text-amber-200">
                    Start trial to calculate
                  </div>
                </Link>
              ),
            )}
          </div>

          {/* Disclaimer anchor for the menu */}
          {/* <div
            id="disclaimer"
            className="mt-6 text-center text-xs text-slate-400"
          >
            We do not sell user information.
            <p className="mt-4 text-center text-xs text-slate-500">
              For licensed pharmacy professionals only.
            </p>
            <p className="mt-2 text-center text-xs text-slate-500">
              This software tool is independently developed and is not
              affiliated with any pharmaceutical manufacturer.
            </p>
          </div> */}

          <div
            id="disclaimer"
            className="mt-6 text-center text-xs text-slate-400 max-w-xl mx-auto"
          >
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <p className="font-semibold text-slate-200">
                Professional Use Notice
              </p>

              <p className="mt-3 text-slate-400">
                This calculator is intended for licensed healthcare
                professionals. It provides insulin day-supply estimates based on
                user-entered dosing information, product characteristics,
                priming assumptions, and expiration limits.
              </p>

              <p className="mt-3 text-slate-400">
                Results are provided for clinical support only and do not
                replace independent professional judgment. Users must verify all
                calculations against the prescription, manufacturer labeling,
                payer requirements, and applicable regulations.
              </p>

              <p className="mt-3 text-slate-400">
                By using this tool, users acknowledge that final responsibility
                for prescription verification and documentation remains with the
                dispensing professional.
              </p>

              <p className="mt-3 text-slate-400">
                This software is independently developed, not affiliated with
                any pharmaceutical manufacturer, does not provide medical
                advice, and is not intended for patient use.
              </p>

              <p className="mt-4 text-slate-500">
                We do not sell user information.
              </p>
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
}
