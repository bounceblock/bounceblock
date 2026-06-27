import { config } from "@/lib/config";

export const REFERRAL_CREDIT_USD = 10;

/** The shareable signup link that credits the referrer. */
export function referralUrl(code: string) {
  return `${config.siteUrl()}/signup?ref=${code}`;
}
