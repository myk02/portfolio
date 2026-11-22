import { Shield, Rocket, Megaphone, TrendingUp } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/ui/section";
import { Card } from "@/components/ui/kicker";
import { services } from "@/data/siteContent";

const ROLE_ICONS = [Shield, Rocket, Megaphone, TrendingUp] as const;

/** Four disciplines, skills as chips, one tight proof line each. */
export default function Services() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="section-pad bg-secondary border-t border-border"
    >
      <div className="container">
        <Reveal className="section-head">
          <div>
            <SectionLabel>Capabilities</SectionLabel>
            <h2 id="skills-heading" className="heading-section text-foreground">
              What I do
            </h2>
          </div>
          <span className="section-note hidden sm:inline-block">
            Four disciplines · One operator
          </span>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
          {services.map((service, i) => {
            const Icon = ROLE_ICONS[i % ROLE_ICONS.length];
            return (
              <Reveal key={service.title} delay={(i % 4) as 0 | 1 | 2 | 3}>
                <Card className="p-4.5 h-full flex flex-col group hover:border-foreground/30 transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0_rgba(10,10,10,0.06)] relative">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="w-8 h-8 grid place-items-center border border-border bg-card text-foreground shrink-0 group-hover:bg-accent group-hover:text-accent-foreground transition-colors"
                      aria-hidden
                    >
                      <Icon size={15} />
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground/60 tracking-wider">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display font-semibold text-foreground text-[0.98rem] tracking-[-0.015em] leading-snug">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                    {service.bracket}
                  </p>
                  <ul
                    className="mt-3 flex flex-wrap gap-1.5 list-none p-0"
                    aria-label={`${service.title} skills`}
                  >
                    {service.skills.map(s => (
                      <li
                        key={s}
                        className="text-[11px] leading-tight border border-border bg-secondary px-1.5 py-1 text-foreground hover:border-foreground/30 hover:bg-card transition-colors cursor-default"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                  <p className="text-[0.8rem] text-muted-foreground leading-snug mt-auto pt-3.5 border-t border-border/60">
                    {service.proof}
                  </p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
