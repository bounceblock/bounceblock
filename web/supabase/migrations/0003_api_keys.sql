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
