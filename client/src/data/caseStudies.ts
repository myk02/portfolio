export type StudyKind = "LIVE PRODUCT" | "CONCEPTUAL";

export interface InsightCallout {
  quote: string;
  source: string;
}

export interface CaseSection {
  lead?: string;
  paragraphs?: string[];
  bullets?: { label?: string; text: string }[];
  callouts?: InsightCallout[];
}

export interface OutcomeDelta {
  metric: string;
  value: string;
  note: string;
}

/** Engineering notes for shipped products — production evidence only. */
export interface EngineeringNotes {
  architecture: string[];
  stateForms?: string[];
  dataIntegration?: string[];
  qualityChecks?: string[];
  deliveryFollowUp?: string[];
}

/** Proposed (not built) implementation detail — reserved for future studies. */
export interface ProposedSection {
  heading: string;
  points: string[];
}

export type StudyArt = "kenyatrace" | "gigi" | "legalflow";

export interface CaseStudy {
  slug: string;
  name: string;
  year: string;
  kind: StudyKind;
  tagline: string;
  summary: string;
  methods: string[];
  role: string;
  timeline: string;
  tools: string[];
  status: string;
  liveUrl?: string;
  liveUrlLabel?: string;
  /** Compact technical metadata shown on cards + case-study heroes. */
  stack: string[];
  challenge: string;
  scope: string;
  constraints: string[];
  outcomeLine: string;
  art: StudyArt;
  image?: string;
  tileLine: string;
  tileBadge: string;
  heroCaption: string;
  problem: { lead: string; paragraphs?: string[] };
  research: CaseSection;
  designThinking: CaseSection;
  ia: CaseSection;
  design: CaseSection;
  testing: CaseSection;
  outcomes: OutcomeDelta[];
  outcomeDetail: string;
  lessons: string[];
  /** Live products only — what was actually engineered. */
  engineeringNotes?: EngineeringNotes;
}

/* -------------------------------------------------------------------------
   LegalFlow (SaaS legal-practice management) joins this list once its public
   URL is reachable and role/status are confirmed. Template:

   {
     slug: "legalflow",
     name: "LegalFlow",
     year: "2026",
     kind: "LIVE PRODUCT",
     tagline: "…",
     stack: […],
     challenge: "…",
     …
   }
   Also add: visuals in caseVisuals.ts, journeys in caseJourneys.ts,
   TILE_ART in BrandEdgeWork.tsx ("legalflow" key already supported), and a
   screenshots set in client/public/shots/legalflow/.
-------------------------------------------------------------------------- */

