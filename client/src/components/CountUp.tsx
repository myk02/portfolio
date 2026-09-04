import { useEffect, useRef, useState } from "react";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

/** Animate only plain integers with an optional suffix like 10+ — not "4→3". */
function parseCountable(value: string): { target: number; suffix: string } | null {
  const match = value.match(/^(\d+)(\+)?$/);
  if (!match) return null;
  return { target: Number(match[1]), suffix: match[2] ?? "" };
}

export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const parsed = parseCountable(value);
    if (!parsed || prefersReducedMotion()) {
      setDisplay(value);
      return;
    }
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let ran = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !ran) {
          ran = true;
          const start = performance.now();
          const dur = 800;
          const tick = (now: number) => {
            const p = Math.min((now - start) / dur, 1);
            const eased = easeOutQuart(p);
            setDisplay(`${Math.round(parsed.target * eased)}${parsed.suffix}`);
            if (p < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [value]);

  return (
    <span ref={ref}>
      {display}
    </span>
  );
}
