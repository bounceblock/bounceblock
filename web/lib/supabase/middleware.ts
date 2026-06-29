import { NextResponse, type NextRequest } from "next/server";
import { config } from "@/lib/config";

const PROTECTED = ["/dashboard", "/history", "/billing", "/settings", "/welcome"];

/**
 * Edge-safe route guard.
 *
 * It deliberately does NOT import @supabase/ssr / supabase-js. That chain pulls
 * Node-only modules (realtime-js → `ws`, plus `@supabase/node-fetch`) into the
 * Edge middleware bundle, which Vercel's Edge runtime rejects ("referencing
 * unsupported modules") even though they never execute there.
 *
 * Instead we do a fast cookie-PRESENCE redirect at the edge: if a request hits a
 * protected/admin route without a Supabase auth cookie, bounce it to /login.
 * The REAL session validation still happens server-side — every protected page
 * calls getUser() (→ supabase.auth.getUser(), which verifies the token) and the
 * /admin tree is guarded by isAdmin() in its layout. So a forged or expired
 * cookie loads no data; this guard is purely a UX fast-path, not the security
 * boundary. Token refresh happens in server actions / route handlers (Node
 * runtime), where cookies can be written.
 */
export async function updateSession(request: NextRequest) {
  const response = NextResponse.next({ request });

  // Not configured yet → no-op (app still works in demo mode).
  if (!config.hasSupabase()) return response;

  const path = request.nextUrl.pathname;
  const needsAuth = path.startsWith("/admin") || PROTECTED.some((p) => path.startsWith(p));
  if (!needsAuth) return response;

  // Supabase stores the session in cookies named `sb-<ref>-auth-token` (possibly
  // chunked with `.0`, `.1`). Presence is enough for the redirect decision.
  const signedIn = request.cookies
    .getAll()
    .some((c) => c.name.startsWith("sb-") && c.name.includes("-auth-token"));

  if (!signedIn) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", path);
    return NextResponse.redirect(url);
  }

  return response;
}
