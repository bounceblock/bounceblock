import type { Metadata } from "next";
import { IndexHub } from "@/components/marketing/IndexHub";
import { COUNTRIES } from "@/lib/countries";
import { pageMeta } from "@/lib/seo-meta";

export const metadata: Metadata = pageMeta({
  title: "Phone Number Validation by Country",
  description: "Validate phone numbers in 30+ countries — line type, carrier and active status — bundled with email and company verification at one flat price.",
  path: "/phone-validation",
});

export default function PhoneValidationHub() {
  return (
    <IndexHub
      eyebrow="Phone validation"
      title="Phone number validation, country by country"
      intro="Check line type, carrier and active status for numbers anywhere — in the same upload as your email and company verification. Pick a country to see what we validate."
      columns={3}
      items={COUNTRIES.map((c) => ({
        href: `/phone-validation/${c.slug}`,
        label: c.name,
        desc: `Validate ${c.dial} numbers — line type, carrier, status.`,
      }))}
    />
  );
}
