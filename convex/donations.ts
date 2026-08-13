import { v } from "convex/values";
import { action, internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";

const PAYSTACK_API = "https://api.paystack.co";

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

export const record = internalMutation({
  args: {
    reference: v.string(),
    email: v.string(),
    amount: v.number(),
    currency: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("donations", { ...args, createdAt: Date.now() });
  },
});

export const initialize = action({
  args: {
    email: v.string(),
    amount: v.number(),
    currency: v.string(),
  },
  handler: async (_ctx, args) => {
    const reference = `coffee-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    const response = await fetch(`${PAYSTACK_API}/transaction/initialize`, {
      method: "POST",
      headers: await paystackHeaders(),
      body: JSON.stringify({
        email: args.email,
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
      return { ok: false, reason: body.message ?? "Verification failed" };
    }
    const data = body.data;
    if (!data || data.status !== "success") {
      return { ok: false, reason: "Transaction was not successful" };
    }
    await ctx.runMutation(internal.donations.record, {
      reference: data.reference ?? args.reference,
      email: data.customer?.email ?? "",
      amount: data.amount ?? 0,
      currency: data.currency ?? "",
    });
    return { ok: true };
  },
});
