import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { processSteps } from "@/data/brandEdgeContent";

function ProcessStep({
  step,
  index,
  progress,
}: {
  step: (typeof processSteps)[0];
  index: number;
  progress: MotionValue<number>;
}) {
  const start = index / processSteps.length;
  const end = (index + 1) / processSteps.length;
  const opacity = useTransform(
    progress,
    [start - 0.15, start + 0.05, end - 0.05, end + 0.15],
    [0.3, 1, 1, 0.3],
  );

  return (
    <motion.div style={{ opacity }} className="border-t border-secondary/10 pt-4 pb-3">
      <div className="grid grid-cols-12 gap-3 lg:gap-5">
        <div className="col-span-1">
          <span className="font-mono text-[11px] tracking-wider text-accent">{step.number}</span>
        </div>
        <div className="col-span-3 lg:col-span-3">
            <h3 className="font-display font-bold text-secondary" style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.2rem)" }}>
              {step.title}
            </h3>
            <span className="font-mono text-[10px] tracking-wider text-secondary/30">{step.duration}</span>
        </div>
        <div className="col-span-5 lg:col-span-5">
          <p className="text-secondary/60 leading-relaxed text-xs">{step.description}</p>
        </div>
        <div className="col-span-3 lg:col-span-3">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-secondary/40">Deliverables</span>
          <ul className="mt-2 space-y-1.5">
            {step.deliverables.map((d) => (
              <li key={d} className="flex items-center gap-2 text-xs text-secondary/50">
                <span className="w-1.5 h-1.5 bg-accent shrink-0" />
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default function BrandEdgeProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={sectionRef}
      id="process"
      className="section-pad bg-primary relative"
    >
      <div className="container">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3 mb-6">
          <div>
            <div className="section-label text-secondary/40">
              <span className="section-label-line" />
              How I Work
            </div>
            <h2 className="heading-serif font-bold text-secondary" style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)" }}>
              Three steps.
              <span className="italic font-light text-accent block text-sm"> No fluff.</span>
            </h2>
          </div>
          <p className="text-xs text-secondary/50 max-w-xs leading-relaxed lg:text-right">
            A straightforward process that moves your project from idea to launch with no wasted time.
          </p>
        </div>

        <div>
          {processSteps.map((step, i) => (
            <ProcessStep key={step.number} step={step} index={i} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
