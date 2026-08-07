import { motion } from "framer-motion";
import { Ruler, Boxes, Code2 } from "lucide-react";

const cards = [
  {
    icon: Ruler,
    title: "UI Guidelines & Standards",
    desc: "Tokens, spacing, type scale, and interaction rules — so every screen ships on the same standard, no matter who builds it.",
  },
  {
    icon: Boxes,
    title: "Design Systems",
    desc: "Component libraries that scale across products, with every state specified and documented for reuse.",
  },
  {
    icon: Code2,
    title: "Developer Handoff",
    desc: "Annotated specs, edge cases, and feasibility trade-offs — discussed with engineers, not thrown over the wall.",
  },
];

export default function DesignPlaybook() {
  return (
    <section id="playbook" className="section-pad bg-secondary border-t border-border">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-14 items-start">
            <div>
              <span className="section-label">
                <span className="section-label-line" />
                Design Playbook
              </span>
              <h2 className="heading-section text-foreground mb-3">I set the standard, then keep it.</h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                Reusable UI guidelines, component libraries, and developer-ready handoff —
                so quality survives at scale.
              </p>
            </div>

            <div className="space-y-4">
              {cards.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex gap-4 border border-border bg-card p-5 transition-all duration-300 hover:border-foreground/40 hover:-translate-y-0.5"
                >
                  <div className="shrink-0 w-10 h-10 flex items-center justify-center border border-border bg-secondary text-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                    <card.icon size={18} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-foreground mb-1">{card.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
