"use client";

export const dynamic = "force-dynamic";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

function sanitizeNext(raw: string | null): string | null {
  if (!raw) return null;

  let v = raw;
  try {
    v = decodeURIComponent(raw);
  } catch {
    v = raw;
  }

  v = v.trim();
  if (!v.startsWith("/")) return null;
  if (v.startsWith("//")) return null;
  if (v.startsWith("http://") || v.startsWith("https://")) return null;
  return v;
}

function Inner() {
  const router = useRouter();
  const sp = useSearchParams();

  useEffect(() => {
    (async () => {
      // 1) Exchange code for session (magic link)
      await supabaseBrowser.auth.getSession();

      // 2) If next is present, honor it
      const nextFromUrl = sanitizeNext(sp.get("next"));
      if (nextFromUrl) {
        router.replace(nextFromUrl);
        return;
      }

      // 3) Otherwise decide based on Pro status
      const { data } = await supabaseBrowser.auth.getSession();
      const token = data.session?.access_token;

      if (!token) {
        router.replace("/login?next=%2Fapp%2Fupgrade");
        return;
      }

      const res = await fetch("/api/pro-status", {
        method: "GET",
        cache: "no-store",
        headers: { Authorization: `Bearer ${token}` },
      });

      const j = await res.json().catch(() => ({}));
      const isPro = Boolean(j?.isPro);

      router.replace(isPro ? "/app" : "/app/upgrade");
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
      Signing you in…
    </main>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
          Signing you in…
        </div>
      }
    >
      <Inner />
    </Suspense>
  );
}
