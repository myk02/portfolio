import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { heroTagline, heroSubline } from "@/data/siteContent";
import { CONTACT } from "@/lib/site";
import { liveStudies } from "@/data/projects";
import BuyMeCoffee from "@/components/BuyMeCoffee";

interface HeroProps {
  onCtaClick: (id: string) => void;
}

export default function Hero({ onCtaClick }: HeroProps) {
  const featured = liveStudies[0];

  return (
    <section id="home" className="relative bg-secondary border-b border-border pt-16">
      <div className="container py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
          <div className="max-w-xl">
            <motion.p
              className="section-label mb-5"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="section-label-line" /> Software developer · Nairobi, Kenya
            </motion.p>
            <motion.h1
              className="heading-hero text-foreground max-w-[12ch]"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.06 }}
            >
              {heroTagline}
            </motion.h1>
            <motion.p
              className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
            >
              {heroSubline}
            </motion.p>
            <motion.div
              className="mt-8 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
            >
              <button type="button" onClick={() => onCtaClick("work")} className="btn btn-primary gap-2">
                View selected work <ArrowDown size={14} />
              </button>
              <a href={CONTACT.emailHref} className="btn btn-secondary gap-2">
                Get in touch <ArrowUpRight size={14} />
              </a>
              <BuyMeCoffee />
            </motion.div>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-4 text-xs text-muted-foreground">
              <span>React</span><span>TypeScript</span><span>Convex</span><span>Vercel</span>
            </div>
          </div>

          {featured && (
            <motion.a
              href={featured.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden border border-border bg-card"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-border">
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Featured project · Demo</span>
                <ArrowUpRight size={15} className="text-muted-foreground group-hover:text-foreground" />
              </div>
              <div className="aspect-[16/10] bg-muted overflow-hidden">
                <img src={featured.hero.src} alt={featured.hero.alt} fetchPriority="high" className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]" />
              </div>
              <div className="p-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-display text-lg font-semibold text-foreground">{featured.name}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{featured.outcomeTitle}</p>
                </div>
                <span className="text-xs text-muted-foreground">{featured.year}</span>
              </div>
            </motion.a>
          )}
        </div>
      </div>
    </section>
  );
}
