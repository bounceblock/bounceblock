-- ============================================================================
-- BounceBlock — ALL migrations bundled (0001 → 0005), in order.
-- Apply to a FRESH Supabase project: Dashboard → SQL Editor → paste → Run.
-- (Generated from migrations/. Run once on an empty database.)
-- ============================================================================


-- ────────────────────────────────────────────────────────────────────────
-- migrations/0001_init.sql
-- ────────────────────────────────────────────────────────────────────────
-- ============================================================================
-- BounceBlock.io — initial schema (Phase 2)
-- Apply via Supabase SQL editor or `supabase db push`.
-- Reflects locked decisions: subscription model · anonymous preview →
-- signup → pay · flat monthly allowance (soft cap, no purchasable credits).
-- ============================================================================

create extension if not exists "pgcrypto";

-- ── enums ───────────────────────────────────────────────────────────────────
create type plan_tier as enum ('free', 'starter', 'pro', 'business');
create type subscription_status as enum ('active', 'trialing', 'past_due', 'canceled', 'incomplete');
create type upload_status as enum ('uploaded', 'preview_done', 'processing', 'completed', 'failed');
create type verification_kind as enum ('preview', 'full');
create type verification_status as enum ('pending', 'processing', 'completed', 'failed');

-- ── updated_at helper ───────────────────────────────────────────────────────
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end; $$;

-- ── profiles (1:1 with auth.users) ──────────────────────────────────────────
create table profiles (
  id                 uuid primary key references auth.users(id) on delete cascade,
  email              text not null,
  full_name          text,
  plan               plan_tier not null default 'free',
  stripe_customer_id text unique,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);
create trigger profiles_updated_at before update on profiles
  for each row execute function set_updated_at();

-- auto-create a profile when a new auth user signs up
create or replace function handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name');
  return new;
end; $$;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- ── subscriptions (synced from Stripe webhooks) ─────────────────────────────
create table subscriptions (
  id                     uuid primary key default gen_random_uuid(),
  user_id                uuid not null references profiles(id) on delete cascade,
  stripe_subscription_id text unique not null,
  stripe_price_id        text not null,
  plan                   plan_tier not null,
  status                 subscription_status not null,
  current_period_start   timestamptz,
  current_period_end     timestamptz,
  cancel_at_period_end   boolean not null default false,
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);
create index subscriptions_user_idx on subscriptions(user_id);
create trigger subscriptions_updated_at before update on subscriptions
  for each row execute function set_updated_at();

-- ── uploads (one per CSV; user_id NULL for anonymous preview) ────────────────
create table uploads (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid references profiles(id) on delete cascade,
  original_filename text,
  row_count         integer,
  column_mapping    jsonb,
  status            upload_status not null default 'uploaded',
  storage_path      text,                       -- raw file in Supabase Storage
  expires_at        timestamptz not null default now() + interval '24 hours',
  created_at        timestamptz not null default now()
);
create index uploads_user_idx on uploads(user_id);
create index uploads_expires_idx on uploads(expires_at);

-- ── verifications (one job: preview or full) ────────────────────────────────
create table verifications (
  id                  uuid primary key default gen_random_uuid(),
  upload_id           uuid references uploads(id) on delete cascade,
  user_id             uuid references profiles(id) on delete cascade,
  kind                verification_kind not null,
  rows_processed      integer not null default 0,
  email_valid         integer not null default 0,
  email_invalid       integer not null default 0,
  email_catch_all     integer not null default 0,
  email_unknown       integer not null default 0,
  phone_valid         integer not null default 0,
  phone_invalid       integer not null default 0,
  duplicates          integer not null default 0,
  quality_score       integer,
  clean_count         integer not null default 0,
  result_storage_path text,                      -- clean CSV in Supabase Storage
  result_expires_at   timestamptz,               -- 90d Pro / 1y Business
  status              verification_status not null default 'pending',
  error               text,
  created_at          timestamptz not null default now(),
  completed_at        timestamptz
);
create index verifications_user_idx on verifications(user_id);
create index verifications_upload_idx on verifications(upload_id);

