import { motion } from "framer-motion";
import { aboutTitle, aboutSubtitle, aboutParagraphs, aboutStats, socialLinks, contactItems, skillGroups } from "@/data/siteContent";

export default function BrandEdgeAbout() {
  return (
    <section id="about" className="section-pad bg-secondary border-t border-border">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <h2 className="heading-serif font-bold text-foreground mb-2" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}>
                About
              </h2>
              <p className="font-display font-semibold text-xl text-foreground mb-1">
                {aboutTitle}
              </p>
              <p className="text-muted-foreground text-sm mb-5 italic">
                {aboutSubtitle}
              </p>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {aboutParagraphs.map((p) => (
                  <p key={p.slice(0, 24)} className="text-base">{p}</p>
                ))}
              </div>

              <div className="flex gap-4 mt-8">
                {socialLinks.map((s) => (
                  <a
                    key={s.alt}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.alt}
                    className="w-10 h-10 flex items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                  >
                    {s.icon ? (
                      <img src={s.icon} alt="" className="w-5 h-5" />
                    ) : (
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                    )}
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                {aboutStats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="font-display font-black text-4xl text-foreground tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="font-medium text-foreground mb-4">Skills & Tools</h3>
                <div className="space-y-4">
                  {skillGroups.slice(0, 4).map((group) => (
                    <div key={group.title}>
                      <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                        {group.title}
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {group.skills.slice(0, 6).map((skill) => (
                          <span key={skill} className="tag-pill text-xs">
                            {skill}
                          </span>
                        ))}
                        {group.skills.length > 6 && (
                          <span className="tag-pill text-xs">+{group.skills.length - 6}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="font-medium text-foreground mb-4">Contact</h3>
                <div className="space-y-2">
                  {contactItems.map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground w-20">{item.label}</span>
                      {item.href ? (
                        <a href={item.href} className="text-sm text-foreground hover:text-accent transition-colors">{item.value}</a>
                      ) : (
                        <p className="text-sm text-foreground">{item.value}</p>
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
