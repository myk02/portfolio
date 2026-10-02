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
    tagline: "Tourism explorer — multi-stop trip planning, list-first for slow networks.",
    outcomeTitle: "A multi-stop Kenya trip planner concept.",
    tileBadge: "Frontend demo",
    role: "Product concept · Frontend build",
    timeline: "5 weeks",
    liveUrl: "https://kenyatrace.vercel.app",
    repoUrl: "https://github.com/myk02/tourist-showcase",
    stack: ["React", "Vite", "Vercel"],
    constraints: ["Slow networks + low-end Android", "Solo · 5 weeks"],
    outcomeLine: "A list-first demo for planning multi-stop trips.",
    tileShot: "/shots/kenyatrace/home-cards-desktop.webp",
    tileShotAlt: "KenyaTrace destination cards on desktop",
    context:
      "County tourism sites each market a single destination. Nothing connects them into one multi-stop trip.",
    ownership: [
      "Researched the planning flow with interviews and surveys",
      "Designed a list-first layout with progressive loading for slow networks",
      "Built the route planner UI with inline add-stop and shareable links",
    ],
    problemLead: "Explore how a multi-stop Kenya trip could be planned in one place.",
    researchLead: "Concept build · frontend only.",
    ordeal:
      "The first instinct was map-first. On slow phones it struggled, so the plan moved to list-first with progressive loading — and the route builder moved inline so adding a stop keeps context on one screen.",
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
    validateBefore: "Adding a stop left the route screen",
    validateAfter: "Inline add-stop keeps context on one screen",
    metricCards: [
      {
        label: "Route planning",
        value: "Fewer steps",
        baseline: "separate route screen",
        result: "inline add-stop",
        direction: "down",
        tone: "neutral",
        note: "Design change — interaction counts not formally measured",
      },
      {
        label: "Itinerary sharing",
        value: "One link",
        baseline: "manual copy-paste",
        result: "shareable URL",
        direction: "down",
        tone: "neutral",
        note: "One URL carries the multi-stop plan",
      },
      {
        label: "Mobile layout",
        value: "Responsive",
        baseline: "desktop-first",
        result: "works at 360px",
        direction: "up",
        tone: "neutral",
        note: "Layout verified at small viewports",
      },
    ],
    lessons: [
      "Field reality beats portfolio logic.",
      "List-first held up on slow networks.",
      "Watch abandonment, not just completion.",
    ],
    hero: {
      src: "/shots/kenyatrace/plan-desktop.webp",
      alt: "KenyaTrace route planner — inline add-stop",
      caption: "Plan screen — kenyatrace.vercel.app",
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
    tagline: "Nairobi energy drink — bold brand, simpler checkout.",
    outcomeTitle: "A clearer storefront and shorter checkout concept.",
    tileBadge: "Frontend demo",
    role: "UI design · Frontend build",
    timeline: "4 weeks",
    liveUrl: "https://gigiflavours.vercel.app",
    repoUrl: "https://github.com/myk02/drink-showcase",
    stack: ["React", "Vite", "Vercel"],
    constraints: ["Low-contrast brand palette", "Checkout drop-off", "Mobile shoppers"],
    outcomeLine: "A storefront concept with a simpler checkout flow.",
    tileShot: "/shots/gigi-energy/home-products-desktop.webp",
    tileShotAlt: "GiGi Energy product grid on desktop",
    context:
      "A storefront concept for a Nairobi energy drink brand, with a short mobile checkout flow.",
    ownership: [
      "Reviewed the funnel and comparable stores",
      "Adjusted the palette toward readable contrast without losing the brand",
      "Rebuilt checkout with fewer steps, mobile-money-friendly order",
    ],
    problemLead: "Explore a clearer mobile storefront and shorter checkout.",
    researchLead: "Concept build · checkout is not connected to payment processing.",
    ordeal:
      "Two problems stacked: low-contrast text that was hard to read, and a multi-step checkout that lost people at address and payment. The fix merged address and delivery into one form and ordered payment options for how shoppers actually pay.",
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
    validateBefore: "Multi-step checkout — drop-off at address + payment",
    validateAfter: "Fewer steps, mobile-money-friendly order",
    metricCards: [
      {
        label: "Checkout",
        value: "Fewer steps",
        baseline: "separate address + delivery",
        result: "merged form",
        direction: "down",
        tone: "neutral",
        note: "Address and delivery merged — conversion not formally measured",
      },
      {
        label: "Text contrast",
        value: "Improved",
        baseline: "low-contrast text",
        result: "darker containers",
        direction: "up",
        tone: "neutral",
        note: "Brand palette kept, moved onto darker surfaces; no lab audit logged",
      },
      {
        label: "Payment order",
        value: "Mobile money first",
        baseline: "card first",
        result: "matches local habits",
        direction: "flat",
        tone: "neutral",
        note: "Order follows buying habits; no live payment integration in this build",
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
      "Practice site for Kenyan law firms — matters, documents, billing explained in one place.",
    outcomeTitle: "A legal practice workspace concept for matters and billing.",
    tileBadge: "Frontend demo",
    role: "Workflow concept · Frontend build",
    timeline: "7 weeks",
    liveUrl: "https://law-ten-iota.vercel.app",
    repoUrl: "https://github.com/myk02/legalflow-showcase",
    stack: ["React", "Vite", "Vercel"],
    constraints: ["Kenyan small firms", "Mobile-first field use", "Solo build"],
    outcomeLine: "A workspace concept that connects matters and billing.",
    tileShot: "/shots/legalflow/home-features-desktop.webp",
    tileShotAlt: "LegalFlow feature bands for matters, billing, and clients",
    context:
      "Kenyan solo and small firms run client work across spreadsheets, email, and WhatsApp. Nothing connects intake to billing.",
    ownership: [
      "Mapped the intake-to-billing loop from conversations with small firms",
      "Designed one workspace around a unified matter record",
      "Built mobile-first, responsive from 390px up",
    ],
    problemLead: "Explore how a small legal practice might connect client work and billing.",
    researchLead: "Concept build · no live matter data, billing or payments.",
    ordeal:
      "Disconnected tools meant billing trailed the work and context lived in chat threads. The response was a single workspace concept where invoices and payments follow matter status — usable on the phone in the field.",
    decisions: [
      { label: "Kept", text: "Unified matter + client record." },
      { label: "Kept", text: "Billing tied to matter status." },
      { label: "Cut", text: "Separate doc/email silos." },
    ],
    validateBefore: "Disconnected tools — billing trails the work",
    validateAfter: "One workspace story — intake, matter, billing linked",
    metricCards: [
      {
        label: "Tools",
        value: "One place",
        baseline: "spreadsheets + email + chat",
        result: "matter + client + billing together",
        direction: "down",
        tone: "neutral",
        note: "Concept grouping, not a measured migration",
      },
      {
        label: "Billing",
        value: "Matter-linked",
        baseline: "manual invoices",
        result: "invoices tied to matters",
        direction: "flat",
        tone: "neutral",
        note: "No live payment integration in this build",
      },
      {
        label: "Reach",
        value: "Mobile-first web",
        baseline: "office only",
        result: "usable at 390px",
        direction: "up",
        tone: "neutral",
        note: "Responsive web — not an installable PWA",
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
