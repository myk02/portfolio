import { Mail, Linkedin, Github, ArrowUpRight, MessageCircle } from "lucide-react";
import { Link, useLocation } from "wouter";
import { CONTACT } from "@/lib/site";
import { liveStudies } from "@/data/projects";
import { handleSiteNav, scrollToHomeSection } from "@/lib/navigation";
import BuyMeCoffee from "./BuyMeCoffee";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  const [location, setLocation] = useLocation();

  const handleNav = (id: string) => {
    handleSiteNav(id, {
      location,
      onHomeSection: scrollToHomeSection,
      navigate: setLocation,
    });
  };

  return (
    <footer className="bg-foreground text-background border-t-[3px] border-accent relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]" aria-hidden>
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative container py-12 lg:py-14">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1.35fr_0.85fr_0.9fr] gap-10 lg:gap-8">
            <div>
              <Link
                href="/"
                aria-label="Mike Waitindi — home"
                className="flex items-center gap-2.5 group"
              >
                <span className="w-9 h-9 grid place-items-center bg-accent text-accent-foreground font-display font-black text-sm">
                  MW
                </span>
                <span className="font-display font-black text-xl tracking-tight text-background group-hover:text-accent transition-colors">
                  Mike Waitindi
                </span>
              </Link>
              <p className="text-sm text-background/65 mt-3 max-w-sm leading-relaxed">
                Fullstack developer in Nairobi — reliable products from research
                to deployment. Remote.
              </p>
            </div>

            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-accent mb-4">
                Navigate
              </p>
              <nav className="flex flex-col gap-2">
                {[
                  { id: "work", label: "Work" },
                  { id: "about", label: "About" },
                  { id: "contact", label: "Contact" },
                ].map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => handleNav(link.id)}
                    className="text-sm text-left text-background/70 hover:text-accent transition-colors w-fit flex items-center gap-1.5 group"
                  >
                    <span
                      className="w-0 h-[1px] bg-accent group-hover:w-3 transition-all"
                      aria-hidden
                    />
                    {link.label}
                  </button>
                ))}
              </nav>

              <p className="text-[10px] font-mono uppercase tracking-widest text-background/40 mt-8 mb-3">
                Live work
              </p>
              <div className="space-y-2">
                {liveStudies.map((study) => (
                  <Link
                    key={study.slug}
                    href={`/work/${study.slug}`}
                    className="flex items-center justify-between gap-2 border border-background/10 bg-background/5 px-3 py-2 hover:border-background/20 hover:bg-background/10 transition-colors"
                  >
                    <span className="text-xs text-background">{study.name}</span>
                    <ArrowUpRight size={12} className="text-background/40" />
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-accent mb-4">
                Connect
              </p>
              <div className="space-y-3">
                <a
                  href={CONTACT.emailHref}
                  className="flex items-center gap-2.5 text-sm text-background/70 hover:text-accent transition-colors group"
                >
                  <span className="w-8 h-8 grid place-items-center border border-background/15 bg-background/5 group-hover:border-accent/40 transition-colors">
                    <Mail size={13} />
                  </span>
                  {CONTACT.email}
                </a>
                <a
                  href={CONTACT.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-background/70 hover:text-accent transition-colors group"
                >
                  <span className="w-8 h-8 grid place-items-center border border-background/15 bg-background/5 group-hover:border-accent/40 transition-colors">
                    <Github size={13} />
                  </span>
                  github.com/myk02
                </a>
                <a
                  href={CONTACT.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-background/70 hover:text-accent transition-colors group"
                >
                  <span className="w-8 h-8 grid place-items-center border border-background/15 bg-background/5 group-hover:border-accent/40 transition-colors">
                    <Linkedin size={13} />
                  </span>
                  LinkedIn
                </a>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-background/70 hover:text-accent transition-colors group"
                >
                  <span className="w-8 h-8 grid place-items-center border border-background/15 bg-background/5 group-hover:border-accent/40 transition-colors">
                    <MessageCircle size={13} />
                  </span>
                  WhatsApp · {CONTACT.phone}
                </a>
                <p className="text-xs text-background/40 pt-2 border-t border-background/10">
                  {CONTACT.location}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-background/10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <p className="text-xs text-background/40">
              © {year} Mike Waitindi · Designed & built from Nairobi
            </p>
            <BuyMeCoffee
              label="Buy me a coffee"
              buttonClassName="bg-accent text-accent-foreground border border-accent hover:bg-background hover:text-foreground hover:border-background text-xs px-4 py-2.5"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
