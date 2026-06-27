"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { config } from "@/lib/config";

export async function setPassword(formData: FormData) {
  if (!config.hasSupabase()) {
    redirect("/reset?error=" + encodeURIComponent("Password reset isn't configured yet."));
  }
  const password = String(formData.get("password") ?? "");
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) redirect("/reset?error=" + encodeURIComponent(error.message));
  redirect("/dashboard");
}
