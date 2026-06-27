import Stripe from "stripe";

let client: Stripe | null = null;

/**
 * Lazily-created server-side Stripe client. Single shared "Leswang Technology"
 * account; BounceBlock is one Product with the plan prices in lib/plans.ts.
 * Lazy init avoids throwing at build time when STRIPE_SECRET_KEY isn't set yet.
 */
export function getStripe(): Stripe {
  if (!client) {
    client = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
      appInfo: { name: "BounceBlock", url: "https://bounceblock.io" },
      typescript: true,
    });
  }
  return client;
}
