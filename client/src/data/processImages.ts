/** Maps case study slugs + journey stage keys → screenshot folder names under /process/ */

export type ProcessPhaseKey = "discover" | "define" | "design" | "validate";

export function processImagePath(
  slug: string,
  stage: string,
  viewport: "mobile" | "desktop",
): string {
  return `/process/${slug}/${stage}-${viewport}.webp`;
}

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
