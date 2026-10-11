import {
  daysUntilDeadline,
  dedupeLines,
  detectInjection,
  estimateTokens,
  normalizeCurrency,
  parseDates,
} from "./deterministic";
import { estimateCostUsd } from "./cost";
import { NOT_FOUND, type AnalysisResult } from "./schema";

/**
 * MOCK MODE: recorded-style deterministic responses so the demo runs and
 * tests pass with no API key and no cost. Mirrors what the real prompt asks
 * the model for, using the same schema — never guessed, always quoted.
 */

export interface MockInputs {
  rfpText: string;
  partnerText: string;
  asOfIso: string;
}

function quoteOrNotFound(
  haystack: string,
  span: string
): { value: string; sourceQuote: string; confidence: number } {
  if (!span) return { value: NOT_FOUND, sourceQuote: "", confidence: 1 };
  const idx = haystack.toLowerCase().indexOf(span.toLowerCase());
  if (idx === -1) return { value: NOT_FOUND, sourceQuote: "", confidence: 1 };
  return {
    value: span,
    sourceQuote: haystack
      .slice(Math.max(0, idx - 40), idx + span.length + 40)
      .trim(),
    confidence: 0.85,
  };
}

function sentencesWith(text: string, keywords: RegExp, limit = 4): string[] {
  const parts = text
    .split(/(?<=[.!?])\s+/)
    .map(s => s.trim())
    .filter(Boolean);
  return dedupeLines(parts.filter(s => keywords.test(s))).slice(0, limit);
}

export function analyzeMock({
  rfpText,
  partnerText,
  asOfIso,
}: MockInputs): AnalysisResult {
  const combined = `${rfpText}\n${partnerText}`;
  const injection = detectInjection(combined);

  // --- deadline: earliest parsable date quoted from the RFP ---
  const dates = parseDates(rfpText);
  const deadlineValue = dates.length > 0 ? dates[0].iso : NOT_FOUND;
  const deadlineQuote = dates.length > 0 ? dates[0].span : "";
  const days =
    deadlineValue === NOT_FOUND
      ? null
      : daysUntilDeadline(deadlineValue, asOfIso);

  // --- budget: first normalized money hit ---
  const money = normalizeCurrency(combined);
  const budgetValue =
    money.length > 0
      ? `${money[0].currency} ${money[0].amount.toLocaleString("en-US")}`
      : NOT_FOUND;

  const eligibility = sentencesWith(
    rfpText,
    /eligib|must be|required to|only .* (organisations|organizations|ngos|nonprofits|companies)|registered/i,
    4
  );
  const documents = sentencesWith(
    rfpText,
    /document|proposal|budget|certificate|registration|audit|reference|submit|attach/i,
    5
  );
  const requirements = sentencesWith(
    rfpText,
    /requirement|must|should|deliverable|experience|capacity|report|monitor/i,
    5
  );

  const partnerSignals = sentencesWith(
    partnerText,
    /experience|worked|project|partner|funded|grant|deliver/i,
    3
  );
  const overlap = requirements.filter(r =>
    partnerSignals.some(p =>
      p
        .split(/\s+/)
        .some(w => w.length > 4 && r.toLowerCase().includes(w.toLowerCase()))
    )
  );

  // Injection can never buy a good rating: flagged docs cap at "weak".
  let fit: string = NOT_FOUND;
  let fitConfidence = 0.5;
  const reasons: string[] = [];
  if (injection.flagged) {
    fit = "weak";
    fitConfidence = 0.4;
    reasons.push(
      "Input contained instruction-like text; treated as data and flagged for human review."
    );
  } else if (requirements.length === 0) {
    fit = NOT_FOUND;
    fitConfidence = 1;
  } else {
    const ratio = overlap.length / Math.max(1, requirements.length);
    fit = ratio >= 0.5 ? "moderate" : "weak";
    fitConfidence = 0.55 + Math.min(0.3, overlap.length * 0.1);
    reasons.push(
      overlap.length > 0
        ? `${overlap.length} of ${requirements.length} key requirements overlap with the partner profile.`
        : "Little overlap found between requirements and the partner profile."
    );
    if (deadlineValue === NOT_FOUND)
      reasons.push("No deadline found, so timing fit cannot be judged.");
  }

  const conflicts: string[] = [];
  if (dates.length > 1 && new Set(dates.map(d => d.iso)).size > 1) {
    conflicts.push(
      `Conflicting dates found: ${Array.from(new Set(dates.map(d => d.iso))).join(" vs ")} — person must confirm.`
    );
  }

  const missing = [deadlineValue, budgetValue].filter(
    v => v === NOT_FOUND
  ).length;
  const lowConf = [0.85, 0.85, 0.85].some(c => c < 0.6);
  const needsHumanReview =
    injection.flagged ||
    missing > 0 ||
    conflicts.length > 0 ||
    lowConf ||
    fitConfidence < 0.6;

  const inputTokens = estimateTokens(rfpText) + estimateTokens(partnerText);
  const outputTokens = estimateTokens(
    JSON.stringify({ deadlineValue, budgetValue, fit })
  );
  const totalTokens = inputTokens + outputTokens;

  const q = (span: string) => quoteOrNotFound(combined, span);
  const deadlineField =
    deadlineValue === NOT_FOUND
      ? { value: NOT_FOUND, sourceQuote: "", confidence: 1 }
      : {
          value: deadlineValue,
          sourceQuote: q(deadlineQuote).sourceQuote || deadlineQuote,
          confidence: 0.9,
        };

  return {
    deadline: deadlineField,
    eligibilityRules:
      eligibility.length > 0
        ? {
            value: eligibility.join(" "),
            sourceQuote: eligibility[0],
            confidence: 0.7,
          }
        : { value: NOT_FOUND, sourceQuote: "", confidence: 1 },
    requiredDocuments:
      documents.length > 0
        ? {
            value: dedupeLines(documents).join(" | "),
            sourceQuote: documents[0],
            confidence: 0.7,
          }
        : { value: NOT_FOUND, sourceQuote: "", confidence: 1 },
    budgetRange:
      money.length > 0
        ? q(money[0].span)
        : { value: NOT_FOUND, sourceQuote: "", confidence: 1 },
    keyRequirements:
      requirements.length > 0
        ? {
            value: dedupeLines(requirements).join(" | "),
            sourceQuote: requirements[0],
            confidence: 0.7,
          }
        : { value: NOT_FOUND, sourceQuote: "", confidence: 1 },
    fitAssessment: {
      value: fit,
      sourceQuote: injection.flagged
        ? "flagged: instruction-like text detected in input"
        : (overlap[0] ?? requirements[0] ?? ""),
      confidence: fitConfidence,
      reasons,
    },
    daysUntilDeadline: days,
    needsHumanReview,
    conflicts,
    injectionFlagged: injection.flagged,
    tokenUsage: { inputTokens, outputTokens, totalTokens },
    costEstimateUsd: estimateCostUsd({
      inputTokens,
      outputTokens,
      totalTokens,
    }),
    analyzedAt: new Date().toISOString(),
  };
}
