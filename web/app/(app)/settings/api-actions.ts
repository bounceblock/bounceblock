"use server";

import { getUser } from "@/lib/auth";
import { config } from "@/lib/config";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { generateApiKey } from "@/lib/api-keys";

export async function createApiKey(): Promise<{ key?: string; demo?: boolean; error?: string }> {
  if (!config.hasSupabaseAdmin()) return { key: "bb_test", demo: true };

  const user = await getUser();
  if (!user) return { error: "Not signed in." };

  const { raw, hash } = generateApiKey();
  const db = createSupabaseAdminClient();
  const { error } = await db.from("api_keys").insert({ user_id: user.id, key_hash: hash });
  if (error) return { error: "Could not create key." };

  return { key: raw };
}
