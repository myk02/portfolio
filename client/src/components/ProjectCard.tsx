import { ArrowUpRight, Code2, Download, ExternalLink, Github } from "lucide-react";
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
    <Surface className="group relative h-full flex flex-col overflow-hidden transition-all duration-300 hover:border-foreground/25 hover:-translate-y-1 hover:shadow-[0_16px_32px_-16px_rgba(0,0,0,0.14)]">
      <div
        className="absolute top-0 left-0 right-0 h-[3px] bg-accent opacity-0 group-hover:opacity-100 transition-opacity z-10"
        aria-hidden
      />
      {study.tileShot &&
        (study.liveUrl ? (
          <a
            href={study.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative aspect-[16/10] overflow-hidden bg-muted border-b border-border/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            aria-label={`${study.name} — open demo (opens in a new tab)`}
          >
            {tile}
            <span
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden
            />
            <span
              className="pointer-events-none absolute bottom-3 left-3 inline-flex translate-y-1 items-center gap-1.5 border border-foreground/10 bg-accent px-2.5 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-accent-foreground opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
              aria-hidden
            >
              Open demo <ArrowUpRight size={11} />
            </span>
          </a>
        ) : (
          <div className="relative aspect-[16/10] overflow-hidden bg-muted border-b border-border/80">
            {tile}
          </div>
        ))}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 bg-secondary text-foreground/80 border border-border">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden />
            {study.tileBadge}
          </span>
          <span className="font-mono text-[11px] text-muted-foreground">
            {study.year}
          </span>
        </div>
        <h3 className="font-display font-semibold text-[1.05rem] text-foreground leading-[1.2] tracking-[-0.015em] group-hover:text-foreground">
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
              className="inline-flex items-center gap-1.5 text-[0.82rem] font-medium text-foreground decoration-accent decoration-2 underline-offset-4 hover:underline"
            >
              {link.label} <link.Icon size={13} aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
          Experiments and prototypes not in the grid.
        </p>
      </div>
      <div className="mt-1 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
        <a
          href={CONTACT.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[0.82rem] font-medium text-foreground underline-offset-4 hover:underline"
        >
          Browse GitHub <ArrowUpRight size={13} aria-hidden />
        </a>
        <a
          href="/CV.pdf"
          download
          className="inline-flex items-center gap-1.5 text-[0.82rem] font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          Download CV <Download size={13} aria-hidden />
        </a>
      </div>
    </Surface>
  );
}

export function ProjectCardGrid({ studies }: { studies: Project[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
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
