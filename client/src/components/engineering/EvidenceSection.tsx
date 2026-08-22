import { Reveal } from "@/components/Reveal";
import {
  evidenceCards,
  engineeringIntro,
} from "@/data/engineering";

/**
 * "Engineering evidence" section — recruiter-readable proof cards.
 * Every claim maps to something verifiable in this repository or the
 * documented case studies; see client/src/data/engineering.ts.
 */
export default function EngineeringEvidence() {
  return (
    <section
      id="engineering"
      className="section-pad bg-secondary border-t border-border"
    >
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <Reveal as="div" className="mb-10">
            <span className="section-label">
              <span className="section-label-line" />
              Engineering evidence
            </span>
            <h2 className="heading-section text-foreground mb-3">
              How I build, with proof
            </h2>
            <p className="text-muted-foreground text-sm max-w-2xl">
              {engineeringIntro}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {evidenceCards.map((card, i) => (
              <Reveal
                key={card.id}
                delay={i % 3}
                className={
                  i === 0 ? "lg:row-span-2 flex" : undefined
                }
              >
                <article className="border border-border bg-card p-5 h-full w-full flex flex-col hover:border-foreground/40 transition-colors">
                  <h3 className="font-display font-bold text-lg text-foreground mb-1">
                    {card.title}
                  </h3>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-accent mb-4">
                    Verified in this repo
                  </p>
                  <ul className="space-y-2.5 mt-auto">
                    {card.points.map((point, j) => (
                      <li
                        key={j}
                        className="text-[13px] text-muted-foreground leading-snug pl-4 relative"
                      >
                        <span
                          aria-hidden
                          className="absolute left-0 top-[7px] w-1.5 h-1.5 bg-accent shrink-0"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
