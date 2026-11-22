import { ShieldCheck, Sparkles, Target, HeartHandshake } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/ui/section";

const PILLARS = [
  {
    icon: ShieldCheck,
    title: "Proactive Sensitization",
    subtitle: "Security without fear",
    description:
      "Most digital attacks prey on confusion, not complex exploits. I break down real attack vectors — verification scams, session hijacks, social engineering — so people and businesses recognize threats instantly.",
  },
  {
    icon: Target,
    title: "IP & Systems Protection",
    subtitle: "Safeguarding what you build",
    description:
      "From safeguarding institutional records at the Council of Legal Education to protecting proprietary assets at Lotts, I focus on solid access boundaries, least-privilege security, and resilient workflows.",
  },
  {
    icon: Sparkles,
    title: "Marketing & Sales Clarity",
    subtitle: "Stories that convert",
    description:
      "Technical mastery alone doesn't build a business. I create engaging UGC campaigns and clear conversion funnels that translate sophisticated tech into compelling reasons for customers to say yes.",
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
            <SectionLabel>Perspective &amp; Ethos</SectionLabel>
            <h2 id="about-heading" className="heading-section text-foreground">
              Behind the work
            </h2>
          </div>
          <span className="section-note hidden sm:inline-block">
            Nairobi · Founder &amp; Educator
          </span>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Personal narrative */}
          <Reveal className="lg:col-span-5 space-y-4">
            <div className="p-6 bg-secondary/50 border border-border space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                <HeartHandshake size={14} className="text-accent" aria-hidden />
                <span>The Human Philosophy</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-foreground leading-snug">
                "Cybersecurity is human before it is technical."
              </h3>
              <p className="text-[0.92rem] text-muted-foreground leading-relaxed">
                I founded <strong className="text-foreground font-medium">Lotts</strong> because I saw too many creators, founders, and small teams lose their channels, databases, and intellectual property to preventable attacks.
              </p>
              <p className="text-[0.92rem] text-muted-foreground leading-relaxed">
                Security shouldn't be locked behind enterprise walls or esoteric jargon. When people understand <em>why</em> a threat works, they intuitively know how to defend against it.
              </p>
              <div className="pt-2 border-t border-border flex items-center gap-3 text-xs font-mono text-foreground/70">
                <span>Mike Waitindi</span>
                <span>·</span>
                <span className="text-muted-foreground">Founder @ Lotts</span>
              </div>
            </div>
          </Reveal>

          {/* Right: Three core focus pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 gap-3.5">
            {PILLARS.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <Reveal key={pillar.title} delay={(i % 3) as 0 | 1 | 2}>
                  <div className="p-5 bg-card border border-border group hover:border-foreground/30 transition-all hover:shadow-[3px_3px_0_rgba(10,10,10,0.05)]">
                    <div className="flex items-start gap-4">
                      <span
                        className="w-9 h-9 grid place-items-center border border-border bg-secondary text-foreground shrink-0 group-hover:bg-accent group-hover:text-accent-foreground transition-colors"
                        aria-hidden
                      >
                        <Icon size={16} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-display font-semibold text-foreground text-[1rem] tracking-tight">
                            {pillar.title}
                          </h4>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground shrink-0">
                            {pillar.subtitle}
                          </span>
                        </div>
                        <p className="mt-1.5 text-[0.84rem] text-muted-foreground leading-relaxed">
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
