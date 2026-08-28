import { Reveal } from "@/components/Reveal";
import {
  aboutParagraphs,
  coreSkills,
  socialLinks,
  contactItems,
} from "@/data/siteContent";
import { MapPin, Clock3, CheckCircle2 } from "lucide-react";

const TIMELINE = [
  { year: "2024", event: "KenyaTrace 6→3 · live" },
  { year: "2025", event: "GiGi 4→3 · AA · live" },
  { year: "Now", event: "React · remote" },
];

export default function BrandEdgeAbout() {
  return (
    <section
      id="about"
      className="section-pad bg-secondary border-t border-border relative overflow-hidden"
    >
      {/* subtle accent wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 w-[380px] h-[380px] rounded-full opacity-[0.04]"
        style={{ background: "radial-gradient(circle, #0a0a0a 0%, transparent 70%)" }}
      />
      <div className="container relative">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <span className="section-label">
              <span className="section-label-line" />
              About
            </span>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="heading-section text-foreground" style={{ letterSpacing: "-0.03em" }}>
                Mike Waitindi
              </h2>
              <span className="hidden sm:inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest border border-border bg-card px-3 py-2">
                <MapPin size={12} /> Nairobi · Remote · Full-time & freelance
              </span>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 lg:gap-10 mt-10 items-start">
            {/* left — portrait card */}
            <div className="space-y-4">
              <Reveal delay={1} scale>
                <div className="border border-border bg-card p-3">
                  <div
                    className="relative aspect-square overflow-hidden bg-[#f4efe7] border border-border"
                    role="img"
                    aria-label="Portrait of Mike Waitindi"
                  >
                    {/* lime corner accent */}
                    <div className="absolute top-0 left-0 w-10 h-10 border-l-[3px] border-t-[3px] border-accent z-10" aria-hidden />
                    <div className="absolute bottom-0 right-0 w-10 h-10 border-r-[3px] border-b-[3px] border-accent z-10" aria-hidden />
                    <img
                      src="/profile.webp"
                      alt="Portrait of Mike Waitindi"
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-xs font-medium text-foreground leading-none">Mike Waitindi</p>
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-[#22c55e]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" /> Available
                    </span>
                  </div>
                  <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground mt-1">
                    Developer · UI/UX · Automation
                  </p>
                </div>
              </Reveal>

              <Reveal delay={2}>
                <div className="border border-border bg-card p-3 flex flex-col gap-3">
                  <div className="flex flex-wrap gap-2">
                    {socialLinks.map((s) => (
                      <a
                        key={s.alt}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.alt}
                        className="w-10 h-10 flex items-center justify-center border border-border bg-secondary text-muted-foreground hover:text-foreground hover:border-foreground hover:bg-card transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                      >
                        {s.icon ? (
                          <img src={s.icon} alt="" className="w-4 h-4" />
                        ) : (
                          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        )}
                      </a>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground border-t border-border pt-3">
                    <Clock3 size={13} className="shrink-0" />
                    <span>Replies within 24 hours · Mon–Sat EAT</span>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={3}>
                <div className="border border-accent/30 bg-accent/10 px-3 py-3 flex gap-2.5">
                  <CheckCircle2 size={16} className="text-foreground shrink-0 mt-0.5" />
                  <p className="text-xs leading-snug text-foreground">
                    Open to React / design / automation roles.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* right — narrative */}
            <div className="space-y-6 max-w-2xl">
              <Reveal delay={1}>
                <p className="text-base sm:text-[17px] text-foreground leading-relaxed font-medium">
                  {aboutParagraphs[0]}
                </p>
              </Reveal>
              {aboutParagraphs[1] && (
                <Reveal delay={1}>
                  <p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-accent pl-4">
                    {aboutParagraphs[1]}
                  </p>
                </Reveal>
              )}

              {/* timeline — visual */}
              <Reveal delay={2}>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3">
                    Timeline
                  </p>
                  <div className="relative border border-border bg-card p-4 sm:p-5">
                    <div className="absolute left-[22px] top-6 bottom-6 w-[2px] bg-border hidden sm:block" aria-hidden />
                    <div className="space-y-4">
                      {TIMELINE.map((item) => (
                        <div key={item.year} className="flex gap-3 sm:gap-4">
                          <div className="hidden sm:flex flex-col items-center gap-1 shrink-0">
                            <span className="w-3 h-3 bg-accent border-2 border-foreground shrink-0 mt-1" aria-hidden />
                          </div>
                          <div className="flex-1 flex gap-3 items-start min-w-0">
                            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-foreground bg-secondary border border-border px-2 py-1 shrink-0">
                              {item.year}
                            </span>
                            <p className="text-[13px] text-muted-foreground leading-snug pt-1">
                              {item.event}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* skills — compact + scannable */}
              <Reveal delay={3}>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3">
                    Core stack — what I ship with
                  </p>
                  <ul className="flex flex-wrap gap-1.5" aria-label="Core skills">
                    {coreSkills.map((skill) => (
                      <li
                        key={skill}
                        className="px-2.5 py-1.5 text-xs font-medium border border-border bg-card text-foreground hover:border-foreground/30 hover:bg-secondary transition-colors"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              {/* contact details — as pills */}
              <Reveal delay={3}>
                <div className="pt-4 border-t border-border">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3">
                    Get in touch
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {contactItems.map((item) =>
                      item.href ? (
                        <a
                          key={item.label}
                          href={item.href}
                          className="inline-flex items-center gap-2 px-3 py-2 border border-border bg-card text-sm text-foreground hover:border-foreground hover:bg-secondary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span
                          key={item.label}
                          className="inline-flex items-center gap-2 px-3 py-2 border border-dashed border-border bg-secondary/50 text-sm text-muted-foreground"
                        >
                          {item.value}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
