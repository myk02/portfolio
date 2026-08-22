import type { ProposedSection } from "@/data/caseStudies";

type Variant = "proposed" | "considerations";

const VARIANT_META: Record<
  Variant,
  { label: string; kicker: string; note: string }
> = {
  proposed: {
    label: "Proposed implementation",
    kicker: "Not built — design proposal",
    note: "This section describes how the concept would be engineered. It is not production code and should be read as a build plan.",
  },
  considerations: {
    label: "Engineering considerations",
    kicker: "If this were built",
    note: "Honest engineering analysis of the concept — none of this exists as shipped code.",
  },
};

/**
 * Clearly-labeled block for conceptual work: separates what was designed and
 * tested from what would need to be engineered. Never renders inside a
 * "production evidence" visual treatment.
 */
export default function ProposedBlock({
  variant = "proposed",
  intro,
  sections,
}: {
  variant?: Variant;
  intro?: string;
  sections: ProposedSection[];
}) {
  const meta = VARIANT_META[variant];
  return (
    <aside
      aria-label={meta.label}
      className="border border-dashed border-foreground/30 bg-card/50 p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1">
        <h3 className="font-display font-bold text-lg text-foreground">
          {meta.label}
        </h3>
        <span className="px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest border border-border text-muted-foreground">
          {meta.kicker}
        </span>
      </div>
      <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground mb-5">
        Conceptual · not production evidence
      </p>

      {(intro || meta.note) && (
        <p className="text-sm text-muted-foreground leading-relaxed mb-5 max-w-2xl">
          {intro ?? meta.note}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {sections.map(section => (
          <div key={section.heading}>
            <h4 className="text-xs font-mono uppercase tracking-widest text-accent mb-2">
              {section.heading}
            </h4>
            <ul className="space-y-2">
              {section.points.map((point, i) => (
                <li
                  key={i}
                  className="text-[13px] text-foreground/85 leading-snug pl-4 relative"
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-[7px] w-1.5 h-1.5 border border-foreground/40 shrink-0"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}
