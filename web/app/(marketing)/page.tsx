import { Hero } from "@/components/marketing/Hero";
import { LogoMarquee } from "@/components/marketing/LogoMarquee";
import { StatsBand } from "@/components/marketing/StatsBand";
import { ValueMoment } from "@/components/marketing/ValueMoment";
import { Features } from "@/components/marketing/Features";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { Testimonials } from "@/components/marketing/Testimonials";
import { Comparison } from "@/components/marketing/Comparison";
import { Pricing } from "@/components/marketing/Pricing";
import { Faq } from "@/components/marketing/Faq";
import { FinalCta } from "@/components/marketing/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <StatsBand />
      <ValueMoment />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Comparison />
      <Pricing />
      <Faq />
      <FinalCta />
    </>
  );
}
