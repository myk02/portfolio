import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react";

export interface LightboxItem {
  src: string;
  alt: string;
  caption?: string;
}

interface Entry extends LightboxItem {
  el: HTMLElement;
}

interface LightboxApi {
  register: (entry: Entry) => () => void;
  open: (el: HTMLElement) => void;
}

const LightboxContext = createContext<LightboxApi | null>(null);

/** Provides a single keyboard-accessible lightbox for every image inside it. */
export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const entries = useRef<Entry[]>([]);
  const [items, setItems] = useState<LightboxItem[]>([]);
  const [index, setIndex] = useState<number | null>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const register = useCallback((entry: Entry) => {
    // Deduplicate by element (React strict-mode double mount)
    entries.current = entries.current.filter((e) => e.el !== entry.el);
    entries.current.push(entry);
    return () => {
      entries.current = entries.current.filter((e) => e.el !== entry.el);
    };
  }, []);

  const open = useCallback((el: HTMLElement) => {
    /* Deduplicate then order by document position so ←/→ follows reading order */
    const unique = Array.from(new Map(entries.current.map((e) => [e.el, e])).values());
    const ordered = [...unique].sort((a, b) =>
      a.el.compareDocumentPosition(b.el) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
    );
    const i = ordered.findIndex((e) => e.el === el);
    lastFocused.current = document.activeElement as HTMLElement | null;
    setItems(ordered.map(({ src, alt, caption }) => ({ src, alt, caption })));
    setIndex(i < 0 ? 0 : i);
  }, []);

  const close = useCallback(() => {
    setIndex(null);
    lastFocused.current?.focus?.();
  }, []);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setIndex((i) => (i === null ? i : (i + 1) % items.length));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length));
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [index, items.length, close]);

  const api = useMemo(() => ({ register, open }), [register, open]);
  const current = index === null ? null : items[index];

  return (
    <LightboxContext.Provider value={api}>
      {children}
      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.caption ?? current.alt}
          className="lightbox fixed inset-0 z-[120] flex flex-col bg-[#0b0a08]/95 backdrop-blur-sm"
          onClick={close}
        >
          <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-[#f2ede6]/15">
            <p className="text-[11px] font-mono uppercase tracking-widest text-[#f2ede6]/70">
              {items.length > 1 ? `${(index ?? 0) + 1} / ${items.length}` : "Full size"}
            </p>
            <button
              type="button"
              onClick={close}
              autoFocus
              aria-label="Close image viewer (Esc)"
              className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#f2ede6] border border-[#f2ede6]/25 hover:bg-[#e8ff47] hover:text-[#141310] hover:border-[#e8ff47] transition-colors"
            >
              <X size={15} />
              Close
            </button>
          </div>

          <div
            className="flex-1 min-h-0 flex items-center justify-center gap-2 sm:gap-4 px-3 sm:px-6 py-4"
            onClick={(e) => e.stopPropagation()}
          >
            {items.length > 1 && (
              <button
                type="button"
                aria-label="Previous image"
                onClick={() => setIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length))}
                className="shrink-0 w-10 h-10 grid place-items-center border border-[#f2ede6]/25 text-[#f2ede6] hover:bg-[#e8ff47] hover:text-[#141310] transition-colors"
              >
                <ArrowLeft size={17} />
              </button>
            )}
            <img
              src={current.src}
              alt={current.alt}
              className="max-h-full max-w-full object-contain"
            />
            {items.length > 1 && (
              <button
                type="button"
                aria-label="Next image"
                onClick={() => setIndex((i) => (i === null ? i : (i + 1) % items.length))}
                className="shrink-0 w-10 h-10 grid place-items-center border border-[#f2ede6]/25 text-[#f2ede6] hover:bg-[#e8ff47] hover:text-[#141310] transition-colors"
              >
                <ArrowRight size={17} />
              </button>
            )}
          </div>

          <div className="px-4 sm:px-6 py-3 border-t border-[#f2ede6]/15 text-center">
            <p className="text-sm text-[#f2ede6]">{current.caption ?? current.alt}</p>
            <p className="mt-1 text-[10px] font-mono uppercase tracking-widest text-[#f2ede6]/50">
              Esc to close{items.length > 1 ? " · ← → to browse" : ""}
            </p>
          </div>
        </div>
      )}
    </LightboxContext.Provider>
  );
}

interface ZoomImageProps {
  src: string;
  alt: string;
  caption?: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
  className?: string;
  imgClassName?: string;
  loading?: "lazy" | "eager";
  /** hide the hover hint (used for small thumbnails) */
  quiet?: boolean;
}

/** An image that opens in the lightbox. Falls back to a plain image outside a provider. */
export function ZoomImage({
  src,
  alt,
  caption,
  srcSet,
  sizes,
  width,
  height,
  className = "",
  imgClassName = "",
  loading = "lazy",
  quiet = false,
}: ZoomImageProps) {
  const api = useContext(LightboxContext);
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!api || !el) return;
    return api.register({ el, src, alt, caption });
  }, [api, src, alt, caption]);

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => api && ref.current && api.open(ref.current)}
      aria-label={`View full size: ${caption ?? alt}`}
      className={`group/zoom relative block w-full text-left overflow-hidden ${className}`}
    >
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        width={width}
        height={height}
        alt={alt}
        loading={loading}
        decoding="async"
        className={`w-full ${imgClassName}`}
      />
      {!quiet && (
        <span className="no-print pointer-events-none absolute bottom-2 right-2 inline-flex items-center gap-1.5 px-2 py-1 text-[10px] font-mono uppercase tracking-wider bg-[#141310]/85 text-[#f2ede6] opacity-0 group-hover/zoom:opacity-100 group-focus-visible/zoom:opacity-100 transition-opacity">
          <Maximize2 size={11} />
          View at full size
        </span>
      )}
    </button>
  );
}
