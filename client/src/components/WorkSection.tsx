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
              Selected work · 0{liveStudies.length}
            </SectionLabel>
            <h2 className="heading-section text-foreground mt-2">
              Shipped products
            </h2>
            <p className="text-muted-foreground text-[0.875rem] mt-3 leading-relaxed mx-auto">
              Live web apps — click any card to open the live site in a new
              tab. The backend, payments, testing, and CI proof below
              refers to this portfolio itself (React + Convex + Paystack tips +
              Playwright + Actions), not to these three frontends. Every release of this
              portfolio passes the regression gate in <a href="#qa-automation" className="underline underline-offset-2 hover:text-foreground">End-to-end testing</a>.
            </p>
          </Reveal>

          <ProjectCardGrid studies={liveStudies} />
      </div>
    </section>
  );
}
