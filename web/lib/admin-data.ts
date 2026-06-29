import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { config } from "@/lib/config";
import { PLANS, type PlanId } from "@/lib/plans";
import type { SupabaseClient } from "@supabase/supabase-js";

// ============================================================================
// Admin CRM data layer.
//
// Every getter returns `{ …data, demo }`. When the Supabase service role is
// configured it runs live queries; otherwise it returns rich, believable demo
// data so the whole back office is explorable locally (ready-for-keys).
// ============================================================================

const price = (id: string) => PLANS.find((p) => p.id === id)?.priceMonthly ?? 0;
const PLAN_IDS = ["free", "starter", "pro", "business"] as const;

// ── KPIs ─────────────────────────────────────────────────────────────────────
export interface AdminKpis {
  totalUsers: number;
  paidUsers: number;
  freeUsers: number;
  mrr: number;
  arr: number;
  arpu: number;
  signupsToday: number;
  signups7d: number;
  signups30d: number;
  verifications: number;
  verifications30d: number;
  rowsProcessed30d: number;
  revenueAllTime: number; // cents
  revenue30d: number; // cents
  activeSubs: number;
  pastDue: number;
  trialing: number;
  canceled: number;
  conversion: number; // paid / total, %
  byPlan: Record<string, number>;
}

export interface SeriesPoint {
  date: string; // YYYY-MM-DD
  signups: number;
  revenue: number; // cents
}

// ── shared row shapes ─────────────────────────────────────────────────────────
export interface AdminUser {
  id: string;
  email: string;
  plan: string;
  status: string;
  created_at: string;
  last_seen_at: string | null;
}

export interface AdminVer {
  id: string;
  user_id: string | null;
  kind: string;
  rows_processed: number;
  quality_score: number | null;
  created_at: string;
}

export interface AdminPayment {
  id: string;
  user_id: string | null;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
}

export interface AdminSub {
  id: string;
  user_id: string;
  plan: string;
  status: string;
  current_period_end: string | null;
}

