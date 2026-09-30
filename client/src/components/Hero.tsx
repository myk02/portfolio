import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { heroTagline } from "@/data/siteContent";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, delay },
  },
});
import { CONTACT } from "@/lib/site";
import { liveStudies } from "@/data/projects";
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
      <div className="relative z-10 w-full py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-12 items-center max-w-5xl mx-auto">
            <div className="order-1 min-w-0 text-center mx-auto max-w-[32rem] lg:max-w-none">
              <motion.h1
                className="font-display font-semibold text-2xl sm:text-3xl text-foreground tracking-tight"
                {...fadeUp(0)}
              >
                Mike Waitindi
              </motion.h1>

              <motion.p
                className="mt-3 font-display font-medium text-lg sm:text-xl text-foreground/90 leading-snug text-balance max-w-[28rem] mx-auto"
                {...fadeUp(0.1)}
              >
                {heroTagline}
              </motion.p>

              <motion.p
                className="mt-3 text-[0.8125rem] text-muted-foreground leading-relaxed max-w-[28rem] mx-auto"
                {...fadeUp(0.18)}
              >
                Nairobi · Onsite or remote
              </motion.p>

              <motion.div
                className="mt-5 flex flex-wrap items-center justify-center gap-2.5"
                {...fadeUp(0.26)}
              >
                <Surface className="inline-flex items-center gap-2 px-2.5 py-1.5">
                  <span className="live-dot" />
                  <span className="text-[11px] font-medium text-foreground whitespace-nowrap">
                    Available for work
                  </span>
                </Surface>
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  {CONTACT.location}
                </span>
              </motion.div>

              <motion.div
                className="flex flex-wrap items-center justify-center gap-2.5 mt-8"
                {...fadeUp(0.34)}
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
                <BuyMeCoffee />
              </motion.div>
            </div>

            <motion.div
              className="order-2 w-full max-w-[28rem] mx-auto"
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.9, ease: EASE, delay: 0.3 },
              }}
            >
              <HeroVisual />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
