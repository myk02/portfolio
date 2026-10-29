import { liveStudies } from "@/data/projects";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/ui/section";
import { ProjectCardGrid } from "@/components/ProjectCard";

export default function WorkSection() {
  return (
    <section
      id="work"
      className="section-pad bg-secondary border-t border-border relative"
    >
      <div
        className="absolute top-0 left-0 right-0 h-[1px] bg-accent/40"
        aria-hidden
      />
      <div className="container">
        <Reveal className="section-head">
          <SectionLabel>Proof · 0{liveStudies.length} live demos</SectionLabel>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h2 className="heading-section text-foreground">Selected work</h2>
          </div>
        </Reveal>

        <ProjectCardGrid studies={liveStudies} />
      </div>
    </section>
  );
}
