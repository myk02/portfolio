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

export function CountUp({
  value,
  className = "",
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const match = value.match(/^([\d.,]+)(.*)$/);
    if (!match || prefersReducedMotion()) {
      setDisplay(value);
      return;
    }
    const target = parseFloat(match[1].replace(/,/g, ""));
    const suffix = match[2];
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
            const formatted = Number.isInteger(target)
              ? String(Math.round(target * eased))
              : (target * eased).toFixed(match[1].includes(".") ? 1 : 0);
            setDisplay(`${formatted}${suffix}`);
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
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
