import { Container, KeyRound, LayoutGrid, Network } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/ui/section";
import { Card } from "@/components/ui/kicker";
import { fullStackHighlights, fullStackToolbox } from "@/data/siteContent";

const ICONS = [LayoutGrid, Container, Network, KeyRound] as const;

/** Full-stack proof: 2+ years frontend, backend APIs, and databases — one owner, UI to data. */
export default function FullStackExpertise() {
  return (
    <section
      id="full-stack"
      aria-labelledby="full-stack-heading"
      className="section-pad bg-secondary border-t border-border"
    >
      <div className="container">
        <Reveal className="section-intro mb-8" variant="up">
          <SectionLabel>Full-stack development · 2+ years</SectionLabel>
          <h2 id="full-stack-heading" className="heading-section text-foreground mt-2">
            Frontend to database — all rounded
          </h2>
          <p className="text-muted-foreground text-[0.875rem] mt-3 leading-relaxed mx-auto max-w-xl">
            2+ years building full-stack projects — React + TypeScript frontend,
            Node.js REST APIs, PostgreSQL databases, secured with auth &amp; API
            security and shipped with Docker.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-4xl mx-auto">
          {fullStackHighlights.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal
                key={item.title}
                delay={(i % 2) as 0 | 1 | 2}
                variant={i % 2 === 0 ? "left" : "right"}
              >
                <Card className="p-4 h-full flex items-start gap-3">
                  <span
                    className="w-9 h-9 grid place-items-center border border-border bg-secondary text-foreground shrink-0"
                    aria-hidden
                  >
                    <Icon size={16} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display font-semibold text-foreground text-[1rem] tracking-[-0.015em] leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[0.8375rem] text-muted-foreground leading-relaxed mt-1">
                      {item.text}
                    </p>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={1} variant="up" className="mt-4 max-w-4xl mx-auto">
          <Card className="p-4">
            <p className="text-[0.6875rem] font-mono font-medium uppercase tracking-[0.12em] text-muted-foreground mb-3">
              Full-stack toolbox
            </p>
            <ul className="flex flex-wrap gap-2" aria-label="Full-stack skills">
              {fullStackToolbox.map((skill) => (
                <li
                  key={skill}
                  className="px-2.5 py-1.5 text-[0.8125rem] font-medium tracking-[-0.005em] border border-border bg-secondary text-foreground leading-none"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
