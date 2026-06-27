# BounceBlock.io

**Clean Leads. Higher Conversions.** — email + phone verification SaaS (a product of Leswang Technology).

This is the Next.js 14 application that serves both the **website** (marketing) and the **application** (auth, verify tool, dashboard) from one codebase.

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (design tokens in `tailwind.config.ts` + `app/globals.css`)
- **Supabase** (Postgres + auth) — `lib/supabase/*`
- **Stripe** (payments) — `lib/stripe.ts`, plans in `lib/plans.ts`
- **ZeroBounce** (email) + **NumVerify** (phone) behind provider interfaces — `lib/verification/*`
- Fonts: **Fraunces** (serif display) + **Inter** (sans) via `next/font`

## Getting started

```bash
cp .env.example .env.local   # then fill in real keys
npm install
npm run dev                  # http://localhost:3000
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`, `npm run typecheck`.

## Project structure

```
app/
  layout.tsx              root layout (fonts, metadata)
  globals.css             design tokens + base styles
  (marketing)/            ── THE WEBSITE ──
    layout.tsx            SiteHeader + SiteFooter
    page.tsx              homepage
    pricing/ about/ security/
    legal/[doc]/          privacy, terms, cookies, refund, dpa, subprocessors, gdpr
    industry/[slug]/      programmatic SEO (Phase 4)
    use-case/[slug]/      programmatic SEO (Phase 4)
    alternative/[slug]/   competitor pages (Phase 5)
  (app)/                  ── THE APPLICATION ──
    layout.tsx            app shell
    login/ signup/        auth screens
    verify/               upload → verify tool
    dashboard/            history, usage, downloads
  api/
    health/               liveness probe
    verify/preview/       100-row free preview (Phase 2)
    stripe/webhook/       Stripe events (Phase 2)
  sitemap.ts  robots.ts
components/
  brand/Logo.tsx
  layout/SiteHeader.tsx  layout/SiteFooter.tsx
  ui/Button.tsx  ui/Container.tsx
  marketing/LandingTemplate.tsx
lib/
  constants.ts  plans.ts  utils.ts
  supabase/  stripe.ts  verification/
public/brand/             logo + OG assets
```

The **website** lives in the `(marketing)` route group; the **application** lives in `(app)`. Route groups keep them separate without affecting URLs.

## Status

Phase 1 (Core Foundation) is code-complete and builds. See **`../PHASE_1_STATUS.md`** for the phase checklist and the external accounts you still need to set up. Phase 2 (Core Product MVP) wires real auth, upload/preview, Stripe checkout, and the async processing pipeline.

The high-fidelity homepage design reference is at `../design/homepage.html`; it is ported into React during the design phase.
