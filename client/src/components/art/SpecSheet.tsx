export default function SpecSheet() {
  return (
    <div className="border border-border bg-card p-4 sm:p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          Hand-off kit — annotated components
        </p>
        <span className="text-[10px] font-mono uppercase tracking-widest bg-accent text-accent-foreground px-2 py-0.5">
          for engineers
        </span>
      </div>
      <div className="relative">
        <div className="border border-foreground/20 overflow-hidden">
          <div className="grid grid-cols-4 gap-px bg-foreground/15">
            {["Route", "Deliveries", "SLA", "Status"].map((h) => (
              <div key={h} className="bg-secondary px-2 py-1.5 text-[9px] font-mono uppercase tracking-wider text-foreground">
                {h}
              </div>
            ))}
            {[
              ["N4", "128", "98.2%", "ON TIME"],
              ["N7", "84", "96.0%", "WATCH"],
              ["N9", "201", "91.4%", "DELAYED"],
              ["N12", "57", "99.1%", "ON TIME"],
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-4 gap-px bg-foreground/15 contents">
                {row.map((c, j) => (
                  <div
                    key={j}
                    className={`bg-card px-2 py-2 text-[10px] font-mono ${
                      i === 2 && j === 3
                        ? "bg-rose-500/10 text-rose-500 font-bold"
                        : j === 3
                          ? "text-foreground"
                          : "text-muted-foreground"
                    }`}
                  >
                    {c}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        {[
          { label: "spacing: 8 / 12 / 16", top: "-top-3", left: "left-2" },
          { label: "state: selected / hover / focus", top: "-bottom-3", left: "right-2" },
        ].map((a) => (
          <span
            key={a.label}
            className={`absolute ${a.top} ${a.left} bg-foreground text-background px-2 py-0.5 text-[9px] font-mono`}
          >
            {a.label}
          </span>
        ))}
      </div>
    </div>
  );
}
