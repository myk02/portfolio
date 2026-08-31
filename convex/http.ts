import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

const enc = new TextEncoder();

function timingSafeEqual(a: string, b: string): boolean {
  let diff = a.length ^ b.length;
  const len = Math.max(a.length, b.length);
  for (let i = 0; i < len; i++) {
    diff |= (a.charCodeAt(i) ?? 0) ^ (b.charCodeAt(i) ?? 0);
  }
  return diff === 0;
}

async function isValidPaystackSignature(
  secret: string,
  rawBody: string,
  signature: string
): Promise<boolean> {
  if (!signature) return false;
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-512" },
    false,
    ["sign"]
  );
  const mac = await crypto.subtle.sign("HMAC", key, enc.encode(rawBody));
  const expected = Array.from(new Uint8Array(mac))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
  return timingSafeEqual(expected, signature.toLowerCase());
}

/**
 * Paystack webhook — POST /paystack/webhook
 * Set this URL in the Paystack dashboard. Verifies the x-paystack-signature
 * HMAC-SHA512 header before trusting the payload.
 */
export const paystackWebhook = httpAction(async (ctx, req) => {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    return new Response("Server not configured", { status: 500 });
  }

  const rawBody = await req.text();
  const signature =
    req.headers.get("x-paystack-signature") ?? req.headers.get("X-Paystack-Signature") ?? "";

  if (!(await isValidPaystackSignature(secret, rawBody, signature))) {
    return new Response("Invalid signature", { status: 401 });
  }

  let event: {
    event?: string;
    data?: {
      status?: string;
      reference?: string;
      amount?: number;
      currency?: string;
      customer?: { email?: string };
    };
  };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return new Response("Bad payload", { status: 400 });
  }

  // Always ack verified events with 200 so Paystack stops retrying.
  if (event?.event === "charge.success" && event.data?.status === "success") {
    await ctx.runMutation(internal.donations.recordFromWebhook, {
      reference: String(event.data.reference ?? ""),
      email: String(event.data.customer?.email ?? ""),
      amount: Number(event.data.amount ?? 0),
      currency: String(event.data.currency ?? ""),
    });
  }
  return new Response(null, { status: 200 });
});

const http = httpRouter();

http.route({
  path: "/paystack/webhook",
  method: "POST",
  handler: paystackWebhook,
});

export default http;
