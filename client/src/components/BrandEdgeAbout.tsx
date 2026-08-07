import { Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { aboutStats, socialLinks, contactItems, skillGroups } from "@/data/siteContent";

const contactIcons: Record<string, React.ReactNode> = {
  Email: <Mail size={18} />,
  Phone: <Phone size={18} />,
  Location: <MapPin size={18} />,
};

function Monogram() {
  return (
    <div className="shrink-0">
      <div
        className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-soft overflow-hidden border border-foreground/25 bg-[#f4efe7] flex items-center justify-center"
        role="img"
        aria-label="Monogram MW — portrait coming soon"
      >
        <span
          aria-hidden
          className="absolute -bottom-4 -right-4 w-20 h-20 bg-accent rotate-45"
        />
        <span className="font-display font-black text-6xl sm:text-7xl text-foreground tracking-tight">
          MW
        </span>
      </div>
      <p className="mt-2 text-xs font-mono uppercase tracking-widest text-muted-foreground text-center">
        Portrait coming soon
      </p>
    </div>
  );
}

export default function BrandEdgeAbout() {
  return (
    <section id="about" className="section-pad bg-secondary border-t border-border">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="heading-section text-foreground mb-2">About</h2>
          </Reveal>

          <div className="flex flex-col sm:flex-row items-start gap-6 mt-6">
            <Reveal delay={1} scale>
              <Monogram />
            </Reveal>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-base pt-1">
              <Reveal delay={2}>
                <p>
                  I'm Mike, a UI/UX designer based in Nairobi. Everything I make works toward
                  one goal: help young customers feel understood — in banking especially.
                </p>
              </Reveal>
              <Reveal delay={3}>
                <p>
                  I work the full arc: research, flows, wireframes, prototypes, testing —
                  and I speak the languages of both design and engineering (React, Next.js,
                  Tailwind).
                </p>
              </Reveal>
              <Reveal delay={3}>
                <p className="text-sm">
                  When I'm not designing: photography, five-a-side football, and hunting for
                  the best samosa in Nairobi.
                </p>
              </Reveal>
            </div>
          </div>

          <Reveal delay={2} className="mt-6 p-4 sm:p-5 border-l-2 border-accent bg-card">
            <p className="text-sm text-foreground leading-relaxed">
              <span className="font-display font-bold">Why I care:</span> young Kenyans are
              entering the financial system right now, and the apps they get first will shape
              how they save, borrow, and plan for years. I want to design the ones that feel
              like they were made for them.
            </p>
          </Reveal>

          <Reveal delay={3} className="flex gap-4 mt-8">
            {socialLinks.map((s) => (
              <a
                key={s.alt}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.alt}
                className="w-11 h-11 flex items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              >
                {s.icon ? (
                  <img src={s.icon} alt="" className="w-5 h-5" />
                ) : (
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                )}
              </a>
            ))}
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mt-14">
            <div className="grid grid-cols-2 gap-6 content-start">
              {aboutStats.map((stat, i) => (
                <Reveal key={stat.label} delay={i % 4} scale>
                  <div className="font-display font-black text-4xl text-foreground tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </Reveal>
              ))}
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="font-medium text-foreground mb-4">Skills & Tools</h3>
                <div className="space-y-4">
                  {skillGroups.map((group) => (
                    <div key={group.title}>
                      <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                        {group.title}
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {group.skills.map((skill) => (
                          <span key={skill} className="tag-pill text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-foreground mb-4">Contact</h3>
                <div className="space-y-3">
                  {contactItems.map((item) => (
                    <div key={item.label} className="flex items-center gap-4 min-h-[44px]">
                      <span className="text-muted-foreground shrink-0">{contactIcons[item.label]}</span>
                      <span className="text-sm text-muted-foreground w-24 shrink-0">{item.label}</span>
                      {item.href ? (
                        <a href={item.href} className="text-sm text-foreground hover:underline underline-offset-4 min-w-0 break-words">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm text-foreground min-w-0 break-words">{item.value}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
