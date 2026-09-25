import { useId } from "react";

interface LogoProps {
  /** Pixel size (square). @default 28 */
  size?: number;
  className?: string;
}

/**
 * Mike Waitindi personal mark — "MW" monogram.
 *
 * M and W are drawn as ONE continuous path sharing the centre stem:
 * M's valley (left) is W's peak (right), reading as "MW" and as a single
 * idea→ship timeline. The accent chip in the centre is the "shipped" node.
 *
 * CurrentColor keeps it theme-aware (light/dark); corners are square to
 * match the brutalist system (radius 0).
 */
export default function Logo({ size = 28, className }: LogoProps) {
  const id = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {/* M's right valley & W's left valley share the centre stem (x=16) */}
      <path
        d="M2 25V8.2L9 17l4.5-5.5V25"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <path
        d="M30 25V8.2L23 17l-4.5-5.5V25"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      {/* Accent chip: the shared centre node (also the dot of a "ship" cursor) */}
      <rect
        x="13"
        y="10"
        width="6"
        height="6"
        fill="var(--accent)"
        className="transition-transform duration-300 group-hover:rotate-45"
      />
    </svg>
  );
}
