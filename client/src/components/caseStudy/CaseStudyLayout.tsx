import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import type { CaseStudy } from "@/data/caseStudies";
import type { StudyVisuals } from "@/data/caseVisuals";
import SiteHead from "@/components/SiteHead";
import StatusBadge, { toneFromKind } from "@/components/engineering/StatusBadge";
import { HeroDeviceShowcase, DeviceShots } from "@/components/artifacts/Screens";
import { MetricCardRow } from "@/components/artifacts/MetricCard";

interface LayoutProps {
  study: CaseStudy;
  visuals: StudyVisuals;
  prev: { slug: string; name: string };
  next: { slug: string; name: string };
  moreWork: React.ReactNode;
}

/**
 * Lean case-study template: hero → three-fact line → real screenshots →
 * numbers → live link. Built for a two-minute recruiter read.
 */
export default function CaseStudyLayout({
  study,
  visuals,
  prev,
  next,
  moreWork,
}: LayoutProps) {
  const isExternal = visuals.prototype.kind === "external";

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

      {/* HERO */}
      <header className="border-b border-border">
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

          {/* THREE FACTS — role · stack · outcome, one scannable line each */}
          <dl className="mt-7 grid grid-cols-1 sm:grid-cols-3 border-y border-border divide-y sm:divide-y-0 sm:divide-x divide-border">
            {[
              { label: "Role", value: study.role },
              { label: "Stack", value: study.stack.join(" · ") },
              { label: "Outcome", value: study.outcomeLine },
            ].map(f => (
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
          <div className="mt-6">
            <a
              href={visuals.prototype.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            >
              <ExternalLink size={15} aria-hidden /> {visuals.prototype.label}
            </a>
          </div>

          {/* SHIPPED UI — one design, every viewport */}
          {visuals.hero && (
            <div className="mt-8 sm:mt-10">
              <HeroDeviceShowcase hero={visuals.hero} live />
            </div>
          )}
        </div>
      </header>

      {/* SCREENS — real captures from the shipped product */}
      {visuals.screens && visuals.screens.length > 0 && (
        <section aria-label={`${study.name} screens`} className="border-b border-border">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-12">
            <h2 className="font-display font-bold text-foreground tracking-tight text-2xl mb-6">
              Screens
            </h2>
            <DeviceShots shots={visuals.screens} />
          </div>
        </section>
      )}

      {/* NUMBERS */}
      {visuals.metricCards.length > 0 && (
        <section aria-label="Results" className="border-b border-border bg-secondary">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-12">
            <h2 className="font-display font-bold text-foreground tracking-tight text-2xl mb-6">
              Results
            </h2>
            <MetricCardRow cards={visuals.metricCards} />
          </div>
        </section>
      )}

      {/* PREV / NEXT */}
      <nav aria-label="More projects" className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2">
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
        </div>
      </nav>

      {/* MORE WORK */}
      {moreWork}
    </div>
  );
}
