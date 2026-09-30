# Mike Waitindi — Portfolio

[![Live site](https://img.shields.io/badge/live-mikeships.vercel.app-brightgreen)](https://mikeships.vercel.app)
![React](https://img.shields.io/badge/react-19-blue)
![Convex](https://img.shields.io/badge/backend-convex-orange)
![Vercel](https://img.shields.io/badge/hosting-vercel-black)

Developer, designer, tech support & automation specialist based in Nairobi.
Brand direction, web apps, automation, and launch-ready digital experiences.

**Live:** [mikeships.vercel.app](https://mikeships.vercel.app)

---

## Shipped products

| Product | What it is | Live |
|---------|------------|------|
| **KenyaTrace** | Tourism explorer — multi-stop trip planning, list-first for slow networks (frontend only; no live payments/GPS in this build) | [kenyatrace.vercel.app](https://kenyatrace.vercel.app) |
| **GiGi Energy Drink** | Energy-drink storefront concept — simplified checkout, readable contrast (frontend only; no live checkout in this build) | [gigiflavours.vercel.app](https://gigiflavours.vercel.app) |
| **LegalFlow** | Law-firm workspace concept — matters, billing explained in one place (frontend only; no live billing/payments in this build) | [law-ten-iota.vercel.app](https://law-ten-iota.vercel.app) |

Each product card links straight to its live site. This portfolio has no
per-project subpages.

---

## Tech stack

| Layer | Choice |
|-------|--------|
| App | React 19 + Vite 7 + Tailwind CSS 4 |
| Backend | Convex (contact inbox, tips) |
| Payments | Paystack tips on this portfolio (initialize / verify / webhook). Product sites are frontend-only |
| Tests | Playwright E2E for this portfolio, run in CI |
| Hosting | Vercel |

---

## Local development

Requirements: Node.js 20+ and `pnpm`.

```bash
git clone https://github.com/myk02/portfolio.git
cd portfolio
pnpm install
cp .env.example .env.local
```

Fill in `.env.local` (see `.env.example`), then:

```bash
pnpm dev        # frontend at http://localhost:3000
pnpm build      # production build (needs VITE_CONVEX_URL)
npx tsc --noEmit # typecheck
```

---

## Deployment

Pushes to `master` auto-deploy the frontend on Vercel.
The Convex backend deploys with:

```bash
npx convex deploy
```

---

Designed & built from Nairobi by [Mike Waitindi](https://mikeships.vercel.app).
