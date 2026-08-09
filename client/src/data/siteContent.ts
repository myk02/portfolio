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

export const heroStats = [
  { label: "Case studies", value: "5" },
  { label: "Live products shipped", value: "3" },
  { label: "Conceptual studies", value: "2" },
  { label: "Design tools", value: "Figma" },
];

export const aboutStats = heroStats;

export const aboutTitle = "Visual Thinker & UX Strategist";
export const aboutSubtitle =
  "Shaping digital experiences that feel personal and intuitive.";

export const aboutParagraphs = [
  "As a UI/UX Designer, I thrive in fast-paced environments where I can act as an internal consultant. I specialize in translating complex business requirements into elegant, user-centric solutions. I excel at collaborating across business, technology, and creative teams to build consensus and deliver products that solve real-world UX challenges.",
  "I'm comfortable scoping, estimating, and prioritizing work in fast-paced environments — breaking ambiguous briefs into clear deliverables, setting realistic timelines, and shipping on schedule without sacrificing quality.",
];

export const skillGroups = [
  {
    title: "Core UX/UI Toolkit",
    skills: [
      "Figma (Wireframes, Prototypes, Design Systems)",
      "FigJam & Miro (Workshops, Journey Mapping)",
      "Adobe Creative Cloud (Visual Design, Branding)",
      "Sketch (Interface Design, Handoff)",
    ],
  },
  {
    title: "UX Methodologies",
    skills: [
      "User Research & Surveys",
      "Competitive Analysis & Market Research",
      "Wireframing & Prototyping",
      "Information Architecture",
      "Usability Testing",
      "Stakeholder Management",
    ],
  },
  {
    title: "Technical Collaboration",
    skills: ["React", "Next.js", "HTML/CSS", "Tailwind CSS"],
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
