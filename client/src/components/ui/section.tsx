import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="section-label">
      <span className="section-label-line" aria-hidden />
      {children}
    </span>
  );
}

type SurfaceTone = "default" | "muted";

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
