import { NextResponse, type NextRequest } from "next/server";

/**
 * Edge middleware — intentionally SELF-CONTAINED (only imports `next/server`).
 *
 * It does NOT import from `@/lib/...`. On this Next 14.2 + Vercel setup, the
 * edge function bundler leaves `@/`-aliased imports as unresolved bare
 * specifiers in the output (`@/lib/supabase/middleware`), which Vercel then
 * rejects as "referencing unsupported modules" at deploy time — regardless of
 * what that file contains. Inlining everything here avoids that entirely.
 *
 * Two jobs: (1) rewrite the app.* subdomain to the dashboard, and (2) a fast
 * cookie-PRESENCE auth redirect. The REAL session validation is server-side —
 * every protected page calls getUser() (supabase.auth.getUser(), Node runtime)
 * and /admin is guarded by isAdmin() in its layout — so a forged/expired cookie
 * loads no data; this is only a UX fast-path, not the security boundary.
 */

const PROTECTED = ["/dashboard", "/history", "/billing", "/settings", "/welcome"];

export function middleware(request: NextRequest) {
  // app.bounceblock.io → serve the product app at its root.
  const host = request.headers.get("host") ?? "";
  if (host.startsWith("app.") && request.nextUrl.pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.rewrite(url);
  }

  // Not configured (demo mode) → no auth gating.
  const hasSupabase = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
  if (!hasSupabase) return NextResponse.next();

  const path = request.nextUrl.pathname;
  const needsAuth = path.startsWith("/admin") || PROTECTED.some((p) => path.startsWith(p));
  if (!needsAuth) return NextResponse.next();

  const signedIn = request.cookies
    .getAll()
    .some((c) => c.name.startsWith("sb-") && c.name.includes("-auth-token"));

  if (!signedIn) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", path);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Run on everything except static assets.
    "/((?!_next/static|_next/image|favicon.ico|brand/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
