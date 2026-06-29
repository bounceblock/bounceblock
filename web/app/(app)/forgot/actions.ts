"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { config } from "@/lib/config";
import { logEvent } from "@/lib/events";

export async function requestReset(formData: FormData) {
  if (!config.hasSupabase()) {
    redirect("/forgot?error=" + encodeURIComponent("Password reset isn't configured yet."));
  }
  const email = String(formData.get("email") ?? "").trim();
  const supabase = createSupabaseServerClient();
  // Route through the PKCE callback so the recovery `code` is exchanged for a
  // session before /reset lets the user set a new password.
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${config.siteUrl()}/auth/callback?next=/reset`,
  });
  await logEvent("password_reset_requested", { email });
  // Always report success to avoid leaking which emails exist.
  redirect("/forgot?sent=1");
}
