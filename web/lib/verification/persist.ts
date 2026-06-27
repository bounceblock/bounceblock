import type { SupabaseClient } from "@supabase/supabase-js";
import { storeCleanFile, signedUrlForFile } from "@/lib/storage";
import { sendResultsReadyEmail } from "@/lib/email";
import type { PreviewResult, PreviewMapping } from "@/lib/verification/preview";

/**
 * Persist a completed full run: uploads + verifications rows, store the clean
 * file in Storage, and email a signed download link. Returns ids + url.
 * Only called when the Supabase service role is configured.
 */
export async function persistFullRun(opts: {
  db: SupabaseClient;
  userId: string;
  email: string | null;
  mapping: PreviewMapping;
  rowCount: number;
  result: PreviewResult;
  cleanCsv: string;
}): Promise<{ verificationId: string | null; downloadUrl: string | null }> {
  const { db, userId, email, mapping, rowCount, result, cleanCsv } = opts;

  const { data: upload } = await db
    .from("uploads")
    .insert({ user_id: userId, row_count: rowCount, column_mapping: mapping, status: "completed" })
    .select("id")
    .single();

  const path = `${userId}/${upload?.id ?? Date.now()}.csv`;
  let storagePath: string | null = null;
  try {
    storagePath = await storeCleanFile(path, cleanCsv);
  } catch {
    storagePath = null;
  }

  const { data: ver } = await db
    .from("verifications")
    .insert({
      upload_id: upload?.id ?? null,
      user_id: userId,
      kind: "full",
      rows_processed: result.analyzed,
      email_valid: result.email.valid,
      email_invalid: result.email.invalid,
      email_catch_all: result.email.catchAll,
      email_unknown: result.email.unknown,
      phone_valid: result.phone.valid,
      phone_invalid: result.phone.invalid,
      duplicates: result.duplicates,
      quality_score: result.qualityScore,
      clean_count: result.cleanCount,
      result_storage_path: storagePath,
      status: "completed",
      completed_at: new Date().toISOString(),
    })
    .select("id")
    .single();

  let downloadUrl: string | null = null;
  if (storagePath) {
    downloadUrl = await signedUrlForFile(storagePath, 7 * 24 * 3600);
    if (downloadUrl && email) {
      try {
        await sendResultsReadyEmail(email, downloadUrl, result.cleanCount);
      } catch {
        // email is non-blocking
      }
    }
  }

  return { verificationId: ver?.id ?? null, downloadUrl };
}
