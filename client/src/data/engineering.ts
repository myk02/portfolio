/**
 * Engineering evidence + skills matrix.
 *
 * Credibility rule: everything under `evidenceCards.supported` is demonstrated
 * by this repository itself (the portfolio is a React 19 + TypeScript + Vite +
 * Tailwind v4 app with a Convex backend, Playwright e2e suite, and Git→Vercel
 * deploys) or by shipped work documented in the case studies. Anything not yet
 * demonstrated lives in `buildingNext`.
 */

export interface EvidenceCard {
  id: string;
  title: string;
  points: string[];
}

export const engineeringIntro =
  "I build responsive, accessible interfaces from real designs, connect them to working data, and improve them through testing and iteration. The strongest proof is this site — it is the same stack I'd use on your product.";

export const evidenceCards: EvidenceCard[] = [
  {
    id: "frontend",
    title: "Frontend",
    points: [
      "React 19 with TypeScript across every route and component",
      "Semantic landmarks, heading order, named links, visible focus",
      "Responsive layouts from 360px phones to desktop grids",
      "Component-based UI: tiles, cards, mockups, galleries composed from one token set",
    ],
  },
  {
    id: "apis-data",
    title: "APIs & data",
    points: [
      "Convex backend functions power the contact form and donations",
      "Typed client calls with loading, error, and success states",
      "Paystack payment integration verified server-side before confirming",
      "Form payloads validated on submit with actionable error messages",
    ],
  },
  {
    id: "testing-quality",
    title: "Testing & quality",
    points: [
      "Playwright end-to-end suite covers routes, CTAs, lightbox, 404, form validation",
      "tsc --noEmit typecheck gate plus Prettier formatting",
      "Keyboard paths tested: focus-trapped mobile menu, Esc-closable dialogs",
      "Reduced-motion respected in animations and counters",
    ],
  },
  {
    id: "debugging-delivery",
    title: "Debugging & delivery",
    points: [
      "Git workflow with reviewed PRs; auto-deploys to Vercel on merge",
      "SPA rewrites, canonical URLs, per-route titles and OG tags maintained",
      "Root-cause fixes over patches — e.g. contrast fixed at the palette level, not per text run",
      "Image pipeline: WebP variants, explicit dimensions, lazy loading below the fold",
    ],
  },
  {
    id: "accessibility-security",
    title: "Accessibility & security",
    points: [
      "AA contrast targets on brand palettes (documented in the GiGi case study)",
      "Labels tied to inputs, role=alert errors, aria-expanded/controls on toggles",
      "No secrets in the client; payments delegated to Paystack's hosted flow",
      "Server-side verification of payment state before success feedback",
    ],
  },
];

export interface SkillGroup {
  title: string;
  blurb?: string;
  skills: string[];
}

/** Skills evidenced by this repo, shipped products, or documented case studies. */
export const skillMatrix: SkillGroup[] = [
  {
    title: "Frontend",
    skills: [
      "JavaScript / ES6+",
      "TypeScript",
      "React",
      "Semantic HTML",
      "CSS (Tailwind v4, design tokens)",
      "Responsive layouts",
      "Framer Motion",
    ],
  },
  {
    title: "Product quality",
    skills: [
      "Accessibility (WCAG AA contrast)",
      "Keyboard & focus states",
      "Form validation & error handling",
      "Loading / error / empty states",
      "Cross-browser & viewport testing",
      "Performance awareness (images, lazy loading)",
    ],
  },
  {
    title: "Systems",
    skills: [
      "Component architecture",
      "Design tokens",
      "State modeling (React hooks & context)",
      "REST-style API integration (Convex functions)",
      "Data flows & typed contracts",
    ],
  },
  {
    title: "Delivery",
    skills: [
      "Git & GitHub",
      "Code review via PRs",
      "Deployment (Vercel)",
      "CI checks (typecheck + e2e)",
      "DevTools debugging",
    ],
  },
];

/** Not yet demonstrated — kept honest and separated. */
export const buildingNext: string[] = [
  "SCSS tooling on top of vanilla CSS",
  "Unit/integration tests alongside the e2e suite (Vitest is installed)",
  "Relational schema design against production SQL (PostgreSQL fundamentals studied)",
  "Auth flows end-to-end: sessions, RBAC, progressive KYC patterns",
  "Production observability: structured logging and uptime alerting",
];

/** Where these gaps are being closed, stated plainly. */
export const buildingNextNote =
  "Listed here rather than claimed above — the plan is to close each gap in the open and document it as it lands.";

export const collaborationPoints = [
  "Design background means I read Figma intent, not just redlines — fewer back-and-forths.",
  "I translate requirements into acceptance criteria before writing code.",
  "Comfortable pairing with backend engineers on contracts, and with QA on repro steps.",
];
