export type StudyKind = "LIVE PRODUCT" | "CONCEPTUAL";

export interface CaseSection {
  lead?: string;
  paragraphs?: string[];
  bullets?: { label?: string; text: string }[];
}

export interface EngineeringNotes {
  architecture: string[];
  stateForms?: string[];
  dataIntegration?: string[];
  qualityChecks?: string[];
}

export type StudyArt = "kenyatrace" | "gigi" | "legalflow";

export interface CaseStudy {
  slug: string;
  name: string;
  year: string;
  kind: StudyKind;
  tagline: string;
  role: string;
  timeline: string;
  liveUrl?: string;
  liveUrlLabel?: string;
  stack: string[];
  constraints: string[];
  outcomeLine: string;
  art: StudyArt;
  image?: string;
  tileLine: string;
  tileBadge: string;
  problem: { lead: string; paragraphs?: string[] };
  research: CaseSection;
  designThinking: CaseSection;
  lessons: string[];
  engineeringNotes?: EngineeringNotes;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "kenyatrace",
    name: "KenyaTrace",
    year: "2024",
    kind: "LIVE PRODUCT",
    tagline: "Tourism explorer — plan multi-stop trips on 3G.",
    role: "Research · IA · UI build",
    timeline: "5 weeks",
    liveUrl: "https://kenyatrace.vercel.app",
    liveUrlLabel: "kenyatrace.vercel.app",
    stack: ["React", "Vercel"],
    constraints: ["3G + low-end Android", "~10 county sites", "Solo · 5 weeks"],
    outcomeLine: "Route 6→3 taps (tested).",
    art: "kenyatrace",
    image: "/thumbnails/kenya-tourism.png",
    tileLine: "Route planner — list-first on 3G.",
    tileBadge: "Live · 6 → 3 taps",
    problem: {
      lead: "Ten county sites, one trip — nothing connects.",
    },
    research: {
      lead: "12 interviews · 34 surveys.",
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
    role: "UI engineering · flows",
    timeline: "4 weeks",
    liveUrl: "https://gigiflavours.vercel.app/",
    liveUrlLabel: "gigiflavours.vercel.app",
    stack: ["React", "Vercel", "M-Pesa"],
    constraints: ["2.1:1 contrast", "Funnel halved at payment", "M-Pesa majority"],
    outcomeLine: "4→3 steps, AA — live.",
    art: "gigi",
    image: "/thumbnails/gigi-energy.png",
    tileLine: "Checkout rebuilt — M-Pesa first.",
    tileBadge: "Live · 4 → 3 steps",
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
    role: "Product · UX · Build",
    timeline: "7 weeks",
    liveUrl: "https://law-ten-iota.vercel.app",
    liveUrlLabel: "law-ten-iota.vercel.app",
    stack: ["React", "Vercel", "PWA"],
    constraints: ["Kenyan small firms", "Mobile-first field use", "Solo + team workspaces"],
    outcomeLine: "One workspace — intake → billing → payments.",
    art: "legalflow",
    image: "/thumbnails/legalflow.png",
    tileLine: "Matters, documents, billing — one mobile-first workspace.",
    tileBadge: "Live · one workspace",
    problem: {
      lead: "Client work lived in spreadsheets, email, and WhatsApp — nothing connected.",
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

export const liveStudies = caseStudies.filter((s) => s.kind === "LIVE PRODUCT");
export const liveCount = liveStudies.length;
export const liveSlugs = liveStudies.map((s) => s.slug);
