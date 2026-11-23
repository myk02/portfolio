import { motion } from "framer-motion";
import { ArrowDown, Shield, TrendingUp, Sparkles, MessageCircle } from "lucide-react";
import { CONTACT } from "@/lib/site";

interface HeroProps {
  onCtaClick: (id: string) => void;
}

/** Simplistic, humanized hero with high visual elegance. */
export default function Hero({ onCtaClick }: HeroProps) {
  return (
    <section id="home" className="relative bg-secondary/60 border-b border-border overflow-hidden">
      <div
        className="hero-grid absolute inset-0 pointer-events-none opacity-60"
        aria-hidden
      />
      <div
        className="hero-spotlight absolute inset-0 pointer-events-none"
        aria-hidden
      />
      {/* Sleek top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-accent" aria-hidden />

      <div className="container relative pt-16 pb-16 md:pt-24 md:pb-28">
        <div className="max-w-2xl mx-auto text-center">
          {/* Live status badge */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-card border border-border text-[0.75rem] font-mono text-foreground/80 shadow-xs mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Founder @ Lotts · Nairobi, Kenya</span>
          </motion.div>

          {/* Heading 1: Mike Waitindi */}
          <motion.h1
            className="font-display font-semibold text-foreground tracking-tight text-4xl sm:text-5xl md:text-[3.25rem] leading-[1.08]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            Mike Waitindi
          </motion.h1>

          {/* Title line */}
          <motion.p
            className="mt-3 text-xs sm:text-sm font-mono uppercase tracking-[0.14em] text-foreground/60"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Founder · Cybersecurity · Marketing · Sales
          </motion.p>

          {/* Warm first-person human narrative */}
          <motion.p
            className="mt-5 text-[1.02rem] sm:text-[1.08rem] text-muted-foreground leading-relaxed max-w-xl mx-auto"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            I founded <strong className="font-semibold text-foreground">Lotts</strong> to make
            cybersecurity simple — protecting systems and IP through clear content, and marketing
            tech products that sell.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            className="mt-8 flex flex-wrap justify-center items-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button
              type="button"
              onClick={() => onCtaClick("work")}
              className="btn btn-primary gap-2"
            >
              View work <ArrowDown size={14} />
            </button>
            <a
              href={CONTACT.emailHref}
              className="btn btn-secondary gap-2"
            >
              Contact
            </a>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost gap-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              <MessageCircle size={14} /> WhatsApp
            </a>
          </motion.div>

          {/* 3-Pillar summary cards */}
          <motion.div
            className="mt-12 pt-8 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.28 }}
          >
            <div className="p-4 bg-card border border-border group hover:border-foreground/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_12px_-4px_rgba(0,0,0,0.06)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-0 h-[2px] bg-accent group-hover:w-full transition-all duration-300" aria-hidden />
              <div className="flex items-center gap-2 mb-1.5">
                <Shield size={15} className="text-accent shrink-0" aria-hidden />
                <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">Lotts Brand</span>
              </div>
              <div className="text-[0.95rem] font-display font-semibold text-foreground">
                Systems &amp; IP Protection
              </div>
              <div className="text-[0.8rem] text-muted-foreground mt-1 leading-snug">
                Sensitizing users against scams &amp; breaches.
              </div>
            </div>

            <div className="p-4 bg-card border border-border group hover:border-foreground/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_12px_-4px_rgba(0,0,0,0.06)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-0 h-[2px] bg-accent group-hover:w-full transition-all duration-300" aria-hidden />
              <div className="flex items-center gap-2 mb-1.5">
                <Sparkles size={15} className="text-accent shrink-0" aria-hidden />
                <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">Awareness</span>
              </div>
              <div className="text-[0.95rem] font-display font-semibold text-foreground">
                AI with Mike Channel
              </div>
              <div className="text-[0.8rem] text-muted-foreground mt-1 leading-snug">
                Practical, visual explainers on TikTok.
              </div>
            </div>

            <div className="p-4 bg-card border border-border group hover:border-foreground/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_12px_-4px_rgba(0,0,0,0.06)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-0 h-[2px] bg-accent group-hover:w-full transition-all duration-300" aria-hidden />
              <div className="flex items-center gap-2 mb-1.5">
                <TrendingUp size={15} className="text-accent shrink-0" aria-hidden />
                <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">Growth</span>
              </div>
              <div className="text-[0.95rem] font-display font-semibold text-foreground">
                Marketing &amp; Sales
              </div>
              <div className="text-[0.8rem] text-muted-foreground mt-1 leading-snug">
                Campaigns and funnels that convert.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
