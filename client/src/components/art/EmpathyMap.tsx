const quadrants: {
  key: "says" | "does" | "thinks" | "feels";
  label: string;
}[] = [
  { key: "says", label: "Says" },
  { key: "does", label: "Does" },
  { key: "thinks", label: "Thinks" },
  { key: "feels", label: "Feels" },
];

export default function EmpathyMap({
  board,
}: {
  board: { says: string[]; does: string[]; thinks: string[]; feels: string[] };
}) {
  return (
    <div className="border border-border bg-card p-4 sm:p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          Empathy map — 23-year-old, irregular income
        </p>
        <span className="text-[10px] font-mono uppercase tracking-widest text-accent">
          4 quadrants
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {quadrants.map((q, i) => (
          <div
            key={q.key}
            className="border border-border bg-secondary p-4"
            style={{ ["--i" as string]: i }}
            data-reveal
          >
            <p className="text-[11px] font-mono uppercase tracking-widest text-foreground mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-accent shrink-0" />
              {q.label}
            </p>
            <ul className="space-y-1.5">
              {board[q.key].map((line) => (
                <li key={line} className="text-sm text-muted-foreground leading-snug">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
