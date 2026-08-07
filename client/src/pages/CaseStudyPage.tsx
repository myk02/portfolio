import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { caseStudies, type CaseSection } from "@/data/caseStudies";
import NotFound from "@/pages/NotFound";
import BrandEdgeFooter from "@/components/BrandEdgeFooter";
import BrandEdgeHeader from "@/components/BrandEdgeHeader";
import BankingArt from "@/components/art/BankingArt";
import DashboardArt from "@/components/art/DashboardArt";
import DesignSystemArt from "@/components/art/DesignSystemArt";
import { goHomeToSection } from "@/lib/navigation";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="section-label mb-2">
      <span className="section-label-line" />
      {children}
    </span>
  );
}

function SectionHeader({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-baseline gap-3 mb-5">
      <span className="font-mono text-xs tracking-widest text-muted-foreground">{index}</span>
      <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground tracking-tight">
        {title}
      </h2>
    </div>
  );
}

function SectionBlock({
  index,
  title,
  section,
  children,
}: {
  index: string;
  title: string;
  section: CaseSection;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-t border-border pt-10 mt-10 first:border-t-0 first:mt-0 first:pt-0">
      <SectionHeader index={index} title={title} />
      {section.lead && (
        <p className="text-foreground font-medium text-lg leading-relaxed mb-4">{section.lead}</p>
      )}
      {section.paragraphs?.map((p) => (
        <p key={p.slice(0, 32)} className="text-muted-foreground leading-relaxed mb-4">
          {p}
        </p>
      ))}

      {section.callouts && section.callouts.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-4 my-6">
          {section.callouts.map((c) => (
            <blockquote
              key={c.source}
              className="border-l-2 border-accent bg-card p-5 text-foreground text-base leading-relaxed"
            >
              <p className="font-display font-semibold">“{c.quote}”</p>
              <footer className="mt-3 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                — {c.source}
              </footer>
            </blockquote>
          ))}
        </div>
      )}

      {section.bullets && section.bullets.length > 0 && (
        <ul className="space-y-3 my-6">
          {section.bullets.map((b) => (
            <li key={b.text} className="flex gap-3 text-muted-foreground leading-relaxed text-base">
              <span
                className={`mt-1.5 shrink-0 w-4 h-4 rounded-[4px] flex items-center justify-center ${
                  b.label?.startsWith("Kept") || b.label === "Onboarding" || b.label === "Browse"
                    ? "bg-accent text-accent-foreground"
                    : "bg-foreground text-background"
                }`}
              >
                {b.label?.startsWith("Rejected") ? (
                  <X size={10} strokeWidth={3} />
                ) : (
                  <Check size={10} strokeWidth={3} />
                )}
              </span>
              <span>
                {b.label && (
                  <span className="font-semibold text-foreground">{b.label}: </span>
                )}
                {b.text}
              </span>
            </li>
          ))}
        </ul>
      )}

      {children}
    </section>
  );
}

