# Phase 2 — Core Product (MVP) · Status

**Goal:** Tool works end-to-end: upload → verify → preview → pay → process → download, plus auth, billing and dashboard.
**Approach:** Built **ready-for-keys** with graceful degradation — the whole app builds, type-checks and runs today; each feature activates the moment its env vars are provided. (User supplies all credentials later.)
**Updated:** June 27, 2026

---

## ✅ Built & verified (works now, in mock/demo mode)

| Feature | State | Activates with |
|---|---|---|
| **Verify tool** — upload → auto-detect → column mapping → 100-row preview → scored results | ✅ working end-to-end | — (live verification needs ZeroBounce/NumVerify) |
| **Verification engine** — dedupe, quality score, sample findings | ✅ tested (mock) | `ZEROBOUNCE_API_KEY`, `NUMVERIFY_API_KEY` → live |
| **Full processing** — verify all rows → clean CSV (drops invalid + dupes, adds status columns) | ✅ tested (`/api/verify/process`) | same keys |
| **Auth** (Supabase Auth: signup/login/logout, session middleware, protected `/dashboard`) | ✅ wired | Supabase keys |
| **Stripe checkout** (subscription) + **billing portal** | ✅ wired | Stripe keys + price IDs |
| **Stripe webhook** (signature verify, idempotency, sync subscriptions/profile/payments) | ✅ wired | Stripe webhook secret + Supabase service role |
| **Email** (Zoho SMTP: welcome / receipt / results-ready) | ✅ wired (no-op until configured) | SMTP creds |
| **Dashboard** (plan, usage, history — real data when signed in, demo empty state otherwise) | ✅ wired | Supabase keys |
| **DB schema** (profiles, subscriptions, uploads, verifications, usage, payments, webhook idempotency + RLS) | ✅ written | apply `web/supabase/migrations/0001_init.sql` |

`npm run build` and `npm run typecheck` are green. Preview + full-process APIs verified against the running server in mock mode.

## 🔌 To go live (when you provide credentials)

1. **Supabase** → set `NEXT_PUBLIC_SUPABASE_URL`, anon key, service-role key; apply the SQL migration; create a `results` Storage bucket. → auth, dashboard, webhook persistence light up.
2. **ZeroBounce + NumVerify** keys → verification switches from mock to live automatically.
3. **Stripe** → secret key, webhook secret, 3 price IDs (`STRIPE_PRICE_*`); point a webhook at `/api/stripe/webhook`. → checkout + billing live.
4. **Zoho SMTP** → transactional emails start sending.

## ⏳ Remaining Phase 2 hardening (after keys exist)

- Enforce **plan + monthly usage quota** in `/api/verify/process` (decrement `usage`).
- Persist `uploads`/`verifications` rows + store clean files in Supabase Storage; wire the dashboard **Download** links to signed URLs.
- Move large-list processing to the **queue worker** (`lib/queue.ts` → QStash/Inngest) so the webhook/route never times out.
- Send `results-ready` email after full processing; `welcome` after signup; `receipt` from the webhook.
- Rate-limit the anonymous preview (cost/abuse protection).
- Wire the verify tool's "Get full results" CTA to the post-signup full flow.
