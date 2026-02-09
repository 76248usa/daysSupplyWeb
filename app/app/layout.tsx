import Providers from "../providers";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
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
  );
}
