import { ArrowUpRight, Code2, ExternalLink, Github } from "lucide-react";
import type { Project } from "@/data/projects";
import { CONTACT } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { Surface } from "@/components/ui/section";

export default function ProjectCard({
  study,
  index,
}: {
  study: Project;
  index: number;
}) {
  const tile = (
    <img
      src={study.tileShot}
      alt={study.tileShotAlt}
      loading={index === 0 ? "eager" : "lazy"}
      fetchPriority={index === 0 ? "high" : "auto"}
      decoding="async"
      className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
    />
  );

  const link = study.liveUrl
    ? { href: study.liveUrl, label: "Visit site", Icon: ExternalLink }
    : study.repoUrl
      ? { href: study.repoUrl, label: "View code", Icon: Code2 }
      : null;

  return (
    <Surface className="group relative h-full flex flex-col overflow-hidden transition-all duration-200 hover:border-foreground/20 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_rgba(10,10,10,0.08)]">
      <div
        className="absolute top-0 left-0 right-0 h-[3px] bg-accent opacity-0 group-hover:opacity-100 transition-opacity"
        aria-hidden
      />
      {study.tileShot &&
        (study.liveUrl ? (
          <a
            href={study.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative aspect-[16/10] overflow-hidden bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            aria-label={`${study.name} — open demo (opens in a new tab)`}
          >
            {tile}
          </a>
        ) : (
          <div className="relative aspect-[16/10] overflow-hidden bg-muted">
            {tile}
          </div>
        ))}
      <div className="p-4.5 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 bg-secondary text-foreground/80 border border-border">
            {study.tileBadge}
          </span>
          <span className="font-mono text-[11px] text-muted-foreground">
            {study.year}
          </span>
        </div>
        <h3 className="font-display font-semibold text-[1.05rem] text-foreground leading-[1.2] tracking-[-0.015em]">
          {study.name}
        </h3>
        <p className="mt-1.5 text-[0.85rem] text-muted-foreground leading-relaxed">
          {study.outcomeTitle}
        </p>

        {study.stack && study.stack.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {study.stack.map(tech => (
              <span
                key={tech}
                className="font-mono text-[10px] text-muted-foreground/80 bg-secondary/60 px-1.5 py-0.5 border border-border/50"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {link && (
          <div className="pt-3.5 mt-auto border-t border-border">
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[0.82rem] font-medium text-foreground underline-offset-4 hover:underline"
            >
              {link.label} <link.Icon size={13} aria-hidden />
            </a>
          </div>
        )}
      </div>
    </Surface>
  );
}

/** Fills a partial final row with a route to the rest of the work. */
function GitHubTile() {
  return (
    <Surface className="group relative flex h-full min-h-56 flex-col items-center justify-center gap-3 border-dashed p-6 text-center transition-colors hover:border-foreground/30 hover:bg-card/60">
      <span
        className="grid h-11 w-11 place-items-center border border-border text-foreground transition-colors group-hover:border-foreground/30"
        aria-hidden
      >
        <Github size={18} />
      </span>
      <div>
        <p className="font-display font-semibold text-[1.05rem] leading-[1.2] tracking-[-0.015em] text-foreground">
          More repositories
        </p>
        <p className="mx-auto mt-1.5 max-w-[24ch] text-[0.85rem] leading-relaxed text-muted-foreground">
          Experiments, scripts and prototypes that have not made it into the grid.
        </p>
      </div>
      <a
        href={CONTACT.github}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 inline-flex items-center gap-1.5 text-[0.82rem] font-medium text-foreground underline-offset-4 hover:underline"
      >
        Browse GitHub <ArrowUpRight size={13} aria-hidden />
      </a>
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
      {studies.length % 3 !== 0 && (
        <Reveal delay={studies.length % 3} className="h-full">
          <GitHubTile />
        </Reveal>
      )}
    </div>
  );
}
