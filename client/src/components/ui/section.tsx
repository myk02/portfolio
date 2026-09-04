import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The one section header: mono kicker + lime dash.
 * Replaces every hand-rolled `.section-label` span in the tree.
 */
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="section-label">
      <span className="section-label-line" aria-hidden />
      {children}
    </span>
  );
}

type SurfaceTone = "default" | "muted";

/**
 * The one card surface. Tones map to theme tokens — no hardcoded hex.
 * `className` merges via cn for one-off modifiers (e.g. border-l-4).
 */
export function Surface({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode;
  tone?: SurfaceTone;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border border-border",
        tone === "muted" ? "bg-secondary" : "bg-card",
        className,
      )}
    >
      {children}
    </div>
  );
}
