import { Reveal } from "@/components/Reveal";
import {
  evidenceCards,
  capabilityCards,
  engineeringIntro,
  type EvidenceCard,
} from "@/data/engineering";

function Card({ card, delay }: { card: EvidenceCard; delay: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className="border border-border bg-card p-5 h-full w-full flex flex-col hover:border-foreground/40 transition-colors">
        <h3 className="font-display font-bold text-lg text-foreground mb-1">
          {card.title}
        </h3>
        <p className="text-[10px] font-mono uppercase tracking-widest text-accent mb-4">
          {card.sourceLabel ?? "Verified in this repo"}
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
  );
}

/**
 * "Engineering evidence" section — recruiter-readable proof cards.
 * Row 1: frontend core, every claim inspectable in this repository.
 * Row 2: broader capabilities (APIs, automation, support…) with explicit
 * per-card provenance labels.
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

          {/* Frontend core */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {evidenceCards.map((card, i) => (
              <Card key={card.id} card={card} delay={i % 3} />
            ))}
          </div>

          {/* Beyond the frontend */}
          <Reveal as="div" className="mt-14 mb-8">
            <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Beyond the frontend — APIs, automation, support
            </h3>
            <p className="text-[13px] text-muted-foreground mt-2 max-w-2xl leading-snug">
              Each card names its evidence source: items marked{" "}
              <span className="text-foreground">Verified in this repo</span> can
              be inspected in this codebase;{" "}
              <span className="text-foreground">Professional experience</span>{" "}
              reflects client and support work described in my services history.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilityCards.map((card, i) => (
              <Card key={card.id} card={card} delay={i % 3} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
