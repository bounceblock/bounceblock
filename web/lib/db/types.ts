/**
 * Hand-written DB row types mirroring supabase/migrations/0001_init.sql.
 * Once a live Supabase project exists, these can be regenerated with
 * `supabase gen types typescript`.
 */

export type PlanTier = "free" | "starter" | "pro" | "business";
export type SubscriptionStatus = "active" | "trialing" | "past_due" | "canceled" | "incomplete";
export type UploadStatus = "uploaded" | "preview_done" | "processing" | "completed" | "failed";
export type VerificationKind = "preview" | "full";
export type VerificationStatus = "pending" | "processing" | "completed" | "failed";

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  plan: PlanTier;
  stripe_customer_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  stripe_subscription_id: string;
  stripe_price_id: string;
  plan: PlanTier;
  status: SubscriptionStatus;
  current_period_start: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  created_at: string;
  updated_at: string;
}

export interface Upload {
  id: string;
  user_id: string | null;
  original_filename: string | null;
  row_count: number | null;
  column_mapping: Record<string, string> | null;
  status: UploadStatus;
  storage_path: string | null;
  expires_at: string;
  created_at: string;
}

export interface Verification {
  id: string;
  upload_id: string | null;
  user_id: string | null;
  kind: VerificationKind;
  rows_processed: number;
  email_valid: number;
  email_invalid: number;
  email_catch_all: number;
  email_unknown: number;
  phone_valid: number;
  phone_invalid: number;
  duplicates: number;
  quality_score: number | null;
  clean_count: number;
  result_storage_path: string | null;
  result_expires_at: string | null;
  status: VerificationStatus;
  error: string | null;
  created_at: string;
  completed_at: string | null;
}

export interface Usage {
  id: string;
  user_id: string;
  period_start: string;
  period_end: string;
  verifications_used: number;
  plan_quota: number;
}

export interface Payment {
  id: string;
  user_id: string | null;
  stripe_payment_intent_id: string | null;
  stripe_invoice_id: string | null;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
}
