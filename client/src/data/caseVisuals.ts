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

export interface StudyVisuals {
  readTime: string;
  prototypeUrl?: string;
  prototypeLabel?: string;
  personas?: Persona[];
  empathyMap?: { says: string[]; does: string[]; thinks: string[]; feels: string[] };
  sketches: SketchItem[];
  brandEvolution?: { title: string; items: { label: string; state: string; swatches: string[] }[] };
  validate: { before: { label: string; note: string }; after: { label: string; note: string } };
  metrics: MetricRow[];
  roadmap: string[];
}

export const caseVisuals: Record<string, StudyVisuals> = {
  "mobile-banking-redesign": {
    readTime: "8",
    prototypeUrl: "https://www.figma.com/proto/placeholder/youth-banking-redesign",
    prototypeLabel: "View prototype ↗",
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
    roadmap: ["Round-up defaults", "USSD parity", "Group savings"],
  },
  kenyatrace: {
    readTime: "6",
    prototypeUrl: "https://kenyatrace.vercel.app",
    prototypeLabel: "View live ↗",
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
    roadmap: ["Trip templates", "Offline itineraries", "Group planning"],
  },
  "gigi-energy": {
    readTime: "5",
    prototypeUrl: "https://gigiflavours.vercel.app/",
    prototypeLabel: "View live ↗",
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
    roadmap: ["Promo-code engine", "Stock alerts", "Loyalty points"],
  },
  "dashboard-ui-system": {
    readTime: "6",
    prototypeUrl: "https://www.figma.com/proto/placeholder/dashboard-ui-system",
    prototypeLabel: "View prototype ↗",
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
    roadmap: ["Pagination variants", "Chart drill-down", "Dark/light sync"],
  },
  "design-system-creation": {
    readTime: "5",
    prototypeUrl: "https://www.figma.com/proto/placeholder/design-system",
    prototypeLabel: "View prototype ↗",
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
    roadmap: ["Focus-ring tokens", "Nested-table guidance", "Filled icon set"],
  },
};
