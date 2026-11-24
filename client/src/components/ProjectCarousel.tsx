import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Code2,
  ExternalLink,
} from "lucide-react";
import type { Project } from "@/data/projects";

export default function ProjectCarousel({
  projects,
  variant = "hero",
}: {
  projects: Project[];
  variant?: "hero" | "work";
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projects[activeIndex];

  if (!activeProject) return null;

  const previousProject =
    projects[(activeIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(activeIndex + 1) % projects.length];
  const projectHref = activeProject.liveUrl ?? activeProject.repoUrl ?? "#work";
  const projectDestination = activeProject.liveUrl
    ? "live demo"
    : "source repository";
  const projectHost = projectHref.startsWith("http")
    ? new URL(projectHref).host
    : "Portfolio project";
  const projectNumber = String(activeIndex + 1).padStart(2, "0");
  const projectTotal = String(projects.length).padStart(2, "0");
  const projectLink = activeProject.liveUrl
    ? { label: "Visit site", Icon: ExternalLink }
    : { label: "View source", Icon: Code2 };

  const showProject = (direction: -1 | 1) => {
    setActiveIndex(
      index => (index + direction + projects.length) % projects.length
    );
  };

  return (
    <motion.div
      className={`hero-showcase relative mx-auto w-full ${variant === "hero" ? "max-w-[39rem] lg:ml-auto" : "max-w-5xl"}`}
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
          <span
            className="shrink-0 font-mono text-[9px] text-muted-foreground"
            aria-live="polite"
          >
            {projectNumber}
            <span className="mx-1 text-border">/</span>
            {projectTotal}
          </span>
          <button
            type="button"
            onClick={() => showProject(-1)}
            aria-label={`Previous project: ${previousProject.name}`}
            className="hero-project-control"
          >
            <ChevronLeft size={15} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => showProject(1)}
            aria-label={`Next project: ${nextProject.name}`}
            className="hero-project-control hero-project-control-next"
          >
            <span>Next</span>
            <ChevronRight size={14} aria-hidden />
          </button>
        </div>

        <a
          href={projectHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${activeProject.name} ${projectDestination} in a new tab`}
          className="relative block"
        >
          <div
            className={`relative overflow-hidden bg-secondary ${variant === "hero" ? "aspect-[1.18/1] sm:aspect-[1.3/1]" : "aspect-[16/10] sm:aspect-[16/9]"}`}
          >
            <motion.img
              key={activeProject.slug}
              src={activeProject.hero.src}
              alt={activeProject.hero.alt}
              fetchPriority={activeIndex === 0 ? "high" : "auto"}
              decoding="async"
              initial={{ opacity: 0, scale: 1.025 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute inset-0 h-full w-full object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-[1.025] sm:p-4"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent"
              aria-hidden
            />
            <motion.div
              key={`${activeProject.slug}-caption`}
              aria-live="polite"
              className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-5 sm:p-7"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.08 }}
            >
              <div>
                <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.17em] text-white/70">
                  {activeProject.role}
                </p>
                <h2 className="font-display text-2xl font-medium tracking-tight text-white sm:text-3xl">
                  {activeProject.name}
                </h2>
                <p className="mt-1 line-clamp-2 text-xs text-white/75 sm:text-sm">
                  {activeProject.tagline}
                </p>
              </div>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <ArrowUpRight size={16} aria-hidden />
              </span>
            </motion.div>
          </div>
        </a>
      </div>

      <div className="mt-3 flex items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground sm:text-[10px]">
        <span className="truncate">{activeProject.outcomeTitle}</span>
        <span className="inline-flex shrink-0 items-center gap-1.5">
          <span className="live-dot" aria-hidden />{" "}
          {activeProject.liveUrl ? "Live demo" : "Source code"}
        </span>
      </div>

      {variant === "work" && (
        <div className="mt-5 border border-border bg-card p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
              {activeProject.year} <span className="mx-1 text-border">·</span>{" "}
              {activeProject.tileBadge}
            </span>
            <a
              href={projectHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground decoration-accent decoration-2 underline-offset-4 hover:underline"
            >
              {projectLink.label} <projectLink.Icon size={14} aria-hidden />
            </a>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {activeProject.stack.map(tech => (
              <span
                key={tech}
                className="border border-border bg-secondary px-2 py-1 font-mono text-[10px] text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
