import { test } from "node:test";
import assert from "node:assert/strict";
import {
  getAdminKpis,
  getAdminUsers,
  getAdminUser,
  getAdminActivity,
  getAdminAudit,
  getAdminSubscriptions,
  getSystemStatus,
} from "../lib/admin-data";
import { logEvent, EVENT_LABELS } from "../lib/events";
import { logAdminAction, ACTION_LABELS } from "../lib/admin-audit";

// All of these run in demo mode (no SUPABASE_SERVICE_ROLE_KEY in the test env),
// which is exactly the ready-for-keys path the app ships in until creds arrive.

test("getAdminKpis: demo KPIs are internally consistent", async () => {
  const { kpis, series, demo } = await getAdminKpis();
  assert.equal(demo, true);
  assert.equal(series.length, 14, "overview chart needs 14 days");
  // plan distribution sums to the total user count
  const sum = kpis.byPlan.free + kpis.byPlan.starter + kpis.byPlan.pro + kpis.byPlan.business;
  assert.equal(sum, kpis.totalUsers);
  assert.equal(kpis.paidUsers, kpis.totalUsers - kpis.freeUsers);
  assert.equal(kpis.arr, kpis.mrr * 12);
  assert.ok(kpis.mrr > 0 && kpis.arpu > 0);
});

test("getAdminUsers: plan filter narrows results", async () => {
  const all = await getAdminUsers();
  assert.equal(all.demo, true);
  assert.equal(all.pageSize, 20);
  assert.equal(all.total, all.users.length); // demo set fits one page
  const pro = await getAdminUsers({ plan: "pro" });
  assert.ok(pro.users.length > 0);
  assert.ok(pro.users.every((u) => u.plan === "pro"));
});

test("getAdminUsers: status filter finds suspended accounts", async () => {
  const suspended = await getAdminUsers({ status: "suspended" });
  assert.ok(suspended.users.every((u) => u.status === "suspended"));
});

test("getAdminUser: returns a detail bundle for the requested id", async () => {
  const { user } = await getAdminUser("3");
  assert.ok(user);
  assert.equal(user!.id, "3");
  assert.ok(Array.isArray(user!.verifications));
  assert.ok(Array.isArray(user!.payments));
  assert.ok(Array.isArray(user!.events));
  assert.ok(user!.apiKeys);
});

test("getAdminActivity: type filter only returns that event type", async () => {
  const { events } = await getAdminActivity("signup");
  assert.ok(events.every((e) => e.type === "signup"));
});

test("getAdminSubscriptions: status filter works", async () => {
  const past = await getAdminSubscriptions("past_due");
  assert.ok(past.subs.every((s) => s.status === "past_due"));
});

test("getAdminAudit: returns demo audit entries", async () => {
  const { audit, demo } = await getAdminAudit();
  assert.equal(demo, true);
  assert.ok(audit.length > 0);
  assert.ok(audit.every((a) => a.admin_email && a.action));
});

test("getSystemStatus: reports every integration with a boolean", async () => {
  const s = getSystemStatus();
  assert.equal(s.length, 8);
  assert.ok(s.every((i) => typeof i.connected === "boolean" && i.label && i.note));
  // No service role in the test env → live-data integration shows disconnected.
  assert.equal(s.find((i) => i.key === "supabase_admin")!.connected, false);
});

test("logEvent / logAdminAction are safe no-ops without the service role", async () => {
  // Must never throw — logging is always best-effort.
  await assert.doesNotReject(logEvent("login", { userId: "x", email: "a@b.co" }));
  await assert.doesNotReject(logAdminAction("change_plan", { targetUserId: "x", detail: { from: "free", to: "pro" } }));
});

test("label maps cover the documented event/action keys", () => {
  for (const k of ["signup", "login", "verify_full", "payment", "plan_change", "quota_exceeded"]) {
    assert.ok(EVENT_LABELS[k as keyof typeof EVENT_LABELS], `missing label for ${k}`);
  }
  for (const k of ["change_plan", "grant_credit", "suspend", "reactivate", "reset_usage"]) {
    assert.ok(ACTION_LABELS[k as keyof typeof ACTION_LABELS], `missing label for ${k}`);
  }
});
