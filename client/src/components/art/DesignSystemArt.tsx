const ink = "#141310";
const cream = "#f4efe7";
const lime = "#e8ff47";
const muted = "#8a867e";

const typeScale = [
  ["Display", "44", "font-black"],
  ["H1", "28", "font-bold"],
  ["H2", "20", "font-bold"],
  ["Body", "13", "font-normal"],
  ["Caption", "10", "font-medium"],
];

const chips = [
  ["Ink", "#141310", "#f4efe7"],
  ["Cream", "#f4efe7", "#141310"],
  ["Lime", "#e8ff47", "#141310"],
  ["Muted", "#8a867e", "#f4efe7"],
];

const icons = ["◪", "✦", "⬢", "↗", "⚲", "✉", "≡", "◉"];

export default function DesignSystemArt({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-full rounded-soft overflow-hidden border text-left ${className}`}
      style={{ background: cream, borderColor: "rgba(20,19,16,0.16)", boxShadow: "0 24px 60px -28px rgba(20,19,16,0.35)" }}
      role="img"
      aria-label="Design system style guide — type scale, color tokens, buttons, form states, icons, spacing"
    >
      <div className="flex items-center justify-between px-3 pt-2.5 pb-2 border-b" style={{ borderColor: "rgba(20,19,16,0.12)" }}>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-[4px] flex items-center justify-center text-[7px] font-black" style={{ background: lime, color: ink }}>
            O
          </div>
          <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: ink }}>
            OS Style Guide
          </span>
        </div>
        <span className="text-[7px] font-mono uppercase tracking-wider" style={{ color: muted }}>
          v1.0 · tokens-first
        </span>
      </div>

      <div className="p-3">
        <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: "rgba(20,19,16,0.12)" }}>
          <div>
            <p className="text-[16px] font-black leading-none tracking-tight" style={{ color: ink }}>
              Type scale
            </p>
            <p className="text-[7px] mt-0.5" style={{ color: muted }}>
              7 steps · editorial serif display, grotesque UI
            </p>
          </div>
          <span className="text-[34px] font-serif font-black leading-none" style={{ color: ink }}>
            Aa
          </span>
        </div>

        <div className="grid grid-cols-5 gap-1.5 mt-2">
          {typeScale.map(([name, size, weight]) => (
            <div key={name as string} className="rounded-soft-sm p-1.5 border" style={{ borderColor: "rgba(20,19,16,0.14)" }}>
              <p className={`text-[${size}px] leading-tight ${weight} truncate`} style={{ color: ink, fontSize: Number(size) }}>
                Ag
              </p>
              <p className="text-[6px] font-semibold uppercase tracking-wide mt-0.5" style={{ color: muted }}>
                {name} · {size}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-2.5 border-t pt-2" style={{ borderColor: "rgba(20,19,16,0.12)" }}>
          <p className="text-[8px] font-bold uppercase tracking-wide" style={{ color: ink }}>Color tokens</p>
          <div className="grid grid-cols-4 gap-1.5 mt-1.5">
            {chips.map(([label, bg, textColor]) => (
              <div key={label as string} className="flex flex-col items-center">
                <div className="w-full h-6 rounded-soft-sm border border-black/10" style={{ background: bg as string }} />
                <p className="text-[6.5px] font-semibold mt-0.5" style={{ color: muted }}>
                  {label}
                </p>
                <p className="text-[6px] font-mono" style={{ color: muted }}>{bg}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-2.5 border-t pt-2" style={{ borderColor: "rgba(20,19,16,0.12)" }}>
          <div className="grid grid-cols-2 gap-1.5">
            <div>
              <p className="text-[8px] font-bold uppercase tracking-wide mb-1.5" style={{ color: ink }}>Buttons</p>
              <div className="space-y-1">
                <div className="rounded-[5px] bg-[#141310] text-[#f4efe7] text-[8px] font-bold text-center py-1">Primary</div>
                <div className="rounded-[5px] border border-[#141310] text-[#141310] text-[8px] font-bold text-center py-1">Secondary</div>
                <div className="rounded-[5px] text-[#141310] text-[8px] font-bold text-center py-1" style={{ boxShadow: "inset 0 0 0 2px #e8ff47" }}>
                  Focus ring
                </div>
              </div>
            </div>
            <div>
              <p className="text-[8px] font-bold uppercase tracking-wide mb-1.5" style={{ color: ink }}>Form states</p>
              <div className="space-y-1">
                <div className="rounded-[5px] border border-[#141310]/25 px-2 py-1 text-[7px]" style={{ color: muted }}>
                  Placeholder text
                </div>
                <div className="rounded-[5px] border border-[#141310] px-2 py-1 text-[7px] font-semibold" style={{ color: ink }}>
                  Active field
                </div>
                <div className="rounded-[5px] border border-[#c81e1e] px-2 py-1 text-[7px] font-semibold" style={{ color: "#c81e1e" }}>
                  Error — required
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2.5 border-t pt-2 flex items-center justify-between" style={{ borderColor: "rgba(20,19,16,0.12)" }}>
          <div className="flex items-center gap-1.5">
            {icons.map((g) => (
              <span key={g} className="w-4 h-4 rounded-[4px] border border-black/10 flex items-center justify-center text-[8px]" style={{ background: "rgba(20,19,16,0.05)", color: ink }}>
                {g}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[6.5px]" style={{ color: muted }}>Toggle</span>
            <div className="w-7 h-3.5 rounded-pill bg-[#141310] flex items-center justify-end px-[2px]">
              <div className="w-2.5 h-2.5 rounded-pill bg-[#e8ff47]" />
            </div>
          </div>
        </div>

        <div className="mt-2.5 border-t pt-2" style={{ borderColor: "rgba(20,19,16,0.12)" }}>
          <div className="flex items-center justify-between">
            <p className="text-[8px] font-bold uppercase tracking-wide" style={{ color: ink }}>Spacing · 4px base</p>
            <div className="flex items-end gap-1">
              {[4, 8, 12, 16, 24, 32].map((s) => (
                <div key={s} className="rounded-[1px]" style={{ width: 3, height: Math.min(s, 28), background: ink, opacity: 0.25 + (s / 64) }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
