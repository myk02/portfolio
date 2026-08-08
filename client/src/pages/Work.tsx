import { Link } from "wouter";
import { caseStudies } from "@/data/caseStudies";
import { ArrowUpRight } from "lucide-react";
import SiteHead from "@/components/SiteHead";

export default function Work() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHead
        title="Work — case studies | Mike Waitindi"
        description="Case studies in research, UX, and design systems — live products and concept work, each with the decisions behind it."
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
        <p className="mt-4 max-w-2xl text-lg text-foreground/85 leading-snug">
          Case studies in research, UX, and design systems — live products and
          concept work, each with the decisions behind it.
        </p>

        <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {caseStudies.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/work/${s.slug}`}
                className="group block border border-border bg-card p-5 hover:border-foreground/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest border border-border text-foreground">
                      {s.kind}
                    </span>
                    <h2 className="mt-3 font-display font-bold text-foreground text-2xl tracking-tight">
                      {s.name}
                    </h2>
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="text-muted-foreground group-hover:text-foreground transition-colors shrink-0"
                    aria-hidden
                  />
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-snug">{s.tagline}</p>
                <p className="mt-4 text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
                  {s.year} · {s.role}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
