import type { Metadata } from "next";
import { IndexHub } from "@/components/marketing/IndexHub";
import { PRODUCTS } from "@/lib/products";
import { pageMeta } from "@/lib/seo-meta";

export const metadata: Metadata = pageMeta({
  title: "Product — Email, Phone & Company Verification",
  description: "Everything BounceBlock does: email verification, bulk cleaning, phone validation, company enrichment, the API, Form Guard and more.",
  path: "/product",
});

export default function ProductHub() {
  return (
    <IndexHub
      eyebrow="Product"
      title="One platform for clean contact data"
      intro="Verify email, validate phone and check company data — in bulk, in real time, or via the API. Explore everything BounceBlock does."
      columns={2}
      items={PRODUCTS.map((p) => ({ href: `/product/${p.slug}`, label: p.name, desc: p.intro.slice(0, 110) + "…" }))}
    />
  );
}
