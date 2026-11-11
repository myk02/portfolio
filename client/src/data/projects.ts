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
      "Map-first failed on slow phones — switched to list-first with inline add-stop.",
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
      "Low contrast + multi-step checkout — merged address/delivery, M-Pesa first.",
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
      "Billing trailed the work across chats — one workspace linking matter to billing.",
    decisions: [
      { label: "Kept", text: "Unified matter + client record." },
      { label: "Kept", text: "Billing tied to matter status." },
      { label: "Cut", text: "Separate doc/email silos." },
    ],
    validateBefore: "Disconnected tools — billing trails the work",
    validateAfter: "Intake, matter, billing linked",
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
        caption: "Live site — matters, tasks, and deadlines together.",
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
  {
    slug: "broken-repo-kit",
    name: "Broken Repo Kit",
    year: "2026",
    tagline:
      "Five seeded coding challenges, scored by a verifier that only accepts a real fix.",
    outcomeTitle:
      "A reproducible coding score that cannot be decided by editing the tests.",
    tileBadge: "Developer tooling",
    role: "Design · Build · Verification",
    timeline: "Solo build",
    repoUrl: "https://github.com/myk02/broken-repo-kit",
    stack: ["Python 3.12", "pytest", "Docker", "GitHub Actions"],
    constraints: [
      "One small shop library",
      "No network during verification",
      "Solo build",
    ],
    outcomeLine:
      "Five challenges, each with a golden patch and a verifier that rejects plausible wrong fixes.",
    tileShot: "/shots/broken-repo-kit/how-it-works-desktop.webp",
    tileShotAlt:
      "Broken Repo Kit infographic: 'A bug goes in. A fair score comes out.' above the five-step challenge loop",
    context:
      "Coding challenges usually grade whatever tests the solver can edit, so a plausible wrong fix can look correct. The scoring tests live outside the solver's reach here.",
    ownership: [
      "Built five seeded challenges on one small shop library, each with a golden patch",
      "Wrote the verifier that copies only the solver's code into a clean temporary folder and runs the kit's own 152 tests",
      "Proved the verifier with 10 accepted alternative fixes and 26 rejected wrong fixes",
    ],
    problemLead:
      "Explore how a coding challenge could be scored without trusting the solver's tests or environment.",
    researchLead: "Repo build · Python 3.12 and pytest · no hosted demo.",
    ordeal:
      "The shortcut is to grade the tests the solver can see, which rewards edits to the test config. Broken Repo Kit rebuilds the room instead: only the library code is copied, the kit's fail-to-pass and pass-to-pass groups run, and tampering is reported before pytest starts.",
    decisions: [
      {
        label: "Clean room",
        text: "Only library code goes in; the solver's tests never run.",
        shot: "/shots/broken-repo-kit/clean-room-desktop.webp",
        alt: "Why the clean room contains only minishop library code, and what is left outside and checked for tampering",
      },
      {
        label: "Two groups",
        text: "A fix scores only when the bug is fixed and nothing else breaks.",
        shot: "/shots/broken-repo-kit/test-groups-desktop.webp",
        alt: "Fail-to-pass and pass-to-pass test groups, both green for a real fix",
      },
      {
        label: "Repeatable",
        text: "No clock, no network, no randomness — selftest --repeat 3 gives 5/5.",
      },
    ],
    validateBefore: "A solver-editable test suite could decide the score",
    validateAfter: "A clean-room verifier decides from the kit's own tests",
    metricCards: [
      {
        label: "Challenges",
        value: "5",
        baseline: "one shop library",
        result: "five seeded bugs",
        direction: "flat",
        tone: "neutral",
        note: "Each challenge ships a golden patch and its own deterministic verifier",
      },
      {
        label: "Verifier tests",
        value: "152",
        baseline: "visible tests only",
        result: "hidden checks included",
        direction: "up",
        tone: "neutral",
        note: "Fail-to-pass and pass-to-pass groups must both stay green",
      },
      {
        label: "Wrong fixes",
        value: "26 rejected",
        baseline: "plausible patches",
        result: "0 accepted",
        direction: "down",
        tone: "neutral",
        note: "10 valid alternative fixes were accepted, so a pass is not golden-patch-only",
      },
    ],
    lessons: [
      "Score behaviour, not tests the solver can edit.",
      "Two test groups catch both the fix and the collateral damage.",
      "A verifier needs its own traps: 26 wrong fixes, 10 valid variants.",
    ],
    hero: {
      src: "/shots/broken-repo-kit/how-it-works-wide-desktop.webp",
      alt: "Broken Repo Kit header: a bug goes in, a fair score comes out — 5 challenges, 152 tests, 26 wrong fixes rejected, 0 network calls",
      caption:
        "How it works — broken-repo-kit docs (repo only, no hosted demo)",
    },
    screens: [
      {
        name: "Five fixes",
        alt: "The five seeded challenges: discount stacking, cache recency, path traversal, slow duplicates and coupons",
        caption:
          "Five seeded bugs on one shop library — one per engineering area.",
        src: "/shots/broken-repo-kit/five-fixes-desktop.webp",
      },
    ],
    buildNotes: {
      architecture: [
        "One small shop library (minishop/) seeded with five separate bugs.",
        "Verifier copies solver code into a clean temporary folder and deletes it afterwards.",
      ],
      build: [
        "10 valid alternative fixes accepted alongside the golden patches.",
        "26 plausible wrong fixes rejected; solver tests cannot decide the score.",
      ],
      quality: [
        "152 tests; python -m kit selftest --repeat 3 gives 5/5.",
        "0 network calls during verification; Docker and GitHub Actions runs.",
      ],
    },
  },
  {
    slug: "cacheproxy",
    name: "CacheProxy",
    year: "2026",
    tagline:
      "An HTTP caching reverse proxy in Rust that serves repeat requests from memory.",
    outcomeTitle:
      "Repeat GETs answered from memory, in front of an API that stays untouched.",
    tileBadge: "Systems / backend",
    role: "Design · Rust implementation",
    timeline: "Solo build",
    repoUrl: "https://github.com/myk02/cacheproxy",
    stack: ["Rust", "HTTP/1.1", "Zero dependencies"],
    constraints: [
      "Zero runtime dependencies",
      "HTTP shared-cache rules",
      "Solo build",
    ],
    outcomeLine:
      "One small proxy that caches GETs, revalidates stale entries and coalesces concurrent misses.",
    tileShot: "/shots/cacheproxy/banner-tile-desktop.webp",
    tileShotAlt:
      "CacheProxy diagram: clients sending GETs to a Rust proxy with an in-memory byte-capped LRU, request coalescing and ETag revalidation",
    context:
      "Every client that calls an API directly repeats the same origin work for identical GETs. CacheProxy sits in front of the API and answers what it can from memory.",
    ownership: [
      "Designed the proxy around shared-cache rules: Cache-Control, Expires, Vary and Age",
      "Implemented request coalescing, conditional revalidation and a byte-capped LRU with O(1) get, insert and remove",
      "Exposed live counters at /__stats and X-Cache labels, and rejected conflicting Content-Length / Transfer-Encoding requests",
    ],
    problemLead:
      "Explore how far a small, dependency-free proxy can take HTTP caching in front of an API.",
    researchLead: "Repo build · Rust, no hosted demo, no benchmark run.",
    ordeal:
      "A URL-keyed cache is wrong as soon as Vary, Age and revalidation matter. CacheProxy keeps freshness and revalidation tied to the response headers, and lets concurrent misses share a single origin fetch.",
    decisions: [
      {
        label: "Storage",
        text: "Byte-capped LRU with O(1) get, insert and remove.",
      },
      {
        label: "Misses",
        text: "Request coalescing: concurrent misses wait on one origin fetch.",
      },
      {
        label: "Visible state",
        text: "Live counters at /__stats and an X-Cache label on each response.",
      },
    ],
    validateBefore: "Repeat GETs reach the origin every time",
    validateAfter: "Repeat GETs answered from memory with an X-Cache label",
    metricCards: [
      {
        label: "Runtime deps",
        value: "Zero",
        baseline: "third-party crates",
        result: "std only",
        direction: "down",
        tone: "neutral",
        note: "No crate dependency in the proxy",
      },
      {
        label: "Cache store",
        value: "Byte-capped LRU",
        baseline: "unbounded map",
        result: "O(1) get / insert / remove",
        direction: "flat",
        tone: "neutral",
        note: "The cap bounds memory; eviction is least-recently-used",
      },
      {
        label: "HTTP rules",
        value: "Shared-cache",
        baseline: "URL-only caching",
        result: "Cache-Control · Expires · ETag · Vary · Age",
        direction: "up",
        tone: "neutral",
        note: "ETag and Last-Modified drive conditional revalidation; Age is reported",
      },
    ],
    lessons: [
      "Caching is a rules problem before it is a data-structure problem.",
      "Coalescing turns a thundering herd into one origin fetch.",
      "Counters on the proxy make cache behaviour debuggable from the client.",
    ],
    hero: {
      src: "/shots/cacheproxy/banner-desktop.webp",
      alt: "CacheProxy architecture banner: clients, the proxy's LRU, coalescing and revalidation, and an origin API",
      caption: "Architecture banner — cacheproxy repo (no hosted demo)",
    },
    screens: [],
    buildNotes: {
      architecture: [
        "Thread per connection with keep-alive; one cache keyed by URL and Vary.",
        "Byte-capped LRU held in memory; no crate dependencies.",
      ],
      build: [
        "Request coalescing shares one origin fetch across concurrent misses.",
        "ETag and Last-Modified revalidation; Age reported on hits.",
      ],
      quality: [
        "Conflicting Content-Length / Transfer-Encoding requests are rejected.",
        "Live counters at /__stats and X-Cache labels on responses.",
      ],
    },
  },
];

export const liveStudies = projects;
export const liveCount = projects.length;
