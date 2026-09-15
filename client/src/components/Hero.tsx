import { ArrowDown, ArrowUpRight } from "lucide-react";
import { heroStats, roleChips, roleLine, heroHeadline, heroSubline, positionTitle } from "@/data/siteContent";
import { CONTACT } from "@/lib/site";
import { liveStudies } from "@/data/projects";
import { CountUp } from "@/components/CountUp";
import { Surface } from "@/components/ui/section";
import BuyMeCoffee from "@/components/BuyMeCoffee";

interface HeroProps {
  onCtaClick: (id: string) => void;
}

function HeroVisual() {
  const featured = liveStudies[0];
  if (!featured?.liveUrl) return null;

  return (
    <Surface className="w-full overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-border bg-secondary/60">
        <div className="flex items-center gap-2">
          <span className="live-dot" aria-hidden />
          <span className="text-[10px] font-mono uppercase tracking-widest text-foreground font-medium">
            Featured — {featured.name} · Live
          </span>
        </div>
        <span className="hidden sm:inline text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          {featured.year} · {featured.timeline}
        </span>
      </div>

      <a
        href={featured.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative aspect-[16/10] bg-muted"
      >
        <img
          src={featured.hero.src}
          alt={featured.hero.alt}
          className="w-full h-full object-cover object-top"
        />
      </a>

      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-t border-border bg-secondary/40">
        <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
          {featured.outcomeTitle}
        </p>
        <a
          href={featured.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[11px] font-medium text-foreground hover:text-accent transition-colors"
        >
          Open live site <ArrowUpRight size={12} />
        </a>
      </div>
    </Surface>
  );
}

export default function Hero({ onCtaClick }: HeroProps) {
  return (
    <section
      id="home"
      className="relative bg-secondary flex items-center overflow-hidden border-b border-border pt-16"
    >
      <div className="relative z-10 w-full py-8 md:py-10">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 lg:gap-8 items-center max-w-4xl mx-auto">
            <div className="order-1 min-w-0 text-center mx-auto max-w-[30rem] lg:max-w-none">
              <div className="mb-4 flex items-center justify-center gap-3 hero-kicker">
                <span className="w-2 h-2 bg-accent shrink-0" />
                <p className="text-mono text-muted-foreground text-[0.6875rem] sm:text-xs">
                  {roleLine}
                </p>
              </div>

              <h1 className="heading-hero text-foreground text-balance mx-auto">
                {heroHeadline}
              </h1>

              <p className="mt-3 text-[0.6875rem] sm:text-xs font-mono uppercase tracking-[0.14em] text-muted-foreground">
                Mike Waitindi — {positionTitle}
              </p>

              <p className="mt-4 text-[0.875rem] text-muted-foreground leading-relaxed max-w-[26rem] mx-auto">
                {heroSubline}
              </p>

              <ul className="mt-4 flex flex-wrap items-center justify-center gap-1.5 max-w-[26rem] mx-auto" aria-label="Roles offered">
                {roleChips.map((role) => (
                  <li
                    key={role}
                    className="px-2 py-1 text-[10px] font-mono uppercase tracking-widest border border-border bg-card text-foreground"
                  >
                    {role}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
                <Surface className="inline-flex items-center gap-2 px-2.5 py-1.5">
                  <span className="live-dot" />
                  <span className="text-[11px] font-medium text-foreground whitespace-nowrap">
                    Available for work
                  </span>
                  <span className="hidden sm:inline text-[11px] text-muted-foreground">
                    · Replies within 24h
                  </span>
                </Surface>
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  {CONTACT.location}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2.5 mt-5">
                <button
                  type="button"
                  onClick={() => onCtaClick("work")}
                  className="btn btn-primary gap-2"
                >
                  View live work
                  <ArrowDown size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => onCtaClick("contact")}
                  className="btn btn-secondary"
                >
                  Work with me
                </button>
                <BuyMeCoffee />
              </div>

              <div className="mt-6 pt-5 border-t border-border max-w-[24rem] mx-auto">
                <ul className="flex flex-wrap justify-center gap-2 mb-5" aria-label="Core stack">
                  {["Solution Engineer", "Python + Pandas", "SQL", "Docker + GCP Cloud Run", "BigQuery", "Embeddings + LLMs", "React", "TypeScript"].map((t) => (
                    <li
                      key={t}
                      className="px-2 py-1 text-[10px] font-mono uppercase tracking-widest border border-border bg-card text-foreground"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="grid grid-cols-3 gap-3 text-left">
                {heroStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="min-w-0 border-l-2 border-accent pl-3"
                  >
                    <div className="font-display font-semibold text-[1.1rem] text-foreground leading-none whitespace-nowrap tracking-tight">
                      <CountUp value={stat.value} />
                    </div>
                    <div className="text-[0.625rem] font-mono font-medium uppercase tracking-[0.1em] text-muted-foreground leading-snug mt-2">
                      {stat.label}
                    </div>
                  </div>
                ))}
                </div>
              </div>
            </div>

            <div className="order-2 w-full max-w-[24rem] mx-auto">
              <HeroVisual />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
