import { useEffect, useState } from "react";

export const CHAPTERS = [
  { id: "research", label: "Research" },
  { id: "define", label: "Define" },
  { id: "ideate", label: "Ideate" },
  { id: "ui", label: "UI" },
  { id: "validate", label: "Validate" },
];

function jumpTo(id: string) {
  document.getElementById(`chapter-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function ChapterNav() {
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const els = CHAPTERS.map((c) => document.getElementById(`chapter-${c.id}`)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = CHAPTERS.findIndex((c) => document.getElementById(`chapter-${c.id}`) === entry.target);
            if (idx >= 0) setActive(idx);
          }
        });
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <nav
        aria-label="Case study chapters"
        className="hidden lg:flex fixed left-6 xl:left-10 top-1/2 -translate-y-1/2 z-40 flex-col gap-5"
      >
        {CHAPTERS.map((c, i) => (
          <button
            key={c.id}
            type="button"
            onClick={() => jumpTo(c.id)}
            className="group flex items-center gap-2.5 text-left"
            aria-current={active === i ? "step" : undefined}
          >
            <span
              className={`w-2.5 h-2.5 rounded-full border transition-colors ${
                active === i
                  ? "bg-accent border-accent"
                  : "border-foreground/30 group-hover:border-foreground/60"
              }`}
              style={{ ["--i" as string]: 0 }}
            />
            <span
              className={`text-xs transition-colors whitespace-nowrap ${
                active === i ? "font-bold text-foreground" : "text-muted-foreground group-hover:text-foreground"
              }`}
            >
              {c.label}
            </span>
          </button>
        ))}
      </nav>

      <div className="lg:hidden sticky top-16 z-30 bg-secondary/95 backdrop-blur border-b border-border">
        <nav aria-label="Case study chapters" className="container flex">
          {CHAPTERS.map((c, i) => (
            <button
              key={c.id}
              type="button"
              onClick={() => jumpTo(c.id)}
              className="group relative flex-1 py-2.5 text-center"
              aria-current={active === i ? "step" : undefined}
            >
              <span
                className={`block h-[3px] w-full transition-colors ${
                  i <= active ? "bg-accent" : "bg-foreground/15 group-hover:bg-foreground/30"
                }`}
              />
              <span
                className={`mt-1 block text-[10px] font-mono uppercase tracking-wider transition-colors ${
                  i === active ? "text-foreground font-bold" : "text-muted-foreground"
                }`}
              >
                {c.label}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
