import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/marketing/SectionHead";

const FEATURED = {
  quote:
    "We were burning two days a month scrubbing lists by hand. BounceBlock cut our bounce rate from 14% to under 2% on the first upload — and it caught dead phone numbers nothing else did.",
  name: "Maya Okafor",
  role: "Head of Sales Ops · Northwind Realty",
  initials: "MO",
  grad: "from-[#2EA94E] to-[#1B7FD4]",
};

const QUOTES = [
  { quote: "Flat price, no credit math. I clean a list, I download it. Finally.", name: "Diego Ramos", role: "Agency Owner · CloseRate", initials: "DR", grad: "from-[#D9764E] to-[#B04E2C]" },
  { quote: "The phone validation alone pays for it. Our dialer connect rate jumped 30%.", name: "Sarah Kline", role: "Recruiter · TalentForge", initials: "SK", grad: "from-[#6B8AD9] to-[#3C5BA8]" },
  { quote: "Uploaded 9,000 insurance leads, had a clean file in three minutes.", name: "Priya Tan", role: "Broker · Meridian Insurance", initials: "PT", grad: "from-[#9B7BD0] to-[#6B4BA0]" },
  { quote: "Simple enough for my whole team, secure enough for our compliance lead.", name: "James Bauer", role: "VP Revenue · Vantage Group", initials: "JB", grad: "from-[#43B14A] to-[#1E7E3A]" },
];

function Avatar({ initials, grad }: { initials: string; grad: string }) {
  return (
    <span className={`grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full bg-gradient-to-br text-[14px] font-semibold text-white ${grad}`}>
      {initials}
    </span>
  );
}

const Stars = () => <div className="text-[14px] tracking-[2px] text-brand">★★★★★</div>;

export function Testimonials() {
  return (
    <section className="py-20">
      <Container>
        <SectionHead eyebrow="Loved by sales teams" title="Real teams. Real bounce rates, fixed." />
        <div className="grid items-start gap-4 md:grid-cols-3">
          <figure className="flex flex-col rounded-[22px] border border-hair bg-raised p-7 shadow-s2 md:row-span-2">
            <Stars />
            <blockquote className="mt-3.5 font-serif text-[25px] leading-[1.42] text-ink">“{FEATURED.quote}”</blockquote>
            <figcaption className="mt-auto flex items-center gap-3 pt-5">
              <Avatar initials={FEATURED.initials} grad={FEATURED.grad} />
              <span>
                <b className="text-[14px]">{FEATURED.name}</b>
                <span className="block text-[12.6px] text-ink-3">{FEATURED.role}</span>
              </span>
            </figcaption>
          </figure>
          {QUOTES.map((q) => (
            <figure key={q.name} className="rounded-[22px] border border-hair bg-raised p-6 shadow-s2">
              <Stars />
              <blockquote className="mt-3 font-serif text-[17px] leading-[1.42] text-ink">“{q.quote}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <Avatar initials={q.initials} grad={q.grad} />
                <span>
                  <b className="text-[14px]">{q.name}</b>
                  <span className="block text-[12.6px] text-ink-3">{q.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
