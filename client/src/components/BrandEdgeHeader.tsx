import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface BrandEdgeHeaderProps {
  onNavClick: (id: string) => void;
}

export default function BrandEdgeHeader({ onNavClick }: BrandEdgeHeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id: string) => {
    onNavClick(id);
    setIsMenuOpen(false);
  };

  const navLinks = [
    { id: "work", label: "Work" },
    { id: "about", label: "About" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 h-14 transition-all duration-300 ${
        scrolled
          ? "bg-secondary/90 backdrop-blur-md border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container h-full flex items-center justify-between">
        <button type="button" onClick={() => handleNav("home")} className="flex items-center gap-2">
          <img src="/brand1.png" alt="GMLink" className="w-9 h-9 object-contain" />
          <span className="font-display font-bold text-[1.15rem] tracking-tight text-foreground">GMLink</span>
        </button>

        <nav className="hidden xl:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNav(link.id)}
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {toggleTheme && (
            <button
              type="button"
              onClick={toggleTheme}
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors p-1.5"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          )}
          <button
            type="button"
            onClick={() => handleNav("contact")}
            className="hidden md:inline-flex font-mono text-[9px] tracking-[0.15em] uppercase bg-accent text-accent-foreground hover:bg-primary hover:text-accent px-2 py-1 transition-colors"
          >
            Get in touch →
          </button>
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="xl:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-secondary flex flex-col items-center justify-center gap-6"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.id}
                type="button"
                onClick={() => handleNav(link.id)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-bold text-4xl text-foreground hover:text-accent transition-colors"
              >
                {link.label}
              </motion.button>
            ))}
            <motion.button
              type="button"
              onClick={() => handleNav("contact")}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-[9px] tracking-[0.15em] uppercase bg-primary text-accent hover:bg-accent hover:text-primary px-3 py-1.5 transition-colors mt-3"
            >
              Get in touch →
            </motion.button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
