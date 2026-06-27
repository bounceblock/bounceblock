import type { EmailResult, EmailStatus, EmailVerifier } from "./types";

/**
 * ZeroBounce email verifier.
 * NOTE (Phase 2): real network call + response mapping is wired in Phase 2.
 * This Phase-1 stub establishes the interface and request shape only.
 */
export class ZeroBounceVerifier implements EmailVerifier {
  readonly name = "zerobounce";

  constructor(private apiKey = process.env.ZEROBOUNCE_API_KEY ?? "") {}

  async verifyEmail(email: string): Promise<EmailResult> {
    if (!this.apiKey) {
      // Phase 1: no key configured yet — return an honest "unknown".
      return { email, status: "unknown", subStatus: "not_configured" };
    }

    const url = `https://api.zerobounce.net/v2/validate?api_key=${this.apiKey}&email=${encodeURIComponent(
      email
    )}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`ZeroBounce error: ${res.status}`);
    const data = (await res.json()) as {
      status: string;
      sub_status?: string;
      did_you_mean?: string;
    };

    return {
      email,
      status: mapStatus(data.status),
      subStatus: data.sub_status || undefined,
      didYouMean: data.did_you_mean || undefined,
    };
  }
}

function mapStatus(s: string): EmailStatus {
  switch (s) {
    case "valid":
      return "valid";
    case "invalid":
      return "invalid";
    case "catch-all":
      return "catch-all";
    default:
      return "unknown"; // spamtrap, abuse, do_not_mail, unknown
  }
}
