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
  { id: "reviews", label: "Reviews" },
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
  { label: "Years experience", value: "4+" },
  { label: "Projects delivered", value: "30+" },
  { label: "Live websites", value: "7+" },
];

export const aboutStats = [
  { label: "Years experience", value: "4+" },
  { label: "Design projects", value: "15+" },
  { label: "Websites & apps", value: "7+" },
  { label: "Automation workflows", value: "8+" },
];

export const aboutParagraphs = [
  "I'm a designer, full-stack developer, and AI workflow specialist who helps service businesses, startups, and growing brands turn ideas into clear, usable, and launch-ready digital experiences. Whether it's a brand identity, a custom web application, or an n8n-powered automation, I care about work that feels consistent, performs well, and genuinely serves the people using it.",
  "I hold a Bachelor of Information Technology and work fluently in English and Kiswahili, which lets me collaborate comfortably with both local and international teams.",
];

export const skillGroups = [
  {
    title: "Design & Brand",
    skills: ["Figma", "Adobe Creative Suite", "Canva", "CapCut Pro", "Brand Guidelines", "Typography", "Print Design", "Motion Graphics"],
  },
  {
    title: "Full-Stack Development",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "Node.js", "Express", "HTML/CSS", "Tailwind CSS", "Python", "PHP", "SQL", "PostgreSQL", "Supabase", "Convex", "REST APIs", "Responsive Design", "Accessible Design"],
  },
  {
    title: "Cloud & Developer Tools",
    skills: ["Azure", "Git", "GitHub", "Vercel", "Postman", "Ubuntu Linux", "macOS", "Figma Handoffs", "AI Workflow Tools"],
  },
  {
    title: "Marketing & Analytics",
    skills: ["On-page SEO", "GA4", "Social Media Strategy", "Content Planning", "Brand Campaigns", "Uptime Monitoring", "Site Speed", "Hosting Support"],
  },
  {
    title: "IT Support & Infrastructure",
    skills: ["Jira", "Active Directory", "Microsoft 365", "ERP Systems", "LAN/WAN", "DNS", "DHCP", "Wi-Fi", "Security Patching", "Backup & Restore", "Training & Documentation"],
  },
  {
    title: "Languages",
    skills: ["English (Fluent)", "Kiswahili (Fluent)"],
  },
  {
    title: "AI & Automation",
    skills: ["n8n", "OpenAI API", "Webhooks", "Lead Enrichment", "Social Scheduling", "Invoice Processing", "Ticket Classification", "Dashboard Reporting", "Data Pipelines"],
  },
];

export type ServiceItem = { icon: LucideIcon; title: string; desc: string };

export const services: ServiceItem[] = [
  { icon: Palette, title: "Brand & Graphic Design", desc: "Logos, brand colours, social posts, email graphics, presentations, and print work. I use Figma, Adobe Creative Suite, and Canva." },
  { icon: Code, title: "Full-Stack Development", desc: "I design and build fast, responsive websites and custom web apps with React, Next.js, TypeScript, Node.js, APIs, and databases. From landing pages to full-stack platforms, I handle both frontend and backend delivery." },
  { icon: Video, title: "Motion & Social Video", desc: "Short videos, GIFs, and simple motion graphics for social media. I use CapCut Pro, Canva, and Adobe tools." },
  { icon: Layers, title: "UX/UI Design", desc: "I plan and design website and app screens so they are easy to use and work well on phones and computers." },
  { icon: BarChart3, title: "SEO & Web Analytics", desc: "I set up pages with proper titles, alt text, and structure. I also use GA4 to see what is working and what needs to change." },
  { icon: Printer, title: "Print & Event Materials", desc: "Brochures, banners, merch, and event materials that match the rest of your brand." },
  { icon: Bot, title: "AI Workflow & Automation", desc: "Custom n8n workflows for lead enrichment, social scheduling, invoice processing, ticket classification, and reporting. I connect your tools so your team does less manual work." },
];

