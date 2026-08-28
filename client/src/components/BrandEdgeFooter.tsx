import { Sun, Moon, Mail, Linkedin, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";
import { CONTACT } from "@/lib/site";
import BuyMeCoffee from "./BuyMeCoffee";

interface BrandEdgeFooterProps {
  onNavClick: (id: string) => void;
}

const TOOLS = ["React 19", "TypeScript", "Tailwind v4", "Convex", "Playwright"];

export default function BrandEdgeFooter({ onNavClick }: BrandEdgeFooterProps) {
  const year = new Date().getFullYear();
  const { theme, toggleTheme } = useTheme();

  return (
    <footer className="bg-[#0e0e0c] border-t-[3px] border-accent text-[#f2ede6] relative overflow-hidden">
      {/* grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" aria-hidden>
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(242,237,230,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(242,237,230,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative container py-12 lg:py-14">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1.35fr_0.85fr_0.9fr] gap-10 lg:gap-8">
            {/* brand */}
            <div>
              <button
                type="button"
                onClick={() => onNavClick("home")}
                className="flex items-center gap-2.5 group"
              >
                <span className="w-9 h-9 grid place-items-center bg-[#e8ff47] text-black font-display font-black text-sm">
                  MW
                </span>
                <span className="font-display font-black text-xl tracking-tight text-[#f2ede6] group-hover:text-[#e8ff47] transition-colors">
                  Mike Waitindi
                </span>
              </button>
              <p className="text-sm text-[#f2ede6]/65 mt-3 max-w-sm leading-relaxed">
                Software developer · UI/UX · automation — reliable products from research to deployment. Nairobi · remote · replies in 24h.
              </p>

              <div className="mt-4 inline-flex items-center gap-2 border border-[#f2ede6]/15 bg-[#f2ede6]/5 px-3 py-2">
                <span className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#f2ede6]/80">Available for roles & freelance</span>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-5">
                {TOOLS.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-1 text-[10px] font-mono uppercase tracking-widest border border-[#f2ede6]/15 text-[#f2ede6]/60"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* navigate + work */}
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#e8ff47] mb-4">
                Navigate
              </p>
              <nav className="flex flex-col gap-2">
                {[
                  { id: "work", label: "Work" },
                  { id: "roles", label: "Experience" },
                  { id: "about", label: "About" },
                  { id: "contact", label: "Contact" },
                ].map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => onNavClick(link.id)}
                    className="text-sm text-left text-[#f2ede6]/70 hover:text-[#e8ff47] transition-colors w-fit flex items-center gap-1.5 group"
                  >
                    <span className="w-0 h-[1px] bg-[#e8ff47] group-hover:w-3 transition-all" aria-hidden />
                    {link.label}
                  </button>
                ))}
              </nav>

              <p className="text-[10px] font-mono uppercase tracking-widest text-[#f2ede6]/40 mt-8 mb-3">
                Live work
              </p>
              <div className="space-y-2">
                <Link
                  href="/work/kenyatrace"
                  className="flex items-center justify-between gap-2 border border-[#f2ede6]/10 bg-[#f2ede6]/5 px-3 py-2 hover:border-[#f2ede6]/20 hover:bg-[#f2ede6]/10 transition-colors"
                >
                  <span className="text-xs text-[#f2ede6]">KenyaTrace</span>
                  <ArrowUpRight size={12} className="text-[#f2ede6]/40" />
                </Link>
                <Link
                  href="/work/gigi-energy"
                  className="flex items-center justify-between gap-2 border border-[#f2ede6]/10 bg-[#f2ede6]/5 px-3 py-2 hover:border-[#f2ede6]/20 hover:bg-[#f2ede6]/10 transition-colors"
                >
                  <span className="text-xs text-[#f2ede6]">GiGi Energy</span>
                  <ArrowUpRight size={12} className="text-[#f2ede6]/40" />
                </Link>
              </div>
            </div>

            {/* contact */}
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#e8ff47] mb-4">
                Connect
              </p>
              <div className="space-y-3">
                <a
                  href={CONTACT.emailHref}
                  className="flex items-center gap-2.5 text-sm text-[#f2ede6]/70 hover:text-[#e8ff47] transition-colors group"
                >
                  <span className="w-8 h-8 grid place-items-center border border-[#f2ede6]/15 bg-[#f2ede6]/5 group-hover:border-[#e8ff47]/40 transition-colors">
                    <Mail size={13} />
                  </span>
                  {CONTACT.email}
                </a>
                <a
                  href={CONTACT.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-[#f2ede6]/70 hover:text-[#e8ff47] transition-colors group"
                >
                  <span className="w-8 h-8 grid place-items-center border border-[#f2ede6]/15 bg-[#f2ede6]/5 group-hover:border-[#e8ff47]/40 transition-colors">
                    <Linkedin size={13} />
                  </span>
                  LinkedIn
                </a>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-[#f2ede6]/70 hover:text-[#e8ff47] transition-colors"
                >
                  <span className="w-8 h-8 grid place-items-center border border-[#f2ede6]/15 bg-[#f2ede6]/5 text-center text-[11px]">WA</span>
                  WhatsApp · {CONTACT.phone}
                </a>
                <p className="text-xs text-[#f2ede6]/40 pt-2 border-t border-[#f2ede6]/10">
                  Nairobi, Kenya · Remote · Mon–Sat EAT
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-[#f2ede6]/10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <p className="text-xs text-[#f2ede6]/40">
              © {year} Mike Waitindi · Built with React, TypeScript & Tailwind — deployed on Vercel
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <BuyMeCoffee
                onDark
                label="Buy me a coffee"
                buttonClassName="bg-[#e8ff47] text-black border-2 border-[#e8ff47] hover:bg-white hover:border-white hover:text-black font-semibold text-xs px-4 py-2.5 shadow-[3px_3px_0_0_rgba(242,237,230,0.25)] hover:shadow-[4px_4px_0_0_rgba(242,237,230,0.35)] transition-all"
              />
              {toggleTheme && (
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="inline-flex items-center gap-2 text-xs text-[#f2ede6]/50 hover:text-[#e8ff47] transition-colors border border-[#f2ede6]/10 px-3 py-2 hover:border-[#e8ff47]/30"
                  aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
                >
                  {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
                  {theme === "dark" ? "Light" : "Dark"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
