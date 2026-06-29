import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { config } from "@/lib/config";

export interface TeamMember {
  id: string;
  email: string;
  role: string;
  status: string;
  invited_at: string;
}

/** Max teammates on the Business plan (matches the plan's "5 team members" feature). */
export const TEAM_LIMIT = 5;

const DEMO_TEAM: TeamMember[] = [
  { id: "t1", email: "alex@yourcompany.com", role: "admin", status: "active", invited_at: "2026-06-20" },
  { id: "t2", email: "sam@yourcompany.com", role: "member", status: "active", invited_at: "2026-06-22" },
  { id: "t3", email: "jordan@yourcompany.com", role: "member", status: "invited", invited_at: "2026-06-26" },
];

/** Team for an owner. Demo fallback when the service role isn't configured. */
export async function getTeam(ownerId: string | null): Promise<{ members: TeamMember[]; demo: boolean }> {
  if (!config.hasSupabaseAdmin() || !ownerId) return { members: DEMO_TEAM, demo: true };
  const db = createSupabaseAdminClient();
  const { data } = await db
    .from("team_members")
    .select("id, email, role, status, invited_at")
    .eq("owner_id", ownerId)
    .order("invited_at", { ascending: true });
  return { members: (data as TeamMember[] | null) ?? [], demo: false };
}
