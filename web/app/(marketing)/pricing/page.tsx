import type { Metadata } from "next";
import { Pricing } from "@/components/marketing/Pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description: "One flat price. No credits, no surprises. Email + phone verification included.",
};

export default function PricingPage() {
  // headingAs="h1" so the dedicated pricing page has a proper top-level <h1>
  // (used as a homepage section, <Pricing> stays h2).
  return <Pricing headingAs="h1" />;
}
