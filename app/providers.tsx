"use client";

import React from "react";
import { ProProvider } from "../context/ProContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ProProvider>{children}</ProProvider>;
}
