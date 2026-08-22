import { Sun, Moon, Download, Mail, Linkedin } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import BuyMeCoffee from "./BuyMeCoffee";

interface BrandEdgeFooterProps {
  onNavClick: (id: string) => void;
}

const TOOLS = ["React", "TypeScript", "Tailwind", "Convex", "Playwright"];
const PROCESS = ["Discover", "Define", "Design", "Validate"];

export default function BrandEdgeFooter({ onNavClick }: BrandEdgeFooterProps) {
  const year = new Date().getFullYear();
  const { theme, toggleTheme } = useTheme();

  return (
    <footer className="bg-primary border-t border-border text-primary-foreground">
      <div className="container py-12 lg:py-14">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-10 lg:gap-12">
            {/* brand */}
            <div>
              <button
                type="button"
                onClick={() => onNavClick("home")}
                className="font-display font-bold text-2xl text-primary-foreground hover:text-accent transition-colors"
              >
                Mike Waitindi
              </button>
              <p className="text-sm text-primary-foreground/70 mt-2 max-w-xs leading-relaxed">
                Web developer &amp; frontend engineer — reliable, accessible
                web products from design to deployment. Nairobi · remote.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {TOOLS.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider border border-primary-foreground/20 text-primary-foreground/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* nav */}
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-accent mb-4">
                Navigate
              </p>
              <nav className="flex flex-col gap-2.5">
                {[
                  { id: "work", label: "Work & case studies" },
                  { id: "engineering", label: "Engineering evidence" },
                  { id: "about", label: "About" },
                  { id: "contact", label: "Contact" },
                ].map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => onNavClick(link.id)}
                    className="text-sm text-left text-primary-foreground/75 hover:text-accent transition-colors w-fit"
                  >
                    {link.label}
                  </button>
                ))}
                <a
                  href="/CV.pdf"
                  download
                  className="inline-flex items-center gap-1.5 text-sm text-primary-foreground/75 hover:text-accent transition-colors w-fit mt-1"
                >
                  <Download size={13} />
                  Download CV
                </a>
              </nav>
            </div>

            {/* process + contact */}
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-accent mb-4">
                Design process
              </p>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {PROCESS.map((p, i) => (
                  <span key={p} className="flex items-center gap-1.5 text-xs text-primary-foreground/75">
                    {i > 0 && <span className="text-accent">→</span>}
                    {p}
                  </span>
                ))}
              </div>
              <div className="space-y-2">
                <a
                  href="mailto:mikegary201@gmail.com"
                  className="flex items-center gap-2 text-sm text-primary-foreground/75 hover:text-accent transition-colors"
                >
                  <Mail size={14} />
                  mikegary201@gmail.com
                </a>
                <a
                  href="https://linkedin.com/in/mike-waitindi-654bb2344"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary-foreground/75 hover:text-accent transition-colors"
                >
                  <Linkedin size={14} />
                  LinkedIn
                </a>
                <a
                  href="https://wa.me/254792618156"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-foreground/75 hover:text-accent transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-primary-foreground/15 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-xs text-primary-foreground/50">
              © {year} Mike Waitindi · Built with React, TypeScript &amp;
              Tailwind — deployed on Vercel
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <BuyMeCoffee
                onDark
                label="Buy me a coffee"
                buttonClassName="border-primary-foreground/25 text-xs px-3 py-2"
              />
              {toggleTheme && (
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="inline-flex items-center gap-2 text-xs text-primary-foreground/60 hover:text-accent transition-colors w-fit"
                  aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
                >
                  {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
                  {theme === "dark" ? "Light mode" : "Dark mode"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
