import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/brand/Logo";
import { NewsletterForm } from "@/components/marketing/NewsletterForm";
import { FOOTER, SITE } from "@/lib/constants";

/** Marketing site footer with sitemap, status and compliance pills. */
export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-hair py-14">
      <Container>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-[1.5fr_repeat(4,1fr)]">
          <div>
            <Logo />
            <p className="mt-3.5 max-w-[250px] text-sm text-ink-2">
              Clean leads in. Higher conversions out. A product of {SITE.legalName}.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-hair bg-raised px-3 py-1.5 text-[13px] text-ink-2">
              <span className="h-2 w-2 rounded-full bg-brand" />
              All systems operational
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {["AES-256", "GDPR", "CCPA"].map((b) => (
                <span
                  key={b}
                  className="rounded-md border border-hair px-2.5 py-1.5 text-xs font-medium text-ink-2"
                >
                  {b}
                </span>
              ))}
            </div>
            <p className="mb-2 mt-6 text-[12.5px] font-semibold uppercase tracking-wide text-ink-3">
              Deliverability tips, monthly
            </p>
            <NewsletterForm />
          </div>
          {Object.entries(FOOTER).map(([group, links]) => (
            <div key={group}>
              <h4 className="mb-3.5 font-sans text-[12.5px] font-semibold uppercase tracking-wider text-ink-3">
                {group}
              </h4>
              {links.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="mb-2.5 block text-sm text-ink-2 transition-colors hover:text-ink"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-11 flex flex-wrap items-center justify-between gap-3 border-t border-hair pt-6 text-[13px] text-ink-3">
          <span>© 2026 {SITE.legalName} · {SITE.domain}</span>
          <span className="uppercase tracking-wide">Clean leads. Higher conversions.</span>
        </div>
      </Container>
    </footer>
  );
}
