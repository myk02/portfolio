import { Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import TechSummary from "@/components/engineering/TechSummary";
import {
  aboutStats,
  socialLinks,
  contactItems,
  applicationLine,
} from "@/data/siteContent";

const contactIcons: Record<string, React.ReactNode> = {
  Email: <Mail size={18} />,
  Phone: <Phone size={18} />,
  Location: <MapPin size={18} />,
};

function Portrait() {
  return (
    <div className="shrink-0">
      <div
        className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-soft overflow-hidden border border-foreground/25 bg-[#f4efe7]"
        role="img"
        aria-label="Portrait of Mike Waitindi"
      >
        <img
          src="/profile.webp"
          alt="Portrait of Mike Waitindi"
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default function BrandEdgeAbout() {
  return (
    <section
      id="about"
      className="section-pad bg-secondary border-t border-border"
    >
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="heading-section text-foreground mb-2">About</h2>
            <p className="text-muted-foreground text-sm max-w-xl">
              Web developer &amp; product-minded frontend engineer — Nairobi,
              Kenya · remote available.
            </p>
          </Reveal>

          <div className="flex flex-col sm:flex-row items-start gap-6 mt-8">
            <Reveal delay={1} scale>
              <Portrait />
            </Reveal>
            <div className="pt-1 space-y-3 max-w-2xl">
              <Reveal delay={2}>
                <p className="text-foreground font-display font-bold text-xl leading-snug">
                  I build reliable products from design to deployment.
                </p>
              </Reveal>
              <Reveal delay={3}>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  My background is product design, and it works as an
                  engineering advantage: I interpret requirements and designs
                  accurately, speak designers&apos; language, and cut the
                  ambiguity that usually burns time between design and code.
                  Then I do the engineering — semantic markup, typed React, API
                  wiring, tests, and deploys.
                </p>
              </Reveal>
              <Reveal delay={3}>
                <p className="text-sm text-foreground/90 leading-relaxed border-l-2 border-accent pl-4">
                  {applicationLine}
                </p>
              </Reveal>
            </div>
          </div>

          {/* Skills matrix — technical skills first, hobbies nowhere in the way */}
          <div className="mt-14">
            <TechSummary />
          </div>

          <Reveal delay={2} className="flex gap-4 mt-12">
            {socialLinks.map(s => (
              <a
                key={s.alt}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.alt}
                className="w-11 h-11 flex items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
              >
                {s.icon ? (
                  <img src={s.icon} alt="" className="w-5 h-5" />
                ) : (
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
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
                  <div className="text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </Reveal>
              ))}
            </div>

            <div>
              <h3 className="font-medium text-foreground mb-4">Contact</h3>
              <div className="space-y-3">
                {contactItems.map(item => (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 min-h-[44px]"
                  >
                    <span className="text-muted-foreground shrink-0">
                      {contactIcons[item.label]}
                    </span>
                    <span className="text-sm text-muted-foreground w-24 shrink-0">
                      {item.label}
                    </span>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm text-foreground hover:underline underline-offset-4 min-w-0 break-words focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-foreground min-w-0 break-words">
                        {item.value}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
