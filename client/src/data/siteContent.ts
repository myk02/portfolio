import { liveCount } from "@/data/projects";

export const positionTitle =
  "Full-Stack Developer (React + TypeScript, Convex backend), Playwright E2E Tester, Designer, Tech Support & Automation Specialist";

export const roleLine =
  "Full-Stack Developer · Playwright E2E Testing · React · Convex · Paystack Tips · Vercel · Design · Tech Support · Automation";

export const roleChips = [
  "Full-Stack Developer",
  "React + TypeScript",
  "Convex Backend",
  "Playwright E2E",
  "Paystack Tips Integration",
  "Vercel Deployment",
  "Responsive Web Apps",
  "Designer",
  "Tech Support",
  "Automation Specialist",
] as const;

export const heroTagline =
  "Web apps with a real backend, payments, and automated tests.";

export const heroSubline =
  "I'm Mike Waitindi, in Nairobi — I build React + TypeScript frontends on a Convex backend (contact inbox, tips database), with Paystack tips integration, Playwright end-to-end tests, and Vercel hosting. Available full-time onsite in Nairobi or Mombasa, or remote.";

export const aboutParagraphs = [
  "I'm Mike Waitindi — a Nairobi-based developer. I build React + TypeScript web apps on a Convex backend, with Paystack tips (initialize, verify, webhook), Playwright end-to-end tests, and Vercel deploys. I also do brand-minded UI, tech support, and small automation.",
  `${liveCount} live web products: KenyaTrace, GiGi Energy, LegalFlow — each with a demo, repo, and case study. This portfolio itself is my test rig: a Playwright suite guards home, work, case studies, 404, contact validation, and dialogs (see the testing section below).`,
];

export const applicationLine =
  "Hiring across web development (React frontend, Convex backend, Paystack tips integration), Playwright end-to-end testing, design, tech support, or automation? Full-time onsite in Nairobi or Mombasa, or remote — tested builds, plain-language delivery.";

export const fullStackHighlights = [
  {
    title: "Daily use — React + TypeScript frontend",
    text: "Typed components, forms + validation, routing, responsive layouts from 360px to desktop.",
  },
  {
    title: "Daily use — Convex backend",
    text: "Contact inbox and tips tables, validated actions, idempotent inserts. Proven in this portfolio's code.",
  },
  {
    title: "Comfortable — Paystack tips flow",
    text: "Transaction initialize, inline popup, server verify, HMAC-signed webhook. Small and real — not a shop checkout.",
  },
  {
    title: "Comfortable — tests, CI, hosting",
    text: "Playwright E2E on every push via GitHub Actions, auto-deploy to Vercel. Basic hardening: validation, honeypot, env secrets.",
  },
] as const;

export const frontendToolbox = [
  {
    group: "Daily use",
    skills: ["React 19 + TypeScript", "Vite builds", "Tailwind CSS v4", "HTML5 semantics", "CSS3", "JavaScript (ES6+)", "Convex (tables, actions, mutations)", "Wouter routing"],
  },
  {
    group: "Comfortable",
    skills: ["Paystack tips (initialize / verify / webhook)", "Playwright E2E + regression suites", "GitHub Actions (typecheck + E2E)", "Vercel deployment + previews", "Responsive design (360px → desktop)", "Forms + validation", "Accessibility basics (labels, focus, contrast)", "Git + code review"],
  },
  {
    group: "Learning",
    skills: ["Python", "SQL", "API hardening beyond basics", "SEO measurement (Lighthouse, sitemap)"],
  },
] as const;

export const qaHighlights = [
  {
    title: "Playwright E2E, TypeScript",
    text: "This portfolio is the system under test — contact validation, every route rendering cleanly, landmarks, alt text, 360px overflow checks.",
  },
  {
    title: "Regression on every push",
    text: "GitHub Actions runs typecheck plus the Playwright suite on push and PR, so broken routes or forms get caught before merge.",
  },
  {
    title: "UI checks with a designer's eye",
    text: "Layout, alt text, keyboard paths (Esc closes dialogs), focus states, and 360px viewports — asserted in code, not by hand-waving.",
  },
  {
    title: "What this does not cover",
    text: "No SQL assertions, no API contract tests, no Docker test envs here. Those stay in Learning until a project proves them.",
  },
] as const;

export const qaWorkflow = [
  {
    step: "01 · Plan",
    text: "Pick the critical paths: contact form, all routes, dialogs, mobile overflow.",
  },
  {
    step: "02 · Automate",
    text: "Playwright + TypeScript specs in e2e/, committed next to the code.",
  },
  {
    step: "03 · Execute",
    text: "CI runs the suite per push; failures block with traces on retry.",
  },
  {
    step: "04 · Report",
    text: "Failures show repro steps in the spec and trace — then fix, rerun, close.",
  },
] as const;

export const frontendServices = [
  {
    title: "Web apps with a real backend",
    text: "React + TypeScript on Convex — contact inbox and tips tables, validated actions.",
  },
  {
    title: "Tips payments that reconcile",
    text: "Paystack initialize → popup → server verify → idempotent insert + signed webhook.",
  },
  {
    title: "Responsive web apps",
    text: "React + TypeScript, mobile-first, 360px to desktop.",
  },
  {
    title: "Design-to-code UI",
    text: "Brand-minded layouts shipped as reusable components.",
  },
  {
    title: "Tested interfaces",
    text: "Playwright E2E guards forms, routes, and dialogs on every push.",
  },
  {
    title: "Honest limits",
    text: "No mobile/desktop native apps, no shop checkouts, no Python/SQL here yet — see Learning.",
  },
] as const;

export const frontendPractices = [
  "Mobile-first, checked at 360–390px viewports",
  "Semantic landmarks, labels, focus states",
  "Loading / error states on async UI (contact, tips)",
  "Type-safe props, small components",
  "E2E tests for contact + tips paths",
  "Live demo + repo + case study for every project",
] as const;

export const services = [
  {
    role: "Developer · Web Apps",
    title: "Web apps — React + Convex",
    text: "Typed frontend, validated backend actions, Vercel deploys.",
  },
  {
    role: "Payments",
    title: "Tips integration — Paystack",
    text: "Small, reconciled tips flow. Not a full shop checkout.",
  },
  {
    role: "Testing",
    title: "E2E tests — Playwright",
    text: "Functional + regression suites for this portfolio, run in CI.",
  },
  {
    role: "Designer · Brand Direction",
    title: "Brand & UI design",
    text: "Layouts and component systems, Figma-to-code where it exists.",
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

