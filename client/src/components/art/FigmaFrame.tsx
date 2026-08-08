/** Figma-style frame chrome — looks like a real design file export */
export default function FigmaFrame({
  tool = "Figma",
  frameName,
  children,
  selected = false,
  compact = false,
}: {
  tool?: "Figma" | "FigJam" | "Maze";
  frameName: string;
  children: React.ReactNode;
  selected?: boolean;
  compact?: boolean;
}) {
  const toolColor =
    tool === "FigJam" ? "#9747FF" : tool === "Maze" ? "#0052FF" : "#0D99FF";

  return (
    <div
      className={`flex flex-col shrink-0 ${compact ? "w-[140px] sm:w-[168px]" : "w-[180px] sm:w-[220px]"}`}
    >
      <div
        className="rounded-t-md overflow-hidden border border-[#2c2c2c]/20 shadow-[0_8px_32px_rgba(10,10,10,0.12)]"
        style={{ background: "#1e1e1e" }}
      >
        {/* title bar */}
        <div className="flex items-center gap-2 px-2 py-1.5 border-b border-white/10 bg-[#2c2c2c]">
          <div className="flex gap-1 shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
            <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
            <span className="w-2 h-2 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-[8px] font-mono text-white/50 truncate flex-1 text-center">
            {tool} — {frameName}
          </span>
        </div>

        {/* canvas */}
        <div
          className={`relative p-2 ${compact ? "min-h-[120px]" : "min-h-[160px] sm:min-h-[190px]"}`}
          style={{ background: "#262626" }}
        >
          <div
            className={`relative h-full rounded-sm overflow-hidden transition-shadow duration-300 ${
              selected ? "ring-2 ring-offset-2 ring-offset-[#262626]" : "ring-1 ring-white/10"
            }`}
            style={selected ? { boxShadow: `0 0 0 2px ${toolColor}` } : undefined}
          >
            {children}
          </div>
        </div>
      </div>

      {/* frame label — Figma purple chip */}
      <div className="mt-2 flex items-center gap-1.5">
        <span
          className="w-2 h-2 rounded-sm shrink-0"
          style={{ background: toolColor }}
        />
        <span className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground truncate">
          {frameName}
        </span>
      </div>
    </div>
  );
}
