# Phase 1 — Core Foundation · Status

**Goal:** Domain, email, accounts, and basic infrastructure live, with the project structure (website + application) scaffolded.
**Updated:** June 27, 2026

---

## ✅ Code structure — DONE (builds & runs)

The full Next.js 14 + TypeScript + Tailwind project is scaffolded in **`web/`** and verified with `npm run build` (22 routes) and a runtime smoke test.

| Area | Status | Where |
|------|--------|-------|
| Next.js 14 project + config | ✅ | `web/` |
| Design system (tokens, Fraunces + Inter, warm light theme) | ✅ | `web/tailwind.config.ts`, `web/app/globals.css` |
| Brand logo component + assets | ✅ | `web/components/brand/Logo.tsx`, `web/public/brand/` |
| **Website** structure (home, pricing, about, security, legal, SEO routes) | ✅ | `web/app/(marketing)/` |
| **Application** structure (login, signup, verify, dashboard) | ✅ | `web/app/(app)/` |
| API routes (health, verify-preview stub, Stripe webhook stub) | ✅ | `web/app/api/` |
| Supabase client (browser + server) | ✅ | `web/lib/supabase/` |
| Stripe client + 4 plans defined | ✅ | `web/lib/stripe.ts`, `web/lib/plans.ts` |
| Verification provider interfaces (ZeroBounce, NumVerify) | ✅ | `web/lib/verification/` |
| Env template with all keys | ✅ | `web/.env.example` |
| sitemap.xml + robots.txt | ✅ | `web/app/sitemap.ts`, `web/app/robots.ts` |

> Pages are **structural stubs** by design — the high-fidelity UI (see `design/homepage.html`) and the live functionality are added in the design phase / Phase 2.

---

## ⏳ External accounts — YOUR ACTION REQUIRED

These can't be created from code. Set them up, then paste keys into `web/.env.local` (copy from `.env.example`).

- [ ] **Domain** — purchase `bounceblock.io` (Namecheap), point DNS to Vercel
- [ ] **Email** — Zoho Mail: `hello@`, `support@`, `billing@`, `privacy@`, `security@` + SPF/DKIM/DMARC
- [ ] **Vercel** — create project, connect repo, set env vars
- [ ] **Supabase** — create project → `NEXT_PUBLIC_SUPABASE_URL`, anon key, service-role key
- [ ] **Stripe** — add "BounceBlock.io" product + 4 prices → `STRIPE_PRICE_*` IDs, secret key, webhook secret
- [ ] **ZeroBounce** — account + `ZEROBOUNCE_API_KEY` (email verification)
- [ ] **NumVerify** — account + `NUMVERIFY_API_KEY` (phone validation)
- [ ] **Cloudflare** (optional, recommended) — WAF + DDoS in front of Vercel

---

## Phase gate

Per the Phase-Gated plan, Phase 1 sign-off needs QA + Design approval before Phase 2. Code structure is ready; sign-off is pending the external-account setup above.

**Next: Phase 2 — Core Product (MVP).** Wire real auth (NextAuth + Supabase), CSV upload → column mapping → 100-row preview, Stripe Checkout, the **async post-payment processing pipeline** (queue + worker + webhook idempotency + quota), and emailed downloads. See the open questions in the strategy review before starting.
