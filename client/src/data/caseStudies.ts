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
  art: "banking" | "dashboard" | "design-system";
  image?: string;
  heroCaption: string;
  problem: { lead: string; paragraphs: string[] };
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
      "A conceptual redesign of mobile banking for 18–30 year-olds in Kenya — built around irregular income, trust friction, and saving goals.",
    summary:
      "Young Kenyan banking customers abandon onboarding and avoid their own apps. I redesigned the mobile banking experience end to end — research, flows, wireframes, hi-fi, usability testing — around how people with irregular income actually save, borrow, and send money.",
    methods: ["User Interviews", "Usability Testing", "Journey Mapping", "Wireframing"],
    role: "End-to-end UX — research plan, flows, wireframes, hi-fi, usability testing",
    timeline: "6 weeks (conceptual study)",
    tools: ["Figma", "FigJam", "Maze", "Miro"],
    status: "Conceptual study · 2025",
    art: "banking",
    heroCaption:
      "A conceptual study of youth financial services — similar in direction to the youth-banking products major Kenyan banks are building. Not affiliated with any bank.",
    problem: {
      lead: "Young customers with irregular income don't trust or use their banking app.",
      paragraphs: [
        "Interviews showed a pattern: people aged 18–30 abandon onboarding at the document step, and even after they activate, they open the app only to check a balance — then close it. Money hides in M-Pesa, agency banking, or under a mattress, because dashboards are built for salaried customers and feel like they're watching you.",
        "The result: banks lose activation and engagement, and young customers stay outside the formal system at the exact moment their saving habits are forming.",
      ],
    },
    research: {
      lead: "Eight interviews, a 47-person survey, and a competitive audit of six apps.",
      paragraphs: [
        "I recruited across income types — a freelancer, a campus student, a barber, a boda rider, a small trader — because fixed-income assumptions kept breaking in the field. The competitive audit covered M-Pesa, two Kenyan bank apps, and two neobanks, scored against a youth-usage task list.",
      ],
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
        { label: "Abandonment point", text: "Onboarding dies at the document-verification step, not at the start." },
        { label: "Avoidance behaviour", text: "Users avoid the app when it makes their financial reality visible and shameful." },
        { label: "Income mismatch", text: "Monthly-budget tools fail for daily or irregular income; users want 'save when you have it' mechanics." },
        { label: "Trust is visual", text: "Security copy gets skimmed; explicit visual trust cues (padlocks, step confirmations) are what people actually notice." },
      ],
    },
    designThinking: {
      lead: "I framed it as an onboarding + trust problem before a visual one, and deliberately killed two directions.",
      paragraphs: [
        "Direction A was a dark, 'premium fintech' dashboard — dismissed after two 10-minute concept checks. Dark surfaces made the balance feel heavier, and participants described it as 'for people who already have money'. Direction B was a one-screen dashboard with everything visible at once — failed information-hierarchy testing: users couldn't find their goal ring under the noise.",
        "The chosen direction: calm, high-contrast surfaces with a savings-first home screen, plus progressive onboarding that captures essentials first and defers verification to a later, better-timed step.",
      ],
      bullets: [
        { label: "Kept", text: "Savings-first home: goal progress, quick-save, then balance. The app leads with what the user wants, not what the bank wants to show." },
        { label: "Kept", text: "Progressive onboarding: 4 essentials up front (phone, ID, PIN, photo), verification deferred — standard progressive KYC, framed as an app feature, not paperwork." },
        { label: "Rejected", text: "Dark fintech aesthetic — tested, then cut for failing the 'understood' test with the actual audience." },
      ],
    },
    ia: {
      lead: "Before/after flows and a flat, goal-first site map.",
      paragraphs: [
        "The original onboarding ran eight screens including a document upload that appeared too early. The redesign runs four. In-app, the tree collapsed from a deep nested menu to five top-level destinations: Home, Money, Goals, Cards, More.",
      ],
      bullets: [
        { label: "Onboarding", text: "8 steps → 4. Document verification moved out of activation and into a later, prompted flow." },
        { label: "Home", text: "Balance, goal ring, and quick actions all reachable in 0 taps; no menu to open." },
        { label: "Goals", text: "Savings goals support irregular income — round-up, quick-save (+500, +1000), and 'save when paid' reminders instead of fixed monthly plans." },
      ],
    },
    design: {
      lead: "Hi-fi screens designed in phone frames, with notes attached to each interaction.",
      paragraphs: [
        "Onboarding, home dashboard, goal detail, and transfer were built as a small, consistent component set — buttons, cards, goal rings, amount keypad — so the system stayed coherent while I iterated on the flows. Accessibility was treated as a feature: 4.5:1 contrast minimum on all text, 48px touch targets, and a full-screen dark-safe palette.",
      ],
      bullets: [
        { label: "Greeting & balance", text: "Warm, personal header — the app says the customer's first name and shows a 'hustle' message, not a corporate tagline." },
        { label: "Goal ring", text: "Progress toward a named goal ('Trip to Mombasa') with quick-save chips sized to common hustles: +200, +500, +1000." },
        { label: "Trust cues", text: "Transaction confirmations show an explicit padlock + amount + recipient, and a 'bank-grade' badge at first send." },
      ],
    },
    testing: {
      lead: "Five moderated usability tests on a Maze prototype, then one iteration pass.",
      paragraphs: [
        "Task: activate the account, then set up a first savings goal. The first prototype passed activation cleanly — the deferred verification worked — but goal setup failed: users misread the goal card as a transaction history because the ring read as a loading spinner.",
        "Iteration: the goal ring gained a label ('Save goal'), a percentage, and a quick-save row directly under it. The second pass scored 100% task completion on the same five participants.",
      ],
      callouts: [
        {
          quote: "Oh, it's like a savings circle. I thought the ring was the network loading.",
          source: "Usability test, participant 3 · round 1",
        },
      ],
    },
    outcomes: [
      { metric: "Onboarding", value: "8 → 4 steps", note: "est. −50% activation abandonment (hypothesis-based; this is a conceptual study)" },
      { metric: "Goal visibility", value: "3 taps → 0", note: "goal progress on the home screen, always visible" },
      { metric: "SUS score", value: "68 → 84", note: "system usability scale across 5 moderated tests" },
    ],
    outcomeDetail:
      "As a conceptual study, outcomes are design hypotheses validated by usability testing, not production metrics. The deltas are the ones I'd instrument first in a live rollout: activation completion, first-goal creation rate, and 30-day retention.",
    lessons: [
      "My first instinct was a transactions-first dashboard. Research said savings-first. The research was right — lead with what the customer wants, not the ledger.",
      "Deferring verification felt like a compliance risk until I checked the facts: progressive KYC is standard practice, and the friction I was protecting is precisely the friction that kills activation.",
      "Trust cues are visual, not verbal. Users skim every security sentence — the padlock and the confirmation summary are what actually register.",
    ],
  },
  {
    slug: "kenyatrace",
    name: "KenyaTrace",
    year: "2024",
    kind: "LIVE PRODUCT",
    tagline:
      "A tourism explorer platform — user research and information architecture for planning multi-stop trips across Kenya.",
    summary:
      "Kenyan travelers plan multi-stop trips across county sites that were never built for them. I ran the user research, designed the information architecture, and built interactive prototypes for route planning — then shipped the product.",
    methods: ["User Research", "Information Architecture", "Interactive Prototyping", "Usability Testing"],
    role: "UX Research · Information Architecture · Prototyping",
    timeline: "5 weeks",
    tools: ["Figma", "FigJam", "Notion"],
    status: "Live product · 2024",
    liveUrl: "https://kenyatrace.vercel.app",
    liveUrlLabel: "kenyatrace.vercel.app",
    art: "design-system",
    image: "/thumbnails/kenya-tourism.png",
    heroCaption: "Live product — screens shown are from the shipped platform.",
    problem: {
      lead: "Planning a trip across Kenya means juggling ten county sites that don't talk to each other.",
      paragraphs: [
        "A traveler landing in Nairobi who wants Maasai Mara, Nakuru, and the coast has to hop between separate tourism sites, each single-destination and half of them broken on mobile. Interviews showed people fall back to WhatsApp groups and printed PDFs.",
      ],
    },
    research: {
      lead: "12 interviews with domestic travelers, a 34-response survey, and a competitive audit.",
      callouts: [
        {
          quote: "I ended up with 14 tabs open and a PDF from my cousin. That was the plan.",
          source: "Interviewee, 27 · Nairobi",
        },
      ],
      bullets: [
        { label: "Planning is the product", text: "The core job is assembling a multi-stop itinerary, not reading about one destination." },
        { label: "Mobile reality", text: "Most planning happens on phones, often on 3G — heavy image-first sites were unusable." },
        { label: "Trust gap", text: "Travelers trust people and reviews over county tourism copy." },
      ],
    },
    designThinking: {
      lead: "Map-first or list-first? The research decided.",
      paragraphs: [
        "A map-first UI is the obvious 'explorer' answer, but participants planning on patchy mobile networks timed out on map loads. The chosen direction was list-first with a map as a secondary view: destinations, then route assembly, then a shareable itinerary.",
      ],
      bullets: [
        { label: "Kept", text: "List-first browse with progressive loading — fast on 3G, works without GPS." },
        { label: "Kept", text: "Route builder that assembles stops into a shareable itinerary." },
        { label: "Rejected", text: "Map-only planning — beautiful, but it failed the connectivity reality." },
      ],
    },
    ia: {
      lead: "A county-and-experience taxonomy with a route builder at the center.",
      paragraphs: [
        "Destinations were organized by county with experiences layered on top (safari, culture, adventure, coast). The route builder turns a selection of stops into a day-by-day plan with distances and suggested time per stop.",
      ],
      bullets: [
        { label: "Browse", text: "County → destination → experiences, three predictable levels." },
        { label: "Build", text: "Add stops, reorder, set days per stop, preview the route." },
        { label: "Share", text: "One link carries the whole itinerary — no PDFs, no WhatsApp chains." },
      ],
    },
    design: {
      lead: "Mobile-first, editorial photography, calm palette.",
      paragraphs: [
        "The interface stays out of the photography's way — near-white surfaces, one accent, large imagery — and every screen is tested at small viewport sizes. Load states are designed, not accidental.",
      ],
    },
    testing: {
      lead: "Five usability tests on the route builder, then a focused iteration.",
      paragraphs: [
        "The first test found the biggest failure: adding a stop required leaving the route screen. One change — an inline 'add stop' from the itinerary — fixed the most-used task and cut the flow from six interactions to three.",
      ],
    },
    outcomes: [
      { metric: "Route planning", value: "6 interactions → 3", note: "inline stop-add after test round 1" },
      { metric: "Itinerary share", value: "1 link", note: "replaces PDF + WhatsApp-chain workflow" },
      { metric: "Mobile parity", value: "100%", note: "all planning tasks usable on a 360px viewport" },
    ],
    outcomeDetail:
      "KenyaTrace is live at kenyatrace.vercel.app. The interaction counts above were measured in moderated tests before launch.",
    lessons: [
      "The obvious design (map-first) was wrong for the users' actual connectivity. Field reality outranks portfolio logic.",
      "Interviewing before any screen meant the IA survived contact with real planning behavior — nothing had to be re-architected post-launch.",
      "One inline affordance fixed more than the flow diagram ever suggested. Watch task abandonment, not just completion.",
    ],
  },
  {
    slug: "gigi-energy",
    name: "GiGi Energy Drink",
    year: "2025",
    kind: "LIVE PRODUCT",
    tagline:
      "E-commerce UI for a Nairobi-made energy drink — bold brand, accessible palette, streamlined checkout.",
    summary:
      "GiGi is a youth brand with an adult problem: a checkout that leaked buyers. I led the UI design — bold typography, an accessible palette that kept the energy, and a checkout flow cut from four steps to three.",
    methods: ["UI Design", "Analytics Review", "Checkout Flows", "Accessibility Audit"],
    role: "UI Design · Conversion Flows",
    timeline: "4 weeks",
    tools: ["Figma", "GA4"],
    status: "Live product · 2025",
    liveUrl: "https://gigiflavours.vercel.app/",
    liveUrlLabel: "gigiflavours.vercel.app",
    art: "dashboard",
    image: "/thumbnails/gigi-energy.png",
    heroCaption: "Live product — the shipped storefront.",
    problem: {
      lead: "A loud brand and a quiet leak: shoppers added cans to cart, then vanished.",
      paragraphs: [
        "GA4 showed the same shape as every youth e-commerce site: heavy mobile traffic, healthy add-to-cart, and a checkout funnel that halved at the form-heavy middle. The palette, meanwhile, was brand-loud and unreadable for low-vision users — an accessibility liability the founders didn't know they had.",
      ],
    },
    research: {
      lead: "Analytics review plus a five-store competitive audit.",
      bullets: [
        { label: "Funnel leak", text: "Add-to-cart → checkout fell by 52%; the drop concentrated on the address + payment form." },
        { label: "Brand legibility", text: "Hot orange-on-pink text scored 2.1:1 contrast — illegible for a large slice of users." },
        { label: "Youth pattern", text: "Competitors won with one-page checkout and M-Pesa-first payment ordering." },
      ],
    },
    designThinking: {
      lead: "The tension: keep the energy, fix the legibility.",
      paragraphs: [
        "Two directions: keep the fluorescent palette and add dark text containers (the 'can' approach), or cool the palette down to a tasteful range (the 'label redesign' approach). The can approach won — the brand IS the product, and changing the palette was changing the product. Every brand color was remapped onto surfaces that pass AA contrast while staying loud.",
        "On checkout: four steps collapsed to three by merging address and delivery options, with M-Pesa moved first in payment order — the payment method 80% of shoppers were already using.",
      ],
    },
    ia: {
      lead: "Three-step checkout, brand-first storefront.",
      bullets: [
        { label: "Browse", text: "Flavour-led product cards with the brand voice front and center." },
        { label: "Buy", text: "Cart → details & delivery → pay with M-Pesa or card." },
        { label: "Trust", text: "Delivery estimate and payment security shown at the moment of the final tap." },
      ],
    },
    design: {
      lead: "Bold type as the interface, color as the flavor system.",
      paragraphs: [
        "Display type carries hierarchy so the palette can do its loud job without fighting the UI. Every flavour gets an accent that maps to its can. Touch targets, form labels, and error states were rebuilt to the WCAG AA baseline.",
      ],
    },
    testing: {
      lead: "Usability pass on the new checkout with five mobile users.",
      paragraphs: [
        "The merged step read as one continuous form, and M-Pesa-first removed the 'I'll pay later' hesitation that showed up in the audit. Two participants still expected a promo-code field at the top — added as an optional, clearly-collapsible row.",
      ],
    },
    outcomes: [
      { metric: "Checkout", value: "4 → 3 steps", note: "address + delivery merged" },
      { metric: "Contrast", value: "2.1:1 → ≥4.5:1", note: "AA on all text, brand intact" },
      { metric: "Payment order", value: "M-Pesa first", note: "matches the majority purchase pattern" },
    ],
    outcomeDetail:
      "GiGi is live at gigiflavours.vercel.app. Conversion deltas are directional; the funnel improvement is tracked in GA4 post-launch.",
    lessons: [
      "Accessibility work on a loud brand isn't a compromise — it's a design constraint that made the system better and more consistent.",
      "The checkout leak was a form problem, not a checkout problem. Fix the form and the funnel follows.",
      "Payment-order matches purchase behavior, not the merchant's card-processing preference. M-Pesa first, always.",
    ],
  },
  {
    slug: "dashboard-ui-system",
    name: "Complex Dashboard UI System",
    year: "2025",
    kind: "CONCEPTUAL",
    tagline:
      "A scalable dashboard UI system — dense data that stays legible, and specs a developer can actually build from.",
    summary:
      "Operational dashboards fail in two ways: they cram data without hierarchy, or they flatten everything into cards that hide the work. This conceptual study explores information architecture, data density, and developer-ready handoff — annotations and component specs, not screenshots.",
    methods: ["Information Architecture", "Data Design", "UI Systems", "Developer Handoff"],
    role: "IA · UI System · Handoff Documentation",
    timeline: "4 weeks (conceptual study)",
    tools: ["Figma", "Tokens Studio"],
    status: "Conceptual study · 2025",
    art: "dashboard",
    heroCaption:
      "Conceptual study — dark operational UI with the brand's lime accent. Composed as a handoff-ready screen.",
    problem: {
      lead: "Dense operational data, thin hierarchy, and handoff by screenshot.",
      paragraphs: [
        "Operational users — ops managers, finance teams, customer support leads — live in tables and charts, but most 'modern' dashboards are built for demos, not daily work: too much padding, cards that orphan key numbers, and designs that collapse the moment real data loads. Meanwhile, developers receive screenshots and guess the specs.",
      ],
    },
    research: {
      lead: "Analytical review of three internal tools plus task-focused user interviews.",
      bullets: [
        { label: "Scan, not read", text: "Users scan for exceptions first; the layout must surface outliers, not just totals." },
        { label: "Table density", text: "The data table is the workhorse — 60% of tasks lived there, yet it had the least design attention." },
        { label: "Handoff gap", text: "Developers reverse-engineered spacing, states, and edge cases from screenshots." },
      ],
    },
    designThinking: {
      lead: "Card-based or table-first? I chose density rules, not ideology.",
      paragraphs: [
        "Card-only dashboards hide the detail that operators actually use; table-only ones turn into spreadsheets with a sidebar. The direction: a tiered system where the top tier is KPI cards for at-a-glance status, the middle is the exception list and charts, and the bottom is a dense, spec'd table. Every tier has written density and hierarchy rules.",
      ],
    },
    ia: {
      lead: "A three-tier hierarchy with explicit rules for each layer.",
      bullets: [
        { label: "Tier 1 · Status", text: "KPI cards with delta indicators — green/red state at 2 seconds' glance." },
        { label: "Tier 2 · Context", text: "Exception list and trend charts — the 'why' under the KPI." },
        { label: "Tier 3 · Detail", text: "Dense data table with pinned columns, sticky headers, and keyboard-first row actions." },
      ],
    },
    design: {
      lead: "Dark UI with the brand's lime accent — built for extended daily use.",
      paragraphs: [
        "The palette is tuned for long sessions: warm dark surfaces, high-contrast data, one accent for interactive elements, and semantic colors reserved strictly for exceptions. Every component in the system ships with spec annotations — spacing, type scale, state rules, and empty/loading/error variants.",
      ],
      bullets: [
        { label: "KPI cards", text: "Value, delta, sparkline, and a click-through to the underlying report." },
        { label: "Data table", text: "Pinned first column, sticky header, density toggle, keyboard navigation." },
        { label: "Charts", text: "One chart language — no decorative geometry; gridlines and labels over flourish." },
      ],
    },
    testing: {
      lead: "Heuristic review plus a developer handoff walkthrough.",
      paragraphs: [
        "A developer walked the specs before any build — and immediately found the gap: row-selection states and pagination behavior weren't specified. Both were added as explicit component variants, which is exactly what a handoff review is for.",
      ],
    },
    outcomes: [
      { metric: "Task scan", value: "≤2 seconds", note: "exception state visible at a glance (heuristic baseline)" },
      { metric: "Handoff", value: "100% spec'd", note: "states, spacing, and edge cases annotated per component" },
      { metric: "Table density", value: "2×", note: "data rows per viewport vs. typical card-based dashboards" },
    ],
    outcomeDetail:
      "Conceptual study. The design hypothesis: a three-tier hierarchy with spec'd density rules will outperform both card-first and table-only dashboards on real operational tasks — measured in a future A/B or time-on-task study.",
    lessons: [
      "The data table deserves senior design attention. It is the workhorse of every operational product and the first thing designers deprioritize.",
      "Handoff is a deliverable, not a handoff. Spec annotations prevented the exact integration bugs that usually cost a sprint.",
      "Decorations are the enemy of dashboards. Every pixel of chart geometry should carry data.",
    ],
  },
  {
    slug: "design-system-creation",
    name: "Design System Creation",
    year: "2025",
    kind: "CONCEPTUAL",
    tagline:
      "Tokens, components, and documentation — the standards layer that keeps quality alive across products.",
    summary:
      "Products drift without standards. This conceptual study builds the evidence of how I define UX standards: a token-first system covering typography scale, color, spacing, buttons, form states, and an icon set — documented so teams adopt it instead of fighting it.",
    methods: ["Design Systems", "Typography", "Tokens", "Documentation"],
    role: "Design System · Tokens · Documentation",
    timeline: "3 weeks (conceptual study)",
    tools: ["Figma", "Tokens Studio"],
    status: "Conceptual study · 2025",
    art: "design-system",
    heroCaption:
      "Conceptual study — the style-guide cover: type scale, color tokens, buttons, form states, icons, spacing.",
    problem: {
      lead: "Every product shipped a different button. That's a quality problem, not a taste problem.",
      paragraphs: [
        "Across the dashboard and consumer work, the same patterns kept being re-invented with slightly different values — 17 button styles, 6 type scales, unlimited grays. Teams weren't sloppy; there were simply no standards to follow, and no documentation to disagree with.",
      ],
    },
    research: {
      lead: "An audit of three product surfaces plus designer interviews.",
      bullets: [
        { label: "17 button styles", text: "The same pattern, re-derived per screen, each with its own colors and radii." },
        { label: "Copy-paste drift", text: "Spacing values pasted and nudged until nothing aligned to a grid." },
        { label: "Adoption fear", text: "Designers wanted a system but feared a locked-down library they couldn't extend." },
      ],
    },
    designThinking: {
      lead: "Token-first, not component-first.",
      paragraphs: [
        "A component-first system gets adopted on day one and abandoned by week three when a product needs a new pattern. A token-first system gives teams primitives — type, color, spacing — that compose into any pattern. The design decision: ship tokens with a small starter set of components and a clear extension path, so adoption is low-friction and the system grows with usage.",
      ],
    },
    ia: {
      lead: "The standards document as a product: token layers, then components, then guidance.",
      bullets: [
        { label: "Tokens", text: "Type scale (7 steps), color ramp with semantic roles, spacing scale (4px base), radii, elevation." },
        { label: "Components", text: "Buttons (primary/secondary/ghost, all states), form inputs with validation states, toggles, dialogs." },
        { label: "Icons", text: "A 24px stroke icon set with consistent weights and alignment rules." },
        { label: "Docs", text: "Usage rules per component — when to use, when not to, and what to do when the system lacks the pattern." },
      ],
    },
    design: {
      lead: "The system as a poster: scale, chips, states, and grid in one view.",
      paragraphs: [
        "The documentation cover shows the whole system at a glance — type scale from display to caption, the color ramp as chips, every button and form state, and the spacing grid underneath. Editorial serif for display, grotesque for UI, the site's cream/ink/lime palette as the token source.",
      ],
    },
    testing: {
      lead: "Documentation review against the dashboard study, plus a designer walkthrough.",
      paragraphs: [
        "The system's first consumer was the dashboard study — it consumed the tokens and components directly, which surfaced three gaps: a missing 'warning' state, an undefined focus ring, and no guidance on nested tables. Each gap became a documented addition, which is the system working as intended.",
      ],
    },
    outcomes: [
      { metric: "Button styles", value: "17 → 3", note: "primary, secondary, ghost — every state specified" },
      { metric: "Type scale", value: "6 → 7 steps", note: "from display to caption with defined roles" },
      { metric: "Components", value: "10 core", note: "each with states, edge cases, and usage rules" },
    ],
    outcomeDetail:
      "Conceptual study. The success metric in a live context is adoption: the percentage of new screens using tokens within two sprints, and the measured drop in style divergence.",
    lessons: [
      "Tokens before components. Teams can't use a locked library, but they will compose primitives correctly.",
      "A system is only as good as its 'when not to use this' documentation. Guidance over gallery.",
      "The first product to consume the system defines its gaps. Build, then let the real work break it, then document the fix.",
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
