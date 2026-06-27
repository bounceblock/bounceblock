/**
 * Simple in-memory fixed-window rate limiter, keyed by IP.
 * Protects the (often anonymous) verification endpoints from cost/abuse.
 *
 * Good for a single instance / dev. For production (serverless, multi-instance)
 * swap the store for Upstash Redis — the function signature stays the same.
 */
type Bucket = { count: number; reset: number };
const store = new Map<string, Bucket>();

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): { ok: boolean; remaining: number; reset: number } {
  const now = Date.now();
  const b = store.get(key);
  if (!b || now > b.reset) {
    store.set(key, { count: 1, reset: now + windowMs });
    return { ok: true, remaining: limit - 1, reset: now + windowMs };
  }
  b.count++;
  return { ok: b.count <= limit, remaining: Math.max(0, limit - b.count), reset: b.reset };
}

export function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  return xff?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}
