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
