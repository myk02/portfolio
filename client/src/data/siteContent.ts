import { liveCount } from "@/data/projects";

export const positionTitle =
  "Frontend Developer, Designer, APIs, Tech Support & Automation Specialist, also working as a Solution Engineer";

export const roleLine =
  "Frontend Developer · Designer · APIs · Tech Support · Automation · Solution Engineer";

export const roleChips = [
  "Frontend Developer",
  "Designer",
  "APIs",
  "Tech Support",
  "Automation Specialist",
  "Data Engineering",
  "Cloud (GCP)",
  "Solution Engineer",
] as const;

export const heroTagline =
  "Brand direction, web apps, automation, and launch-ready digital experiences.";

export const heroSubline =
  "I'm Mike Waitindi, in Nairobi — Frontend Developer, Designer, APIs, Tech Support & Automation Specialist, also working as a Solution Engineer. Brand direction, web apps, automation, and launch-ready digital experiences.";

export const heroStats = [
  { label: "Live products shipped", value: String(liveCount) },
  { label: "Checkout steps cut (GiGi)", value: "4→3" },
  { label: "Route-planning taps cut (KenyaTrace)", value: "6→3" },
];

export const aboutParagraphs = [
  "I'm Mike Waitindi — a Nairobi-based builder working across frontend, brand, APIs, support, and automation, also as a Solution Engineer.",
  `${liveCount} live products: KenyaTrace, GiGi Energy, LegalFlow — each with a demo, repo, and case study.`,
];

export const applicationLine =
  "Hiring across Frontend Development, Design, APIs, Tech Support, Automation — or a Solution Engineer (data, cloud)? Full-time onsite in Nairobi or remote — brand direction, web apps, automation, launch-ready delivery.";

export const frontendToolbox = [
  {
    group: "Solution engineering — data",
    skills: ["Python + Pandas", "SQL (relational + analytical)", "CSV/TSV ingestion pipelines", "Entity modelling + schema mapping", "SQLite", "BigQuery", "Cloud SQL", "Flask + Jinja"],
  },
  {
    group: "Solution engineering — cloud & DevOps",
    skills: ["Google Cloud Run", "Docker + containerised services", "Redis", "VPC networking + ingress", "Artifact Registry", "Cloud Storage", "Cloud IAM", "GitHub Actions (scheduled ingestion + container builds)"],
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
    text: "React + TypeScript, mobile-first, 360px to desktop.",
  },
  {
    title: "Design-to-code UI systems",
    text: "Figma to production components, reusable and consistent.",
  },
  {
    title: "Accessible, tested interfaces",
    text: "Semantic HTML, keyboard paths, Playwright E2E.",
  },
  {
    title: "Performance & PWA delivery",
    text: "Fast loads, installable PWAs, preview-per-PR deploys.",
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
    role: "Solution Engineer · Data & Cloud",
    title: "Data pipelines & cloud",
    text: "CSV → structured data, Dockerised services on Cloud Run.",
  },
  {
    role: "Developer · Web Apps",
    title: "Launch-ready web apps",
    text: "Responsive React + TypeScript apps, shipped to production.",
  },
  {
    role: "Designer · Brand Direction",
    title: "Brand & UI design",
    text: "Brand systems and Figma-to-code interfaces.",
  },
  {
    role: "Project Manager",
    title: "Managed delivery",
    text: "Scoped plans, weekly demos, solo to launch.",
  },
  {
    role: "APIs",
    title: "API design & integration",
    text: "Typed REST, M-Pesa payments, third-party hooks.",
  },
  {
    role: "Tech Support",
    title: "Tech support",
    text: "Fast fixes, updates, and plain-language reports.",
  },
  {
    role: "Automation · Workflows",
    title: "Automation & workflows",
    text: "Scoped pilots that remove repetitive busywork.",
  },
] as const;

export const coreSkills = [
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Python + Pandas",
  "SQL",
  "BigQuery",
  "Docker",
  "Google Cloud Run",
  "REST APIs",
  "M-Pesa Integration",
  "Playwright E2E",
  "Automation Workflows",
];

