export interface FlowStep {
  label: string;
  /** marks the step that killed the flow / the step that fixed it */
  flag?: "drop" | "win";
}

export interface BeforeAfterFlowProps {
  title?: string;
  beforeLabel: string;
  afterLabel: string;
  before: FlowStep[];
  after: FlowStep[];
  /** e.g. "8 → 4 steps" */
  summary?: string;
  note?: string;
  /** what one step is called: "steps", "taps", "interactions", "styles" */
  unit?: string;
}

function StepList({
  steps,
  tone,
}: {
  steps: FlowStep[];
  tone: "before" | "after";
}) {
  return (
    <ol className="space-y-1.5">
      {steps.map((s, i) => (
        <li key={`${s.label}-${i}`} className="flex items-center gap-2">
          <span
            className={`w-5 h-5 shrink-0 grid place-items-center font-mono text-[10px] border ${
              tone === "after"
                ? "bg-accent text-accent-foreground border-accent"
                : s.flag === "drop"
                  ? "border-destructive/60 text-destructive"
                  : "border-foreground/25 text-muted-foreground"
            }`}
          >
            {i + 1}
          </span>
          <span
            className={`text-xs leading-snug ${
              s.flag === "drop"
                ? "text-destructive"
                : tone === "after"
                  ? "text-foreground font-medium"
                  : "text-muted-foreground"
            }`}
          >
            {s.label}
            {s.flag === "drop" && " — drop-off"}
          </span>
        </li>
      ))}
    </ol>
  );
}

/** Side-by-side flow diff with step counts and an arrow between them. */
export default function BeforeAfterFlow({
  title,
  beforeLabel,
  afterLabel,
  before,
  after,
  summary,
  note,
  unit = "steps",
}: BeforeAfterFlowProps) {
  return (
    <figure className="border border-border bg-card p-4 sm:p-5">
      {(title || summary) && (
        <figcaption className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
          {title && (
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              {title}
            </span>
          )}
          {summary && (
            <span className="font-display font-bold text-base text-foreground">{summary}</span>
          )}
        </figcaption>
      )}

      <div className="grid grid-cols-[1fr_auto_1fr] gap-2 sm:gap-4 items-stretch">
        <div className="border border-border bg-secondary p-3 sm:p-4 flex flex-col gap-3 min-w-0">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
              {beforeLabel}
            </span>
            <span className="font-display font-bold text-lg text-muted-foreground">
              {before.length}
            </span>
          </div>
          <StepList steps={before} tone="before" />
        </div>

        <div className="flex items-center justify-center" aria-hidden>
          <span className="font-mono text-sm text-accent">→</span>
        </div>

        <div className="border border-accent/60 bg-secondary p-3 sm:p-4 flex flex-col gap-3 min-w-0">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-foreground">
              {afterLabel}
            </span>
            <span className="font-display font-bold text-lg text-foreground">{after.length}</span>
          </div>
          <StepList steps={after} tone="after" />
        </div>
      </div>

      <p className="mt-3 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
        {before.length} → {after.length} {unit}
        {note ? ` · ${note}` : ""}
      </p>
    </figure>
  );
}
