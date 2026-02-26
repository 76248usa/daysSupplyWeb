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
    const { error } = await supabaseBrowser.auth.signInWithOtp({
      email: e,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(
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

      // ✅ updated route name
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
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-lg p-6">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-800"
          >
            ← Home
          </Link>

          <div className="text-xs text-slate-400">
            {userEmail ? (
              <span className="inline-flex items-center gap-2">
                {userEmail}
                <button
                  onClick={signOut}
                  className="rounded-lg border border-slate-800 bg-slate-900 px-2 py-1 text-[11px] text-slate-300 hover:bg-slate-800"
                >
                  Sign out
                </button>
              </span>
            ) : (
              "Professional access"
            )}
          </div>
        </div>

        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-center">
          Access the Calculator
        </h1>

        {!userEmail ? (
          <>
            <p className="mt-2 text-center text-slate-300">
              Enter your email to receive a secure sign-in link. No password
              required.
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
                    if (e.key === "Enter") sendMagicLink();
                  }}
                  autoComplete="email"
                  inputMode="email"
                  disabled={sending}
                />
              </div>

              {error ? (
                <div className="mt-3 rounded-xl border border-rose-900/40 bg-rose-900/20 p-3 text-sm text-rose-200">
                  {error}
                </div>
              ) : null}

              {sent ? (
                <div className="mt-3 rounded-xl border border-emerald-900/40 bg-emerald-900/20 p-3 text-sm text-emerald-200">
                  Link sent! Check your email to sign in.
                </div>
              ) : null}

              <button
                onClick={sendMagicLink}
                disabled={sending}
                className="mt-4 w-full rounded-xl bg-cyan-400 px-4 py-3 text-center font-extrabold text-slate-900 hover:brightness-110 disabled:opacity-60"
              >
                {sending ? "Sending…" : "Email me a sign-in link"}
              </button>

              <div className="mt-3 text-xs text-slate-400">
                You’ll stay signed in unless you sign out.
              </div>
            </div>
          </>
        ) : (
          <>
            <p className="mt-2 text-center text-slate-300">
              You’re signed in. {isLoading ? "Checking access…" : null}
            </p>

            <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <div className="text-sm text-slate-300">
                Status: <span className="font-semibold">{status}</span>
              </div>

              {effectiveIsPro ? (
                <>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="inline-flex items-center rounded-lg border border-emerald-700/40 bg-emerald-900/20 px-3 py-2 text-emerald-200 text-xs font-semibold">
                      Pro active ✓
                    </div>

                    {!AUTH_DISABLED ? (
                      <button
                        onClick={openManageSubscription}
                        className="rounded-lg border border-slate-700/40 bg-slate-950/30 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800"
                      >
                        Manage subscription
                      </button>
                    ) : null}
                  </div>

                  <button
                    onClick={continueToApp}
                    className="mt-4 w-full rounded-xl bg-cyan-400 px-4 py-3 text-center font-extrabold text-slate-900 hover:brightness-110"
                  >
                    Open calculator
                  </button>
                </>
              ) : (
                <Link
                  href="/app/upgrade"
                  className="mt-4 block w-full rounded-xl bg-cyan-400 px-4 py-3 text-center font-extrabold text-slate-900 hover:brightness-110"
                >
                  Start free trial / Subscribe
                </Link>
              )}

              <div className="mt-3 text-xs text-slate-400">
                Tip: add this site to your home screen for one-tap access.
              </div>
            </div>
          </>
        )}

        <div className="mt-6 text-center text-xs text-slate-500">
          For licensed pharmacy professionals only.
        </div>
      </div>
    </main>
  );
}
