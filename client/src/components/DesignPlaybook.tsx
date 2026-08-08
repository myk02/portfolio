import { Ruler, Boxes, Code2 } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const cards = [
  {
    icon: Ruler,
    title: "UI Guidelines",
    desc: "Tokens · spacing · type · states",
  },
  {
    icon: Boxes,
    title: "Design Systems",
    desc: "Components · variants · docs",
  },
  {
    icon: Code2,
    title: "Developer Handoff",
    desc: "Specs · edge cases · build-ready",
  },
];

export default function DesignPlaybook() {
  return (
    <section id="playbook" className="section-pad bg-secondary border-t border-border">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-14 items-start">
            <Reveal>
              <span className="section-label">
                <span className="section-label-line" />
                Design Playbook
              </span>
              <h2 className="heading-section text-foreground mb-3">I set the standard.</h2>
            </Reveal>

            <div className="space-y-4">
              {cards.map((card, i) => (
                <Reveal
                  key={card.title}
                  delay={i}
                  className="group flex gap-4 border border-border bg-card p-5 transition-all duration-300 hover:border-foreground/40 hover:-translate-y-0.5"
                >
                  <div className="shrink-0 w-10 h-10 flex items-center justify-center border border-border bg-secondary text-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                    <card.icon size={18} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-foreground mb-1">{card.title}</h3>
                    <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{card.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
