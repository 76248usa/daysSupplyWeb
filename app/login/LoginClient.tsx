"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseBrowser";
import { usePro } from "@/context/ProContext";

function niceNextLabel(nextUrl: string) {
  if (nextUrl.startsWith("/app/upgrade")) return "Upgrade";
  if (nextUrl.startsWith("/app")) return "App";
  return "Continue";
}

function sanitizeNext(raw: string | null): string {
  const fallback = "/app/upgrade";
  if (!raw) return fallback;

  let v = raw;
  try {
    v = decodeURIComponent(raw);
  } catch {
    v = raw;
  }

  v = v.trim();

  if (!v.startsWith("/")) return fallback;
  if (v.startsWith("//")) return fallback;
  if (v.startsWith("http://") || v.startsWith("https://")) return fallback;

  return v;
}

function isValidEmail(e: string) {
  const v = e.trim().toLowerCase();
  return v.includes("@") && v.includes(".") && v.length >= 6;
}

function isValidCode(code: string) {
  return /^\d{6}$/.test(code.trim());
}

export default function LoginClient() {
  const router = useRouter();
  const sp = useSearchParams();
  const { effectiveIsPro, isLoading, refreshWithRetry } = usePro();

  const AUTH_DISABLED = useMemo(
    () => process.env.NEXT_PUBLIC_AUTH_DISABLED === "1",
    [],
  );

  const nextUrl = sanitizeNext(sp.get("next"));

  const [email, setEmail] = useState("");
  const [currentEmail, setCurrentEmail] = useState<string | null>(null);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const codeRefs = useRef<Array<HTMLInputElement | null>>([]);

  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [checkedSession, setCheckedSession] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function joinedCode() {
    return code.join("");
  }

  function updateCodeDigit(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(0, 1);
    const next = [...code];
    next[index] = digit;
    setCode(next);

    if (digit && index < 5) {
      codeRefs.current[index + 1]?.focus();
    }
  }

  function handleCodeKeyDown(
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) {
    if (e.key === "Backspace") {
      if (code[index]) {
        const next = [...code];
        next[index] = "";
        setCode(next);
        return;
      }

      if (index > 0) {
        codeRefs.current[index - 1]?.focus();
        const next = [...code];
        next[index - 1] = "";
        setCode(next);
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      codeRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < 5) {
      codeRefs.current[index + 1]?.focus();
    }

    if (e.key === "Enter") {
      verifyCode();
    }
  }

  function handleCodePaste(e: React.ClipboardEvent<HTMLDivElement>) {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pasted) return;

    e.preventDefault();

    const next = ["", "", "", "", "", ""];
    pasted.split("").forEach((digit, i) => {
      next[i] = digit;
    });
    setCode(next);

    const nextIndex = Math.min(pasted.length, 5);
    codeRefs.current[nextIndex]?.focus();
  }

  useEffect(() => {
    if (!AUTH_DISABLED) return;
    router.replace(nextUrl);
  }, [AUTH_DISABLED, nextUrl, router]);

  useEffect(() => {
    if (AUTH_DISABLED) return;

    (async () => {
      const { data } = await supabaseBrowser.auth.getSession();

      if (data.session?.user?.email) {
        setCurrentEmail(data.session.user.email);
      } else {
        setCurrentEmail(null);
      }

      if (data.session?.access_token) {
        const result = await refreshWithRetry({ attempts: 6, delayMs: 800 });

        if (result.isPro) {
          router.replace("/app");
          return;
        }
      }

      setCheckedSession(true);
    })();
  }, [AUTH_DISABLED, refreshWithRetry, router]);

  useEffect(() => {
    if (AUTH_DISABLED) return;
    if (isLoading) return;

    if (effectiveIsPro) {
      router.replace("/app");
    }
  }, [AUTH_DISABLED, effectiveIsPro, isLoading, router]);

  async function signOutCurrentUser() {
    await supabaseBrowser.auth.signOut();
    setCurrentEmail(null);
    setEmail("");
    setCode(["", "", "", "", "", ""]);
    setCodeSent(false);
    setError(null);
    setCheckedSession(true);
  }

  async function sendCode() {
    setError(null);

    const e = email.trim().toLowerCase();
    if (!isValidEmail(e)) {
      setError("Please enter a valid email.");
      return;
    }

    setSending(true);
    try {
      const { error } = await supabaseBrowser.auth.signInWithOtp({
        email: e,
        options: {
          shouldCreateUser: true,
        },
      });

      if (error) throw error;

      setCode(["", "", "", "", "", ""]);
      setCodeSent(true);

      setTimeout(() => {
        codeRefs.current[0]?.focus();
      }, 50);
    } catch (err: any) {
      setError(err?.message ?? String(err));
    } finally {
      setSending(false);
    }
  }

  async function verifyCode() {
    setError(null);

    const e = email.trim().toLowerCase();
    const c = joinedCode();

    if (!isValidEmail(e)) {
      setError("Please enter a valid email.");
      return;
    }

    if (!isValidCode(c)) {
      setError("Please enter the 6-digit code.");
      return;
    }

    setVerifying(true);
    try {
      const { error } = await supabaseBrowser.auth.verifyOtp({
        email: e,
        token: c,
        type: "email",
      });

      if (error) throw error;

      setCode(["", "", "", "", "", ""]);

      const { data } = await supabaseBrowser.auth.getSession();
      setCurrentEmail(data.session?.user?.email ?? e);

      const result = await refreshWithRetry({ attempts: 6, delayMs: 800 });

      if (result.isPro) {
        router.replace("/app");
      } else {
        router.replace(nextUrl);
      }
    } catch (err: any) {
      setError(err?.message ?? String(err));
    } finally {
      setVerifying(false);
    }
  }

  if (AUTH_DISABLED || !checkedSession) {
    return (
      <main className="min-h-screen bg-white text-slate-900">
        <div className="mx-auto max-w-3xl px-4 py-10 text-center sm:px-6 lg:px-8">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h1 className="text-2xl font-bold text-slate-900">Redirecting…</h1>
            <p className="mt-3 text-slate-600">
              Please wait while we continue.
            </p>
          </section>
        </div>
      </main>
    );
  }

  if (!isLoading && effectiveIsPro) {
    return null;
  }

  const nextLabel = niceNextLabel(nextUrl);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-cyan-700">
            Pharmacist Sign In
          </p>

          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Sign in with email code
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-700">
            Enter your email and we’ll send you a 6-digit sign-in code.
          </p>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            {currentEmail && !effectiveIsPro ? (
              <div className="mb-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                Signed in as <strong>{currentEmail}</strong>.
                <div className="mt-3">
                  <button
                    onClick={signOutCurrentUser}
                    className="rounded-xl border border-amber-300 bg-white px-3 py-2 text-xs font-semibold text-amber-800 transition hover:bg-amber-100"
                  >
                    Sign out and use a different email
                  </button>
                </div>
              </div>
            ) : null}

            <label className="block text-sm font-semibold text-slate-900">
              Email
            </label>

            <input
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              inputMode="email"
              disabled={
                sending || verifying || codeSent || Boolean(currentEmail)
              }
            />

            {!codeSent ? (
              <button
                onClick={sendCode}
                disabled={sending || Boolean(currentEmail)}
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-cyan-600 px-4 py-3 text-base font-bold text-white transition hover:bg-cyan-700 disabled:opacity-60"
              >
                {sending ? "Sending…" : "Send sign-in code"}
              </button>
            ) : (
              <>
                <label className="mt-6 block text-sm font-semibold text-slate-900">
                  6-digit code
                </label>

                <div
                  className="mt-3 flex justify-between gap-2"
                  onPaste={handleCodePaste}
                >
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        codeRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      autoComplete={index === 0 ? "one-time-code" : "off"}
                      maxLength={1}
                      value={digit}
                      disabled={verifying}
                      onChange={(e) => updateCodeDigit(index, e.target.value)}
                      onKeyDown={(e) => handleCodeKeyDown(index, e)}
                      className="h-14 w-12 rounded-xl border border-slate-300 bg-white text-center text-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  ))}
                </div>

                <button
                  onClick={verifyCode}
                  disabled={verifying}
                  className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-cyan-600 px-4 py-3 text-base font-bold text-white transition hover:bg-cyan-700 disabled:opacity-60"
                >
                  {verifying ? "Signing in…" : "Verify code and sign in"}
                </button>

                <button
                  onClick={() => {
                    setCode(["", "", "", "", "", ""]);
                    setCodeSent(false);
                    setError(null);
                  }}
                  disabled={verifying}
                  className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
                >
                  Use a different email
                </button>
              </>
            )}

            <div className="mt-4 text-center text-sm text-slate-600">
              Continue to{" "}
              <span className="font-semibold text-slate-900">{nextLabel}</span>{" "}
              after signing in.
            </div>

            {codeSent ? (
              <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
                Code sent — check your email and enter the 6-digit code above.
              </div>
            ) : null}

            {error ? (
              <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
                {error}
              </div>
            ) : null}

            <div className="mt-5 text-center">
              <Link
                href="/app"
                className="text-sm font-semibold text-cyan-700 underline underline-offset-4 hover:text-cyan-800"
              >
                Back to App
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-bold text-slate-900">
                Why email-code sign in?
              </h2>

              <div className="mt-4 space-y-3 text-sm text-slate-700">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  No password to remember
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  Better mobile workflow
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  Faster access to calculators
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
              <h2 className="text-xl font-bold text-amber-900">
                Professional access note
              </h2>
              <p className="mt-3 text-sm leading-7 text-amber-800">
                Sign in is used to connect your subscription status to your
                account so you can access pharmacist tools consistently across
                sessions.
              </p>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
