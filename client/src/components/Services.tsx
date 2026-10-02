import { Code2, CreditCard, Database } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/ui/section";
import { Card } from "@/components/ui/kicker";
import { services } from "@/data/siteContent";

const ROLE_ICONS = [Code2, CreditCard, Database] as const;

/** Concise role map: one line per role, no bullets or workflow detail. */
export default function Services() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="section-pad bg-secondary border-t border-border"
    >
      <div className="container">
        <Reveal className="section-intro mb-8">
          <SectionLabel>Strengths</SectionLabel>
          <h2 id="skills-heading" className="heading-section text-foreground mt-2">
            How I build
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {services.map((service, i) => {
            const Icon = ROLE_ICONS[i % ROLE_ICONS.length];
            return (
              <Reveal key={service.title} delay={(i % 3) as 0 | 1 | 2}>
                <Card className="p-4 h-full flex items-start gap-3">
                  <span className="w-9 h-9 grid place-items-center border border-border bg-secondary text-foreground shrink-0" aria-hidden>
                    <Icon size={16} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display font-semibold text-foreground text-[1rem] tracking-[-0.015em] leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-[0.8375rem] text-muted-foreground leading-relaxed mt-1">
                      {service.text}
                    </p>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
