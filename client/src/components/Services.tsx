import { Code2, MonitorCog, ShieldCheck, Sparkles } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/ui/section";
import { Card } from "@/components/ui/kicker";
import { services } from "@/data/siteContent";

const ROLE_ICONS = [Code2, MonitorCog, ShieldCheck, Sparkles] as const;

/** Why I qualify: 4 roles, skills as chips, one proof line each. */
export default function Services() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="section-pad bg-secondary border-t border-border"
    >
      <div className="container">
        <Reveal className="section-head">
          <SectionLabel>Why I qualify</SectionLabel>
          <h2 id="skills-heading" className="heading-section text-foreground">
            What I do
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {services.map((service, i) => {
            const Icon = ROLE_ICONS[i % ROLE_ICONS.length];
            return (
              <Reveal key={service.title} delay={(i % 4) as 0 | 1 | 2 | 3}>
                <Card className="p-3.5 h-full flex flex-col">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-7 h-7 grid place-items-center border border-border bg-secondary text-foreground shrink-0"
                      aria-hidden
                    >
                      <Icon size={14} />
                    </span>
                    <h3 className="font-display font-semibold text-foreground text-[0.95rem] tracking-[-0.015em] leading-snug">
                      {service.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                    {service.bracket}
                  </p>
                  <ul
                    className="mt-2.5 flex flex-wrap gap-1.5 list-none p-0"
                    aria-label={`${service.title} skills`}
                  >
                    {service.skills.map(s => (
                      <li
                        key={s}
                        className="text-[11px] leading-tight border border-border bg-secondary px-1.5 py-1 text-foreground"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                  <p className="text-[0.78rem] text-muted-foreground leading-snug mt-auto pt-2.5">
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
