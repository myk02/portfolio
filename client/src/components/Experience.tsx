import { ExternalLink } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/ui/section";
import { CONTACT } from "@/lib/site";

const ROWS = [
  {
    role: "Founder",
    where: "Bytedefend · Oct 2026 – Present · Remote",
    proof:
      "Teaching cybersecurity from beginner to expert via explainer videos. Exposing hacker and scammer methods to protect users and businesses.",
    link: CONTACT.tiktok,
    linkLabel: "TikTok @bytedefend",
  },
  {
    role: "Marketing Lead",
    where: "Freelancer.com · Jan 2024 – Oct 2026 · Remote",
    proof:
      "Premium marketing campaigns, product selling points, AI & emerging technology research.",
  },
  {
    role: "ICT Intern",
    where: "Council of Legal Education · Jan 2024 – Feb 2025",
    proof: "Systems automation, technical support, and ICT operations.",
  },
  {
    role: "IT Clerk",
    where: "IEBC · Jul 2022 – Oct 2022",
    proof: "Hardware, software, and secure network infrastructure under strict SLAs.",
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
          <SectionLabel>Track record</SectionLabel>
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
                className="px-4 py-3 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4"
              >
                <dt className="text-[11px] font-mono uppercase tracking-widest text-foreground shrink-0 sm:w-44 font-semibold">
                  {r.role}
                </dt>
                <dd className="min-w-0 flex-1 text-[0.82rem] leading-snug">
                  <span className="text-muted-foreground">{r.where} — </span>
                  <span className="text-foreground">{r.proof}</span>
                  {"link" in r && r.link && (
                    <span className="block mt-1">
                      <a
                        href={r.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-accent hover:underline"
                      >
                        {r.linkLabel} <ExternalLink size={11} aria-hidden />
                      </a>
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
