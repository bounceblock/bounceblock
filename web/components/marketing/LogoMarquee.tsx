import { Container } from "@/components/ui/Container";

const BRANDS = [
  "Brightside Realty", "Meridian Insurance", "TalentForge", "Harbor & Co",
  "Northwind", "CloseRate", "Vantage Group", "PeakLeads",
];

const edgeMask = {
  WebkitMaskImage: "linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent)",
  maskImage: "linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent)",
} as const;

/** Auto-scrolling, monochrome customer logo wall. */
export function LogoMarquee() {
  const row = [...BRANDS, ...BRANDS];
  return (
    <div className="py-12 text-center">
      <Container>
        <p className="mb-6 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-3">
          Teams that stopped chasing dead leads
        </p>
        <div className="overflow-hidden" style={edgeMask}>
          <div className="flex w-max animate-marquee gap-14">
            {row.map((b, i) => (
              <span
                key={i}
                className="whitespace-nowrap font-serif text-[22px] font-semibold tracking-tight text-ink-3 opacity-60"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
