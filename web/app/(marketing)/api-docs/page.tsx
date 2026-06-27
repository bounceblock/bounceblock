import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/marketing/PageHero";

export const metadata: Metadata = {
  title: "API Docs",
  description: "Verify emails and phone numbers programmatically with the BounceBlock API.",
};

const REQUEST = `curl https://api.bounceblock.io/v1/verify \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "amanda.cole@realty-group.com",
    "phone": "+1 (415) 555-0182"
  }'`;

const RESPONSE = `{
  "email": {
    "status": "valid",
    "sub_status": null,
    "did_you_mean": null
  },
  "phone": {
    "valid": true,
    "line_type": "mobile",
    "carrier": "Verizon"
  },
  "quality_score": 96
}`;

function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-hair bg-sunk/60 p-5 text-[13px] leading-relaxed text-ink">
      <code className="font-mono">{children}</code>
    </pre>
  );
}

export default function ApiDocsPage() {
  return (
    <>
      <PageHero
        eyebrow="API"
        title="Verify at the point of capture"
        sub="The BounceBlock API verifies an email and phone in one call — perfect for cleaning data as it enters your stack. Available on the Business plan."
      />
      <Container className="max-w-3xl py-16">
        <section>
          <h2 className="font-serif text-2xl">Authentication</h2>
          <p className="mt-3 text-[15.5px] text-ink-2">
            Authenticate with a Bearer token. Generate an API key from your dashboard on the Business plan.
          </p>
          <div className="mt-4">
            <Code>{`Authorization: Bearer YOUR_API_KEY`}</Code>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-2xl">Verify a contact</h2>
          <p className="mt-2 text-[13.5px] font-medium text-ink-3">POST /v1/verify</p>
          <p className="mt-3 text-[15.5px] text-ink-2">Pass an <code>email</code>, a <code>phone</code>, or both.</p>
          <div className="mt-4">
            <Code>{REQUEST}</Code>
          </div>
          <h3 className="mt-6 text-[15px] font-semibold">Response</h3>
          <div className="mt-2">
            <Code>{RESPONSE}</Code>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-2xl">Status values</h2>
          <ul className="mt-3 grid gap-2 text-[15px] text-ink-2">
            {[
              ["valid", "Mailbox exists and can receive email."],
              ["invalid", "Doesn't exist, wrong domain, or a typo — will bounce."],
              ["catch-all", "Domain accepts all mail; the specific mailbox can't be confirmed."],
              ["unknown", "The mail server didn't give a clear answer."],
            ].map(([s, d]) => (
              <li key={s} className="flex gap-3">
                <code className="shrink-0 rounded bg-sunk px-1.5 py-0.5 text-[13px] font-semibold text-brand-deep">{s}</code>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-brand/25 bg-brand-wash/50 px-6 py-5">
          <div>
            <b className="text-[15px]">Get an API key</b>
            <span className="block text-[13px] text-ink-2">API access is included on the Business plan.</span>
          </div>
          <Link href="/pricing" className="rounded-full bg-brand px-5 py-2.5 text-[14px] font-semibold text-white shadow-glow">
            See Business plan
          </Link>
        </div>
      </Container>
    </>
  );
}
