export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
  scale = false,
  id,
  ...rest
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  scale?: boolean;
  id?: string;
}) {
  return (
    <Tag
      id={id}
      data-reveal
      className={`${scale ? "reveal-scale" : ""} ${className}`}
      style={{ ["--i" as string]: delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
