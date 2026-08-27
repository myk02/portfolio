import { Reveal } from "@/components/Reveal";
import {
  aboutParagraphs,
  coreSkills,
  socialLinks,
  contactItems,
} from "@/data/siteContent";

const TIMELINE = [
  { year: "2024", event: "Shipped KenyaTrace — live tourism explorer, 6 → 3 tap route planning" },
  { year: "2025", event: "Shipped GiGi Energy — e-commerce checkout redesign, WCAG AA pass" },
  { year: "Now", event: "Building accessible, test-covered React products in Nairobi · remote" },
];

export default function BrandEdgeAbout() {
  return (
    <section
      id="about"
      className="section-pad bg-secondary border-t border-border"
    >
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <span className="section-label">
              <span className="section-label-line" />
              About
            </span>
            <h2 className="heading-section text-foreground mb-2">
              Mike Waitindi
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-12 mt-8">
            {/* portrait + social */}
            <div className="flex flex-row lg:flex-col items-start gap-5">
              <Reveal delay={1} scale>
                <div
                  className="relative w-28 h-28 sm:w-36 sm:h-36 overflow-hidden border border-foreground/25 bg-[#f4efe7] shrink-0"
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
              </Reveal>
              <Reveal delay={3}>
                <div className="flex flex-wrap gap-2 pt-1">
                  {socialLinks.map((s) => (
                    <a
                      key={s.alt}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.alt}
                      className="w-10 h-10 flex items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
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
                </div>
              </Reveal>
            </div>

            {/* main content */}
            <div className="space-y-5 max-w-2xl">
              {/* paragraphs */}
              {aboutParagraphs.map((para, i) => (
                <Reveal key={i} delay={2}>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {para}
                  </p>
                </Reveal>
              ))}

              {/* timeline */}
              <Reveal delay={2}>
                <div className="mt-2 border-l-2 border-accent pl-4 space-y-3">
                  {TIMELINE.map((item) => (
                    <div key={item.year} className="flex items-start gap-3">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-accent shrink-0 mt-0.5 w-8">
                        {item.year}
                      </span>
                      <p className="text-[12px] text-muted-foreground leading-snug">
                        {item.event}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* skills */}
              <Reveal delay={3}>
                <ul className="flex flex-wrap gap-1.5 pt-1" aria-label="Core skills">
                  {coreSkills.map((skill) => (
                    <li key={skill} className="tag-pill text-xs">
                      {skill}
                    </li>
                  ))}
                </ul>
              </Reveal>

              {/* contact details */}
              <Reveal delay={3}>
                <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[13px]">
                  {contactItems.map((item) =>
                    item.href ? (
                      <a
                        key={item.label}
                        href={item.href}
                        className="text-muted-foreground hover:text-foreground underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span key={item.label} className="text-muted-foreground">
                        {item.value}
                      </span>
                    )
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
