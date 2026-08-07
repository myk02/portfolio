import type { SketchItem } from "@/data/caseVisuals";

const stateChip: Record<SketchItem["state"], string> = {
  won: "bg-accent text-accent-foreground",
  rejected: "border border-rose-400/60 text-rose-400",
  kept: "border border-border text-muted-foreground",
};

function Bar({ w, dark = false }: { w: string; dark?: boolean }) {
  return (
    <div
      className={`h-1.5 rounded-[2px] ${dark ? "bg-foreground/50" : "bg-foreground/25"}`}
      style={{ width: w }}
    />
  );
}

function Field() {
  return <div className="h-3 border border-foreground/30 bg-transparent" />;
}

function Wire({ layout }: { layout: string }) {
  switch (layout) {
    case "onboard":
      return (
        <div className="space-y-3">
          <Bar w="60%" />
          <Field />
          <Field />
          <div className="flex gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={`h-1 flex-1 rounded-full ${i < 2 ? "bg-foreground/50" : "bg-foreground/15"}`} />
            ))}
          </div>
          <div className="h-6 bg-foreground/20 mt-4" />
        </div>
      );
    case "dark":
      return (
        <div className="space-y-3 bg-[#141310] p-3">
          <Bar w="40%" dark />
          <div className="h-8 bg-foreground/40" />
          <div className="grid grid-cols-2 gap-2">
            <div className="h-5 bg-foreground/25" />
            <div className="h-5 bg-foreground/25" />
          </div>
        </div>
      );
    case "grid":
      return (
        <div className="grid grid-cols-2 gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="border border-foreground/25 p-2 space-y-1.5">
              <Bar w="70%" />
              <div className="h-4 bg-foreground/15" />
            </div>
          ))}
        </div>
      );
    case "home":
      return (
        <div className="space-y-3">
          <div className="h-4 bg-foreground/20" />
          <div className="flex items-center gap-3 border border-foreground/25 p-3">
            <div className="w-12 h-12 rounded-full border-[3px] border-foreground/40 shrink-0" />
            <div className="flex-1 space-y-1.5">
              <Bar w="80%" />
              <Bar w="50%" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-7 border border-foreground/25" />
            ))}
          </div>
        </div>
      );
    case "ring":
      return (
        <div className="flex items-center justify-around py-1">
          {[0, 1].map((i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <div className="w-14 h-14 rounded-full border-[3px] border-dashed border-foreground/40 flex items-center justify-center">
                <span className="w-8 h-8 rounded-full border-[3px] border-foreground/20" />
              </div>
              <Bar w="70%" />
            </div>
          ))}
        </div>
      );
    case "sheet":
      return (
        <div className="space-y-2 border-t-2 border-foreground/30 pt-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center justify-between border border-foreground/25 p-1.5">
              <Bar w="45%" />
              <Bar w="25%" />
            </div>
          ))}
        </div>
      );
    case "kyc":
      return (
        <div className="space-y-2.5">
          {["Phone", "ID", "PIN", "Photo"].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <span
                className={`w-4 h-4 rounded-full border flex items-center justify-center text-[8px] ${
                  i < 4 ? "border-foreground/50" : "border-foreground/20"
                }`}
              >
                {i + 1}
              </span>
              <Bar w={["55%", "35%", "40%", "50%"][i]} />
            </div>
          ))}
        </div>
      );
    case "defer":
      return (
        <div className="space-y-2.5">
          <div className="border border-foreground/25 p-2 flex items-center justify-between">
            <Bar w="40%" />
            <span className="text-[8px] font-mono uppercase tracking-wider bg-foreground/10 px-1">deferred</span>
          </div>
          <div className="border border-foreground/25 p-2 flex items-center justify-between">
            <Bar w="35%" />
            <span className="text-[8px] font-mono uppercase tracking-wider bg-accent/80 text-accent-foreground px-1">later</span>
          </div>
        </div>
      );
    case "map":
      return (
        <div className="relative h-full min-h-[90px]">
          <div className="absolute inset-0 border border-dashed border-foreground/30" />
          {[
            ["10%", "20%"], ["45%", "15%"], ["70%", "45%"], ["30%", "70%"],
          ].map(([l, t], i) => (
            <span
              key={i}
              className="absolute w-3 h-3 rounded-full border-2 border-foreground/50 bg-secondary"
              style={{ left: l, top: t }}
            />
          ))}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
            <path
              d="M10,20 L45,15 L70,45 L30,70"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="3 2"
              className="text-foreground/40"
            />
          </svg>
        </div>
      );
    case "list":
      return (
        <div className="space-y-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-2 border border-foreground/25 p-2">
              <div className="w-6 h-6 bg-foreground/20 shrink-0" />
              <div className="flex-1 space-y-1">
                <Bar w="70%" />
                <Bar w="40%" />
              </div>
            </div>
          ))}
        </div>
      );
    case "flow":
      return (
        <div className="flex items-center justify-between py-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-1 flex-1 last:flex-none">
              <div className="flex-1 h-8 border border-foreground/30 flex items-center justify-center text-[8px] font-mono text-foreground/50">
                {i + 1}
              </div>
              {i < 2 && <span className="text-foreground/30 text-[10px]">→</span>}
            </div>
          ))}
        </div>
      );
    case "days":
      return (
        <div className="space-y-1.5">
          {["Day 1 · Nairobi → Mara", "Day 2 · Mara", "Day 3 · Nakuru"].map((d) => (
            <div key={d} className="flex items-center gap-2 border border-foreground/20 p-1.5">
              <span className="text-[8px] font-mono text-foreground/50">{d.split("·")[0].trim()}</span>
              <Bar w="50%" />
            </div>
          ))}
        </div>
      );
    case "cart":
      return (
        <div className="space-y-2">
          {[0, 1].map((i) => (
            <div key={i} className="flex items-center gap-2 border border-foreground/25 p-1.5">
              <div className="w-7 h-7 bg-foreground/20 shrink-0" />
              <Bar w="50%" />
              <Bar w="20%" />
            </div>
          ))}
          <div className="h-6 bg-foreground/25" />
        </div>
      );
    case "swatch":
      return (
        <div className="flex gap-2 py-2">
          {["#141310", "#ff5a1f", "#ffd700", "#f4efe7"].map((c) => (
            <span key={c} className="w-8 h-8 rounded-full border border-foreground/20" style={{ background: c }} />
          ))}
        </div>
      );
    case "pay":
      return (
        <div className="space-y-2">
          <div className="border-2 border-foreground/40 p-2 flex items-center justify-between">
            <Bar w="35%" />
            <span className="text-[8px] font-mono bg-accent/80 text-accent-foreground px-1">M-Pesa</span>
          </div>
          <div className="border border-foreground/20 p-2"><Bar w="30%" /></div>
        </div>
      );
    case "table":
      return (
        <div className="space-y-1">
          <div className="h-3 bg-foreground/25" />
          {[0, 1, 2].map((i) => (
            <div key={i} className="grid grid-cols-4 gap-1.5">
              {[0, 1, 2, 3].map((j) => (
                <div key={j} className={`h-2.5 ${i === 1 && j === 1 ? "bg-accent/70" : "bg-foreground/15"}`} />
              ))}
            </div>
          ))}
        </div>
      );
    case "tiers":
      return (
        <div className="space-y-2">
          <div className="h-8 bg-foreground/35" />
          <div className="h-10 bg-foreground/25" />
          <div className="h-12 bg-foreground/15" />
        </div>
      );
    case "kpi":
      return (
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="border border-foreground/25 p-1.5 space-y-1">
              <Bar w="60%" />
              <Bar w="80%" />
              <div className="h-4 bg-foreground/15" />
            </div>
          ))}
        </div>
      );
    case "rows":
      return (
        <div className="space-y-1">
          <div className="h-3 bg-foreground/25" />
          <div className="h-3 bg-accent/60 border-2 border-foreground/40" />
          {[0, 1].map((i) => (
            <div key={i} className="h-3 bg-foreground/15" />
          ))}
        </div>
      );
    case "tokens":
      return (
        <div className="space-y-1.5">
          {["--color-bg", "--color-ink", "--color-accent"].map((t) => (
            <div key={t} className="flex items-center gap-2">
              <span className="text-[8px] font-mono text-foreground/50 w-20">{t}</span>
              <div className="flex-1 h-3 bg-foreground/15" />
              <div className="w-4 h-3 bg-accent/70" />
            </div>
          ))}
        </div>
      );
    case "type":
      return (
        <div className="space-y-1.5">
          <Bar w="90%" />
          <Bar w="75%" />
          <Bar w="60%" />
          <Bar w="45%" />
          <Bar w="30%" />
        </div>
      );
    case "buttons":
      return (
        <div className="space-y-2">
          <div className="h-5 bg-foreground/35" />
          <div className="h-5 bg-foreground/20" />
          <div className="h-5 border border-foreground/30" />
          <div className="h-5 border border-foreground/15" />
        </div>
      );
    case "icons":
      return (
        <div className="grid grid-cols-4 gap-1.5">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="w-5 h-5 border border-foreground/30 rotate-45 mx-auto" />
          ))}
        </div>
      );
    case "card":
      return (
        <div className="space-y-2">
          <div className="h-8 bg-foreground/20" />
          <Bar w="60%" />
          <Bar w="40%" />
        </div>
      );
    default:
      return <div className="h-16 bg-foreground/10" />;
  }
}

export default function SketchGallery({ items }: { items: SketchItem[] }) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-none">
      {items.map((item, i) => (
        <figure
          key={item.label}
          className={`snap-start shrink-0 w-[240px] sm:w-[260px] border-2 border-dashed border-foreground/20 p-4 flex flex-col gap-3 ${
            i % 2 === 1 ? "rotate-[0.6deg]" : "rotate-[-0.4deg]"
          }`}
          style={{
            background:
              "repeating-linear-gradient(0deg, rgba(20,19,16,0.035) 0 1px, transparent 1px 7px), #f6f1e4",
          }}
        >
          <div className="border border-foreground/20 bg-secondary/60 p-3 min-h-[120px]">
            <Wire layout={item.layout} />
          </div>
          <figcaption className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-mono text-foreground/80 leading-tight">{item.label}</span>
            <span className={`shrink-0 px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider ${stateChip[item.state]}`}>
              {item.state === "won" ? "won" : item.state === "rejected" ? "rejected" : "kept"}
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
