# DECISIONS

## Model vs plain code

| Job                                                                  | Owner                             | Why                                                          |
| -------------------------------------------------------------------- | --------------------------------- | ------------------------------------------------------------ |
| Date parsing, deadline arithmetic                                    | Plain code (`deterministic.ts`)   | Must be exact; models miscalculate.                          |
| Currency/number checks                                               | Plain code                        | Exact + currency-aware.                                      |
| Schema validation                                                    | Zod                               | Strict shape; retry once with the error, then fail safe.     |
| PII redaction, injection scan                                        | Plain code, before any model call | Cannot depend on the model to police itself.                 |
| Quote verification, conflicts                                        | Plain code post-check             | Code has the last word, not the model.                       |
| Reading messy wording (eligibility, docs, requirements, fit reasons) | Model                             | Handles wording variation; every claim needs a source quote. |

## Provider choice

Thin wrapper (`provider.ts`): mock by default; remote via any OpenAI-compatible
endpoint (e.g. OpenRouter). Endpoint/model are public config; the secret is
user-pasted, memory-only. Swap = change two vars, no app changes.

## What I would change next

1. One live source (grants feed) with "last fetched" labels instead of pasted text.
2. PDF/DOCX parsing with table support.
3. OAuth refresh flow against a real CRM for export (currently webhook-only, OFF).
4. Larger eval set + accuracy-over-time tracking per model version.
5. [ADD REAL FACT: anything you want prioritised for the role]
