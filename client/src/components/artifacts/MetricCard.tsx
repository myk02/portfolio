import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";

export interface MetricCardData {
  /** what is being measured, e.g. "Onboarding" */
  label: string;
  /** the headline value, e.g. "8 → 4 steps" */
  value: string;
  /** where it started */
  baseline?: string;
  /** where it landed */
  result?: string;
  /** lime = improvement, red = regression, neutral = descriptive */
  tone?: "positive" | "negative" | "neutral";
  /** ▲ / ▼ direction of the change */
  direction?: "up" | "down" | "flat";
  note?: string;
}

function DeltaIcon({ direction }: { direction: MetricCardData["direction"] }) {
  if (direction === "up") return <ArrowUpRight size={13} aria-hidden />;
  if (direction === "down") return <ArrowDownRight size={13} aria-hidden />;
  return <ArrowRight size={13} aria-hidden />;
}

export function MetricCard({
  label,
  value,
  baseline,
  result,
  tone = "positive",
  direction = "down",
  note,
}: MetricCardData) {
  const toneClass =
    tone === "negative"
      ? "text-destructive"
      : tone === "neutral"
        ? "text-muted-foreground"
        : "text-foreground";
  const chipClass =
    tone === "negative"
      ? "border-destructive/50 text-destructive"
      : tone === "neutral"
        ? "border-border text-muted-foreground"
        : "border-accent bg-accent/25 text-foreground";

  return (
    <div className="border border-border bg-card p-4 sm:p-5 flex flex-col gap-2 h-full">
      <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <p
        className={`font-display font-black leading-[1.05] tracking-tight ${toneClass}`}
        style={{ fontSize: "clamp(1.35rem, 2.6vw, 1.85rem)" }}
      >
        {value}
      </p>
      {(baseline || result) && (
        <p className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider">
          {baseline && <span className="text-muted-foreground">{baseline}</span>}
          <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 border ${chipClass}`}>
            <DeltaIcon direction={direction} />
            {result}
          </span>
        </p>
      )}
      {note && <p className="text-xs text-muted-foreground leading-snug mt-auto">{note}</p>}
    </div>
  );
}

export function MetricCardRow({ cards }: { cards: MetricCardData[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
      {cards.map((c) => (
        <MetricCard key={c.label} {...c} />
      ))}
    </div>
  );
}
