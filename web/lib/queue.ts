import { config } from "@/lib/config";

export interface ProcessJob {
  verificationId: string;
}

/**
 * Enqueue full-list processing.
 *
 * The Stripe webhook (and large uploads) must NOT verify inline — Vercel
 * function timeouts. Production pushes a job to a queue (QStash / Inngest) and a
 * worker hits /api/verify/process. Until a queue is configured this returns
 * false so the caller can fall back to inline processing in dev.
 */
export async function enqueueProcessing(job: ProcessJob): Promise<boolean> {
  const url = process.env.QSTASH_URL;
  const token = process.env.QSTASH_TOKEN;
  if (!url || !token) return false;

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ destination: `${config.siteUrl()}/api/verify/process`, job }),
  }).catch(() => {});
  return true;
}
