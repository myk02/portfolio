import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { heroSubline } from "@/data/siteContent";
import { CONTACT } from "@/lib/site";

interface HeroProps {
  onCtaClick: (id: string) => void;
}

const TITLES = [
  "Software Developer",
  "ICT Officer",
  "AI Engineer",
] as const;

export default function Hero({ onCtaClick }: HeroProps) {
  return (
    <section id="home" className="relative bg-secondary border-b border-border pt-16">
      <div className="container py-12 md:py-16">
        <div className="max-w-2xl mx-auto text-center">
          <motion.p
            className="section-label mb-4 justify-center"
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
            Software Developer
            <span className="block mt-1 text-[0.55em] font-medium text-muted-foreground tracking-normal">
              (Full-Stack Web App Developer) · ICT Officer · AI Engineer
            </span>
          </motion.h1>
          <motion.p
            className="mt-4 text-base text-muted-foreground leading-relaxed"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
          >
            {heroSubline}
          </motion.p>
          <motion.ul
            aria-label="Titles"
            className="mt-5 flex flex-wrap justify-center gap-2 list-none p-0"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {TITLES.map((t) => (
              <li
                key={t}
                className="text-[11px] font-mono uppercase tracking-widest border border-border bg-card px-2.5 py-1.5 text-foreground"
              >
                {t}
              </li>
            ))}
          </motion.ul>
          <motion.div
            className="mt-6 flex flex-wrap justify-center items-center gap-3"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
          >
            <button type="button" onClick={() => onCtaClick("work")} className="btn btn-primary gap-2">
              View proof <ArrowDown size={14} />
            </button>
            <a href={CONTACT.emailHref} className="btn btn-secondary gap-2">
              Get in touch <ArrowUpRight size={14} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
