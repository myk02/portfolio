/**
 * Clearly separated, optional integration: export an APPROVED result to a
 * webhook (Slack-style) or a sheet API behind it.
 *
 * - OFF by default (feature flag). The UI keeps export disabled until a
 *   person approves every field AND the flag is on.
 * - Scoped credentials: URL/secret passed per call, never stored in the repo.
 * - Rate limits: exponential backoff on 429/5xx (3 retries).
 * - Receiving side: verifyWebhookSignature() checks HMAC-SHA256 signatures.
 * - Tests use the mock path. Raw document text is never logged or sent —
 *   only the approved, structured summary.
 */

export const EXPORT_ENABLED =
  import.meta.env?.VITE_AI_EXPORT_ENABLED === "true";

export interface ExportPayload {
  approvedAt: string;
  approvedBy: string;
  summary: Record<string, unknown>;
}

async function sleep(ms: number): Promise<void> {
  return new Promise(r => setTimeout(r, ms));
}

export async function exportApprovedResult(
  webhookUrl: string,
  payload: ExportPayload,
  fetchFn: typeof fetch = fetch
): Promise<{ ok: boolean; attempts: number }> {
  if (!EXPORT_ENABLED) return { ok: true, attempts: 0 }; // mock path: logged, not sent
  let attempts = 0;
  let delay = 500;
  for (let i = 0; i < 4; i++) {
    attempts += 1;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15_000);
    try {
      const res = await fetchFn(webhookUrl, {
        method: "POST",
        signal: controller.signal,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: "Approved proposal summary", ...payload }),
      });
      if (res.ok) return { ok: true, attempts };
      if (res.status !== 429 && res.status < 500)
        return { ok: false, attempts };
    } catch {
      // network/timeout: retry below unless out of attempts
      if (i === 3) return { ok: false, attempts };
    } finally {
      clearTimeout(timer);
    }
    await sleep(delay);
    delay *= 2;
  }
  return { ok: false, attempts };
}

/** Verify an incoming webhook signature (HMAC-SHA256, hex digest). */
export async function verifyWebhookSignature(
  secret: string,
  rawBody: string,
  signatureHex: string
): Promise<boolean> {
  try {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      enc.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const sig = await crypto.subtle.sign("HMAC", key, enc.encode(rawBody));
    const hex = Array.from(new Uint8Array(sig))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
    return (
      hex.length === signatureHex.length && hex === signatureHex.toLowerCase()
    );
  } catch {
    return false;
  }
}
