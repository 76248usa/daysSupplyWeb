"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

export default function AuthCallbackPage() {
  const router = useRouter();
  const sp = useSearchParams();

  useEffect(() => {
    (async () => {
      // If you include ?next=/app/upgrade, honor it
      const next = sp.get("next") || "/app";

      // This will parse the URL (code, etc.) and set the session
      // detectSessionInUrl=true does the heavy lifting
      await supabaseBrowser.auth.getSession();

      // IMPORTANT: clean URL so refresh doesn't replay stale auth params
      router.replace(next);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
      Signing you in…
    </main>
  );
}
