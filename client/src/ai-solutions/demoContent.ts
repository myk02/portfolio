/**
 * Page + card content for the AI Solutions section. Plain, simple English —
 * no buzzwords, no hype. Anything not truly built is marked as Demo/Learning.
 */

export const AI_SOLUTIONS_INTRO = {
  title: "AI Solutions",
  lede: "I build small tools that read messy documents and turn them into checked, structured work. The tool does the reading; a person checks and approves before anything is sent.",
  points: [
    "Plain code handles dates, numbers, and checks — because it must be exact.",
    "The model only reads messy wording — and everything it says is verified against the source text.",
    "A person reviews every field before anything is exported. Nothing is sent automatically.",
  ],
};

export const AI_SKILLS_GROUP = {
  title: "AI Solutions & Automation",
  skills: [
    "Structured outputs with schema validation (Zod)",
    "Tool use (deadline calculator, currency normaliser)",
    "Human-in-the-loop review before export",
    "Evaluation test sets with accuracy thresholds",
    "Prompt-injection handling (inputs treated as data)",
    "PII redaction before any model call",
    "Source traceability (every field carries its quote)",
    "Cost estimation per document and per 1,000",
    "Webhooks + OAuth basics, rate-limit backoff",
    "Secrets management (env only, mock by default)",
  ],
  strengthening:
    "Currently strengthening: OAuth refresh flows against live CRMs, PDF table extraction, and larger eval sets. [ADD REAL FACT: any course/cert to name here]",
};

export const DEMO_PROJECT_CARD = {
  slug: "partner-proposal-assistant",
  name: "Partner & Proposal Intelligence Assistant",
  badge: "Demo project",
  outcomeTitle:
    "Paste a funding call + partner profile, get a checked summary a person approves.",
  role: "Design · Build · Evals",
  timeline: "[ADD REAL FACT: build time]",
  stack: ["React", "TypeScript", "Zod", "Vitest", "Playwright"],
};

export const CASE_STUDY = {
  problem:
    "Business-development teams paste long funding calls and partner profiles into chat tools and get confident-sounding answers with no sources, no checks, and no record of who approved what.",
  whoFor:
    "A business-development colleague preparing a proposal go/no-go. Written for non-technical readers.",
  connectsTo:
    "Pasted text today; optional webhook export to Slack or a sheet (OFF by default). No CRM or live system is connected in this demo.",
  modelVsCode: [
    "Plain code: date parsing, deadline arithmetic, currency checks, duplicate detection, schema validation, PII redaction, injection-pattern scan, quote verification.",
    "Model only: reading messy wording to pull out eligibility, documents, requirements, and fit reasons — always with a source quote.",
    "Why: code is exact and free; the model handles wording variation but is never trusted unchecked.",
  ],
  errorsCaught:
    "Missing fields return 'not found' (never guessed). Low confidence, missing values, unverified quotes, or conflicting dates set 'needs human review'. Injection attempts are flagged and capped at a weak fit. Oversize/empty input, timeouts, rate limits, and bad model JSON all fail safely with plain-language messages.",
  cost: "Every run shows tokens, cost per document, and cost per 1,000. Mock mode costs $0. See the comparison table on the page.",
  next: [
    "Connect one live source (e.g. a grants feed) with 'last fetched' labels.",
    "Add PDF/DOCX parsing with table support.",
    "Grow the eval set past 10 and track accuracy over time.",
  ],
  codeLinks: {
    folder: "client/src/ai-solutions",
    readme: "client/src/ai-solutions/README.md",
    repo: "[ADD REAL FACT: GitHub repo URL for this portfolio]",
  },
};
