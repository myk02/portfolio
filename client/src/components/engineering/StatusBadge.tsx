/**
 * Live-product chip. Color never carries meaning alone — the label does.
 */
export default function StatusBadge() {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-1 text-[10px] font-mono uppercase tracking-widest bg-foreground text-background"
    >
      <span aria-hidden className="live-dot w-1.5 h-1.5" />
      Live production
    </span>
  );
}
