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
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-24 pb-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Home
        </Link>

        <div className="mt-8 mb-10">
          <h1 className="font-display font-black text-foreground tracking-tight leading-none text-3xl sm:text-4xl">
            Work
          </h1>
          <p className="text-muted-foreground text-sm max-w-md leading-relaxed mt-3">
            {liveStudies.length} live products — each with a case study and a
            public URL.
          </p>
        </div>

        <ProjectCardGrid studies={liveStudies} />
      </div>
      </main>

      <SiteFooter />
    </div>
  );
}
