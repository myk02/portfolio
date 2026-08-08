import { useRef, useState } from "react";
import { Check } from "lucide-react";
import { useInView, prefersReducedMotion } from "@/hooks/useInView";

const REDUCED = prefersReducedMotion();

export default function DirectionPair() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"idle" | "struck" | "won">(REDUCED ? "won" : "idle");
  const played = useRef(REDUCED);

  useInView(wrapRef, (inView) => {
    if (!inView || played.current) return;
    played.current = true;
    if (REDUCED) {
      setPhase("won");
      return;
    }
    window.setTimeout(() => setPhase("struck"), 350);
    window.setTimeout(() => setPhase("won"), 650);
  });

  return (
    <div ref={wrapRef} className="grid sm:grid-cols-2 gap-4 sm:gap-6">
      <figure
        className={`flex flex-col items-center gap-2.5 transition-[transform,opacity,filter] duration-300 ease-out ${
          phase === "won" ? "opacity-55 blur-[1px] translate-y-2" : ""
        }`}
      >
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-rose-400/60 text-rose-400 font-mono text-[10px] tracking-widest uppercase">
          Direction A ✗
        </span>
        <div className="relative w-[190px] sm:w-[250px] rounded-3xl border border-foreground/25 bg-[#141310] p-2.5 shadow-[0_16px_40px_rgba(20,19,16,0.12)]">
          <div className="relative overflow-hidden rounded-[18px] bg-[#1b222c] aspect-[9/17]">
            <span aria-hidden className="absolute top-1.5 left-1/2 -translate-x-1/2 w-12 h-1.5 rounded-full bg-white/25" />
            <div className="pt-7 px-3 pb-3 flex flex-col gap-2">
              <div className="h-3 w-2/3 rounded-full bg-white/20" />
              <div className="h-10 bg-white/10 rounded" />
              <div className="h-2.5 w-1/2 rounded-full bg-white/15" />
              <div className="h-3 w-full rounded bg-white/20" />
              <div className="h-6 rounded bg-white/25" />
              <div className="h-6 rounded bg-white/10" />
            </div>
            <span
              aria-hidden
              className={`absolute left-0 right-0 top-1/2 h-[3px] bg-rose-400 origin-left transition-transform duration-300 ease-out ${
                phase === "idle" ? "scale-x-0" : "scale-x-100"
              }`}
            />
          </div>
        </div>
        <figcaption className="text-center text-[11px] text-muted-foreground leading-snug max-w-[210px]">
          Dark fintech — felt heavy
        </figcaption>
      </figure>

      <figure
        className={`flex flex-col items-center gap-2.5 transition-transform duration-300 ease-out ${
          phase === "won" ? "-translate-y-2" : ""
        }`}
      >
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-accent text-accent-foreground font-mono text-[10px] tracking-widest uppercase">
          Direction B ✓
        </span>
        <div className="relative w-[190px] sm:w-[250px] rounded-3xl border border-foreground/50 bg-card p-2.5 shadow-[0_16px_40px_rgba(20,19,16,0.12)]">
          <div className="relative overflow-hidden rounded-[18px] bg-[#f4efe7] aspect-[9/17]">
            <span aria-hidden className="absolute top-1.5 left-1/2 -translate-x-1/2 w-12 h-1.5 rounded-full bg-[#141310]/25" />
            <div className="pt-6 px-3 pb-3 flex flex-col gap-2">
              <div className="rounded bg-[#141310] p-2">
                <div className="h-1.5 w-1/3 rounded-full bg-[#f4efe7]/50" />
                <div className="mt-1 h-3 w-2/3 rounded bg-[#f4efe7]" />
              </div>
              <div className="flex items-center gap-1.5">
                <div className="relative w-8 h-8 shrink-0">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <circle cx="18" cy="18" r="15" fill="none" stroke="#141310" strokeOpacity="0.12" strokeWidth="4" />
                    <circle cx="18" cy="18" r="15" fill="none" stroke="#e8ff47" strokeWidth="4" strokeLinecap="round" strokeDasharray={`${0.68 * 2 * Math.PI * 15} ${2 * Math.PI * 15}`} />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-[6px] font-bold text-[#141310]">68%</span>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="h-1.5 w-3/4 rounded-full bg-[#141310]/70" />
                  <div className="h-1.5 w-1/2 rounded-full bg-[#141310]/25" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-5 rounded bg-[#141310]/[0.07]" />
                ))}
              </div>
              <div className="mt-auto rounded bg-[#141310] py-1.5 text-center">
                <span className="text-[7px] font-bold text-[#f4efe7]">Saving goal</span>
              </div>
            </div>
            <span
              aria-hidden
              className={`absolute top-2 right-2 w-6 h-6 rounded-full bg-accent grid place-items-center transition-transform duration-[250ms] ease-out ${
                phase === "won" ? "scale-100" : "scale-0"
              }`}
            >
              <Check size={14} strokeWidth={3} className="text-accent-foreground" />
            </span>
          </div>
        </div>
        <figcaption className="text-center text-[11px] text-muted-foreground leading-snug max-w-[210px]">
          Savings-first — won
        </figcaption>
      </figure>
    </div>
  );
}
