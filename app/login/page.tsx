"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

export default function LoginPage() {
  const router = useRouter();
  const sp = useSearchParams();

  const AUTH_DISABLED = useMemo(
    () => process.env.NEXT_PUBLIC_AUTH_DISABLED === "1",
    [],
  );

  const nextUrl = sp.get("next") || "/app";

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If auth is disabled, don't show login
  useEffect(() => {
    if (AUTH_DISABLED) router.replace(nextUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [AUTH_DISABLED]);

  async function submit() {
    setError(null);

    const e = email.trim().toLowerCase();
    if (!e.includes("@") || !e.includes(".")) {
      setError("Please enter a valid email.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await supabaseBrowser.auth.signInWithPassword({
          email: e,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabaseBrowser.auth.signUp({
          email: e,
          password,
        });
        if (error) throw error;
      }

      router.replace(nextUrl);
    } catch (err: any) {
      setError(err?.message ?? String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-md p-6">
        <h1 className="text-2xl font-extrabold text-center">
          {mode === "signin" ? "Sign in" : "Create account"}
        </h1>

        <p className="text-center text-slate-300 mt-2 text-sm">
          Email + password (no magic links).
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
            autoComplete="email"
            inputMode="email"
          />

          <label className="block text-xs font-semibold text-slate-300 mb-2 mt-4">
            Password
          </label>
          <input
            className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete={
              mode === "signin" ? "current-password" : "new-password"
            }
          />

          {error ? (
            <div className="mt-4 rounded-xl border border-rose-900/40 bg-rose-900/20 p-3 text-sm text-rose-200">
              {error}
            </div>
          ) : null}

          <button
            onClick={submit}
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-cyan-400 px-4 py-3 text-center font-extrabold text-slate-900 hover:brightness-110 disabled:opacity-60"
          >
            {loading
              ? "Working…"
              : mode === "signin"
                ? "Sign in"
                : "Create account"}
          </button>

          <button
            type="button"
            onClick={() =>
              setMode((m) => (m === "signin" ? "signup" : "signin"))
            }
            className="mt-3 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
          >
            {mode === "signin"
              ? "Need an account? Create one"
              : "Already have an account? Sign in"}
          </button>

          <div className="mt-4 text-center text-xs text-slate-500">
            For licensed pharmacy professionals only.
          </div>
        </div>
      </div>
    </main>
  );
}
