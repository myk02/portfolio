import type { MetricCardData } from "@/components/artifacts/MetricCard";

export interface Shot {
  name: string;
  alt: string;
  caption: string;
  src: string;
}

export interface Decision {
  label?: string;
  text: string;
  shot?: string;
  alt?: string;
}

/**
 * Single source of truth for shipped work. One record feeds the tile,
 * the hero feature, and the case study — a tile can never drift from
 * its case page.
 *
 * Screens rule: tileShot, hero.src, every decision shot, and every
 * gallery src must be unique within a project. Gallery holds leftover
 * screens only, never the hero or tile.
 */
export interface Project {
  slug: string;
  name: string;
  year: string;
  tagline: string;
  /** Matej formula: outcome in the title, not just the product name. */
  outcomeTitle: string;
  tileBadge: string;
  /** Active verbs — what was personally owned. */
  role: string;
  timeline: string;
  liveUrl?: string;
  repoUrl?: string;
  stack: string[];
  constraints: string[];
  outcomeLine: string;
  tileShot: string;
  tileShotAlt: string;
  /** 1–2 sentences: the world before this work existed. */
  context: string;
  /** 3 bullets, active verbs. */
  ownership: string[];
  problemLead: string;
  researchLead: string;
  /** 2–4 sentences: the moment the plan broke. Strictly sourced from the research/design notes. */
  ordeal: string;
  decisions: Decision[];
  validateBefore: string;
  validateAfter: string;
  metricCards: MetricCardData[];
  lessons: string[];
  hero: {
    src: string;
    alt: string;
    caption: string;
  };
  screens: Shot[];
  buildNotes?: {
    architecture: string[];
    build?: string[];
    quality?: string[];
  };
}

