import type { Metadata } from "next";
import { Pricing } from "@/components/marketing/Pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description: "One flat price. No credits, no surprises. Email + phone verification included.",
};

export default function PricingPage() {
  return <Pricing />;
}
