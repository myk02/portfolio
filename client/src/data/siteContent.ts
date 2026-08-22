import {
  BarChart3,
  Bot,
  Code,
  Headphones,
  Layers,
  Palette,
  Printer,
  Shield,
  Video,
  type LucideIcon,
} from "lucide-react";

export const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "services", label: "Services" },
  { id: "pricing", label: "Pricing" },
  { id: "contact", label: "Contact" },
] as const;

export const toolkit = [
  "Figma",
  "Adobe CC",
  "WordPress",
  "Canva",
  "CapCut Pro",
  "HTML/CSS",
  "GA4",
  "Webflow",
];

export const devToolkit = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "Tailwind CSS",
  "Python",
  "PHP",
  "SQL",
  "PostgreSQL",
  "Supabase",
  "Convex",
  "REST APIs",
  "Git",
  "GitHub",
  "Vercel",
  "Azure",
  "Postman",
];

export const roleLine =
  "Software Developer · UI/UX Developer · Automation Specialist";

export const heroHeadline = "I ship.";

export const heroSupporting =
  "Reliable web products from design to deployment — responsive, accessible React interfaces wired to real APIs.";

export const heroStats = [
  { label: "Live products", value: "2" },
  { label: "e2e tests passing", value: "22" },
  { label: "Frontend stack", value: "React + TS" },
];

export const aboutStats = heroStats;

export const aboutTitle = "Web Developer & Product-minded Frontend Engineer";
export const aboutSubtitle =
  "I turn designs and requirements into reliable, accessible production interfaces.";

export const aboutParagraphs = [
  "Developer, designer, API and automation specialist in Nairobi. I build responsive, accessible interfaces, connect them to real services, and debug to root cause. My design background means requirements get read right the first time.",
];

/** Application-facing line shown near contact CTAs. */
export const applicationLine =
  "I'm interested in building reliable products for people and teams who depend on them.";

/** Compact skills row for the slim About section. */
export const coreSkills = [
  "TypeScript",
  "React",
  "Tailwind CSS",
  "REST APIs",
  "Playwright e2e",
  "Accessibility",
  "Git & Vercel",
];

/**
 * "What I do" — mirrors the public LinkedIn service categories, grouped by
 * intent. Descriptions stay within what the portfolio/CV already evidence.
 * `href` anchors point at proof sections on this page.
 */
export type ServiceGroupId = "build" | "design" | "operate";

export const serviceGroups: {
  id: ServiceGroupId;
  heading: string;
  blurb: string;
  items: { title: string; desc: string; href?: string }[];
}[] = [
  {
    id: "build",
    heading: "Build",
    blurb: "Products and systems, shipped.",
    items: [
      {
        title: "Web Development",
        desc: "Responsive, accessible sites and apps in React, TypeScript, and Tailwind — deployed on Vercel.",
        href: "#work",
      },
      {
        title: "SaaS Development",
        desc: "Product flows, multi-step forms, operational states, and integrations for software people rely on.",
        href: "#work",
      },
      {
        title: "API Integrations",
        desc: "Typed backend functions and third-party APIs wired end-to-end, failures handled explicitly.",
        href: "#engineering",
      },
      {
        title: "Automation",
        desc: "n8n workflows that remove repetitive work — lead qualification, invoicing, ticket routing, reporting.",
        href: "#engineering",
      },
    ],
  },
  {
    id: "design",
    heading: "Design",
    blurb: "Interfaces that read clearly and ship cleanly.",
    items: [
      {
        title: "Web Design",
        desc: "Editorial, brand-true layouts that survive contact with real content.",
        href: "#work",
      },
      {
        title: "UI/UX Design",
        desc: "Research-led flows and usability testing — my first craft, now feeding cleaner handoffs.",
        href: "#work",
      },
      {
        title: "Design Systems",
        desc: "Tokens and component libraries documented so quality survives team growth.",
        href: "#work",
      },
      {
        title: "Brand & Graphic Design",
        desc: "Logos, social assets, presentations, and print in Figma and Adobe CC.",
      },
    ],
  },
  {
    id: "operate",
    heading: "Operate & improve",
    blurb: "Keeping products healthy after launch.",
    items: [
      {
        title: "Technical Support",
        desc: "Fault-finding from user symptom to root cause — logged so nothing is diagnosed twice.",
        href: "#engineering",
      },
      {
        title: "Debugging & Performance",
        desc: "DevTools-driven investigation; fixes aimed at causes, not symptoms.",
        href: "#engineering",
      },
      {
        title: "Website Management & Analytics",
        desc: "Uptime, scheduled patches, page speed, GA4 funnels reviewed post-launch.",
      },
      {
        title: "Accessibility",
        desc: "AA contrast, keyboard paths, labelled forms — verified rather than assumed.",
        href: "#engineering",
      },
      {
        title: "Security-minded Implementation",
        desc: "Hosted payment flows, server-side verification, secrets kept out of the client bundle.",
        href: "#engineering",
      },
      {
        title: "Network Support",
        desc: "LAN/WAN, DNS/DHCP, and Wi-Fi troubleshooting for small offices and home setups.",
      },
    ],
  },
];

