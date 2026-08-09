import type { ReactNode } from "react";

export interface FidelityStep {
  /** "Wireframe" · "Structured" · "Hi-fi" */
  label: string;
  /** one line — what changed at this fidelity */
  sub: string;
  /** phone-shaped or desktop-shaped screen boxes */
  shape?: "mobile" | "desktop";
  /** the rendered screen at this fidelity — fills the screen box */
  node: ReactNode;
}

const chipFor: Record<string, string> = {
  Wireframe: "border border-foreground/40 text-foreground bg-transparent",
  Structured: "border border-foreground/40 text-foreground bg-foreground/10",
  "Hi-fi": "bg-accent text-accent-foreground",
};

/**
 * Wireframe → structured → hi-fi progression for one chosen concept.
 * Three equal-size screen boxes so the same idea reads as climbing fidelity.
 */
export default function FidelityLadder({
  title = "One idea, three fidelities",
  steps,
}: {
  title?: string;
  steps: FidelityStep[];
}) {
  return (
    <figure className="border border-border bg-card p-4 sm:p-5">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
        <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          {title}
        </span>
        <span className="text-[10px] font-mono uppercase tracking-widest text-foreground/70">
          wireframe → structured → hi-fi
        </span>
      </figcaption>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-stretch">
        {steps.map((s, i) => (
          <div key={s.label} className="flex flex-col gap-2">
            <div className="border border-border bg-secondary p-3 flex flex-col gap-2.5 h-full">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[9px] font-mono uppercase tracking-wider text-foreground/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`px-2 py-0.5 text-[8px] font-mono uppercase tracking-wider ${
                    chipFor[s.label] ?? ""
                  }`}
                >
                  {s.label}
                </span>
              </div>
              <div
                className={`relative border border-border bg-card overflow-hidden mx-auto ${
                  s.shape === "desktop"
                    ? "w-full max-w-[260px] aspect-[4/3]"
                    : "w-full max-w-[120px] aspect-[9/17]"
                }`}
              >
                {s.node}
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground leading-snug">{s.sub}</p>
          </div>
        ))}
      </div>
    </figure>
  );
}
