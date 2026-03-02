import Providers from "./providers";
import TransitionShell from "./TransitionShell";

export const metadata = {
  title: "Insulin Days' Supply",
  manifest: "/manifest.json",
  themeColor: "#020617",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Days Supply",
  },
  icons: {
    apple: "/icons/icon-192.png",
  },
};

export const viewport = {
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
          <TransitionShell>{children}</TransitionShell>

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
