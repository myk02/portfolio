import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Variant = "up" | "left" | "right" | "scale" | "fade" | "none";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function hiddenState(variant: Variant) {
  switch (variant) {
    case "left":
      return { opacity: 0, x: -36, y: 0, scale: 1, filter: "blur(4px)" };
    case "right":
      return { opacity: 0, x: 36, y: 0, scale: 1, filter: "blur(4px)" };
    case "scale":
      return { opacity: 0, x: 0, y: 24, scale: 0.94, filter: "blur(4px)" };
    case "fade":
      return { opacity: 0, x: 0, y: 0, scale: 1, filter: "blur(4px)" };
    case "none":
      return { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" };
    case "up":
    default:
      return { opacity: 0, x: 0, y: 32, scale: 1, filter: "blur(4px)" };
  }
}

const shownState = {
  opacity: 1,
  x: 0,
  y: 0,
  scale: 1,
  filter: "blur(0px)",
};

/**
 * Scroll-triggered reveal — animates once when the element scrolls into view.
 * Backward compatible with the old `scale` + `as` + numeric `delay` API.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
  scale = false,
  variant,
  y,
  once = true,
  ...rest
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "span" | "li" | "article" | "header" | "p" | "h2" | "h3";
  scale?: boolean;
  variant?: Variant;
  /** Override travel distance (px) for the `up` variant. */
  y?: number;
  once?: boolean;
  [key: string]: unknown;
}) {
  const resolved: Variant =
    variant ?? (scale ? "scale" : "up");
  if (resolved === "none") {
    const Tag = as as "div";
    return <Tag className={className}>{children}</Tag>;
  }

  const hidden = hiddenState(resolved);
  if (typeof y === "number" && resolved === "up") hidden.y = y;

  const Tag = (motion as unknown as Record<string, typeof motion.div>)[as] ?? motion.div;

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-64px", amount: 0.18 }}
      variants={{
        hidden,
        show: {
          ...shownState,
          transition: {
            duration: 0.75,
            ease: EASE,
            delay: Math.min(Math.max(delay, 0), 6) * 0.1,
          },
        },
      }}
      {...(rest as object)}
    >
      {children}
    </Tag>
  );
}
