import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { Link } from "wouter";
import type { Project } from "@/data/projects";
import { Reveal } from "@/components/Reveal";
import { Chip, ChipAccent } from "@/components/ui/kicker";
import { Surface } from "@/components/ui/section";
import StatusBadge from "@/components/engineering/StatusBadge";

export default function ProjectCard({
  study,
  index,
}: {
  study: Project;
  index: number;
}) {
  return (
    <Surface className="group relative h-full flex flex-col overflow-hidden transition-colors duration-200 hover:border-foreground/20">
      <div
        className="absolute top-0 left-0 right-0 h-[3px] bg-accent opacity-0 group-hover:opacity-100 transition-opacity"
        aria-hidden
      />
      <Link
        href={`/work/${study.slug}`}
        className="block relative aspect-[16/9.2] overflow-hidden bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
        aria-label={`${study.name} — case study`}
      >
        <img
          src={study.tileShot}
          alt={study.tileShotAlt}
          loading={index === 0 ? "eager" : "lazy"}
          fetchPriority={index === 0 ? "high" : "auto"}
          decoding="async"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <StatusBadge />
          <span className="px-2 py-1 text-[11px] font-mono tracking-widest uppercase bg-background/90 backdrop-blur border border-border text-foreground">
            {study.year}
          </span>
        </div>
      </Link>
      <div className="p-5 sm:p-6 space-y-3 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold tracking-widest px-1.5 py-1 bg-foreground text-background">
              0{index + 1}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              {study.timeline} · {study.year}
            </span>
          </div>
          <span className="hidden sm:inline-flex text-[10px] font-mono uppercase tracking-widest px-2 py-1 border border-border bg-card text-muted-foreground">
            {study.stack[0]}
          </span>
        </div>

        <h3 className="font-display font-black text-[19px] sm:text-[21px] text-foreground leading-none tracking-tight">
          {study.name}
        </h3>
        <p className="text-sm text-muted-foreground leading-snug line-clamp-2">
          {study.outcomeTitle}
        </p>

        <div className="flex flex-wrap gap-1.5">
          <ChipAccent>{study.tileBadge}</ChipAccent>
          <Chip>{study.role}</Chip>
        </div>

        <div className="pt-3 mt-auto border-t border-border flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium">
          <Link
            href={`/work/${study.slug}`}
            className="inline-flex items-center gap-1.5 text-foreground underline-offset-4 hover:underline"
          >
            Case study
            <ArrowUpRight size={14} aria-hidden />
          </Link>
          {study.liveUrl && (
            <a
              href={study.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
            >
              <ExternalLink size={13} aria-hidden />
              Live site
            </a>
          )}
          {study.repoUrl && (
            <a
              href={study.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
            >
              <Github size={13} aria-hidden />
              Source
            </a>
          )}
        </div>
      </div>
    </Surface>
  );
}

export function ProjectCardGrid({ studies }: { studies: Project[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
      {studies.map((study, i) => (
        <Reveal key={study.slug} delay={i} className="h-full">
          <ProjectCard study={study} index={i} />
        </Reveal>
      ))}
    </div>
  );
}
