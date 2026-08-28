import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import {
  PhoneMockup,
  TabletMockup,
  DesktopMockup,
} from "@/components/artifacts/DeviceMockups";
import { CountUp } from "@/components/CountUp";
import BuyMeCoffee from "@/components/BuyMeCoffee";
import { heroStats, roleLine, heroHeadline } from "@/data/siteContent";

interface BrandEdgeHeroProps {
  onCtaClick: (id: string) => void;
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function HeroVisual() {
  return (
    <div className="w-full">
      {/* editorial card - border only, no rounded for brutalist but soft inner for devices */}
      <div className="border border-border bg-card overflow-hidden">
        {/* top bar */}
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-border bg-secondary/60">
          <div className="flex items-center gap-2">
            <span className="live-dot" aria-hidden />
            <span className="text-[10px] font-mono uppercase tracking-widest text-foreground font-medium">
              Featured — KenyaTrace · Live on Vercel
            </span>
          </div>
          <span className="hidden sm:inline-flex text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            2024 · Mobile-first
          </span>
        </div>

        <div className="p-4 sm:p-5 md:p-6 bg-card">
          <div className="relative w-full max-w-[460px] aspect-[4/2.9] mx-auto">
            <DesktopMockup
              content={{
                src: "/shots/kenyatrace/home-cards-desktop.jpg",
                alt: "KenyaTrace destination browsing on desktop",
              }}
              label={undefined}
              showStand={false}
              className="w-full"
              figureClassName="absolute left-1/2 top-0 -translate-x-1/2 w-[66%] z-0"
            />
            <TabletMockup
              content={{
                src: "/shots/kenyatrace/home-tablet.jpg",
                alt: "KenyaTrace home on tablet",
              }}
              label={undefined}
              className="w-full"
              figureClassName="absolute right-[2%] bottom-0 w-[38%] z-20 rotate-[1.5deg]"
            />
            <PhoneMockup
              content={{
                src: "/shots/kenyatrace/home-mobile.jpg",
                alt: "KenyaTrace home on mobile",
              }}
              label={undefined}
              className="w-full"
              figureClassName="absolute left-[2%] bottom-0 w-[30%] z-30 -rotate-[2deg]"
            />
            <div
              aria-hidden
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[88%] h-4 rounded-full bg-foreground/10 blur-md"
            />
          </div>
        </div>

        {/* caption bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-t border-border bg-secondary/40">
          <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
            One build · every viewport · holds on 3G
          </p>
          <a
            href="https://kenyatrace.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-medium text-foreground hover:text-accent transition-colors"
          >
            Open live site <ArrowUpRight size={12} />
          </a>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { k: "Stack", v: "React 19 · TypeScript" },
          { k: "Tested", v: "10+ Playwright" },
          { k: "Access", v: "WCAG AA" },
        ].map((chip) => (
          <div key={chip.k} className="border border-border bg-card px-2.5 py-2 text-center">
            <p className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
              {chip.k}
            </p>
            <p className="text-[11px] font-medium text-foreground leading-tight mt-0.5">
              {chip.v}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BrandEdgeHero({ onCtaClick }: BrandEdgeHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const artY = useTransform(scrollYProgress, [0, 1], [0, 24]);

  // split headline to highlight "reliable" — high-contrast dark-on-lime in both themes
  const headlineParts = heroHeadline.split("reliable");
  const renderHeadline = () => {
    if (headlineParts.length === 2) {
      return (
        <>
          {headlineParts[0]}
          <span className="relative inline-block">
            <span className="relative z-10 px-1.5 py-0.5 bg-accent text-[#141310] dark:text-[#0a0a0a] font-black">
              reliable
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
      ref={sectionRef}
      id="home"
      className="relative bg-secondary flex items-center overflow-hidden border-b border-border"
      style={{ minHeight: "calc(100dvh - 0px)", paddingTop: "4rem" }}
    >
      {/* subtle editorial wash — single layer, no grid duplication */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] dark:opacity-[0.08]"
        style={{
          background: `radial-gradient(ellipse 60% 45% at 82% 18%, rgba(232,255,71,0.12), transparent 58%)`,
        }}
      />

      <div className="relative z-10 w-full px-4 sm:px-6 py-10 md:py-14 lg:py-16">
        <div className="max-w-[1160px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-10 lg:gap-10 xl:gap-14 items-center">
            <div className="order-1 min-w-0">
              <div className="mb-6 flex items-center gap-3 hero-kicker">
                <span className="w-2.5 h-2.5 bg-accent shrink-0" />
                <p className="text-mono text-muted-foreground dark:text-white/70 text-[11px] sm:text-xs tracking-[0.14em]">
                  {roleLine}
                </p>
              </div>

              <h1
                className="heading-serif font-black tracking-tight max-w-[560px] text-[#0a0a0a] dark:text-white dark:drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)]"
                style={{
                  fontSize: "clamp(2.15rem, 5.2vw, 3.4rem)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.03em",
                }}
              >
                {renderHeadline()}
              </h1>

              {/* availability */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.5, ease: EASE }}
                className="mt-6 flex flex-wrap items-center gap-3"
              >
                <span className="inline-flex items-center gap-2 px-3 py-2 border border-border bg-card">
                  <span className="live-dot" />
                  <span className="text-xs font-medium text-foreground whitespace-nowrap">
                    Available for work
                  </span>
                  <span className="hidden sm:inline text-xs text-muted-foreground">· Replies within 24h</span>
                </span>
                <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground dark:text-white/70">
                  Nairobi · Remote
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5, ease: EASE }}
                className="flex flex-wrap items-center gap-3 mt-7"
              >
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
                <BuyMeCoffee
                  buttonClassName="bg-accent text-accent-foreground border-2 border-foreground shadow-[3px_3px_0_0_var(--foreground)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_var(--foreground)] active:translate-y-0 active:shadow-[2px_2px_0_0_var(--foreground)] transition-all text-sm px-4 py-2.5 font-semibold"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5, ease: EASE }}
                className="grid grid-cols-3 gap-4 mt-10 pt-6 border-t border-white/10 dark:border-white/15 max-w-[520px]"
              >
                {heroStats.map((stat) => (
                  <div key={stat.label} className="min-w-0 border-l-2 border-accent pl-3">
                    <div className="font-display font-black text-[1.45rem] md:text-[1.6rem] text-[#0a0a0a] dark:text-white leading-none whitespace-nowrap">
                      <CountUp value={stat.value} />
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground dark:text-white/65 leading-snug mt-1.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.55, ease: EASE }}
              className="order-2 w-full max-w-[520px] mx-auto lg:max-w-none lg:mx-0"
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
