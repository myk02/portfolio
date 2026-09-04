import { Link } from "wouter";
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react";
import type { Project } from "@/data/projects";
import { OWNER, SITE_URL } from "@/lib/site";
import SiteHead from "@/components/SiteHead";
import StatusBadge from "@/components/engineering/StatusBadge";
import { DeviceShots, ShotFigure } from "@/components/artifacts/Screens";
import { MetricCardRow } from "@/components/artifacts/MetricCard";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { SectionLabel, Surface } from "@/components/ui/section";
import { useReveal } from "@/hooks/useReveal";

interface LayoutProps {
  project: Project;
  prev: { slug: string; name: string } | null;
  next: { slug: string; name: string } | null;
  moreWork: React.ReactNode;
}

function uniqueSrcs(project: Project) {
  const used = new Set<string>([project.hero.src]);
  const decisionShots =
    project.decisions.filter((b) => b.shot && !used.has(b.shot)) ?? [];
  decisionShots.forEach((b) => used.add(b.shot!));
  const textDecisions = project.decisions.filter((b) => !b.shot);
  const gallery = (project.screens ?? []).filter((s) => !used.has(s.src));
  return { decisionShots, textDecisions, gallery };
}

/**
 * Visual-first case study: outcome + snapshot + one money shot, then
 * ownership → problem → decisions → screens → results → compact build notes.
 */
