import { useEffect, useRef } from "react";

/* Single shared IntersectionObserver for the whole app.
   Every component that needs enter/exit detection reuses this one instance. */
const callbacks = new WeakMap<Element, (inView: boolean) => void>();
let shared: IntersectionObserver | null = null;

function getShared(): IntersectionObserver | null {
  if (typeof IntersectionObserver === "undefined") return null;
  if (!shared) {
    shared = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          callbacks.get(entry.target)?.(entry.isIntersecting);
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -6% 0px" },
    );
  }
  return shared;
}

export function useInView(
  ref: React.RefObject<Element | null>,
  cb: (inView: boolean) => void,
) {
  const cbRef = useRef(cb);
  cbRef.current = cb;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = getShared();
    if (!io) return;
    callbacks.set(el, (v) => cbRef.current(v));
    io.observe(el);
    return () => {
      callbacks.delete(el);
      io.unobserve(el);
    };
  }, [ref]);
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
