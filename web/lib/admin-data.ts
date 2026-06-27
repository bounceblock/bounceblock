import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { config } from "@/lib/config";
import { PLANS } from "@/lib/plans";

export interface AdminKpis {
  totalUsers: number;
  paidUsers: number;
  mrr: number;
  signups7d: number;
  verifications: number;
  byPlan: Record<string, number>;
}

export interface AdminUser {
  id: string;
  email: string;
  plan: string;
  created_at: string;
}

export interface AdminVer {
  id: string;
  user_id: string | null;
  kind: string;
  rows_processed: number;
  quality_score: number | null;
  created_at: string;
}

const price = (id: string) => PLANS.find((p) => p.id === id)?.priceMonthly ?? 0;

// ── demo data (shown until Supabase service role is configured) ──
const DEMO_KPIS: AdminKpis = {
  totalUsers: 8412,
  paidUsers: 1106,
  mrr: 38940,
  signups7d: 214,
  verifications: 312_480_000,
  byPlan: { free: 7306, starter: 520, pro: 480, business: 106 },
};

const DEMO_USERS: AdminUser[] = [
  { id: "1", email: "maya@northwind.com", plan: "pro", created_at: "2026-06-21" },
  { id: "2", email: "diego@closerate.io", plan: "starter", created_at: "2026-06-20" },
  { id: "3", email: "sarah@talentforge.com", plan: "business", created_at: "2026-06-19" },
  { id: "4", email: "priya@meridian-insure.com", plan: "pro", created_at: "2026-06-18" },
  { id: "5", email: "james@vantage.co", plan: "free", created_at: "2026-06-18" },
  { id: "6", email: "nina@peakleads.io", plan: "starter", created_at: "2026-06-17" },
  { id: "7", email: "carl@northwind.com", plan: "free", created_at: "2026-06-16" },
];

const DEMO_VERS: AdminVer[] = [
  { id: "v1", user_id: "1", kind: "full", rows_processed: 4812, quality_score: 72, created_at: "2026-06-26" },
  { id: "v2", user_id: "3", kind: "full", rows_processed: 9120, quality_score: 81, created_at: "2026-06-26" },
  { id: "v3", user_id: "2", kind: "preview", rows_processed: 100, quality_score: 64, created_at: "2026-06-25" },
  { id: "v4", user_id: "4", kind: "full", rows_processed: 2310, quality_score: 77, created_at: "2026-06-25" },
];

export async function getAdminKpis(): Promise<{ kpis: AdminKpis; demo: boolean }> {
  if (!config.hasSupabaseAdmin()) return { kpis: DEMO_KPIS, demo: true };
  const db = createSupabaseAdminClient();
  const planCount = async (plan: string) =>
    (await db.from("profiles").select("*", { count: "exact", head: true }).eq("plan", plan)).count ?? 0;

  const [free, starter, pro, business] = await Promise.all([
    planCount("free"), planCount("starter"), planCount("pro"), planCount("business"),
  ]);
  const totalUsers = free + starter + pro + business;
  const paidUsers = starter + pro + business;
  const mrr = starter * price("starter") + pro * price("pro") + business * price("business");

  const since = new Date(Date.now() - 7 * 86_400_000).toISOString();
  const signups7d = (await db.from("profiles").select("*", { count: "exact", head: true }).gte("created_at", since)).count ?? 0;
  const verifications = (await db.from("verifications").select("*", { count: "exact", head: true })).count ?? 0;

  return { kpis: { totalUsers, paidUsers, mrr, signups7d, verifications, byPlan: { free, starter, pro, business } }, demo: false };
}

export async function getAdminUsers(q?: string): Promise<{ users: AdminUser[]; demo: boolean }> {
  if (!config.hasSupabaseAdmin()) {
    const users = q ? DEMO_USERS.filter((u) => u.email.includes(q.toLowerCase())) : DEMO_USERS;
    return { users, demo: true };
  }
  const db = createSupabaseAdminClient();
  let query = db.from("profiles").select("id, email, plan, created_at").order("created_at", { ascending: false }).limit(100);
  if (q) query = query.ilike("email", `%${q}%`);
  const { data } = await query;
  return { users: (data as AdminUser[] | null) ?? [], demo: false };
}

export interface AdminUserDetail extends AdminUser {
  referral_code?: string | null;
  usage?: { used: number; quota: number } | null;
  verifications: AdminVer[];
}

export async function getAdminUser(id: string): Promise<{ user: AdminUserDetail | null; demo: boolean }> {
  if (!config.hasSupabaseAdmin()) {
    const base = DEMO_USERS.find((u) => u.id === id) ?? DEMO_USERS[0];
    return {
      user: { ...base, id, referral_code: "a1b2c3d4", usage: { used: 1840, quota: 5000 }, verifications: DEMO_VERS },
      demo: true,
    };
  }
  const db = createSupabaseAdminClient();
  const { data: p } = await db.from("profiles").select("id, email, plan, created_at, referral_code").eq("id", id).single();
  if (!p) return { user: null, demo: false };
  const { data: usageRows } = await db
    .from("usage").select("verifications_used, plan_quota").eq("user_id", id)
    .order("period_start", { ascending: false }).limit(1);
  const { data: vers } = await db
    .from("verifications").select("id, user_id, kind, rows_processed, quality_score, created_at")
    .eq("user_id", id).order("created_at", { ascending: false }).limit(20);
  return {
    user: {
      id: p.id,
      email: p.email,
      plan: p.plan,
      created_at: p.created_at,
      referral_code: p.referral_code,
      usage: usageRows?.[0] ? { used: usageRows[0].verifications_used ?? 0, quota: usageRows[0].plan_quota ?? 0 } : null,
      verifications: (vers as AdminVer[] | null) ?? [],
    },
    demo: false,
  };
}

export async function getAdminVerifications(): Promise<{ vers: AdminVer[]; demo: boolean }> {
  if (!config.hasSupabaseAdmin()) return { vers: DEMO_VERS, demo: true };
  const db = createSupabaseAdminClient();
  const { data } = await db
    .from("verifications")
    .select("id, user_id, kind, rows_processed, quality_score, created_at")
    .order("created_at", { ascending: false })
    .limit(100);
  return { vers: (data as AdminVer[] | null) ?? [], demo: false };
}
