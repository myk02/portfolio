import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  LockKeyhole,
  MessageCircle,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { CONTACT } from "@/lib/site";
import { projects } from "@/data/projects";

interface HeroProps {
  onCtaClick: (id: string) => void;
}

const principles = [
  { icon: LockKeyhole, title: "Security, made human", note: "Lotts · systems & IP" },
  { icon: Sparkles, title: "Ideas people remember", note: "Education · storytelling" },
  { icon: TrendingUp, title: "Attention that moves", note: "Marketing · growth" },
];

export default function Hero({ onCtaClick }: HeroProps) {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const activeProject = projects[activeProjectIndex];
  const projectHref = activeProject.liveUrl ?? activeProject.repoUrl ?? "#work";
  const projectDestination = activeProject.liveUrl ? "live demo" : "source repository";
  const projectHost = projectHref.startsWith("http")
    ? new URL(projectHref).host
    : "Portfolio project";
  const projectNumber = String(activeProjectIndex + 1).padStart(2, "0");
  const projectTotal = String(projects.length).padStart(2, "0");

  const showProject = (direction: -1 | 1) => {
    setActiveProjectIndex(index => (index + direction + projects.length) % projects.length);
  };

  return (
    <section id="home" className="hero relative overflow-hidden bg-background">
      <div className="hero-grid absolute inset-0 pointer-events-none opacity-50" aria-hidden />
      <div className="hero-spotlight absolute inset-0 pointer-events-none" aria-hidden />

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
              Nairobi, Kenya <span className="text-border">/</span> Building Lotts
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
              <span className="mt-1 h-12 w-[3px] shrink-0 bg-accent" aria-hidden />
              <p className="max-w-lg text-[1.04rem] leading-[1.75] text-muted-foreground sm:text-[1.13rem]">
                I make cybersecurity easier to understand, build useful digital products, and help good ideas find their audience.
              </p>
            </motion.div>

            <motion.div
              className="mt-8 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
            >
              <button type="button" onClick={() => onCtaClick("work")} className="btn btn-primary gap-2">
                Explore my work <ArrowDown size={14} />
              </button>
              <a href={CONTACT.emailHref} className="btn btn-secondary">Let’s talk</a>
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
              <span className="inline-flex items-center gap-2"><BadgeCheck size={14} className="text-accent" /> Founder, Lotts</span>
              <span className="hidden h-1 w-1 rounded-full bg-border sm:block" aria-hidden />
              <span>Cybersecurity · Product · Growth</span>
            </motion.div>
          </div>

          <motion.div
            className="hero-showcase relative mx-auto w-full max-w-[39rem] lg:ml-auto"
            initial={{ opacity: 0, y: 22, rotate: 1 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hero-preview group relative block overflow-hidden border border-border bg-card shadow-[0_28px_80px_-35px_rgba(0,0,0,0.5)]">
              <div className="flex h-10 items-center gap-2 border-b border-border bg-card px-3.5">
                <span className="h-2 w-2 rounded-full bg-[#f07d64]" aria-hidden />
                <span className="h-2 w-2 rounded-full bg-[#e7b85b]" aria-hidden />
                <span className="h-2 w-2 rounded-full bg-[#74ba85]" aria-hidden />
                <a
                  href={projectHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${activeProject.name} ${projectDestination} in a new tab`}
                  className="ml-3 min-w-0 flex-1 truncate border border-border/70 bg-background/70 px-3 py-1 font-mono text-[9px] text-muted-foreground"
                >
                  {projectHost}
                </a>
                <span className="shrink-0 font-mono text-[9px] text-muted-foreground" aria-live="polite">
                  {projectNumber}<span className="mx-1 text-border">/</span>{projectTotal}
                </span>
                <button
                  type="button"
                  onClick={() => showProject(-1)}
                  aria-label={`Previous project: ${projects[(activeProjectIndex - 1 + projects.length) % projects.length].name}`}
                  className="hero-project-control"
                >
                  <ChevronLeft size={15} aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => showProject(1)}
                  aria-label={`Next project: ${projects[(activeProjectIndex + 1) % projects.length].name}`}
                  className="hero-project-control hero-project-control-next"
                >
                  <span>Next</span><ChevronRight size={14} aria-hidden />
                </button>
              </div>
              <a
                href={projectHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${activeProject.name} ${projectDestination} in a new tab`}
                className="relative block"
              >
                <div className="relative aspect-[1.18/1] overflow-hidden bg-secondary sm:aspect-[1.3/1]">
                  <motion.img
                    key={activeProject.slug}
                    src={activeProject.hero.src}
                    alt={activeProject.hero.alt}
                    fetchPriority={activeProjectIndex === 0 ? "high" : "auto"}
                    decoding="async"
                    initial={{ opacity: 0, scale: 1.025 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute inset-0 h-full w-full object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-[1.025] sm:p-4"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" aria-hidden />
                  <motion.div
                    key={`${activeProject.slug}-caption`}
                    aria-live="polite"
                    className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-5 sm:p-7"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: 0.08 }}
                  >
                    <div>
                      <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.17em] text-white/70">{activeProject.role}</p>
                      <h2 className="font-display text-2xl font-medium tracking-tight text-white sm:text-3xl">{activeProject.name}</h2>
                      <p className="mt-1 line-clamp-2 text-xs text-white/75 sm:text-sm">{activeProject.tagline}</p>
                    </div>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                      <ArrowUpRight size={16} />
                    </span>
                  </motion.div>
                </div>
              </a>
            </div>
            <div className="mt-3 flex items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground sm:text-[10px]">
              <span className="truncate">{activeProject.outcomeTitle}</span>
              <span className="inline-flex shrink-0 items-center gap-1.5"><span className="live-dot" aria-hidden /> {activeProject.liveUrl ? "Live demo" : "Source code"}</span>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 grid border-y border-border sm:mt-20 sm:grid-cols-3">
          {principles.map(({ icon: Icon, title, note }, index) => (
            <div key={title} className={`flex items-center gap-4 py-5 sm:px-5 ${index > 0 ? "border-t border-border sm:border-l sm:border-t-0" : ""} ${index === 0 ? "sm:pl-0" : ""}`}>
              <span className="grid h-10 w-10 shrink-0 place-items-center border border-border bg-card text-accent"><Icon size={17} /></span>
              <div>
                <p className="font-display text-[0.95rem] font-semibold text-foreground">{title}</p>
                <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-muted-foreground">{note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
