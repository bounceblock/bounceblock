import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { config } from "@/lib/config";

const BUCKET = "results";

/** Store a clean CSV in Supabase Storage. No-op (returns null) until configured. */
export async function storeCleanFile(path: string, csv: string): Promise<string | null> {
  if (!config.hasSupabaseAdmin()) return null;
  const db = createSupabaseAdminClient();
  const { error } = await db.storage
    .from(BUCKET)
    .upload(path, Buffer.from(csv, "utf-8"), { contentType: "text/csv", upsert: true });
  if (error) throw error;
  return path;
}

/** Time-limited signed download URL (null until configured). */
export async function signedUrlForFile(path: string, expiresIn = 3600): Promise<string | null> {
  if (!config.hasSupabaseAdmin()) return null;
  const db = createSupabaseAdminClient();
  const { data } = await db.storage.from(BUCKET).createSignedUrl(path, expiresIn);
  return data?.signedUrl ?? null;
}
