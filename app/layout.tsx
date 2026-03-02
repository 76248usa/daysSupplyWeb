import Providers from "../providers";

export const metadata = {
  title: "Insulin Days' Supply",
  manifest: "/manifest.json",
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
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

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <body className="bg-slate-950 overscroll-none">
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
      </body>
    </Providers>
  );
}
