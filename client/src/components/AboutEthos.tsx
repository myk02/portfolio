import { ShieldCheck, Sparkles, Target, HeartHandshake } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/ui/section";

const PILLARS = [
  {
    icon: ShieldCheck,
    title: "Security awareness",
    subtitle: "Spot scams fast",
    description: "Real scam breakdowns, minus the jargon.",
  },
  {
    icon: Target,
    title: "Systems & IP",
    subtitle: "Least-privilege access",
    description: "Tight access for legal and business assets.",
  },
  {
    icon: Sparkles,
    title: "Marketing & sales",
    subtitle: "Stories that sell",
    description: "Clear funnels for complex tech.",
  },
];

export default function AboutEthos() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="section-pad bg-background border-t border-border relative overflow-hidden"
    >
      <div className="container">
        <Reveal className="section-head">
          <div>
            <SectionLabel>Ethos</SectionLabel>
            <h2 id="about-heading" className="heading-section text-foreground">
              How I work
            </h2>
          </div>
          <span className="section-note hidden sm:inline-block">
            Nairobi · Founder
          </span>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: short personal note */}
          <Reveal className="lg:col-span-5 space-y-4">
            <div className="p-6 sm:p-7 bg-card border border-border border-l-2 border-l-accent shadow-xs space-y-4 relative">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                <HeartHandshake size={15} className="text-accent" aria-hidden />
                <span>My view</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-foreground leading-snug">
                “Security starts with people.”
              </h3>
              <p className="text-[0.92rem] text-muted-foreground leading-relaxed">
                I founded <strong className="text-foreground font-semibold">Lotts</strong> to make security clear, not scary.
              </p>
              <div className="pt-3 border-t border-border/80 flex items-center justify-between text-xs font-mono text-foreground/80">
                <span className="font-medium text-foreground">Mike Waitindi</span>
                <span className="text-muted-foreground">Founder, Lotts · Nairobi</span>
              </div>
            </div>
          </Reveal>

          {/* Right: three focus areas */}
          <div className="lg:col-span-7 grid grid-cols-1 gap-3.5">
            {PILLARS.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <Reveal key={pillar.title} delay={(i % 3) as 0 | 1 | 2}>
                  <div className="p-5 bg-card border border-border group relative overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-[0_8px_16px_-6px_rgba(0,0,0,0.06)]">
                    <span
                      className="absolute top-0 left-0 h-[2px] w-0 bg-accent transition-all duration-300 group-hover:w-full"
                      aria-hidden
                    />
                    <div className="flex items-start gap-4">
                      <span
                        className="w-10 h-10 grid place-items-center border border-border bg-secondary text-foreground shrink-0 group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-colors"
                        aria-hidden
                      >
                        <Icon size={17} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-display font-semibold text-foreground text-[1.02rem] tracking-tight group-hover:text-foreground">
                            {pillar.title}
                          </h4>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground shrink-0 border border-border/60 bg-secondary/50 px-2 py-0.5">
                            0{i + 1}
                          </span>
                        </div>
                        <p className="text-[11px] font-mono text-foreground/60 uppercase tracking-wider mt-0.5">
                          {pillar.subtitle}
                        </p>
                        <p className="mt-2 text-[0.85rem] text-muted-foreground leading-relaxed">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
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
