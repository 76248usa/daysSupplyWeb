"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

export type ProStatus =
  | "trialing"
  | "active"
  | "canceled"
  | "past_due"
  | "incomplete"
  | "unknown"
  | "no_user";

type RefreshResult = { isPro: boolean; status: ProStatus };

type ProContextValue = {
  isPro: boolean;
  setIsPro: (v: boolean) => void;
  isLoading: boolean;
  effectiveIsPro: boolean;
  status: ProStatus;
  refresh: () => Promise<RefreshResult>;
  refreshWithRetry: (opts?: {
    attempts?: number;
    delayMs?: number;
  }) => Promise<RefreshResult>;
};

const ProContext = createContext<ProContextValue | null>(null);

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

const ALLOWED_STATUSES = new Set<ProStatus>([
  "trialing",
  "active",
  "canceled",
  "past_due",
  "incomplete",
  "unknown",
  "no_user",
]);

function toProStatus(v: unknown): ProStatus {
  return ALLOWED_STATUSES.has(v as ProStatus) ? (v as ProStatus) : "unknown";
}

export function ProProvider({ children }: { children: React.ReactNode }) {
  const [isPro, setIsPro] = useState(false);
  const [status, setStatus] = useState<ProStatus>("unknown");
  const [isLoading, setIsLoading] = useState(false);

  const SCREENSHOT_MODE = process.env.NEXT_PUBLIC_SCREENSHOT_MODE === "1";
  const AUTH_DISABLED = process.env.NEXT_PUBLIC_AUTH_DISABLED === "1";

  const effectiveIsPro = SCREENSHOT_MODE ? true : AUTH_DISABLED ? true : isPro;

  const inFlight = useRef<Promise<RefreshResult> | null>(null);

  const refresh = async (): Promise<RefreshResult> => {
    if (AUTH_DISABLED) {
      setIsPro(true);
      setStatus("active");
      setIsLoading(false);
      inFlight.current = null;
      return { isPro: true, status: "active" };
    }

    if (inFlight.current) return inFlight.current;

    const run: Promise<RefreshResult> = (async () => {
      setIsLoading(true);

      try {
        // Prefer session first because mobile browsers can have a valid session
        // before getUser() settles.
        const { data: sessionData } = await supabaseBrowser.auth.getSession();
        let accessToken = sessionData.session?.access_token ?? null;
        let user = sessionData.session?.user ?? null;

        // Fallback: if session is not ready yet, try getUser once.
        if (!accessToken || !user) {
          const { data: userData } = await supabaseBrowser.auth.getUser();
          user = userData.user ?? null;

          const { data: sessionRetry } =
            await supabaseBrowser.auth.getSession();
          accessToken = sessionRetry.session?.access_token ?? null;
        }

        if (!user || !accessToken) {
          setIsPro(false);
          setStatus("no_user");
          return { isPro: false, status: "no_user" };
        }

        const res = await fetch("/api/pro-status", {
          method: "GET",
          cache: "no-store",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        let j: any = null;
        try {
          j = await res.json();
        } catch {
          j = null;
        }

        if (!res.ok) {
          setIsPro(false);
          setStatus("unknown");
          return { isPro: false, status: "unknown" };
        }

        const nextIsPro = Boolean(j?.isPro);
        const nextStatus = toProStatus(j?.effectiveStatus ?? j?.status);

        setIsPro(nextIsPro);
        setStatus(nextStatus);

        return { isPro: nextIsPro, status: nextStatus };
      } catch {
        setIsPro(false);
        setStatus("unknown");
        return { isPro: false, status: "unknown" };
      } finally {
        setIsLoading(false);
        inFlight.current = null;
      }
    })();

    inFlight.current = run;
    return run;
  };

  const refreshWithRetry = async (opts?: {
    attempts?: number;
    delayMs?: number;
  }): Promise<RefreshResult> => {
    if (AUTH_DISABLED) return { isPro: true, status: "active" };

    const attempts = Math.max(1, opts?.attempts ?? 6);
    const delayMs = Math.max(0, opts?.delayMs ?? 800);

    let last: RefreshResult = { isPro: effectiveIsPro, status };

    for (let i = 0; i < attempts; i++) {
      last = await refresh();
      if (last.isPro) return last;
      if (i < attempts - 1) await sleep(delayMs);
    }

    return last;
  };

  useEffect(() => {
    if (AUTH_DISABLED) return;
    refreshWithRetry({ attempts: 3, delayMs: 500 }).catch(() => {});
  }, [AUTH_DISABLED]);

  useEffect(() => {
    if (AUTH_DISABLED) return;

    const onVisible = () => {
      if (document.visibilityState === "visible") {
        refreshWithRetry({ attempts: 3, delayMs: 500 }).catch(() => {});
      }
    };

    const onFocus = () => {
      refreshWithRetry({ attempts: 3, delayMs: 500 }).catch(() => {});
    };

    const onPageShow = () => {
      refreshWithRetry({ attempts: 3, delayMs: 500 }).catch(() => {});
    };

    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", onFocus);
    window.addEventListener("pageshow", onPageShow);

    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [AUTH_DISABLED]);

  useEffect(() => {
    if (AUTH_DISABLED) return;

    const { data: sub } = supabaseBrowser.auth.onAuthStateChange(() => {
      refreshWithRetry({ attempts: 6, delayMs: 800 }).catch(() => {});
    });

    return () => sub.subscription.unsubscribe();
  }, [AUTH_DISABLED]);

  const value = useMemo(
    () => ({
      isPro,
      setIsPro,
      isLoading,
      effectiveIsPro,
      status,
      refresh,
      refreshWithRetry,
    }),
    [isPro, isLoading, effectiveIsPro, status],
  );

  return <ProContext.Provider value={value}>{children}</ProContext.Provider>;
}

export function usePro() {
  const ctx = useContext(ProContext);
  if (!ctx) throw new Error("usePro must be used within ProProvider");
  return ctx;
}
