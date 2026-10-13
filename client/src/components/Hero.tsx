import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { heroSubline, heroTitle } from "@/data/siteContent";
import { CONTACT } from "@/lib/site";
import BuyMeCoffee from "@/components/BuyMeCoffee";

interface HeroProps {
  onCtaClick: (id: string) => void;
}

/** Name, two headline roles, everything else in one mono line. No filler. */
export default function Hero({ onCtaClick }: HeroProps) {
  return (
    <section id="home" className="relative bg-secondary border-b border-border">
      <div
        className="hero-grid absolute inset-0 pointer-events-none"
        aria-hidden
      />
      <div className="container relative py-10 md:py-14">
        <div className="max-w-2xl mx-auto text-center">
          <motion.p
            className="section-label justify-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-label-line" /> Mike Waitindi — Nairobi
          </motion.p>
          <motion.h1
            className="heading-hero text-foreground"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.06 }}
          >
            {heroTitle}
          </motion.h1>
          <motion.p
            className="mt-3 text-[0.95rem] text-muted-foreground leading-relaxed"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
          >
            {heroSubline}
          </motion.p>
          <motion.p
            className="mt-4 text-[10px] font-mono uppercase tracking-widest text-muted-foreground/80"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            QA Engineer · ICT Officer · AI Automation · Full-Stack
          </motion.p>
          <motion.div
            className="mt-7 flex flex-wrap justify-center items-center gap-2.5"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
          >
            <button
              type="button"
              onClick={() => onCtaClick("work")}
              className="btn btn-primary gap-2"
            >
              View live work <ArrowDown size={14} />
            </button>
            <a href={CONTACT.emailHref} className="btn btn-secondary gap-2">
              Work with me <ArrowUpRight size={14} />
            </a>
            <BuyMeCoffee />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
