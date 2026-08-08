import { useEffect, useRef, useState } from "react";
import type { MetricRow } from "@/data/caseVisuals";
import { Reveal } from "@/components/Reveal";
import { useInView, prefersReducedMotion } from "@/hooks/useInView";

const REDUCED = prefersReducedMotion();

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

function AnimatedCell({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(text);
  const [counting, setCounting] = useState(false);
  const started = useRef(false);
  const raf = useRef(0);
  const [run, setRun] = useState(REDUCED);

  const m = text.match(/^([^\d]*)(-?[\d.,]+)(.*)$/);
  const prefix = m?.[1] ?? "";
  const num = m?.[2] ?? "";
  const suffix = m?.[3] ?? "";
  const target = parseFloat(num.replace(/,/g, "").replace(/\.$/, "")) || NaN;
  const decimals = num.includes(".") ? num.split(".")[1]?.length ?? 1 : 0;

  useEffect(() => {
    if (!m || isNaN(target) || !run || REDUCED) return;
    setCounting(true);
    const start = performance.now();
    const dur = 700;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const v = target * easeOutQuart(p);
      const shown = decimals > 0 ? v.toFixed(decimals) : String(Math.round(v));
      setDisplay(`${prefix}${shown}${suffix}`);
      if (p < 1) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setCounting(false);
      }
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [run, text]); // eslint-disable-line react-hooks/exhaustive-deps

  useInView(ref, (inView) => {
    if (inView && !started.current) {
      started.current = true;
      setRun(true);
    }
  });

  return (
    <span
      ref={ref}
      className="transition-colors duration-500"
      style={{ color: counting ? "var(--accent)" : undefined }}
    >
      {display}
    </span>
  );
}

export default function MetricTable({
  metrics,
  roadmap,
}: {
  metrics: MetricRow[];
  roadmap: string[];
}) {
  return (
    <div className="space-y-4">
      <div className="border border-border bg-card overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-2.5 text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Metric</th>
              <th className="px-4 py-2.5 text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Baseline</th>
              <th className="px-4 py-2.5 text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Target</th>
              <th className="px-4 py-2.5 text-[11px] font-mono uppercase tracking-widest text-accent">Result</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map((m, i) => (
              <tr
                key={m.metric}
                className="border-b border-border last:border-b-0"
                style={{ ["--i" as string]: i }}
                data-reveal
              >
                <td className="px-4 py-3 text-sm text-foreground font-medium">{m.metric}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  <AnimatedCell text={m.baseline} />
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  <AnimatedCell text={m.target} />
                </td>
                <td className="px-4 py-3 text-sm font-semibold bg-accent/10 text-foreground">
                  <span className="inline-flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent shrink-0" />
                    <AnimatedCell text={m.result} />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border border-border bg-card p-4">
        <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground mb-3">
          Next — V2 roadmap
        </p>
        <div className="flex flex-wrap gap-2">
          {roadmap.map((item, i) => (
            <span
              key={item}
              className="inline-flex items-center gap-2 px-3 py-1.5 border border-border text-xs text-foreground"
            >
              <span className="font-mono text-[10px] text-accent">V2.{i + 1}</span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
