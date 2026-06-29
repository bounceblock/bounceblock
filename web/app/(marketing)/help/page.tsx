import type { Metadata } from "next";
import { IndexHub } from "@/components/marketing/IndexHub";
import { pageMeta } from "@/lib/seo-meta";

export const metadata: Metadata = pageMeta({
  title: "Help Center",
  description: "Guides, tools, API docs and answers for verifying email, phone and company data with BounceBlock.",
  path: "/help",
});

export default function HelpPage() {
  return (
    <IndexHub
      eyebrow="Help center"
      title="How can we help?"
      intro="Everything you need to get clean data out of BounceBlock — start with the guides and free tools, dig into the API, or reach a human."
      columns={3}
      items={[
        { href: "/blog", label: "Guides & articles", desc: "Deliverability, list hygiene, phone validation and more." },
        { href: "/glossary", label: "Glossary", desc: "Plain-English definitions of every term." },
        { href: "/tools", label: "Free tools", desc: "Verify an email, validate a phone, check SPF/DKIM/DMARC." },
        { href: "/api-docs", label: "API docs", desc: "Verify email and phone in real time from your code." },
        { href: "/product", label: "Product overview", desc: "What BounceBlock does, end to end." },
        { href: "/pricing", label: "Pricing & plans", desc: "Flat monthly pricing — what each plan includes." },
        { href: "/security", label: "Security", desc: "Encryption, 24-hour deletion and data handling." },
        { href: "/trust", label: "Trust center", desc: "Compliance, sub-processors and data practices." },
        { href: "/contact", label: "Contact support", desc: "Reach a human — we reply fast." },
      ]}
    />
  );
}
