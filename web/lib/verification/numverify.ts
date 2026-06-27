import type { PhoneLineType, PhoneResult, PhoneVerifier } from "./types";

/**
 * NumVerify phone validator.
 * NOTE (Phase 2): real network call + response mapping is wired in Phase 2.
 * This Phase-1 stub establishes the interface and request shape only.
 */
export class NumVerifyValidator implements PhoneVerifier {
  readonly name = "numverify";

  constructor(private apiKey = process.env.NUMVERIFY_API_KEY ?? "") {}

  async validatePhone(phone: string): Promise<PhoneResult> {
    if (!this.apiKey) {
      return { phone, valid: false, lineType: "unknown" };
    }

    const url = `https://apilayer.net/api/validate?access_key=${this.apiKey}&number=${encodeURIComponent(
      phone
    )}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`NumVerify error: ${res.status}`);
    const data = (await res.json()) as {
      valid: boolean;
      line_type?: string;
      carrier?: string;
      country_name?: string;
    };

    return {
      phone,
      valid: Boolean(data.valid),
      lineType: mapLineType(data.line_type),
      carrier: data.carrier || undefined,
      country: data.country_name || undefined,
    };
  }
}

function mapLineType(t?: string): PhoneLineType {
  switch (t) {
    case "mobile":
      return "mobile";
    case "landline":
      return "landline";
    case "voip":
      return "voip";
    default:
      return "unknown";
  }
}
