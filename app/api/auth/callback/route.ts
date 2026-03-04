import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

function safeNextPath(nextParam: string | null | undefined): string {
  // Only allow internal redirects to avoid open-redirect vulnerabilities
  if (!nextParam) return "/app";
  if (nextParam.startsWith("/")) return nextParam;
  return "/app";
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const nextParam = url.searchParams.get("next");

  // ✅ Next.js: cookies() may be async depending on version/runtime
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          // ✅ Expire the cookie
          cookieStore.set({ name, value: "", ...options, maxAge: 0 });
        },
      },
    },
  );

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  const nextPath = safeNextPath(nextParam);

  // ✅ Redirect back to where the user wanted to go (ex: /app/upgrade)
  return NextResponse.redirect(new URL(nextPath, url.origin));
}
