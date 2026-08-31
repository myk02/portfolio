export interface MetricCardData {
  label: string;
  value: string;
  baseline?: string;
  result?: string;
  tone?: "positive" | "negative" | "neutral";
  direction?: "up" | "down" | "flat";
  note?: string;
}

export interface Shot {
  name: string;
  alt: string;
  caption: string;
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface PrototypeLink {
  kind: "internal" | "external";
  href: string;
  label: string;
}

export interface StudyVisuals {
  prototype: PrototypeLink;
  validate: { before: { label: string; note: string }; after: { label: string; note: string } };
  metricCards: MetricCardData[];
  hero?: {
    mobile: string;
    tablet: string;
    desktop: string;
    alt: string;
    caption: string;
  };
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
    ],
    validate: {
      before: { label: "Before", note: "Adding a stop left the route screen — 6 interactions" },
      after: { label: "After", note: "Inline add-stop — 3 interactions, most-used task" },
    },
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
    ],
    validate: {
      before: { label: "Before", note: "4-step checkout — funnel halves at address + payment" },
      after: { label: "After", note: "3 steps, M-Pesa first — matches 80% of shoppers" },
    },
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
  },
  legalflow: {
    prototype: {
      kind: "external",
      href: "https://law-ten-iota.vercel.app",
      label: "View live product ↗",
    },
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
    validate: {
      before: { label: "Before", note: "Five disconnected tools — billing trailed the work" },
      after: { label: "After", note: "One workspace — intake, matter, billing, payments linked" },
    },
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
  },
};
