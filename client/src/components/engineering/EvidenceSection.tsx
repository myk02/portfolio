import { Reveal } from "@/components/Reveal";
import { evidenceCards, engineeringIntro } from "@/data/engineering";

/**
 * Compact "Engineering evidence" strip — five short proof cards, every claim
 * inspectable in this repository (see client/src/data/engineering.ts).
 */
export default function EngineeringEvidence() {
  return (
    <section
      id="engineering"
      className="section-pad bg-secondary border-t border-border"
    >
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <Reveal as="div" className="mb-8">
            <span className="section-label">
              <span className="section-label-line" />
              Engineering evidence
            </span>
            <h2 className="heading-section text-foreground mb-2">
              Proof, not claims
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl">
              {engineeringIntro}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {evidenceCards.map((card, i) => (
              <Reveal key={card.id} delay={i % 3} className="h-full">
                <article className="border border-border bg-card p-4 h-full flex flex-col hover:border-foreground/40 transition-colors">
                  <h3 className="font-display font-bold text-base text-foreground mb-3">
                    {card.title}
                  </h3>
                  <ul className="space-y-2 mt-auto">
                    {card.points.map((point, j) => (
                      <li
                        key={j}
                        className="text-[12.5px] text-muted-foreground leading-snug pl-3 relative"
                      >
                        <span
                          aria-hidden
                          className="absolute left-0 top-[7px] w-1 h-1 bg-accent shrink-0"
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
