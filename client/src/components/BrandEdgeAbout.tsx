import { motion } from "framer-motion";
import { aboutParagraphs, aboutStats, socialLinks, contactItems, skillGroups } from "@/data/siteContent";

export default function BrandEdgeAbout() {
  return (
    <section id="about" className="section-pad bg-secondary border-t border-border">
      <div className="container">
        <div className="max-w-lg mx-auto">
        <div className="section-label">
          <span className="section-label-line" />
          About Mike
        </div>

        <div className="grid grid-cols-12 gap-4 lg:gap-8 mt-3">
          <div className="col-span-3 lg:col-span-1">
            <div className="aspect-square overflow-hidden border-2 border-border/40 [clip-path:circle(50%)]">
              <img
                src="/mike.png"
                alt="Mike Waitindi"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6">
            <h2 className="heading-serif font-bold text-foreground" style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}>
              Developer, designer &amp; automation.
              <span className="italic font-light text-muted-foreground block text-[12px]"> Building brands, apps &amp; workflows that work.</span>
            </h2>
            <div className="mt-3 space-y-1.5 text-[16px] text-muted-foreground leading-relaxed max-w-xl">
              {aboutParagraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {socialLinks.map((s) => (
                <a
                  key={s.alt}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.alt}
                  className="w-8 h-8 flex items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                >
                  {s.icon ? (
                    <img src={s.icon} alt="" className="w-4 h-4" />
                  ) : (
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-3 space-y-3">
            {aboutStats.map((stat) => (
              <div key={stat.label} className="border-l-2 border-accent pl-4">
                <div className="font-display font-bold text-foreground" style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.3rem)" }}>
                  {stat.value}
                </div>
                <div className="font-mono text-[13px] tracking-[0.2em] uppercase text-muted-foreground mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
            <div className="border-l-2 border-accent pl-4 pt-2 space-y-1.5">
              {contactItems.map((item) => (
                <div key={item.label}>
                  <span className="font-mono text-[13px] tracking-[0.15em] uppercase text-muted-foreground">{item.label}</span>
                  {item.href ? (
                    <a href={item.href} className="block text-sm text-foreground hover:text-accent transition-colors">{item.value}</a>
                  ) : (
                    <p className="text-sm text-foreground">{item.value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>          <div className="mt-8 lg:mt-12">
          <h3 className="font-mono text-[13px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
            Skills &amp; Tools
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5">
            {skillGroups.map((group) => (
              <div key={group.title} className="border border-border p-2">
                <h4 className="font-display font-bold text-[13px] text-foreground mb-1">
                  {group.title}
                </h4>
                <div className="flex flex-wrap gap-1">
                  {group.skills.map((skill) => (
                    <span key={skill} className="font-mono text-[11px] tracking-[0.1em] uppercase px-1.5 py-[1px] border border-border text-muted-foreground">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
