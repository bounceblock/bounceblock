import { createHash, randomBytes } from "crypto";

/** SHA-256 hash of a raw API key (we store the hash, never the raw key). */
export function hashKey(raw: string): string {
  return createHash("sha256").update(raw).digest("hex");
}

/** Generate a new API key. The raw value is shown to the user once. */
export function generateApiKey(): { raw: string; hash: string } {
  const raw = "bb_live_" + randomBytes(24).toString("hex");
  return { raw, hash: hashKey(raw) };
}

export function maskKey(raw: string): string {
  return raw.length > 16 ? `${raw.slice(0, 12)}…${raw.slice(-4)}` : raw;
}
