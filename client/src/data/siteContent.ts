import { liveCount } from "@/data/projects";

export const positionTitle =
  "Developer, Designer, Project Manager & Automation Specialist";

export const roleLine =
  "Developer · Designer · Project Manager · APIs · Tech Support · AI Automation";

export const roleChips = [
  "Software Developer",
  "Frontend Developer",
  "UI Designer",
  "Project Manager",
  "API Integration",
  "Tech Support",
  "AI Automation & Workflows",
] as const;

export const heroHeadline = "From idea to shipped product — designed, built, managed, and supported.";

export const heroSubline =
  "I'm Mike Waitindi, in Nairobi — I take products from idea to shipped: design, API-driven UI, design systems, managed delivery, tech support, and automation workflows that remove busywork.";

export const heroStats = [
  { label: "Live products shipped", value: String(liveCount) },
  { label: "Checkout steps cut (GiGi)", value: "4→3" },
  { label: "Route-planning taps cut (KenyaTrace)", value: "6→3" },
];

export const aboutParagraphs = [
  "I'm Mike Waitindi — developer, designer, project manager, and automation specialist in Nairobi. I take products from brand direction to launch-ready: web apps, API integrations, design systems, managed delivery, tech support, and AI automation workflows.",
  `${liveCount} live products prove the loop — KenyaTrace (multi-stop trip planner, 6→3 taps), GiGi Energy (accessible storefront, 4→3 checkout, M-Pesa first), and LegalFlow (mobile-first PWA workspace) — each with a live demo, repo, and case study.`,
];

export const applicationLine =
  "Hiring across roles — development, design, project delivery, API work, support, or AI automation? Full-time or freelance — clear process, fast feedback, launch-ready delivery.";

export const frontendToolbox = [
  {
    group: "Web build — core",
    skills: ["React 19", "TypeScript", "JavaScript (ES6+)", "HTML5 semantics", "CSS3", "Tailwind CSS v4"],
  },
  {
    group: "Engineering & delivery",
    skills: ["Responsive design (360px → desktop)", "Component architecture", "State + URL state", "REST API integration", "Forms + validation", "Routing (wouter)"],
  },
  {
    group: "Quality & shipping",
    skills: ["Accessibility (WCAG AA)", "Core Web Vitals", "Playwright E2E testing", "Vite builds", "Vercel deployment + previews", "Git + code review"],
  },
] as const;

export const frontendServices = [
  {
    title: "Responsive web apps",
    text: "React + TypeScript apps that work at 360px on 3G phones and scale to desktop — list-first IA, progressive loading, shareable URL state.",
    proof: "KenyaTrace: 6→3 taps, 100% mobile task parity",
  },
  {
    title: "Design-to-code UI systems",
    text: "Figma-to-production component libraries with variants, disabled / error / loading states, tokens, and docs — pixel-faithful and reusable.",
    proof: "GiGi Energy: brand remapped to AA contrast",
  },
  {
    title: "Accessible, tested interfaces",
    text: "Semantic HTML, keyboard paths, focus management, axe-checked contrast, and Playwright E2E coverage on checkout and core flows.",
    proof: "GiGi checkout: 4→3 steps, M-Pesa first",
  },
  {
    title: "Performance & PWA delivery",
    text: "Image optimization (WebP), lazy loading, minimal JS, installable PWAs, and Vercel CI/CD with preview-per-PR.",
    proof: "LegalFlow: mobile-first installable PWA",
  },
] as const;

export const frontendPractices = [
  "Mobile-first, verified on real 360–390px viewports",
  "Semantic landmarks, labels, focus states, AA contrast",
  "Loading / empty / error / retry states on every async UI",
  "Type-safe props, small components, documented APIs",
  "E2E tests for money and mission-critical paths",
  "Live demo + repo + case study for every project",
] as const;

export const services = [
  {
    role: "Developer · Web Apps",
    title: "Launch-ready web apps",
    text: "Responsive React + TypeScript apps, shipped to Vercel with previews, E2E-tested core flows, and docs — from first commit to production URL.",
    features: ["React 19 + TypeScript builds", "Responsive 360px → desktop", "E2E-tested releases", "Vercel CI/CD + previews"],
    proof: "3 live products, each with demo + repo + case study",
  },
  {
    role: "Designer · Brand Direction",
    title: "Brand direction & UX/UI design",
    text: "Brand systems, UX flows, and Figma-to-code UI — one visual language from logo and palette to shipped components.",
    features: ["Brand + palette systems", "UX flows & IA", "Figma-to-code components", "AA-contrast enforcement"],
    proof: "GiGi Energy: bold brand remapped to WCAG AA, intact",
  },
  {
    role: "Project Manager",
    title: "Managed delivery, solo to launch",
    text: "Scoped plans, weekly demos, and honest timelines — KenyaTrace in 5 weeks, GiGi in 4, LegalFlow in 7. You always know what's next.",
    features: ["Scoped milestones + demos", "Risk-first sequencing", "Field-tested timelines", "Handover docs included"],
    proof: "3 solo launches: 5, 4, and 7 weeks",
  },
  {
    role: "APIs",
    title: "API design & integration",
    text: "API-driven UI done right: typed clients, loading / empty / error / retry states, forms with inline validation, and third-party hooks.",
    features: ["Typed REST integration", "M-Pesa-first payments", "GA4 analytics hooks", "Shareable URL state"],
    proof: "GiGi: M-Pesa-first checkout · KenyaTrace: 1-link itineraries",
  },
  {
    role: "Tech Support",
    title: "Tech support & care plans",
    text: "Post-launch support that keeps sites fast and owners confident — triage, fixes, content updates, and plain-language reports.",
    features: ["<24h response (Mon–Sat, EAT)", "Bug triage + fixes", "Content & data updates", "Handover + docs"],
    proof: "Every launch ships with support contact + docs",
  },
  {
    role: "AI Automation · AI Workflows",
    title: "AI automation & AI workflows",
    text: "Practical AI workflows that remove busywork: intake triage, content drafts, lead routing, QA checklists — wired into your stack, reviewed by a human.",
    features: ["Intake → triage → reply drafts", "Content + SEO draft pipelines", "Lead capture → WhatsApp/email routing", "QA + release checklists"],
    proof: "Offered as scoped pilots — fixed outcome, human-reviewed",
  },
] as const;

export const automationWorkflow = [
  "Map: pick one repetitive flow (intake, content, follow-ups)",
  "Wire: connect forms, inbox, WhatsApp/email, and your tools",
  "Draft: AI prepares the reply, summary, or content — human approves",
  "Measure: time saved + errors caught, reported weekly",
] as const;

export const coreSkills = [
  "React 19",
  "TypeScript",
  "JavaScript (ES6+)",
  "HTML5 + ARIA",
  "Tailwind CSS",
  "Responsive UI",
  "Component Systems",
  "REST APIs",
  "M-Pesa Integration",
  "Playwright E2E",
  "WCAG Accessibility",
  "AI Workflows",
  "Project Delivery",
  "Tech Support",
  "Vercel + Vite",
];

