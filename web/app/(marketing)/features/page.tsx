import type { Metadata } from "next";
import { IndexHub } from "@/components/marketing/IndexHub";
import { FEATURES } from "@/lib/features";
import { pageMeta } from "@/lib/seo-meta";

export const metadata: Metadata = pageMeta({
  title: "Features",
  description: "Every check BounceBlock runs — catch-all resolution, disposable detection, line-type, HLR lookup, enrichment, bulk cleaning and more.",
  path: "/features",
});

export default function FeaturesHub() {
  return (
    <IndexHub
      eyebrow="Features"
      title="Every check, in one pass"
      intro="From catch-all resolution to HLR lookup to firmographic enrichment — explore the checks that make up BounceBlock's verification engine."
      columns={3}
      items={FEATURES.map((f) => ({ href: `/features/${f.slug}`, label: f.name, desc: f.tagline }))}
    />
  );
}
