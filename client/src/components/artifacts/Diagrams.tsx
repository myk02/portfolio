import type { LucideIcon } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Small shared pieces used across chapters                            */
/* ------------------------------------------------------------------ */

export function ChipRow({
  chips,
  label,
}: {
  chips: { text: string; icon?: LucideIcon }[];
  label?: string;
}) {
  return (
    <div>
      {label && (
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
          {label}
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        {chips.map((c) => (
          <span
            key={c.text}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-mono uppercase tracking-wider border border-border bg-card text-foreground"
          >
            {c.icon && <c.icon size={12} aria-hidden />}
            {c.text}
          </span>
        ))}
      </div>
    </div>
  );
}

export function QuoteCard({
  quote,
  source,
  compact = false,
}: {
  quote: string;
  source: string;
  compact?: boolean;
}) {
  return (
    <figure
      className={`border border-border border-l-4 border-l-accent bg-card ${compact ? "p-3.5" : "p-4 sm:p-5"}`}
    >
      <blockquote
        className={`italic text-foreground leading-relaxed ${compact ? "text-[13px]" : "text-sm sm:text-base"}`}
      >
        “{quote}”
      </blockquote>
      <figcaption className="mt-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
        {source}
      </figcaption>
    </figure>
  );
}

export function PullStat({
  value,
  label,
  note,
}: {
  value: string;
  label: string;
  note?: string;
}) {
  return (
    <div className="border border-border bg-card p-4">
      <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
        {label}
      </p>
      <p
        className="font-display font-black text-foreground leading-none tracking-tight"
        style={{ fontSize: "clamp(1.6rem, 3vw, 2.1rem)" }}
      >
        {value}
      </p>
      {note && <p className="mt-2 text-xs text-muted-foreground leading-snug">{note}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* The Problem — context visual                                        */
/* ------------------------------------------------------------------ */

export function PainPointBoard({
  title,
  tiles,
  quote,
}: {
  title: string;
  tiles: { label: string; detail: string }[];
  quote?: { quote: string; source: string };
}) {
  return (
    <div className="space-y-3">
      <figure className="border border-border bg-card p-4 sm:p-5">
        <figcaption className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
          {title}
        </figcaption>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-stretch">
          {tiles.map((t, i) => (
            <div
              key={t.label}
              className="border border-border bg-secondary p-3.5 flex flex-col gap-2 h-full"
            >
              <span className="font-mono text-[10px] tracking-widest text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-display font-bold text-base text-foreground leading-snug">
                {t.label}
              </p>
              <p className="text-xs text-muted-foreground leading-snug">{t.detail}</p>
            </div>
          ))}
        </div>
      </figure>
      {quote && <QuoteCard quote={quote.quote} source={quote.source} />}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Define — IA / site map                                              */
/* ------------------------------------------------------------------ */

export function SiteMapDiagram({
  title,
  root,
  branches,
  note,
}: {
  title: string;
  root: string;
  branches: { label: string; children: string[] }[];
  note?: string;
}) {
  return (
    <figure className="border border-border bg-card p-4 sm:p-5">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
        <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          {title}
        </span>
        <span className="text-[10px] font-mono uppercase tracking-widest text-foreground/70">
          {branches.length} top-level
        </span>
      </figcaption>

      <div className="flex flex-col items-center gap-2">
        <span className="px-3 py-1.5 text-xs font-semibold bg-foreground text-background">
          {root}
        </span>
        <span aria-hidden className="w-px h-4 bg-foreground/30" />
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 items-stretch">
          {branches.map((b) => (
            <div
              key={b.label}
              className="border border-border bg-secondary p-2.5 flex flex-col gap-1.5 h-full"
            >
              <p className="text-[11px] font-semibold text-foreground leading-tight">{b.label}</p>
              <ul className="space-y-1">
                {b.children.map((c) => (
                  <li
                    key={c}
                    className="text-[10px] font-mono text-muted-foreground leading-tight pl-2 border-l border-foreground/20"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {note && (
        <p className="mt-3 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
          {note}
        </p>
      )}
    </figure>
  );
}

export function UserFlowDiagram({
  title,
  flows,
}: {
  title: string;
  flows: { name: string; steps: string[] }[];
}) {
  return (
    <figure className="border border-border bg-card p-4 sm:p-5">
      <figcaption className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
        {title}
      </figcaption>
      <div className="space-y-3">
        {flows.map((f) => (
          <div key={f.name} className="border border-border bg-secondary p-3">
            <p className="text-[10px] font-mono uppercase tracking-widest text-foreground/70 mb-2">
              {f.name}
            </p>
            <div className="flex flex-wrap items-center gap-1.5">
              {f.steps.map((s, i) => (
                <span key={s} className="flex items-center gap-1.5">
                  <span
                    className={`px-2 py-1 text-[11px] border ${
                      i === f.steps.length - 1
                        ? "bg-accent text-accent-foreground border-accent font-semibold"
                        : "border-border bg-card text-foreground"
                    }`}
                  >
                    {s}
                  </span>
                  {i < f.steps.length - 1 && (
                    <span aria-hidden className="text-muted-foreground text-xs">
                      →
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* UI — component states / audits                                      */
/* ------------------------------------------------------------------ */

const STATE_COLUMNS = ["Default", "Hover", "Focus", "Disabled", "Loading"];

export function StatesMatrix({
  title = "Component states — every variant specified",
  rows = ["Primary", "Secondary", "Ghost"],
}: {
  title?: string;
  rows?: string[];
}) {
  return (
    <figure className="border border-border bg-card p-4 sm:p-5">
      <figcaption className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
        {title}
      </figcaption>
      <div className="overflow-x-auto">
        <div className="min-w-[430px]">
          <div className="grid grid-cols-[80px_repeat(5,1fr)] gap-1.5 mb-1.5">
            <span />
            {STATE_COLUMNS.map((c) => (
              <span
                key={c}
                className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground text-center"
              >
                {c}
              </span>
            ))}
          </div>
          {rows.map((r, ri) => (
            <div key={r} className="grid grid-cols-[80px_repeat(5,1fr)] gap-1.5 mb-1.5 items-center">
              <span className="text-[10px] font-mono uppercase tracking-wider text-foreground">
                {r}
              </span>
              {STATE_COLUMNS.map((c) => {
                const base =
                  ri === 0
                    ? "bg-foreground text-background border-foreground"
                    : ri === 1
                      ? "bg-secondary text-foreground border-foreground/40"
                      : "bg-transparent text-foreground border-transparent";
                const state =
                  c === "Hover"
                    ? "opacity-90 translate-y-[-1px]"
                    : c === "Focus"
                      ? "outline outline-2 outline-offset-2 outline-[var(--accent)]"
                      : c === "Disabled"
                        ? "opacity-40"
                        : "";
                return (
                  <span
                    key={c}
                    className={`h-7 border grid place-items-center text-[9px] font-semibold ${base} ${state}`}
                  >
                    {c === "Loading" ? "···" : "Aa"}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </figure>
  );
}

export function ButtonAudit() {
  return (
    <figure className="border border-border bg-card p-4 sm:p-5">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
        <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          Audit — the same button, re-derived 17 times
        </span>
        <span className="text-[10px] font-mono uppercase tracking-widest text-destructive">
          17 styles · 6 scales · unlimited grays
        </span>
      </figcaption>
      <div className="flex flex-wrap gap-1.5">
        {Array.from({ length: 17 }).map((_, i) => (
          <span
            key={i}
            className="w-[46px] h-[34px] border border-foreground/25"
            style={{ background: ["#141310", "#4a453c", "#d9d2c4", "#e8ff47"][i % 4] }}
          />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
        {[
          { k: "Type scales", v: "6 competing" },
          { k: "Gray values", v: "23 unique" },
          { k: "Spacing", v: "no grid" },
        ].map((s) => (
          <div key={s.k} className="border border-border bg-secondary px-3 py-2">
            <p className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">
              {s.k}
            </p>
            <p className="text-sm font-semibold text-foreground">{s.v}</p>
          </div>
        ))}
      </div>
    </figure>
  );
}

export function ContrastAudit() {
  return (
    <figure className="border border-border bg-card p-4 sm:p-5">
      <figcaption className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
        Contrast audit — brand loud, text illegible
      </figcaption>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="border border-destructive/50 p-3">
          <div
            className="h-16 grid place-items-center"
            style={{ background: "#ff8ab3" }}
          >
            <span className="font-display font-black text-lg" style={{ color: "#ff5a1f" }}>
              GRAB A GIGI
            </span>
          </div>
          <p className="mt-2 text-[10px] font-mono uppercase tracking-wider text-destructive">
            Before · 2.1:1 — fails AA
          </p>
        </div>
        <div className="border border-accent p-3">
          <div className="h-16 grid place-items-center" style={{ background: "#141310" }}>
            <span className="font-display font-black text-lg" style={{ color: "#ffd700" }}>
              GRAB A GIGI
            </span>
          </div>
          <p className="mt-2 text-[10px] font-mono uppercase tracking-wider text-foreground">
            After · 11.4:1 — passes AA, same energy
          </p>
        </div>
      </div>
      <p className="mt-3 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
        Keep the can. Move the type onto dark containers.
      </p>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Validate — round 1 vs round 2 wrapper                               */
/* ------------------------------------------------------------------ */

export function TestRounds({
  roundOne,
  roundTwo,
  children,
}: {
  roundOne: string;
  roundTwo: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="border border-border border-l-4 border-l-destructive bg-card p-3.5">
          <p className="text-[10px] font-mono uppercase tracking-widest text-destructive mb-1">
            Round 1 — what broke
          </p>
          <p className="text-sm text-foreground leading-snug">{roundOne}</p>
        </div>
        <div className="border border-border border-l-4 border-l-accent bg-card p-3.5">
          <p className="text-[10px] font-mono uppercase tracking-widest text-foreground mb-1">
            Round 2 — what fixed it
          </p>
          <p className="text-sm text-foreground leading-snug">{roundTwo}</p>
        </div>
      </div>
      {children}
    </div>
  );
}
