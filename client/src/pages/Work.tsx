import { Link } from "wouter";
import { caseStudies } from "@/data/caseStudies";
import { ArrowUpRight } from "lucide-react";
import SiteHead from "@/components/SiteHead";
import StatusBadge, {
  toneFromKind,
} from "@/components/engineering/StatusBadge";
import type { CaseStudy } from "@/data/caseStudies";

function WorkCard({ study }: { study: CaseStudy }) {
  return (
    <li className="group flex flex-col border border-border bg-card hover:border-foreground/40 transition-all duration-300 hover:-translate-y-1">
      <Link
        href={`/work/${study.slug}`}
        aria-label={`${study.name} — case study`}
        className="p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
      >
        <div className="flex items-start justify-between gap-3">
          <StatusBadge tone={toneFromKind(study.kind)} />
          <ArrowUpRight
            size={20}
            className="text-muted-foreground group-hover:text-foreground transition-colors shrink-0"
            aria-hidden
          />
        </div>
        <h2 className="mt-4 font-display font-bold text-foreground text-2xl tracking-tight group-hover:underline underline-offset-4 decoration-1">
          {study.name}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground leading-snug">
          {study.tagline}
        </p>
      </Link>
      <div className="px-5 pb-5 mt-auto">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] font-medium pt-1">
          <Link
            href={`/work/${study.slug}`}
            className="inline-flex items-center gap-1.5 text-foreground underline-offset-4 hover:underline"
          >
            Case study
            <span aria-hidden>→</span>
          </Link>
          {study.liveUrl && (
            <a
              href={study.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
            >
              Live site
              <ArrowUpRight size={13} aria-hidden />
            </a>
          )}
        </div>
      </div>
    </li>
  );
}

export default function Work() {
  const live = caseStudies.filter(s => s.kind === "LIVE PRODUCT");
  const concepts = caseStudies.filter(s => s.kind === "CONCEPTUAL");

  return (
    <div className="min-h-screen bg-background">
      <SiteHead
        title="Work — live products & engineering case studies | Mike Waitindi"
        description="Two live production web apps and three clearly-labeled concept studies — each with stack, role, constraints, and the engineering decisions behind it."
        canonical="/work"
        type="website"
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-14 pb-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Home
        </Link>

        <h1
          className="mt-6 font-display font-black text-foreground tracking-tight leading-[0.95]"
          style={{ fontSize: "clamp(2.4rem, 7vw, 4.6rem)" }}
        >
          Work
        </h1>

        {/* Live production */}
        <section aria-labelledby="live-heading" className="mt-10">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {live.map(s => (
              <WorkCard key={s.slug} study={s} />
            ))}
          </ul>
        </section>

        {/* Concept studies */}
        {concepts.length > 0 && (
          <section aria-labelledby="concept-heading" className="mt-14">
            <h2
              id="concept-heading"
              className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-5"
            >
              Concept studies ({concepts.length})
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {concepts.map(s => (
                <WorkCard key={s.slug} study={s} />
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
