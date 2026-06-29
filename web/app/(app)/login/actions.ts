"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { config } from "@/lib/config";
import { logEvent } from "@/lib/events";

export async function login(formData: FormData) {
  if (!config.hasSupabase()) {
    redirect("/login?error=" + encodeURIComponent("Authentication isn't configured yet."));
  }
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  // Only honor same-origin relative paths (block open-redirects like //evil.com).
  const nextRaw = String(formData.get("next") ?? "");
  const next = /^\/(?!\/)[A-Za-z0-9/_\-?=&.]*$/.test(nextRaw) ? nextRaw : "/dashboard";

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    const back = next !== "/dashboard" ? `&next=${encodeURIComponent(next)}` : "";
    redirect("/login?error=" + encodeURIComponent(error.message) + back);
  }

  await logEvent("login", { userId: data.user?.id, email: data.user?.email });

  redirect(next);
}
