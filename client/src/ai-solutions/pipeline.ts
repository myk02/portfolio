import { estimateCostUsd } from "./cost";
import {
  LOW_CONFIDENCE_THRESHOLD,
  MAX_INPUT_CHARS,
  daysUntilDeadline,
  detectInjection,
  estimateTokens,
  parseDates,
  redactPII,
  wrapAsData,
} from "./deterministic";
import { analyzeMock } from "./mockProvider";
import { buildPrompt, callRemoteModel, getProviderConfig } from "./provider";
import {
  analysisResultSchema,
  isNotFound,
  type AnalysisResult,
} from "./schema";

export interface PipelineOptions {
  redactPii: boolean;
  asOfIso?: string;
  /** Remote mode only: user-pasted key, memory-only, never stored. */
  userApiKey?: string;
  timeoutMs?: number;
}

export interface PipelineOutput {
  result: AnalysisResult;
  /** Shown in UI: what was redacted, injection flags, last-fetched time. */
  meta: {
    redactedCount: number;
    redactedTypes: string[];
    injectionMatches: string[];
    mode: "mock" | "remote";
    lastFetched: string;
    cached: boolean;
  };
}

export function friendlyError(message: string): Error {
  return new Error(message);
}

/**
 * Full pipeline: limits → injection scan → PII redaction → model (mock/remote)
 * → Zod validation with one retry → deterministic post-checks. Raw document
 * text is never logged; only lengths and flags. Nothing is stored by default.
 */
