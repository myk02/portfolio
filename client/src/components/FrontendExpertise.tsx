import { ArrowUpRight, BadgeCheck, Github } from "lucide-react";
import { Link } from "wouter";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/ui/section";
import { Card } from "@/components/ui/kicker";
import { frontendServices, frontendPractices } from "@/data/siteContent";
import { CONTACT } from "@/lib/site";
import { liveStudies } from "@/data/projects";

/**
 * Engineering deep-dive: one specialty (web-app build quality) among several
 * roles. The full equal-weight role map lives in Services — this section
 * proves how builds are engineered, not who the person is.
 */
export default function FrontendExpertise() {
  return (
    <section
      id="expertise"
      aria-labelledby="expertise-heading"
      className="section-pad bg-secondary border-t border-border"
    >
      <div className="container">
        <Reveal className="section-intro mb-8">
          <SectionLabel>Build quality</SectionLabel>
          <h2 id="expertise-heading" className="heading-section text-foreground mt-2">
            Engineering depth behind every launch
          </h2>
          <p className="text-muted-foreground text-[0.875rem] mt-3 leading-relaxed mx-auto max-w-xl">
            One of several specialties — how the web-app builds are engineered:
            responsive, accessible, tested, and shipped. The full role map is
            under Services.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {frontendServices.map((service, i) => {
            const evidence = liveStudies[i % liveStudies.length];
            return (
              <Reveal key={service.title} delay={i as 0 | 1 | 2}>
                <Card className="p-5 h-full flex flex-col">
                  <h3 className="font-display font-semibold text-foreground text-[1.02rem] tracking-[-0.015em] leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-[0.8375rem] text-muted-foreground leading-relaxed mt-2 flex-1">
                    {service.text}
                  </p>
                  <p className="mt-3 flex items-start gap-1.5 text-[0.75rem] font-medium text-foreground leading-relaxed border-t border-border pt-3">
                    <BadgeCheck size={14} className="mt-[1px] shrink-0 text-[var(--live)]" aria-hidden />
                    {service.proof}
                  </p>
                  {evidence && (
                    <Link
                      href={`/work/${evidence.slug}`}
                      className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      See the case study — {evidence.name} <ArrowUpRight size={12} aria-hidden />
                    </Link>
                  )}
                </Card>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={1}>
          <Card className="p-5 sm:p-6 mt-4 max-w-4xl mx-auto">
            <p className="text-[11px] font-mono font-medium uppercase tracking-[0.12em] text-muted-foreground">
              How every build is checked
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 mt-4">
              {frontendPractices.map((practice) => (
                <li
                  key={practice}
                  className="flex items-start gap-2 text-[0.8125rem] text-foreground leading-relaxed"
                >
                  <span className="mt-[7px] w-1.5 h-1.5 bg-accent shrink-0" aria-hidden />
                  {practice}
                </li>
              ))}
            </ul>
            <div className="mt-5 pt-4 border-t border-border flex flex-wrap items-center gap-2.5">
              <a
                href={CONTACT.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary text-xs gap-2"
              >
                <Github size={14} aria-hidden /> Review the code — github.com/myk02
              </a>
              <span className="text-[11px] text-muted-foreground">
                Pinned repos match the case studies above. Each README covers setup, decisions, and limits.
              </span>
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
