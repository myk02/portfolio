import type { StudyKind } from "@/data/caseStudies";
import { cn } from "@/lib/utils";

export type BadgeTone = "live" | "concept" | "prototype" | "saas";

const TONE_LABEL: Record<BadgeTone, string> = {
  live: "Live production",
  concept: "Concept study",
  prototype: "Interactive prototype",
  saas: "SaaS project",
};

export function toneFromKind(kind: StudyKind): BadgeTone {
  return kind === "LIVE PRODUCT" ? "live" : "concept";
}

/**
 * Status badge for work cards and case-study heroes.
 * Renders an accessible status chip; color never carries meaning alone.
 */
export default function StatusBadge({
  tone,
  label,
  className,
}: {
  tone: BadgeTone;
  label?: string;
  className?: string;
}) {
  const text = label ?? TONE_LABEL[tone];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-1 text-[10px] font-mono uppercase tracking-widest",
        tone === "live"
          ? "bg-foreground text-background"
          : tone === "concept"
            ? "bg-accent/20 text-foreground border border-accent/50"
            : "bg-background/85 backdrop-blur border border-border text-foreground",
        className,
      )}
    >
      {tone === "live" && (
        <span aria-hidden className="live-dot w-1.5 h-1.5" />
      )}
      {text}
    </span>
  );
}