export const caseStudies: CaseStudy[] = [
  {
    slug: "kenyatrace",
    name: "KenyaTrace",
    year: "2024",
    kind: "LIVE PRODUCT",
    tagline:
      "A tourism explorer — research and IA for planning multi-stop trips across Kenya.",
    summary:
      "User research, IA, and interactive prototypes for multi-stop trips — shipped.",
    methods: [
      "User Research",
      "Information Architecture",
      "Interactive Prototyping",
      "Usability Testing",
    ],
    role: "Research · IA · UI & frontend build",
    timeline: "5 weeks",
    tools: ["Figma", "FigJam", "Notion"],
    status: "Live production · 2024",
    liveUrl: "https://kenyatrace.vercel.app",
    liveUrlLabel: "kenyatrace.vercel.app",
    stack: ["Mobile-first web app", "Vercel"],
    challenge: "Make multi-stop trip planning usable on a phone over 3G.",
    scope: "Research → IA → hi-fi UI → route builder → shipped web product",
    constraints: [
      "3G connections and low-end Android phones are the norm",
      "Planning content scattered across ~10 county sites",
      "Solo team, 5-week build window",
    ],
    outcomeLine:
      "Live at kenyatrace.vercel.app — route planning cut from 6 interactions to 3 after test round 1.",
    art: "kenyatrace",
    image: "/thumbnails/kenya-tourism.png",
    tileLine: "Route planner. List-first on 3G.",
    tileBadge: "Live · 6 → 3 taps",
    heroCaption: "Live product — screens shown are from the shipped platform.",
    problem: {
      lead: "Planning a Kenya trip means juggling ten county sites that don't talk to each other.",
    },
    research: {
      lead: "12 interviews · 34-survey · competitive audit.",
      callouts: [
        {
          quote:
            "I ended up with 14 tabs open and a PDF from my cousin. That was the plan.",
          source: "Interviewee, 27 · Nairobi",
        },
      ],
      bullets: [
        {
          label: "Planning is the product",
          text: "The core job: assembling a multi-stop itinerary.",
        },
        {
          label: "Mobile reality",
          text: "Most planning happens on phones, often on 3G.",
        },
        {
          label: "Trust gap",
          text: "People trust people, not county tourism copy.",
        },
      ],
    },
    designThinking: {
      lead: "Map-first was the obvious answer. Research said list-first.",
      bullets: [
        {
          label: "Kept",
          text: "List-first with progressive loading — fast on 3G.",
        },
        { label: "Kept", text: "Route builder → day-by-day, shareable plan." },
        {
          label: "Rejected",
          text: "Map-only planning — failed the connectivity reality.",
        },
      ],
    },
    ia: {
      lead: "County → destination → experiences. Route builder at the center.",
      bullets: [
        { label: "Browse", text: "Three predictable levels." },
        { label: "Build", text: "Add stops, reorder, set days per stop." },
        { label: "Share", text: "One link carries the whole itinerary." },
      ],
    },
    design: {
      lead: "Mobile-first, editorial photography, one accent.",
    },
    testing: {
      lead: "Five tests on the route builder — one fatal flaw found.",
    },
    outcomes: [
      {
        metric: "Route planning",
        value: "6 interactions → 3",
        note: "inline stop-add after test round 1",
      },
      {
        metric: "Itinerary share",
        value: "1 link",
        note: "replaces PDF + WhatsApp-chain workflow",
      },
      {
        metric: "Mobile parity",
        value: "100%",
        note: "all planning tasks usable on a 360px viewport",
      },
    ],
    outcomeDetail:
      "Live at kenyatrace.vercel.app — interaction counts measured in pre-launch tests.",
    lessons: [
      "Field reality outranks portfolio logic — map-first was wrong for users on 3G.",
      "Research-first IA survived contact with real planning behavior.",
      "Watch task abandonment, not just completion.",
    ],
    engineeringNotes: {
      architecture: [
        "List-first IA: county → destination → experience, three predictable levels instead of a map-first maze.",
        "The route builder is one ordered-stops model; day counts, ordering, and the shareable plan all derive from it.",
        "A single card grammar is reused across destinations, stays, and events — one component pattern, three content types.",
      ],
      stateForms: [
        "Add / reorder / days-per-stop live in one client-side route state, so no screen can fall out of sync.",
        "Round-1 testing caught the fatal flow: adding a stop left the route screen. Inline add-stop kept context and cut 6 interactions to 3.",
      ],
      dataIntegration: [
        "Progressive loading: text lists render first, heavy imagery trails behind — the 3G decision that killed map-first.",
        "Itinerary sharing encodes the plan in one link — no accounts, no PDF exports.",
      ],
      qualityChecks: [
        "Every planning task verified usable at 360px width — phone parity was an exit criterion, not an afterthought.",
        "Interaction counts measured before and after each usability round, so improvements were counted, not felt.",
      ],
      deliveryFollowUp: [
        "Deployed on Vercel; post-launch fixes driven by real planning behavior rather than internal opinion.",
        "Queued next: offline itineraries and trip templates (see roadmap).",
      ],
    },
  },
  {
    slug: "gigi-energy",
    name: "GiGi Energy Drink",
    year: "2025",
    kind: "LIVE PRODUCT",
    tagline:
      "E-commerce UI for a Nairobi-made energy drink — bold, accessible, streamlined.",
    summary:
      "UI for a Nairobi-made energy drink — bold brand, AA palette, 4 → 3 checkout.",
    methods: [
      "UI Design",
      "Analytics Review",
      "Checkout Flows",
      "Accessibility Audit",
    ],
    role: "UI engineering · conversion flows",
    timeline: "4 weeks",
    tools: ["Figma", "GA4"],
    status: "Live production · 2025",
    liveUrl: "https://gigiflavours.vercel.app/",
    liveUrlLabel: "gigiflavours.vercel.app",
    stack: ["Web storefront", "GA4 analytics", "Vercel", "M-Pesa + card checkout"],
    challenge: "Keep a loud brand legible and stop shoppers leaking at checkout.",
    scope: "Analytics review → AA palette rework → checkout redesign → launch support",
    constraints: [
      "Brand palette measured at 2.1:1 contrast in places",
      "Existing funnel halved between add-to-cart and payment",
      "M-Pesa is the majority payment method — card-first was wrong",
    ],
    outcomeLine:
      "Live storefront — checkout merged 4 steps to 3 and every text surface moved from 2.1:1 to AA contrast.",
    art: "gigi",
    image: "/thumbnails/gigi-energy.png",
    tileLine: "Checkout rebuilt. M-Pesa first.",
    tileBadge: "Live · 4 → 3 steps",
    heroCaption: "Live product — the shipped storefront.",
    problem: {
      lead: "A loud brand and a quiet leak — shoppers added cans, then vanished.",
    },
    research: {
      lead: "GA4 review · five-store audit.",
      bullets: [
        { label: "Funnel leak", text: "Funnel halves at address + payment." },
        { label: "Legibility", text: "Orange-on-pink text: 2.1:1 contrast." },
        {
          label: "Youth pattern",
          text: "Competitors: one-page checkout, M-Pesa first.",
        },
      ],
    },
    designThinking: {
      lead: "Keep the energy, fix the legibility.",
      bullets: [
        {
          label: "Palette",
          text: "Every brand color remapped onto AA surfaces.",
        },
        { label: "Checkout", text: "4 → 3 steps: address + delivery merged." },
        {
          label: "Payment",
          text: "M-Pesa first — 80% of shoppers already use it.",
        },
      ],
    },
    ia: {
      lead: "Three-step checkout, brand-first storefront.",
      bullets: [
        { label: "Browse", text: "Flavour-led product cards." },
        { label: "Buy", text: "Cart → details & delivery → M-Pesa or card." },
        { label: "Trust", text: "Estimate + security at the final tap." },
      ],
    },
    design: {
      lead: "Bold type as the interface; color as the flavor system.",
    },
    testing: {
      lead: "Usability pass, five mobile users.",
    },
    outcomes: [
      {
        metric: "Checkout",
        value: "4 → 3 steps",
        note: "address + delivery merged",
      },
      {
        metric: "Contrast",
        value: "2.1:1 → ≥4.5:1",
        note: "AA on all text, brand intact",
      },
      {
        metric: "Payment order",
        value: "M-Pesa first",
        note: "matches the majority purchase pattern",
      },
    ],
    outcomeDetail:
      "Live at gigiflavours.vercel.app — funnel tracked in GA4 post-launch.",
    lessons: [
      "Accessibility on a loud brand made the system better.",
      "It was a form problem, not a checkout problem.",
      "Payment order follows purchase behavior, not processing preference.",
    ],
    engineeringNotes: {
      architecture: [
        "Storefront rebuilt around flavour-led product cards; cart → details & delivery → payment reads as one continuous flow.",
        "Address and delivery merged into a single step — fewer form walls, same data captured.",
      ],
      stateForms: [
        "Checkout forms validate inline before payment, so errors surface at the field, not after submission.",
        "Cart state persists across the three steps; delivery estimate and security cues appear at the final tap where they change decisions.",
      ],
      dataIntegration: [
        "GA4 funnel tracking before and after relaunch made the leak measurable instead of anecdotal.",
        "Payment options ordered M-Pesa first to match how ~80% of shoppers already pay.",
      ],
      qualityChecks: [
        "Contrast audit run against WCAG AA — every brand color remapped onto dark containers rather than dimmed per use.",
        "Usability pass with five mobile users on the merged checkout before launch.",
      ],
      deliveryFollowUp: [
        "Live at gigiflavours.vercel.app with funnel tracked post-launch in GA4.",
        "Next candidates: promo codes, stock alerts, loyalty points.",
      ],
    },
  },
];

export const skillMarquee = [
  "TypeScript",
  "React 19",
  "Tailwind CSS v4",
  "Vite",
  "Convex",
  "Playwright e2e",
  "REST APIs",
  "Git & GitHub",
  "Vercel",
  "Accessibility",
];
