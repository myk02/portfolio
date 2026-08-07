export default function IAMap() {
  return (
    <div className="border border-border bg-card p-4 sm:p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          IA map — three tiers, written rules
        </p>
        <span className="text-[10px] font-mono uppercase tracking-widest text-accent">Tier 1 → 3</span>
      </div>
      <div className="space-y-2">
        {[
          { tier: "Tier 1 · Status", desc: "KPI cards with deltas — state in 2 seconds", h: "h-10" },
          { tier: "Tier 2 · Context", desc: "Exception list + trend charts — the why", h: "h-12" },
          { tier: "Tier 3 · Detail", desc: "Dense table — pinned column, sticky header, keyboard-first", h: "h-14" },
        ].map((t, i) => (
          <div
            key={t.tier}
            className="flex items-center gap-3 border border-border bg-secondary px-3"
            style={{ ["--i" as string]: i }}
            data-reveal
          >
            <div className={`w-14 shrink-0 ${t.h} bg-foreground/10 flex items-center justify-center`}>
              <span className="font-mono text-[10px] text-foreground/60">{i + 1}</span>
            </div>
            <div className="py-3">
              <p className="text-sm font-medium text-foreground">{t.tier}</p>
              <p className="text-xs text-muted-foreground">{t.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
