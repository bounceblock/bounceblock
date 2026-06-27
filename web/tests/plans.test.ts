import { test } from "node:test";
import assert from "node:assert/strict";
import { quotaForPlan, priceIdForPlan, planForPriceId } from "../lib/plans";

test("quotaForPlan returns each plan's monthly allowance", () => {
  assert.equal(quotaForPlan("free"), 100);
  assert.equal(quotaForPlan("starter"), 2500);
  assert.equal(quotaForPlan("pro"), 5000);
  assert.equal(quotaForPlan("business"), 25000);
});

test("priceIdForPlan is undefined when env not set", () => {
  delete process.env.STRIPE_PRICE_PRO_MONTHLY;
  assert.equal(priceIdForPlan("pro"), undefined);
  assert.equal(priceIdForPlan("free"), undefined); // free has no price env
});

test("planForPriceId maps a configured price id back to its plan", () => {
  process.env.STRIPE_PRICE_PRO_MONTHLY = "price_test_pro";
  assert.equal(planForPriceId("price_test_pro"), "pro");
  assert.equal(planForPriceId("price_unknown"), undefined);
});