export const skillGroups = [
  {
    title: "Frontend engineering",
    skills: [
      "JavaScript / ES6+",
      "TypeScript",
      "React 19",
      "Next.js",
      "Semantic HTML",
      "CSS / Tailwind v4",
      "Responsive UI",
    ],
  },
  {
    title: "Product quality",
    skills: [
      "Accessibility (AA contrast, focus states)",
      "Form validation & error handling",
      "Loading / error / empty states",
      "Browser & viewport testing",
      "Performance awareness",
    ],
  },
  {
    title: "Systems & data",
    skills: [
      "Component architecture",
      "Design tokens",
      "State modeling (hooks + context)",
      "REST APIs",
      "Convex backend functions",
    ],
  },
  {
    title: "Delivery & collaboration",
    skills: [
      "Git & GitHub",
      "Code review via PRs",
      "Vercel deploys",
      "Playwright e2e",
      "Figma-to-code handoff",
      "GA4 analytics",
    ],
  },
  {
    title: "Languages",
    skills: ["English (Fluent)", "Kiswahili (Fluent)"],
  },
];

export type ServiceItem = { icon: LucideIcon; title: string; desc: string };

export const services: ServiceItem[] = [
  {
    icon: Palette,
    title: "Brand & Graphic Design",
    desc: "Logos, brand colours, social posts, email graphics, presentations, and print work. I use Figma, Adobe Creative Suite, and Canva.",
  },
  {
    icon: Code,
    title: "Development",
    desc: "I design and build fast, responsive websites and custom web apps with React, Next.js, TypeScript, Node.js, APIs, and databases. From landing pages to full-stack platforms, I handle both frontend and backend delivery.",
  },
  {
    icon: Video,
    title: "Motion & Social Video",
    desc: "Short videos, GIFs, and simple motion graphics for social media. I use CapCut Pro, Canva, and Adobe tools.",
  },
  {
    icon: Layers,
    title: "UX/UI Design",
    desc: "I plan and design website and app screens so they are easy to use and work well on phones and computers.",
  },
  {
    icon: BarChart3,
    title: "SEO & Web Analytics",
    desc: "I set up pages with proper titles, alt text, and structure. I also use GA4 to see what is working and what needs to change.",
  },
  {
    icon: Printer,
    title: "Print & Event Materials",
    desc: "Brochures, banners, merch, and event materials that match the rest of your brand.",
  },
  {
    icon: Bot,
    title: "AI Workflow & Automation",
    desc: "Custom n8n workflows for lead enrichment, social scheduling, invoice processing, ticket classification, and reporting. I connect your tools so your team does less manual work.",
  },
];

export const supplementaryServices: ServiceItem[] = [
  {
    icon: BarChart3,
    title: "Website Management",
    desc: "I keep client sites updated and running. I track uptime, watch page speed, apply patches on schedule, and call hosting support when a site goes down.",
  },
  {
    icon: Headphones,
    title: "IT Support & Helpdesk",
    desc: "Hardware problems, software errors, locked accounts, and AV setup for meetings and events. I log everything in Jira so there is a clear record.",
  },
  {
    icon: Shield,
    title: "Network & Security",
    desc: "LAN and WAN issues, DNS, DHCP, Wi-Fi problems, security checks, patches, and backups that are actually tested.",
  },
];

