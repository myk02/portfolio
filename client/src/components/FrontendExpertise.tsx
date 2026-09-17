import { Github } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/ui/section";
import { Card } from "@/components/ui/kicker";
import { frontendServices } from "@/data/siteContent";
import { CONTACT } from "@/lib/site";

/** Concise quality proof: one line per item, single code link. */
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
            Quality in every build
          </h2>
          <p className="text-muted-foreground text-[0.875rem] mt-3 leading-relaxed mx-auto max-w-xl">
            Responsive, accessible, tested, and shipped.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-4xl mx-auto">
          {frontendServices.map((service, i) => (
            <Reveal key={service.title} delay={(i % 2) as 0 | 1 | 2}>
              <Card className="p-4 h-full">
                <h3 className="font-display font-semibold text-foreground text-[1rem] tracking-[-0.015em] leading-snug">
                  {service.title}
                </h3>
                <p className="text-[0.8375rem] text-muted-foreground leading-relaxed mt-1">
                  {service.text}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={1}>
          <div className="mt-4 max-w-4xl mx-auto flex flex-wrap items-center gap-2.5">
            <a
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary text-xs gap-2"
            >
              <Github size={14} aria-hidden /> Review the code — github.com/myk02
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
