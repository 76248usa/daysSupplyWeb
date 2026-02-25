"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { medicineData } from "@/lib/medicineData";
import EyeDropsCalculator from "@/components/EyeDropsCalculator";
import EarDropsCalculator from "@/components/EarDropsCalculatorClient";
import { Search } from "lucide-react";
import { usePro } from "@/context/ProContext";
import { useSearchParams, useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

const TRIAL_LINE =
  "Start a 1-month free trial. Then $10 per year. Cancel anytime.";

type Tab = "medicines" | "eye" | "ear";

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

function isTab(v: string | null): v is Tab {
  return v === "medicines" || v === "eye" || v === "ear";
}

export default function AppHome() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<Tab>("medicines");

  const router = useRouter();
  const searchParams = useSearchParams();

  const checkout = searchParams.get("checkout"); // success/cancel/null
  const tabParam = searchParams.get("tab"); // medicines/eye/ear/null

  const { effectiveIsPro, isLoading, status, refreshWithRetry } = usePro();

  const [activating, setActivating] = useState(false);

  const AUTH_DISABLED = process.env.NEXT_PUBLIC_AUTH_DISABLED === "1";

  // Stripe billing portal
  const [portalLoading, setPortalLoading] = useState(false);
  const [portalError, setPortalError] = useState<string | null>(null);

  // A) Support landing pages: /app?tab=eye (etc)
  useEffect(() => {
    if (isTab(tabParam)) setTab(tabParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabParam]);

  // B) If we returned from Stripe with checkout=success, persist it and retry refresh.
  useEffect(() => {
    if (checkout !== "success") return;

    setRecentCheckoutNow();
    setActivating(true);

    refreshWithRetry({ attempts: 8, delayMs: 1500 }).catch(() => {});

    // ✅ Clean the URL but preserve tab
    const next = isTab(tabParam) ? `/app?tab=${tabParam}` : "/app";
    router.replace(next);

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

        // If Pro still isn't active after retries, stop and clear the flag
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

  async function signOut() {
    await supabaseBrowser.auth.signOut();
  }

  // ✅ UPDATED: sends Bearer token because your /api/stripe/create-portal route requires it
  async function openBillingPortal() {
    setPortalError(null);
    setPortalLoading(true);

    try {
      // Get current session + JWT
      const { data: sessionData, error: sessErr } =
        await supabaseBrowser.auth.getSession();
      if (sessErr) throw sessErr;

      const token = sessionData.session?.access_token;
      if (!token) {
        throw new Error("Please sign in to manage billing.");
      }

      const returnUrl = `${window.location.origin}${
        isTab(tabParam) ? `/app?tab=${tabParam}` : "/app"
      }`;

      const res = await fetch("/api/stripe/create-portal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ returnUrl }),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        // Your portal route returns { error, detail } on failures — show the useful one.
        throw new Error(
          json?.detail || json?.error || "Failed to open billing portal.",
        );
      }

      if (!json?.url) throw new Error("No billing portal URL returned.");
      window.location.href = json.url;
    } catch (e: any) {
      setPortalError(e?.message ?? "Something went wrong.");
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

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-2xl p-6">
        <div className="flex items-center justify-end gap-3">
          {/* Manage billing button (only when Pro + signed in + auth enabled) */}
          {showManageBilling ? (
            <div className="flex flex-col items-end gap-1">
              <button
                type="button"
                onClick={openBillingPortal}
                disabled={portalLoading}
                className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 disabled:opacity-60 disabled:hover:bg-slate-900"
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
              type="button"
              onClick={signOut}
              className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-slate-300 hover:bg-slate-800"
            >
              Sign out
            </button>
          ) : null}
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

              {/* ✅ Subtle: Already Pro? Sign in */}
              {showAlreadyProSignIn ? (
                <div className="mt-2 text-xs">
                  <Link
                    href={`/login?next=${encodeURIComponent(
                      isTab(tabParam) ? `/app?tab=${tabParam}` : "/app",
                    )}`}
                    className="text-cyan-400 hover:brightness-110 text-sm font-semibold underline underline-offset-4"
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
                <div className="inline-flex items-center rounded-lg border border-emerald-700/40 bg-emerald-900/20 px-3 py-2 text-emerald-200 text-xs font-semibold">
                  Pro active ✓
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
                <Link
                  href="/app/upgrade"
                  className="inline-flex items-center justify-center rounded-lg bg-cyan-400 px-4 py-2 text-sm font-extrabold text-slate-900 hover:brightness-110"
                >
                  Start Free Trial
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Segmented toggle */}
        <div className="mt-5 flex justify-center">
          <div className="inline-flex rounded-xl border border-slate-800 bg-slate-900 p-1">
            <TabButton
              active={tab === "medicines"}
              onClick={() => setTab("medicines")}
            >
              Medicines
            </TabButton>
            <TabButton active={tab === "eye"} onClick={() => setTab("eye")}>
              Eye drops
            </TabButton>
            <TabButton active={tab === "ear"} onClick={() => setTab("ear")}>
              Ear drops
            </TabButton>
          </div>
        </div>

        {tab === "medicines" ? <DisclaimerAccordion /> : null}

        {/* Search only when on Medicines tab */}
        {tab === "medicines" ? (
          <div className="mt-5 relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              className="w-full rounded-xl border border-slate-800 bg-slate-900 pl-10 pr-4 py-3 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="Search insulin name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        ) : null}

        {/* Content area */}
        {tab === "eye" ? (
          <EyeDropsCalculator />
        ) : tab === "ear" ? (
          <EarDropsCalculator />
        ) : (
          <div className="mt-4 space-y-3">
            {filtered.map((m) =>
              canOpenDetails ? (
                <Link
                  key={m.id}
                  href={`/app/medicine/${m.id}`}
                  className="block rounded-xl border border-slate-800 bg-slate-900 p-4 hover:bg-slate-800"
                >
                  <div className="text-lg font-bold">{m.name}</div>
                  {m.addToName ? (
                    <div className="text-sm text-slate-300">{m.addToName}</div>
                  ) : null}
                </Link>
              ) : (
                <Link
                  key={m.id}
                  href="/app/upgrade"
                  className="block rounded-xl border border-slate-800 bg-slate-900 p-4 hover:bg-slate-800 opacity-70"
                >
                  <div className="text-lg font-bold">{m.name}</div>
                  {m.addToName ? (
                    <div className="text-sm text-slate-300">{m.addToName}</div>
                  ) : null}
                  <div className="mt-2 text-xs text-amber-200">
                    Start trial to calculate
                  </div>
                </Link>
              ),
            )}
          </div>
        )}

        <div className="mt-3 text-center text-xs text-slate-400">
          We do not sell user information.
          <p className="mt-4 text-center text-xs text-slate-500">
            For licensed pharmacy professionals only.
          </p>
          <p className="mt-2 text-center text-xs text-slate-500">
            This software tool is independently developed and is not affiliated
            with any pharmaceutical manufacturer.
          </p>
        </div>

        <details className="mt-6 text-xs text-slate-500 max-w-xl mx-auto">
          <summary className="cursor-pointer text-center">
            About this insulin calculator
          </summary>
          <p className="mt-2 text-center">
            This insulin days supply calculator helps pharmacy professionals
            calculate accurate day-supply quantities for insulin pens and
            related products, incorporating priming adjustments and expiration
            constraints commonly required for insurance and audit documentation.
          </p>
        </details>
      </div>
    </main>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "px-4 py-2 rounded-lg text-sm font-semibold transition",
        active
          ? "bg-slate-950 text-white border border-slate-700"
          : "text-slate-300 hover:text-white",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function DisclaimerAccordion() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 p-4 text-left"
        aria-expanded={open}
      >
        <div>
          <div className="text-sm font-extrabold text-slate-100">
            Tap to view disclaimer
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Professional use only
          </div>
        </div>

        <span
          className={[
            "text-slate-300 transition-transform",
            open ? "rotate-180" : "rotate-0",
          ].join(" ")}
        >
          ▼
        </span>
      </button>

      {open ? (
        <div className="px-4 pb-4 text-xs text-slate-300">
          <div className="rounded-lg border border-amber-700/40 bg-amber-900/20 p-3 text-amber-200">
            <p className="font-semibold">Professional Use Notice</p>

            <p className="mt-2">
              This calculator is intended for licensed healthcare professionals.
              It assists with insulin day-supply estimations incorporating
              priming and product-specific expiration considerations.
            </p>

            <p className="mt-2">
              Results are provided as a clinical support tool only and do not
              replace professional judgment. Users are responsible for verifying
              calculations against the prescription, manufacturer labeling,
              payer requirements, and applicable regulations.
            </p>

            <p className="mt-2">
              This tool does not provide medical advice and is not intended for
              direct patient use.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
