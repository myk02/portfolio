import { services, processSteps as siteProcessSteps, skillGroups, supplementaryServices, toolkit, devToolkit } from "./siteContent";
import type { ServiceItem } from "./siteContent";

export const capabilities = services.map((s, i) => {
  const tags: Record<string, string[]> = {
    "Brand & Graphic Design": ["Logo Design", "Brand Guidelines", "Typography", "Print Design"],
    "Development": ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS"],
    "Motion & Social Video": ["CapCut Pro", "Canva", "Motion Graphics", "Social Content"],
    "UX/UI Design": ["Figma", "Wireframing", "Prototyping", "User Research"],
    "SEO & Web Analytics": ["On-page SEO", "GA4", "Content Strategy", "Site Speed"],
    "Print & Event Materials": ["Brochures", "Banners", "Merch", "Signage"],
    "AI Workflow & Automation": ["n8n", "Webhooks", "OpenAI API", "Lead Enrichment", "Scheduling"],
  };
  return {
    id: `service-${i + 1}`,
    number: `0${i + 1}`,
    title: s.title,
    description: s.desc,
    tags: tags[s.title] ?? ["Consulting"],
  };
});

export const processSteps = siteProcessSteps.map((s, i) => ({
  number: `0${i + 1}`,
  title: s.title,
  duration: i === 0 ? "1–2 weeks" : i === 1 ? "2–4 weeks" : "1–3 weeks",
  description: s.desc,
  deliverables: i === 0
    ? ["Research Summary", "Goal Alignment", "Audience Profile", "Project Plan"]
    : i === 1
    ? ["Wireframes", "Design System", "Prototypes", "Feedback Log"]
    : ["Built Product", "Tests", "Launch Assets", "Handoff Doc"],
}));

export const brandStats = [
  { value: "4+", label: "Years experience" },
  { value: "15+", label: "Design projects" },
  { value: "7+", label: "Live websites" },
];

export const clients = [
  { name: "GMDesign", category: "Brand & Design" },
  { name: "GM Marketing", category: "Video & Marketing" },
  { name: "GMCode", category: "Development" },
];

export const pressAwards: { publication: string; award: string }[] = [];

export const projectTypes = [
  "Brand & Graphic Design",
  "Development",
  "AI Workflow & Automation",
  "Motion & Social Video",
  "UX/UI Design",
  "SEO & Web Analytics",
  "Other",
];

export const timelineOptions = [
  { label: "ASAP", value: "asap" },
  { label: "1–2 Months", value: "1-2months" },
  { label: "3–6 Months", value: "3-6months" },
  { label: "Flexible", value: "flexible" },
];

export { skillGroups, supplementaryServices, toolkit, devToolkit };
export type { ServiceItem };
