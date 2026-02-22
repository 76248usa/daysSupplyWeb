"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function normalizeEmail(raw: string) {
  return raw.trim().toLowerCase();
}

function isValidEmail(e: string) {
  return e.includes("@") && e.includes(".") && e.length >= 6;
}

export default function AccessPage() {
  const router = useRouter();
  const sp = useSearchParams();

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Optional: prefill from localStorage if present
  useEffect(() => {
    try {
      const existing =
        typeof window !== "undefined"
          ? (window.localStorage.getItem("ds_email") || "").trim().toLowerCase()
          : "";
      if (existing) setEmail(existing);
    } catch {
      // ignore
    }
  }, []);

  const nextHref = useMemo(() => {
    // Preserve these if you ever link /access?tab=ear or /access?checkout=success
    const tab = sp.get("tab");
    const checkout = sp.get("checkout");

    const params = new URLSearchParams();
    if (tab) params.set("tab", tab);
    if (checkout) params.set("checkout", checkout);

    const qs = params.toString();
    return qs ? `/app?${qs}` : "/app";
  }, [sp]);

  function continueToApp() {
    setError(null);

    const e = normalizeEmail(email);
    if (!isValidEmail(e)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      window.localStorage.setItem("ds_email", e);
    } catch {
      // if localStorage blocked, still try to proceed
    }

    router.push(nextHref);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-lg p-6">
        {/* Top */}
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-800"
          >
            ← Home
          </Link>

          <div className="text-xs text-slate-400">Professional access</div>
        </div>

        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-center">
          Access the Calculator
        </h1>
        <p className="mt-2 text-center text-slate-300">
          Enter your email to continue. This helps us associate Pro access with
          your subscription.
        </p>

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            Email address
          </label>

          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
              ✉️
            </span>
            <input
              className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-11 pr-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") continueToApp();
              }}
              autoComplete="email"
              inputMode="email"
            />
          </div>

          {error ? (
            <div className="mt-3 rounded-xl border border-rose-900/40 bg-rose-900/20 p-3 text-sm text-rose-200">
              {error}
            </div>
          ) : null}

          <button
            onClick={continueToApp}
            className="mt-4 w-full rounded-xl bg-cyan-400 px-4 py-3 text-center font-extrabold text-slate-900 hover:brightness-110"
          >
            Continue
          </button>

          <div className="mt-3 text-xs text-slate-400">
            No password required. You can start a free trial on the next screen.
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-slate-500">
          For licensed pharmacy professionals only.
        </div>
      </div>
    </main>
  );
}
