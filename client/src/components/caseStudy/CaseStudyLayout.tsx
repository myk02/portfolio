import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import type { CaseStudy } from "@/data/caseStudies";
import type { StudyVisuals } from "@/data/caseVisuals";
import SiteHead from "@/components/SiteHead";
import StatusBadge, { toneFromKind } from "@/components/engineering/StatusBadge";
import { HeroDeviceShowcase, DeviceShots } from "@/components/artifacts/Screens";
import { MetricCardRow } from "@/components/artifacts/MetricCard";
import BrandEdgeHeader from "@/components/BrandEdgeHeader";
import BrandEdgeFooter from "@/components/BrandEdgeFooter";
import { Reveal } from "@/components/Reveal";
import { useReveal } from "@/hooks/useReveal";
import { goHomeToSection } from "@/lib/navigation";

interface LayoutProps {
  study: CaseStudy;
  visuals: StudyVisuals;
  prev: { slug: string; name: string } | null;
  next: { slug: string; name: string } | null;
  moreWork: React.ReactNode;
}

function SketchBoard({ sketches }: { sketches: StudyVisuals["sketches"] }) {
  const stateIcon = (state: "won" | "rejected" | "kept") => {
    if (state === "won" || state === "kept")
      return <CheckCircle2 size={13} className="text-accent shrink-0" />;
    return <XCircle size={13} className="text-destructive shrink-0" />;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {sketches.map((s) => (
        <div
          key={s.label}
          className={`flex items-start gap-2.5 p-3 border text-[12px] ${
            s.state === "rejected"
              ? "border-border bg-card text-muted-foreground"
              : "border-accent/30 bg-accent/5 text-foreground"
          }`}
        >
          {stateIcon(s.state)}
          <span className="leading-snug">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

function PersonaCards({ personas }: { personas: NonNullable<StudyVisuals["personas"]> }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {personas.map((p) => (
        <div key={p.name} className="border border-border bg-card p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center bg-foreground text-background font-display font-bold text-sm shrink-0">
              {p.initials}
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">{p.name}</p>
              <p className="text-[11px] text-muted-foreground">{p.role} · {p.age}</p>
            </div>
          </div>
          <blockquote className="text-[12px] italic text-muted-foreground border-l-2 border-accent pl-2.5 leading-snug">
            "{p.quote}"
          </blockquote>
          <ul className="space-y-1">
            {p.facts.map((f) => (
              <li key={f.label} className="flex gap-2 text-[11px]">
                <span className="text-muted-foreground shrink-0">{f.label}:</span>
                <span className="text-foreground">{f.value}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function BrandEvolution({ brand }: { brand: NonNullable<StudyVisuals["brandEvolution"]> }) {
  return (
    <div className="space-y-3">
      <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
        {brand.title}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {brand.items.map((item) => (
          <div
            key={item.label}
            className={`p-3 border ${
              item.state === "rejected" ? "border-border" : "border-accent/30"
            } bg-card`}
          >
            <div className="flex flex-wrap gap-1.5 mb-2">
              {item.swatches.map((sw) => (
                <span
                  key={sw}
                  className="w-5 h-5 border border-border"
                  style={{ background: sw }}
                  title={sw}
                />
              ))}
            </div>
            <p className="text-[11px] text-muted-foreground">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Visual-first case study template.
 * Header → Three-fact bar → Hero devices → Process sections (Research / Design / Test) →
 * Screens → Results → Engineering notes → Prev/Next → More work.
 */
export default function CaseStudyLayout({
  study,
  visuals,
  prev,
  next,
  moreWork,
}: LayoutProps) {
  useReveal();
  const isExternal = visuals.prototype.kind === "external";

  const scrollToSection = (id: string) => goHomeToSection(id);

  return (
    <div className="min-h-screen bg-background">
      <SiteHead
        title={`${study.name} — ${
          toneFromKind(study.kind) === "live" ? "live product" : "case study"
        } | Mike Waitindi`}
        description={`${study.tagline} Stack: ${study.stack.join(", ")}.`}
        canonical={`/work/${study.slug}`}
        image={visuals.hero?.desktop ?? "/og-cover.png"}
        type="article"
      />

      <BrandEdgeHeader onNavClick={scrollToSection} />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <header className="border-b border-border pt-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-10 pb-8 sm:pt-14 sm:pb-10">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={13} aria-hidden /> Work
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <StatusBadge tone={toneFromKind(study.kind)} />
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
              {study.year}
            </span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
              {study.timeline}
            </span>
          </div>

          <h1
            className="mt-4 font-display font-black text-foreground tracking-tight leading-[0.95]"
            style={{ fontSize: "clamp(2.4rem, 7vw, 4.6rem)" }}
          >
            {study.name}
          </h1>
          <p className="mt-3 max-w-2xl text-lg sm:text-xl text-foreground/85 leading-snug">
            {study.tagline}
          </p>

          {/* THREE FACTS */}
          <dl className="mt-7 grid grid-cols-1 sm:grid-cols-3 border-y border-border divide-y sm:divide-y-0 sm:divide-x divide-border">
            {[
              { label: "Role", value: study.role },
              { label: "Stack", value: study.stack.join(" · ") },
              { label: "Outcome", value: study.outcomeLine },
            ].map((f) => (
              <div key={f.label} className="py-3 sm:px-5 first:sm:pl-0 last:sm:pr-0">
                <dt className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  {f.label}
                </dt>
                <dd className="text-[13px] text-foreground leading-snug mt-1">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>

          {/* LIVE LINK */}
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={visuals.prototype.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            >
              <ExternalLink size={15} aria-hidden /> {visuals.prototype.label}
            </a>
          </div>

          {/* HERO DEVICE SHOWCASE */}
          {visuals.hero && (
            <div className="mt-8 sm:mt-10">
              <HeroDeviceShowcase hero={visuals.hero} live />
            </div>
          )}
        </div>
      </header>

      {/* ── PROBLEM ───────────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-12">
          <Reveal>
            <span className="section-label mb-4">
              <span className="section-label-line" />
              01 · Problem
            </span>
            <h2 className="font-display font-bold text-foreground text-2xl sm:text-3xl tracking-tight mb-3">
              {study.problem.lead}
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <div className="flex flex-wrap gap-2 mt-4">
              {study.constraints.map((c) => (
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

      {/* ── RESEARCH ──────────────────────────────────────────────── */}
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-12">
          <Reveal>
            <span className="section-label mb-4">
              <span className="section-label-line" />
              02 · Research
            </span>
            <p className="text-muted-foreground text-sm mb-6 max-w-2xl">
              {study.research.lead}
            </p>
          </Reveal>

          {/* Personas */}
          {visuals.personas && visuals.personas.length > 0 && (
            <Reveal delay={1}>
              <div className="mb-8">
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-4">
                  User personas
                </p>
                <PersonaCards personas={visuals.personas} />
              </div>
            </Reveal>
          )}

          {/* Research bullets / callouts */}
          {study.research.bullets && study.research.bullets.length > 0 && (
            <Reveal delay={2}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {study.research.bullets.map((b) => (
                  <div key={b.text} className="border border-border bg-card p-4">
                    {b.label && (
                      <p className="text-[10px] font-mono uppercase tracking-widest text-accent mb-1">
                        {b.label}
                      </p>
                    )}
                    <p className="text-[13px] text-foreground leading-snug">
                      {b.text}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          {/* Callouts */}
          {study.research.callouts && study.research.callouts.length > 0 && (
            <Reveal delay={3}>
              <div className="mt-5 space-y-3">
                {study.research.callouts.map((c) => (
                  <blockquote
                    key={c.quote}
                    className="border-l-2 border-accent pl-4 py-1"
                  >
                    <p className="text-sm text-foreground italic">"{c.quote}"</p>
                    <cite className="text-[11px] font-mono text-muted-foreground not-italic mt-1 block">
                      — {c.source}
                    </cite>
                  </blockquote>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ── DESIGN THINKING ───────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-12">
          <Reveal>
            <span className="section-label mb-4">
              <span className="section-label-line" />
              03 · Design decisions
            </span>
            <p className="text-muted-foreground text-sm mb-6 max-w-2xl">
              {study.designThinking.lead}
            </p>
          </Reveal>

          <Reveal delay={1}>
            <SketchBoard sketches={visuals.sketches} />
          </Reveal>

          {/* Brand evolution for GiGi */}
          {visuals.brandEvolution && (
            <Reveal delay={2}>
              <div className="mt-8">
                <BrandEvolution brand={visuals.brandEvolution} />
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ── TEST / VALIDATE ───────────────────────────────────────── */}
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-12">
          <Reveal>
            <span className="section-label mb-4">
              <span className="section-label-line" />
              04 · Test & iterate
            </span>
          </Reveal>
          <Reveal delay={1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-border bg-card p-5 border-l-4 border-l-destructive">
                <p className="text-[10px] font-mono uppercase tracking-widest text-destructive mb-2">
                  {visuals.validate.before.label}
                </p>
                <p className="text-sm text-foreground leading-snug">
                  {visuals.validate.before.note}
                </p>
              </div>
              <div className="border border-border bg-card p-5 border-l-4 border-l-accent">
                <p className="text-[10px] font-mono uppercase tracking-widest text-accent mb-2">
                  {visuals.validate.after.label}
                </p>
                <p className="text-sm text-foreground leading-snug">
                  {visuals.validate.after.note}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SCREENS ───────────────────────────────────────────────── */}
      {visuals.screens && visuals.screens.length > 0 && (
        <section aria-label={`${study.name} screens`} className="border-b border-border">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-12">
            <Reveal>
              <span className="section-label mb-4">
                <span className="section-label-line" />
                05 · Shipped screens
              </span>
              <h2 className="font-display font-bold text-foreground tracking-tight text-2xl mb-6">
                Screens
              </h2>
            </Reveal>
            <DeviceShots shots={visuals.screens} />
          </div>
        </section>
      )}

      {/* ── RESULTS ───────────────────────────────────────────────── */}
      {visuals.metricCards.length > 0 && (
        <section aria-label="Results" className="border-b border-border bg-[#141310]">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-12">
            <Reveal>
              <span
                className="section-label mb-4"
                style={{ color: "rgba(242,237,230,0.5)" }}
              >
                <span className="section-label-line" />
                06 · Results
              </span>
              <h2
                className="font-display font-bold tracking-tight text-2xl mb-6"
                style={{ color: "#f2ede6" }}
              >
                Results
              </h2>
            </Reveal>
            <MetricCardRow cards={visuals.metricCards} />

            {/* Lessons */}
            {study.lessons.length > 0 && (
              <Reveal delay={2}>
                <div className="mt-8 pt-6 border-t" style={{ borderColor: "rgba(242,237,230,0.08)" }}>
                  <p
                    className="text-[10px] font-mono uppercase tracking-widest mb-3"
                    style={{ color: "rgba(242,237,230,0.5)" }}
                  >
                    Lessons
                  </p>
                  <ul className="space-y-2">
                    {study.lessons.map((l) => (
                      <li
                        key={l}
                        className="flex items-start gap-2 text-[13px]"
                        style={{ color: "rgba(242,237,230,0.7)" }}
                      >
                        <span
                          className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                          style={{ background: "#e8ff47" }}
                          aria-hidden
                        />
                        {l}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}

            {/* Roadmap */}
            {visuals.roadmap.length > 0 && (
              <Reveal delay={3}>
                <div className="mt-6">
                  <p
                    className="text-[10px] font-mono uppercase tracking-widest mb-3"
                    style={{ color: "rgba(242,237,230,0.5)" }}
                  >
                    Roadmap
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {visuals.roadmap.map((r) => (
                      <span
                        key={r}
                        className="px-3 py-1 text-[11px] font-mono border"
                        style={{
                          borderColor: "rgba(242,237,230,0.15)",
                          color: "rgba(242,237,230,0.6)",
                        }}
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* ── ENGINEERING NOTES ─────────────────────────────────────── */}
      {study.engineeringNotes && (
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-12">
            <Reveal>
              <span className="section-label mb-4">
                <span className="section-label-line" />
                Engineering notes
              </span>
              <p className="text-muted-foreground text-sm mb-6 max-w-2xl">
                Implementation details from the build — decisions that shaped the
                shipped product.
              </p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                {
                  label: "Architecture",
                  items: study.engineeringNotes.architecture,
                },
                {
                  label: "State & forms",
                  items: study.engineeringNotes.stateForms,
                },
                {
                  label: "Data & integration",
                  items: study.engineeringNotes.dataIntegration,
                },
                {
                  label: "Quality checks",
                  items: study.engineeringNotes.qualityChecks,
                },
              ]
                .filter((g) => g.items && g.items.length > 0)
                .map((group, i) => (
                  <Reveal key={group.label} delay={i % 2}>
                    <div className="border border-border bg-card p-5">
                      <p className="text-[10px] font-mono uppercase tracking-widest text-accent mb-3">
                        {group.label}
                      </p>
                      <ul className="space-y-2">
                        {group.items!.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-[12px] text-muted-foreground leading-snug"
                          >
                            <span
                              className="mt-1.5 w-1 h-1 bg-accent shrink-0"
                              aria-hidden
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PREV / NEXT ───────────────────────────────────────────── */}
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
              <div aria-hidden className="hidden sm:block sm:border-r border-border" />
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

      {/* MORE WORK */}
      {moreWork}

      <BrandEdgeFooter onNavClick={scrollToSection} />
    </div>
  );
}
