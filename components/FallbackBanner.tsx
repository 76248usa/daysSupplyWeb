"use client";

import { useEffect, useState } from "react";

export default function FallbackBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show banner only occasionally (1 in 3 visits)
    const rand = Math.random();
    if (rand < 0.33) {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] text-amber-800 flex items-center justify-between">
      <span>Having trouble loading? Use backup access.</span>
      <a
        href="https://days-supply-web-shek.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold underline"
      >
        Open backup
      </a>
    </div>
  );
}
