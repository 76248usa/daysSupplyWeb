import type { Metadata, Viewport } from "next";
import "./globals.css"; // ✅ THIS is what brings Tailwind back
import Providers from "./providers";

// export const metadata: Metadata = {
//   title: "Insulin Days' Supply",
//   applicationName: "Insulin Days' Supply",
//   manifest: "/manifest.webmanifest",
//   themeColor: "#020617",
//   appleWebApp: {
//     capable: true,
//     statusBarStyle: "black-translucent",
//     title: "Insulin Days' Supply",
//   },
//   icons: {
//     apple: "/apple-touch-icon.png",
//     icon: [
//       { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
//       { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
//     ],
//   },
// };

export const metadata: Metadata = {
  title: "Insulin Days' Supply",
  applicationName: "Insulin Days' Supply",
  manifest: "/manifest.webmanifest",

  // ❌ REMOVE this line from here:
  // themeColor: "#020617",

  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Insulin Days' Supply",
  },

  icons: {
    apple: "/apple-touch-icon.png",
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
  themeColor: "#020617",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 overscroll-none">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
