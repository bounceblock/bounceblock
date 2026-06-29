# Supabase — database

The schema for BounceBlock is applied in order from [`migrations/`](migrations/):
`0001_init.sql` → `0002_referrals.sql` → `0003_api_keys.sql` → `0004_admin_crm.sql`.

## What it defines

| Table | Migration | Purpose |
|-------|-----------|---------|
| `profiles` | 0001 | 1:1 with `auth.users`; plan + Stripe customer id (auto-created on signup). 0004 adds `status` (active/suspended) + `last_seen_at` |
| `subscriptions` | 0001 | Stripe-synced subscription state (source of truth via webhooks) |
| `uploads` | 0001 | One row per uploaded CSV; `user_id` is NULL for anonymous previews; 24h `expires_at` |
| `verifications` | 0001 | One job (preview or full) with per-status counts, quality score, clean count |
| `usage` | 0001 | Flat monthly **allowance** counter (`verifications_used` vs `plan_quota`) per billing period |
| `payments` | 0001 | Financial records (7-year retention) |
| `processed_webhook_events` | 0001 | Stripe event idempotency (dedupe on `event.id`) |
| `referrals` | 0002 | Referral events + credits; adds `referral_code` to `profiles` |
| `api_keys` | 0003 | Hashed API keys for the public verify API (Business plan) |
| `events` | 0004 | **Append-only product activity stream** powering the Admin CRM — signups, logins, uploads, verifications, payments, plan changes, quota hits, API calls |
| `admin_audit_log` | 0004 | **Privileged admin-action trail** — who changed what, to whom (service-role only) |

Row Level Security is enabled on all user tables — authenticated users see only their own rows; `admin_audit_log` has **no** public policy. The **service-role** key (server-side: webhooks, full processing, the Admin CRM) bypasses RLS. The signup trigger (`handle_new_user`) writes both the `profiles` row and a `signup` event automatically.

## How to apply

**Option A — Supabase dashboard:** open your project → SQL Editor → paste each migration (`0001` → `0004`, in order) → Run.

**Option B — Supabase CLI:**
```bash
supabase link --project-ref <your-project-ref>
supabase db push
```

After applying, set these in `web/.env.local` (see `.env.example`):
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.

> TS row types are hand-mirrored in `web/lib/db/types.ts`. Once the DB is live you can regenerate them with `supabase gen types typescript --linked > lib/db/types.ts`.