export const supplementaryServices: ServiceItem[] = [
  { icon: BarChart3, title: "Website Management", desc: "I keep client sites updated and running. I track uptime, watch page speed, apply patches on schedule, and call hosting support when a site goes down." },
  { icon: Headphones, title: "IT Support & Helpdesk", desc: "Hardware problems, software errors, locked accounts, and AV setup for meetings and events. I log everything in Jira so there is a clear record." },
  { icon: Shield, title: "Network & Security", desc: "LAN and WAN issues, DNS, DHCP, Wi-Fi problems, security checks, patches, and backups that are actually tested." },
];

export const processSteps = [
  { title: "Discover", desc: "Align on goals, audience, and constraints before any visual work starts." },
  { title: "Design", desc: "Shape concepts, systems, and prototypes with feedback loops and iteration." },
  { title: "Deliver", desc: "Build, test, and launch with performance, accessibility, and SEO basics in place." },
];

export const pricingRows = [
  { service: "Brand & Graphic Design", starting: "KSh 20,000", range: "KSh 20,000 to 100,000", model: "Per project", icon: Palette },
  { service: "Full-Stack Development", starting: "KSh 30,000", range: "KSh 30,000 to 150,000", model: "Per project", icon: Code },
  { service: "Motion & Social Video", starting: "KSh 15,000", range: "KSh 15,000 to 60,000", model: "Per project", icon: Video },
  { service: "UX/UI Design", starting: "KSh 25,000", range: "KSh 25,000 to 120,000", model: "Per project", icon: Layers },
  { service: "SEO & Web Analytics", starting: "KSh 10,000", range: "KSh 10,000 to 50,000", model: "Monthly retainer", icon: BarChart3 },
  { service: "Print & Event Materials", starting: "KSh 15,000", range: "KSh 15,000 to 80,000", model: "Per project", icon: Printer },
  { service: "AI Workflow & Automation", starting: "KSh 20,000", range: "KSh 20,000 to 120,000", model: "Per project", icon: Bot },
];

export const caseStudyOutcomes: Record<string, string> = {
  gmcode: "Built for measurable growth and smoother customer journeys.",
  gmdesign: "Crafted to strengthen brand recall across print and digital touchpoints.",
  gmmarketing: "Designed to increase engagement with short-form storytelling.",
};

export const subBrands = [
  { id: "gmdesign" as const, label: "GMDesign", icon: Palette },
  { id: "gmmarketing" as const, label: "GM Marketing", icon: Video },
  { id: "gmcode" as const, label: "GMCode", icon: Code },
  { id: "gmautomation" as const, label: "GM Automation", icon: BarChart3 },
];

export const contactItems = [
  { label: "Email", value: "wrootmike@gmail.com", href: "mailto:wrootmike@gmail.com" },
  { label: "Phone", value: "+254 792 618 156", href: "tel:+254792618156" },
  { label: "Location", value: "Nairobi, Kenya · Remote", href: undefined },
];

export const socialLinks = [
  { href: "mailto:wrootmike@gmail.com", icon: "https://cdn.simpleicons.org/gmail/EA4335", alt: "Email", className: "bg-gray-100 dark:bg-slate-700" },
  { href: "https://wa.me/254792618156", icon: "https://cdn.simpleicons.org/whatsapp/25D366", alt: "WhatsApp", className: "bg-gray-100 dark:bg-slate-700" },
  { href: "https://www.instagram.com/myk.ih_1/", icon: "https://cdn.simpleicons.org/instagram/E4405F", alt: "Instagram", className: "bg-gray-100 dark:bg-slate-700" },
  { href: "https://linkedin.com/in/mike-waitindi-654bb2344", icon: null, alt: "LinkedIn", className: "bg-[#0A66C2]" },
  { href: "https://github.com/garymike07", icon: "https://cdn.simpleicons.org/github/181717", alt: "GitHub", className: "bg-gray-100 dark:bg-slate-700" },
];

export const footerLinks = [
  { href: "mailto:wrootmike@gmail.com", label: "Email" },
  { href: "https://wa.me/254792618156", label: "WhatsApp" },
  { href: "https://www.instagram.com/myk.ih_1/", label: "Instagram" },
  { href: "https://linkedin.com/in/mike-waitindi-654bb2344", label: "LinkedIn" },
  { href: "https://github.com/garymike07", label: "GitHub" },
];
