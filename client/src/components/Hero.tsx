import { motion } from "framer-motion";
import {
  ArrowDown,
  BadgeCheck,
  LockKeyhole,
  MessageCircle,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { CONTACT } from "@/lib/site";
import { liveStudies } from "@/data/projects";
import ProjectCarousel from "@/components/ProjectCarousel";

interface HeroProps {
  onCtaClick: (id: string) => void;
}

const principles = [
  {
    icon: LockKeyhole,
    title: "Security, made human",
    note: "Lotts · systems & IP",
  },
  {
    icon: Sparkles,
    title: "Ideas people remember",
    note: "Education · storytelling",
  },
  {
    icon: TrendingUp,
    title: "Attention that moves",
    note: "Marketing · growth",
  },
];

export default function Hero({ onCtaClick }: HeroProps) {
  return (
    <section id="home" className="hero relative overflow-hidden bg-background">
      <div
        className="hero-grid absolute inset-0 pointer-events-none opacity-50"
        aria-hidden
      />
      <div
        className="hero-spotlight absolute inset-0 pointer-events-none"
        aria-hidden
      />

      <div className="container relative pt-28 pb-12 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
          <div className="relative z-10 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="glass-surface mb-7 inline-flex items-center gap-2.5 px-3 py-2 text-[0.7rem] font-mono uppercase tracking-[0.13em] text-muted-foreground shadow-sm"
            >
              <span className="live-dot" aria-hidden />
              Nairobi, Kenya <span className="text-border">/</span> Building
              Lotts
            </motion.div>

            <motion.h1
              className="font-display text-foreground text-[clamp(3.4rem,8vw,6.7rem)] font-semibold leading-[0.9] tracking-[-0.065em]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
            >
              Mike
              <br />
              <span className="text-muted-foreground">Waitindi</span>
              <span className="text-accent">.</span>
            </motion.h1>

            <motion.div
              className="mt-7 flex items-start gap-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
            >
              <span
                className="mt-1 h-12 w-[3px] shrink-0 bg-accent"
                aria-hidden
              />
              <p className="max-w-lg text-[1.04rem] leading-[1.75] text-muted-foreground sm:text-[1.13rem]">
                I make cybersecurity easier to understand, build useful digital
                products, and help good ideas find their audience.
              </p>
            </motion.div>

            <motion.div
              className="mt-8 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
            >
              <button
                type="button"
                onClick={() => onCtaClick("work")}
                className="btn btn-primary gap-2"
              >
                Explore my work <ArrowDown size={14} />
              </button>
              <a href={CONTACT.emailHref} className="btn btn-secondary">
                Let’s talk
              </a>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 px-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <MessageCircle size={15} /> WhatsApp
              </a>
            </motion.div>

            <motion.div
              className="mt-11 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-5 text-xs text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.25 }}
            >
              <span className="inline-flex items-center gap-2">
                <BadgeCheck size={14} className="text-accent" /> Founder, Lotts
              </span>
              <span
                className="hidden h-1 w-1 rounded-full bg-border sm:block"
                aria-hidden
              />
              <span>Cybersecurity · Product · Growth</span>
            </motion.div>
          </div>

          <ProjectCarousel projects={liveStudies} variant="hero" />
        </div>

        <div className="mt-16 grid border-y border-border sm:mt-20 sm:grid-cols-3">
          {principles.map(({ icon: Icon, title, note }, index) => (
            <div
              key={title}
              className={`flex items-center gap-4 py-5 sm:px-5 ${index > 0 ? "border-t border-border sm:border-l sm:border-t-0" : ""} ${index === 0 ? "sm:pl-0" : ""}`}
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center border border-border bg-card text-accent">
                <Icon size={17} />
              </span>
              <div>
                <p className="font-display text-[0.95rem] font-semibold text-foreground">
                  {title}
                </p>
                <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-muted-foreground">
                  {note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
