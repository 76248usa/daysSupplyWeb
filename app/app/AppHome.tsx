"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bookmark,
  Share2,
  MoreVertical,
  PlusSquare,
  X,
  Smartphone,
} from "lucide-react";

const KEY = "ds_install_card_dismissed_v2";

function isIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

function isAndroid(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Android/i.test(navigator.userAgent);
}

function isStandalone(): boolean {
  if (typeof window === "undefined") return false;

  // iOS standalone
  // @ts-ignore
  const iosStandalone = Boolean(window.navigator?.standalone);

  // Android / modern browsers
  const mqStandalone =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(display-mode: standalone)").matches;

  return iosStandalone || mqStandalone;
}

function safeLocalStorageGet(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
function safeLocalStorageSet(key: string, val: string) {
  try {
    localStorage.setItem(key, val);
  } catch {}
}

type Mode = "ios" | "android" | "other";

export default function InstallCalculatorCard({
  appName = "Insulin Calculator",
}: {
  appName?: string;
}) {
  const [dismissed, setDismissed] = useState(true);

  const mode: Mode = useMemo(() => {
    if (typeof window === "undefined") return "other";
    if (isIOS()) return "ios";
    if (isAndroid()) return "android";
    return "other";
  }, []);

  const shouldShow = useMemo(() => {
    // Show only on mobile-ish contexts AND only when not already “installed”
    if (typeof window === "undefined") return false;
    if (isStandalone()) return false;
    return mode === "ios" || mode === "android";
  }, [mode]);

  useEffect(() => {
    if (!shouldShow) return;
    const v = safeLocalStorageGet(KEY);
    setDismissed(v === "1");
  }, [shouldShow]);

  function dismiss() {
    setDismissed(true);
    safeLocalStorageSet(KEY, "1");
  }

  if (!shouldShow || dismissed) return null;

  const isIOSMode = mode === "ios";

  const title = isIOSMode ? "Save for Quick Access" : "Install Calculator";
  const subtitle = isIOSMode
    ? "Safari bookmark is the most reliable way to stay signed in on iPhone."
    : "Add to Home Screen for app-like access (Android works great).";

  const primaryLabel = isIOSMode ? "Got it" : "Got it";
  const secondaryLabel = "Not now";

  return (
    <div className="mt-6 rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 shadow-lg">
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-400/15 ring-1 ring-cyan-400/25">
              <Smartphone className="h-5 w-5 text-cyan-200" />
            </div>

            <div>
              <div className="text-sm font-extrabold text-slate-100">
                {title}
              </div>
              <div className="mt-1 text-sm text-slate-300">
                {appName} • {subtitle}
              </div>
            </div>
          </div>

          <button
            onClick={dismiss}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-900 hover:text-slate-200"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {/* Steps */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="text-xs font-semibold text-slate-200">
              {isIOSMode ? "iPhone steps (Safari)" : "Android steps (Chrome)"}
            </div>

            {isIOSMode ? (
              <ol className="mt-3 space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-slate-200">
                    1
                  </span>
                  Tap <Share2 className="h-4 w-4 text-slate-300" />{" "}
                  <span className="font-semibold text-slate-100">Share</span> in
                  Safari
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-slate-200">
                    2
                  </span>
                  Choose{" "}
                  <span className="font-semibold text-slate-100">
                    Add Bookmark
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-slate-200">
                    3
                  </span>
                  Name it{" "}
                  <span className="font-semibold text-slate-100">
                    {appName}
                  </span>
                </li>
              </ol>
            ) : (
              <ol className="mt-3 space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-slate-200">
                    1
                  </span>
                  Tap <MoreVertical className="h-4 w-4 text-slate-300" />{" "}
                  <span className="font-semibold text-slate-100">Menu</span> in
                  Chrome
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-slate-200">
                    2
                  </span>
                  Choose{" "}
                  <span className="font-semibold text-slate-100">
                    Add to Home screen
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-slate-200">
                    3
                  </span>
                  Tap <PlusSquare className="h-4 w-4 text-slate-300" />{" "}
                  <span className="font-semibold text-slate-100">Add</span> and
                  launch like an app
                </li>
              </ol>
            )}

            <div className="mt-3 text-xs text-slate-500">
              {isIOSMode
                ? "Tip: Open the sign-in email link in Safari for best results."
                : "Tip: Android installation keeps you signed in reliably."}
            </div>
          </div>

          {/* Benefits + Actions */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-200">
                Benefits
              </div>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-200">✓</span> Faster access
                  during workflow
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-200">✓</span> More reliable
                  sign-in experience
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-200">✓</span> Feels like a
                  native app shortcut
                </li>
              </ul>

              <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/40 p-3 text-xs text-slate-400">
                {isIOSMode ? (
                  <>
                    <span className="font-semibold text-slate-200">
                      Recommended for iPhone:
                    </span>{" "}
                    Safari bookmark (stays signed in better than Add to Home
                    Screen with magic links).
                  </>
                ) : (
                  <>
                    <span className="font-semibold text-slate-200">
                      Recommended for Android:
                    </span>{" "}
                    Add to Home Screen for app-like access.
                  </>
                )}
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={dismiss}
                className="flex-1 rounded-xl bg-cyan-400 px-4 py-2 text-sm font-extrabold text-slate-900 hover:brightness-110"
              >
                {primaryLabel}
              </button>
              <button
                onClick={dismiss}
                className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-slate-800"
              >
                {secondaryLabel}
              </button>
            </div>
          </div>
        </div>

        {/* Subtle footer */}
        <div className="mt-3 text-[11px] text-slate-500">
          You can always access this from your browser bookmarks or home screen
          later.
        </div>
      </div>
    </div>
  );
}
