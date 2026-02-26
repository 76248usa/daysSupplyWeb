"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

function niceNextLabel(nextUrl: string) {
  if (nextUrl.startsWith("/app/upgrade")) return "Upgrade";
  if (nextUrl.startsWith("/app")) return "App";
  return "Continue";
}

export default function LoginClient() {
  const router = useRouter();
  const sp = useSearchParams();

  const AUTH_DISABLED = useMemo(
    () => process.env.NEXT_PUBLIC_AUTH_DISABLED === "1",
    [],
  );

  const nextUrl = sp.get("next") || "/app";

  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!AUTH_DISABLED) return;
    router.replace(nextUrl);
  }, [AUTH_DISABLED, nextUrl, router]);

  async function sendLink() {
    setError(null);
    setSent(false);

    const e = email.trim().toLowerCase();
    if (!e.includes("@") || !e.includes(".")) {
      setError("Please enter a valid email.");
      return;
    }

    setSending(true);
    try {
      const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(
        nextUrl,
      )}`;

      const { error } = await supabaseBrowser.auth.signInWithOtp({
        email: e,
        options: {
          emailRedirectTo: redirectTo,
          shouldCreateUser: true,
        },
      });

      if (error) throw error;
      setSent(true);
    } catch (err: any) {
      setError(err?.message ?? String(err));
    } finally {
      setSending(false);
    }
  }

  if (AUTH_DISABLED) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100">
        <div className="mx-auto max-w-md p-6 text-center text-slate-300">
          Redirecting…
        </div>
      </main>
    );
  }

  const nextLabel = niceNextLabel(nextUrl);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-md p-6">
        <h1 className="text-2xl font-extrabold text-center">Sign in</h1>
        <p className="text-center text-slate-300 mt-2 text-sm">
          We’ll email you a sign-in link.
        </p>

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            Email
          </label>

          <input
            className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendLink();
            }}
            autoComplete="email"
            inputMode="email"
            disabled={sending}
          />

          <button
            onClick={sendLink}
            disabled={sending}
            className="mt-4 w-full rounded-xl bg-cyan-400 px-4 py-3 text-center font-extrabold text-slate-900 hover:brightness-110 disabled:opacity-60"
          >
            {sending ? "Sending…" : "Email me a sign-in link"}
          </button>

          <div className="mt-3 text-center text-xs text-slate-400">
            Continue to <span className="text-slate-200">{nextLabel}</span>{" "}
            after signing in.
          </div>

          {sent ? (
            <div className="mt-4 rounded-xl border border-emerald-900/40 bg-emerald-900/20 p-3 text-sm text-emerald-200">
              Link sent — check your email to sign in.
            </div>
          ) : null}

          {error ? (
            <div className="mt-4 rounded-xl border border-rose-900/40 bg-rose-900/20 p-3 text-sm text-rose-200">
              {error}
            </div>
          ) : null}

          <div className="mt-4 text-center">
            <Link
              href="/app"
              className="text-xs text-slate-400 hover:text-slate-200 underline underline-offset-4"
            >
              Back to App
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
