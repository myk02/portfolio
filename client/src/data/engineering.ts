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
  /** Explicit provenance label rendered on the card. Never a generic "verified". */
  sourceLabel?: string;
}

export const engineeringIntro =
  "Proof over promises — every claim below is visible in this site's own code.";

export const evidenceCards: EvidenceCard[] = [
  {
    id: "frontend",
    title: "Frontend",
    points: [
      "React 19 + TypeScript on every route",
      "Semantic landmarks, focus states, responsive from 360px",
      "One token set drives all components",
    ],
  },
  {
    id: "apis-data",
    title: "APIs & data",
    points: [
      "Convex functions power the contact form end-to-end",
      "Paystack payments verified server-side before success",
      "Typed calls with loading / error / success states",
    ],
  },
  {
    id: "testing-quality",
    title: "Testing & quality",
    points: [
      "Playwright e2e suite covers routes, CTAs, forms, 404",
      "tsc typecheck gate; keyboard paths tested",
      "Animations respect reduced motion",
    ],
  },
  {
    id: "debugging-delivery",
    title: "Delivery",
    points: [
      "Git → reviewed PRs → auto-deploy on Vercel",
      "Per-route titles, canonical URLs, OG tags maintained",
      "WebP images, lazy loading, no layout shift",
    ],
  },
  {
    id: "accessibility-security",
    title: "Accessibility & security",
    points: [
      "WCAG AA contrast targets on shipped brand palettes",
      "Labelled inputs, role=alert errors, aria-wired toggles",
      "No secrets client-side; payments in hosted flow",
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

/**
 * Second capability row — the broader LinkedIn profile beyond frontend.
 * Each card states its own evidence source; nothing here is claimed as
 * repo-verified unless it can be inspected in this codebase.
 */
export const capabilityCards: EvidenceCard[] = [
  {
    id: "apis-integrations",
    title: "APIs & integrations",
    sourceLabel: "Verified in this repo",
    points: [
      "Typed Convex functions power this site's contact form and donations end-to-end",
      "Paystack checkout initialized client-side, verified server-side before success feedback",
      "Failure paths handled explicitly — user-facing errors, never silent catch blocks",
    ],
  },
  {
    id: "automation",
    title: "Automation & workflows",
    sourceLabel: "Professional experience",
    points: [
      "n8n workflows built for lead qualification, invoice processing, ticket classification, reporting, and social scheduling",
      "Workflow specs exported and versioned as JSON in this repository (client/public/workflows)",
      "Focus on dependable triggers and clear failure behavior over clever one-offs",
    ],
  },
  {
    id: "saas-product",
    title: "SaaS & product development",
    sourceLabel: "Professional experience",
    points: [
      "Multi-step product flows shipped live: browse → cart → payment; plan → build → share",
      "Forms, operational states (loading / error / empty), and role-aware screens designed and implemented",
      "A legal-practice SaaS project is in documentation — details published once confirmed",
    ],
  },
  {
    id: "support",
    title: "Technical support & troubleshooting",
    sourceLabel: "Professional experience",
    points: [
      "Helpdesk and IT support: hardware/software faults, account issues, AV setup — logged in Jira for a clear record",
      "Website management: uptime monitoring, page-speed fixes, scheduled patching",
      "Root-cause habit carried into engineering: reproduce, isolate in DevTools, fix the cause, verify",
    ],
  },
  {
    id: "security-minded",
    title: "Security-minded implementation",
    sourceLabel: "Verified in this repo",
    points: [
      "Payments delegated to Paystack's hosted flow; transaction state verified server-side before UI confirms success",
      "No secrets bundled client-side; keys stay in environment/server configuration",
      "Input validation with explicit error states; auth/RBAC patterns listed under Building next until shipped",
    ],
  },
  {
    id: "network-support",
    title: "Network & infrastructure support",
    sourceLabel: "Professional experience",
    points: [
      "LAN/WAN troubleshooting, DNS/DHCP and Wi-Fi fault-finding for home and small-office setups",
      "Security checks, patch schedules, and backups that are actually tested",
    ],
  },
];
