# BounceBlock — SEO Audit & Growth Plan

**Updated:** June 28, 2026 · Audited top-to-bottom (technical + content + structured data + internal linking).

---

## 0. Where we stand today

**Indexable pages now: ~166 SEO pages** (build total 214 incl. app/admin/api).

| Engine | Count | Route |
|--------|-------|-------|
| Core marketing | ~11 | `/`, `/pricing`, `/about`, `/security`, `/trust`, `/compliance`, `/case-studies`, `/integrations`, `/status`, `/contact`, `/api-docs` |
| Hubs | 4 | `/industries` `/use-cases` `/alternatives` `/locations` |
| Industries | 40 | `/industry/[slug]` |
| Use cases | 26 | `/use-case/[slug]` |
| Alternatives ("BounceBlock vs X") | 24 | `/alternative/[slug]` |
| Local | 70 | `/city/[slug]` (14 cities × 5 industries) |
| Blog | 6 | `/blog/[slug]` |
| Legal | 8 | `/legal/[doc]` |

Each programmatic page is **non-thin** (hero, pains, benefits, how-it-works, FAQ, related internal links). Good foundation.

---

## 1. Technical SEO — what I FIXED this pass ✅

These were real gaps found in the audit and are now live:

- ✅ **Canonical URLs** on every programmatic + blog page (`lib/seo-meta.ts` → `pageMeta()`). Was missing entirely — duplicate-content risk on 160+ pages.
- ✅ **`SoftwareApplication` + `Offer` schema** (global, priced from `PLANS`) — eligible for product/app rich results.
- ✅ **`BreadcrumbList` schema** on industry / use-case / city / blog pages — SERP breadcrumb trails.
- ✅ **Per-page OpenGraph** (`og:url`, type) instead of inheriting the generic site card.
- ✅ **`image` added to Article schema** (Google strongly prefers an article image).

## 2. Technical SEO — still TODO (cheap, high-value)

