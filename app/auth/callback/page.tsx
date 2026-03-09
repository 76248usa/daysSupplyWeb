"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function safeNextPath(nextParam: string | null | undefined): string {
  if (!nextParam) return "/app";
  if (nextParam.startsWith("/")) return nextParam;
  return "/app";
}

function AuthCallbackInner() {
  const sp = useSearchParams();

  useEffect(() => {
    (async () => {
      const nextParam = sp.get("next");
      const nextPath = safeNextPath(nextParam);

      try {
        // For any leftover auth redirects, just wait briefly
        // to see whether Supabase already has a session.
        for (let i = 0; i < 6; i++) {
          const { data } = await supabaseBrowser.auth.getSession();

          if (data.session?.access_token) {
            const finalPath =
              nextPath.startsWith("/app/upgrade") ||
              nextPath.startsWith("/login")
                ? "/app"
                : nextPath;

            window.location.replace(finalPath);
            return;
          }

          await sleep(500);
        }

        window.location.replace("/login?next=/app");
      } catch {
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
