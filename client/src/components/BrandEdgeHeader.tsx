import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Download } from "lucide-react";
import { useRoute } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";
import { goHomeToSection } from "@/lib/navigation";

interface BrandEdgeHeaderProps {
  onNavClick?: (id: string) => void;
}

export default function BrandEdgeHeader({ onNavClick }: BrandEdgeHeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [isHome] = useRoute("/");
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [isHome]);

  const handleNav = (id: string) => {
    if (isHome) {
      onNavClick?.(id);
    } else {
      goHomeToSection(id);
    }
    setIsMenuOpen(false);
  };

  const navLinks = [
    { id: "work", label: "Work" },
    { id: "process", label: "Process" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-secondary/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container h-16 flex items-center justify-between">
        <button
          type="button"
          onClick={() => handleNav("home")}
          className="font-display font-bold text-xl tracking-tight text-foreground hover:opacity-70 transition-opacity"
        >
          Mike Waitindi
        </button>

        <nav className="hidden md:flex items-center gap-6 xl:gap-8" aria-label="Primary">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNav(link.id)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </button>
          ))}
          <a
            href="/CV.pdf"
            download
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:opacity-70 transition-opacity"
          >
            <Download size={14} />
            Download CV
          </a>
        </nav>

        <div className="flex items-center gap-3">
          {toggleTheme && (
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}

          <button
            type="button"
            onClick={() => handleNav("contact")}
            className="hidden md:inline-flex btn btn-primary text-sm"
          >
            Get in touch
          </button>

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-secondary border-b border-border overflow-hidden"
          >
            <div className="container py-4 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleNav(link.id)}
                  className="block w-full text-left text-lg font-medium text-foreground hover:opacity-70 transition-opacity"
                >
                  {link.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => handleNav("contact")}
                className="btn btn-primary w-full text-center"
              >
                Get in touch
              </button>
              <a href="/CV.pdf" download className="btn btn-secondary w-full text-center">
                Download CV
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
