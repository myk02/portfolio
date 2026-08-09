import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  MousePointerClick,
  List,
} from "lucide-react";
import type { CaseStudy } from "@/data/caseStudies";
import type { StudyVisuals } from "@/data/caseVisuals";
import {
  useScrollSpy,
  useReadingProgress,
  scrollToId,
} from "@/hooks/useScrollSpy";
import type { ChapterBlock, GlanceItem } from "./caseChapters";
import SiteHead from "@/components/SiteHead";
import DesignJourney from "@/components/DesignJourney";
import { HeroDeviceShowcase } from "@/components/artifacts/Screens";
import { DesktopMockup } from "@/components/artifacts/DeviceMockups";
import { DeviceShowcaseFigure } from "@/components/artifacts/DeviceShowcaseFigure";
import BankingArt from "@/components/art/BankingArt";
import { BankingDeviceShowcase } from "@/components/art/BankingResponsive";
import {
  DashboardScreen,
  DesignSystemScreen,
} from "@/components/art/ResponsiveConceptArt";

interface LayoutProps {
  study: CaseStudy;
  visuals: StudyVisuals;
  chapters: ChapterBlock[];
  glance: GlanceItem[];
  prev: { slug: string; name: string };
  next: { slug: string; name: string };
  moreWork: React.ReactNode;
}

const CHAPTER_ID = (id: string) => `chapter-${id}`;