export const processSteps = [
  {
    title: "Discover",
    desc: "Align on goals, audience, and constraints before any visual work starts.",
  },
  {
    title: "Design",
    desc: "Shape concepts, systems, and prototypes with feedback loops and iteration.",
  },
  {
    title: "Deliver",
    desc: "Build, test, and launch with performance, accessibility, and SEO basics in place.",
  },
];

export const pricingRows = [
  {
    service: "Brand & Graphic Design",
    starting: "KSh 20,000",
    range: "KSh 20,000 to 100,000",
    model: "Per project",
    icon: Palette,
  },
  {
    service: "Development",
    starting: "KSh 30,000",
    range: "KSh 30,000 to 150,000",
    model: "Per project",
    icon: Code,
  },
  {
    service: "Motion & Social Video",
    starting: "KSh 15,000",
    range: "KSh 15,000 to 60,000",
    model: "Per project",
    icon: Video,
  },
  {
    service: "UX/UI Design",
    starting: "KSh 25,000",
    range: "KSh 25,000 to 120,000",
    model: "Per project",
    icon: Layers,
  },
  {
    service: "SEO & Web Analytics",
    starting: "KSh 10,000",
    range: "KSh 10,000 to 50,000",
    model: "Monthly retainer",
    icon: BarChart3,
  },
  {
    service: "Print & Event Materials",
    starting: "KSh 15,000",
    range: "KSh 15,000 to 80,000",
    model: "Per project",
    icon: Printer,
  },
  {
    service: "AI Workflow & Automation",
    starting: "KSh 20,000",
    range: "KSh 20,000 to 120,000",
    model: "Per project",
    icon: Bot,
  },
];

export const caseStudyOutcomes: Record<string, string> = {
  gmcode: "Built for measurable growth and smoother customer journeys.",
  gmmarketing: "Designed to increase engagement with short-form storytelling.",
};

export const projectMeta: Record<
  string,
  { year?: string; conceptual?: boolean; live?: boolean }
> = {
  "GiGi Energy Drink": { year: "2025" },
  KenyaTrace: { year: "2024", live: true },
  "Mobile Banking App Redesign": { year: "2025", conceptual: true },
  "Complex Dashboard UI System": { year: "2025", conceptual: true },
  "Design System Creation": { year: "2025", conceptual: true },
};

export const subBrands = [
  { id: "gmmarketing" as const, label: "GM Marketing", icon: Video },
  { id: "gmcode" as const, label: "GMCode", icon: Code },
  { id: "gmautomation" as const, label: "GM Automation", icon: BarChart3 },
];

export const contactItems = [
  {
    label: "Email",
    value: "mikegary201@gmail.com",
    href: "mailto:mikegary201@gmail.com",
  },
  { label: "Phone", value: "0792618156", href: "tel:0792618156" },
  { label: "Location", value: "Nairobi, Kenya · Remote", href: undefined },
];

export const socialLinks = [
  {
    href: "mailto:mikegary201@gmail.com",
    icon: "https://cdn.simpleicons.org/gmail/EA4335",
    alt: "Email",
    className: "bg-gray-100 dark:bg-slate-700",
  },
  {
    href: "https://wa.me/254792618156",
    icon: "https://cdn.simpleicons.org/whatsapp/25D366",
    alt: "WhatsApp",
    className: "bg-gray-100 dark:bg-slate-700",
  },
  {
    href: "https://linkedin.com/in/mike-waitindi-654bb2344",
    icon: null,
    alt: "LinkedIn",
    className: "bg-[#0A66C2]",
  },
];

export const footerLinks = [
  { href: "mailto:mikegary201@gmail.com", label: "Email" },
  { href: "https://wa.me/254792618156", label: "WhatsApp" },
  {
    href: "https://linkedin.com/in/mike-waitindi-654bb2344",
    label: "LinkedIn",
  },
];
