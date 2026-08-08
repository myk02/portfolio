/** Maps case study slugs + journey stage keys → screenshot folder names under /process/ */

export type JourneyStageKey =
  | "brief"
  | "research"
  | "sketches"
  | "wireframes"
  | "hifi"
  | "ship";

export type ProcessPhaseKey = "discover" | "define" | "design" | "validate";

export function processImagePath(
  slug: string,
  stage: string,
  viewport: "mobile" | "desktop",
): string {
  return `/process/${slug}/${stage}-${viewport}.png`;
}

/** Mapping for case studies with captured journey screenshots
 *  Only includes case studies that have dedicated process images captured.
 *  dashboard-ui-system and design-system-creation use inline art components,
 *  not process images, so they are not included here.
 */
export const journeyStageImages: Record<string, Partial<Record<JourneyStageKey, string>>> = {
  "mobile-banking-redesign": {
    brief: "brief",
    research: "research",
    sketches: "wireframes",
    wireframes: "wireframes",
    hifi: "hifi",
    ship: "ship",
  },
  kenyatrace: {
    brief: "brief",
    research: "research",
    sketches: "wireframes",
    wireframes: "wireframes",
    hifi: "hifi",
    ship: "ship",
  },
  "gigi-energy": {
    brief: "brief",
    research: "research",
    sketches: "wireframes",
    wireframes: "wireframes",
    hifi: "hifi",
    ship: "ship",
  },
};

/** Lifecycle phases for the homepage "How I work" section
 *  Uses "home" folder with reused screenshots from specific phases
 *  of kenyatrace and gigi-energy projects for generic process visualization
 */
export const homeProcessPhases: Record<ProcessPhaseKey, { slug: string; stage: string }> = {
  discover: { slug: "home", stage: "discover" },
  define: { slug: "home", stage: "define" },
  design: { slug: "home", stage: "design" },
  validate: { slug: "home", stage: "validate" },
};
