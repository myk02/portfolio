const nodes = [
  { label: "Tokens", sub: "Type · Color · Spacing · Radii · Elevation", w: "w-3/4" },
  { label: "Components", sub: "Buttons · Forms · Toggles · Dialogs", w: "w-2/3" },
  { label: "Icons", sub: "24px stroke set · consistent weights", w: "w-1/2" },
  { label: "Docs", sub: "When to use · when not to · how to extend", w: "w-3/4" },
];

export default function DocsTree() {
  return (
    <div className="border border-border bg-card p-4 sm:p-5">
      <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
        The standards doc as a product — token layers first
      </p>
      <div className="relative">
        <span aria-hidden className="absolute left-3 top-3 bottom-3 w-px bg-foreground/20" />
        <div className="space-y-3">
          {nodes.map((n, i) => (
            <div key={n.label} className="flex items-center gap-3" style={{ ["--i" as string]: i }} data-reveal>
              <span className="relative z-10 w-6 h-6 rounded-full border-2 border-foreground/40 bg-card flex items-center justify-center shrink-0">
                <span className={`w-2 h-2 rounded-full ${i === 0 ? "bg-accent" : "bg-foreground/30"}`} />
              </span>
              <div className={`border border-border bg-secondary px-3 py-2 ${n.w} min-w-0`}>
                <p className="text-sm font-medium text-foreground">{n.label}</p>
                <p className="text-xs text-muted-foreground truncate">{n.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
