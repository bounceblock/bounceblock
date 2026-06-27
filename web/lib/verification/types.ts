/**
 * Provider-agnostic verification interfaces.
 * ZeroBounce / NumVerify (and any future fallback providers) implement these,
 * so the rest of the app never depends on a specific vendor.
 */

export type EmailStatus = "valid" | "invalid" | "catch-all" | "unknown";

export interface EmailResult {
  email: string;
  status: EmailStatus;
  subStatus?: string; // e.g. "mailbox_not_found", "role_based", "disposable"
  didYouMean?: string; // typo suggestion, e.g. gmial.com -> gmail.com
}

export type PhoneLineType = "mobile" | "landline" | "voip" | "unknown";

export interface PhoneResult {
  phone: string;
  valid: boolean;
  lineType: PhoneLineType;
  carrier?: string;
  country?: string;
}

export interface EmailVerifier {
  readonly name: string;
  verifyEmail(email: string): Promise<EmailResult>;
}

export interface PhoneVerifier {
  readonly name: string;
  validatePhone(phone: string): Promise<PhoneResult>;
}
