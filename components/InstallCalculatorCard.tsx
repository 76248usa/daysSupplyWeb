"use client";

import { useEffect, useMemo, useState } from "react";
import { Bookmark, Share2, X } from "lucide-react";

const KEY = "ds_install_card_dismissed_v1";

function isIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  // @ts-ignore
  return Boolean(window.navigator?.standalone);
}

export default function InstallCalculatorCard({
  appName = "Insulin Calculator",
}: {
  appName?: string;
}) {
  const [dismissed, setDismissed] = useState(true);

  const shouldShow = useMemo(() => {
    return isIOS() && !isStandalone();
  }, []);

  useEffect(() => {
    if (!shouldShow) return;
    try {
      const v = localStorage.getItem(KEY);
      setDismissed(v === "1");
    } catch {
      setDismissed(false);
    }
  }, [shouldShow]);

  function dismiss() {
    setDismissed(true);
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
  }

  if (!shouldShow || dismissed) return null;

  return (
    <div className="mt-6 rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-50 ring-1 ring-cyan-200">
              <Bookmark className="h-5 w-5 text-cyan-700" />
            </div>

            <div>
              <div className="text-sm font-extrabold text-slate-900">
                Install Calculator for Quick Access
              </div>
              <div className="mt-1 text-sm text-slate-700">
                Save this calculator in Safari for fast access while staying
                signed in.
              </div>
            </div>
          </div>

          <button
            onClick={dismiss}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-50 hover:text-slate-700"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-semibold text-slate-900">
              Quick steps (iPhone)
            </div>

            <ol className="mt-3 space-y-2 text-sm text-slate-700">
              <li className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-slate-700 ring-1 ring-slate-200">
                  1
                </span>
                Tap <Share2 className="h-4 w-4 text-slate-500" />{" "}
                <span className="font-semibold text-slate-900">Share</span> in
                Safari
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-slate-700 ring-1 ring-slate-200">
                  2
                </span>
                Choose{" "}
                <span className="font-semibold text-slate-900">
                  Add Bookmark
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-slate-700 ring-1 ring-slate-200">
                  3
                </span>
                Name it{" "}
                <span className="font-semibold text-slate-900">{appName}</span>
              </li>
            </ol>

            <div className="mt-3 text-xs text-slate-500">
              Bookmarking in Safari is the most reliable way to keep you signed
              in on iPhone.
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div>
              <div className="text-xs font-semibold text-slate-900">
                Why this helps
              </div>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>✓ Open instantly from Safari</li>
                <li>✓ Stays signed in more reliably</li>
                <li>✓ Great for quick pharmacy workflow</li>
              </ul>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={dismiss}
                className="flex-1 rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700"
              >
                Got it
              </button>
              <button
                onClick={dismiss}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Not now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
