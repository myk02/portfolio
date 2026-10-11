import { Link } from "wouter";
import SiteHead from "@/components/SiteHead";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/ui/section";
import { Card } from "@/components/ui/kicker";
import { useReveal } from "@/hooks/useReveal";
import ItSecuritySkills from "@/it-security/components/ItSecuritySkills";
import { CASE_STUDIES, IT_SECURITY_INTRO, SITE_SECURITY_MEASURES } from "@/it-security/content";

const RESOURCES = [
  { file: "starter-leaver-checklist.md", name: "Starter & leaver checklist", text: "Accounts, access, devices and licences for joining and leaving staff." },
  { file: "access-register.md", name: "Access register", text: "Who has access to what, who approved it, and when it was last reviewed." },
  { file: "backup-restore-log.md", name: "Backup & restore test log", text: "Quarterly restore-test routine with a results log." },
  { file: "incident-report.md", name: "Incident report", text: "What happened, timeline, cause, fix and prevention." },
  { file: "security-awareness-one-pager.md", name: "Staff security one-pager", text: "Phishing, passwords and safe data handling in simple English." },
  { file: "asset-inventory.md", name: "IT asset inventory", text: "One row per device, from issue to return." },
];

export default function ItSecurity() {
  useReveal();
  return (
    <div className="min-h-screen bg-secondary">
      <SiteHead
        title="IT Support & Security — Mike Waitindi"
        description="First-line IT support, device setup and practical security habits from real support work in Nairobi, plus reusable security templates."
        canonical="/it-security"
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
              <SectionLabel>{IT_SECURITY_INTRO.title}</SectionLabel>
              <h1 className="heading-section text-foreground mt-2">Helpful support, careful with data</h1>
              <p className="mt-3 text-sm text-muted-foreground">{IT_SECURITY_INTRO.lede}</p>
            </Reveal>
            <ul className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto list-none p-0">
              {IT_SECURITY_INTRO.points.map((p) => (
                <Reveal key={p}>
                  <Card className="p-4 h-full">
                    <p className="text-[0.8375rem] text-foreground leading-relaxed">{p}</p>
                  </Card>
                </Reveal>
              ))}
            </ul>
          </div>

          <section aria-labelledby="it-skills">
            <div id="it-skills">
              <ItSecuritySkills />
            </div>
          </section>

          <section aria-labelledby="cases-heading">
            <Reveal className="section-intro mb-8">
              <SectionLabel>Case studies · real work</SectionLabel>
              <h2 id="cases-heading" className="heading-section text-foreground mt-2">
                Where I have done this
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-5xl mx-auto">
              {CASE_STUDIES.map((c) => (
                <Reveal key={c.title}>
                  <Card className="p-5 h-full space-y-3">
                    <p className="text-[0.6875rem] font-mono uppercase tracking-widest text-muted-foreground">{c.badge}</p>
                    <h3 className="font-display font-semibold text-foreground text-[1.05rem] leading-snug">{c.title}</h3>
                    <div className="space-y-2 text-[0.8375rem] text-muted-foreground leading-relaxed">
                      <p><strong className="text-foreground font-medium">Situation: </strong>{c.situation}</p>
                      <div>
                        <p><strong className="text-foreground font-medium">What I did:</strong></p>
                        <ul className="list-disc pl-5 space-y-1">
                          {c.did.map((d) => (
                            <li key={d}>{d}</li>
                          ))}
                        </ul>
                      </div>
                      <p><strong className="text-foreground font-medium">Under pressure: </strong>{c.pressure}</p>
                      <p><strong className="text-foreground font-medium">Keeping data safe: </strong>{c.dataSafety}</p>
                      <p><strong className="text-foreground font-medium">What I learned: </strong>{c.learned}</p>
                      <p><strong className="text-foreground font-medium">What I would improve: </strong>{c.improve}</p>
                    </div>
                  </Card>
                </Reveal>
              ))}
            </div>
          </section>

          <section aria-labelledby="site-security-heading">
            <Reveal className="section-intro mb-8">
              <SectionLabel>Proof on this site</SectionLabel>
              <h2 id="site-security-heading" className="heading-section text-foreground mt-2">
                How I secure this site
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Exactly what was done — and one gap I list openly instead of claiming.
              </p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
              {SITE_SECURITY_MEASURES.map((m) => (
                <Reveal key={m.title}>
                  <Card className="p-4 h-full">
                    <h3 className="font-display font-semibold text-foreground">{m.title}</h3>
                    <p className="mt-1 text-[0.8375rem] text-muted-foreground leading-relaxed">{m.text}</p>
                  </Card>
                </Reveal>
              ))}
            </div>
          </section>

          <section aria-labelledby="resources-heading">
            <Reveal className="section-intro mb-8">
              <SectionLabel>Templates · prepared, not performed</SectionLabel>
              <h2 id="resources-heading" className="heading-section text-foreground mt-2">
                Security templates
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                These are templates I prepared for a small team to copy — not records of work done for an employer.
                Source files live in <code>client/src/it-security/resources/</code>.
              </p>
            </Reveal>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto list-none p-0">
              {RESOURCES.map((r) => (
                <Reveal key={r.file}>
                  <Card className="p-4 h-full">
                    <p className="text-[0.6875rem] font-mono uppercase tracking-widest text-muted-foreground">Template · {r.file}</p>
                    <h3 className="mt-1 font-display font-semibold text-foreground">{r.name}</h3>
                    <p className="mt-1 text-[0.8375rem] text-muted-foreground leading-relaxed">{r.text}</p>
                  </Card>
                </Reveal>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
