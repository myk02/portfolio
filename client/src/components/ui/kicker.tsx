import { Surface } from "@/components/ui/section";

export function Kicker({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`text-[10px] font-mono uppercase tracking-widest text-muted-foreground ${className}`}>
      {children}
    </span>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <Surface className={className}>{children}</Surface>;
}

export function Chip({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`px-2 py-1 text-[10px] font-mono uppercase tracking-widest border border-border bg-card text-muted-foreground ${className}`}>
      {children}
    </span>
  );
}

export function ChipAccent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest bg-accent text-accent-foreground border border-foreground/10 font-medium ${className}`}>
      {children}
    </span>
  );
}
