import { Link } from "wouter";
import { liveStudies } from "@/data/projects";
import DemoWorkStrip from "@/ai-solutions/components/DemoWorkStrip";
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
        title="Selected Projects — Mike Waitindi"
        description="Three deployed frontend product demos by Mike Waitindi, a Nairobi-based software developer."
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
            Selected projects
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">Frontend product concepts built to explore clear, practical user flows.</p>
        </div>

        <ProjectCardGrid studies={liveStudies} />
        <DemoWorkStrip />
      </div>
      </main>

      <SiteFooter />
    </div>
  );
}
