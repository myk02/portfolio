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

function RevealWord({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="reveal-word" style={{ animationDelay: `${delay}s` }}>
      <span>{children}</span>
    </span>
  );
}

function HeroVisual() {
  return (
    <div className="w-full">
      <BankingArt />
      <p className="mt-4 text-center text-xs font-mono uppercase tracking-widest text-muted-foreground">
        Youth Mobile Banking Redesign — Concept
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
  const artY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-[100dvh] bg-secondary flex items-center overflow-hidden"
    >
      <div className="container relative z-10 w-full py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[58fr_42fr] items-center gap-12 lg:gap-10 max-w-6xl mx-auto">
          <div>
            <div className="mb-7 flex items-center gap-3 hero-kicker">
              <span className="w-2 h-2 bg-accent shrink-0" />
              <span className="text-mono text-muted-foreground">
                UI/UX Designer — Nairobi, Kenya
              </span>
            </div>

            <h1
              className="heading-serif font-semibold text-foreground"
              style={{ fontSize: "clamp(2.25rem, 7vw, 3.25rem)", lineHeight: 1.05 }}
            >
              <span className="block">
                <RevealWord delay={0.05}>I design digital</RevealWord>
                <RevealWord delay={0.11}>banking</RevealWord>
              </span>
              <span className="block">
                <RevealWord delay={0.17}>
                  <span className="amp"> &amp; </span>products that
                </RevealWord>
                <RevealWord delay={0.23}>make young customers</RevealWord>
              </span>
              <span className="block">
                <RevealWord delay={0.29}>feel</RevealWord>
                <RevealWord delay={0.35}>understood.</RevealWord>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5, ease: EASE }}
              className="text-muted-foreground text-lg leading-relaxed max-w-xl mt-6"
            >
              Product &amp; UX designer with 4+ years of experience. I lead UX decisions —
              research, flows, wireframes, interaction models — and ship interfaces for
              mobile, web, and app. Currently designing for fintech and consumer products.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5, ease: EASE }}
              className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 mt-8"
            >
              <button type="button" onClick={() => onCtaClick("work")} className="btn btn-primary">
                See my work
                <ArrowDown size={14} />
              </button>
              <a href="/CV.pdf" download className="btn btn-secondary">
                <Download size={15} />
                Download CV
              </a>
              <span className="inline-flex items-center gap-2 px-3 py-2 rounded-pill border border-border bg-card/60">
                <span className="live-dot" />
                <span className="text-xs font-medium text-foreground whitespace-nowrap">
                  Available — open to new opportunities
                </span>
              </span>
            </motion.div>

            <div className="lg:hidden mt-12">
              <HeroVisual />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.68, duration: 0.5, ease: EASE }}
              className="grid grid-cols-2 gap-x-4 gap-y-6 mt-12 pt-8 border-t border-border sm:grid-cols-4 lg:mt-10 lg:pt-8"
            >
              {heroStats.map((stat) => (
                <div key={stat.label} className="min-w-0">
                  <div className="font-display font-bold text-[1.75rem] text-foreground whitespace-nowrap">
                    <CountUp value={stat.value} />
                  </div>
                  <div className="text-[0.75rem] text-muted-foreground whitespace-nowrap leading-snug mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="relative hidden lg:flex justify-center items-center">
            <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-[2px] h-16 bg-accent" aria-hidden />
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.55, ease: EASE }}
            >
              <motion.div style={{ y: artY }} className="w-full max-w-[440px]">
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
