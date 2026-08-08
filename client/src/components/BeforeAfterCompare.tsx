import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useInView, prefersReducedMotion } from "@/hooks/useInView";

const REDUCED = prefersReducedMotion();

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

function PhoneFace({ children, tone }: { children: React.ReactNode; tone: "before" | "after" }) {
  return (
    <div
      className={`w-full max-w-[220px] mx-auto rounded-3xl border bg-card p-2.5 shadow-[0_16px_40px_rgba(20,19,16,0.12)] ${
        tone === "before" ? "border-foreground/25" : "border-foreground/50"
      }`}
    >
      <div className="relative overflow-hidden rounded-[18px] bg-secondary aspect-[9/17]">
        <span
          aria-hidden
          className="absolute top-1.5 left-1/2 -translate-x-1/2 w-12 h-1.5 rounded-full bg-foreground/30"
        />
        <div className="pt-6 px-3 pb-3 flex flex-col gap-2.5 h-full">{children}</div>
      </div>
    </div>
  );
}

function CardFace({ children, tone }: { children: React.ReactNode; tone: "before" | "after" }) {
  return (
    <div
      className={`w-full border bg-card p-4 ${
        tone === "before" ? "border-foreground/25" : "border-foreground/50"
      }`}
    >
      {children}
    </div>
  );
}

export default function BeforeAfterCompare({
  variant,
  beforeLabel,
  afterLabel,
  beforeArt,
  afterArt,
  counterFrom,
  counterTo,
  note,
  fromNote,
  toNote,
}: {
  variant: "phone" | "card";
  beforeLabel: string;
  afterLabel: string;
  beforeArt: React.ReactNode;
  afterArt: React.ReactNode;
  counterFrom: number;
  counterTo: number;
  note?: string;
  fromNote?: string;
  toNote?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(100);
  const [counter, setCounter] = useState<string | null>(REDUCED ? `${counterFrom} → ${counterTo}` : null);
  const [counted, setCounted] = useState(REDUCED);
  const [isMobile, setIsMobile] = useState(false);
  const dragging = useRef(false);
  const drawn = useRef(false);
  const raf = useRef(0);

  const Face = variant === "phone" ? PhoneFace : CardFace;

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsMobile(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const startCounter = useCallback(() => {
    if (drawn.current) return;
    drawn.current = true;
    if (REDUCED) return;
    const start = performance.now();
    const dur = 700;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const v = Math.round(counterFrom + (counterTo - counterFrom) * easeOutQuart(p));
      setCounter(`${v} → ${counterTo}`);
      if (p >= 1) {
        setCounter(`${counterFrom} → ${counterTo}`);
        setCounted(true);
        return;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, [counterFrom, counterTo]);

  useEffect(() => {
    return () => cancelAnimationFrame(raf.current);
  }, []);

  useInView(wrapRef, (inView) => {
    if (inView) startCounter();
  });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isMobile) return;
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    updatePos(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    updatePos(e.clientX);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };
  const updatePos = (clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100));
    setPos(p);
  };

  const labelChip = (label: string, tone: "before" | "after") => (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[10px] tracking-widest uppercase ${
        tone === "before"
          ? "border border-rose-400/60 text-rose-400"
          : "bg-accent text-accent-foreground"
      }`}
    >
      {label}
    </span>
  );

  return (
    <div ref={wrapRef} className="space-y-4">
      {isMobile ? (
        <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2">
          <div className="snap-start shrink-0 w-[calc(100%-3rem)]">
            <div className="mb-2">{labelChip(beforeLabel, "before")}</div>
            <Face tone="before">{beforeArt}</Face>
            {fromNote && <p className="mt-2 text-[11px] text-muted-foreground leading-snug">{fromNote}</p>}
          </div>
          <div className="snap-start shrink-0 w-[calc(100%-3rem)]">
            <div className="mb-2">{labelChip(afterLabel, "after")}</div>
            <Face tone="after">{afterArt}</Face>
            {toNote && <p className="mt-2 text-[11px] text-muted-foreground leading-snug">{toNote}</p>}
          </div>
        </div>
      ) : (
        <div
          className="relative select-none touch-none cursor-ew-resize"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div className="flex items-center justify-between mb-2">
            {labelChip(beforeLabel, "before")}
            {labelChip(afterLabel, "after")}
          </div>

          <div className="relative">
            <Face tone="before">{beforeArt}</Face>
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
              aria-hidden
            >
              <Face tone="after">{afterArt}</Face>
            </div>
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-accent pointer-events-none"
              style={{ left: `calc(${pos}% - 1px)` }}
              aria-hidden
            >
              <span className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-accent border-2 border-background shadow" />
            </div>
          </div>

          <div className="mt-3 flex justify-center">
            <button
              type="button"
              aria-label="Reveal before state"
              onClick={() => setPos(0)}
              className="w-8 h-8 border border-border text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Reveal after state"
              onClick={() => setPos(100)}
              className="w-8 h-8 border border-border text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              ›
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-center gap-3 pt-1">
        <span
              className={`font-mono text-2xl font-bold transition-colors duration-300 ${
                counter !== null && !counted ? "text-accent" : "text-foreground"
              }`}
            >
              {counter ?? ""}
            </span>
            {variant === "card" && (
              <svg width="30" height="10" viewBox="0 0 30 10" fill="none" aria-hidden>
                <path
                  d="M1 5h26M22 1l5 4-5 4"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`arrow-draw ${counted ? "drawn" : ""}`}
                  pathLength={1}
                />
              </svg>
            )}
      </div>
      {note && (
        <p className="text-center text-xs font-mono uppercase tracking-widest text-muted-foreground">
          {note}
        </p>
      )}
    </div>
  );
}
