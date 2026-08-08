export interface FunnelStep {
  label: string;
  pct: number;
}

/** CSS bar funnel — exact labels, no chart library. */
export default function FunnelChart({
  title = "Funnel",
  steps,
  note,
  source,
}: {
  title?: string;
  steps: FunnelStep[];
  note?: string;
  source?: string;
}) {
  return (
    <figure className="border border-border bg-card p-4 sm:p-5">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
        <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          {title}
        </span>
        {source && (
          <span className="text-[10px] font-mono uppercase tracking-widest text-accent">
            {source}
          </span>
        )}
      </figcaption>

      <div className="space-y-2">
        {steps.map((s, i) => {
          const last = i === steps.length - 1;
          return (
            <div key={s.label} className="flex items-center gap-2 sm:gap-3">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-muted-foreground w-[5.5rem] sm:w-28 shrink-0 leading-tight">
                {s.label}
              </span>
              <div className="flex-1 h-7 sm:h-9 bg-foreground/[0.07] border border-border">
                <div
                  className={`h-full ${last ? "bg-accent" : "bg-foreground/35"}`}
                  style={{ width: `${s.pct}%` }}
                />
              </div>
              <span className="text-xs font-mono text-foreground w-10 text-right shrink-0">
                {s.pct}%
              </span>
            </div>
          );
        })}
      </div>

      {note && (
        <p className="mt-3 text-[11px] font-mono uppercase tracking-widest text-destructive">
          {note}
        </p>
      )}
    </figure>
  );
}
