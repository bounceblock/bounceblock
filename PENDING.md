# BounceBlock — Project Status & Pending List

**Division of labor:** 🛠️ = Claude finishes in code (the technical product). 🔑 = You do manually (accounts, keys, content, deploy).
**Updated:** June 27, 2026 · Repo builds clean (207 pages), lint clean, tests pass.

---

## ✅ Done (technical)

- Next.js 14 + TS + Tailwind app; warm-light brand design system; logo + favicon + OG image
- **Marketing site:** homepage, pricing (toggle), about, security, trust, compliance, case studies, integrations, status, contact, API docs, blog (6 posts)
- **Programmatic SEO:** 40 industries + 26 use cases + 24 alternatives + 70 local pages + hubs (internal-linked, sitemap)
- **Legal & trust:** 8 legal docs + cookie-consent banner
- **Core product (demo mode):** upload → column mapping → 100-row preview → **full process + clean-CSV download**; mock-capable verification engine
- **App:** sidebar AppShell — Dashboard, Verify, History, Billing, Settings; login/signup/logout; protected routes
- **Admin CRM:** /admin overview KPIs, users, verifications (admin-email guard, demo data)
- **Payments wiring:** Stripe checkout + portal + webhook (idempotent) — ready-for-keys
- **Auth wiring:** Supabase Auth — ready-for-keys
- **Email:** 8 lifecycle sequences + transactional templates — ready-for-keys
- **Growth:** referrals (schema + dashboard card), newsletter capture, consent-gated analytics
- **Standards:** structured data, security headers (CSP), accessibility, error/loading boundaries, rate limiting, verify-engine tests, git

---

## 🛠️ Technical — Claude to finish (top-to-bottom)

### Backend / processing pipeline
- [ ] Persist `uploads` + `verifications` rows after full processing (when Supabase configured)
- [ ] Store clean file in Supabase Storage; wire dashboard/history **Download** to signed URLs
- [ ] Enforce monthly **quota** (block + upgrade prompt when over allowance)
- [ ] Send **results-ready** email after processing + **receipt** email from webhook
- [ ] Move large-list processing to a **queue worker** (Inngest/QStash adapter)

### Public API
- [ ] `POST /api/v1/verify` endpoint with API-key auth
- [ ] API key generation + management UI (settings)

### Auth completeness
- [ ] Forgot / reset password flow
- [ ] Email-verification resend + confirmation handling
- [ ] Post-signup onboarding step

### Admin CRM depth
- [ ] User detail page (profile, subscription, usage, verification history)
- [ ] Admin actions: change plan, grant credit, suspend, refund
- [ ] Subscriptions / payments / referrals views
- [ ] Search + filter + pagination on lists

### App polish
- [ ] Loading skeletons for app + admin
- [ ] Team members management (Business plan)
- [ ] `app.bounceblock.io` subdomain routing (middleware host rewrite)

### Quality
- [ ] More tests (plans, rate-limit, scoring, content builders)
- [ ] Per-page OG images (optional)

---

## 🔑 Manual — yours (accounts, keys, content, deploy)

- [ ] **Domain** — buy `bounceblock.io` (Namecheap) + point DNS to Vercel
- [ ] **Zoho Mail** — hello@/support@/billing@/privacy@/security@ + SPF/DKIM/DMARC
- [ ] **Supabase** — create project → apply `migrations/0001` + `0002` + `0003` → create `results` storage bucket → paste URL + anon + service-role keys
- [ ] **ZeroBounce** + **NumVerify** — API keys
- [ ] **Stripe** — product + 4 prices (Free/Starter/Pro/Business) + webhook → secret + publishable + webhook secret + price IDs
- [ ] **Env flags** — `ADMIN_EMAILS`, `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
- [ ] **Deploy** — Vercel project + Cloudflare WAF in front
- [ ] **Content** — replace placeholder testimonials / logos / case studies with real ones
- [ ] **Legal** — have counsel review the legal templates
- [ ] **Monitoring** — Sentry (errors) + UptimeRobot

---

*Claude works the 🛠️ list to completion; you tick off the 🔑 list one by one. Everything 🛠️ is built ready-for-keys so it activates the moment the matching 🔑 item is done.*
