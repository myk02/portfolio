# Mike Waitindi — Portfolio

Portfolio for Mike Waitindi, a Nairobi-based full-stack software engineer — "Connecting Dots in Tech." He builds web, mobile and desktop apps with third-party payments, keeps IT running, and is venturing into marketing with AI. The portfolio presents three deployed product demos, the decisions behind them, and direct contact and support options.

**Live site:** [mikeships.vercel.app](https://mikeships.vercel.app)

## Selected projects

| Project | Summary | Demo |
| --- | --- | --- |
| KenyaTrace | Multi-stop Kenya tourism planner concept | [Open](https://kenyatrace.vercel.app) |
| GiGi Energy | Mobile-first storefront and checkout concept | [Open](https://gigiflavours.vercel.app) |
| LegalFlow | Matter and billing workspace concept | [Open](https://law-ten-iota.vercel.app) |

These are frontend demonstrations. They do not provide production payments, GPS, billing or live client data.

## Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Contact backend:** Convex, with optional email notifications through Resend
- **Support payments:** Paystack tips, with transaction verification and webhook reconciliation
- **Hosting:** Vercel

## Local development

Requirements: Node.js 20+ and pnpm.

```bash
pnpm install
cp .env.example .env.local
```

Set `VITE_CONVEX_URL` to a Convex deployment URL to enable the contact form. Add Resend settings to enable email notifications. Then run:

```bash
pnpm dev
pnpm build
pnpm check
```

The site runs locally at `http://localhost:3000`.
