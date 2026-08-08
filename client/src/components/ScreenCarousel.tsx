import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useInView, prefersReducedMotion } from "@/hooks/useInView";

export interface CarouselItem {
  name: string;
  caption: string;
  art: React.ReactNode;
}

const REDUCED = prefersReducedMotion();
const CYCLE_MS = 3500;

export default function ScreenCarousel({ items }: { items: CarouselItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const syncing = useRef(false);
  const lastScroll = useRef(0);

  const goTo = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const target = Math.min(items.length - 1, Math.max(0, i));
    const slide = slideRefs.current[target];
    if (!slide) return;
    track.scrollTo({ left: slide.offsetLeft - 8, behavior: "smooth" });
  }, [items.length]);

  useInView(trackRef, (v) => setInView(v));

  /* auto-advance — 3.5s per card, pauses on hover / out of view / reduced motion */
  useEffect(() => {
    if (REDUCED || !inView || hovered || items.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % items.length;
        goTo(next);
        return next;
      });
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [inView, hovered, items.length, goTo]);

  /* sync active index from manual swipe (rAF, no scroll-handler animation) */
  useEffect(() => {
    if (REDUCED) return;
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const sync = () => {
      raf = 0;
      const scroll = track.scrollLeft;
      if (Math.abs(scroll - lastScroll.current) < 2) return;
      lastScroll.current = scroll;
      const w = track.clientWidth;
      const i = Math.round(scroll / w);
      setIndex(Math.min(items.length - 1, Math.max(0, i)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(sync);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [items.length]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-px-1 pb-4"
      >
        {items.map((item, i) => (
          <div
            key={item.name}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            className="snap-start shrink-0 w-[calc(100%-3rem)] sm:w-[280px] flex flex-col gap-2.5"
          >
            <div className="relative aspect-[9/16] max-h-[430px] w-full border border-border bg-card p-2 overflow-hidden">
              <div
                className={`absolute inset-2 overflow-hidden ${i === index && !REDUCED ? "carousel-kb" : ""}`}
              >
                {item.art}
              </div>
              {i === index && !REDUCED && (
                <span
                  key={`bar-${index}`}
                  className="absolute bottom-3 left-3 right-3 h-[3px] bg-foreground/10 overflow-hidden"
                >
                  <span className="carousel-bar block h-full bg-accent" />
                </span>
              )}
            </div>
            <p className="text-[11px] font-mono uppercase tracking-widest text-foreground">{item.name}</p>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-[200px]">{item.caption}</p>
          </div>
        ))}
      </div>

      {!REDUCED && items.length > 1 && (
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-0 pointer-events-none">
          <button
            type="button"
            aria-label="Previous screen"
            onClick={() => goTo(index - 1)}
            className="pointer-events-auto w-9 h-9 -ml-3 sm:-ml-4 grid place-items-center bg-background border border-border text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <ArrowLeft size={15} />
          </button>
          <button
            type="button"
            aria-label="Next screen"
            onClick={() => goTo(index + 1)}
            className="pointer-events-auto w-9 h-9 -mr-3 sm:-mr-4 grid place-items-center bg-background border border-border text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <ArrowRight size={15} />
          </button>
        </div>
      )}
    </div>
  );
}
