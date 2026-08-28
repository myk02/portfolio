import { useEffect } from "react";

export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (els.length === 0) return;

    // Reveal anything already near viewport immediately — prevents blank section on load/scroll
    const viewportH = window.innerHeight;
    els.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < viewportH * 1.15 && rect.bottom > -20) {
        el.classList.add("in-view");
      }
    });

    const remaining = els.filter((el) => !el.classList.contains("in-view"));
    if (remaining.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px 0px 0px" },
    );
    remaining.forEach((el) => io.observe(el));

    // Fast fallback — guarantee visibility even if observer stalls (fixes screenshot blank)
    const fallback = window.setTimeout(() => {
      remaining.forEach((el) => el.classList.add("in-view"));
      io.disconnect();
    }, 320);
    return () => {
      window.clearTimeout(fallback);
      io.disconnect();
    };
  }, []);
}
