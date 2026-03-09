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
      const nextParam = sp.get("next");
      const nextPath = safeNextPath(nextParam);

      try {
        if (code) {
          const { error } =
            await supabaseBrowser.auth.exchangeCodeForSession(code);

          if (error) {
            window.location.replace("/login?next=/app");
            return;
          }
        }

        // Retry a few times because mobile browsers can lag before
        // the session becomes readable.
        let hasSession = false;

        for (let i = 0; i < 6; i++) {
          const { data } = await supabaseBrowser.auth.getSession();

          if (data.session?.access_token) {
            hasSession = true;
            break;
          }

          await sleep(700);
        }

        if (!hasSession) {
          // Still no readable session; send them into the app anyway.
          // ProContext/LoginClient can re-check and route from there.
          window.location.replace("/app");
          return;
        }

        const finalPath =
          nextPath.startsWith("/app/upgrade") || nextPath.startsWith("/login")
            ? "/app"
            : nextPath;

        window.location.replace(finalPath);
      } catch {
        window.location.replace("/app");
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
