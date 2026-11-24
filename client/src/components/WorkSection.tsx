import { liveStudies } from "@/data/projects";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/ui/section";
import { ProjectCardGrid } from "@/components/ProjectCard";

export default function WorkSection() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="section-pad bg-secondary border-t border-border relative"
    >
      <div className="container">
        <Reveal className="section-head">
          <div>
            <SectionLabel>Portfolio</SectionLabel>
            <h2 id="work-heading" className="heading-section text-foreground">
              Selected work
            </h2>
            <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground">
              Live products and systems I’ve designed, built, and shipped.
            </p>
          </div>
          <span className="section-note hidden sm:inline-block">
            0{liveStudies.length} shipped builds
          </span>
        </Reveal>

        <ProjectCardGrid studies={liveStudies} />
      </div>
    </section>
  );
}
