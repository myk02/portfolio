import { ArrowDown, ArrowUpRight } from "lucide-react";
import { heroStats, roleLine, heroHeadline } from "@/data/siteContent";
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
  const headlineParts = heroHeadline.split("automate");
  const renderHeadline = () => {
    if (headlineParts.length === 2) {
      return (
        <>
          {headlineParts[0]}
          <span className="relative inline-block">
            <span className="relative z-10 px-1.5 py-0.5 bg-accent text-accent-foreground font-black">
              automate
            </span>
          </span>
          {headlineParts[1]}
        </>
      );
    }
    return heroHeadline;
  };

  return (
    <section
      id="home"
      className="relative bg-secondary flex items-center overflow-hidden border-b border-border pt-16"
    >
      <div className="relative z-10 w-full px-4 sm:px-6 py-10 md:py-14 lg:py-16">
        <div className="max-w-[1160px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-10 lg:gap-10 xl:gap-14 items-center">
            <div className="order-1 min-w-0">
              <div className="mb-6 flex items-center gap-3 hero-kicker">
                <span className="w-2.5 h-2.5 bg-accent shrink-0" />
                <p className="text-mono text-muted-foreground text-[11px] sm:text-xs tracking-[0.14em]">
                  {roleLine}
                </p>
              </div>

              <h1
                className="heading-serif font-black tracking-tight max-w-[560px] text-foreground"
                style={{
                  fontSize: "clamp(2.15rem, 5.2vw, 3.4rem)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.03em",
                }}
              >
                {renderHeadline()}
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Surface className="inline-flex items-center gap-2 px-3 py-2">
                  <span className="live-dot" />
                  <span className="text-xs font-medium text-foreground whitespace-nowrap">
                    Available for work
                  </span>
                  <span className="hidden sm:inline text-xs text-muted-foreground">
                    · Replies within 24h
                  </span>
                </Surface>
                <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  {CONTACT.location}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-7">
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

              <div className="mt-10 pt-6 border-t border-border max-w-[520px]">
                {heroStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="min-w-0 border-l-2 border-accent pl-3"
                  >
                    <div className="font-display font-black text-[1.45rem] md:text-[1.6rem] text-foreground leading-none whitespace-nowrap">
                      <CountUp value={stat.value} />
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground leading-snug mt-1.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-2 w-full max-w-[520px] mx-auto lg:max-w-none lg:mx-0">
              <HeroVisual />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
