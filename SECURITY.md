# Security Policy

## Reporting a vulnerability

Email **[ADD REAL FACT: security contact email]** with:

- what you found and where (URL or page),
- steps to reproduce it,
- what you think the impact is.

Please do not access other people's data, degrade the site, or disclose the
issue publicly before it is fixed. I aim to acknowledge reports within
**[ADD REAL FACT: response time, e.g. 3 working days]**.

## Scope

This policy covers the portfolio site at <https://mikeships.vercel.app>
(frontend, contact form, tip flow). The Convex backend dashboard and third
parties (Paystack, Resend, Vercel) are outside this scope — report issues in
those systems to their vendors.

## What is already in place

- Security headers (CSP, X-Content-Type-Options, Referrer-Policy,
  Permissions-Policy, frame protection) via `vercel.json`.
- Contact-form validation on client and server, honeypot bot check, generic
  error messages.
- Paystack webhooks verify the HMAC-SHA512 signature (unsigned = 401).
- Secrets in environment variables only; gitleaks secret-scan in CI;
  Dependabot proposes dependency updates.
- Known gap, stated openly: no server-side rate limit on the contact form yet.
