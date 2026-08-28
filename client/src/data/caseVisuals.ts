export interface Persona {
  initials: string;
  name: string;
  age: string;
  role: string;
  quote: string;
  facts: { label: string; value: string }[];
}

export interface SketchItem {
  label: string;
  state: "won" | "rejected" | "kept";
  layout: string;
}

export interface MetricRow {
  metric: string;
  baseline: string;
  target: string;
  result: string;
}

export interface PrototypeLink {
  /** internal = in-site interactive prototype, external = real live product */
  kind: "internal" | "external";
  href: string;
  label: string;
}

export interface MetricCardData {
  label: string;
  value: string;
  baseline?: string;
  result?: string;
  tone?: "positive" | "negative" | "neutral";
  direction?: "up" | "down" | "flat";
  note?: string;
}

/** A real screenshot of a shipped screen (captured from the live product) — one design, three viewports. */
export interface Shot {
  name: string;
  alt: string;
  caption: string;
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface StudyVisuals {
  prototype: PrototypeLink;
  personas?: Persona[];
  empathyMap?: { says: string[]; does: string[]; thinks: string[]; feels: string[] };
  sketches: SketchItem[];
  brandEvolution?: { title: string; items: { label: string; state: string; swatches: string[] }[] };
  validate: { before: { label: string; note: string }; after: { label: string; note: string } };
  metrics: MetricRow[];
  metricCards: MetricCardData[];
  roadmap: string[];
  /** hero image (live products only) — one design, three viewports */
  hero?: {
    mobile: string;
    tablet: string;
    desktop: string;
    alt: string;
    caption: string;
  };
  /** distinct hi-fi screens for the UI chapter — never reuses the hero image */
  screens?: Shot[];
}

export const caseVisuals: Record<string, StudyVisuals> = {
  kenyatrace: {
    prototype: {
      kind: "external",
      href: "https://kenyatrace.vercel.app",
      label: "View live product ↗",
    },
    hero: {
      mobile: "/shots/kenyatrace/home-mobile.jpg",
      tablet: "/shots/kenyatrace/home-tablet.jpg",
      desktop: "/shots/kenyatrace/home-desktop.jpg",
      alt: "KenyaTrace home page on desktop — county-led destination browsing",
      caption: "Shipped home screen — kenyatrace.vercel.app",
    },
    screens: [
      {
        name: "Home",
        alt: "KenyaTrace mobile home screen",
        caption: "Home — county browse, list-first, fast on 3G.",
        mobile: "/shots/kenyatrace/home-mobile.jpg",
        tablet: "/shots/kenyatrace/home-tablet.jpg",
        desktop: "/shots/kenyatrace/home-desktop.jpg",
      },
      {
        name: "Discover",
        alt: "KenyaTrace discover screen listing destinations",
        caption: "Discover — three predictable levels, progressive loading.",
        mobile: "/shots/kenyatrace/discover-mobile.jpg",
        tablet: "/shots/kenyatrace/discover-tablet.jpg",
        desktop: "/shots/kenyatrace/discover-desktop.jpg",
      },
      {
        name: "Plan",
        alt: "KenyaTrace route planner screen",
        caption: "Plan — inline add-stop, the fix from test round 1.",
        mobile: "/shots/kenyatrace/plan-mobile.jpg",
        tablet: "/shots/kenyatrace/plan-tablet.jpg",
        desktop: "/shots/kenyatrace/plan-desktop.jpg",
      },
      {
        name: "Trips",
        alt: "KenyaTrace saved trips and itineraries",
        caption: "Trips — one shareable link replaces the PDF chain.",
        mobile: "/shots/kenyatrace/trips-mobile.jpg",
        tablet: "/shots/kenyatrace/trips-tablet.jpg",
        desktop: "/shots/kenyatrace/trips-desktop.jpg",
      },
      {
        name: "Stays",
        alt: "KenyaTrace stays listing",
        caption: "Stays — the same card grammar, different content type.",
        mobile: "/shots/kenyatrace/stays-mobile.jpg",
        tablet: "/shots/kenyatrace/stays-tablet.jpg",
        desktop: "/shots/kenyatrace/stays-desktop.jpg",
      },
    ],
    personas: [
      {
        initials: "B",
        name: "Brian",
        age: "28",
        role: "Weekend road-tripper",
        quote: "I ended up with 14 tabs open and a PDF from my cousin.",
        facts: [
          { label: "Trip style", value: "Short multi-stop escapes" },
          { label: "Planning", value: "On phone, often on 3G" },
          { label: "Frustration", value: "County sites break on mobile" },
        ],
      },
      {
        initials: "A",
        name: "Achieng",
        age: "32",
        role: "Family safari planner",
        quote: "I need days, distances, and someone the kids can trust.",
        facts: [
          { label: "Trip style", value: "One big annual trip" },
          { label: "Planning", value: "Reviews and WhatsApp groups" },
          { label: "Frustration", value: "No single shareable plan" },
        ],
      },
      {
        initials: "T",
        name: "Toby",
        age: "24",
        role: "Backpacker",
        quote: "Give me the route. I'll figure out the rest on the ground.",
        facts: [
          { label: "Trip style", value: "Multi-county loops" },
          { label: "Planning", value: "Itinerary links from friends" },
          { label: "Frustration", value: "Map-first sites time out" },
        ],
      },
    ],
    sketches: [
      { label: "Map-first home — concept A", state: "rejected", layout: "map" },
      { label: "List-first browse — concept B", state: "won", layout: "list" },
      { label: "Route builder v1 — add-stop leaves route", state: "rejected", layout: "flow" },
      { label: "Inline add-stop — concept C", state: "won", layout: "flow" },
      { label: "Itinerary share card", state: "kept", layout: "card" },
      { label: "Day-by-day plan", state: "kept", layout: "days" },
    ],
    validate: {
      before: { label: "ROUND 1 ✗", note: "Adding a stop left the route screen — 6 interactions" },
      after: { label: "ROUND 2 ✓", note: "Inline add-stop — 3 interactions, most-used task" },
    },
    metrics: [
      { metric: "Route planning", baseline: "6 interactions", target: "3", result: "−50% task time" },
      { metric: "Itinerary share", baseline: "PDF + WhatsApp chain", target: "1 link", result: "shareable plan" },
      { metric: "Mobile parity", baseline: "—", target: "100%", result: "all tasks on 360px" },
    ],
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
    roadmap: ["Trip templates", "Offline itineraries", "Group planning"],
  },
  "gigi-energy": {
    prototype: {
      kind: "external",
      href: "https://gigiflavours.vercel.app/",
      label: "View live product ↗",
    },
    hero: {
      mobile: "/shots/gigi-energy/home-mobile.jpg",
      tablet: "/shots/gigi-energy/home-tablet.jpg",
      desktop: "/shots/gigi-energy/home-desktop.jpg",
      alt: "GiGi Energy storefront on desktop",
      caption: "Shipped storefront — gigiflavours.vercel.app",
    },
    screens: [
      {
        name: "Storefront",
        alt: "GiGi Energy mobile storefront",
        caption: "Storefront — bold display type carries the hierarchy.",
        mobile: "/shots/gigi-energy/home-mobile.jpg",
        tablet: "/shots/gigi-energy/home-tablet.jpg",
        desktop: "/shots/gigi-energy/home-desktop.jpg",
      },
      {
        name: "Flavours",
        alt: "GiGi Energy flavours listing on mobile",
        caption: "Flavours — one accent per can, all text at AA contrast.",
        mobile: "/shots/gigi-energy/flavours-mobile.jpg",
        tablet: "/shots/gigi-energy/flavours-tablet.jpg",
        desktop: "/shots/gigi-energy/flavours-desktop.jpg",
      },
      {
        name: "Buy section",
        alt: "GiGi Energy purchase section on mobile",
        caption: "Buy — delivery estimate and payment trust at the final tap.",
        mobile: "/shots/gigi-energy/home-scroll-mobile.jpg",
        tablet: "/shots/gigi-energy/home-scroll-tablet.jpg",
        desktop: "/shots/gigi-energy/home-scroll-desktop.jpg",
      },
      {
        name: "Events",
        alt: "GiGi Energy events page on mobile",
        caption: "Events — the loud brand voice with legible containers.",
        mobile: "/shots/gigi-energy/events-mobile.jpg",
        tablet: "/shots/gigi-energy/events-tablet.jpg",
        desktop: "/shots/gigi-energy/events-desktop.jpg",
      },
    ],
    sketches: [
      { label: "Fluorescent checkout — concept A", state: "rejected", layout: "cart" },
      { label: "Can-approach palette — concept B", state: "won", layout: "swatch" },
      { label: "4-step checkout — before", state: "rejected", layout: "flow" },
      { label: "3-step checkout — merged address + delivery", state: "won", layout: "flow" },
      { label: "Flavour-led product card", state: "kept", layout: "card" },
      { label: "M-Pesa-first payment", state: "kept", layout: "pay" },
    ],
    brandEvolution: {
      title: "Brand evolution — keep the energy, fix the legibility",
      items: [
        { label: "Palette v1 — orange on pink", state: "rejected", swatches: ["#ff5a1f", "#ff8ab3", "#ffd700", "#1a1a1a"] },
        { label: "Contrast audit — 2.1:1", state: "rejected", swatches: ["#ff5a1f", "#ffd7e8", "#ffffff", "#222"] },
        { label: "Can approach — dark containers", state: "won", swatches: ["#141310", "#ff5a1f", "#ffd700", "#f4efe7"] },
        { label: "Final AA tokens", state: "won", swatches: ["#141310", "#f4efe7", "#e8ff47", "#ff5a1f"] },
      ],
    },
    validate: {
      before: { label: "ROUND 1 ✗", note: "4-step checkout — funnel halves at address + payment" },
      after: { label: "ROUND 2 ✓", note: "3 steps, M-Pesa first — matches 80% of shoppers" },
    },
    metrics: [
      { metric: "Checkout", baseline: "4 steps", target: "3 steps", result: "address + delivery merged" },
      { metric: "Contrast", baseline: "2.1:1", target: "≥ 4.5:1", result: "AA on all text" },
      { metric: "Payment order", baseline: "Card first", target: "M-Pesa first", result: "majority pattern" },
    ],
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
    roadmap: ["Promo-code engine", "Stock alerts", "Loyalty points"],
  },
  legalflow: {
    prototype: {
      kind: "external",
      href: "https://law-ten-iota.vercel.app",
      label: "View live product ↗",
    },
    personas: [
      {
        initials: "A",
        name: "Adv. Achieng",
        age: "34",
        role: "Solo practitioner",
        quote: "My matters, my invoices, my client chats — all in different places.",
        facts: [
          { label: "Firm size", value: "Just me, 20+ active matters" },
          { label: "Context", value: "Phone-first, often in court" },
          { label: "Frustration", value: "Billing trails the work" },
        ],
      },
      {
        initials: "M",
        name: "Mr. Mutua",
        age: "41",
        role: "Managing partner, 6-lawyer firm",
        quote: "I need the whole team seeing the same matter status, not forwarded threads.",
        facts: [
          { label: "Firm size", value: "Small firm, shared workload" },
          { label: "Need", value: "Assigned tasks + deadlines" },
          { label: "Frustration", value: "No single source of truth" },
        ],
      },
    ],
    hero: {
      mobile: "/shots/legalflow/home-mobile.jpg",
      tablet: "/shots/legalflow/home-tablet.jpg",
      desktop: "/shots/legalflow/home-desktop.jpg",
      alt: "LegalFlow workspace on desktop — matters, tasks, and billing in one view",
      caption: "Shipped workspace — law-ten-iota.vercel.app",
    },
    screens: [
      {
        name: "Workspace",
        alt: "LegalFlow workspace screen",
        caption: "Workspace — matters, tasks, and deadlines in one place.",
        mobile: "/shots/legalflow/home-scroll-mobile.jpg",
        tablet: "/shots/legalflow/home-scroll-tablet.jpg",
        desktop: "/shots/legalflow/home-scroll-desktop.jpg",
      },
      {
        name: "Billing & clients",
        alt: "LegalFlow billing and client screen",
        caption: "Billing — invoices and M-Pesa payments tied to matter status.",
        mobile: "/shots/legalflow/home-features-mobile.jpg",
        tablet: "/shots/legalflow/home-features-tablet.jpg",
        desktop: "/shots/legalflow/home-features-desktop.jpg",
      },
    ],
    sketches: [
      { label: "Spreadsheet + email — status quo", state: "rejected", layout: "list" },
      { label: "Unified matter record — concept A", state: "won", layout: "card" },
      { label: "Billing as separate app — concept B", state: "rejected", layout: "flow" },
      { label: "Matter-linked invoicing — concept C", state: "won", layout: "flow" },
      { label: "Client comms inbox — kept", state: "kept", layout: "card" },
      { label: "Firm-wide matter board", state: "kept", layout: "board" },
    ],
    validate: {
      before: { label: "ROUND 1 ✗", note: "Five disconnected tools — billing trailed the work" },
      after: { label: "ROUND 2 ✓", note: "One workspace — intake, matter, billing, payments linked" },
    },
    metrics: [
      { metric: "Tools", baseline: "spreadsheets + email + WhatsApp", target: "1 workspace", result: "unified records" },
      { metric: "Billing", baseline: "manual invoices", target: "in-app", result: "M-Pesa linked to matters" },
      { metric: "Reach", baseline: "office only", target: "mobile", result: "works at 390px" },
    ],
    metricCards: [
      {
        label: "Tools",
        value: "Spreadsheets → one app",
        baseline: "spreadsheets + email + WhatsApp",
        result: "matter + client + billing in one place",
        direction: "down",
        tone: "positive",
        note: "Centralised records replace disconnected tools",
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
    roadmap: ["Client portal", "eFiling integration", "Conflict checking"],
  },
};
