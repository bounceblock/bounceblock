import type { Metadata } from "next";
import { IndexHub } from "@/components/marketing/IndexHub";
import { GLOSSARY } from "@/lib/glossary";
import { pageMeta } from "@/lib/seo-meta";

export const metadata: Metadata = pageMeta({
  title: "Email & Deliverability Glossary",
  description: "Plain-English definitions of email verification, phone validation, deliverability and data terms — from catch-all to DMARC to HLR lookup.",
  path: "/glossary",
});

export default function GlossaryHub() {
  return (
    <IndexHub
      eyebrow="Glossary"
      title="The email & data verification glossary"
      intro="Plain-English definitions for everything in email verification, phone validation, deliverability and contact data. Pick a term to learn what it means and what to do about it."
      columns={3}
      items={GLOSSARY.map((t) => ({ href: `/glossary/${t.slug}`, label: t.term, desc: t.short }))}
    />
  );
}
