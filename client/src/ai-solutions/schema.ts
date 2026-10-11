import { z } from "zod";

/**
 * Strict output schema for the Partner & Proposal Intelligence Assistant.
 * Every extracted field carries its SOURCE QUOTE so a person can verify it.
 * Missing information is "not found" — the app never guesses.
 */

export const NOT_FOUND = "not found" as const;

export const extractedFieldSchema = z.object({
  /** Extracted value, or exactly "not found" when the source lacks it. */
  value: z.string().min(1).max(2000),
  /** Verbatim span from the input that supports `value` ("" only with "not found"). */
  sourceQuote: z.string().max(2000),
  /** Model/deterministic confidence in [0, 1]. */
  confidence: z.number().min(0).max(1),
});

export type ExtractedField = z.infer<typeof extractedFieldSchema>;

export const fitLabelSchema = z.enum(["strong", "moderate", "weak", NOT_FOUND]);

export const analysisResultSchema = z.object({
  deadline: extractedFieldSchema,
  eligibilityRules: extractedFieldSchema,
  requiredDocuments: extractedFieldSchema,
  budgetRange: extractedFieldSchema,
  keyRequirements: extractedFieldSchema,
  fitAssessment: extractedFieldSchema.extend({
    /** Short reasons, each traceable to the inputs. */
    reasons: z.array(z.string().max(500)).max(10).default([]),
  }),
  /** Days from `asOfDate` to the parsed deadline (null when unknown). */
  daysUntilDeadline: z.number().int().nullable(),
  needsHumanReview: z.boolean(),
  /** Human-readable conflict / gap notes (e.g. two different dates). */
  conflicts: z.array(z.string().max(500)).max(10).default([]),
  /** True when the inputs tried to steer the model (see deterministic.ts). */
  injectionFlagged: z.boolean().default(false),
  tokenUsage: z.object({
    inputTokens: z.number().int().nonnegative(),
    outputTokens: z.number().int().nonnegative(),
    totalTokens: z.number().int().nonnegative(),
  }),
  costEstimateUsd: z.number().nonnegative(),
  /** ISO timestamp of this run — shown in the UI as "last fetched". */
  analyzedAt: z.string(),
});

export type AnalysisResult = z.infer<typeof analysisResultSchema>;

export function makeNotFound(confidence = 1): ExtractedField {
  return { value: NOT_FOUND, sourceQuote: "", confidence };
}

export function isNotFound(field: Pick<ExtractedField, "value">): boolean {
  return field.value.trim().toLowerCase() === NOT_FOUND;
}
