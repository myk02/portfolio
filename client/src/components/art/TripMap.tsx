const stops = [
  { name: "Nairobi", days: "1", pos: [22, 72] as const },
  { name: "Maasai Mara", days: "2", pos: [38, 82] as const },
  { name: "Nakuru", days: "1", pos: [55, 62] as const },
  { name: "Diani Beach", days: "3", pos: [78, 78] as const },
];

export default function TripMap() {
  return (
    <div className="border border-border bg-card p-4 sm:p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          Route builder — list-first, map secondary
        </p>
        <span className="text-[10px] font-mono uppercase tracking-widest text-accent">4 stops · 7 days</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          {stops.map((s, i) => (
            <div
              key={s.name}
              className="flex items-center gap-3 border border-border bg-secondary px-3 py-2"
              style={{ ["--i" as string]: i }}
              data-reveal
            >
              <span className="w-6 h-6 rounded-full border border-foreground/30 flex items-center justify-center font-mono text-[10px] text-foreground shrink-0">
                {i + 1}
              </span>
              <span className="text-sm font-medium text-foreground flex-1">{s.name}</span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                {s.days}d
              </span>
              <span className="text-muted-foreground text-xs" aria-hidden>
                ≡
              </span>
            </div>
          ))}
          <div className="flex gap-2 pt-1">
            <span className="flex-1 text-center text-xs font-semibold bg-accent text-accent-foreground py-2">
              Share itinerary
            </span>
            <span className="text-center text-xs font-semibold border border-border py-2 px-3 text-foreground">
              + Add stop
            </span>
          </div>
        </div>

        <div className="relative border border-border bg-[#eef1e3] overflow-hidden min-h-[220px]">
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none" aria-hidden>
            <path
              d={`M${stops.map((s) => s.pos.join(",")).join(" L")}`}
              fill="none"
              stroke="#141310"
              strokeOpacity="0.45"
              strokeWidth="0.8"
              strokeDasharray="2 2"
            />
          </svg>
          {stops.map((s, i) => (
            <div
              key={s.name}
              className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
              style={{ left: `${s.pos[0]}%`, top: `${s.pos[1]}%` }}
            >
              <span className={`w-3 h-3 rounded-full border-2 block mx-auto ${i === 3 ? "bg-accent border-accent" : "bg-[#f4efe7] border-foreground/50"}`} />
              <span className="text-[9px] font-mono text-foreground/80 whitespace-nowrap">{s.name}</span>
            </div>
          ))}
          <span className="absolute bottom-2 right-3 text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
            Kenya · route preview
          </span>
        </div>
      </div>
    </div>
  );
}