-- ── usage (flat monthly allowance counter, per billing period) ──────────────
create table usage (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid not null references profiles(id) on delete cascade,
  period_start       date not null,
  period_end         date not null,
  verifications_used integer not null default 0,
  plan_quota         integer not null,
  unique (user_id, period_start)
);
create index usage_user_idx on usage(user_id);

-- ── payments (financial record; 7-year retention) ───────────────────────────
create table payments (
  id                       uuid primary key default gen_random_uuid(),
  user_id                  uuid references profiles(id) on delete set null,
  stripe_payment_intent_id text unique,
  stripe_invoice_id        text,
  amount                   integer not null,      -- minor units (cents)
  currency                 text not null default 'usd',
  status                   text not null,
  created_at               timestamptz not null default now()
);
create index payments_user_idx on payments(user_id);

-- ── webhook idempotency (dedupe Stripe events) ──────────────────────────────
create table processed_webhook_events (
  stripe_event_id text primary key,
  type            text,
  processed_at    timestamptz not null default now()
);

-- ============================================================================
-- Row Level Security — users can only read/write their own rows.
-- The service role (server-side) bypasses RLS for webhooks & processing.
-- ============================================================================
alter table profiles      enable row level security;
alter table subscriptions enable row level security;
alter table uploads       enable row level security;
alter table verifications enable row level security;
alter table usage         enable row level security;
alter table payments      enable row level security;

create policy "own profile"        on profiles      for select using (auth.uid() = id);
create policy "update own profile" on profiles      for update using (auth.uid() = id);
create policy "own subscriptions"  on subscriptions for select using (auth.uid() = user_id);
create policy "own uploads"        on uploads       for all    using (auth.uid() = user_id);
create policy "own verifications"  on verifications for select using (auth.uid() = user_id);
create policy "own usage"          on usage         for select using (auth.uid() = user_id);
create policy "own payments"       on payments      for select using (auth.uid() = user_id);


-- ────────────────────────────────────────────────────────────────────────
-- migrations/0002_referrals.sql
-- ────────────────────────────────────────────────────────────────────────
-- ============================================================================
-- BounceBlock — referral program (Phase 6)
-- Adds a referral code to every profile, captures who referred whom, and
-- tracks referral credits. Apply after 0001_init.sql.
-- ============================================================================

-- short, URL-safe referral code generator
create or replace function gen_referral_code()
returns text language sql as $$
  select lower(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8));
$$;

alter table profiles
  add column if not exists referral_code text unique default gen_referral_code(),
  add column if not exists referred_by text,
  add column if not exists referral_credit_cents integer not null default 0;

-- backfill any existing rows
update profiles set referral_code = gen_referral_code() where referral_code is null;

-- referral events
create table if not exists referrals (
  id            uuid primary key default gen_random_uuid(),
  referrer_id   uuid references profiles(id) on delete set null,
  referred_id   uuid references profiles(id) on delete set null,
  credit_cents  integer not null default 1000,  -- $10 default
  created_at    timestamptz not null default now()
);
create index if not exists referrals_referrer_idx on referrals(referrer_id);

alter table referrals enable row level security;
create policy "own referrals" on referrals for select using (auth.uid() = referrer_id);

-- include referral_code + referred_by when auto-creating a profile on signup
create or replace function handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name, referred_by)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'referred_by'
  );
  return new;
end; $$;


-- ────────────────────────────────────────────────────────────────────────
-- migrations/0003_api_keys.sql
-- ────────────────────────────────────────────────────────────────────────
-- ============================================================================
-- BounceBlock — API keys (Phase 6 / Business plan). Apply after 0002.
-- ============================================================================

create table if not exists api_keys (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references profiles(id) on delete cascade,
  key_hash     text unique not null,         -- sha256 of the raw key; raw is shown once
  name         text default 'API key',
  last_used_at timestamptz,
  revoked_at   timestamptz,
  created_at   timestamptz not null default now()
);
create index if not exists api_keys_user_idx on api_keys(user_id);

alter table api_keys enable row level security;
create policy "own api keys" on api_keys for select using (auth.uid() = user_id);


