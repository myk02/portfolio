import { ExternalLink, Github } from "lucide-react";
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
    <Surface className="group relative h-full flex flex-col overflow-hidden transition-all duration-200 hover:border-foreground/20 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_rgba(10,10,10,0.08)]">
      <div
        className="absolute top-0 left-0 right-0 h-[3px] bg-accent opacity-0 group-hover:opacity-100 transition-opacity"
        aria-hidden
      />
      <a
        href={study.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative aspect-[16/10] overflow-hidden bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
        aria-label={`${study.name} — open demo (opens in a new tab)`}
      >
        <img
          src={study.tileShot}
          alt={study.tileShotAlt}
          loading={index === 0 ? "eager" : "lazy"}
          fetchPriority={index === 0 ? "high" : "auto"}
          decoding="async"
          className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <StatusBadge />
        </div>
      </a>
        <div className="p-4 space-y-2 flex flex-col flex-1">
        <div className="flex items-start gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold tracking-widest px-1.5 py-1 bg-foreground text-background">
              0{index + 1}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              {study.timeline}
            </span>
          </div>
        </div>

        <h3 className="font-display font-semibold text-[1.05rem] text-foreground leading-[1.2] tracking-[-0.015em]">
          {study.name}
        </h3>
        <p className="text-[0.8125rem] text-muted-foreground leading-relaxed line-clamp-2">
          {study.outcomeTitle}
        </p>

        <div className="flex flex-wrap gap-1.5">
          <ChipAccent>{study.tileBadge}</ChipAccent>
          <Chip>{study.role}</Chip>
        </div>

        <div className="pt-2.5 mt-auto border-t border-border flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[0.8125rem] font-medium">
          {study.liveUrl && (
            <a
              href={study.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-foreground underline-offset-4 hover:underline"
            >
              <ExternalLink size={13} aria-hidden />
              Open demo
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
      {studies.map((study, i) => (
        <Reveal key={study.slug} delay={i} className="h-full">
          <ProjectCard study={study} index={i} />
        </Reveal>
      ))}
    </div>
  );
}