function GreyscaleFrame({ label, isHiFi = false }: { label: string; isHiFi?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={`w-[74px] sm:w-20 rounded-[10px] border p-2 ${
          isHiFi ? "bg-card border-foreground/40" : "bg-secondary border-foreground/25"
        }`}
        style={{ aspectRatio: "9/17" }}
      >
        <div className="h-[3px] w-2/3 rounded-pill bg-foreground opacity-20 mb-2" />
        <div className="space-y-1.5">
          <div className="h-2 rounded-[2px] bg-foreground opacity-25" />
          <div className="h-2 w-3/4 rounded-[2px] bg-foreground opacity-15" />
          <div className="h-3 rounded-[3px] bg-foreground opacity-10 mt-2" />
          <div className="h-3 rounded-[3px] bg-foreground opacity-10" />
          <div className="h-2 w-1/2 rounded-[2px] bg-foreground opacity-15 mt-2" />
          <div className="h-4 rounded-[3px] bg-foreground opacity-20 mt-2" />
        </div>
      </div>
      <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

function WireframeStrip({ labels }: { labels: string[] }) {
  return (
    <div className="flex justify-center gap-4 sm:gap-6 my-8 flex-wrap">
      {labels.map((l, i) => (
        <GreyscaleFrame key={l} label={`${i + 1} · ${l}`} />
      ))}
    </div>
  );
}

function FlowDiagram({ steps, title, accent }: { steps: string[]; title: string; accent: boolean }) {
  return (
    <div className="rounded-soft-sm border border-border bg-card p-4">
      <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">{title}</p>
      <div className="flex items-center justify-center flex-wrap gap-2">
        {steps.map((s, i) => (
          <span key={s} className="flex items-center gap-2">
            <span
              className={`px-2.5 py-1.5 text-xs font-semibold rounded-[6px] border ${
                accent && i === steps.length - 1
                  ? "bg-accent text-accent-foreground border-accent"
                  : "bg-secondary border-border text-foreground"
              }`}
            >
              {s}
            </span>
            {i < steps.length - 1 && (
              <span className="text-muted-foreground text-sm">→</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

function BeforeAfterFlows() {
  return (
    <div className="grid md:grid-cols-2 gap-4 my-8">
      <FlowDiagram
        title="Before · 8 steps"
        steps={["Open", "Details", "Documents", "Verification", "Address", "PIN", "Agreements", "Done"]}
        accent={false}
      />
      <FlowDiagram
        title="After · 4 steps"
        steps={["Phone", "ID", "PIN", "Photo → Done"]}
        accent
      />
    </div>
  );
}

function AtAGlance({ study }: { study: (typeof caseStudies)[number] }) {
  const rows = [
    { label: "Role", value: study.role },
    { label: "Timeline", value: study.timeline },
    { label: "Tools", value: study.tools.join(", ") },
    { label: "Contributions", value: study.methods.join(" · ") },
    { label: "Outcome", value: study.outcomes[0] ? `${study.outcomes[0].value} ${study.outcomes[0].metric.toLowerCase()}` : "—" },
  ];
  return (
    <aside className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-auto border border-border bg-card">
      <p className="px-5 pt-5 pb-3 text-xs font-mono uppercase tracking-widest text-muted-foreground border-b border-border">
        At a glance
      </p>
      <dl className="px-5 py-4 space-y-4">
        {rows.map((r) => (
          <div key={r.label}>
            <dt className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
              {r.label}
            </dt>
            <dd className="text-sm text-foreground leading-snug">{r.value}</dd>
          </div>
        ))}
      </dl>
      {study.liveUrl && (
        <div className="px-5 pb-5">
          <a
            href={study.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary w-full text-sm justify-center"
          >
            Visit live site →
          </a>
        </div>
      )}
    </aside>
  );
}

function HeroArt({ study }: { study: (typeof caseStudies)[number] }) {
  if (study.image) {
    return (
      <div className="rounded-soft-sm border border-border bg-card p-3">
        <img
          src={study.image}
          alt={`${study.name} — shipped product screen`}
          className="w-full rounded-soft-sm"
          loading="eager"
        />
      </div>
    );
  }
  switch (study.art) {
    case "banking":
      return (
        <div className="rounded-soft-sm border border-border bg-card p-4 sm:p-6">
          <BankingArt />
        </div>
      );
    case "dashboard":
      return <DashboardArt />;
    case "design-system":
      return <DesignSystemArt />;
  }
}

function DesignGallery({ study }: { study: (typeof caseStudies)[number] }) {
  if (study.image) {
    return (
      <div className="rounded-soft-sm border border-border bg-card p-3 my-8">
        <img src={study.image} alt={`${study.name} — hi-fi screens`} className="w-full rounded-soft-sm" loading="lazy" />
      </div>
    );
  }
  return (
    <div className="my-8 rounded-soft-sm border border-border bg-card p-4 sm:p-6">
      <HeroArt study={study} />
    </div>
  );
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const index = useMemo(
    () => caseStudies.findIndex((s) => s.slug === params.slug),
    [params.slug],
  );
  const study = index >= 0 ? caseStudies[index] : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    if (study) document.title = `${study.name} — Mike Waitindi`;
  }, [study]);

  if (!study) {
    return (
      <div className="min-h-screen bg-secondary">
        <BrandEdgeHeader />
        <div className="pt-24">
          <NotFound />
        </div>
      </div>
    );
  }

  const prev = caseStudies[(index - 1 + caseStudies.length) % caseStudies.length];
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <div className="min-h-screen bg-secondary">
      <div className="noise-overlay" />
      <BrandEdgeHeader />

      <main className="pt-16">
        <section className="bg-secondary border-b border-border">
          <div className="container py-12 lg:py-16">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <Kicker>
                  Case study · {study.year} · {study.kind}
                </Kicker>
                <h1
                  className="heading-serif font-black text-foreground"
                  style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)" }}
                >
                  {study.name}
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed mt-4 max-w-2xl">
                  {study.tagline}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mt-5 flex flex-wrap gap-2"
              >
                <span className="tag-pill text-xs">{study.kind}</span>
                <span className="tag-pill text-xs">{study.year}</span>
                <span className="tag-pill text-xs">{study.timeline}</span>
                {study.tools.map((t) => (
                  <span key={t} className="tag-pill text-xs">{t}</span>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: EASE }}
                className="mt-8"
              >
                <HeroArt study={study} />
                <p className="mt-4 text-xs text-muted-foreground leading-relaxed max-w-xl">
                  {study.heroCaption}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="container py-12 lg:py-16">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_260px] gap-10 lg:gap-12 items-start">
            <article className="min-w-0">
              <SectionBlock index="01" title="The Problem" section={study.problem} />

              <SectionBlock index="02" title="Research" section={study.research} />

              <SectionBlock index="03" title="Design Thinking" section={study.designThinking} />

              <SectionBlock
                index="04"
                title="Information Architecture & Wireframes"
                section={study.ia}
              >
                {study.slug === "mobile-banking-redesign" && <BeforeAfterFlows />}
                <WireframeStrip
                  labels={
                    study.slug === "mobile-banking-redesign"
                      ? ["Phone & PIN", "Home", "Goal", "Transfer"]
                      : study.slug === "dashboard-ui-system"
                        ? ["KPI tier", "Chart", "Table", "Empty state"]
                        : study.slug === "design-system-creation"
                          ? ["Tokens", "Components", "Icons", "Docs"]
                          : ["Browse", "Route", "Itinerary", "Share"]
                  }
                />
              </SectionBlock>

              <SectionBlock index="05" title="Design" section={study.design}>
                <DesignGallery study={study} />
              </SectionBlock>

              <SectionBlock index="06" title="Testing & Iteration" section={study.testing} />

              <SectionBlock
                index="07"
                title="Outcome"
                section={{ lead: study.outcomeDetail }}
              >
                <div className="grid sm:grid-cols-3 gap-4 my-6">
                  {study.outcomes.map((o) => (
                    <div key={o.metric} className="border border-border bg-card p-4">
                      <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground mb-1.5">
                        {o.metric}
                      </p>
                      <p className="font-display font-bold text-2xl text-foreground">{o.value}</p>
                      <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{o.note}</p>
                    </div>
                  ))}
                </div>
              </SectionBlock>

              <SectionBlock
                index="08"
                title="What I'd change"
                section={{
                  bullets: study.lessons.map((l, i) => ({
                    label: String(i + 1).padStart(2, "0"),
                    text: l,
                  })),
                }}
              />
            </article>

            <div className="lg:block">
              <AtAGlance study={study} />
            </div>
          </div>

          <div className="max-w-5xl mx-auto mt-14 border-t border-border pt-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <Link href={`/work/${prev.slug}`} className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
                <span className="font-display font-bold text-foreground group-hover:underline underline-offset-4">
                  {prev.name}
                </span>
              </Link>
              <button
                type="button"
                onClick={() => goHomeToSection("work")}
                className="text-sm font-medium text-foreground hover:underline underline-offset-4"
              >
                All case studies ↑
              </button>
              <Link href={`/work/${next.slug}`} className="group flex items-center gap-2 justify-end text-sm text-muted-foreground hover:text-foreground transition-colors">
                <span className="font-display font-bold text-foreground group-hover:underline underline-offset-4">
                  {next.name}
                </span>
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <BrandEdgeFooter onNavClick={(id) => goHomeToSection(id)} />
    </div>
  );
}
