import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { config } from "@/lib/config";

/**
 * Product activity stream. `logEvent` records what happens across the app so the
 * Admin CRM has a backend record of everything — signups, logins, uploads,
 * verifications, payments, plan changes, quota hits, API calls.
 *
 * Graceful degradation: when the service-role key is absent it is a silent
 * no-op (and must NEVER throw — logging is always best-effort, never blocking).
 */
export type EventType =
  | "signup"
  | "login"
  | "password_reset_requested"
  | "upload"
  | "verify_preview"
  | "verify_full"
  | "api_verify"
  | "quota_exceeded"
  | "payment"
  | "subscription_created"
  | "subscription_canceled"
  | "plan_change";

export interface LogEventInput {
  userId?: string | null;
  email?: string | null;
  metadata?: Record<string, unknown>;
  ip?: string | null;
}

/** Best-effort: records one activity event. Never throws. */
export async function logEvent(type: EventType, input: LogEventInput = {}): Promise<void> {
  if (!config.hasSupabaseAdmin()) return;
  try {
    const db = createSupabaseAdminClient();
    await db.from("events").insert({
      user_id: input.userId ?? null,
      email: input.email ?? null,
      type,
      metadata: input.metadata ?? {},
      ip: input.ip ?? null,
    });
    // Touch "last active" for signed-in actors (cheap, fire-and-forget).
    if (input.userId && type !== "signup") {
      await db.from("profiles").update({ last_seen_at: new Date().toISOString() }).eq("id", input.userId);
    }
  } catch {
    // logging must never break the request it is observing
  }
}

/** Human-readable label for an event type (used in the admin activity feed). */
export const EVENT_LABELS: Record<EventType, string> = {
  signup: "Signed up",
  login: "Logged in",
  password_reset_requested: "Requested password reset",
  upload: "Uploaded a list",
  verify_preview: "Ran a preview",
  verify_full: "Processed a full list",
  api_verify: "Verified via API",
  quota_exceeded: "Hit plan quota",
  payment: "Payment received",
  subscription_created: "Started a subscription",
  subscription_canceled: "Canceled subscription",
  plan_change: "Plan changed",
};
