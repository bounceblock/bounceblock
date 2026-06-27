import { test } from "node:test";
import assert from "node:assert/strict";
import { rateLimit } from "../lib/rate-limit";

test("rateLimit allows up to the limit, then blocks", () => {
  const key = `unit-${process.hrtime.bigint()}`;
  for (let i = 0; i < 5; i++) {
    assert.equal(rateLimit(key, 5, 60_000).ok, true, `request ${i + 1} should pass`);
  }
  assert.equal(rateLimit(key, 5, 60_000).ok, false, "6th request should be blocked");
});

test("rateLimit tracks separate keys independently", () => {
  const a = `a-${process.hrtime.bigint()}`;
  const b = `b-${process.hrtime.bigint()}`;
  assert.equal(rateLimit(a, 1, 60_000).ok, true);
  assert.equal(rateLimit(a, 1, 60_000).ok, false);
  assert.equal(rateLimit(b, 1, 60_000).ok, true); // different key still allowed
});
