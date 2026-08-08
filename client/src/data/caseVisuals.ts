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
  "mobile-banking-redesign": {
    prototype: {
      kind: "internal",
      href: "/work/mobile-banking-redesign/prototype",
      label: "Open prototype →",
    },
    personas: [
      {
        initials: "A",
        name: "Amina",
        age: "21",
        role: "Campus student",
        quote: "I'll finish the documents later. That was three months ago.",
        facts: [
          { label: "Income", value: "Monthly allowance, top-ups" },
          { label: "Banking habit", value: "Checks balance, avoids the app" },
          { label: "Frustration", value: "Onboarding died at documents" },
        ],
      },
      {
        initials: "K",
        name: "Kevin",
        age: "23",
        role: "Freelancer",
        quote: "I don't check my balance because I don't want to see it.",
        facts: [
          { label: "Income", value: "Irregular project payments" },
          { label: "Banking habit", value: "M-Pesa-first, bank app last" },
          { label: "Frustration", value: "Fixed monthly budgets don't fit" },
        ],
      },
      {
        initials: "W",
        name: "Wanjiru",
        age: "26",
        role: "Market trader",
        quote: "I save when I have it. The app only wants monthly plans.",
        facts: [
          { label: "Income", value: "Daily cash flow, seasonal peaks" },
          { label: "Banking habit", value: "Saves in cash or chamas" },
          { label: "Frustration", value: "No 'save when paid' mechanic" },
        ],
      },
    ],
    empathyMap: {
      says: [
        "I'll finish the documents later",
        "I keep my money in M-Pesa",
      ],
      does: [
        "Avoids opening the app",
        "Saves cash in chamas",
      ],
      thinks: [
        "The app is watching me spend",
        "Monthly budgets are for salaried people",
      ],
      feels: [
        "Shame about low balances",
        "Trust in people, not apps",
      ],
    },
    sketches: [
      { label: "Onboarding flow — concept A", state: "rejected", layout: "onboard" },
      { label: "Dark fintech home — concept B", state: "rejected", layout: "dark" },
      { label: "One-screen dashboard — concept C", state: "rejected", layout: "grid" },
      { label: "Savings-first home — concept D", state: "won", layout: "home" },
      { label: "Goal ring variants", state: "kept", layout: "ring" },
      { label: "Quick-save sheet", state: "kept", layout: "sheet" },
      { label: "Progressive KYC — 4 steps", state: "won", layout: "kyc" },
      { label: "Deferred verification", state: "kept", layout: "defer" },
    ],
    brandEvolution: {
      title: "Brand evolution — from 'premium' to understood",
      items: [
        { label: "Palette v1 — dark fintech", state: "rejected", swatches: ["#101418", "#1b222c", "#3b82f6", "#94a3b8"] },
        { label: "Palette v2 — heavy ink", state: "tested", swatches: ["#141310", "#4a453c", "#d9d2c4", "#e8ff47"] },
        { label: "Type scale — final", state: "won", swatches: ["Aa", "Aa", "Aa", "Aa"] },
        { label: "Buttons — final tokens", state: "won", swatches: ["#141310", "#f4efe7", "#e8ff47"] },
      ],
    },
    validate: {
      before: { label: "ROUND 1 ✗", note: "Goal ring read as network spinner — progress invisible" },
      after: { label: "ROUND 2 ✓ 100%", note: "Ring + 'Save goal · 62%' label — progress understood" },
    },
    metrics: [
      { metric: "Onboarding", baseline: "8 steps", target: "4 steps", result: "−50% est. abandonment" },
      { metric: "Goal visibility", baseline: "3 taps", target: "0 taps", result: "always on home" },
      { metric: "SUS score", baseline: "68", target: "84", result: "+16 pts, 5 tests" },
    ],
    metricCards: [
      {
        label: "Onboarding",
        value: "8 → 4 steps",
        baseline: "8 steps",
        result: "4 steps",
        direction: "down",
        tone: "positive",
        note: "Document verification deferred out of activation",
      },
      {
        label: "Goal visibility",
        value: "3 taps → 0",
        baseline: "3 taps",
        result: "0 taps",
        direction: "down",
        tone: "positive",
        note: "Goal ring lives on the home screen",
      },
      {
        label: "Est. abandonment",
        value: "~50% lower",
        baseline: "hypothesis",
        result: "5 moderated tests",
        direction: "down",
        tone: "positive",
        note: "Design hypothesis — validated in testing, not production",
      },
    ],
    roadmap: ["Round-up defaults", "USSD parity", "Group savings"],
  },
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
  "dashboard-ui-system": {
    prototype: {
      kind: "internal",
      href: "/work/dashboard-ui-system/prototype",
      label: "Open prototype →",
    },
    sketches: [
      { label: "Card-only dashboard — concept A", state: "rejected", layout: "grid" },
      { label: "Table-first — spreadsheet risk", state: "rejected", layout: "table" },
      { label: "Three-tier hierarchy — concept C", state: "won", layout: "tiers" },
      { label: "KPI tier with deltas", state: "kept", layout: "kpi" },
      { label: "Dense data table — spec'd", state: "won", layout: "table" },
      { label: "Row-selection states — v2", state: "won", layout: "rows" },
    ],
    validate: {
      before: { label: "ROUND 1 ✗", note: "Row-selection + pagination unspecified — dev walkthrough caught it" },
      after: { label: "ROUND 2 ✓", note: "Explicit component variants — handoff review did its job" },
    },
    metrics: [
      { metric: "Task scan", baseline: "3s+", target: "≤ 2s", result: "exception at a glance" },
      { metric: "Handoff", baseline: "screenshots", target: "100% spec'd", result: "states + edge cases" },
      { metric: "Table density", baseline: "1×", target: "2×", result: "rows per viewport" },
    ],
    metricCards: [
      {
        label: "Task scan",
        value: "≤ 2 seconds",
        baseline: "3s+",
        result: "≤ 2s",
        direction: "down",
        tone: "positive",
        note: "Exception state visible without reading (heuristic baseline)",
      },
      {
        label: "Handoff",
        value: "100% spec'd",
        baseline: "screenshots",
        result: "annotated specs",
        direction: "up",
        tone: "positive",
        note: "Spacing, states and edge cases annotated per component",
      },
      {
        label: "Table density",
        value: "2× rows",
        baseline: "1×",
        result: "2×",
        direction: "up",
        tone: "positive",
        note: "Rows per viewport vs. typical card-first dashboards",
      },
    ],
    roadmap: ["Pagination variants", "Chart drill-down", "Dark/light sync"],
  },
  "design-system-creation": {
    prototype: {
      kind: "internal",
      href: "/work/design-system-creation/prototype",
      label: "Open prototype →",
    },
    sketches: [
      { label: "Component-first — adopted then abandoned", state: "rejected", layout: "grid" },
      { label: "Token-first — concept A", state: "won", layout: "tokens" },
      { label: "Type scale draft — 6 steps", state: "rejected", layout: "type" },
      { label: "Type scale final — 7 steps", state: "won", layout: "type" },
      { label: "Button states matrix", state: "kept", layout: "buttons" },
      { label: "Icon set — 24px stroke", state: "kept", layout: "icons" },
    ],
    validate: {
      before: { label: "ROUND 1 ✗", note: "Missing warning state, focus ring, nested-table guidance" },
      after: { label: "ROUND 2 ✓", note: "Three gaps documented — system working as intended" },
    },
    metrics: [
      { metric: "Button styles", baseline: "17", target: "3", result: "all states specified" },
      { metric: "Type scale", baseline: "6 steps", target: "7 steps", result: "defined roles" },
      { metric: "Components", baseline: "5", target: "10 core", result: "states + usage rules" },
    ],
    metricCards: [
      {
        label: "Button styles",
        value: "17 → 3",
        baseline: "17 styles",
        result: "3 + states",
        direction: "down",
        tone: "positive",
        note: "Primary, secondary, ghost — every state specified",
      },
      {
        label: "Type scale",
        value: "6 → 7 steps",
        baseline: "6 competing scales",
        result: "7 defined steps",
        direction: "up",
        tone: "positive",
        note: "Display to caption, each with a written role",
      },
      {
        label: "Core components",
        value: "10 documented",
        baseline: "5 ad-hoc",
        result: "10 core",
        direction: "up",
        tone: "positive",
        note: "Each with states, edge cases and 'when not to use'",
      },
    ],
    roadmap: ["Focus-ring tokens", "Nested-table guidance", "Filled icon set"],
  },
};
