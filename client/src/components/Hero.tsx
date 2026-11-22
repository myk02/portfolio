import { motion } from "framer-motion";
import { ArrowDown, Shield, TrendingUp } from "lucide-react";
import { CONTACT } from "@/lib/site";

interface HeroProps {
  onCtaClick: (id: string) => void;
}

/** Name, clean tagline, compact CTA row. Punchy. */
export default function Hero({ onCtaClick }: HeroProps) {
  return (
    <section id="home" className="relative bg-secondary border-b border-border overflow-hidden">
      <div
        className="hero-grid absolute inset-0 pointer-events-none"
        aria-hidden
      />
      {/* Accent bar top */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-accent" aria-hidden />

      <div className="container relative pt-16 pb-16 md:pt-20 md:pb-24">
        <div className="max-w-2xl mx-auto text-center">
          <motion.p
            className="section-label justify-center mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="section-label-line" />
            Nairobi County, Kenya
            <span className="section-label-line" />
          </motion.p>

          <motion.h1
            className="font-display font-semibold text-foreground tracking-tight text-4xl sm:text-5xl md:text-[3rem] leading-[1.1]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            Mike Waitindi
          </motion.h1>

          <motion.p
            className="mt-3 text-xs sm:text-sm font-mono uppercase tracking-widest text-foreground/50"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Founder · Cybersecurity · Marketing · Sales
          </motion.p>

          <motion.p
            className="mt-5 text-[1rem] text-muted-foreground leading-relaxed max-w-lg mx-auto"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Founder of{" "}
            <span className="font-semibold text-foreground">Lotts</span>. Sensitizing
            people on how to protect their systems and intellectual property through
            engaging content, and creating marketing campaigns that promote and sell
            tech products.
          </motion.p>

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
            <a href={CONTACT.emailHref} className="btn btn-secondary gap-2">
              Contact
            </a>
          </motion.div>

          {/* 3-pillar summary */}
          <motion.div
            className="mt-12 pt-8 border-t border-border grid grid-cols-3 gap-4 sm:gap-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.28 }}
          >
            {[
              { icon: Shield, value: "Lotts", sub: "Cybersecurity Brand" },
              { icon: null, value: "Systems & IP", sub: "Protection & Awareness" },
              { icon: TrendingUp, value: "Marketing & Sales", sub: "Campaigns & Growth" },
            ].map((item, i) => (
              <div key={item.value} className="flex flex-col items-center gap-1">
                {item.icon && (
                  <item.icon size={15} className="text-accent mb-0.5" aria-hidden />
                )}
                {!item.icon && <span className="h-[19px]" aria-hidden />}
                <div className="text-[0.85rem] font-display font-semibold text-foreground leading-snug">
                  {item.value}
                </div>
                <div className="text-[0.68rem] font-mono uppercase tracking-wider text-muted-foreground">
                  {item.sub}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
