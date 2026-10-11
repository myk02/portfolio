/**
 * Cost visibility: per-request token log + per-document / per-1,000 estimates.
 * Mock and real paths both report tokens so cost is visible with no API key.
 */

export interface TokenUsage {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
}

/** Example managed-API price per 1K tokens (configurable, shown in UI). */
export const MANAGED_API_PRICE_PER_1K = { input: 0.0005, output: 0.0015 };

export function estimateCostUsd(
  usage: TokenUsage,
  price = MANAGED_API_PRICE_PER_1K
): number {
  const cost =
    (usage.inputTokens / 1000) * price.input +
    (usage.outputTokens / 1000) * price.output;
  return Math.round(cost * 1_000_000) / 1_000_000;
}

export function formatUsd(n: number): string {
  if (n === 0) return "$0.00";
  if (n < 0.01) return `$${n.toFixed(6)}`;
  return `$${n.toFixed(4)}`;
}

export function costPerThousand(perDoc: number): number {
  return Math.round(perDoc * 1000 * 1_000_000) / 1_000_000;
}

/** Short written comparison shown on the page (see DECISIONS.md for more). */
export const COST_COMPARISON: {
  option: string;
  cost: string;
  security: string;
  portability: string;
  maintenance: string;
}[] = [
  {
    option: "Managed API (default)",
    cost: "Pay per token; ~$0.001–0.01 per document at this size.",
    security: "Data leaves your machine; needs PII redaction + DPA review.",
    portability: "Locked to vendor pricing/shape; wrapper keeps swap cheap.",
    maintenance: "Low: no servers, but track model deprecations.",
  },
  {
    option: "Open-weight model (self-hosted)",
    cost: "Flat compute cost; cheap at volume, wasteful at low volume.",
    security: "Data stays in your network; you own the logs.",
    portability: "High: same prompt + schema, new endpoint.",
    maintenance: "High: GPUs, updates, evals are on you.",
  },
  {
    option: "Plain rules, no model",
    cost: "$0 per document after build.",
    security: "Nothing sent anywhere; easiest to approve.",
    portability: "Total: it is just code.",
    maintenance:
      "Low, but brittle on messy wording — the reason the model handles interpretation only.",
  },
];
