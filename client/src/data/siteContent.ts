import { CONTACT } from "@/lib/site";
import { liveCount } from "@/data/caseStudies";

export const roleLine =
  "Software Developer · UI/UX Developer · Automation Specialist";

export const heroHeadline = "I ship reliable web products.";

export const heroStats = [
  { label: "Live products", value: String(liveCount) },
  { label: "e2e passing", value: "10+" },
  { label: "Checkout cut", value: "4→3" },
];

export const aboutParagraphs = [
  "Nairobi developer–designer: React + TypeScript, accessible UI wired to real APIs.",
  `${liveCount} live apps — KenyaTrace, GiGi Energy, and LegalFlow — on Vercel.`,
];

export const applicationLine =
  "Full-time or freelance — clear process, fast feedback.";

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
    external: false,
  },
  {
    href: CONTACT.whatsapp,
    icon: "https://cdn.simpleicons.org/whatsapp/25D366",
    alt: "WhatsApp",
    external: true,
  },
  {
    href: CONTACT.linkedin,
    icon: null,
    alt: "LinkedIn",
    external: true,
  },
];
