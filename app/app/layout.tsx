import type { Metadata, Viewport } from "next";
import Providers from "../providers";

export const metadata: Metadata = {
  title: "Insulin Days' Supply",
  applicationName: "Insulin Days' Supply",

  // ✅ Prefer the webmanifest extension
  // If you keep /manifest.json, that's okay too — but /manifest.webmanifest is the usual.
  manifest: "/manifest.webmanifest",

  themeColor: "#020617",

  // ✅ iOS standalone/full-screen
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Insulin Days' Supply",
  },

  // ✅ Icons (Safari + iOS)
  icons: {
    apple: "/apple-touch-icon.png", // 180x180 recommended
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 overscroll-none">
        <Providers>
          {children}

          <footer className="mt-16 border-t border-slate-800 py-6 text-center text-xs text-slate-500">
            <div className="space-x-4">
              <a href="/terms" className="hover:text-slate-300 underline">
                Terms
              </a>
              <a href="/privacy" className="hover:text-slate-300 underline">
                Privacy
              </a>
            </div>
            <div className="mt-2">
              © {new Date().getFullYear()} Insulin Days’ Supply
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
