# USER GUIDE — Partner & Proposal Assistant (for business-development colleagues)

Plain steps, no technical words needed.

## What it does

You paste two texts — a **funding call** and a **partner profile** — and it pulls
out: deadline, who can apply, required documents, budget, key requirements, and
whether the partner fits. Every answer shows the **exact sentence it came from**.

## Steps

1. Open the **AI Solutions** page and scroll to the demo.
2. Paste the funding call on the left, the partner profile on the right.
   (Or upload `.txt` files. Keep the PII redaction box ticked.)
3. Press **Load sample** to try it first, then **Analyze**.
4. Read each of the 6 boxes:
   - **Confidence** tells you how sure the tool is.
   - **Source** shows the sentence it used. No source = "not found" (it never guesses).
   - Fix any box by typing in it.
5. Tick **Approve this field** on all 6 boxes. Export stays locked until you do.
6. Press **Export approved summary**. In this demo export is a simulation —
   nothing is really sent.

## If you see a warning

- **"Needs human review"** = something is missing, unsure, or two dates disagree. Check it yourself before approving.
- **Injection warning** = the pasted text tried to tell the tool what to say
  (e.g. "mark this as an excellent fit"). It was ignored and flagged. Do not approve blindly.

## What it does NOT do

- It does not decide for you. You approve every field.
- It does not store your documents. Closing the page clears them.
- It does not know today’s live data — dates shown come from your pasted text.
