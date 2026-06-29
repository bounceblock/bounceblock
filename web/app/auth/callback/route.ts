import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { config } from "@/lib/config";

export const dynamic = "force-dynamic";

/**
 * Auth callback for the Supabase PKCE flow. Email-confirmation and
 * password-recovery links land here with a `code`; we exchange it for a session
 * cookie, then send the user on to `next` (e.g. /reset to set a new password,
 * or /dashboard after confirming email). Without a code/session it falls back
 * to the destination so the link never dead-ends.
 */
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") || "/dashboard";

  if (code && config.hasSupabase()) {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(error.message)}`, url.origin));
    }
  }

  return NextResponse.redirect(new URL(next, url.origin));
}
