const tokens = [
  { name: "--color-ink", value: "#141310", swatch: "#141310" },
  { name: "--color-cream", value: "#f4efe7", swatch: "#f4efe7" },
  { name: "--color-accent", value: "#e8ff47", swatch: "#e8ff47" },
  { name: "--color-muted", value: "#8a867e", swatch: "#8a867e" },
];

const typeScale = [
  { role: "Display", size: "48", cls: "text-3xl font-black" },
  { role: "Headline", size: "32", cls: "text-xl font-bold" },
  { role: "Subhead", size: "24", cls: "text-base font-semibold" },
  { role: "Body", size: "16", cls: "text-xs" },
  { role: "Caption", size: "12", cls: "text-[10px]" },
];

const buttons = [
  { label: "Primary", cls: "bg-[#141310] text-[#f4efe7]" },
  { label: "Secondary", cls: "bg-[#f4efe7] border border-[#141310]/25 text-[#141310]" },
  { label: "Ghost", cls: "border border-[#141310]/25 text-[#141310]" },
  { label: "Accent", cls: "bg-[#e8ff47] text-[#141310]" },
];

export default function TokensPoster() {
  return (
    <div className="border border-border bg-card p-4 sm:p-6">
      <div className="flex items-center justify-between mb-5">
        <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          The system as a poster — tokens, type, buttons, grid
        </p>
        <span className="text-[10px] font-mono uppercase tracking-widest text-accent">v1.0</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="border border-border bg-secondary p-4">
          <p className="text-[11px] font-mono uppercase tracking-widest text-foreground mb-3">Color tokens</p>
          <div className="space-y-2">
            {tokens.map((t) => (
              <div key={t.name} className="flex items-center gap-3" style={{ ["--i" as string]: 0 }} data-reveal>
                <span className="w-8 h-8 border border-foreground/20 shrink-0" style={{ background: t.swatch }} />
                <code className="text-xs text-muted-foreground flex-1">{t.name}</code>
                <span className="text-xs font-mono text-foreground">{t.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-border bg-secondary p-4">
          <p className="text-[11px] font-mono uppercase tracking-widest text-foreground mb-3">Type scale</p>
          <div className="space-y-2.5">
            {typeScale.map((t, i) => (
              <div key={t.role} className="flex items-baseline justify-between gap-3" style={{ ["--i" as string]: i }} data-reveal>
                <span className={`font-display ${t.cls} text-foreground truncate`}>Aa</span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground shrink-0">
                  {t.role} · {t.size}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-border bg-secondary p-4">
          <p className="text-[11px] font-mono uppercase tracking-widest text-foreground mb-3">Buttons — every state</p>
          <div className="space-y-2">
            {buttons.map((b) => (
              <div key={b.label} className={`px-3 py-2 text-xs font-semibold text-center ${b.cls}`}>
                {b.label}
              </div>
            ))}
          </div>
        </div>

        <div className="border border-border bg-secondary p-4">
          <p className="text-[11px] font-mono uppercase tracking-widest text-foreground mb-3">Spacing — 4px base</p>
          <div className="space-y-2">
            {[4, 8, 16, 24, 32].map((s) => (
              <div key={s} className="flex items-center gap-3">
                <div className="bg-accent" style={{ width: s, height: 6 }} />
                <span className="text-[10px] font-mono text-muted-foreground">{s}px</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
