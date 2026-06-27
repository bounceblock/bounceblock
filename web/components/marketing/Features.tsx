import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/marketing/SectionHead";

function Icon({ d }: { d: string }) {
  return (
    <span className="grid h-[46px] w-[46px] place-items-center rounded-[13px] bg-brand-wash text-brand-deep">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d={d} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

const badge = (cls: string, label: string) => (
  <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${cls}`}>{label}</span>
);

export function Features() {
  return (
    <section id="features" className="py-20">
      <Container>
        <SectionHead
          eyebrow="Everything in one tool"
          title="Email and phone — cleaned in one pass"
          sub="Most tools verify your emails and stop there. BounceBlock validates phones in the same upload, for one flat price."
        />
        <div className="grid auto-rows-[190px] grid-cols-1 gap-4 md:grid-cols-6">
          {/* big: email */}
          <div className="rounded-[22px] border border-hair bg-raised p-7 shadow-s2 md:col-span-4 md:row-span-2">
            <Icon d="M3 6.5h18v11H3zM4 8l8 5 8-5" />
            <h3 className="mt-4 font-serif text-xl">Email verification</h3>
            <p className="mt-1.5 text-[14px] text-ink-2">
              Syntax, domain, MX and live mailbox checks catch hard bounces before they ever touch your sender score.
            </p>
            <div className="mt-4 grid gap-2">
              {[
                ["amanda.cole@realty-group.com", badge("bg-valid/12 text-valid", "Valid")],
                ["j.diaz@gmial.com", badge("bg-invalid/12 text-invalid", "Invalid · typo")],
                ["contact@startup.io", badge("bg-unknown/15 text-[#A9761B]", "Catch-all")],
              ].map(([em, b], i) => (
                <div key={i} className="flex items-center gap-3 rounded-[11px] border border-hair bg-canvas px-3 py-2.5 text-[13px]">
                  <span className="flex-1 truncate text-ink-2">{em as string}</span>
                  {b}
                </div>
              ))}
            </div>
          </div>
          {/* tall: phone */}
          <div className="relative rounded-[22px] border border-hair bg-raised p-7 shadow-s2 md:col-span-2 md:row-span-2">
            <Icon d="M6 3h4l2 5-3 2a12 12 0 005 5l2-3 5 2v4a2 2 0 01-2 2A16 16 0 014 6a2 2 0 012-3z" />
            <h3 className="mt-4 font-serif text-xl">Phone validation</h3>
            <p className="mt-1.5 text-[14px] text-ink-2">
              Confirm numbers are live with line type &amp; carrier — the feature email-only tools don&rsquo;t have.
            </p>
            <div className="absolute inset-x-7 bottom-7">
              <div className="flex items-center gap-3 rounded-[11px] border border-hair bg-canvas px-3 py-2.5 text-[13px]">
                <span className="flex-1 text-ink-2">+1 (415) 555-0182</span>
                {badge("bg-valid/12 text-valid", "Mobile")}
              </div>
            </div>
          </div>
          {/* dedupe */}
          <div className="rounded-[22px] border border-hair bg-raised p-7 shadow-s2 md:col-span-2">
            <Icon d="M4 4h11v11H4zM9 9h11v11H9z" />
            <h3 className="mt-4 font-serif text-[19px]">Duplicate removal</h3>
            <p className="mt-1 text-[13.5px] text-ink-2">Hash-based matching finds dupes even when formatting differs.</p>
          </div>
          {/* score */}
          <div className="rounded-[22px] border border-hair bg-raised p-7 shadow-s2 md:col-span-2">
            <Icon d="M4 19V5m0 14h16M8 16V9m4 7V6m4 10v-4" />
            <h3 className="mt-4 font-serif text-[19px]">Quality score</h3>
            <p className="mt-1 text-[13.5px] text-ink-2">One number, 0–100, tells you how healthy a list is.</p>
          </div>
          {/* security */}
          <div className="rounded-[22px] border border-hair bg-raised p-7 shadow-s2 md:col-span-2">
            <Icon d="M5 11h14v9H5zM8 11V8a4 4 0 018 0v3" />
            <h3 className="mt-4 font-serif text-[19px]">Bank-grade security</h3>
            <p className="mt-1 text-[13.5px] text-ink-2">AES-256, auto-deleted in 24h. Your data is never sold.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
