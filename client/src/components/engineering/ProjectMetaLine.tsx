import type { CaseStudy } from "@/data/caseStudies";
import StatusBadge, { toneFromKind } from "./StatusBadge";

/**
 * Compact technical metadata line for featured projects:
 * status · role · stack · challenge. Used on cards and case-study heroes.
 */
export default function ProjectMetaLine({
  study,
  compact = false,
  className = "",
}: {
  study: CaseStudy;
  /** compact = single mono line for tiles; full = stacked dl for case-study heroes */
  compact?: boolean;
  className?: string;
}) {
  if (compact) {
    return (
      <p
        className={`text-[11px] font-mono uppercase tracking-widest text-muted-foreground leading-relaxed ${className}`}
      >
        {study.status} · {study.role} · {study.stack.join(" · ")}
      </p>
    );
  }

  const rows: { label: string; value: React.ReactNode }[] = [
    {
      label: "Status",
      value: <StatusBadge tone={toneFromKind(study.kind)} label={study.status} />,
    },
    { label: "Role", value: study.role },
    { label: "Stack", value: study.stack.join(" · ") },
    { label: "Scope", value: study.scope },
    { label: "Challenge", value: study.challenge },
    { label: "Constraints", value: study.constraints.join(" · ") },
    { label: "Outcome", value: study.outcomeLine },
  ];

  return (
    <dl className="divide-y divide-border border-y border-border bg-card">
      {rows.map(row => (
        <div
          key={row.label}
          className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 py-3 px-4"
        >
          <dt className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground shrink-0 w-28">
            {row.label}
          </dt>
          <dd className="text-[13px] text-foreground leading-snug">
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
