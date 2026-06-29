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
