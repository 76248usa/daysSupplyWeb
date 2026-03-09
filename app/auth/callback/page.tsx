"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type DebugState = {
  step: string;
  code: string | null;
  tokenHash: string | null;
  type: string | null;
  next: string | null;
  sessionFound: boolean;
  error: string | null;
};

function AuthCallbackInner() {
  const sp = useSearchParams();

  const [debug, setDebug] = useState<DebugState>({
    step: "starting",
    code: null,
    tokenHash: null,
    type: null,
    next: null,
    sessionFound: false,
    error: null,
  });

  useEffect(() => {
    (async () => {
      const code = sp.get("code");
      const tokenHash = sp.get("token_hash");
      const type = sp.get("type");
      const next = sp.get("next");

      setDebug({
        step: "read_params",
        code,
        tokenHash,
        type,
        next,
        sessionFound: false,
        error: null,
      });

      try {
        if (code) {
          setDebug((d) => ({ ...d, step: "exchange_code_for_session" }));

          const { error } =
            await supabaseBrowser.auth.exchangeCodeForSession(code);

          if (error) {
            setDebug((d) => ({
              ...d,
              step: "exchange_failed",
              error: error.message,
            }));
            return;
          }
        } else if (tokenHash && type) {
          setDebug((d) => ({ ...d, step: "verify_otp" }));

          const { error } = await supabaseBrowser.auth.verifyOtp({
            token_hash: tokenHash,
            type: type as
              | "signup"
              | "magiclink"
              | "recovery"
              | "invite"
              | "email"
              | "email_change",
          });

          if (error) {
            setDebug((d) => ({
              ...d,
              step: "verify_failed",
              error: error.message,
            }));
            return;
          }
        } else {
          setDebug((d) => ({
            ...d,
            step: "missing_auth_params",
            error: "No code or token_hash found in callback URL",
          }));
          return;
        }

        setDebug((d) => ({ ...d, step: "checking_session" }));

        for (let i = 0; i < 8; i++) {
          const { data } = await supabaseBrowser.auth.getSession();

          if (data.session?.access_token) {
            setDebug((d) => ({
              ...d,
              step: "session_found",
              sessionFound: true,
            }));
            return;
          }

          await sleep(700);
        }

        setDebug((d) => ({
          ...d,
          step: "no_session_after_retries",
          error: "No session found after retries",
        }));
      } catch (err: any) {
        setDebug((d) => ({
          ...d,
          step: "exception",
          error: err?.message ?? String(err),
        }));
      }
    })();
  }, [sp]);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "#e2e8f0",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 700,
          margin: "0 auto",
          padding: 24,
        }}
      >
        <h1 style={{ fontSize: 24, marginBottom: 16 }}>Auth Callback Debug</h1>

        <div
          style={{
            background: "#0f172a",
            border: "1px solid #334155",
            borderRadius: 12,
            padding: 16,
            whiteSpace: "pre-wrap",
            lineHeight: 1.6,
            fontSize: 14,
          }}
        >
          {JSON.stringify(debug, null, 2)}
        </div>

        {debug.sessionFound ? (
          <div style={{ marginTop: 16 }}>
            <button
              onClick={() => window.location.replace("/app")}
              style={{
                padding: "12px 18px",
                borderRadius: 10,
                border: "none",
                background: "#22c55e",
                color: "#0f172a",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Session found — go to app
            </button>
          </div>
        ) : null}
      </div>
    </main>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <AuthCallbackInner />
    </Suspense>
  );
}
