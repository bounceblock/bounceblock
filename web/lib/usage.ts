import type { SupabaseClient } from "@supabase/supabase-js";
import { quotaForPlan, type PlanId } from "@/lib/plans";

/** Current calendar-month bounds as YYYY-MM-DD strings. */
function monthBounds(now = new Date()) {
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0));
  return { start: start.toISOString().slice(0, 10), end: end.toISOString().slice(0, 10) };
}

export interface UsageRow {
  id: string;
  used: number;
  quota: number;
}

/** Get (or create) the usage row for the current billing period. */
export async function getOrCreateUsage(db: SupabaseClient, userId: string, plan: PlanId): Promise<UsageRow> {
  const { start, end } = monthBounds();
  const quota = quotaForPlan(plan);

  const { data } = await db
    .from("usage")
    .select("id, verifications_used, plan_quota")
    .eq("user_id", userId)
    .eq("period_start", start)
    .single();

  if (data) return { id: data.id, used: data.verifications_used ?? 0, quota: data.plan_quota ?? quota };

  const { data: created } = await db
    .from("usage")
    .insert({ user_id: userId, period_start: start, period_end: end, verifications_used: 0, plan_quota: quota })
    .select("id")
    .single();

  return { id: created?.id ?? "", used: 0, quota };
}

export async function incrementUsage(db: SupabaseClient, usageId: string, currentUsed: number, by: number) {
  if (!usageId) return;
  await db.from("usage").update({ verifications_used: currentUsed + by }).eq("id", usageId);
}