export default function CaseStudyLayout({
  study,
  visuals,
  chapters,
  glance,
  prev,
  next,
  moreWork,
}: LayoutProps) {
  const ids = useMemo(() => chapters.map(c => CHAPTER_ID(c.id)), [chapters]);
  const active = useScrollSpy(ids, 120);
  const progress = useReadingProgress();
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeChapter =
    chapters.find(c => CHAPTER_ID(c.id) === active) ?? chapters[0];

  /* arrow-key navigation between studies */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowLeft") {
        window.location.assign(`/work/${prev.slug}`);
      } else if (e.key === "ArrowRight") {
        window.location.assign(`/work/${next.slug}`);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev.slug, next.slug]);

  /* close mobile menu on navigation */
  useEffect(() => {
    setMobileOpen(false);
  }, [active]);

  const isExternal = visuals.prototype.kind === "external";
  const ProtoIcon = isExternal ? ExternalLink : MousePointerClick;

  return (
    <div className="min-h-screen bg-background">
      <SiteHead
        title={`${study.name} — ${study.kind} case study | Mike Waitindi`}
        description={study.tagline}
        canonical={`/work/${study.slug}`}
        image={visuals.hero?.desktop ?? "/og-cover.png"}
        type="article"
      />
      {/* reading progress */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-foreground/10 z-50">
        <div
          className="h-full bg-accent origin-left transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* HERO */}
      <header className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-10 pb-8 sm:pt-14 sm:pb-12">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={13} aria-hidden /> All work
          </Link>

          <div className="mt-6 flex flex-wrap items-start gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest border border-border text-foreground">
              {study.kind}
            </span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
              {study.year}
            </span>
          </div>

          <h1
            className="mt-4 font-display font-black text-foreground tracking-tight leading-[0.95]"
            style={{ fontSize: "clamp(2.4rem, 7vw, 4.6rem)" }}
          >
            {study.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg sm:text-xl text-foreground/85 leading-snug">
            {study.tagline}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={visuals.prototype.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <ProtoIcon size={15} aria-hidden /> {visuals.prototype.label}
            </a>
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
              {study.role}
            </span>
          </div>

          {/* HERO DEVICES — the design shown inside mobile, tablet and desktop mockups */}
          <div className="mt-10 sm:mt-12">
            {study.slug === "mobile-banking-redesign" ? (
              <BankingDeviceShowcase
                screen="home"
                title="Concept hi-fi — one design, three viewports"
              />
            ) : visuals.hero ? (
              <HeroDeviceShowcase hero={visuals.hero} live />
            ) : study.slug === "dashboard-ui-system" ? (
              <DeviceShowcaseFigure
                title="Concept hi-fi — one design, three viewports"
                meta="mobile · tablet · desktop"
                note="A dense analytics product can still breathe at every size."
                phone={<DashboardScreen variant="mobile" />}
                tablet={<DashboardScreen variant="tablet" />}
                desktop={<DashboardScreen variant="desktop" />}
                phoneClassName="w-[180px]"
                tabletClassName="w-[240px]"
                desktopClassName="w-[520px]"
              />
            ) : study.slug === "design-system-creation" ? (
              <DeviceShowcaseFigure
                title="Concept hi-fi — one design, three viewports"
                meta="mobile · tablet · desktop"
                note="Components that stay honest from phone to desktop."
                phone={<DesignSystemScreen variant="mobile" />}
                tablet={<DesignSystemScreen variant="tablet" />}
                desktop={<DesignSystemScreen variant="desktop" />}
                phoneClassName="w-[180px]"
                tabletClassName="w-[240px]"
                desktopClassName="w-[520px]"
              />
            ) : (
              <figure className="border border-border bg-card p-4 sm:p-6">
                <figcaption className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
                  Hi-fi concept — desktop monitor
                </figcaption>
                <DesktopMockup
                  content={{
                    node: <BankingArt />,
                  }}
                  showStand
                  aspect="aspect-auto"
                  className="w-full"
                  label="Desktop · concept"
                />
              </figure>
            )}
          </div>
        </div>
      </header>

      {/* DESIGN JOURNEY — full-width scroll-driven strip */}
      <section
        aria-label={`${study.name} — design journey`}
        className="border-b border-border"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
          <DesignJourney slug={study.slug} />
        </div>
      </section>

      {/* BODY GRID */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-8 lg:gap-12">
          {/* MAIN */}
          <article className="min-w-0 py-10 lg:py-14">
            {chapters.map(c => (
              <section
                key={c.id}
                id={CHAPTER_ID(c.id)}
                className="scroll-mt-28 mb-16 lg:mb-24 last:mb-0"
              >
                <p className="text-[11px] font-mono uppercase tracking-widest text-accent mb-2">
                  {c.kicker}
                </p>
                <h2 className="font-display font-bold text-foreground tracking-tight text-3xl sm:text-4xl mb-6">
                  {c.title}
                </h2>
                {c.body}
              </section>
            ))}
          </article>

          {/* STICKY RAIL */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 py-14 space-y-8">
              {/* At a glance */}
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3">
                  At a glance
                </p>
                <dl className="divide-y divide-border border-y border-border">
                  {glance.map(g => (
                    <div
                      key={g.label}
                      className="flex items-start justify-between gap-4 py-2.5"
                    >
                      <dt className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground shrink-0">
                        {g.label}
                      </dt>
                      <dd className="text-right text-[13px] text-foreground leading-snug">
                        {g.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Jump to */}
              <nav aria-label="Chapters">
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3">
                  Jump to
                </p>
                <ol className="space-y-1">
                  {chapters.map(c => {
                    const isActive = CHAPTER_ID(c.id) === active;
                    return (
                      <li key={c.id}>
                        <button
                          type="button"
                          onClick={() => scrollToId(CHAPTER_ID(c.id))}
                          aria-current={isActive ? "true" : undefined}
                          className={`w-full text-left text-[13px] px-2.5 py-1.5 border-l-2 transition-colors ${
                            isActive
                              ? "border-accent text-foreground font-semibold bg-accent/10"
                              : "border-transparent text-muted-foreground hover:text-foreground hover:border-foreground/20"
                          }`}
                        >
                          {c.label}
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </nav>

              {/* Active pull-quote / stat */}
              {activeChapter?.rail && (
                <div className="border-t border-border pt-5">
                  {activeChapter.rail.kind === "quote" ? (
                    <blockquote className="border-l-4 border-l-accent pl-3 text-sm text-foreground/90 italic leading-relaxed">
                      “{activeChapter.rail.quote}”
                      {activeChapter.rail.source && (
                        <footer className="mt-1.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground not-italic">
                          {activeChapter.rail.source}
                        </footer>
                      )}
                    </blockquote>
                  ) : (
                    <div>
                      <p className="font-display font-black text-foreground leading-none tracking-tight text-3xl">
                        {activeChapter.rail.value}
                      </p>
                      <p className="mt-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                        {activeChapter.rail.label}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* MOBILE CHAPTER DROPDOWN */}
      <div className="lg:hidden sticky bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4">
          <button
            type="button"
            onClick={() => setMobileOpen(o => !o)}
            aria-expanded={mobileOpen}
            className="w-full flex items-center justify-between py-3 text-sm font-semibold"
          >
            <span className="inline-flex items-center gap-2 text-foreground">
              <List size={15} aria-hidden /> {activeChapter?.label}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              {mobileOpen ? "Close" : "Chapters"}
            </span>
          </button>
          {mobileOpen && (
            <ol className="pb-3 grid grid-cols-2 gap-1.5">
              {chapters.map(c => {
                const isActive = CHAPTER_ID(c.id) === active;
                return (
                  <li key={c.id}>
                    <button
                      type="button"
                      onClick={() => scrollToId(CHAPTER_ID(c.id))}
                      className={`w-full text-left text-[12px] px-2.5 py-2 border ${
                        isActive
                          ? "border-accent text-foreground bg-accent/10"
                          : "border-border text-muted-foreground"
                      }`}
                    >
                      {c.label}
                    </button>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </div>

      {/* PREV / NEXT */}
      <nav aria-label="More case studies" className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2">
          <Link
            href={`/work/${prev.slug}`}
            className="group flex items-center gap-3 py-6 sm:py-10 border-b sm:border-b-0 sm:border-r border-border hover:bg-foreground/[0.02] transition-colors"
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
          <Link
            href={`/work/${next.slug}`}
            className="group flex items-center justify-end gap-3 py-6 sm:py-10 hover:bg-foreground/[0.02] transition-colors text-right"
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
        </div>
      </nav>

      {/* MORE WORK */}
      {moreWork}
    </div>
  );
}
