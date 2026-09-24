import { useEffect } from "react";

/**
 * Progressive-enhancement fallback for any raw `[data-reveal]` elements
 * (non-motion path). The main `Reveal` component now animates with
 * framer-motion `whileInView`, so this only covers hand-written markup.
 *
 * - Triggers slightly before the element enters (rootMargin bottom -8%)
 * - Staggers via the CSS `--i` custom property
 * - Watches for late-mounted nodes (lazy routes, filters)
 * - Respects prefers-reduced-motion via CSS
 */
export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    const revealImmediatelyIfVisible = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.top < vh * 0.92 && rect.bottom > 0) {
        el.classList.add("in-view");
        return true;
      }
      return false;
    };

    const observeAll = () => {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]:not(.in-view)")
        .forEach((el) => {
          if (!revealImmediatelyIfVisible(el)) io.observe(el);
        });
    };

    observeAll();

    const mo = new MutationObserver(() => observeAll());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}
