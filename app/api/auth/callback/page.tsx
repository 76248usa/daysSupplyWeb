"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

function safeNextPath(nextParam: string | null | undefined): string {
  if (!nextParam) return "/app";
  if (nextParam.startsWith("/")) return nextParam;
  return "/app";
}

export default function AuthCallbackPage() {
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

        await new Promise((r) => setTimeout(r, 700));

        const { data } = await supabaseBrowser.auth.getSession();

        if (!data.session?.access_token) {
          window.location.replace("/login?next=/app");
          return;
        }

        const finalPath =
          nextPath.startsWith("/app/upgrade") || nextPath.startsWith("/login")
            ? "/app"
            : nextPath;

        window.location.replace(finalPath);
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
