import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/ui/section";

const ROWS = [
  {
    role: "Freelancer · Full-Stack Software Engineer",
    where: "Self-employed · Feb 2025 – Present · Nairobi / Remote",
    proof:
      "Web, mobile + desktop apps for clients with third-party payments — now venturing into marketing with AI.",
  },
  {
    role: "ICT Intern",
    where: "Council of Legal Education · Jan 2024 – Feb 2025 · On-site",
    proof: "Technical support + ICT operations for the council.",
  },
  {
    role: "IT Clerk",
    where: "IEBC · Jul 2022 – Oct 2022 · On-site",
    proof: "Hardware, software + network support; staff training.",
  },
  {
    role: "Junior Software Engineer",
    where: "Freelancer.com · Jul 2021 – Feb 2022 · Remote",
    proof: "Web apps for clients.",
  },
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
        <Reveal className="section-head">
          <SectionLabel>Proof</SectionLabel>
          <h2
            id="experience-heading"
            className="heading-section text-foreground"
          >
            Experience
          </h2>
        </Reveal>

        <Reveal>
          <dl className="max-w-3xl border border-border bg-card divide-y divide-border">
            {ROWS.map(r => (
              <div
                key={`${r.role}-${r.where}`}
                className="px-4 py-2.5 flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-4"
              >
                <dt className="text-[11px] font-mono uppercase tracking-widest text-foreground shrink-0 sm:w-44">
                  {r.role}
                </dt>
                <dd className="min-w-0 flex-1 text-[0.82rem] leading-snug">
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
