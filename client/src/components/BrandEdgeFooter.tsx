interface BrandEdgeFooterProps {
  onNavClick: (id: string) => void;
}

export default function BrandEdgeFooter({ onNavClick }: BrandEdgeFooterProps) {
  const year = new Date().getFullYear();
  const navLinks = [
    { id: "work", label: "Work" },
    { id: "capabilities", label: "Capabilities" },
    { id: "process", label: "Process" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/brand1.png" alt="GMLink" className="w-7 h-7 object-contain" />
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
            &copy; {year} Mike Waitindi
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => onNavClick(link.id)}
              className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
            wrootmike@gmail.com
          </span>
        </div>
      </div>
    </footer>
  );
}
