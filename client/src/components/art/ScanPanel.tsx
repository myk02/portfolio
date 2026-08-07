export default function ScanPanel() {
  return (
    <div className="space-y-3">
      <div className="border border-border bg-card p-4">
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3">
          Scan, not read — exceptions first
        </p>
        <div className="grid grid-cols-4 gap-px bg-foreground/15">
          {["Region", "Orders", "SLA", "Status"].map((h) => (
            <div key={h} className="bg-secondary px-2 py-1 text-[9px] font-mono uppercase tracking-wider text-foreground">
              {h}
            </div>
          ))}
          {[
            ["N1", "412", "98.1%", "OK"],
            ["N2", "97", "89.4%", "SLA BREACH"],
          ].map((row, i) => (
            <div key={i} className="grid grid-cols-4 gap-px bg-foreground/15 contents">
              {row.map((c, j) => (
                <div
                  key={j}
                  className={`px-2 py-2 text-[10px] font-mono ${
                    i === 1 && j === 3
                      ? "bg-rose-500/15 text-rose-500 font-bold"
                      : i === 1
                        ? "bg-card text-muted-foreground"
                        : "bg-card text-foreground"
                  }`}
                >
                  {c}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="border border-border bg-card p-4">
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3">
          Table = the workhorse
        </p>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-4 bg-foreground/[0.07]">
            <div className="h-full w-[60%] bg-foreground/40" />
          </div>
          <span className="text-xs font-mono text-foreground">60% of tasks</span>
        </div>
      </div>

      <div className="border border-border bg-card p-4">
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3">
          Handoff gap
        </p>
        <div className="flex items-center gap-3">
          <div className="flex-1 border border-foreground/25 p-2 space-y-1">
            <div className="h-2 bg-foreground/25" />
            <div className="h-2 w-2/3 bg-foreground/15" />
          </div>
          <span className="font-mono text-xs text-muted-foreground" aria-hidden>→?</span>
          <div className="flex-1 border border-accent/60 p-2 space-y-1">
            <div className="h-2 bg-foreground/25" />
            <div className="h-2 w-2/3 bg-foreground/15" />
            <span className="block text-[8px] font-mono text-accent">spec: 8 / 12 / 16</span>
          </div>
        </div>
      </div>
    </div>
  );
}
