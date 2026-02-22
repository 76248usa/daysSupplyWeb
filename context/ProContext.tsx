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
  | "no_email";

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
  "no_email",
]);

function toProStatus(v: unknown): ProStatus {
  return ALLOWED_STATUSES.has(v as ProStatus) ? (v as ProStatus) : "unknown";
}

export function ProProvider({ children }: { children: React.ReactNode }) {
  const [isPro, setIsPro] = useState(false);
  const [status, setStatus] = useState<ProStatus>("unknown");
  const [isLoading, setIsLoading] = useState(false);

  const SCREENSHOT_MODE = process.env.NEXT_PUBLIC_SCREENSHOT_MODE === "1";

  const effectiveIsPro = SCREENSHOT_MODE ? true : isPro;

  const inFlight = useRef<Promise<RefreshResult> | null>(null);

  const refresh = async (): Promise<RefreshResult> => {
    if (inFlight.current) return inFlight.current;

    const run: Promise<RefreshResult> = (async () => {
      setIsLoading(true);

      try {
        // 🔑 Get authenticated Supabase user
        const { data } = await supabaseBrowser.auth.getUser();
        const email = (data.user?.email || "").trim().toLowerCase();

        if (!email) {
          setIsPro(false);
          setStatus("no_email");
          return { isPro: false, status: "no_email" };
        }

        const res = await fetch(
          `/api/pro-status?email=${encodeURIComponent(email)}`,
          {
            method: "GET",
            cache: "no-store",
          },
        );

        let j: any = null;
        try {
          j = await res.json();
        } catch {
          j = null;
        }

        const nextIsPro = Boolean(j?.isPro);
        const nextStatus = toProStatus(j?.status);

        setIsPro(nextIsPro);
        setStatus(nextStatus);

        return { isPro: nextIsPro, status: nextStatus };
      } catch (e) {
        console.error("refresh pro-status failed:", e);
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
    const attempts = Math.max(1, opts?.attempts ?? 3);
    const delayMs = Math.max(0, opts?.delayMs ?? 1200);

    let last: RefreshResult = { isPro: effectiveIsPro, status };

    for (let i = 0; i < attempts; i++) {
      last = await refresh();

      if (last.isPro) return last;

      if (i < attempts - 1) await sleep(delayMs);
    }

    return last;
  };

  // Initial load
  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Refresh when tab becomes active again
  useEffect(() => {
    const onVis = () => {
      if (document.visibilityState === "visible") {
        refresh();
      }
    };

    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 🔁 Refresh automatically when auth state changes
  useEffect(() => {
    const { data: sub } = supabaseBrowser.auth.onAuthStateChange(() => {
      refresh();
    });

    return () => {
      sub.subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
