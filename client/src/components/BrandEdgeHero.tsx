import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import BankingArt from "@/components/art/BankingArt";
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

export default function BrandEdgeHero({ onCtaClick }: BrandEdgeHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const artY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const artOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.15]);

  const headline: [string, string][] = [
    ["I design digital", "banking"],
    ["& products that", "make young customers"],
    ["feel", "understood."],
  ];

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-[88vh] bg-secondary flex items-center overflow-hidden"
    >
      <div className="container relative z-10 w-full py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-center gap-12 lg:gap-14 max-w-6xl mx-auto">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="mb-7 flex items-center gap-3"
            >
              <span className="section-label mb-0">
                <span className="section-label-line" />
              </span>
              <span className="text-mono text-muted-foreground">
                UI/UX Designer — Nairobi, Kenya
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="heading-serif font-black text-foreground"
              style={{ fontSize: "clamp(2.6rem, 7.2vw, 5.2rem)" }}
            >
              {headline.map((line, li) => (
                <span key={li} className="block">
                  <RevealWord delay={0.05 + li * 0.12 + 0.05}>{line[0]}</RevealWord>
                  <RevealWord delay={0.05 + li * 0.12 + 0.18}> {line[1]}</RevealWord>
                </span>
              ))}            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6, ease: EASE }}
              className="text-muted-foreground text-lg leading-relaxed max-w-xl mt-6"
            >
              Product &amp; UX designer with 4+ years of experience. I lead UX decisions —
              research, flows, wireframes, interaction models — and ship interfaces for
              mobile, web, and app. Currently designing for fintech and consumer products.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.68, duration: 0.6, ease: EASE }}
              className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 mt-8"
            >
              <button
                type="button"
                onClick={() => onCtaClick("work")}
                className="btn btn-primary"
              >
                See my work
                <ArrowDown size={14} />
              </button>
              <a href="/CV.pdf" download className="btn btn-secondary">
                <Download size={15} />
                Download CV
              </a>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill border border-border bg-card/60">
                <span className="live-dot" />
                <span className="text-xs font-medium text-foreground">
                  Available · Open to new opportunities
                </span>
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6, ease: EASE }}
              className="grid grid-cols-2 gap-x-6 gap-y-6 mt-12 pt-8 border-t border-border sm:grid-cols-4"
            >
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display font-bold text-2xl text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground leading-snug">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: EASE }}
            className="relative hidden sm:flex justify-center lg:justify-end"
          >
            <motion.div style={{ y: artY, opacity: artOpacity }} className="w-full max-w-[480px]">
              <div className="relative py-8">
                <div
                  className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[70%] rounded-full blur-3xl opacity-60"
                  style={{ background: "radial-gradient(closest-side, rgba(232,255,71,0.35), transparent)" }}
                />
                <BankingArt />
                <p className="mt-6 text-center text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  Youth Mobile Banking Redesign — concept
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function SkillMarquee() {
  const items = [...skillMarquee, ...skillMarquee];
  return (
    <div
      className="bg-primary text-secondary border-y border-border overflow-hidden"
      aria-hidden
    >
      <div className="marquee-container py-3">
        <div className="marquee-track items-center">
          {items.map((skill, i) => (
            <span key={`${skill}-${i}`} className="flex items-center gap-6 whitespace-nowrap">
              <span className="text-sm font-medium tracking-wide opacity-90">{skill}</span>
              <span className="text-accent text-xs">◆</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
