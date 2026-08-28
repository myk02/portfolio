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

/** Engineering notes — keep to 4 bullets max (employer scans) */
export interface EngineeringNotes {
  architecture: string[];
  stateForms?: string[];
  dataIntegration?: string[];
  qualityChecks?: string[];
  deliveryFollowUp?: string[];
}

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
  engineeringNotes?: EngineeringNotes;
}

/* LegalFlow — live SaaS, visuals captured from https://law-ten-iota.vercel.app */

export const caseStudies: CaseStudy[] = [
  {
    slug: "kenyatrace",
    name: "KenyaTrace",
    year: "2024",
    kind: "LIVE PRODUCT",
    tagline: "Tourism explorer — plan multi-stop trips on 3G.",
    summary: "Research + IA for multi-stop trips — shipped.",
    methods: ["Research", "IA", "Prototyping", "Testing"],
    role: "Research · IA · UI build",
    timeline: "5 weeks",
    tools: ["Figma"],
    status: "Live · 2024",
    liveUrl: "https://kenyatrace.vercel.app",
    liveUrlLabel: "kenyatrace.vercel.app",
    stack: ["React", "Vercel"],
    challenge: "Usable multi-stop planning on 3G phones.",
    scope: "Research → shipped in 5 weeks",
    constraints: ["3G + low-end Android", "~10 county sites", "Solo · 5 weeks"],
    outcomeLine: "Route 6→3 taps (tested).",
    art: "kenyatrace",
    image: "/thumbnails/kenya-tourism.png",
    tileLine: "Route planner — list-first on 3G.",
    tileBadge: "Live · 6 → 3 taps",
    heroCaption: "Live product — shipped screens.",
    problem: {
      lead: "Ten county sites, one trip — nothing connects.",
    },
    research: {
      lead: "12 interviews · 34 surveys.",
      callouts: [
        {
          quote: "I ended up with 14 tabs open and a PDF from my cousin.",
          source: "Nairobi, 27",
        },
      ],
      bullets: [
        { label: "Job", text: "Assemble a multi-stop itinerary." },
        { label: "Mobile", text: "Planning on 3G phones." },
        { label: "Trust", text: "People > county copy." },
      ],
    },
    designThinking: {
      lead: "List-first, not map-first.",
      bullets: [
        { label: "Kept", text: "List-first, progressive loading." },
        { label: "Kept", text: "Route builder → shareable link." },
        { label: "Cut", text: "Map-only — fails on 3G." },
      ],
    },
    ia: {
      lead: "County → destination → experience.",
      bullets: [
        { label: "Browse", text: "3 levels." },
        { label: "Build", text: "Add · reorder · days." },
        { label: "Share", text: "1 link." },
      ],
    },
    design: {
      lead: "Mobile-first, one accent.",
    },
    testing: {
      lead: "5 tests — 1 fatal flaw fixed.",
    },
    outcomes: [
      { metric: "Route", value: "6 → 3", note: "inline add-stop" },
      { metric: "Share", value: "1 link", note: "replaces PDF chain" },
      { metric: "Mobile", value: "100%", note: "360px usable" },
    ],
    outcomeDetail: "Tested pre-launch.",
    lessons: [
      "Field reality > portfolio logic.",
      "Research-first IA held up.",
      "Watch abandonment, not just completion.",
    ],
    engineeringNotes: {
      architecture: ["List-first IA, one ordered-stops model."],
      stateForms: ["Inline add-stop kept context, 6→3."],
      dataIntegration: ["Progressive loading for 3G; 1-link share."],
      qualityChecks: ["Verified at 360px; counted interactions."],
    },
  },
  {
    slug: "gigi-energy",
    name: "GiGi Energy Drink",
    year: "2025",
    kind: "LIVE PRODUCT",
    tagline: "Nairobi energy drink — bold brand, accessible, 4→3 checkout.",
    summary: "Bold brand, AA palette, 4→3 checkout — shipped.",
    methods: ["UI", "Analytics", "Checkout", "A11y"],
    role: "UI engineering · flows",
    timeline: "4 weeks",
    tools: ["Figma", "GA4"],
    status: "Live · 2025",
    liveUrl: "https://gigiflavours.vercel.app/",
    liveUrlLabel: "gigiflavours.vercel.app",
    stack: ["React", "Vercel", "M-Pesa"],
    challenge: "Loud brand, leaking checkout.",
    scope: "Audit → AA palette → 4→3 checkout",
    constraints: ["2.1:1 contrast", "Funnel halved at payment", "M-Pesa majority"],
    outcomeLine: "4→3 steps, AA — live.",
    art: "gigi",
    image: "/thumbnails/gigi-energy.png",
    tileLine: "Checkout rebuilt — M-Pesa first.",
    tileBadge: "Live · 4 → 3 steps",
    heroCaption: "Live storefront.",
    problem: {
      lead: "Shoppers added cans, then vanished at checkout.",
    },
    research: {
      lead: "GA4 + 5-store audit.",
      bullets: [
        { label: "Leak", text: "Funnel halves at payment." },
        { label: "Legibility", text: "2.1:1 contrast." },
        { label: "Pattern", text: "One-page, M-Pesa first." },
      ],
    },
    designThinking: {
      lead: "Keep energy, fix legibility.",
      bullets: [
        { label: "Palette", text: "Remapped to AA." },
        { label: "Checkout", text: "4→3 merged." },
        { label: "Pay", text: "M-Pesa first." },
      ],
    },
    ia: {
      lead: "Browse → buy in 3 steps.",
      bullets: [
        { label: "Browse", text: "Flavour cards." },
        { label: "Buy", text: "Cart → delivery → pay." },
        { label: "Trust", text: "Estimate at final tap." },
      ],
    },
    design: {
      lead: "Bold type, color as flavor.",
    },
    testing: {
      lead: "5 mobile users.",
    },
    outcomes: [
      { metric: "Checkout", value: "4 → 3", note: "merged" },
      { metric: "Contrast", value: "2.1:1 → AA", note: "all text" },
      { metric: "Pay", value: "M-Pesa first", note: "80% pattern" },
    ],
    outcomeDetail: "Tracked in GA4.",
    lessons: ["AA made the system better.", "Form problem, not checkout.", "Pay follows behavior."],
    engineeringNotes: {
      architecture: ["Flavour cards; 3-step flow."],
      stateForms: ["Inline validation; cart persists."],
      dataIntegration: ["GA4 before/after; M-Pesa first."],
      qualityChecks: ["AA audit; 5-user test."],
    },
  },
  {
    slug: "legalflow",
    name: "LegalFlow",
    year: "2025",
    kind: "LIVE PRODUCT",
    tagline: "Practice management for Kenyan law firms — matters, documents, billing, payments in one place.",
    summary: "Mobile-first legal workspace — intake to billing in one app.",
    methods: ["Product design", "UX", "Frontend", "PWA"],
    role: "Product · UX · Build",
    timeline: "7 weeks",
    tools: ["Figma", "React"],
    status: "Live · 2025",
    liveUrl: "https://law-ten-iota.vercel.app",
    liveUrlLabel: "law-ten-iota.vercel.app",
    stack: ["React", "Vercel", "PWA"],
    challenge: "Firm work scattered across spreadsheets, email, and WhatsApp.",
    scope: "Research → shipped SaaS",
    constraints: ["Kenyan small firms", "Mobile-first field use", "Solo + team workspaces"],
    outcomeLine: "One workspace — intake → billing → payments.",
    art: "legalflow",
    image: "/thumbnails/legalflow.png",
    tileLine: "Matters, documents, billing — one mobile-first workspace.",
    tileBadge: "Live · one workspace",
    heroCaption: "Live product — law-ten-iota.vercel.app",
    problem: {
      lead: "Client work lived in spreadsheets, email, and WhatsApp — nothing connected.",
      paragraphs: [
        "Solo lawyers and small firms juggle intake, matter status, documents, billing, and client messages across disconnected tools. Context gets lost and deadlines slip.",
      ],
    },
    research: {
      lead: "Solo + small-firm interviews; mapped the intake→billing loop.",
      bullets: [
        { label: "Users", text: "Solo + small/mid Kenyan firms." },
        { label: "Pain", text: "Disconnected tools, lost context." },
        { label: "Must", text: "Work on the phone, in the field." },
      ],
    },
    designThinking: {
      lead: "One workspace, not another inbox.",
      bullets: [
        { label: "Kept", text: "Unified matter + client record." },
        { label: "Kept", text: "Billing tied to matter status." },
        { label: "Cut", text: "Separate doc/email silos." },
      ],
    },
    ia: {
      lead: "Workspace → matters → tasks → billing.",
      bullets: [
        { label: "Capture", text: "Intake becomes a matter." },
        { label: "Track", text: "Tasks + deadlines per matter." },
        { label: "Bill", text: "Invoices + M-Pesa payments." },
      ],
    },
    design: {
      lead: "Mobile-first, calm, dense where it counts.",
    },
    testing: {
      lead: "Walkthroughs with 3 firms.",
    },
    outcomes: [
      { metric: "Surface", value: "Intake → billing", note: "one workspace" },
      { metric: "Reach", value: "Mobile-first", note: "field + office" },
      { metric: "Team", value: "Shared", note: "firm-level visibility" },
    ],
    outcomeDetail: "Shipped and in use.",
    lessons: [
      "One record beats five tools.",
      "Billing must follow matter status.",
      "Mobile-first is how firms actually work.",
    ],
    engineeringNotes: {
      architecture: ["Unified matter model; client record as the spine."],
      stateForms: ["Intake → matter conversion keeps context."],
      dataIntegration: ["Invoicing + M-Pesa payments linked to matters."],
      qualityChecks: ["Verified at 390px; PWA installable."],
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
