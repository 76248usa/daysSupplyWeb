"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

function safeNextPath(nextParam: string | null | undefined): string {
  if (!nextParam) return "/app";
  if (nextParam.startsWith("/")) return nextParam;
  return "/app";
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function AuthCallbackInner() {
  const sp = useSearchParams();

  useEffect(() => {
    (async () => {
      const code = sp.get("code");
      const tokenHash = sp.get("token_hash");
      const type = sp.get("type");
      const nextParam = sp.get("next");
      const nextPath = safeNextPath(nextParam);

      try {
        // Support both Supabase callback styles
        if (code) {
          const { error } =
            await supabaseBrowser.auth.exchangeCodeForSession(code);

          if (error) {
            console.error("exchangeCodeForSession error:", error.message);
            window.location.replace("/login?next=/app");
            return;
          }
        } else if (tokenHash && type) {
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
            console.error("verifyOtp error:", error.message);
            window.location.replace("/login?next=/app");
            return;
          }
        } else {
          // No recognizable auth params
          window.location.replace("/login?next=/app");
          return;
        }

        // Mobile browsers can lag before session becomes readable
        let hasSession = false;

        for (let i = 0; i < 8; i++) {
          const { data } = await supabaseBrowser.auth.getSession();

          if (data.session?.access_token) {
            hasSession = true;
            break;
          }

          await sleep(700);
        }

        if (!hasSession) {
          window.location.replace("/app");
          return;
        }

        const finalPath =
          nextPath.startsWith("/app/upgrade") || nextPath.startsWith("/login")
            ? "/app"
            : nextPath;

        window.location.replace(finalPath);
      } catch (err) {
        console.error("auth callback error:", err);
        window.location.replace("/login?next=/app");
      }
    })();
  }, [sp]);

  return (
    <main
      style={{ minHeight: "100vh", background: "#020617", color: "#e2e8f0" }}
    >
      <div
        style={{
          maxWidth: 400,
          margin: "0 auto",
          padding: 24,
          textAlign: "center",
        }}
      >
        Signing you in…
      </div>
    </main>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <main
          style={{
            minHeight: "100vh",
            background: "#020617",
            color: "#e2e8f0",
          }}
        >
          <div
            style={{
              maxWidth: 400,
              margin: "0 auto",
              padding: 24,
              textAlign: "center",
            }}
          >
            Signing you in…
          </div>
        </main>
      }
    >
      <AuthCallbackInner />
    </Suspense>
  );
}
