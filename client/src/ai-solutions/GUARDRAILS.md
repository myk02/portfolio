# GUARDRAILS — reusable checklist for AI workflows

Copy this into any team shipping an AI-assisted workflow.

## Inputs

- [ ] Pasted/external text is wrapped as DATA, never instructions.
- [ ] Injection patterns scanned; hits flagged + capped, never auto-acted on.
- [ ] Size limits set; empty/oversize input fails with a friendly message.

## Privacy

- [ ] PII redaction runs before any model call (toggleable, ON by default).
- [ ] No raw document text in logs (lengths/flags only).
- [ ] Documented what is stored and where; default = store nothing.
- [ ] Secrets only in env / user-pasted memory; never in repo or client bundle.

## Verification

- [ ] Structured output validated against a schema; one retry, then fail safe.
- [ ] Every claim carries a source quote or is "not found" — never guessed.
- [ ] Deterministic post-checks (dates, numbers, conflicts) overrule the model.
- [ ] Human review level matches the cost of error; export gated on approval.

## Integrations

- [ ] Behind a feature flag, OFF by default.
- [ ] Scoped credentials; rate limits with exponential backoff.
- [ ] Webhook signatures verified on receipt; timeouts handled.
- [ ] Cached data labelled with "last fetched" — never shown as live.

## Cost + upkeep

- [ ] Tokens logged per request; $/doc and $/1,000 visible.
- [ ] Eval set with threshold runs in CI (mock mode); accuracy tracked.
- [ ] Vendor/model review done (DPA, deprecation watch).
