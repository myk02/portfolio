import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface BrandEdgeFooterProps {
  onNavClick: (id: string) => void;
}

export default function BrandEdgeFooter({ onNavClick }: BrandEdgeFooterProps) {
  const year = new Date().getFullYear();
  const { theme, toggleTheme } = useTheme();

  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <button
                type="button"
                onClick={() => onNavClick("home")}
                className="font-display font-bold text-lg text-foreground hover:text-accent transition-colors"
              >
                Mike Waitindi
              </button>
              <p className="text-sm text-muted-foreground mt-1">
                UI/UX Designer — Nairobi, Kenya
              </p>
            </div>

            <nav className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => onNavClick("work")}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Work
              </button>
              <button
                type="button"
                onClick={() => onNavClick("about")}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </button>
              <button
                type="button"
                onClick={() => onNavClick("contact")}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </button>
            </nav>
          </div>

          <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © {year} Mike Waitindi · Designed &amp; built by Mike Waitindi
            </p>
            <div className="flex items-center gap-4">
              <a
                href="mailto:mikegary201@gmail.com"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                mikegary201@gmail.com
              </a>
              <a
                href="https://linkedin.com/in/mike-waitindi-654bb2344"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://wa.me/254792618156"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                WhatsApp
              </a>
              {toggleTheme && (
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
                >
                  {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
