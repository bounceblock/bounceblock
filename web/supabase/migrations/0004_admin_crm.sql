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
