import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/marketing/SectionHead";

const STEPS = [
  ["1", "Upload your CSV", "Drag in any contact list. We auto-detect email, phone, name and company columns."],
  ["2", "We verify everything", "Every email checked for deliverability, every phone validated, duplicates flagged — with a live quality score."],
  ["3", "Download clean leads", "Export a verified, deduplicated list your team can actually call and email."],
];

export function HowItWorks() {
  return (
    <section id="how" className="py-20">
      <Container>
        <SectionHead
          eyebrow="How it works"
          title="Clean leads in three steps"
          sub="No setup, no integrations, no learning curve. Upload a file, download a better one."
        />
        <div className="relative grid gap-6 md:grid-cols-3">
          <div className="absolute left-[16%] right-[16%] top-[27px] hidden h-0.5 bg-[repeating-linear-gradient(90deg,var(--hair)_0_7px,transparent_7px_14px)] md:block" />
          {STEPS.map(([n, t, d]) => (
            <div key={n} className="relative text-center">
              <div className="mx-auto grid h-[54px] w-[54px] place-items-center rounded-2xl border border-hair bg-raised font-serif text-[22px] font-semibold text-brand-deep shadow-s2">
                {n}
              </div>
              <h3 className="mt-5 font-serif text-xl">{t}</h3>
              <p className="mx-auto mt-2 max-w-[300px] text-[15px] text-ink-2">{d}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
