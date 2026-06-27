/**
 * Runtime config + feature flags. Everything is evaluated at request time so
 * features activate the moment the matching env vars are provided — no rebuild.
 * Until then the app degrades gracefully (mock verification, empty states,
 * "not configured" messages) instead of crashing.
 */
export const config = {
  siteUrl: () => process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  hasSupabase: () =>
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  hasSupabaseAdmin: () =>
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY),
  hasStripe: () => Boolean(process.env.STRIPE_SECRET_KEY),
  hasStripeWebhook: () => Boolean(process.env.STRIPE_WEBHOOK_SECRET),
  hasEmailApi: () => Boolean(process.env.ZEROBOUNCE_API_KEY),
  hasPhoneApi: () => Boolean(process.env.NUMVERIFY_API_KEY),
  hasSmtp: () =>
    Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS),
};
