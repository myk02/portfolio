import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/ui/section";

const ROWS = [
  { role: "Software Engineer", where: "Freelancer.com · Jan 2024 – Present · Remote", proof: "Full-stack web apps + third-party payments." },
  { role: "Software Engineer", where: "Upwork · Sep 2024 – Jan 2025 · Remote", proof: "Sites, mobile + desktop apps for clients." },
  { role: "IT Clerk (ICT Officer)", where: "IEBC · Jul – Oct 2022 · On-site", proof: "Hardware, software + network support; staff training." },
  { role: "Junior Software Engineer", where: "Freelancer.com · Jul 2021 – Feb 2022 · Remote", proof: "Web apps for clients." },
  { role: "AI Automation", where: "Self-practice · Since 2025", proof: "Workflows + automations for small businesses." },
] as const;

/** Proof at a glance: short rows, no paragraphs. */
export default function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="section-pad bg-secondary border-t border-border"
    >
      <div className="container">
        <Reveal className="section-intro mb-8">
          <SectionLabel>Proof</SectionLabel>
          <h2 id="experience-heading" className="heading-section text-foreground mt-2">
            Experience
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">Freelance software engineer since 2021 · IEBC electoral IT support 2022.</p>
        </Reveal>

        <Reveal>
          <dl className="max-w-3xl mx-auto border border-border bg-card divide-y divide-border">
            {ROWS.map((r) => (
              <div key={`${r.role}-${r.where}`} className="px-4 py-3 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                <dt className="text-[11px] font-mono uppercase tracking-widest text-foreground shrink-0 sm:w-40">
                  {r.role}
                </dt>
                <dd className="min-w-0 flex-1 text-[0.8375rem] leading-relaxed">
                  <span className="text-muted-foreground">{r.where} — </span>
                  <span className="text-foreground">{r.proof}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
