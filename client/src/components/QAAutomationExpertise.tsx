import { FlaskConical, FileWarning, Network, Database, Container, ScanSearch } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/ui/section";
import { Card } from "@/components/ui/kicker";
import { qaHighlights, qaWorkflow } from "@/data/siteContent";

const ICONS = [FlaskConical, ScanSearch, FileWarning, Database, Network, Container] as const;

/**
 * QA Automation proof: what gets tested and how it ships.
 */
export default function QAAutomationExpertise() {
  return (
    <section
      id="qa-automation"
      aria-labelledby="qa-automation-heading"
      className="section-pad bg-secondary border-t border-border"
    >
      <div className="container">
        <Reveal className="section-intro mb-8" variant="up">
          <SectionLabel>End-to-end testing · Playwright + TypeScript</SectionLabel>
          <h2 id="qa-automation-heading" className="heading-section text-foreground mt-2">
            Quality you can rerun
          </h2>
          <p className="text-muted-foreground text-[0.875rem] mt-3 leading-relaxed mx-auto max-w-xl">
            Playwright end-to-end suites for this portfolio — functional +
            regression on every push via GitHub Actions. No SQL or API-contract
            tests here yet; those stay in Learning.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-4xl mx-auto">
          {qaHighlights.map((item, i) => {
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

        {/* Workflow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto mt-4">
          {qaWorkflow.map((item, i) => (
            <Reveal key={item.step} delay={(i % 4) as 0 | 1 | 2}>
              <Card className="p-4 h-full">
                <p className="text-[0.6875rem] font-mono font-medium uppercase tracking-[0.12em] text-accent-foreground">
                  {item.step}
                </p>
                <p className="text-[0.8125rem] text-muted-foreground leading-relaxed mt-2">
                  {item.text}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
