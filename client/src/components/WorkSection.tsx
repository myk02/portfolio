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
        <div className="max-w-6xl mx-auto">
          <Reveal as="div" className="mb-10">
            <SectionLabel>
              Selected work · 0{liveStudies.length}
            </SectionLabel>
            <h2
              className="heading-section text-foreground mt-2"
              style={{ letterSpacing: "-0.03em" }}
            >
              Shipped products
            </h2>
            <p className="text-muted-foreground text-sm max-w-[520px] mt-3 leading-relaxed">
              Live apps — each with stack, role, and the decision that moved the
              work forward.
            </p>
          </Reveal>

          <ProjectCardGrid studies={liveStudies} />
        </div>
      </div>
    </section>
  );
}
