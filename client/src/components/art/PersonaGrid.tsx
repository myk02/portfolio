import type { Persona } from "@/data/caseVisuals";

export default function PersonaGrid({ personas }: { personas: Persona[] }) {
  return (
    <div className="grid sm:grid-cols-3 gap-4">
      {personas.map((p, i) => (
        <figure
          key={p.name}
          className="border border-border bg-card p-5 flex flex-col"
          style={{ ["--i" as string]: i }}
          data-reveal
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="relative w-12 h-12 rounded-soft-sm overflow-hidden border border-foreground/20 bg-[#f4efe7] flex items-center justify-center shrink-0">
              <span aria-hidden className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent rotate-45" />
              <span className="font-display font-black text-lg text-foreground">{p.initials}</span>
            </div>
            <figcaption>
              <p className="font-display font-bold text-lg text-foreground leading-tight">
                {p.name}
                <span className="text-muted-foreground font-sans text-sm font-normal"> · {p.age}</span>
              </p>
              <p className="text-xs font-mono uppercase tracking-widest text-accent">{p.role}</p>
            </figcaption>
          </div>

          <blockquote className="text-sm text-foreground leading-relaxed border-l-2 border-accent pl-3 mb-4">
            “{p.quote}”
          </blockquote>

          <dl className="space-y-2.5 mt-auto">
            {p.facts.map((f) => (
              <div key={f.label} className="flex gap-2 text-xs">
                <dt className="font-mono uppercase tracking-wider text-muted-foreground shrink-0 w-[5.5rem]">
                  {f.label}
                </dt>
                <dd className="text-foreground leading-snug">{f.value}</dd>
              </div>
            ))}
          </dl>
        </figure>
      ))}
    </div>
  );
}
