import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { config } from "@/lib/config";
import { getUser } from "@/lib/auth";

/**
 * Audit trail for privileged admin actions. Every mutation an admin performs
 * (change plan, grant credit, suspend, reset usage…) is recorded with who did
 * it and to whom — so the back office is accountable and reviewable.
 *
 * Best-effort + non-blocking: never throws, no-ops without the service role.
 */
export type AdminAction =
  | "change_plan"
  | "grant_credit"
  | "suspend"
  | "reactivate"
  | "reset_usage";

export interface AuditInput {
  targetUserId?: string | null;
  targetEmail?: string | null;
  detail?: Record<string, unknown>;
}

export async function logAdminAction(action: AdminAction, input: AuditInput = {}): Promise<void> {
  if (!config.hasSupabaseAdmin()) return;
  try {
    const user = await getUser();
    const db = createSupabaseAdminClient();
    await db.from("admin_audit_log").insert({
      admin_email: user?.email ?? "system",
      action,
      target_user_id: input.targetUserId ?? null,
      target_email: input.targetEmail ?? null,
      detail: input.detail ?? {},
    });
  } catch {
    // auditing must never break the action it records
  }
}

export const ACTION_LABELS: Record<AdminAction, string> = {
  change_plan: "Changed plan",
  grant_credit: "Granted credit",
  suspend: "Suspended account",
  reactivate: "Reactivated account",
  reset_usage: "Reset usage",
};
