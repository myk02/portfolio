import { BadgeCheck, Bot, ClipboardList, Code2, LifeBuoy, Palette, Plug } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/ui/section";
import { Card } from "@/components/ui/kicker";
import { automationWorkflow, services } from "@/data/siteContent";

const ROLE_ICONS = [Code2, Palette, ClipboardList, Plug, LifeBuoy, Bot] as const;

/**
 * Multi-role proof section: Developer, Designer/Brand, Project Manager,
 * APIs, Tech Support, AI Automation & Workflows.
 * Each role explains what it includes + where it's proven — no bare titles.
 */
export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="section-pad bg-secondary border-t border-border"
    >
      <div className="container">
        <Reveal className="section-intro mb-8">
          <SectionLabel>Roles & services</SectionLabel>
          <h2 id="services-heading" className="heading-section text-foreground mt-2">
            One partner, six roles — brand to launch
          </h2>
          <p className="text-muted-foreground text-[0.875rem] mt-3 leading-relaxed mx-auto max-w-xl">
            Pick one role or hand me the whole journey — from first sketch to
            shipped product, with support included.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {services.map((service, i) => {
            const Icon = ROLE_ICONS[i % ROLE_ICONS.length];
            return (
              <Reveal key={service.title} delay={(i % 3) as 0 | 1 | 2}>
                <Card className="p-5 h-full flex flex-col">
                  <div className="flex items-center gap-2.5">
                    <span className="w-9 h-9 grid place-items-center border border-border bg-secondary text-foreground shrink-0" aria-hidden>
                      <Icon size={16} />
                    </span>
                    <p className="text-[10px] font-mono font-medium uppercase tracking-[0.12em] text-muted-foreground leading-snug">
                      {service.role}
                    </p>
                  </div>
                  <h3 className="font-display font-semibold text-foreground text-[1.02rem] tracking-[-0.015em] leading-snug mt-3">
                    {service.title}
                  </h3>
                  <p className="text-[0.8375rem] text-muted-foreground leading-relaxed mt-2">
                    {service.text}
                  </p>
                  <ul className="mt-3 space-y-1.5" aria-label={`${service.title} includes`}>
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-[0.78rem] text-foreground leading-relaxed"
                      >
                        <span className="mt-[7px] w-1.5 h-1.5 bg-accent shrink-0" aria-hidden />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto">
                    <p className="mt-3 flex items-start gap-1.5 text-[0.75rem] font-medium text-foreground leading-relaxed border-t border-border pt-3">
                      <BadgeCheck size={14} className="mt-[1px] shrink-0 text-[var(--live)]" aria-hidden />
                      {service.proof}
                    </p>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={1}>
          <Card className="p-5 sm:p-6 mt-4 max-w-5xl mx-auto">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 grid place-items-center bg-accent text-accent-foreground shrink-0" aria-hidden>
                <Bot size={16} />
              </span>
              <div>
                <p className="text-[11px] font-mono font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  AI automation — how a pilot runs
                </p>
                <p className="font-display font-semibold text-foreground text-[1rem] tracking-[-0.01em] leading-snug">
                  Fixed scope, human-reviewed, measured weekly
                </p>
              </div>
            </div>
            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
              {automationWorkflow.map((step, i) => (
                <li
                  key={step}
                  className="border border-border bg-secondary p-3.5 text-[0.78rem] text-foreground leading-relaxed"
                >
                  <span className="block text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
                    Step {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
