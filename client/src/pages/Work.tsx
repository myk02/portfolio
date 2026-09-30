import { Link } from "wouter";
import { liveStudies } from "@/data/projects";
import SiteHead from "@/components/SiteHead";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { ProjectCardGrid } from "@/components/ProjectCard";
import { useReveal } from "@/hooks/useReveal";

export default function Work() {
  useReveal();

  return (
    <div className="min-h-screen bg-background">
      <SiteHead
        title="Work — live products | Mike Waitindi"
        description="Live production web apps with stack, role, constraints, and the decisions behind each."
        canonical="/work"
        type="website"
      />

      <SiteHeader />

      <main id="main" tabIndex={-1} className="outline-none">
      <div className="container pt-24 pb-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Home
        </Link>

        <div className="section-intro mt-7 mb-10">
          <h1 className="heading-section text-foreground">
            Work
          </h1>
          <p className="text-muted-foreground text-[0.875rem] leading-relaxed mt-3">
            {liveStudies.length} live products — click any card to open the
            live site.
          </p>
        </div>

        <ProjectCardGrid studies={liveStudies} />
      </div>
      </main>

      <SiteFooter />
    </div>
  );
}