export const projects: Project[] = [
  {
    slug: "kenyatrace",
    name: "KenyaTrace",
    year: "2024",
    tagline: "Tourism explorer — plan multi-stop trips on 3G.",
    outcomeTitle: "Multi-stop trip planning in 3 taps on 3G.",
    tileBadge: "Live · 6 → 3 taps",
    role: "Research · IA · UI build",
    timeline: "5 weeks",
    liveUrl: "https://kenyatrace.vercel.app",
    repoUrl: "https://github.com/myk02/tourist",
    stack: ["React", "Vercel"],
    constraints: ["3G + low-end Android", "~10 county sites", "Solo · 5 weeks"],
    outcomeLine: "Route 6→3 taps (tested).",
    tileShot: "/shots/kenyatrace/home-cards-desktop.webp",
    tileShotAlt: "KenyaTrace destination cards on desktop",
    context:
      "County tourism sites each market a single destination. Nothing connects ten county sites into one multi-stop trip.",
    ownership: [
      "Researched the planning flow with 12 interviews and 34 surveys",
      "Designed a list-first IA with progressive loading for 3G",
      "Built the route planner UI with inline add-stop and shareable links",
    ],
    problemLead: "Ten county sites, one trip — nothing connects.",
    researchLead: "12 interviews · 34 surveys.",
    ordeal:
      "The first instinct was map-first. On 3G phones it failed, so the plan broke toward list-first with progressive loading — and the route builder moved inline, cutting the core flow from six interactions to three.",
    decisions: [
      {
        label: "Kept",
        text: "List-first, progressive loading.",
      },
      {
        label: "Kept",
        text: "Route builder → shareable link.",
        shot: "/shots/kenyatrace/trips-desktop.webp",
        alt: "KenyaTrace saved trips with a shareable link",
      },
      {
        label: "Cut",
        text: "Map-only — fails on 3G.",
        shot: "/shots/kenyatrace/stays-desktop.webp",
        alt: "KenyaTrace stays listing instead of a map-first home",
      },
    ],
    validateBefore: "Adding a stop left the route screen — 6 interactions",
    validateAfter: "Inline add-stop — 3 interactions, most-used task",
    metricCards: [
      {
        label: "Route planning",
        value: "6 → 3 interactions",
        baseline: "6 interactions",
        result: "3 interactions",
        direction: "down",
        tone: "positive",
        note: "Inline add-stop, measured in moderated tests",
      },
      {
        label: "Itinerary sharing",
        value: "PDF chain → 1 link",
        baseline: "PDF + WhatsApp",
        result: "1 link",
        direction: "down",
        tone: "positive",
        note: "One URL carries the whole multi-stop plan",
      },
      {
        label: "Mobile parity",
        value: "100%",
        baseline: "partial",
        result: "every task at 360px",
        direction: "up",
        tone: "positive",
        note: "Planning works on the phones people actually use",
      },
    ],
    lessons: [
      "Field reality > portfolio logic.",
      "Research-first IA held up.",
      "Watch abandonment, not just completion.",
    ],
    hero: {
      src: "/shots/kenyatrace/plan-desktop.webp",
      alt: "KenyaTrace route planner — inline add-stop",
      caption: "Plan — the 6→3 interaction on kenyatrace.vercel.app",
    },
    screens: [
      {
        name: "Home in full",
        alt: "KenyaTrace home page scrolled, showing cards and planner entry",
        caption: "Home in full — the same list-first cards as the tile, scrolled.",
        src: "/shots/kenyatrace/home-scroll-desktop.webp",
      },
    ],
    buildNotes: {
      architecture: ["List-first IA, one ordered-stops model."],
      build: [
        "Inline add-stop kept context, 6→3.",
        "Progressive loading for 3G; 1-link share.",
      ],
      quality: ["Verified at 360px; counted interactions."],
    },
  },
  {
    slug: "gigi-energy",
    name: "GiGi Energy Drink",
    year: "2025",
    tagline: "Nairobi energy drink — bold brand, accessible, 4→3 checkout.",
    outcomeTitle: "Checkout 4→3, M-Pesa first, AA contrast.",
    tileBadge: "Live · 4 → 3 steps",
    role: "UI engineering · flows",
    timeline: "4 weeks",
    liveUrl: "https://gigiflavours.vercel.app",
    repoUrl: "https://github.com/myk02/drink",
    stack: ["React", "Vercel", "M-Pesa"],
    constraints: ["2.1:1 contrast", "Funnel halved at payment", "M-Pesa majority"],
    outcomeLine: "4→3 steps, AA — live.",
    tileShot: "/shots/gigi-energy/home-products-desktop.webp",
    tileShotAlt: "GiGi Energy product grid on desktop",
    context:
      "A Nairobi energy drink with a bold brand. Shoppers added cans, then vanished at checkout — the funnel halved at payment.",
    ownership: [
      "Audited the funnel with GA4 and a 5-store review",
      "Remapped the palette to AA contrast without losing the brand",
      "Rebuilt checkout from four steps to three, M-Pesa first",
    ],
    problemLead: "Shoppers added cans, then vanished at checkout.",
    researchLead: "GA4 + 5-store audit.",
    ordeal:
      "Two problems stacked: text at 2.1:1 contrast nobody could read, and a four-step checkout that halved at address and payment. The fix merged address and delivery into one form and put M-Pesa first, matching how shoppers actually pay.",
    decisions: [
      {
        label: "Palette",
        text: "Remapped to AA.",
        shot: "/shots/gigi-energy/flavours-desktop.webp",
        alt: "GiGi flavour cards with AA contrast",
      },
      {
        label: "Checkout",
        text: "4→3 merged.",
        shot: "/shots/gigi-energy/home-scroll-desktop.webp",
        alt: "GiGi buy section after checkout merge",
      },
      {
        label: "Pay",
        text: "M-Pesa first.",
      },
    ],
    validateBefore: "4-step checkout — funnel halves at address + payment",
    validateAfter: "3 steps, M-Pesa first — matches 80% of shoppers",
    metricCards: [
      {
        label: "Checkout",
        value: "4 → 3 steps",
        baseline: "4 steps",
        result: "3 steps",
        direction: "down",
        tone: "positive",
        note: "Address and delivery merged into one continuous form",
      },
      {
        label: "Text contrast",
        value: "2.1:1 → ≥4.5:1",
        baseline: "2.1:1",
        result: "AA on all text",
        direction: "up",
        tone: "positive",
        note: "Brand palette intact, moved onto dark containers",
      },
      {
        label: "Payment order",
        value: "M-Pesa first",
        baseline: "card first",
        result: "matches ~80% of shoppers",
        direction: "flat",
        tone: "positive",
        note: "Payment order follows purchase behaviour, not processing preference",
      },
    ],
    lessons: [
      "AA made the system better.",
      "Form problem, not checkout.",
      "Pay follows behavior.",
    ],
    hero: {
      src: "/shots/gigi-energy/home-desktop.webp",
      alt: "GiGi Energy storefront on desktop",
      caption: "Shipped storefront — gigiflavours.vercel.app",
    },
    screens: [
      {
        name: "Events",
        alt: "GiGi Energy events and brand surfaces",
        caption: "Events and brand surfaces supporting the store.",
        src: "/shots/gigi-energy/events-desktop.webp",
      },
    ],
    buildNotes: {
      architecture: ["Flavour cards; 3-step flow."],
      build: [
        "Inline validation; cart persists.",
        "GA4 before/after; M-Pesa first.",
      ],
      quality: ["AA audit; 5-user test."],
    },
  },
  {
    slug: "legalflow",
    name: "LegalFlow",
    year: "2025",
    tagline:
      "Practice management for Kenyan law firms — matters, documents, billing, payments in one place.",
    outcomeTitle: "Matters, billing, and M-Pesa in one mobile workspace.",
    tileBadge: "Live · one workspace",
    role: "Product · UX · Build",
    timeline: "7 weeks",
    liveUrl: "https://law-ten-iota.vercel.app",
    repoUrl: "https://github.com/myk02/legalflow",
    stack: ["React", "Vercel", "PWA"],
    constraints: ["Kenyan small firms", "Mobile-first field use", "Solo + team workspaces"],
    outcomeLine: "One workspace — intake → billing → payments.",
    tileShot: "/shots/legalflow/home-features-desktop.webp",
    tileShotAlt: "LegalFlow feature bands for matters, billing, and clients",
    context:
      "Kenyan solo and small firms run client work across spreadsheets, email, and WhatsApp. Nothing connects intake to billing.",
    ownership: [
      "Mapped the intake-to-billing loop with solo and small-firm interviews",
      "Designed one workspace around a unified matter record",
      "Built mobile-first with installable PWA support",
    ],
    problemLead:
      "Client work lived in spreadsheets, email, and WhatsApp — nothing connected.",
    researchLead: "Solo + small-firm interviews; mapped the intake→billing loop.",
    ordeal:
      "Five disconnected tools meant billing trailed the work and context lived in chat threads. The call was a single workspace where invoices and M-Pesa payments follow matter status — usable on the phone in the field.",
    decisions: [
      { label: "Kept", text: "Unified matter + client record." },
      { label: "Kept", text: "Billing tied to matter status." },
      { label: "Cut", text: "Separate doc/email silos." },
    ],
    validateBefore: "Five disconnected tools — billing trailed the work",
    validateAfter: "One workspace — intake, matter, billing, payments linked",
    metricCards: [
      {
        label: "Tools",
        value: "Spreadsheets → one app",
        baseline: "spreadsheets + email + WhatsApp",
        result: "matter + client + billing in one place",
        direction: "down",
        tone: "positive",
        note: "Centralised records replace disconnected tools (qualitative)",
      },
      {
        label: "Billing",
        value: "Matter-linked",
        baseline: "manual invoices",
        result: "invoices + M-Pesa in-app",
        direction: "flat",
        tone: "positive",
        note: "Payment follows matter status, not a separate ledger",
      },
      {
        label: "Reach",
        value: "Mobile-first PWA",
        baseline: "office only",
        result: "works in the field",
        direction: "up",
        tone: "positive",
        note: "Installable, usable on 390px — how firms actually work",
      },
    ],
    lessons: [
      "One record beats five tools.",
      "Billing must follow matter status.",
      "Mobile-first is how firms actually work.",
    ],
    hero: {
      src: "/shots/legalflow/home-desktop.webp",
      alt: "LegalFlow workspace on desktop",
      caption: "Shipped marketing home — law-ten-iota.vercel.app",
    },
    screens: [
      {
        name: "Workspace",
        alt: "LegalFlow workspace bands",
        caption: "Product story on the live site — matters, tasks, and deadlines together.",
        src: "/shots/legalflow/home-scroll-desktop.webp",
      },
    ],
    buildNotes: {
      architecture: ["Unified matter model; client record as the spine."],
      build: [
        "Intake → matter conversion keeps context.",
        "Invoicing + M-Pesa payments linked to matters.",
      ],
      quality: ["Verified at 390px; PWA installable."],
    },
  },
];

export const liveStudies = projects;
export const liveCount = projects.length;
