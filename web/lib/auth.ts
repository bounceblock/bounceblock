import { createSupabaseServerClient } from "@/lib/supabase/server";
import { config } from "@/lib/config";
import type { User } from "@supabase/supabase-js";

/** Current authenticated user (server-side), or null when not signed in / not configured. */
export async function getUser(): Promise<User | null> {
  if (!config.hasSupabase()) return null;
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
