import { useId } from "react";

interface LogoProps {
  /** Pixel size (square). @default 28 */
  size?: number;
  className?: string;
}

/**
 * Mike Waitindi monogram — "MW".
 * Clear, distinct, sharp geometric letterforms matching the editorial theme.
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
      <text
        x="16"
        y="22"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontWeight="700"
        fontSize="15"
        letterSpacing="0.05em"
        fill="currentColor"
      >
        MW
      </text>
    </svg>
  );
}