1. **Canonical on the ~15 static marketing pages** — one line each: `export const metadata = pageMeta({ path: "/security", ... })`. Pages: `/`, `/pricing`, `/about`, `/security`, `/trust`, `/compliance`, `/case-studies`, `/integrations`, `/status`, `/contact`, `/api-docs`, and the 4 hubs. *(~0 new pages, ~30 min.)*
2. **Sitemap polish** — add `lastModified` (blog from post date), tier `priority` (home 1.0, hubs/pricing 0.8, programmatic 0.6, legal 0.3). *(`app/sitemap.ts`.)*
3. **Per-page OG images** — dynamic `opengraph-image.tsx` in the `[slug]` segments (industry/use-case/alternative/blog) rendering the page title. *(Marked optional in PENDING; do after content.)*
4. **`AggregateRating` schema** — wire in once **real** reviews exist (don't fabricate on the live site; structure is ready in `jsonld.ts`).
5. **Internal linking blog ↔ money pages** — link blog posts to relevant `/industry` and `/use-case` pages and vice-versa (biggest ranking lever we're under-using).

---

## 3. NEW SEO pages to add — the numbers

### Tier 1 — highest ROI (**55 new pages**)
| Set | New pages | Notes |
|-----|-----------|-------|
| **Glossary** | **25** | 1 hub `/glossary` + 24 term pages (`hard-bounce`, `soft-bounce`, `catch-all`, `spam-trap`, `disposable-email`, `role-account`, `spf`, `dkim`, `dmarc`, `sender-reputation`, `email-deliverability`, `mx-record`, `greylisting`, `list-hygiene`, `double-opt-in`, `suppression-list`, `bounce-rate`, `deliverability-rate`, `smtp`, `blacklist`, `honeypot`, `sender-score`, `domain-warmup`, `complaint-rate`). Ranks for high-intent "what is X" queries. |
| **Free tools** | **5** | `/tools/email-verifier` (single), `/tools/phone-validator`, `/tools/bounce-rate-calculator`, `/tools/spam-subject-checker`, `/tools/dmarc-spf-checker`. Link-magnets that feed signups. |
| **Competitor "vs" matrix** | **13** | 1 master comparison table `/compare` + 12 head-to-head `X vs Y` pages (e.g. ZeroBounce vs NeverBounce, Kickbox vs Bouncer…). Captures comparison searches we currently miss. |
| **Integration deep pages** | **12** | `/integrations/[tool]` for HubSpot, Salesforce, Mailchimp, Shopify, Zapier, Pipedrive, Klaviyo, ActiveCampaign, Zoho CRM, Constant Contact, Google Sheets, Apollo. |

### Tier 2 — expand the existing engines (**39 new pages**)
| Set | New pages | From → To |
|-----|-----------|-----------|
| Industries | **+15** | 40 → 55 (e.g. mortgage-brokers, med-spas, travel agencies, B2B SaaS sales, debt collection, locksmiths, tutoring, franchises…) |
| Use cases | **+14** | 26 → 40 (tool-specific: "verify a HubSpot list", "clean a Mailchimp audience", "validate Salesforce contacts", "clean Shopify customers"…) |
| Alternatives | **+10** | 24 → 34 (more named competitors as they surface in search) |

### Tier 3 — local (**hold / cautious**)
Local already has 70 pages. **Recommend 0 new** until the existing 70 prove they index and rank — city×industry pages for a remote SaaS skirt thin-content territory. Expand only if they earn impressions in Search Console.

### New-page total
**Tier 1 (55) + Tier 2 (39) = 94 new non-blog SEO pages.** Site goes from ~166 → **~260 SEO pages**.
If you do only one thing: **Tier 1 (55).** Highest intent, best conversion-to-signup.

---

## 4. Blog — how many to add

- **Today: 6 posts.** Too few for topical authority in a competitive deliverability niche.
- **Add 24 now → 30 posts**, organised into 5 clusters (≈6 each) that internally link to a pillar:
  1. **Deliverability** (pillar: "The complete guide to email deliverability") — SPF/DKIM/DMARC setup, Google/Yahoo 2024 sender rules, inbox-placement, blacklists, warm-up.
  2. **List hygiene** — re-verify cadence, CRM dedup, suppression lists, re-engagement, decay math.
  3. **Cold outreach** — safe cold-email sending, bounce thresholds, domain/inbox setup, deliverability for SDR teams.
  4. **Phone/dialer** — line-type basics, TCPA-aware dialing, dialer list validation, mobile vs VoIP.
  5. **Comparisons & buying** — "best email verification tools", "is X worth it", flat vs credit pricing, how verification works.
- **+4 category hub pages** (`/blog/category/[slug]`) for the clusters above.
- **Then sustain ~8 posts/month.**

**Blog total to add now: 24 posts + 4 category hubs = 28 pages.**

---

## 5. Grand total

| Phase | New indexable pages |
|-------|--------------------|
| Technical fixes | 0 (quality only) |
| Tier 1 SEO pages | 55 |
| Tier 2 SEO pages | 39 |
| Blog (24 posts + 4 hubs) | 28 |
| **Total phase-1 build** | **~122** |

This takes BounceBlock from ~166 → **~288 indexable pages**, all non-thin, internally linked, with canonical + schema. After that: 8 blog posts/month + expand industries/use-cases as Search Console reveals demand.

---

## 6. Suggested build order
1. Finish technical TODO §2.1–2.2 (canonical on static pages + sitemap polish). *(½ day)*
2. **Glossary (25)** + **Free tools (5)** — new templates, reuse `SeoLanding` patterns. *(highest ROI)*
3. **Comparison matrix (13)** + **Integrations (12)**.
4. **Blog cluster #1 (Deliverability, 6 posts)** + category hubs, then clusters #2–5.
5. Expand industries (+15) and use-cases (+14).
6. Per-page OG images + internal-linking pass (§2.5).
