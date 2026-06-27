import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/marketing/PageHero";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";
import { submitContact } from "./actions";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the BounceBlock team.",
};

const CONTACTS = [
  ["Support", SITE.email.support],
  ["Billing", SITE.email.billing],
  ["Privacy", SITE.email.privacy],
  ["Security", SITE.email.security],
];

export default function ContactPage({ searchParams }: { searchParams: { sent?: string; error?: string } }) {
  return (
    <>
      <PageHero eyebrow="Contact" title="Talk to us" sub="Questions about cleaning a list, billing or security? We're happy to help." />
      <Container className="max-w-2xl py-16">
        {searchParams.sent && (
          <p className="mb-6 rounded-md border border-brand/30 bg-brand-wash/60 px-4 py-3 text-[14px] text-brand-deep">
            Thanks — we got your message and will reply soon.
          </p>
        )}
        {searchParams.error && (
          <p className="mb-6 rounded-md border border-invalid/30 bg-invalid/5 px-4 py-3 text-[14px] text-invalid">
            Please add your email and a message.
          </p>
        )}

        <form action={submitContact} className="grid gap-4 rounded-2xl border border-hair bg-raised p-7 shadow-s1">
          <label className="grid gap-1.5">
            <span className="text-[13px] font-medium text-ink-2">Name</span>
            <input name="name" type="text" placeholder="Jane Doe" autoComplete="name"
              className="rounded-md border border-hair bg-canvas px-3.5 py-2.5 text-[15px] outline-none transition focus:border-brand focus:ring-4 focus:ring-brand-wash" />
          </label>
          <label className="grid gap-1.5">
            <span className="text-[13px] font-medium text-ink-2">Email</span>
            <input name="email" type="email" required placeholder="you@company.com" autoComplete="email"
              className="rounded-md border border-hair bg-canvas px-3.5 py-2.5 text-[15px] outline-none transition focus:border-brand focus:ring-4 focus:ring-brand-wash" />
          </label>
          <label className="grid gap-1.5">
            <span className="text-[13px] font-medium text-ink-2">Message</span>
            <textarea name="message" required rows={5} placeholder="How can we help?"
              className="resize-y rounded-md border border-hair bg-canvas px-3.5 py-2.5 text-[15px] outline-none transition focus:border-brand focus:ring-4 focus:ring-brand-wash" />
          </label>
          <Button type="submit" className="justify-self-start">Send message</Button>
        </form>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {CONTACTS.map(([label, mail]) => (
            <a key={label} href={`mailto:${mail}`} className="rounded-xl border border-hair bg-raised p-4 shadow-s1 transition-colors hover:border-brand">
              <div className="text-[12px] font-semibold uppercase tracking-wide text-ink-3">{label}</div>
              <div className="mt-0.5 text-[14.5px] text-brand-deep">{mail}</div>
            </a>
          ))}
        </div>
      </Container>
    </>
  );
}
