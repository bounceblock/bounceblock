"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { config } from "@/lib/config";

export async function requestReset(formData: FormData) {
  if (!config.hasSupabase()) {
    redirect("/forgot?error=" + encodeURIComponent("Password reset isn't configured yet."));
  }
  const email = String(formData.get("email") ?? "").trim();
  const supabase = createSupabaseServerClient();
  await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${config.siteUrl()}/reset` });
  // Always report success to avoid leaking which emails exist.
  redirect("/forgot?sent=1");
}
