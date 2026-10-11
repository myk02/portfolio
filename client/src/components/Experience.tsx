import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/ui/section";

const ROWS = [
  { role: "Software Developer", where: "Independent", proof: "3 live demos — open and click." },
  { role: "ICT Officer", where: "CLE · Jan 24 – Jan 25", proof: "30+/wk support · 2,000+ records kept safe." },
  { role: "ICT Officer", where: "IEBC · Jul – Oct 22", proof: "20+ stations · 50+ staff trained · 500+ voters." },
  { role: "AI Automation", where: "Demo build", proof: "Sourced summaries · human approves · $0 mock." },
] as const;

/** Proof at a glance: 4 short rows, no paragraphs. */
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
            Experience in 30 seconds
          </h2>
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
