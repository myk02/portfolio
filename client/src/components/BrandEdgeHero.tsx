import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import BankingArt from "@/components/art/BankingArt";
import { CountUp } from "@/components/CountUp";
import { heroStats } from "@/data/siteContent";
import { skillMarquee } from "@/data/caseStudies";

interface BrandEdgeHeroProps {
  onCtaClick: (id: string) => void;
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function HeroVisual() {
  return (
    <div className="w-full hero-float">
      <div className="rounded-soft-sm border border-border bg-card p-3 sm:p-4 md:p-5 shadow-[0_24px_60px_-20px_rgba(10,10,10,0.18)]">
        <BankingArt />
      </div>
      <p className="mt-3 text-center text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
        Mobile banking · Hi-fi concept
      </p>
    </div>
  );
}

export default function BrandEdgeHero({ onCtaClick }: BrandEdgeHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const artY = useTransform(scrollYProgress, [0, 1], [0, 32]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-[100dvh] bg-secondary flex items-center overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.3]"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 85% 20%, rgba(232,255,71,0.1), transparent 60%)",
        }}
      />

      <div className="container relative z-10 w-full py-14 md:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto">
          {/* tablet + desktop: side-by-side from lg; tablet stacks cleanly */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-14 items-center">
            <div className="order-1 lg:order-1 min-w-0">
              <div className="mb-5 md:mb-6 flex items-center gap-3 hero-kicker">
                <span className="w-2 h-2 bg-accent shrink-0" />
                <span className="text-mono text-muted-foreground text-sm">
                  UI/UX Designer · Nairobi, Kenya
                </span>
              </div>

              <p className="text-[1.15rem] md:text-[1.2rem] text-foreground mb-2 flex items-center gap-2 hero-kicker">
                Hi, I&apos;m Mike.
                <svg width="26" height="14" viewBox="0 0 26 14" fill="none" aria-hidden className="shrink-0">
                  <path
                    d="M1 8 C4 3, 7 3, 10 8 S 16 13, 19 8 S 24 2, 25 5"
                    stroke="var(--accent)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                    className="wave-arc"
                    pathLength={1}
                  />
                </svg>
              </p>

              <h1
                className="heading-serif font-semibold text-foreground max-w-xl"
                style={{ fontSize: "clamp(2rem, 5.5vw, 3rem)", lineHeight: 1.08 }}
              >
                Visual design thinker for digital products.
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5, ease: EASE }}
                className="text-muted-foreground text-base leading-snug max-w-md mt-4"
              >
                Flows · wireframes · hi-fi · test — Figma to shipped product.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5, ease: EASE }}
                className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 mt-7"
              >
                <button type="button" onClick={() => onCtaClick("work")} className="btn btn-primary">
                  See case studies
                  <ArrowDown size={14} />
                </button>
                <a href="/CV.pdf" download className="btn btn-secondary">
                  <Download size={15} />
                  Download CV
                </a>
                <span className="inline-flex items-center gap-2 px-3 py-2 rounded-pill border border-border bg-card/60">
                  <span className="live-dot" />
                  <span className="text-xs font-medium text-foreground whitespace-nowrap">
                    Open to opportunities
                  </span>
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5, ease: EASE }}
                className="grid grid-cols-2 gap-x-4 gap-y-5 mt-10 pt-8 border-t border-border md:grid-cols-4"
              >
                {heroStats.map((stat) => (
                  <div key={stat.label} className="min-w-0">
                    <div className="font-display font-bold text-[1.5rem] md:text-[1.65rem] text-foreground whitespace-nowrap">
                      <CountUp value={stat.value} />
                    </div>
                    <div className="text-[0.7rem] md:text-[0.72rem] text-muted-foreground leading-snug mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* visual — visible on tablet (md) and desktop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.55, ease: EASE }}
              className="order-2 lg:order-2 w-full max-w-md lg:max-w-none mx-auto lg:mx-0"
            >
              <motion.div style={{ y: artY }}>
                <HeroVisual />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SkillMarquee() {
  const items = [...skillMarquee, ...skillMarquee];
  return (
    <div className="marquee-band bg-[#141310] text-[#f2ede6] overflow-hidden" aria-hidden>
      <div className="marquee-container py-5">
        <div className="marquee-track items-center">
          {items.map((skill, i) => (
            <span key={`${skill}-${i}`} className="flex items-center gap-6 whitespace-nowrap">
              <span className="text-sm font-medium tracking-wide opacity-90">{skill}</span>
              <span className="text-[#e8ff47] text-xs">◆</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
