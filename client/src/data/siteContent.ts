import { liveCount } from "@/data/projects";

export const positionTitle =
  "Solution Engineer, Frontend Developer, Designer, APIs, Tech Support & Automation Specialist";

export const roleLine =
  "Solution Engineer · Frontend Developer · Designer · APIs · Tech Support · AI Automation";

export const roleChips = [
  "Solution Engineer",
  "Frontend Developer",
  "Designer",
  "APIs",
  "Tech Support",
  "Automation Specialist",
  "Data Engineering",
  "Cloud (GCP)",
  "AI Solutions",
] as const;

export const heroHeadline = "Brand direction, web apps, AI automation — launch-ready digital experiences.";

export const heroSubline =
  "I'm Mike Waitindi, in Nairobi — Frontend Developer, Designer, APIs, Tech Support & Automation Specialist, also working as a Solution Engineer. Brand direction, web apps, AI automation, and launch-ready digital experiences — plus data pipelines (CSV/TSV → queryable datasets), Dockerised services on Google Cloud Run, and AI: semantic search, embeddings, LLM workflows, MCP.";

export const heroStats = [
  { label: "Live products shipped", value: String(liveCount) },
  { label: "Checkout steps cut (GiGi)", value: "4→3" },
  { label: "Route-planning taps cut (KenyaTrace)", value: "6→3" },
];

export const aboutParagraphs = [
  "I'm Mike Waitindi — Frontend Developer, Designer, APIs, Tech Support & Automation Specialist in Nairobi, also working as a Solution Engineer. What I do: brand direction, web apps, AI automation, and launch-ready digital experiences — end to end, from first sketch to shipped product.",
  `${liveCount} live products prove the loop — KenyaTrace (multi-stop trip planner, 6→3 taps), GiGi Energy (accessible storefront, 4→3 checkout, M-Pesa first), and LegalFlow (mobile-first PWA workspace) — each with a live demo, repo, and case study.`,
  "As a Solution Engineer I design and build robust data ingestion pipelines — raw CSV/TSV into structured, queryable datasets, custom entity modelling and schema mapping — on SQLite, Cloud SQL and BigQuery. I ship Dockerised services (data loading, embedding generation, data-serving) to Google Cloud Run with Redis, VPC, Artifact Registry, Cloud Storage, IAM and ingress controls, automated via GitHub Actions. On top: natural-language querying, semantic search, embeddings, LLM workflows, and agentic/MCP integrations — with strong Python (Pandas), SQL, REST APIs, Flask/Jinja, WSL and Cloud Shell.",
];

export const applicationLine =
  "Hiring across Frontend Development, Design, APIs, Tech Support, Automation — or a Solution Engineer (data, cloud, AI)? Full-time onsite in Nairobi or remote — brand direction, web apps, AI automation, launch-ready delivery.";

export const frontendToolbox = [
  {
    group: "Solution engineering — data",
    skills: ["Python + Pandas", "SQL (relational + analytical)", "CSV/TSV ingestion pipelines", "Entity modelling + schema mapping", "SQLite", "BigQuery", "Cloud SQL", "Flask + Jinja"],
  },
  {
    group: "Solution engineering — cloud & DevOps",
    skills: ["Google Cloud Run", "Docker + containerised services", "Redis", "VPC networking + ingress", "Artifact Registry", "Cloud Storage", "Cloud IAM", "GitHub Actions (scheduled ingestion, embeddings, container builds)"],
  },
  {
    group: "Solution engineering — AI",
    skills: ["Embeddings + Sentence Transformers", "Semantic search", "Natural-language querying", "LLM-powered workflows", "Agentic architectures", "Model Context Protocol (MCP)"],
  },
  {
    group: "Web build — core",
    skills: ["React 19", "TypeScript", "JavaScript (ES6+)", "HTML5 semantics", "CSS3", "Tailwind CSS v4"],
  },
  {
    group: "Engineering & delivery",
    skills: ["Responsive design (360px → desktop)", "Component architecture", "State + URL state", "REST API design + integration", "Forms + validation", "Routing (wouter)", "WSL + Cloud Shell"],
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
    role: "Solution Engineer · Data, Cloud & AI",
    title: "Data pipelines, cloud & AI solutions",
    text: "Robust ingestion (CSV/TSV → structured datasets), entity modelling + schema mapping, Dockerised services on Cloud Run, and AI: NL querying, semantic search, embeddings, LLM workflows, MCP.",
    features: ["Python + Pandas ingestion pipelines", "SQLite · Cloud SQL · BigQuery", "Docker → Cloud Run + Redis, VPC, IAM", "Embeddings, LLM workflows, MCP + GitHub Actions"],
    proof: "2+ years data / cloud / backend — scalable, reliable, production-ready",
  },
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
  "Solution Engineering",
  "Python",
  "Pandas",
  "SQL",
  "Docker",
  "Google Cloud Run",
  "BigQuery",
  "Cloud SQL",
  "SQLite",
  "Redis",
  "VPC + IAM",
  "Artifact Registry",
  "Cloud Storage",
  "GitHub Actions",
  "Embeddings + LLMs",
  "MCP",
  "Semantic Search",
  "REST APIs",
  "Flask",
  "React 19",
  "TypeScript",
  "JavaScript (ES6+)",
  "HTML5 + ARIA",
  "Tailwind CSS",
  "Responsive UI",
  "Component Systems",
  "M-Pesa Integration",
  "Playwright E2E",
  "WCAG Accessibility",
  "AI Workflows",
  "Project Delivery",
  "Tech Support",
  "Vercel + Vite",
];

