export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
  scale = false,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  scale?: boolean;
}) {
  return (
    <Tag
      data-reveal
      className={`${scale ? "reveal-scale" : ""} ${className}`}
      style={{ ["--i" as string]: delay }}
    >
      {children}
    </Tag>
  );
}
