import { Link } from "wouter";
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react";
import type { Project } from "@/data/projects";
import { OWNER, SITE_URL } from "@/lib/site";
import SiteHead from "@/components/SiteHead";
import StatusBadge from "@/components/engineering/StatusBadge";
import { ShotFigure } from "@/components/artifacts/Screens";
import { MetricCardRow } from "@/components/artifacts/MetricCard";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/ui/section";
import { useReveal } from "@/hooks/useReveal";

interface LayoutProps {
  project: Project;
  prev: { slug: string; name: string } | null;
  next: { slug: string; name: string } | null;
  moreWork: React.ReactNode;
}

/**
 * Concise case study: header + overview + key decisions + results.
 * One screenshot, no deep-dive sections — the live site carries the detail.
 */
export default function CaseStudyLayout({
  project,
  prev,
  next,
  moreWork,
}: LayoutProps) {
  useReveal();

  return (
    <div className="min-h-screen bg-background">
      <SiteHead
        title={`${project.name} — live product | Mike Waitindi`}
        description={`${project.tagline} Stack: ${project.stack.join(", ")}.`}
        canonical={`/work/${project.slug}`}
        image={project.hero.src}
        type="article"
        jsonLd={
          project.liveUrl
            ? {
                id: `creative-work-${project.slug}`,
                data: {
                  "@context": "https://schema.org",
                  "@type": "WebApplication",
                  name: project.name,
                  url: project.liveUrl,
                  applicationCategory: "WebApplication",
                  operatingSystem: "Web",
                  description: project.tagline,
                  author: {
                    "@type": "Person",
                    name: OWNER,
                    url: SITE_URL,
                  },
                },
              }
            : undefined
        }
      />

      <SiteHeader />

      <main id="main" tabIndex={-1} className="outline-none">
      <header className="border-b border-border pt-16">
        <div className="container pt-8 pb-7 sm:pt-9 sm:pb-8 text-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={13} aria-hidden /> Work
          </Link>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <StatusBadge />
            <span className="px-2 py-1 text-[11px] font-mono uppercase tracking-widest bg-secondary border border-border text-muted-foreground">
              {project.year} · {project.timeline}
            </span>
          </div>

          <p className="mt-4 text-[0.6875rem] sm:text-xs font-mono font-medium uppercase tracking-[0.12em] text-muted-foreground">
            {project.outcomeTitle}
          </p>
          <h1 className="mt-3 font-display font-semibold text-3xl sm:text-4xl text-foreground tracking-tight text-balance">
            {project.name}
          </h1>
          <p className="mt-3 max-w-xl text-[0.9375rem] sm:text-base text-foreground/80 leading-relaxed mx-auto tracking-[-0.008em]">
            {project.tagline}
          </p>

          <p className="mt-5 text-xs font-mono uppercase tracking-widest text-muted-foreground">
            {project.role} · {project.stack.join(" · ")} · {project.timeline}
          </p>

          <div className="mt-5 flex flex-wrap gap-2.5 justify-center">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-foreground text-background px-4 py-2.5 text-xs font-semibold hover:bg-accent hover:text-accent-foreground border border-foreground transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
              >
                <ExternalLink size={15} aria-hidden /> View live product ↗
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-border bg-card px-4 py-2.5 text-xs font-semibold text-foreground hover:border-foreground transition-colors"
              >
                <Github size={15} aria-hidden /> Source
              </a>
            )}
          </div>

          <div className="mt-8 sm:mt-10">
            <ShotFigure
              src={project.hero.src}
              alt={project.hero.alt}
              caption={project.hero.caption}
              eager
            />
          </div>
        </div>
      </header>

      <section className="border-b border-border">
        <div className="container py-10 sm:py-12">
          <Reveal>
            <SectionLabel>Overview</SectionLabel>
            <h2 className="heading-section text-foreground mt-2 max-w-2xl">
              {project.problemLead}
            </h2>
            <p className="text-muted-foreground text-[0.9375rem] leading-relaxed mt-3 max-w-2xl">
              {project.ordeal}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-border bg-secondary">
        <div className="container py-10 sm:py-12">
          <Reveal>
            <SectionLabel>Key decisions</SectionLabel>
          </Reveal>
          <ul className="mt-4 space-y-2 max-w-2xl">
            {project.decisions.map((b) => (
              <Reveal key={b.text}>
                <li className="flex items-start gap-2.5 text-[0.9375rem] text-foreground leading-relaxed">
                  <span className="mt-[9px] w-1.5 h-1.5 bg-accent shrink-0" aria-hidden />
                  <span>
                    {b.label && (
                      <span className="font-semibold">{b.label}: </span>
                    )}
                    {b.text}
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {project.metricCards.length > 0 && (
        <section aria-label="Results" className="border-b border-border">
          <div className="container py-10 sm:py-12">
            <Reveal>
              <SectionLabel>Results</SectionLabel>
            </Reveal>
            <div className="mt-4">
              <MetricCardRow cards={project.metricCards} />
            </div>
          </div>
        </section>
      )}

      {(prev || next) && (
        <nav aria-label="More projects" className="border-t border-border">
          <div className="container grid grid-cols-1 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/work/${prev.slug}`}
                className="group flex items-center gap-3 py-6 sm:py-8 border-b sm:border-b-0 sm:border-r border-border hover:bg-foreground/[0.02] transition-colors"
              >
                <ArrowLeft
                  size={18}
                  className="text-muted-foreground group-hover:text-foreground transition-colors shrink-0"
                  aria-hidden
                />
                <span className="min-w-0">
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                    Previous
                  </span>
                  <span className="block text-xs sm:text-sm font-semibold text-foreground truncate">
                    {prev.name}
                  </span>
                </span>
              </Link>
            ) : (
              <div
                aria-hidden
                className="hidden sm:block sm:border-r border-border"
              />
            )}
            {next && (
              <Link
                href={`/work/${next.slug}`}
                className="group flex items-center justify-end gap-3 py-6 sm:py-8 hover:bg-foreground/[0.02] transition-colors text-right"
              >
                <span className="min-w-0">
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                    Next
                  </span>
                  <span className="block text-xs sm:text-sm font-semibold text-foreground truncate">
                    {next.name}
                  </span>
                </span>
                <ArrowRight
                  size={18}
                  className="text-muted-foreground group-hover:text-foreground transition-colors shrink-0"
                  aria-hidden
                />
              </Link>
            )}
          </div>
        </nav>
      )}

      {moreWork}
      </main>

      <SiteFooter />
    </div>
  );
}
