"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
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

  refresh: () => Promise<RefreshResult>;
};

const ProContext = createContext<ProContextValue | null>(null);

export function ProProvider({ children }: { children: React.ReactNode }) {
  const [isPro, setIsPro] = useState(false);
  const [status, setStatus] = useState<ProStatus>("unknown");
  const [isLoading, setIsLoading] = useState(false);

  const SCREENSHOT_MODE = process.env.NEXT_PUBLIC_SCREENSHOT_MODE === "1";
  const effectiveIsPro = SCREENSHOT_MODE ? true : isPro;

  const refresh = async (): Promise<RefreshResult> => {
    setIsLoading(true);
    try {
      const email =
        typeof window !== "undefined"
          ? (window.localStorage.getItem("ds_email") || "").trim().toLowerCase()
          : "";

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

      // Even if res is not ok, try to parse JSON safely
      let j: any = null;
      try {
        j = await res.json();
      } catch {
        j = null;
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
    }
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({ isPro, setIsPro, isLoading, effectiveIsPro, status, refresh }),
    [isPro, isLoading, effectiveIsPro, status],
  );

  return <ProContext.Provider value={value}>{children}</ProContext.Provider>;
}

export function usePro() {
  const ctx = useContext(ProContext);
  if (!ctx) throw new Error("usePro must be used within ProProvider");
  return ctx;
}
