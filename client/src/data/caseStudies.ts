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
  art: "banking" | "dashboard" | "design-system" | "kenyatrace" | "gigi";
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
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "mobile-banking-redesign",
    name: "Youth Mobile Banking Redesign",
    year: "2025",
    kind: "CONCEPTUAL",
    tagline:
      "Mobile banking for 18–30 year-olds — built around irregular income, trust friction, and saving goals.",
    summary:
      "Research → flows → wireframes → hi-fi → usability testing for youth banking.",
    methods: [
      "User Interviews",
      "Usability Testing",
      "Journey Mapping",
      "Wireframing",
    ],
    role: "End-to-end UX — research plan, flows, wireframes, hi-fi, usability testing",
    timeline: "6 weeks (conceptual study)",
    tools: ["Figma", "FigJam", "Maze", "Miro"],
    status: "Conceptual study · 2025",
    art: "banking",
    tileLine: "Onboarding 8 → 4. Savings-first home.",
    tileBadge: "6 weeks · 8 → 4 steps",
    heroCaption: "Conceptual study — not affiliated with any bank.",
    problem: {
      lead: "Young customers with irregular income don't trust or use their banking app.",
    },
    research: {
      lead: "8 interviews · 47-survey · 6-app audit.",
      callouts: [
        {
          quote:
            "I don't check my balance because I don't want to see it. I know it's low and I'll just feel bad.",
          source: "Interviewee, 23 · freelancer",
        },
        {
          quote:
            "The app asked me for documents I didn't have on me. I said I'll finish later. That was three months ago.",
          source: "Interviewee, 21 · campus student",
        },
      ],
      bullets: [
        {
          label: "Abandonment",
          text: "Onboarding dies at document verification.",
        },
        {
          label: "Avoidance",
          text: "Users avoid apps that shame their balance.",
        },
        {
          label: "Income mismatch",
          text: "Monthly budgets fail irregular earners.",
        },
        { label: "Trust", text: "Trust cues are visual, not verbal." },
      ],
    },
    designThinking: {
      lead: "Two directions killed before any visual polish.",
      bullets: [
        {
          label: "Kept",
          text: "Savings-first home — leads with what the user wants.",
        },
        {
          label: "Kept",
          text: "Progressive KYC — essentials first, documents deferred.",
        },
        {
          label: "Rejected",
          text: "Dark fintech aesthetic — failed the 'understood' test.",
        },
      ],
    },
    ia: {
      lead: "Eight onboarding screens → four. Five flat destinations.",
      bullets: [
        { label: "Onboarding", text: "8 → 4 steps; verification deferred." },
        { label: "Home", text: "Balance, goal ring, quick actions in 0 taps." },
        {
          label: "Goals",
          text: "Round-up, quick-save (+500/+1000), 'save when paid'.",
        },
      ],
    },
    design: {
      lead: "Hi-fi in phone frames — one small, consistent component set.",
      bullets: [
        {
          label: "Greeting",
          text: "Warm header — first name + a 'hustle' message.",
        },
        { label: "Goal ring", text: "Quick-save chips sized to real hustles." },
        { label: "Trust", text: "Padlock + amount + recipient at first send." },
      ],
    },
    testing: {
      lead: "Five moderated tests in Maze — one iteration pass.",
      callouts: [
        {
          quote:
            "Oh, it's like a savings circle. I thought the ring was the network loading.",
          source: "Usability test, participant 3 · round 1",
        },
      ],
    },
    outcomes: [
      {
        metric: "Onboarding",
        value: "8 → 4 steps",
        note: "est. −50% activation abandonment (hypothesis-based; conceptual study)",
      },
      {
        metric: "Goal visibility",
        value: "3 taps → 0",
        note: "goal progress always on the home screen",
      },
      {
        metric: "SUS score",
        value: "68 → 84",
        note: "system usability scale across 5 moderated tests",
      },
    ],
    outcomeDetail:
      "Conceptual — outcomes are hypotheses validated by usability testing.",
    lessons: [
      "Lead with what the customer wants, not the ledger.",
      "Progressive KYC is standard — that friction was killing activation.",
      "Trust cues are visual; users skim every security sentence.",
    ],
  },
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
    role: "UX Research · Information Architecture · Prototyping",
    timeline: "5 weeks",
    tools: ["Figma", "FigJam", "Notion"],
    status: "Live product · 2024",
    liveUrl: "https://kenyatrace.vercel.app",
    liveUrlLabel: "kenyatrace.vercel.app",
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
    role: "UI Design · Conversion Flows",
    timeline: "4 weeks",
    tools: ["Figma", "GA4"],
    status: "Live product · 2025",
    liveUrl: "https://gigiflavours.vercel.app/",
    liveUrlLabel: "gigiflavours.vercel.app",
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
  },
  {
    slug: "dashboard-ui-system",
    name: "Complex Dashboard UI System",
    year: "2025",
    kind: "CONCEPTUAL",
    tagline:
      "A scalable dashboard UI system — dense data, clear hierarchy, build-ready specs.",
    summary: "A dashboard UI system — dense, legible, spec'd for developers.",
    methods: [
      "Information Architecture",
      "Data Design",
      "UI Systems",
      "Developer Handoff",
    ],
    role: "IA · UI System · Handoff Documentation",
    timeline: "4 weeks (conceptual study)",
    tools: ["Figma", "Tokens Studio"],
    status: "Conceptual study · 2025",
    art: "dashboard",
    tileLine: "Ops dashboards. Dense data, clear hierarchy.",
    tileBadge: "4 weeks · spec handoff",
    heroCaption: "Conceptual study — dark operational UI, handoff-ready.",
    problem: {
      lead: "Dense operational data, thin hierarchy, handoff by screenshot.",
    },
    research: {
      lead: "Three internal tools · task-focused interviews.",
      bullets: [
        { label: "Scan, not read", text: "Users scan for exceptions first." },
        {
          label: "Table density",
          text: "The data table is the least-designed workhorse.",
        },
        {
          label: "Handoff gap",
          text: "Developers reverse-engineer specs from screenshots.",
        },
      ],
    },
    designThinking: {
      lead: "Card-only or table-only? Neither.",
    },
    ia: {
      lead: "Three tiers, explicit rules.",
      bullets: [
        { label: "Status", text: "KPI cards with deltas — read in 2 seconds." },
        { label: "Context", text: "Exception list + trend charts." },
        {
          label: "Detail",
          text: "Dense table, pinned columns, keyboard-first.",
        },
      ],
    },
    design: {
      lead: "Dark UI, lime accent, built for long sessions.",
    },
    testing: {
      lead: "Heuristic review + developer handoff walkthrough.",
    },
    outcomes: [
      {
        metric: "Task scan",
        value: "≤2 seconds",
        note: "exception state visible at a glance (heuristic baseline)",
      },
      {
        metric: "Handoff",
        value: "100% spec'd",
        note: "states, spacing, and edge cases annotated per component",
      },
      {
        metric: "Table density",
        value: "2×",
        note: "data rows per viewport vs. typical card-based dashboards",
      },
    ],
    outcomeDetail:
      "Conceptual — three-tier hierarchy beats card-first and table-only.",
    lessons: [
      "The data table deserves senior design attention.",
      "Handoff is a deliverable, not a handoff.",
      "Every pixel of chart geometry should carry data.",
    ],
  },
  {
    slug: "design-system-creation",
    name: "Design System Creation",
    year: "2025",
    kind: "CONCEPTUAL",
    tagline:
      "Tokens, components, documentation — the standards layer for quality at scale.",
    summary:
      "Tokens, components, documentation — standards that keep quality alive.",
    methods: ["Design Systems", "Typography", "Tokens", "Documentation"],
    role: "Design System · Tokens · Documentation",
    timeline: "3 weeks (conceptual study)",
    tools: ["Figma", "Tokens Studio"],
    status: "Conceptual study · 2025",
    art: "design-system",
    tileLine: "Tokens first. 17 buttons → 3.",
    tileBadge: "3 weeks · unified system",
    heroCaption: "Conceptual study — the style-guide cover at a glance.",
    problem: {
      lead: "Every product shipped a different button. That's a quality problem.",
    },
    research: {
      lead: "Audit of three surfaces · designer interviews.",
      bullets: [
        { label: "Drift", text: "17 button styles, re-derived per screen." },
        { label: "Copy-paste", text: "Spacing nudged until nothing aligned." },
        {
          label: "Adoption fear",
          text: "Designers feared a library they couldn't extend.",
        },
      ],
    },
    designThinking: {
      lead: "Token-first, not component-first.",
    },
    ia: {
      lead: "Tokens → components → guidance.",
      bullets: [
        { label: "Tokens", text: "Type, color, spacing, radii, elevation." },
        {
          label: "Components",
          text: "Buttons, inputs, toggles, dialogs — all states.",
        },
        { label: "Docs", text: "When to use, when not to, how to extend." },
      ],
    },
    design: {
      lead: "The system as a poster — scale, chips, states, grid in one view.",
    },
    testing: {
      lead: "The dashboard study was the first consumer.",
    },
    outcomes: [
      {
        metric: "Button styles",
        value: "17 → 3",
        note: "primary, secondary, ghost — every state specified",
      },
      {
        metric: "Type scale",
        value: "6 → 7 steps",
        note: "from display to caption with defined roles",
      },
      {
        metric: "Components",
        value: "10 core",
        note: "each with states, edge cases, and usage rules",
      },
    ],
    outcomeDetail:
      "Conceptual — success is adoption: tokens on new screens within two sprints.",
    lessons: [
      "Tokens before components — teams compose primitives.",
      "A system is its 'when not to use this' documentation.",
      "Let real work break the system, then document the fix.",
    ],
  },
];

export const skillMarquee = [
  "Figma",
  "FigJam",
  "Miro",
  "User Research",
  "Design Thinking",
  "Wireframing",
  "Prototyping",
  "Information Architecture",
  "Usability Testing",
  "Design Systems",
  "React & Tailwind",
];
