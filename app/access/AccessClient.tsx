"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseBrowser";
import { usePro } from "@/context/ProContext";

function normalizeEmail(raw: string) {
  return raw.trim().toLowerCase();
}

function isValidEmail(e: string) {
  return e.includes("@") && e.includes(".") && e.length >= 6;
}

function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/+$/, "");
  return typeof window !== "undefined" ? window.location.origin : "";
}

export default function AccessClient() {
  const router = useRouter();
  const sp = useSearchParams();
  const { effectiveIsPro, isLoading, status, refresh } = usePro();

  const AUTH_DISABLED = useMemo(
    () => process.env.NEXT_PUBLIC_AUTH_DISABLED === "1",
    [],
  );

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const [userEmail, setUserEmail] = useState<string | null>(null);

  const nextHref = useMemo(() => {
    const tab = sp.get("tab");
    const checkout = sp.get("checkout");

    const params = new URLSearchParams();
    if (tab) params.set("tab", tab);
    if (checkout) params.set("checkout", checkout);

    const qs = params.toString();
    return qs ? `/app?${qs}` : "/app";
  }, [sp]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const { data } = await supabaseBrowser.auth.getUser();
      const e = data.user?.email ?? null;
      if (!mounted) return;
      setUserEmail(e);
      await refresh();
    })();

    const { data: sub } = supabaseBrowser.auth.onAuthStateChange(
      async (_event, session) => {
        const e = session?.user?.email ?? null;
        setUserEmail(e);
        await refresh();
      },
    );

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function sendMagicLink() {
    setError(null);
    setSent(false);

    const e = normalizeEmail(email);
    if (!isValidEmail(e)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSending(true);

    const siteUrl = getSiteUrl();
    if (!siteUrl) {
      setSending(false);
      setError("Missing site URL. Set NEXT_PUBLIC_SITE_URL in Vercel.");
      return;
    }

    const { error } = await supabaseBrowser.auth.signInWithOtp({
      email: e,
      options: {
        emailRedirectTo: `${siteUrl}/auth/callback?next=${encodeURIComponent(
          nextHref,
        )}`,
      },
    });

    setSending(false);

    if (error) setError(error.message);
    else setSent(true);
  }

  function continueToApp() {
    router.push(nextHref);
  }

  async function signOut() {
    await supabaseBrowser.auth.signOut();
    setUserEmail(null);
  }

  async function openManageSubscription() {
    try {
      const { data } = await supabaseBrowser.auth.getSession();
      const token = data.session?.access_token;

      if (!token) {
        router.push(`/login?next=${encodeURIComponent("/app")}`);
        return;
      }

      const res = await fetch("/api/stripe/create-portal", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        console.error("portal error:", json);
        return;
      }

      if (json?.url) window.location.href = json.url;
    } catch (e) {
      console.error("portal failed:", e);
    }
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            ← Home
          </Link>

          <div className="text-xs text-slate-500">
            {userEmail ? (
              <span className="inline-flex items-center gap-2">
                {userEmail}
                <button
                  onClick={signOut}
                  className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-[11px] font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Sign out
                </button>
              </span>
            ) : (
              "Professional access"
            )}
          </div>
        </div>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-cyan-700">
            Pharmacist Access
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Access the Calculator
          </h1>

          {!userEmail ? (
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-700">
              Enter your email to receive a secure sign-in link. No password
              required.
            </p>
          ) : (
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-700">
              You&apos;re signed in. {isLoading ? "Checking access…" : null}
            </p>
          )}
        </section>

        {!userEmail ? (
          <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <label className="block text-sm font-semibold text-slate-900">
                Email address
              </label>

              <div className="relative mt-2">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                  ✉️
                </span>
                <input
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") sendMagicLink();
                  }}
                  autoComplete="email"
                  inputMode="email"
                  disabled={sending}
                />
              </div>

              {error ? (
                <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
                  {error}
                </div>
              ) : null}

              {sent ? (
                <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
                  Code sent — check your email and enter the 6-digit code.
                </div>
              ) : null}

              <button
                onClick={sendMagicLink}
                disabled={sending}
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-cyan-600 px-4 py-3 text-base font-bold text-white transition hover:bg-cyan-700 disabled:opacity-60"
              >
                {sending ? "Sending…" : "Send sign-in code"}
              </button>

              <div className="mt-3 text-sm text-slate-500">
                You’ll stay signed in unless you sign out.
              </div>
            </div>

            <div className="space-y-6">
              <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-xl font-bold text-slate-900">
                  Why sign in?
                </h2>

                <div className="mt-4 space-y-3 text-sm text-slate-700">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    Connects your subscription access
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    Makes billing and renewals easier
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    Helps keep your calculator access consistent
                  </div>
                </div>
              </section>

              <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
                <h2 className="text-xl font-bold text-amber-900">
                  Professional access note
                </h2>
                <p className="mt-3 text-sm leading-7 text-amber-800">
                  This service is designed for licensed healthcare professionals
                  using pharmacy workflow tools and subscription-based access.
                </p>
              </section>
            </div>
          </section>
        ) : (
          <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="text-sm text-slate-700">
                Status:{" "}
                <span className="font-semibold text-slate-900">{status}</span>
              </div>

              {effectiveIsPro ? (
                <>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="inline-flex items-center rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800">
                      Pro active ✓
                    </div>

                    {!AUTH_DISABLED ? (
                      <button
                        onClick={openManageSubscription}
                        className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        Manage subscription
                      </button>
                    ) : null}
                  </div>

                  <button
                    onClick={continueToApp}
                    className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-cyan-600 px-4 py-3 text-base font-bold text-white transition hover:bg-cyan-700"
                  >
                    Open calculator
                  </button>
                </>
              ) : (
                <Link
                  href="/app/upgrade"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-cyan-600 px-4 py-3 text-base font-bold text-white transition hover:bg-cyan-700"
                >
                  Start free trial / Subscribe
                </Link>
              )}

              <div className="mt-4 text-sm text-slate-500">
                Tip: add this site to your home screen for one-tap access.
              </div>
            </div>

            <div className="space-y-6">
              <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-xl font-bold text-slate-900">
                  Access summary
                </h2>

                <div className="mt-4 space-y-3 text-sm text-slate-700">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    Signed in as: <strong>{userEmail}</strong>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    Access path:{" "}
                    <strong>
                      {effectiveIsPro ? "Pro" : "Upgrade required"}
                    </strong>
                  </div>
                </div>
              </section>

              <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
                <h2 className="text-xl font-bold text-amber-900">
                  Professional access note
                </h2>
                <p className="mt-3 text-sm leading-7 text-amber-800">
                  Calculator access and subscription status are linked to your
                  signed-in account so you can use pharmacist tools consistently
                  across sessions.
                </p>
              </section>
            </div>
          </section>
        )}

        <div className="mt-8 text-center text-xs text-slate-500">
          For licensed pharmacy professionals only.
        </div>
      </div>
    </main>
  );
}
