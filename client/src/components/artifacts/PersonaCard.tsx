import type { Persona } from "@/data/caseVisuals";

/**
 * Research persona. All cards render at equal visual weight — no staggered
 * fade, no opacity tricks, equal heights inside the grid.
 */
export function PersonaCard({ persona }: { persona: Persona }) {
  return (
    <figure className="border border-border bg-card p-4 sm:p-5 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="relative w-12 h-12 rounded-soft-sm overflow-hidden border border-foreground/25 bg-secondary flex items-center justify-center shrink-0">
          <span aria-hidden className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent rotate-45" />
          <span className="relative font-display font-black text-lg text-foreground">
            {persona.initials}
          </span>
        </div>
        <figcaption className="min-w-0">
          <p className="font-display font-bold text-lg text-foreground leading-tight">
            {persona.name}
            <span className="text-muted-foreground font-sans text-sm font-normal"> · {persona.age}</span>
          </p>
          <p className="text-[11px] font-mono uppercase tracking-widest text-foreground/70">
            {persona.role}
          </p>
        </figcaption>
      </div>

      <blockquote className="text-sm italic text-foreground leading-relaxed border-l-2 border-accent pl-3 mb-4">
        “{persona.quote}”
      </blockquote>

      <dl className="space-y-2.5 mt-auto">
        {persona.facts.map((f) => (
          <div key={f.label} className="flex gap-2 text-xs">
            <dt className="font-mono uppercase tracking-wider text-muted-foreground shrink-0 w-[5.5rem]">
              {f.label}
            </dt>
            <dd className="text-foreground leading-snug min-w-0">{f.value}</dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}

export default function PersonaGrid({ personas }: { personas: Persona[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 items-stretch">
      {personas.map((p) => (
        <PersonaCard key={p.name} persona={p} />
      ))}
    </div>
  );
}
