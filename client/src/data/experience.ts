/**
 * SOURCE-OF-TRUTH CONTENT MODEL — experience, pending projects, and claims.
 *
 * Rules enforced here (see IMPLEMENTATION-NOTE.md):
 *  - Every entry carries the evidence `source` it came from.
 *  - Entries with unresolved `todo` fields are INCOMPLETE: they never render in
 *    production. In dev (`import.meta.env.DEV`) they render with a
 *    "Details to be confirmed" label so previews are possible before sign-off.
 *  - Never invent titles, employers, dates, responsibilities, metrics, stacks,
 *    certifications, statuses, clients, or security experience. Paste exact
 *    LinkedIn/CV text into the marked slots instead.
 */

export type EvidenceSource =
  | "repository"
  | "live project"
  | "LinkedIn"
  | "CV"
  | "user confirmation";

export interface ExperienceEntry {
  id: string;
  employer: string;
  /** Exact title from LinkedIn/CV — leave "" until confirmed. */
  title: string;
  /** Exact dates from LinkedIn/CV — leave "" until confirmed. */
  dates: string;
  location?: string;
  description: string;
  technologies: string[];
  outcomes?: string[];
  href?: string;
  source: EvidenceSource;
  /**
   * Fields still requiring Mike's input. Non-empty => entry is incomplete and
   * hidden from production renders.
   */
  todo: string[];
}

/**
 * EXPERIENCE ENTRIES — paste the exact LinkedIn experience text below.
 * Currently seeded ONLY with what the public profile exposes (that
 * Freelancer.com appears under Experience). Title/dates are deliberately
 * blank because the public view hides them behind an auth wall.
 */
export const experienceEntries: ExperienceEntry[] = [
  {
    id: "freelancer-com",
    employer: "Freelancer.com",
    title: "", // TODO(mike): exact LinkedIn job title
    dates: "", // TODO(mike): exact LinkedIn dates (e.g. "2021 – Present")
    description: "", // TODO(mike): paste LinkedIn description, then rewrite 1–2 sentences
    technologies: [], // TODO(mike): stack actually used across client work
    outcomes: [],
    href: "https://www.freelancer.com",
    source: "LinkedIn",
    todo: ["title", "dates", "description", "technologies"],
  },
  // TODO(mike): paste remaining LinkedIn roles here, copying exact fields.
  // Template:
  // {
  //   id: "unique-id",
  //   employer: "",
  //   title: "",
  //   dates: "",
  //   location: "",
  //   description: "",
  //   technologies: [],
  //   outcomes: [],
  //   source: "LinkedIn",
  //   todo: [],
  // },
];

/** A real project awaiting confirmation before it can appear in the Work index. */
export interface PendingProject {
  id: string;
  name: string;
  /** One of the aligned status labels. */
  proposedKind: "SaaS project" | "Client project" | "In development" | "Case study";
  /** Scope taken verbatim from the public LinkedIn project description. */
  linkedInScope: string[];
  role?: string; // TODO(mike): your ownership boundary on this project
  status?: string; // TODO(mike): shipped / in-development / prototype?
  stack?: string[]; // TODO(mike)
  links?: { demo?: string; repo?: string }; // TODO(mike)
  source: EvidenceSource;
  todo: string[];
}

/**
 * PENDING PROJECTS — gated out of production UI until `todo` is cleared and
 * the entry moves into caseStudies.ts with proper visuals.
 */
export const pendingProjects: PendingProject[] = [
  {
    id: "legalflow",
    name: "LegalFlow",
    proposedKind: "SaaS project",
    linkedInScope: [
      "Case / matter management",
      "Client relationships",
      "Billing and trust accounting",
      "Document generation",
      "E-signatures",
      "Calendar sync",
      "Communications",
      "AI-powered legal intelligence",
    ],
    source: "LinkedIn",
    todo: [
      "role — what Mike owned vs. contributed to (design/build/manage?)",
      "status — live, in development, or prototype?",
      "stack — languages/frameworks/infra actually used",
      "auth/roles — how permissions worked, if implemented",
      "AI boundaries — what the AI features did and did not do",
      "links — demo/repo/screenshots or a private-demo statement",
      "dates",
    ],
  },
];

/** True when an entry has everything needed for a public render. */
export function isEntryComplete(entry: ExperienceEntry): boolean {
  return (
    entry.todo.length === 0 &&
    Boolean(entry.title) &&
    Boolean(entry.dates) &&
    Boolean(entry.description)
  );
}