export interface AdminEvent {
  id: string;
  user_id: string | null;
  email: string | null;
  type: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface AdminAudit {
  id: string;
  admin_email: string;
  action: string;
  target_user_id: string | null;
  target_email: string | null;
  detail: Record<string, unknown>;
  created_at: string;
}

export interface IntegrationStatus {
  key: string;
  label: string;
  connected: boolean;
  note: string;
}

// ─────────────────────────────────────────────────────────────────────────────
//  Demo data (shown until the Supabase service role is configured)
// ─────────────────────────────────────────────────────────────────────────────
const today = (offset = 0) => {
  const d = new Date(Date.now() + offset * 86_400_000);
  return d.toISOString().slice(0, 10);
};
const ts = (offsetDays = 0, hour = 9) => {
  const d = new Date(Date.now() + offsetDays * 86_400_000);
  d.setUTCHours(hour, (offsetDays * 7) % 60, 0, 0);
  return d.toISOString();
};

const DEMO_KPIS: AdminKpis = {
  totalUsers: 8412,
  paidUsers: 1106,
  freeUsers: 7306,
  mrr: 38_940,
  arr: 467_280,
  arpu: 35,
  signupsToday: 37,
  signups7d: 214,
  signups30d: 921,
  verifications: 312_480_000,
  verifications30d: 18_640,
  rowsProcessed30d: 4_812_900,
  revenueAllTime: 41_280_400,
  revenue30d: 3_894_000,
  activeSubs: 1058,
  pastDue: 31,
  trialing: 17,
  canceled: 142,
  conversion: 13,
  byPlan: { free: 7306, starter: 520, pro: 480, business: 106 },
};

// 14-day deterministic series (smooth-ish, weekend dips) for the overview charts.
const DEMO_SERIES: SeriesPoint[] = Array.from({ length: 14 }, (_, i) => {
  const day = 13 - i;
  const weekend = [0, 6].includes(new Date(Date.now() - day * 86_400_000).getUTCDay());
  const base = 26 + ((i * 7) % 13);
  const signups = weekend ? Math.round(base * 0.55) : base;
  const revenue = (signups * 1300 + ((i * 311) % 2600)) | 0;
  return { date: today(-day), signups, revenue };
});

const DEMO_USERS: AdminUser[] = [
  { id: "1", email: "maya@northwind.com", plan: "pro", status: "active", created_at: ts(-7), last_seen_at: ts(-0, 14) },
  { id: "2", email: "diego@closerate.io", plan: "starter", status: "active", created_at: ts(-8), last_seen_at: ts(-1, 11) },
  { id: "3", email: "sarah@talentforge.com", plan: "business", status: "active", created_at: ts(-9), last_seen_at: ts(-0, 8) },
  { id: "4", email: "priya@meridian-insure.com", plan: "pro", status: "active", created_at: ts(-10), last_seen_at: ts(-2, 16) },
  { id: "5", email: "james@vantage.co", plan: "free", status: "active", created_at: ts(-10), last_seen_at: ts(-3, 9) },
  { id: "6", email: "nina@peakleads.io", plan: "starter", status: "active", created_at: ts(-11), last_seen_at: ts(-1, 19) },
  { id: "7", email: "carl@northwind.com", plan: "free", status: "suspended", created_at: ts(-12), last_seen_at: ts(-9, 10) },
  { id: "8", email: "lena@brightfunnel.com", plan: "business", status: "active", created_at: ts(-14), last_seen_at: ts(-0, 7) },
  { id: "9", email: "omar@scaleworks.io", plan: "pro", status: "active", created_at: ts(-16), last_seen_at: ts(-4, 13) },
  { id: "10", email: "tess@growthloop.co", plan: "free", status: "active", created_at: ts(-18), last_seen_at: ts(-6, 12) },
  { id: "11", email: "raj@signalhq.com", plan: "starter", status: "active", created_at: ts(-21), last_seen_at: ts(-2, 10) },
  { id: "12", email: "ava@orbitsales.com", plan: "free", status: "active", created_at: ts(-25), last_seen_at: ts(-7, 15) },
];

const DEMO_VERS: AdminVer[] = [
  { id: "v1", user_id: "1", kind: "full", rows_processed: 4812, quality_score: 72, created_at: ts(-1) },
  { id: "v2", user_id: "3", kind: "full", rows_processed: 9120, quality_score: 81, created_at: ts(-1, 13) },
  { id: "v3", user_id: "2", kind: "preview", rows_processed: 100, quality_score: 64, created_at: ts(-2) },
  { id: "v4", user_id: "4", kind: "full", rows_processed: 2310, quality_score: 77, created_at: ts(-2, 15) },
  { id: "v5", user_id: "8", kind: "full", rows_processed: 15_400, quality_score: 88, created_at: ts(-3) },
  { id: "v6", user_id: "9", kind: "full", rows_processed: 640, quality_score: 59, created_at: ts(-3, 18) },
  { id: "v7", user_id: null, kind: "preview", rows_processed: 100, quality_score: 70, created_at: ts(-4) },
  { id: "v8", user_id: "6", kind: "full", rows_processed: 3120, quality_score: 74, created_at: ts(-5) },
];

const DEMO_PAYMENTS: AdminPayment[] = [
  { id: "p1", user_id: "1", amount: 2900, currency: "usd", status: "paid", created_at: ts(-1) },
  { id: "p2", user_id: "3", amount: 7900, currency: "usd", status: "paid", created_at: ts(-2) },
  { id: "p3", user_id: "2", amount: 1900, currency: "usd", status: "paid", created_at: ts(-3) },
  { id: "p4", user_id: "4", amount: 2900, currency: "usd", status: "paid", created_at: ts(-5) },
  { id: "p5", user_id: "8", amount: 7900, currency: "usd", status: "paid", created_at: ts(-6) },
  { id: "p6", user_id: "9", amount: 2900, currency: "usd", status: "paid", created_at: ts(-8) },
  { id: "p7", user_id: "4", amount: 2900, currency: "usd", status: "refunded", created_at: ts(-12) },
];

const DEMO_SUBS: AdminSub[] = [
  { id: "s1", user_id: "1", plan: "pro", status: "active", current_period_end: today(23) },
  { id: "s2", user_id: "3", plan: "business", status: "active", current_period_end: today(22) },
  { id: "s3", user_id: "2", plan: "starter", status: "active", current_period_end: today(21) },
  { id: "s4", user_id: "4", plan: "pro", status: "past_due", current_period_end: today(-2) },
  { id: "s5", user_id: "8", plan: "business", status: "active", current_period_end: today(19) },
  { id: "s6", user_id: "9", plan: "pro", status: "trialing", current_period_end: today(6) },
  { id: "s7", user_id: "11", plan: "starter", status: "active", current_period_end: today(14) },
  { id: "s8", user_id: "7", plan: "starter", status: "canceled", current_period_end: today(-9) },
];

const DEMO_EVENTS: AdminEvent[] = [
  { id: "e1", user_id: "1", email: "maya@northwind.com", type: "verify_full", metadata: { rows: 4812 }, created_at: ts(-0, 14) },
  { id: "e2", user_id: "8", email: "lena@brightfunnel.com", type: "verify_full", metadata: { rows: 15400 }, created_at: ts(-0, 7) },
  { id: "e3", user_id: "3", email: "sarah@talentforge.com", type: "payment", metadata: { amount: 7900 }, created_at: ts(-0, 6) },
  { id: "e4", user_id: "5", email: "james@vantage.co", type: "login", metadata: {}, created_at: ts(-0, 9) },
  { id: "e5", user_id: "13", email: "newlead@acme.io", type: "signup", metadata: {}, created_at: ts(-1, 10) },
  { id: "e6", user_id: "2", email: "diego@closerate.io", type: "verify_preview", metadata: { rows: 100 }, created_at: ts(-1, 11) },
  { id: "e7", user_id: "9", email: "omar@scaleworks.io", type: "quota_exceeded", metadata: { used: 5000, quota: 5000 }, created_at: ts(-1, 18) },
  { id: "e8", user_id: "4", email: "priya@meridian-insure.com", type: "plan_change", metadata: { from: "starter", to: "pro" }, created_at: ts(-2, 15) },
  { id: "e9", user_id: "6", email: "nina@peakleads.io", type: "api_verify", metadata: { rows: 1 }, created_at: ts(-2, 19) },
  { id: "e10", user_id: "11", email: "raj@signalhq.com", type: "subscription_created", metadata: { plan: "starter" }, created_at: ts(-3, 12) },
  { id: "e11", user_id: "7", email: "carl@northwind.com", type: "subscription_canceled", metadata: { plan: "starter" }, created_at: ts(-9, 10) },
  { id: "e12", user_id: null, email: "anon", type: "verify_preview", metadata: { rows: 100 }, created_at: ts(-4, 8) },
];

const DEMO_AUDIT: AdminAudit[] = [
  { id: "a1", admin_email: "admin@bounceblock.io", action: "change_plan", target_user_id: "4", target_email: "priya@meridian-insure.com", detail: { from: "starter", to: "pro" }, created_at: ts(-2, 15) },
  { id: "a2", admin_email: "admin@bounceblock.io", action: "grant_credit", target_user_id: "2", target_email: "diego@closerate.io", detail: { cents: 1000 }, created_at: ts(-3, 16) },
  { id: "a3", admin_email: "admin@bounceblock.io", action: "suspend", target_user_id: "7", target_email: "carl@northwind.com", detail: { reason: "abuse" }, created_at: ts(-9, 11) },
];

// ─────────────────────────────────────────────────────────────────────────────
//  Live getters (fall back to demo when the service role is absent)
// ─────────────────────────────────────────────────────────────────────────────
const countRows = async (db: SupabaseClient, table: string, build?: (q: any) => any) => {
  let q = db.from(table).select("*", { count: "exact", head: true });
  if (build) q = build(q);
  const { count } = await q;
  return count ?? 0;
};

export async function getAdminKpis(): Promise<{ kpis: AdminKpis; series: SeriesPoint[]; demo: boolean }> {
  if (!config.hasSupabaseAdmin()) return { kpis: DEMO_KPIS, series: DEMO_SERIES, demo: true };
  const db = createSupabaseAdminClient();

  const [free, starter, pro, business] = await Promise.all(
    PLAN_IDS.map((p) => countRows(db, "profiles", (q) => q.eq("plan", p)))
  );
  const totalUsers = free + starter + pro + business;
  const paidUsers = starter + pro + business;
  const mrr = starter * price("starter") + pro * price("pro") + business * price("business");

  const since = (days: number) => new Date(Date.now() - days * 86_400_000).toISOString();
  const startOfToday = new Date(); startOfToday.setUTCHours(0, 0, 0, 0);

  const [
    signupsToday, signups7d, signups30d,
    verifications, verifications30d,
    activeSubs, pastDue, trialing, canceled,
  ] = await Promise.all([
    countRows(db, "profiles", (q) => q.gte("created_at", startOfToday.toISOString())),
    countRows(db, "profiles", (q) => q.gte("created_at", since(7))),
    countRows(db, "profiles", (q) => q.gte("created_at", since(30))),
    countRows(db, "verifications"),
    countRows(db, "verifications", (q) => q.gte("created_at", since(30))),
    countRows(db, "subscriptions", (q) => q.eq("status", "active")),
    countRows(db, "subscriptions", (q) => q.eq("status", "past_due")),
    countRows(db, "subscriptions", (q) => q.eq("status", "trialing")),
    countRows(db, "subscriptions", (q) => q.eq("status", "canceled")),
  ]);

  // Sum of paid rows + last-30d revenue, and rows processed in 30d.
  const { data: paidAll } = await db.from("payments").select("amount").eq("status", "paid");
  const revenueAllTime = (paidAll ?? []).reduce((s: number, r: any) => s + (r.amount ?? 0), 0);
  const { data: paid30 } = await db.from("payments").select("amount").eq("status", "paid").gte("created_at", since(30));
  const revenue30d = (paid30 ?? []).reduce((s: number, r: any) => s + (r.amount ?? 0), 0);
  const { data: rows30 } = await db.from("verifications").select("rows_processed").gte("created_at", since(30));
  const rowsProcessed30d = (rows30 ?? []).reduce((s: number, r: any) => s + (r.rows_processed ?? 0), 0);

  // 14-day series from raw timestamps, bucketed in TS (bounded row counts).
  const { data: sRows } = await db.from("profiles").select("created_at").gte("created_at", since(14));
  const { data: pRows } = await db.from("payments").select("amount, created_at").eq("status", "paid").gte("created_at", since(14));
  const series: SeriesPoint[] = Array.from({ length: 14 }, (_, i) => {
    const d = today(-(13 - i));
    const signups = (sRows ?? []).filter((r: any) => (r.created_at ?? "").slice(0, 10) === d).length;
    const revenue = (pRows ?? []).filter((r: any) => (r.created_at ?? "").slice(0, 10) === d).reduce((s: number, r: any) => s + (r.amount ?? 0), 0);
    return { date: d, signups, revenue };
  });

  const kpis: AdminKpis = {
    totalUsers, paidUsers, freeUsers: free,
    mrr, arr: mrr * 12, arpu: paidUsers ? Math.round(mrr / paidUsers) : 0,
    signupsToday, signups7d, signups30d,
    verifications, verifications30d, rowsProcessed30d,
    revenueAllTime, revenue30d,
    activeSubs, pastDue, trialing, canceled,
    conversion: totalUsers ? Math.round((paidUsers / totalUsers) * 100) : 0,
    byPlan: { free, starter, pro, business },
  };
  return { kpis, series, demo: false };
}

export interface UserQuery {
  q?: string;
  plan?: string;
  status?: string;
  page?: number;
}
const PAGE_SIZE = 20;

export async function getAdminUsers(opts: UserQuery = {}): Promise<{ users: AdminUser[]; total: number; page: number; pageSize: number; demo: boolean }> {
  const page = Math.max(1, opts.page ?? 1);
  if (!config.hasSupabaseAdmin()) {
    let users = DEMO_USERS;
    if (opts.q) users = users.filter((u) => u.email.includes(opts.q!.toLowerCase()));
    if (opts.plan) users = users.filter((u) => u.plan === opts.plan);
    if (opts.status) users = users.filter((u) => u.status === opts.status);
    const total = users.length;
    const slice = users.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
    return { users: slice, total, page, pageSize: PAGE_SIZE, demo: true };
  }
  const db = createSupabaseAdminClient();
  let query = db
    .from("profiles")
    .select("id, email, plan, status, created_at, last_seen_at", { count: "exact" })
    .order("created_at", { ascending: false })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
  if (opts.q) query = query.ilike("email", `%${opts.q}%`);
  if (opts.plan) query = query.eq("plan", opts.plan);
  if (opts.status) query = query.eq("status", opts.status);
  const { data, count } = await query;
  return { users: (data as AdminUser[] | null) ?? [], total: count ?? 0, page, pageSize: PAGE_SIZE, demo: false };
}

export interface AdminUserDetail extends AdminUser {
  referral_code?: string | null;
  referral_credit_cents?: number;
  stripe_customer_id?: string | null;
  usage?: { used: number; quota: number } | null;
  subscription?: AdminSub | null;
  verifications: AdminVer[];
  payments: AdminPayment[];
  events: AdminEvent[];
  apiKeys: { count: number; lastUsed: string | null };
}

export async function getAdminUser(id: string): Promise<{ user: AdminUserDetail | null; demo: boolean }> {
  if (!config.hasSupabaseAdmin()) {
    const base = DEMO_USERS.find((u) => u.id === id) ?? DEMO_USERS[0];
    return {
      user: {
        ...base,
        id,
        referral_code: "a1b2c3d4",
        referral_credit_cents: 1000,
        stripe_customer_id: base.plan === "free" ? null : `cus_demo_${id}`,
        usage: { used: 1840, quota: 5000 },
        subscription: DEMO_SUBS.find((s) => s.user_id === id) ?? null,
        verifications: DEMO_VERS.filter((v) => v.user_id === id).concat(DEMO_VERS).slice(0, 5),
        payments: DEMO_PAYMENTS.filter((p) => p.user_id === id),
        events: DEMO_EVENTS.filter((e) => e.user_id === id).concat(DEMO_EVENTS).slice(0, 8),
        apiKeys: { count: base.plan === "business" ? 2 : 0, lastUsed: base.plan === "business" ? ts(-1) : null },
      },
      demo: true,
    };
  }
  const db = createSupabaseAdminClient();
  const { data: p } = await db
    .from("profiles")
    .select("id, email, plan, status, created_at, last_seen_at, referral_code, referral_credit_cents, stripe_customer_id")
    .eq("id", id)
    .single();
  if (!p) return { user: null, demo: false };

  const [{ data: usageRows }, { data: vers }, { data: pays }, { data: evs }, { data: sub }, { count: keyCount }, { data: lastKey }] =
    await Promise.all([
      db.from("usage").select("verifications_used, plan_quota").eq("user_id", id).order("period_start", { ascending: false }).limit(1),
      db.from("verifications").select("id, user_id, kind, rows_processed, quality_score, created_at").eq("user_id", id).order("created_at", { ascending: false }).limit(20),
      db.from("payments").select("id, user_id, amount, currency, status, created_at").eq("user_id", id).order("created_at", { ascending: false }).limit(20),
      db.from("events").select("id, user_id, email, type, metadata, created_at").eq("user_id", id).order("created_at", { ascending: false }).limit(20),
      db.from("subscriptions").select("id, user_id, plan, status, current_period_end").eq("user_id", id).order("created_at", { ascending: false }).limit(1).maybeSingle(),
      db.from("api_keys").select("*", { count: "exact", head: true }).eq("user_id", id).is("revoked_at", null),
      db.from("api_keys").select("last_used_at").eq("user_id", id).order("last_used_at", { ascending: false }).limit(1).maybeSingle(),
    ]);

  return {
    user: {
      id: p.id,
      email: p.email,
      plan: p.plan,
      status: p.status ?? "active",
      created_at: p.created_at,
      last_seen_at: p.last_seen_at ?? null,
      referral_code: p.referral_code,
      referral_credit_cents: p.referral_credit_cents ?? 0,
      stripe_customer_id: p.stripe_customer_id,
      usage: usageRows?.[0] ? { used: usageRows[0].verifications_used ?? 0, quota: usageRows[0].plan_quota ?? 0 } : null,
      subscription: (sub as AdminSub | null) ?? null,
      verifications: (vers as AdminVer[] | null) ?? [],
      payments: (pays as AdminPayment[] | null) ?? [],
      events: (evs as AdminEvent[] | null) ?? [],
      apiKeys: { count: keyCount ?? 0, lastUsed: (lastKey as any)?.last_used_at ?? null },
    },
    demo: false,
  };
}

/** All users for CSV export (capped). */
export async function getUsersForExport(): Promise<AdminUser[]> {
  if (!config.hasSupabaseAdmin()) return DEMO_USERS;
  const db = createSupabaseAdminClient();
  const { data } = await db
    .from("profiles")
    .select("id, email, plan, status, created_at, last_seen_at")
    .order("created_at", { ascending: false })
    .limit(5000);
  return (data as AdminUser[] | null) ?? [];
}

export async function getAdminPayments(): Promise<{ payments: AdminPayment[]; demo: boolean }> {
  if (!config.hasSupabaseAdmin()) return { payments: DEMO_PAYMENTS, demo: true };
  const db = createSupabaseAdminClient();
  const { data } = await db.from("payments").select("id, user_id, amount, currency, status, created_at").order("created_at", { ascending: false }).limit(200);
  return { payments: (data as AdminPayment[] | null) ?? [], demo: false };
}

export async function getAdminSubscriptions(status?: string): Promise<{ subs: AdminSub[]; demo: boolean }> {
  if (!config.hasSupabaseAdmin()) {
    const subs = status ? DEMO_SUBS.filter((s) => s.status === status) : DEMO_SUBS;
    return { subs, demo: true };
  }
  const db = createSupabaseAdminClient();
  let query = db.from("subscriptions").select("id, user_id, plan, status, current_period_end").order("created_at", { ascending: false }).limit(200);
  if (status) query = query.eq("status", status);
  const { data } = await query;
  return { subs: (data as AdminSub[] | null) ?? [], demo: false };
}

export async function getAdminVerifications(): Promise<{ vers: AdminVer[]; demo: boolean }> {
  if (!config.hasSupabaseAdmin()) return { vers: DEMO_VERS, demo: true };
  const db = createSupabaseAdminClient();
  const { data } = await db
    .from("verifications")
    .select("id, user_id, kind, rows_processed, quality_score, created_at")
    .order("created_at", { ascending: false })
    .limit(200);
  return { vers: (data as AdminVer[] | null) ?? [], demo: false };
}

export async function getAdminActivity(type?: string, limit = 100): Promise<{ events: AdminEvent[]; demo: boolean }> {
  if (!config.hasSupabaseAdmin()) {
    const events = type ? DEMO_EVENTS.filter((e) => e.type === type) : DEMO_EVENTS;
    return { events, demo: true };
  }
  const db = createSupabaseAdminClient();
  let query = db.from("events").select("id, user_id, email, type, metadata, created_at").order("created_at", { ascending: false }).limit(limit);
  if (type) query = query.eq("type", type);
  const { data } = await query;
  return { events: (data as AdminEvent[] | null) ?? [], demo: false };
}

export async function getAdminAudit(limit = 100): Promise<{ audit: AdminAudit[]; demo: boolean }> {
  if (!config.hasSupabaseAdmin()) return { audit: DEMO_AUDIT, demo: true };
  const db = createSupabaseAdminClient();
  const { data } = await db.from("admin_audit_log").select("id, admin_email, action, target_user_id, target_email, detail, created_at").order("created_at", { ascending: false }).limit(limit);
  return { audit: (data as AdminAudit[] | null) ?? [], demo: false };
}

/** Integration / configuration readiness — what is wired vs. still ready-for-keys. */
export function getSystemStatus(): IntegrationStatus[] {
  const adminEmails = (process.env.ADMIN_EMAILS ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  return [
    { key: "supabase", label: "Supabase Auth + DB", connected: config.hasSupabase(), note: config.hasSupabase() ? "Connected" : "Add NEXT_PUBLIC_SUPABASE_URL + anon key" },
    { key: "supabase_admin", label: "Supabase service role", connected: config.hasSupabaseAdmin(), note: config.hasSupabaseAdmin() ? "Live metrics enabled" : "Add SUPABASE_SERVICE_ROLE_KEY for live data" },
    { key: "stripe", label: "Stripe payments", connected: config.hasStripe(), note: config.hasStripe() ? "Checkout + portal live" : "Add STRIPE_SECRET_KEY" },
    { key: "stripe_webhook", label: "Stripe webhook", connected: config.hasStripeWebhook(), note: config.hasStripeWebhook() ? "Subscription sync live" : "Add STRIPE_WEBHOOK_SECRET" },
    { key: "zerobounce", label: "ZeroBounce (email)", connected: config.hasEmailApi(), note: config.hasEmailApi() ? "Real email verification" : "Mock mode — add ZEROBOUNCE_API_KEY" },
    { key: "numverify", label: "NumVerify (phone)", connected: config.hasPhoneApi(), note: config.hasPhoneApi() ? "Real phone validation" : "Mock mode — add NUMVERIFY_API_KEY" },
    { key: "smtp", label: "SMTP (email delivery)", connected: config.hasSmtp(), note: config.hasSmtp() ? "Lifecycle emails sending" : "Add SMTP_HOST / USER / PASS" },
    { key: "admins", label: "Admin allow-list", connected: adminEmails.length > 0, note: adminEmails.length ? `${adminEmails.length} admin email(s)` : "Set ADMIN_EMAILS" },
  ];
}
