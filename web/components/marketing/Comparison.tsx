import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/marketing/SectionHead";

const ROWS: [string, string, string, string][] = [
  ["Email verification", "yes", "yes", "Manual"],
  ["Phone validation", "yes", "no", "no"],
  ["Duplicate removal", "yes", "Sometimes", "Manual"],
  ["Flat monthly price", "yes", "Pay-per-credit", "—"],
  ["No credit card to start", "yes", "Varies", "—"],
  ["Quality score", "yes", "Rarely", "no"],
  ["Clean file in under 2 min", "yes", "yes", "Hours"],
];

function Cell({ v, us }: { v: string; us?: boolean }) {
  if (v === "yes") return <span className={us ? "font-semibold text-brand" : "text-brand"}>✓</span>;
  if (v === "no") return <span className="text-ink-3 opacity-60">✕</span>;
  return <span className="text-ink-3">{v}</span>;
}

export function Comparison() {
  return (
    <section id="compare" className="py-20">
      <Container>
        <SectionHead eyebrow="Why BounceBlock" title="One tool that does what three can't" />
        <div className="overflow-hidden rounded-[28px] border border-hair bg-raised shadow-s2" data-reveal="scale">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse">
              <thead>
                <tr className="border-b border-hair">
                  <th className="px-5 py-4" />
                  <th className="bg-brand-wash/50 px-5 py-4 text-center font-serif text-[17px] font-semibold text-brand-deep">BounceBlock</th>
                  <th className="px-5 py-4 text-center font-serif text-[17px] font-semibold text-ink-3">Email-only verifiers</th>
                  <th className="px-5 py-4 text-center font-serif text-[17px] font-semibold text-ink-3">Spreadsheets</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map(([label, a, b, c], i) => (
                  <tr key={label} className={i < ROWS.length - 1 ? "border-b border-hair" : ""}>
                    <td className="px-5 py-4 text-[14px] font-medium text-ink-2">{label}</td>
                    <td className="bg-brand-wash/40 px-5 py-4 text-center text-[15px]"><Cell v={a} us /></td>
                    <td className="px-5 py-4 text-center text-[14px]"><Cell v={b} /></td>
                    <td className="px-5 py-4 text-center text-[14px]"><Cell v={c} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </section>
  );
}
