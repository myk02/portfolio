import { CONTACT } from "@/lib/site";

export const roleLine =
  "Software Developer · UI/UX Developer · Automation Specialist";

export const heroHeadline = "I ship reliable web products.";

export const heroSupporting = "";

export const heroStats = [
  { label: "Live products", value: "2" },
  { label: "e2e passing", value: "10+" },
  { label: "Checkout cut", value: "4→3" },
];

export const aboutParagraphs = [
  "Nairobi developer–designer: React + TypeScript, accessible UI wired to real APIs.",
  "2 live apps — KenyaTrace & GiGi Energy — on Vercel.",
];

/** Application-facing line shown near contact CTAs. */
export const applicationLine =
  "Full-time or freelance — clear process, fast feedback.";

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