-- ────────────────────────────────────────────────────────────────────────
-- migrations/0004_admin_crm.sql
-- ────────────────────────────────────────────────────────────────────────
-- ============================================================================
-- BounceBlock — Admin CRM backend (activity tracking + audit + account status)
-- Apply after 0003_api_keys.sql.
--
-- Gives the admin a backend record of *everything happening in the product*:
--   • events            — append-only activity stream (signups, logins, uploads,
--                          verifications, payments, plan changes, quota hits…)
--   • admin_audit_log   — every privileged admin action (who did what, to whom)
--   • profiles.status   — account lifecycle (active / suspended)
--   • profiles.last_seen_at — last activity timestamp (powers "last active")
-- ============================================================================

-- ── account status ──────────────────────────────────────────────────────────
do $$ begin
  create type account_status as enum ('active', 'suspended');
exception when duplicate_object then null; end $$;

alter table profiles
  add column if not exists status       account_status not null default 'active',
  add column if not exists last_seen_at  timestamptz;

-- ── events: append-only product activity stream ─────────────────────────────
create table if not exists events (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references profiles(id) on delete set null,
  email       text,                  -- denormalised so anon/deleted users still read
  type        text not null,         -- 'signup' | 'login' | 'upload' | 'verify_full' | …
  metadata    jsonb not null default '{}'::jsonb,
  ip          text,
  created_at  timestamptz not null default now()
);
create index if not exists events_created_idx on events(created_at desc);
create index if not exists events_user_idx     on events(user_id);
create index if not exists events_type_idx     on events(type);

-- ── admin audit log: privileged actions ─────────────────────────────────────
create table if not exists admin_audit_log (
  id              uuid primary key default gen_random_uuid(),
  admin_email     text not null,
  action          text not null,     -- 'change_plan' | 'grant_credit' | 'suspend' | …
  target_user_id  uuid references profiles(id) on delete set null,
  target_email    text,
  detail          jsonb not null default '{}'::jsonb,
  created_at      timestamptz not null default now()
);
create index if not exists audit_created_idx on admin_audit_log(created_at desc);
create index if not exists audit_target_idx  on admin_audit_log(target_user_id);

-- ── RLS ─────────────────────────────────────────────────────────────────────
-- Users may read their own events; nobody (via anon/auth) reads the audit log.
-- The service-role client (server-side admin queries) bypasses RLS entirely.
alter table events          enable row level security;
alter table admin_audit_log enable row level security;

create policy "own events" on events for select using (auth.uid() = user_id);
-- no public policies on admin_audit_log → only service role can read/write it.

-- ── record signups into the activity stream automatically ───────────────────
-- Augments handle_new_user() (defined in 0002) without dropping its behaviour.
create or replace function handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name, referred_by)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'referred_by'
  );
  insert into public.events (user_id, email, type, metadata)
  values (new.id, new.email, 'signup',
          jsonb_build_object('referred_by', new.raw_user_meta_data ->> 'referred_by'));
  return new;
end; $$;


-- ────────────────────────────────────────────────────────────────────────
-- migrations/0005_team.sql
-- ────────────────────────────────────────────────────────────────────────
-- ============================================================================
-- BounceBlock — team members (Business plan). Apply after 0004_admin_crm.sql.
-- An account owner can invite teammates by email (up to the plan limit).
-- ============================================================================

do $$ begin
  create type team_member_role as enum ('admin', 'member');
exception when duplicate_object then null; end $$;

do $$ begin
  create type team_member_status as enum ('invited', 'active');
exception when duplicate_object then null; end $$;

create table if not exists team_members (
  id          uuid primary key default gen_random_uuid(),
  owner_id    uuid not null references profiles(id) on delete cascade,
  email       text not null,
  role        team_member_role not null default 'member',
  status      team_member_status not null default 'invited',
  invited_at  timestamptz not null default now(),
  accepted_at timestamptz,
  unique (owner_id, email)
);
create index if not exists team_members_owner_idx on team_members(owner_id);

alter table team_members enable row level security;
-- An owner can see and manage their own team; the service role bypasses RLS.
create policy "own team select" on team_members for select using (auth.uid() = owner_id);
create policy "own team write"  on team_members for all    using (auth.uid() = owner_id);

