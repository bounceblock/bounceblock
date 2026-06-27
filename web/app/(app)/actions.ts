"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { config } from "@/lib/config";

export async function logout() {
  if (config.hasSupabase()) {
    const supabase = createSupabaseServerClient();
    await supabase.auth.signOut();
  }
  redirect("/");
}
