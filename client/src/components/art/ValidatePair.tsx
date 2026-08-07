function PhoneFace({
  tone,
  children,
}: {
  tone: "before" | "after";
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`w-[150px] rounded-3xl border bg-card p-2.5 shadow-[0_16px_40px_rgba(20,19,16,0.12)] ${
          tone === "before" ? "border-foreground/25" : "border-foreground/50"
        }`}
      >
        <div className="relative overflow-hidden rounded-[18px] bg-secondary aspect-[9/17]">
          <span
            aria-hidden
            className="absolute top-1.5 left-1/2 -translate-x-1/2 w-12 h-1.5 rounded-full bg-foreground/30"
          />
          <div className="pt-6 px-3 pb-3 flex flex-col gap-2.5">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function ValidatePair({
  before,
  after,
  beforeArt,
  afterArt,
}: {
  before: { label: string; note: string };
  after: { label: string; note: string };
  beforeArt: React.ReactNode;
  afterArt: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-[1fr_auto_1fr] gap-4 sm:gap-8 items-start">
      <figure className="flex flex-col items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-rose-400/60 text-rose-400 font-mono text-[10px] tracking-widest uppercase mb-1">
          {before.label}
        </span>
        <PhoneFace tone="before">{beforeArt}</PhoneFace>
        <figcaption className="text-center text-[11px] text-muted-foreground leading-snug max-w-[180px]">
          {before.note}
        </figcaption>
      </figure>

      <div className="hidden sm:flex items-center self-center justify-center pt-8" aria-hidden>
        <span className="font-mono text-xs text-muted-foreground">→</span>
      </div>

      <figure className="flex flex-col items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent text-accent-foreground font-mono text-[10px] tracking-widest uppercase mb-1">
          {after.label}
        </span>
        <PhoneFace tone="after">{afterArt}</PhoneFace>
        <figcaption className="text-center text-[11px] text-muted-foreground leading-snug max-w-[180px]">
          {after.note}
        </figcaption>
      </figure>
    </div>
  );
}
