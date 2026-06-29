# BounceBlock — Project Status & Pending List

**Division of labor:** 🛠️ = Claude finishes in code (the technical product). 🔑 = You do manually (accounts, keys, content, deploy).
**Updated:** June 28, 2026 · Repo builds clean (**449 pages**), typecheck + lint clean, 21 tests pass.

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
- [x] Persist `uploads` + `verifications` rows after full processing ✅
- [x] Store clean file in Supabase Storage + email signed download link ✅
- [x] Wire dashboard/history **Download** buttons to signed URLs ✅
- [x] Enforce monthly **quota** (402 + upgrade prompt when over) ✅
- [x] **results-ready** email after processing + **receipt** email from webhook ✅
- [~] Queue worker adapter (`lib/queue.ts`) is **ready-for-keys**; live async worker needs a QStash/Inngest account (🔑). Inline processing works today.

### Public API
- [x] `POST /api/v1/verify` endpoint with API-key auth ✅
- [x] API key generation + management UI (settings) ✅

### Auth completeness
- [x] Forgot / reset password flow ✅ — now routes through **`/auth/callback`** (PKCE code exchange) so reset/confirm links actually establish a session ✅
- [x] Email-confirmation handling via `/auth/callback` ✅ (resend UI: later)
- [x] **Post-signup onboarding step** — `/welcome` (3-step getting-started; signup + email-confirm land here) ✅

### Admin CRM depth
- [x] User detail page (profile, status, usage, subscription, payments, API, per-user activity) ✅
- [x] Admin actions: change plan, grant credit, **suspend/reactivate, reset usage** ✅ (all audit-logged)
- [x] Subscriptions / payments views (+ status filters, refund totals) ✅
- [x] Search on users + **plan/status filters + pagination** ✅
- [x] **Backend activity tracking** — `events` stream wired into signup/login/upload/preview/full/API/payment/sub/quota; `/admin/activity` feed ✅
- [x] **Admin audit log** — `admin_audit_log` table + `/admin/audit` view ✅
- [x] **Richer overview** — MRR/ARR/ARPU/conversion/active+past_due/30d revenue + 14-day signups·revenue chart + live activity + integration health ✅
- [x] **System page** — integration connection status + plan config (`/admin/system`) ✅
- [x] **Defense-in-depth guard** — `app/admin/layout.tsx` `isAdmin()` on top of middleware ✅
- [x] **CSV export** of users + payments (admin-guarded route handlers + buttons) ✅ (saved segments: later)

### App polish
- [x] Loading skeletons for app + admin ✅
- [x] **Team members management (Business plan)** — `team_members` table (migration 0005) + settings card (invite/remove, 5-seat limit), ready-for-keys ✅
- [x] `app.bounceblock.io` subdomain routing (middleware host rewrite) ✅

### Quality
- [x] More tests (plans, rate-limit, admin/events) ✅ — 21 tests
- [x] **Admin login flow** — middleware preserves `next`; login honors safe `next` (open-redirect-guarded); "Admin" link in app shell for admins ✅

### SEO (audit → see `SEO_PLAN.md`)
- [x] **Canonical URLs** on all programmatic + blog pages (`lib/seo-meta.ts`) ✅
- [x] **SoftwareApplication + Offer + BreadcrumbList + DefinedTerm schema** ✅
- [x] Per-page OpenGraph + Article image ✅
- [x] **Sitemap** expanded + tiered priority + blog `lastModified` ✅

