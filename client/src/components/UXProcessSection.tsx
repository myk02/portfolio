import { useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { useInView } from "@/hooks/useInView";
import { ProcessShot } from "@/components/DevicePairImage";
import { homeProcessPhases, type ProcessPhaseKey } from "@/data/processImages";

function ProcessTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);
  useInView(ref, (v) => {
    if (v) setDrawn(true);
  });

  const titles: ProcessPhaseKey[] = ["discover", "define", "design", "validate"];

  return (
    <div ref={ref} className="hidden md:flex items-center gap-0 mb-8 px-2">
      {titles.map((title, i) => (
        <div key={title} className="flex items-center flex-1 min-w-0">
          <div className="flex flex-col items-center shrink-0">
            <span className="w-3 h-3 rounded-full bg-accent border-2 border-primary" />
            <span className="mt-2 text-[10px] font-mono uppercase tracking-widest text-secondary/70 capitalize">
              {title}
            </span>
          </div>
          {i < titles.length - 1 && (
            <div className="flex-1 h-[2px] mx-2 bg-secondary/25 overflow-hidden">
              <div className={`process-line h-full bg-accent ${drawn ? "drawn" : ""}`} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const phases: {
  number: string;
  title: ProcessPhaseKey;
  def: string;
}[] = [
  { number: "01", title: "discover", def: "Interviews · surveys · analytics" },
  { number: "02", title: "define", def: "Flows · maps · wireframes" },
  { number: "03", title: "design", def: "Hi-fi · mobile & desktop" },
  { number: "04", title: "validate", def: "Test · iterate · ship" },
];

export default function UXProcessSection() {
  return (
    <section id="process" className="section-pad bg-primary border-t border-border">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 sm:mb-12">
            <Reveal>
              <span className="section-label text-secondary/70">
                <span className="section-label-line" />
                How I work
              </span>
              <h2 className="heading-section text-secondary mb-3">Discover → Validate</h2>
              <p className="text-secondary/60 text-sm max-w-md">
                Real projects · mobile &amp; desktop · Figma to live product.
              </p>
            </Reveal>
          </div>

          <ProcessTimeline />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {phases.map((phase, i) => {
              const img = homeProcessPhases[phase.title];
              return (
                <Reveal
                  key={phase.number}
                  delay={i}
                  className="group border border-secondary/25 bg-primary flex flex-col relative overflow-hidden hover:border-secondary/60 transition-colors"
                >
                  <span
                    aria-hidden
                    className="absolute bottom-0 left-0 w-full h-[3px] bg-accent origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
                  />
                  <div className="p-4 sm:p-5 pb-2">
                    <div className="flex items-baseline gap-3 mb-3">
                      <span className="font-mono text-xs tracking-widest text-accent">{phase.number}</span>
                      <h3 className="font-display font-bold text-xl text-secondary capitalize group-hover:text-accent transition-colors">
                        {phase.title}
                      </h3>
                    </div>
                    <p className="text-secondary text-xs font-mono uppercase tracking-wider opacity-70 mb-3">
                      {phase.def}
                    </p>
                  </div>
                  <div className="h-[140px] sm:h-[160px] border-t border-secondary/15 bg-[#0a0a0a]/20">
                    <ProcessShot slug={img.slug} stage={img.stage} alt={phase.title} />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
