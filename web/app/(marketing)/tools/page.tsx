import type { Metadata } from "next";
import { IndexHub } from "@/components/marketing/IndexHub";
import { TOOLS } from "@/lib/tools";
import { pageMeta } from "@/lib/seo-meta";

export const metadata: Metadata = pageMeta({
  title: "Free Email & Phone Tools",
  description: "Free tools to verify emails, validate phones, check MX/SPF/DKIM/DMARC records, test subject lines and calculate bounce rate.",
  path: "/tools",
});

export default function ToolsHub() {
  // Lead with the all-in-one deliverability test (the flagship, no-login tool).
  const ordered = [...TOOLS].sort((a, b) =>
    a.slug === "email-deliverability-test" ? -1 : b.slug === "email-deliverability-test" ? 1 : 0
  );
  return (
    <IndexHub
      eyebrow="Free tools"
      title="Free email & deliverability tools"
      intro="38 quick, free checks, calculators and generators for email, phone and deliverability — verify addresses, generate SPF/DKIM/DMARC records, scan reputation, score a list, calculate open rate, ROI and bounce risk. No signup needed. When you're ready to clean a whole list, upload it to BounceBlock and preview the first 100 rows free."
      columns={2}
      items={ordered.map((t) => ({ href: `/tools/${t.slug}`, label: t.name, desc: t.tagline }))}
    />
  );
}
