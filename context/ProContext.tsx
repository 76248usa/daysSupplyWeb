"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type ProStatus =
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

  // env-driven override for screenshots
  effectiveIsPro: boolean;

  // optional but useful for UI/debugging
  status: ProStatus;

  // single refresh call
  refresh: () => Promise<RefreshResult>;

  // helper: retry refresh a couple times (useful after Stripe checkout)
  refreshWithRetry: (opts?: {
    attempts?: number;
    delayMs?: number;
  }) => Promise<RefreshResult>;
};

const ProContext = createContext<ProContextValue | null>(null);

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function normalizeEmail(raw: unknown) {
  return String(raw ?? "")
    .trim()
    .toLowerCase();
}

export function ProProvider({ children }: { children: React.ReactNode }) {
  const [isPro, setIsPro] = useState(false);
  const [status, setStatus] = useState<ProStatus>("unknown");
  const [isLoading, setIsLoading] = useState(false);

  const SCREENSHOT_MODE = process.env.NEXT_PUBLIC_SCREENSHOT_MODE === "1";
  const effectiveIsPro = SCREENSHOT_MODE ? true : isPro;

  // Avoid overlapping refresh calls + stale updates
  const inFlight = useRef<Promise<RefreshResult> | null>(null);
  const lastEmailRef = useRef<string>("");
  const mountedRef = useRef(false);

  const refresh = async (): Promise<RefreshResult> => {
    // Screenshot mode: always pro, no network calls
    if (SCREENSHOT_MODE) {
      const r = { isPro: true, status: "active" as ProStatus };
      setIsPro(true);
      setStatus("active");
      return r;
    }

    if (inFlight.current) return inFlight.current;

    const run = (async () => {
      setIsLoading(true);

      const email =
        typeof window !== "undefined"
          ? normalizeEmail(window.localStorage.getItem("ds_email"))
          : "";

      lastEmailRef.current = email;

      if (!email) {
        setIsPro(false);
        setStatus("no_email");
        setIsLoading(false);
        return { isPro: false, status: "no_email" };
      }

      try {
        const controller = new AbortController();
        const timeout = window.setTimeout(() => controller.abort(), 8000);

        const res = await fetch(
          `/api/pro-status?email=${encodeURIComponent(email)}`,
          {
            method: "GET",
            cache: "no-store",
            signal: controller.signal,
            headers: { "cache-control": "no-store" },
          },
        ).finally(() => window.clearTimeout(timeout));

        let j: any = null;
        try {
          j = await res.json();
        } catch {
          j = null;
        }

        // If ds_email changed while request was in-flight, ignore result
        const emailNow =
          typeof window !== "undefined"
            ? normalizeEmail(window.localStorage.getItem("ds_email"))
            : "";
        if (emailNow !== email) {
          return { isPro: false, status: "unknown" };
        }

        const nextIsPro = Boolean(j?.isPro);
        const nextStatus: ProStatus = (j?.status as ProStatus) ?? "unknown";

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
    mountedRef.current = true;
    refresh();
    return () => {
      mountedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Refresh when the tab becomes active again (user returns from Stripe / switches tabs)
  useEffect(() => {
    const onVis = () => {
      if (document.visibilityState === "visible") refresh();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Refresh when ds_email changes (login/logout flows)
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "ds_email") refresh();
    };
    window.addEventListener("storage", onStorage);

    // Same-tab storage changes don't fire storage event
    const id = window.setInterval(() => {
      const email = normalizeEmail(window.localStorage.getItem("ds_email"));
      if (email !== lastEmailRef.current) refresh();
    }, 1500);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.clearInterval(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Optional: expose quick debugging in console
  // window.__dsPro = { refresh, refreshWithRetry } (disabled by default)

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
