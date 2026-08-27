import { v } from "convex/values";
import { action, internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";
import type { MutationCtx } from "./_generated/server";

const PAYSTACK_API = "https://api.paystack.co";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Amounts are in minor units (cents/kencents). Client presets:
//   KES 200/500/1000 -> 20_000..100_000 ; USD 3/5/10 -> 300..1_000
const LIMITS: Record<string, { min: number; max: number }> = {
  KES: { min: 5_000, max: 1_000_000 }, // KES 50 – 10,000
  USD: { min: 100, max: 10_000 }, // $1 – $100
};

async function paystackHeaders(): Promise<Record<string, string>> {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    throw new Error("PAYSTACK_SECRET_KEY is not configured");
  }
  return {
    Authorization: `Bearer ${secretKey}`,
    "Content-Type": "application/json",
  };
}

/** Insert a donation exactly once per Paystack reference. */
async function insertDonationIfNew(
  ctx: MutationCtx,
  donation: { reference: string; email: string; amount: number; currency: string }
) {
  const existing = await ctx.db
    .query("donations")
    .withIndex("by_reference", q => q.eq("reference", donation.reference))
    .first();
  if (existing) return existing._id;
  return await ctx.db.insert("donations", { ...donation, createdAt: Date.now() });
}

export const record = internalMutation({
  args: {
    reference: v.string(),
    email: v.string(),
    amount: v.number(),
    currency: v.string(),
  },
  handler: async (ctx, args) => {
    return await insertDonationIfNew(ctx, args);
  },
});

/** Webhook path — records charge.success events (idempotent). */
export const recordFromWebhook = internalMutation({
  args: {
    reference: v.string(),
    email: v.string(),
    amount: v.number(),
    currency: v.string(),
  },
  handler: async (ctx, args) => {
    if (!args.reference || !args.amount) return null;
    return await insertDonationIfNew(ctx, args);
  },
});

export const initialize = action({
  args: {
    email: v.string(),
    amount: v.number(),
    currency: v.string(),
  },
  handler: async (_ctx, args) => {
    const email = args.email.trim();
    if (!EMAIL_RE.test(email)) {
      throw new Error("A valid email address is required");
    }
    const limits = LIMITS[args.currency];
    if (!limits) {
      throw new Error("Unsupported currency");
    }
    if (!Number.isInteger(args.amount) || args.amount < limits.min || args.amount > limits.max) {
      throw new Error(`Amount must be between ${limits.min / 100} and ${limits.max / 100} ${args.currency}`);
    }

    const reference = `coffee-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    const response = await fetch(`${PAYSTACK_API}/transaction/initialize`, {
      method: "POST",
      headers: await paystackHeaders(),
      body: JSON.stringify({
        email,
        amount: args.amount,
        currency: args.currency,
        reference,
        metadata: {
          source: "portfolio-buy-me-coffee",
        },
      }),
    });
    const body = (await response.json()) as {
      status?: boolean;
      message?: string;
      data?: { access_code?: string; reference?: string };
    };
    if (!response.ok || body.status !== true || !body.data?.access_code) {
      throw new Error(body.message ?? "Paystack could not initialize the transaction");
    }
    return {
      accessCode: body.data.access_code,
      reference: body.data.reference ?? reference,
    };
  },
});

export const verify = action({
  args: { reference: v.string() },
  handler: async (ctx, args) => {
    const response = await fetch(
      `${PAYSTACK_API}/transaction/verify/${encodeURIComponent(args.reference)}`,
      { headers: await paystackHeaders() }
    );
    const body = (await response.json()) as {
      status?: boolean;
      message?: string;
      data?: {
        status?: string;
        reference?: string;
        amount?: number;
        currency?: string;
        customer?: { email?: string };
      };
    };
    if (!response.ok || body.status !== true) {
      return { ok: false as const, reason: body.message ?? "Verification failed" };
    }
    const data = body.data;
    if (!data || data.status !== "success") {
      return { ok: false as const, reason: "Transaction was not successful" };
    }
    await ctx.runMutation(internal.donations.record, {
      reference: data.reference ?? args.reference,
      email: data.customer?.email ?? "",
      amount: data.amount ?? 0,
      currency: data.currency ?? "",
    });
    return { ok: true as const };
  },
});
