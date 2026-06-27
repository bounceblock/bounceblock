# Supabase — database

The schema for BounceBlock lives in [`migrations/0001_init.sql`](migrations/0001_init.sql).

## What it defines

| Table | Purpose |
|-------|---------|
| `profiles` | 1:1 with `auth.users`; holds plan + Stripe customer id (auto-created on signup) |
| `subscriptions` | Stripe-synced subscription state (source of truth via webhooks) |
| `uploads` | One row per uploaded CSV; `user_id` is NULL for anonymous previews; 24h `expires_at` |
| `verifications` | One job (preview or full) with per-status counts, quality score, clean count |
| `usage` | Flat monthly **allowance** counter (`verifications_used` vs `plan_quota`) per billing period |
| `payments` | Financial records (7-year retention) |
| `processed_webhook_events` | Stripe event idempotency (dedupe on `event.id`) |

Row Level Security is enabled on all user tables — authenticated users see only their own rows; the **service-role** key (server-side: webhooks, full processing) bypasses RLS.

## How to apply

**Option A — Supabase dashboard:** open your project → SQL Editor → paste the contents of `0001_init.sql` → Run.

**Option B — Supabase CLI:**
```bash
supabase link --project-ref <your-project-ref>
supabase db push
```

After applying, set these in `web/.env.local` (see `.env.example`):
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.

> TS row types are hand-mirrored in `web/lib/db/types.ts`. Once the DB is live you can regenerate them with `supabase gen types typescript --linked > lib/db/types.ts`.
