import type { Metadata, Viewport } from "next";
import "./globals.css";
import Providers from "./providers";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Insulin Days Supply Calculator with Priming",
  description:
    "Professional insulin days supply calculator for pharmacists and healthcare professionals. Calculate insulin pen and vial days supply with priming and expiration logic.",
  keywords: [
    "insulin days supply calculator",
    "insulin priming calculator",
    "insulin pen days supply",
    "pharmacy days supply calculator",
    "pharmacist insulin calculator",
    "insulin vial days supply",
    "priming days supply",
  ],
  applicationName: "Insulin Days' Supply",
  manifest: "/manifest.webmanifest",
  metadataBase: new URL("https://www.insulinprimingdayssupply.com"),
  alternates: {
    canonical: "https://www.insulinprimingdayssupply.com",
  },

  openGraph: {
    title: "Insulin Days Supply Calculator with Priming",
    description:
      "Professional insulin days supply calculator for pharmacists with priming and expiration logic.",
    url: "https://www.insulinprimingdayssupply.com",
    siteName: "Insulin Days' Supply",
    type: "website",
  },

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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TCL760SLSX');
          `}
        </Script>
      </body>
    </html>
  );
}
