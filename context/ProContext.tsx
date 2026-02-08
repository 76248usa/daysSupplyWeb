"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

type ProContextValue = {
  isPro: boolean;
  setIsPro: (v: boolean) => void;

  // optional: a screenshot mode override for web
  effectiveIsPro: boolean;
};

const ProContext = createContext<ProContextValue | null>(null);

export function ProProvider({ children }: { children: React.ReactNode }) {
  const [isPro, setIsPro] = useState(false);

  // Matches your old pattern (env-driven override)
  const SCREENSHOT_MODE = process.env.NEXT_PUBLIC_SCREENSHOT_MODE === "1";
  const effectiveIsPro = SCREENSHOT_MODE ? true : isPro;

  const value = useMemo(
    () => ({ isPro, setIsPro, effectiveIsPro }),
    [isPro, effectiveIsPro],
  );

  return <ProContext.Provider value={value}>{children}</ProContext.Provider>;
}

export function usePro() {
  const ctx = useContext(ProContext);
  if (!ctx) throw new Error("usePro must be used within ProProvider");
  return ctx;
}
