import { Reveal } from "@/components/Reveal";
import { Kicker, Card } from "@/components/ui/kicker";
import { SectionLabel } from "@/components/ui/section";
import { aboutParagraphs, coreSkills } from "@/data/siteContent";
import { CONTACT } from "@/lib/site";
import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";

const TIMELINE = [
  { year: "2023–25", event: "Full-Stack Developer — 2+ years frontend, backend, APIs & databases (React, Node.js, REST, PostgreSQL, Docker, auth & security)" },
  { year: "2024", event: "KenyaTrace — shipped" },
  { year: "2025", event: "GiGi Energy + LegalFlow — shipped" },
  { year: "2024–25", event: "Solution Engineer — data pipelines + cloud" },
];

const ABOUT_LINKS = [
  { href: CONTACT.emailHref, label: "Email", icon: Mail, external: false },
  { href: CONTACT.whatsapp, label: "WhatsApp", icon: MessageCircle, external: true },
  { href: CONTACT.github, label: "GitHub", icon: Github, external: true },
  { href: CONTACT.linkedin, label: "LinkedIn", icon: Linkedin, external: true },
];

export default function About() {
  return (
    <section
      id="about"
      className="section-pad bg-secondary border-t border-border"
    >
      <div className="container">
        <div>
          <Reveal className="section-intro">
            <SectionLabel>About</SectionLabel>
            <h2 className="heading-section text-foreground">
              Mike Waitindi
            </h2>
            <p className="mt-2 inline-block text-[11px] font-mono font-medium uppercase tracking-[0.14em] text-accent-foreground bg-accent px-2.5 py-1.5">
              Nairobi · Remote
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 mt-8 items-start max-w-3xl mx-auto">
            <div className="space-y-4 mx-auto w-full max-w-[220px] md:max-w-none md:mx-0">
              <Reveal delay={0} scale>
                <Card className="p-3">
                  <div
                    className="relative aspect-square overflow-hidden bg-muted border border-border"
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
                  <p className="text-[11px] font-medium text-foreground leading-none mt-3 text-center md:text-left">
                    Mike Waitindi
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                    {ABOUT_LINKS.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target={s.external ? "_blank" : undefined}
                        rel={s.external ? "noopener noreferrer" : undefined}
                        aria-label={s.label}
                        className="w-10 h-10 flex items-center justify-center border border-border bg-secondary text-muted-foreground hover:text-foreground hover:border-foreground hover:bg-card transition-colors"
                      >
                        <s.icon size={16} />
                      </a>
                    ))}
                  </div>
                </Card>
              </Reveal>
            </div>

            <div className="space-y-5 max-w-xl mx-auto md:mx-0 md:max-w-none">
              <Reveal delay={0}>
                <p className="text-[0.9375rem] sm:text-base text-foreground leading-relaxed tracking-[-0.008em]">
                  {aboutParagraphs[0]}
                </p>
              </Reveal>
              <Reveal delay={0}>
                <p className="text-[0.875rem] text-muted-foreground leading-relaxed border-l-2 border-accent pl-4">
                  {aboutParagraphs[1]}
                </p>
              </Reveal>

              <div>
                <Kicker className="mb-3 block">Timeline</Kicker>
                <Card className="p-4 sm:p-5">
                  <div className="space-y-3">
                    {TIMELINE.map((item) => (
                      <div
                        key={`${item.year}-${item.event}`}
                        className="flex gap-3 items-start min-w-0"
                      >
                        <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-foreground bg-secondary border border-border px-2 py-1 shrink-0">
                          {item.year}
                        </span>
                        <p className="text-[0.8125rem] text-muted-foreground leading-relaxed pt-1">
                          {item.event}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              <div>
                <Kicker className="mb-3 block">Core stack</Kicker>
                <ul className="flex flex-wrap gap-2" aria-label="Core skills">
                  {coreSkills.map((skill) => (
                    <li
                      key={skill}
                      className="px-2.5 py-1.5 text-[0.8125rem] font-medium tracking-[-0.005em] border border-border bg-card text-foreground leading-none"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
