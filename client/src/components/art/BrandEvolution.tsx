export default function BrandEvolution({
  title,
  items,
}: {
  title: string;
  items: { label: string; state: string; swatches: string[] }[];
}) {
  const stateStyles: Record<string, string> = {
    won: "bg-accent text-accent-foreground",
    rejected: "border border-rose-400/60 text-rose-400",
    tested: "border border-border text-muted-foreground",
  };
  return (
    <div className="border border-border bg-card p-4 sm:p-5">
      <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
        {title}
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {items.map((item, i) => (
          <div
            key={item.label}
            className="border border-border bg-secondary p-3 flex flex-col gap-3"
            style={{ ["--i" as string]: i }}
            data-reveal
          >
            <div className="flex items-center gap-2 h-6">
              {item.swatches.map((s, j) => (
                <span
                  key={j}
                  className="w-6 h-6 border border-foreground/20 shrink-0"
                  style={{
                    background: s === "Aa" ? undefined : s,
                    ...(s === "Aa"
                      ? {
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.65rem",
                          fontFamily: "var(--font-display)",
                          color: "var(--foreground)",
                        }
                      : {}),
                  }}
                >
                  {s === "Aa" ? "Aa" : ""}
                </span>
              ))}
            </div>
            <p className="text-xs text-foreground leading-snug flex-1">{item.label}</p>
            <span className={`self-start px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider ${stateStyles[item.state] ?? stateStyles.tested}`}>
              {item.state}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
