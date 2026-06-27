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
