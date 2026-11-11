import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { CONTACT } from "@/lib/site";
import BuyMeCoffee from "@/components/BuyMeCoffee";

interface HeroProps {
  onCtaClick: (id: string) => void;
}

/** Name, clean tagline, compact CTA row. Punchy. */
export default function Hero({ onCtaClick }: HeroProps) {
  return (
    <section id="home" className="relative bg-secondary border-b border-border">
      <div
        className="hero-grid absolute inset-0 pointer-events-none"
        aria-hidden
      />
      <div className="container relative pt-12 pb-14 md:pt-16 md:pb-20">
        <div className="max-w-xl mx-auto text-center">
          <motion.p
            className="section-label justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="section-label-line" />
            Nairobi County, Kenya
          </motion.p>

          <motion.h1
            className="font-display font-medium text-foreground tracking-tight text-3xl sm:text-4xl md:text-[2.6rem] leading-[1.15]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            Mike Waitindi
          </motion.h1>

          <motion.p
            className="mt-2 text-xs sm:text-sm font-mono uppercase tracking-widest text-accent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            AI Automation · Payments Integration · Marketing · Software Testing
          </motion.p>

          <motion.p
            className="mt-3.5 text-[0.92rem] text-muted-foreground leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Mike — Founder & Software Developer. Building AI automations and
            payment flows.
          </motion.p>

          <motion.div
            className="mt-7 flex flex-wrap justify-center items-center gap-2.5"
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
            <BuyMeCoffee buttonClassName="gap-2" />
            <a href={CONTACT.emailHref} className="btn btn-secondary gap-2">
              Contact
            </a>
          </motion.div>

          {/* Compact 3-fact summary */}
          <motion.div
            className="mt-9 pt-6 border-t border-border flex flex-wrap justify-center gap-x-8 gap-y-2.5 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            {[
                { value: "AI with Mike", sub: "TikTok channel I run" },
              { value: "Cyber Course", sub: "Beginner to Expert" },
              { value: "AI + FinTech", sub: "Automations & Payments" },
            ].map(item => (
              <div key={item.value}>
                <div className="text-[0.82rem] font-display font-semibold text-foreground">
                  {item.value}
                </div>
                <div className="text-[0.68rem] font-mono uppercase tracking-wider text-muted-foreground mt-0.5">
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