### SEO Phase-1 build — DONE (June 28, 2026) · **build 214 → 347 pages (+133)**
- [x] **Free tools (10)** — `/tools` + interactive widgets (email/phone verify via `/api/tools/check`, syntax, disposable, MX lookup, SPF/DKIM/DMARC lint, spam-subject, bounce calc) ✅
- [x] **Glossary (22)** — `/glossary` + `/glossary/[slug]` (DefinedTerm schema, internal links) ✅
- [x] **Integration pages (12)** — `/integrations/[slug]` + hub relinked ✅
- [x] **Country phone pages (30)** — `/phone-validation/[country]` + hub ✅
- [x] **Product pages (8)** — `/product/[slug]` (email/bulk/API/phone/company/form-guard/finder/enrichment) ✅
- [x] **Role pages (4)** — `/for/[slug]` (marketers/sales/developers/agencies) ✅
- [x] **"Best X alternative" (8)** — `/best-alternative/[slug]` ✅
- [x] **Blog +24 → 30 posts** + category hubs `/blog/category/[slug]` ✅
- [x] **Core pages** — `/demo`, `/careers`, `/help` + Legal **CCPA** ✅
- [x] Nav + footer rebuilt around the new sections ✅
- [x] **Blog → money-page internal linking** — category-mapped "Related guides & tools" block on every post ✅
- [x] QA pass: 0 duplicate slugs, 0 broken glossary links, 0 thin posts, all 101 new URLs return 200 ✅
### SEO Phase-2 build — DONE (June 28, 2026) · **build 347 → 449 pages (+102)**
- [x] **Feature sub-pages (15)** — `/features/[slug]` + hub ✅
- [x] **Comparison matrix** — `/compare` (BounceBlock vs 10 competitors, email/phone/company/flat/free-tier) ✅
- [x] **Integrations 12 → 35** — full CRM/ESP/forms/outreach set ✅
- [x] **Industries 40 → 55, use-cases 26 → 40** ✅
- [x] **Country phone pages 30 → 60** ✅
- [x] **"Best X alternative" 8 → 10** (added debounce, verifalia) ✅
- [ ] Genuinely deferred (need 🔑 or ongoing): scale countries 60→240, **native CRM syncs** (per-CRM OAuth apps + keys), blog cadence → ~8/mo

### SEO Phase-3 build — money pages + E-E-A-T + authority — DONE (June 28, 2026) · **build 449 → 508 pages (+59)**
Closed the missing-page-TYPE gaps from `SEO_PLAN.md` §5B/§9. New shared data source `lib/competitors.ts` (real, structured competitor facts) backs reviews + compare so they're non-thin.
- [x] **Head-to-head comparisons (20)** — `/compare/[a]-vs-[b]` + relinked hub (FAQ schema, BounceBlock as bundled 3rd option) ✅
- [x] **Tool reviews (10)** — `/reviews` + `/reviews/[slug]` (Review schema, transparent rubric scorecard, reviewer byline) ✅
- [x] **Authors / E-E-A-T (5)** — `/authors` + `/authors/[slug]` (Person schema); blog posts now carry an author byline via `postAuthorId()` ✅
- [x] **Case studies (8 stories)** — `/case-studies/[slug]` + hub refactored to data (illustrative, linked to industry + use-case) ✅
- [x] **Research / data studies (4)** — `/research` + `/research/[slug]` (Dataset + Article schema, bar charts; illustrative figures = ready-for-keys) ✅
- [x] **Resources / lead magnets (8)** — `/resources` + `/resources/[slug]` (ungated checklists/templates/playbooks + newsletter capture) ✅
- [x] Wired into sitemap, nav (Resources dropdown) + footer; new jsonld helpers (`personLd`, `reviewLd`, `datasetLd`) ✅
- [x] Verified: typecheck + lint clean, **508/508 static pages build**, 21 tests pass ✅

