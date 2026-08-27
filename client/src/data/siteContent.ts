import { CONTACT } from "@/lib/site";

export const roleLine =
  "Software Developer · UI/UX Developer · Automation Specialist";

export const heroHeadline = "I ship.";

export const heroSupporting =
  "Reliable web products from design to deployment — responsive, accessible React interfaces wired to real APIs.";

export const heroStats = [
  { label: "Live products", value: "2" },
  { label: "e2e tests passing", value: "10+" },
  { label: "Checkout steps cut", value: "4→3" },
];

export const aboutParagraphs = [
  "Developer, designer, and automation specialist based in Nairobi. I build responsive, accessible interfaces, connect them to real services, and ship. My design background means requirements get read right the first time — no gap between what was asked and what gets built.",
  "I've shipped two live production apps: KenyaTrace (route planning cut from 6 interactions to 3) and GiGi Energy (checkout merged from 4 steps to 3, WCAG AA contrast enforced across all text). Both are in production and tracked post-launch.",
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

export const contactItems = [
  {
    label: "Email",
    value: CONTACT.email,
    href: CONTACT.emailHref,
  },
  { label: "Phone", value: CONTACT.phone, href: CONTACT.phoneHref },
  { label: "Location", value: CONTACT.location, href: undefined },
];

export const socialLinks = [
  {
    href: CONTACT.emailHref,
    icon: "https://cdn.simpleicons.org/gmail/EA4335",
    alt: "Email",
    className: "bg-gray-100 dark:bg-slate-700",
  },
  {
    href: CONTACT.whatsapp,
    icon: "https://cdn.simpleicons.org/whatsapp/25D366",
    alt: "WhatsApp",
    className: "bg-gray-100 dark:bg-slate-700",
  },
  {
    href: CONTACT.linkedin,
    icon: null,
    alt: "LinkedIn",
    className: "bg-[#0A66C2]",
  },
];
