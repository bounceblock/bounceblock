import { createClient } from "@supabase/supabase-js";

/**
 * Service-role Supabase client for server-only work that must bypass RLS:
 * Stripe webhook sync, full-list processing, usage metering. NEVER import this
 * into client code.
 */
export function createSupabaseAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}
