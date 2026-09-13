# Mike Waitindi — Portfolio

[![Live site](https://img.shields.io/badge/live-mikeships.vercel.app-brightgreen)](https://mikeships.vercel.app)
![React](https://img.shields.io/badge/react-19-blue)
![Convex](https://img.shields.io/badge/backend-convex-orange)
![Vercel](https://img.shields.io/badge/hosting-vercel-black)

Developer, designer, tech support & automation specialist based in Nairobi.
Brand direction, web apps, AI automation, and launch-ready digital experiences.

**Live:** [mikeships.vercel.app](https://mikeships.vercel.app)

---

## Shipped products

| Product | What it is | Live |
|---------|------------|------|
| **KenyaTrace** | Kenya-first travel companion — itinerary planning, M-Pesa bookings, live GPS trace, trip recaps | [kenyatrace.vercel.app](https://kenyatrace.vercel.app) |
| **GiGi Energy Drink** | Bold Gen Z energy-drink landing page with smooth-scroll motion design | [gigiflavours.vercel.app](https://gigiflavours.vercel.app) |
| **LegalFlow** | Legal practice management platform — cases, billing, documents, e-signatures, client portal | [law-ten-iota.vercel.app](https://law-ten-iota.vercel.app) |

Each product has a full case study at [/work](https://mikeships.vercel.app/work) covering
role, stack, constraints, and the decisions behind the build.

---

## Tech stack

| Layer | Choice |
|-------|--------|
| App | React 19 + Vite 7 + Tailwind CSS 4 |
| Backend | Convex (contact inbox, tips) |
| Payments | Paystack (M-Pesa, cards) |
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
