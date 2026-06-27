import { test } from "node:test";
import assert from "node:assert/strict";
import { mockEmail, mockPhone } from "../lib/verification/mock";
import { runFull } from "../lib/verification/process";

test("mockEmail flags typos as invalid", () => {
  const r = mockEmail("j.diaz@gmial.com");
  assert.equal(r.status, "invalid");
  assert.equal(r.subStatus, "possible_typo");
});

test("mockEmail flags role accounts as catch-all", () => {
  assert.equal(mockEmail("info@acme.com").status, "catch-all");
});

test("mockEmail flags syntax errors as invalid", () => {
  assert.equal(mockEmail("not-an-email").status, "invalid");
});

test("mockPhone returns a known line type for a normal number", () => {
  const r = mockPhone("+1 (415) 555-0182");
  assert.ok(["mobile", "landline", "voip", "unknown"].includes(r.lineType));
});

test("mockPhone rejects too-short numbers", () => {
  assert.equal(mockPhone("123").valid, false);
});

test("runFull dedupes and drops invalids from the clean CSV", async () => {
  const rows = [
    { email: "amanda@realty-group.com" },
    { email: "amanda@realty-group.com" }, // duplicate
    { email: "bad@gmial.com" }, // typo -> invalid
  ];
  const { stats, cleanCsv } = await runFull(rows, { email: "email" });
  const amandaCount = (cleanCsv.match(/amanda@realty-group\.com/g) || []).length;

  assert.equal(stats.analyzed, 3);
  assert.equal(stats.duplicates, 1);
  assert.ok(!cleanCsv.includes("gmial"), "typo'd email should be removed");
  assert.ok(amandaCount <= 1, "duplicate should be removed");
});
