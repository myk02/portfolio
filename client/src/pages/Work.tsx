import { Link } from "wouter";
import { caseStudies } from "@/data/caseStudies";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import SiteHead from "@/components/SiteHead";
import StatusBadge, {
  toneFromKind,
} from "@/components/engineering/StatusBadge";
import type { CaseStudy } from "@/data/caseStudies";
import BrandEdgeHeader from "@/components/BrandEdgeHeader";
import BrandEdgeFooter from "@/components/BrandEdgeFooter";
import { Reveal } from "@/components/Reveal";
import { goHomeToSection } from "@/lib/navigation";
import { useReveal } from "@/hooks/useReveal";

// Map case study slug → desktop screenshot (the largest and most impactful visual)
const COVER: Record<string, string> = {
  kenyatrace: "/shots/kenyatrace/home-cards-desktop.jpg",
  "gigi-energy": "/shots/gigi-energy/home-products-desktop.jpg",
  legalflow: "/shots/legalflow/home-desktop.jpg",
};

const BG: Record<string, string> = {
  kenyatrace: "#efe9dd",
  "gigi-energy": "#141310",
  legalflow: "#141310",
};

function VisualCard({ study, featured }: { study: CaseStudy; featured?: boolean }) {
  const cover = COVER[study.slug];
  const bg = BG[study.slug] ?? "#f4efe7";

  return (
    <Reveal className={featured ? "lg:col-span-2" : "h-full"}>
      <div className="group h-full flex flex-col border border-border bg-card hover:border-foreground/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-16px_rgba(10,10,10,0.22)]">
        {/* visual */}
        <Link
          href={`/work/${study.slug}`}
          className="relative block overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          aria-label={`${study.name} — case study`}
          style={{ aspectRatio: featured ? "16/7" : "16/9" }}
        >
          <div
            className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            style={{ background: bg }}
          >
            {cover && (
              <img
                src={cover}
                alt={`${study.name} screenshot`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top"
              />
            )}
          </div>
          {/* lime flash on hover */}
          <span
            className="absolute inset-0 border border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none"
            aria-hidden
          />
          {/* badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-20">
            <StatusBadge tone={toneFromKind(study.kind)} />
            <span className="px-2 py-1 text-[11px] font-mono tracking-widest uppercase bg-background/85 backdrop-blur border border-border text-foreground">
              {study.year}
            </span>
          </div>
        </Link>

        {/* body */}
        <div className="p-5 sm:p-6 flex flex-col gap-3 flex-1">
          <div>
            <h2 className="font-display font-bold text-foreground text-xl sm:text-2xl tracking-tight leading-tight">
              {study.name}
            </h2>
            <p className="text-sm text-muted-foreground leading-snug mt-1">
              {study.tagline}
            </p>
          </div>

          {/* role + stack chips */}
          <div className="flex flex-wrap gap-1.5">
            <span className="px-2 py-1 text-[10px] font-mono uppercase tracking-widest bg-foreground text-background">
              {study.role}
            </span>
            {study.stack.slice(0, 2).map((s) => (
              <span
                key={s}
                className="px-2 py-1 text-[10px] font-mono uppercase tracking-widest border border-border text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </div>

          {/* proof badge */}
          <span className="inline-flex px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest bg-accent/15 border border-accent/30 text-foreground w-fit">
            {study.tileBadge}
          </span>

          {/* CTAs */}
          <div className="mt-auto pt-3 border-t border-border flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium">
            <Link
              href={`/work/${study.slug}`}
              className="inline-flex items-center gap-1.5 text-foreground transition-transform duration-200 hover:translate-x-0.5 underline-offset-4 hover:underline"
            >
              Case study
              <ArrowUpRight size={14} aria-hidden />
            </Link>
            {study.liveUrl && (
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
              >
                <ExternalLink size={13} aria-hidden />
                Live site
              </a>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Work() {
  useReveal();
  const live = caseStudies.filter((s) => s.kind === "LIVE PRODUCT");
  const concepts = caseStudies.filter((s) => s.kind === "CONCEPTUAL");
  const [featured, ...rest] = live;

  const scrollToSection = (id: string) => {
    if (id === "home") {
      goHomeToSection("home");
    } else {
      goHomeToSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHead
        title="Work — live products & engineering case studies | Mike Waitindi"
        description="Live production web apps with engineering case studies — each with stack, role, constraints, and the decisions behind it."
        canonical="/work"
        type="website"
      />

      <BrandEdgeHeader onNavClick={scrollToSection} />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-24 pb-20">
        {/* back nav */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Home
        </Link>

        {/* heading */}
        <div className="mt-8 mb-12">
          <span className="section-label mb-2">
            <span className="section-label-line" />
            Portfolio · 0{live.length} shipped
          </span>
          <h1
            className="font-display font-black text-foreground tracking-tight leading-[0.95] mb-4"
            style={{ fontSize: "clamp(2.6rem, 7vw, 4.8rem)", letterSpacing: "-0.03em" }}
          >
            Work<span className="text-accent">.</span>
          </h1>
          <div className="flex flex-wrap gap-3 items-start">
            <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
              Every project is live, linkable, and measurable — stack, role, and the
              decision that moved a number. No placeholders.
            </p>
            <div className="flex flex-wrap gap-2 ml-auto">
              <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1.5 border border-border bg-card text-muted-foreground">
                React 19 · TypeScript · Tailwind v4
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1.5 bg-accent text-accent-foreground border border-foreground/10">
                2 live · 0 concept
              </span>
            </div>
          </div>
        </div>

        {/* Live production — visual grid */}
        <section aria-labelledby="live-heading" className="mt-2">
          <h2
            id="live-heading"
            className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6"
          >
            Live production ({live.length})
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
            {featured && <VisualCard study={featured} featured />}
            {rest.map((s) => (
              <VisualCard key={s.slug} study={s} />
            ))}
          </div>
        </section>

        {/* Concept studies */}
        {concepts.length > 0 && (
          <section aria-labelledby="concept-heading" className="mt-14">
            <h2
              id="concept-heading"
              className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6"
            >
              Concept studies ({concepts.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {concepts.map((s) => (
                <VisualCard key={s.slug} study={s} />
              ))}
            </div>
          </section>
        )}
      </div>

      <BrandEdgeFooter onNavClick={scrollToSection} />
    </div>
  );
}
