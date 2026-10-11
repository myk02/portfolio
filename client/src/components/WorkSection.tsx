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
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-accent/40" aria-hidden />
      <div className="container">
          <Reveal as="div" className="section-intro mb-8">
            <SectionLabel>
              Proof · 0{liveStudies.length} live demos
            </SectionLabel>
            <h2 className="heading-section text-foreground mt-2">
              Selected work
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">Each card opens the live site. That is the proof.</p>
          </Reveal>

          <ProjectCardGrid studies={liveStudies} />
      </div>
    </section>
  );
}
