/**
 * Pricing plans. Flat monthly subscriptions with a monthly verification
 * allowance (NOT literally unlimited — guarded to protect API unit economics).
 * `stripePriceEnv` maps to the price ID env var created in the Stripe dashboard.
 */
export type PlanId = "free" | "starter" | "pro" | "business";

export interface Plan {
  id: PlanId;
  name: string;
  priceMonthly: number;
  priceAnnualPerMonth: number; // billed yearly, ~2 months free
  quota: number; // verifications / month
  blurb: string;
  features: string[];
  popular?: boolean;
  stripePriceEnv?: string;
}

/** Resolve the Stripe price id for a plan from its env var (set in the dashboard). */
export function priceIdForPlan(id: PlanId): string | undefined {
  const plan = PLANS.find((p) => p.id === id);
  if (!plan?.stripePriceEnv) return undefined;
  return process.env[plan.stripePriceEnv];
}

/** Reverse lookup: which plan does a Stripe price id belong to? (used by the webhook). */
export function planForPriceId(priceId: string): PlanId | undefined {
  for (const p of PLANS) {
    if (p.stripePriceEnv && process.env[p.stripePriceEnv] === priceId) return p.id;
  }
  return undefined;
}

/** Monthly verification allowance for a plan (the flat soft cap). */
export function quotaForPlan(id: PlanId): number {
  return PLANS.find((p) => p.id === id)?.quota ?? 100;
}

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    priceMonthly: 0,
    priceAnnualPerMonth: 0,
    quota: 100,
    blurb: "Try it on a real list, free.",
    features: ["Email + phone preview", "Quality score", "7-day history"],
  },
  {
    id: "starter",
    name: "Starter",
    priceMonthly: 19,
    priceAnnualPerMonth: 16,
    quota: 2500,
    blurb: "For freelancers and small agencies.",
    features: ["Full list downloads", "Email + phone validation", "30-day history"],
    stripePriceEnv: "STRIPE_PRICE_STARTER_MONTHLY",
  },
  {
    id: "pro",
    name: "Pro",
    priceMonthly: 29,
    priceAnnualPerMonth: 24,
    quota: 5000,
    blurb: "For small sales teams.",
    features: ["Everything in Starter", "Priority support", "90-day history"],
    popular: true,
    stripePriceEnv: "STRIPE_PRICE_PRO_MONTHLY",
  },
  {
    id: "business",
    name: "Business",
    priceMonthly: 79,
    priceAnnualPerMonth: 66,
    quota: 25000,
    blurb: "For agencies and mid-size teams.",
    features: ["API access", "5 team members", "1-year history"],
    stripePriceEnv: "STRIPE_PRICE_BUSINESS_MONTHLY",
  },
];
