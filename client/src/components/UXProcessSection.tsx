import { motion } from "framer-motion";

const processSteps = [
  {
    number: "01",
    title: "Discover",
    desc: "Interviews, workshops, and surveys to understand users, goals, and constraints before any visual work begins.",
    deliverables: ["User interviews", "Stakeholder workshops", "Surveys & analytics"],
  },
  {
    number: "02",
    title: "Define",
    desc: "Turning research into structure — mapping the problem, the journeys, and the flows that solve them.",
    deliverables: ["Site maps", "User flows", "Wireframes"],
  },
  {
    number: "03",
    title: "Design",
    desc: "Crafting the visual and interactive layer — high-fidelity screens with consistent systems and clear specs.",
    deliverables: ["High-fidelity prototypes", "UI specs", "Design systems"],
  },
  {
    number: "04",
    title: "Validate",
    desc: "Testing with real users, gathering feedback, and iterating until the experience feels effortless.",
    deliverables: ["Usability testing", "Feedback loops", "Iteration"],
  },
];

export default function UXProcessSection() {
  return (
    <section id="process" className="section-pad bg-primary border-t border-border">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <span className="section-label text-secondary/70">
              <span className="section-label-line" />
              How I work
            </span>
            <h2
              className="heading-serif font-bold text-secondary mb-2"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}
            >
              My Design Process
            </h2>
            <p className="text-secondary text-base max-w-lg leading-relaxed">
              A research-driven, four-phase approach that moves from user insight to validated product.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="border border-secondary/25 p-6 group hover:border-secondary/50 transition-colors"
              >
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-mono text-xs tracking-widest text-accent">
                    {step.number}
                  </span>
                  <h3 className="font-display font-bold text-xl text-secondary group-hover:text-accent transition-colors">
                    {step.title}
                  </h3>
                </div>
                <p className="text-secondary text-sm leading-relaxed mb-4">
                  {step.desc}
                </p>
                <ul className="space-y-1.5">
                  {step.deliverables.map((d) => (
                    <li
                      key={d}
                      className="flex items-center gap-2 text-sm text-secondary"
                    >
                      <span className="w-1.5 h-1.5 bg-accent shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