### SEO Phase-4 build — free-tool expansion (link magnets) — DONE (June 28, 2026) · **build 508 → 522 pages (+14)**
`/tools` 10 → **24**. Added to `lib/tools.ts` (WidgetKey union) + `components/tools/ToolWidget.tsx`; hub + sitemap auto-include. Deliverability test featured first on the hub.
- [x] **Email Deliverability Test** (flagship, no-login) — live MX + SPF + DMARC + DKIM scan via DNS-over-HTTPS ✅
- [x] **SPF / DKIM / DMARC generators** (3) — client-side record builders with copy-to-clipboard ✅
- [x] **Blacklist + IP-reputation checkers** (2) — DNSBL queries via dns.google (+ PTR for IP); Spamhaus omitted (blocks public resolvers), unreachable zones reported as "unverifiable" ✅
- [x] **Catch-all + carrier + HLR checkers** (3) — reuse the rate-limited `/api/tools/check` (mock-capable, ready-for-keys) ✅
- [x] **Role-account checker, Email finder (permutator), Reverse email lookup, Company domain finder, Email list cleaner** (5) — client-side, fully working, no API ✅
- [x] Verified: typecheck + lint clean, **522/522 static pages build**, 21 tests pass ✅
- [ ] **Still open (next SEO batch):** head-to-head + reviews are email-only (could add phone/company vendors); research figures await real anonymized data; remaining §5B types covered. Authority levers (backlinks, link-building) are 🔑/ongoing, not code.

### Google Ads compliance pass — "Enabling dishonest behavior" policy — DONE (June 29, 2026)
Audited the full site against Google Ads' *Enabling dishonest behavior* policy (esp. bucket 3: "track or monitor another person"). Sitewide copy scan was clean (no deceptive phrasing). Hardened the contact-discovery/lookup surfaces a reviewer could misread as people-search/tracking:
- [x] **Tool copy reframed** — email-finder ("work-email formats for B2B"), carrier-lookup + hlr-lookup ("numbers you're authorised to contact", added "not for tracking" FAQ), reverse-email-lookup **renamed → "Email Address Analyzer"** (slug unchanged), with consent/business-only framing ✅
- [x] **`ToolDef.notice` field** + render on `/tools/[slug]` — explicit "Intended use" line linking to the Acceptable Use Policy on the 4 risk tools ✅
- [x] **Acceptable Use Policy strengthened** (`lib/legal.ts`) — new prohibited-uses bullets (no tracking/monitoring/locating/profiling/surveillance/stalking; no contacting without consent/lawful basis) + an "Intended use" clause ✅
- [x] **Product/feature framing** — `USE_FAQ` added to phone + email-finder products; consent line on the carrier/HLR feature ✅
- [x] Phase-3 calculator tools (added separately, build → 536) audited: no exposure. Verified typecheck + lint clean, **536/536 build**, 21 tests pass ✅

---

## 🔑 Manual — yours (accounts, keys, content, deploy)

- [ ] **Domain** — buy `bounceblock.io` (Namecheap) + point DNS to Vercel
- [~] **Google Workspace** — aliases created: hello@ · support@ · billing@ · no-reply@ (✅). Still to create: **privacy@ · security@** (referenced in code). Then: confirm the real login mailbox → set `SMTP_USER` + Google **app password** (needs 2FA), add **no-reply@ as a "Send mail as"** on it (or use smtp-relay.gmail.com). **Publish SPF + DKIM + DMARC DNS records** for bounceblock.io — without these the app's own welcome/reset/receipt mail may land in spam.
- [ ] **Supabase** — create project → apply `migrations/0001`–`0005` (init, referrals, api-keys, admin-crm, team) → create `results` storage bucket → paste URL + anon + service-role keys
- [ ] **ZeroBounce** + **NumVerify** — API keys
- [ ] **Stripe** — product + 4 prices (Free/Starter/Pro/Business) + webhook → secret + publishable + webhook secret + price IDs
- [ ] **Env flags** — `ADMIN_EMAILS`, `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
- [ ] **Deploy** — Vercel project + Cloudflare WAF in front
- [ ] **Content** — replace placeholder testimonials / logos / case studies with real ones
- [ ] **Legal** — have counsel review the legal templates
- [ ] **Monitoring** — Sentry (errors) + UptimeRobot

---

*Claude works the 🛠️ list to completion; you tick off the 🔑 list one by one. Everything 🛠️ is built ready-for-keys so it activates the moment the matching 🔑 item is done.*
