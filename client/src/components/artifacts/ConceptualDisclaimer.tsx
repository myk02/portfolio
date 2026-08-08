import { FlaskConical } from "lucide-react";

/**
 * Shared note placed immediately under the outcome table on every
 * conceptual study, so the honesty framing is identical across pages.
 */
export default function ConceptualDisclaimer({ detail }: { detail: string }) {
  return (
    <aside className="border border-border border-l-4 border-l-accent bg-card p-4 sm:p-5 flex gap-3">
      <span
        aria-hidden
        className="shrink-0 w-8 h-8 grid place-items-center border border-border bg-secondary text-foreground"
      >
        <FlaskConical size={15} />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-mono uppercase tracking-widest text-foreground mb-1.5">
          Concept · not production data
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">{detail}</p>
      </div>
    </aside>
  );
}