export default function CaseStudyLayout({
  project,
  prev,
  next,
  moreWork,
}: LayoutProps) {
  useReveal();
  const { decisionShots, textDecisions, gallery } = uniqueSrcs(project);

  const noteGroups = project.buildNotes
    ? [
        { label: "Architecture", items: project.buildNotes.architecture },
        { label: "Build", items: project.buildNotes.build },
        { label: "Quality", items: project.buildNotes.quality },
      ].filter((g) => g.items && g.items.length > 0)
    : [];

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
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-10 pb-8 sm:pt-14 sm:pb-10">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={13} aria-hidden /> Work
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <StatusBadge />
            <span className="px-2 py-1 text-[11px] font-mono uppercase tracking-widest bg-secondary border border-border text-muted-foreground">
              {project.year} · {project.timeline}
            </span>
          </div>

          <p className="mt-5 text-[11px] sm:text-xs font-mono uppercase tracking-[0.14em] text-muted-foreground">
            {project.outcomeTitle}
          </p>
          <h1
            className="mt-2 font-display font-black text-foreground tracking-tight leading-[0.95]"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 4.6rem)",
              letterSpacing: "-0.03em",
            }}
          >
            {project.name}
          </h1>
          <p className="mt-3 max-w-2xl text-[17px] sm:text-[19px] text-foreground/80 leading-snug font-medium">
            {project.tagline}
          </p>

          <dl className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: "Role", value: project.role },
              { label: "Stack", value: project.stack.join(" · ") },
              { label: "Outcome", value: project.outcomeLine },
            ].map((f) => (
              <Surface key={f.label} className="p-4">
                <dt className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  {f.label}
                </dt>
                <dd className="text-[13px] text-foreground leading-snug mt-2 font-medium">
                  {f.value}
                </dd>
              </Surface>
            ))}
          </dl>

          <div className="mt-6 flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-3 text-sm font-semibold hover:bg-accent hover:text-accent-foreground border border-foreground transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
              >
                <ExternalLink size={15} aria-hidden /> View live product ↗
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground hover:border-foreground transition-colors"
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
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-12">
          <Reveal>
            <SectionLabel>What I owned</SectionLabel>
          </Reveal>
          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {project.ownership.map((item) => (
              <Reveal key={item}>
                <li className="border border-border bg-card p-4 text-[13px] text-foreground leading-snug">
                  <span
                    className="block w-1.5 h-1.5 bg-accent mb-2"
                    aria-hidden
                  />
                  {item}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-12">
          <Reveal>
            <SectionLabel>Problem</SectionLabel>
            <p className="text-muted-foreground text-sm max-w-2xl">
              {project.context}
            </p>
            <h2 className="font-display font-bold text-foreground text-2xl sm:text-3xl tracking-tight mt-4 mb-3">
              {project.problemLead}
            </h2>
            {project.researchLead && (
              <p className="text-muted-foreground text-sm max-w-2xl">
                {project.researchLead}
              </p>
            )}
          </Reveal>
          <Reveal delay={1}>
            <Surface className="mt-6 p-5 border-l-4 border-l-accent max-w-2xl">
              <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
                What broke the plan
              </p>
              <p className="text-sm text-foreground leading-snug">
                {project.ordeal}
              </p>
            </Surface>
          </Reveal>
          <Reveal delay={1}>
            <div className="flex flex-wrap gap-2 mt-4">
              {project.constraints.map((c) => (
                <span
                  key={c}
                  className="px-3 py-1.5 text-[11px] font-mono border border-border bg-card text-muted-foreground"
                >
                  {c}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-12">
          <Reveal>
            <SectionLabel>Design decisions</SectionLabel>
          </Reveal>

          {decisionShots.length > 0 && (
            <div className="grid grid-cols-1 gap-8 mt-6">
              {decisionShots.map((b) => (
                <Reveal key={b.text}>
                  <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-5 items-start">
                    <div>
                      {b.label && (
                        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
                          {b.label}
                        </p>
                      )}
                      <p className="text-foreground leading-snug">{b.text}</p>
                    </div>
                    {b.shot && (
                      <ShotFigure src={b.shot} alt={b.alt ?? b.text} />
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          {textDecisions.length > 0 && (
            <div
              className={`grid grid-cols-1 sm:grid-cols-3 gap-4 ${decisionShots.length > 0 ? "mt-6" : "mt-6"}`}
            >
              {textDecisions.map((b) => (
                <Surface key={b.text} className="p-4">
                  {b.label && (
                    <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
                      {b.label}
                    </p>
                  )}
                  <p className="text-[13px] text-foreground leading-snug">
                    {b.text}
                  </p>
                </Surface>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
            <Surface className="p-5 border-l-4 border-l-destructive">
              <p className="text-[10px] font-mono uppercase tracking-widest text-destructive mb-2">
                Before
              </p>
              <p className="text-sm text-foreground leading-snug">
                {project.validateBefore}
              </p>
            </Surface>
            <Surface className="p-5 border-l-4 border-l-accent">
              <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
                After
              </p>
              <p className="text-sm text-foreground leading-snug">
                {project.validateAfter}
              </p>
            </Surface>
          </div>
        </div>
      </section>

      {gallery.length > 0 && (
        <section
          aria-label={`${project.name} screens`}
          className="border-b border-border"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-12">
            <Reveal>
            <SectionLabel>Shipped screens</SectionLabel>
              <h2 className="font-display font-bold text-foreground tracking-tight text-2xl mb-6">
                Screens
              </h2>
            </Reveal>
            <DeviceShots shots={gallery} />
          </div>
        </section>
      )}

      {project.metricCards.length > 0 && (
        <section aria-label="Results" className="border-b border-border bg-secondary">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-12">
            <Reveal>
            <SectionLabel>Results</SectionLabel>
              <h2 className="font-display font-bold tracking-tight text-2xl mb-6 text-foreground">
                Results
              </h2>
            </Reveal>
            <MetricCardRow cards={project.metricCards} />

            {project.lessons.length > 0 && (
              <Reveal delay={2}>
                <div className="mt-8 pt-6 border-t border-border">
                  <p className="text-[10px] font-mono uppercase tracking-widest mb-3 text-muted-foreground">
                    Lessons
                  </p>
                  <ul className="space-y-2">
                    {project.lessons.map((l) => (
                      <li
                        key={l}
                        className="flex items-start gap-2 text-[13px] text-muted-foreground"
                      >
                        <span
                          className="mt-1.5 w-1 h-1 shrink-0 bg-accent"
                          aria-hidden
                        />
                        {l}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {noteGroups.length > 0 && (
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-12">
            <Reveal>
            <SectionLabel>Build notes</SectionLabel>
            </Reveal>
            <dl className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
              {noteGroups.map((group) => (
                <Surface key={group.label} className="p-5">
                  <dt className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3">
                    {group.label}
                  </dt>
                  <dd>
                    <ul className="space-y-2">
                      {group.items!.map((item) => (
                        <li
                          key={item}
                          className="text-[12px] text-muted-foreground leading-snug"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </Surface>
              ))}
            </dl>
          </div>
        </section>
      )}

      {(prev || next) && (
        <nav aria-label="More projects" className="border-t border-border">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2">
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
                  <span className="block text-sm sm:text-base font-semibold text-foreground truncate">
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
                  <span className="block text-sm sm:text-base font-semibold text-foreground truncate">
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
