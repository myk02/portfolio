import { Link } from "wouter";
import SiteHead from "@/components/SiteHead";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/ui/section";
import { Card } from "@/components/ui/kicker";
import { useReveal } from "@/hooks/useReveal";
import DemoAssistant from "@/ai-solutions/components/DemoAssistant";
import AiSolutionsSkills from "@/ai-solutions/components/AiSolutionsSkills";
import DemoWorkStrip from "@/ai-solutions/components/DemoWorkStrip";
import { COST_COMPARISON } from "@/ai-solutions/cost";
import { AI_SOLUTIONS_INTRO, CASE_STUDY } from "@/ai-solutions/demoContent";

export default function AiSolutions() {
  useReveal();
  return (
    <div className="min-h-screen bg-secondary">
      <SiteHead
        title="AI Solutions — Checked proposal tools | Mike Waitindi"
        description="Small AI tools that turn messy funding calls and partner profiles into checked, sourced summaries a person approves. Try the Partner & Proposal demo."
        canonical="/ai-solutions"
      />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="outline-none">
        <div className="container pt-24 pb-16 space-y-16">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Home
            </Link>
            <Reveal className="section-intro mt-7">
              <SectionLabel>{AI_SOLUTIONS_INTRO.title}</SectionLabel>
              <h1 className="heading-section text-foreground mt-2">
                Tools that read, then show their work
              </h1>
              <p className="mt-3 text-sm text-muted-foreground">
                {AI_SOLUTIONS_INTRO.lede}
              </p>
            </Reveal>
            <ul className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto list-none p-0">
              {AI_SOLUTIONS_INTRO.points.map(p => (
                <Reveal key={p}>
                  <Card className="p-4 h-full">
                    <p className="text-[0.8375rem] text-foreground leading-relaxed">
                      {p}
                    </p>
                  </Card>
                </Reveal>
              ))}
            </ul>
          </div>

          <section aria-labelledby="ai-skills">
            <div id="ai-skills">
              <AiSolutionsSkills />
            </div>
          </section>

          <section aria-labelledby="demo-heading" className="scroll-mt-24">
            <Reveal className="section-intro mb-8">
              <SectionLabel>Live demo · mock mode, no key needed</SectionLabel>
              <h2
                id="demo-heading"
                className="heading-section text-foreground mt-2"
              >
                Partner & Proposal Intelligence Assistant
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Paste a funding call and a partner profile. Every answer carries
                its source quote; a person approves each field before export.
              </p>
            </Reveal>
            <DemoAssistant />
          </section>

          <section aria-labelledby="case-heading">
            <Reveal className="section-intro mb-8">
              <SectionLabel>Case study · demo project</SectionLabel>
              <h2
                id="case-heading"
                className="heading-section text-foreground mt-2"
              >
                How this demo works
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
              {[
                ["Problem", CASE_STUDY.problem],
                ["Who it is for", CASE_STUDY.whoFor],
                ["What it connects to", CASE_STUDY.connectsTo],
                ["Errors caught", CASE_STUDY.errorsCaught],
                ["Cost", CASE_STUDY.cost],
              ].map(([h, p]) => (
                <Reveal key={h}>
                  <Card className="p-4 h-full">
                    <h3 className="font-display font-semibold text-foreground">
                      {h}
                    </h3>
                    <p className="mt-1 text-[0.8375rem] text-muted-foreground leading-relaxed">
                      {p}
                    </p>
                  </Card>
                </Reveal>
              ))}
              <Reveal>
                <Card className="p-4 h-full">
                  <h3 className="font-display font-semibold text-foreground">
                    Model vs plain code
                  </h3>
                  <ul className="mt-1 text-[0.8375rem] text-muted-foreground leading-relaxed list-disc pl-5 space-y-1">
                    {CASE_STUDY.modelVsCode.map(m => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
              <Reveal>
                <Card className="p-4 h-full">
                  <h3 className="font-display font-semibold text-foreground">
                    What I would change next
                  </h3>
                  <ul className="mt-1 text-[0.8375rem] text-muted-foreground leading-relaxed list-disc pl-5 space-y-1">
                    {CASE_STUDY.next.map(m => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            </div>
          </section>

          <section aria-labelledby="cost-heading">
            <Reveal className="section-intro mb-8">
              <SectionLabel>Cost visibility</SectionLabel>
              <h2
                id="cost-heading"
                className="heading-section text-foreground mt-2"
              >
                What it costs to run
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {COST_COMPARISON.map(c => (
                <Reveal key={c.option}>
                  <Card className="p-4 h-full">
                    <h3 className="font-display font-semibold text-foreground text-[1rem]">
                      {c.option}
                    </h3>
                    <dl className="mt-2 space-y-2 text-[0.8125rem] text-muted-foreground leading-relaxed">
                      <div>
                        <dt className="font-mono uppercase tracking-widest text-[0.6875rem]">
                          Cost
                        </dt>
                        <dd>{c.cost}</dd>
                      </div>
                      <div>
                        <dt className="font-mono uppercase tracking-widest text-[0.6875rem]">
                          Security
                        </dt>
                        <dd>{c.security}</dd>
                      </div>
                      <div>
                        <dt className="font-mono uppercase tracking-widest text-[0.6875rem]">
                          Portability
                        </dt>
                        <dd>{c.portability}</dd>
                      </div>
                      <div>
                        <dt className="font-mono uppercase tracking-widest text-[0.6875rem]">
                          Maintenance
                        </dt>
                        <dd>{c.maintenance}</dd>
                      </div>
                    </dl>
                  </Card>
                </Reveal>
              ))}
            </div>
          </section>

          <section aria-labelledby="code-heading">
            <Reveal className="section-intro mb-8">
              <SectionLabel>Code & write-up</SectionLabel>
              <h2
                id="code-heading"
                className="heading-section text-foreground mt-2"
              >
                Read the code
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Folder: <code>{CASE_STUDY.codeLinks.folder}</code> · Start with{" "}
                <code>{CASE_STUDY.codeLinks.readme}</code>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Repo: <code>{CASE_STUDY.codeLinks.repo}</code>
              </p>
            </Reveal>
            <DemoWorkStrip />
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