export async function runAnalysis(
  rfpText: string,
  partnerText: string,
  opts: PipelineOptions
): Promise<PipelineOutput> {
  const asOfIso = opts.asOfIso ?? new Date().toISOString().slice(0, 10);
  const rfp = rfpText.trim();
  const partner = partnerText.trim();

  if (!rfp || !partner) {
    throw friendlyError(
      "Paste both a funding call and a partner profile first — both boxes are needed."
    );
  }
  if (rfp.length + partner.length > MAX_INPUT_CHARS * 2) {
    throw friendlyError(
      `That is too much text (limit ${MAX_INPUT_CHARS.toLocaleString()} characters per box). Shorten the documents and try again.`
    );
  }

  const injection = detectInjection(`${rfp}\n${partner}`);

  const rfpRed = opts.redactPii
    ? redactPII(rfp)
    : { redacted: rfp, count: 0, types: [] as string[] };
  const partnerRed = opts.redactPii
    ? redactPII(partner)
    : { redacted: partner, count: 0, types: [] as string[] };

  const config = getProviderConfig();
  const useRemote =
    config.mode === "remote" && (opts.userApiKey ?? "").length > 0;

  let result: AnalysisResult;
  if (!useRemote) {
    result = analyzeMock({
      rfpText: rfpRed.redacted,
      partnerText: partnerRed.redacted,
      asOfIso,
    });
  } else {
    const prompt = buildPrompt(
      wrapAsData("RFP", rfpRed.redacted),
      wrapAsData("PARTNER", partnerRed.redacted)
    );
    const first = await callRemoteModel(
      prompt,
      opts.userApiKey!,
      config,
      undefined,
      opts.timeoutMs
    );
    const parsedFirst = analysisResultSchema.safeParse({
      ...safeJson(first.jsonText),
      tokenUsage: toUsage(first.inputTokens, first.outputTokens),
      costEstimateUsd: estimateCostUsd(
        toUsage(first.inputTokens, first.outputTokens)
      ),
      analyzedAt: new Date().toISOString(),
    });
    if (parsedFirst.success) {
      result = parsedFirst.data;
    } else {
      // Exactly one retry with the validation error attached.
      const second = await callRemoteModel(
        prompt,
        opts.userApiKey!,
        config,
        parsedFirst.error.message,
        opts.timeoutMs
      );
      const parsedSecond = analysisResultSchema.safeParse({
        ...safeJson(second.jsonText),
        tokenUsage: toUsage(second.inputTokens, second.outputTokens),
        costEstimateUsd: estimateCostUsd(
          toUsage(second.inputTokens, second.outputTokens)
        ),
        analyzedAt: new Date().toISOString(),
      });
      if (!parsedSecond.success) {
        throw friendlyError(
          "The model returned data in the wrong shape twice. The run was stopped safely — try mock mode or reword the documents."
        );
      }
      result = parsedSecond.data;
    }
  }

  // --- Deterministic post-checks (code has the last word, not the model) ---
  const conflicts = [...result.conflicts];
  const rfpDates = parseDates(rfpRed.redacted);
  const uniqueDates = Array.from(new Set(rfpDates.map(d => d.iso)));
  if (
    uniqueDates.length > 1 &&
    !conflicts.some(c => c.includes("Conflicting dates"))
  ) {
    conflicts.push(
      `Conflicting dates found: ${uniqueDates.join(" vs ")} — person must confirm.`
    );
  }
  if (
    uniqueDates.length === 1 &&
    result.deadline.value !== uniqueDates[0] &&
    !isNotFound(result.deadline)
  ) {
    conflicts.push(
      `Deadline "${result.deadline.value}" does not match the date in the text (${uniqueDates[0]}).`
    );
  }
  const days =
    uniqueDates.length === 1
      ? daysUntilDeadline(uniqueDates[0], asOfIso)
      : result.daysUntilDeadline;

  // Every non-"not found" quote must appear verbatim in the (redacted) source.
  const source = `${rfpRed.redacted}\n${partnerRed.redacted}`.toLowerCase();
  let unverified = 0;
  for (const field of [
    result.deadline,
    result.eligibilityRules,
    result.requiredDocuments,
    result.budgetRange,
    result.keyRequirements,
  ]) {
    if (
      !isNotFound(field) &&
      field.sourceQuote &&
      !source.includes(field.sourceQuote.toLowerCase().slice(0, 24))
    ) {
      unverified += 1;
    }
  }
  if (unverified > 0)
    conflicts.push(
      `${unverified} field(s) could not be verified against the source text — check them before approving.`
    );

  const lowConfidence = [
    result.deadline.confidence,
    result.budgetRange.confidence,
    result.fitAssessment.confidence,
  ].some(c => c < LOW_CONFIDENCE_THRESHOLD);
  const anyMissing = [
    result.deadline,
    result.budgetRange,
    result.keyRequirements,
  ].some(isNotFound);

  const inputTokens =
    estimateTokens(rfpRed.redacted) + estimateTokens(partnerRed.redacted);

  return {
    result: {
      ...result,
      daysUntilDeadline: days,
      conflicts,
      injectionFlagged: result.injectionFlagged || injection.flagged,
      needsHumanReview:
        result.needsHumanReview ||
        injection.flagged ||
        conflicts.length > 0 ||
        lowConfidence ||
        anyMissing,
      tokenUsage:
        result.tokenUsage.totalTokens > 0
          ? result.tokenUsage
          : {
              inputTokens,
              outputTokens: estimateTokens(
                JSON.stringify(result.fitAssessment)
              ),
              totalTokens:
                inputTokens +
                estimateTokens(JSON.stringify(result.fitAssessment)),
            },
    },
    meta: {
      redactedCount: rfpRed.count + partnerRed.count,
      redactedTypes: Array.from(new Set(rfpRed.types.concat(partnerRed.types))),
      injectionMatches: injection.matches,
      mode: useRemote ? "remote" : "mock",
      lastFetched: new Date().toISOString(),
      cached: !useRemote,
    },
  };
}

function safeJson(text: string): Record<string, unknown> {
  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch {
    return {};
  }
}

function toUsage(inputTokens: number, outputTokens: number) {
  return { inputTokens, outputTokens, totalTokens: inputTokens + outputTokens };
}
