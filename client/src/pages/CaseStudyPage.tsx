import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Check, X, Clock } from "lucide-react";
import { caseStudies, type CaseSection } from "@/data/caseStudies";
import { caseVisuals } from "@/data/caseVisuals";
import NotFound from "@/pages/NotFound";
import BrandEdgeFooter from "@/components/BrandEdgeFooter";
import BrandEdgeHeader from "@/components/BrandEdgeHeader";
import { Reveal } from "@/components/Reveal";
import ChapterNav from "@/components/ChapterNav";
import MoreWork from "@/components/MoreWork";
import MetricTable from "@/components/MetricTable";
import PersonaGrid from "@/components/art/PersonaGrid";
import EmpathyMap from "@/components/art/EmpathyMap";
import SketchGallery from "@/components/art/SketchGallery";
import BrandEvolution from "@/components/art/BrandEvolution";
import ValidatePair from "@/components/art/ValidatePair";
import TripMap from "@/components/art/TripMap";
import DirectionPair from "@/components/art/DirectionPair";
import IAMap from "@/components/art/IAMap";
import SpecSheet from "@/components/art/SpecSheet";
import ScanPanel from "@/components/art/ScanPanel";
import DocsTree from "@/components/art/DocsTree";
import TokensPoster from "@/components/art/TokensPoster";
import BankingArt from "@/components/art/BankingArt";
import MiniBankingScreens from "@/components/art/MiniBankingScreens";
import DashboardArt from "@/components/art/DashboardArt";
import DesignSystemArt from "@/components/art/DesignSystemArt";
import { goHomeToSection } from "@/lib/navigation";
import { useReveal } from "@/hooks/useReveal";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const trim = (text: string, n = 2) =>
  text.split(/(?<=[.!?])\s+(?=[A-Z"“('])/).slice(0, n).join(" ");

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
      <Reveal delay={0} scale className="shrink-0">
        <span className="inline-block w-10 h-10 rounded-soft-sm bg-foreground text-background font-mono text-xs tracking-widest flex items-center justify-center">
          {index}
        </span>
      </Reveal>
      <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground tracking-tight">
        {title}
      </h2>
    </div>
  );
}

function SectionText({ section, maxLead = 2, callouts = true }: { section: CaseSection; maxLead?: number; callouts?: boolean }) {
  return (
    <div className="space-y-3">
      {section.lead && (
        <p className="text-foreground font-medium text-lg leading-relaxed">{trim(section.lead, maxLead)}</p>
      )}
      {section.paragraphs?.slice(0, 2).map((p) => (
        <p key={p.slice(0, 32)} className="text-muted-foreground leading-relaxed">
          {trim(p, maxLead === 2 ? 1 : 2)}
        </p>
      ))}
      {section.bullets && section.bullets.length > 0 && (
        <ul className="space-y-2.5 pt-1">
          {section.bullets.map((b) => (
            <li key={b.text} className="flex gap-2.5 text-muted-foreground leading-relaxed text-sm">
              <span
                className={`mt-1 shrink-0 w-4 h-4 rounded-[4px] flex items-center justify-center ${
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
                {b.label && <span className="font-semibold text-foreground">{b.label}: </span>}
                {b.text}
              </span>
            </li>
          ))}
        </ul>
      )}
      {callouts && section.callouts && section.callouts.length > 0 && (
        <div className="space-y-3 pt-2">
          {section.callouts.map((c) => (
            <blockquote
              key={c.source}
              className="border-l-2 border-accent bg-card p-4 text-foreground text-sm leading-relaxed"
            >
              <p className="font-display font-semibold">“{c.quote}”</p>
              <footer className="mt-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                — {c.source}
              </footer>
            </blockquote>
          ))}
        </div>
      )}
    </div>
  );
}

function Callouts({ section }: { section: CaseSection }) {
  if (!section.callouts || section.callouts.length === 0) return null;
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {section.callouts.map((c) => (
        <blockquote
          key={c.source}
          className="border-l-2 border-accent bg-card p-4 text-foreground text-sm leading-relaxed"
        >
          <p className="font-display font-semibold">“{c.quote}”</p>
          <footer className="mt-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            — {c.source}
          </footer>
        </blockquote>
      ))}
    </div>
  );
}

function VisualSection({
  id,
  index,
  title,
  section,
  maxLead = 2,
  children,
}: {
  id: string;
  index: string;
  title: string;
  section: CaseSection;
  maxLead?: number;
  children: React.ReactNode;
}) {
  return (
    <Reveal
      as="section"
      id={id}
      className="border-t border-border pt-10 mt-10 first:border-t-0 first:mt-0 first:pt-0"
    >
      <SectionHeader index={index} title={title} />
      <div className="max-w-[420px]">
        <SectionText section={section} maxLead={maxLead} callouts={false} />
      </div>
      <div className="mt-6">{children}</div>
    </Reveal>
  );
}

/* ---------- validate-chapter phone art ---------- */

function StepsArt({ n, highlight = -1 }: { n: number; highlight?: number }) {
  return (
    <div className="flex flex-col gap-1.5 mt-1">
      {Array.from({ length: n }).map((_, i) => (
        <div
          key={i}
          className={`h-4 rounded-[3px] border ${
            i === highlight ? "border-accent bg-accent/20" : "border-foreground/25 bg-foreground/[0.06]"
          }`}
        />
      ))}
    </div>
  );
}

function RingArt({ label, pct }: { label?: string; pct?: number }) {
  const r = 15;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center gap-1.5 mt-1">
      <div className="relative w-16 h-16">
        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
          <circle cx="18" cy="18" r={r} fill="none" stroke="#141310" strokeOpacity="0.12" strokeWidth="3" />
          <circle
            cx="18"
            cy="18"
            r={r}
            fill="none"
            stroke={pct != null ? "#e8ff47" : "#141310"}
            strokeOpacity={pct != null ? 1 : 0.25}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={pct != null ? `${(pct / 100) * c} ${c}` : `${0.35 * c} ${c}`}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-mono text-[9px] font-bold" style={{ color: "#141310" }}>
          {pct != null ? `${pct}%` : ""}
        </span>
      </div>
      {label && (
        <span className="text-[6.5px] font-bold uppercase tracking-wide" style={{ color: "#141310" }}>
          {label}
        </span>
      )}
    </div>
  );
}

function RowArt({ selected }: { selected: boolean }) {
  return (
    <div className="space-y-1 mt-1">
      <div className="h-2.5 bg-[#141310]/20" />
      {[false, true, false, false].map((s, i) => (
        <div
          key={i}
          className={`h-3 rounded-[2px] border ${s && selected ? "border-[#141310] bg-[#e8ff47]/50" : "border-[#141310]/15 bg-[#141310]/[0.06]"}`}
        />
      ))}
    </div>
  );
}

function ChipsArt({ fixed }: { fixed: boolean }) {
  return (
    <div className="flex flex-col gap-1.5 mt-1">
      {["Warning state", "Focus ring", "Nested tables"].map((c, i) => (
        <span
          key={c}
          className={`px-2 py-1 text-[7px] font-mono uppercase tracking-wider border ${
            fixed
              ? "border-[#141310]/25 text-[#141310] bg-[#e8ff47]/60"
              : i === 1
                ? "border-[#141310]/15 text-[#141310]/40 line-through"
                : "border-[#141310]/25 text-[#141310]"
          }`}
        >
          {c} {i === 1 && !fixed ? "— missing" : i === 1 ? "✓" : ""}
        </span>
      ))}
    </div>
  );
}

function FunnelArt() {
  const bars = [
    { label: "Add to cart", pct: 100 },
    { label: "Checkout start", pct: 48 },
    { label: "Payment", pct: 31 },
    { label: "Completed", pct: 23 },
  ];
  return (
    <div className="space-y-2">
      {bars.map((b, i) => (
        <div key={b.label} className="flex items-center gap-3" style={{ ["--i" as string]: i }} data-reveal>
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground w-24 shrink-0">
            {b.label}
          </span>
          <div className="flex-1 h-8 sm:h-10 bg-foreground/[0.06]">
            <div
              className={`h-full ${i === 3 ? "bg-accent" : "bg-foreground/30"}`}
              style={{ width: `${b.pct}%` }}
            />
          </div>
          <span className="text-xs font-mono text-foreground w-9 text-right">{b.pct}%</span>
        </div>
      ))}
      <p className="text-[10px] font-mono uppercase tracking-widest text-rose-400">
        −52% add-to-cart → checkout
      </p>
    </div>
  );
}

function PaymentModalArt() {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[260px] rounded-lg border border-foreground/25 bg-secondary p-4">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 shrink-0">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="4" />
              <circle cx="18" cy="18" r="15" fill="none" stroke="#e8ff47" strokeWidth="4" strokeLinecap="round" strokeDasharray={`${0.31 * 2 * Math.PI * 15} ${2 * Math.PI * 15}`} />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold">31%</span>
          </div>
          <div className="space-y-1.5">
            <div className="h-2 w-24 rounded-full bg-foreground/25" />
            <div className="h-2 w-16 rounded-full bg-foreground/15" />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center gap-1.5 rounded bg-foreground py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-background animate-pulse" />
          <span className="text-[9px] font-semibold text-background">Processing…</span>
        </div>
        <p className="mt-3 text-[10px] text-muted-foreground leading-snug">
          31% reach payment — only 23% finish. The 8-point gap is where the modal dies.
        </p>
      </div>
    </div>
  );
}

function ButtonDrift() {
  const seventeen = Array.from({ length: 17 });
  return (
    <div className="space-y-3">
      <div className="border border-border bg-secondary p-3">
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
          Audit — 17 button styles
        </p>
        <div className="flex flex-wrap gap-1.5">
          {seventeen.map((_, i) => (
            <span
              key={i}
              className="w-[48px] h-[40px] rounded-sm border border-foreground/30"
              style={{ background: ["#141310", "#4a453c", "#d9d2c4", "#e8ff47"][i % 4] }}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center" aria-hidden>
        <span className="font-mono text-xs text-muted-foreground">→</span>
      </div>
      <div className="border border-border bg-card p-3">
        <p className="text-[10px] font-mono uppercase tracking-widest text-accent mb-2">After — 3 + states</p>
        <div className="flex gap-1.5">
          {["Primary", "Secondary", "Ghost"].map((l) => (
            <span key={l} className="flex-1 h-[32px] border border-foreground/40 flex items-center justify-center text-[9px] font-semibold text-foreground">
              {l}
            </span>
          ))}
        </div>
        <div className="mt-1.5 flex gap-1.5">
          {["Hover", "Focus", "Loading"].map((s) => (
            <span key={s} className="flex-1 h-[24px] border border-dashed border-foreground/30 flex items-center justify-center text-[8px] font-mono text-muted-foreground">
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- flow diagrams (Define chapter) ---------- */

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
            {i < steps.length - 1 && <span className="text-muted-foreground text-sm">→</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

function BeforeAfterFlows() {
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-[1fr_auto_1fr] gap-3 items-stretch">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-rose-400/60 text-rose-400 font-mono text-[11px] tracking-widest uppercase mb-3">
            <X size={11} strokeWidth={3} />
            Before · 8 steps
          </span>
          <FlowDiagram
            steps={["Open", "Details", "Documents", "Verification", "Address", "PIN", "Agreements", "Done"]}
            title="Friction hidden in plain sight"
            accent={false}
          />
        </div>
        <div className="hidden md:flex items-center justify-center">
          <span className="font-mono text-xs text-muted-foreground" aria-hidden>
            → 2×
          </span>
        </div>
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent text-accent-foreground font-mono text-[11px] tracking-widest uppercase mb-3">
            <Check size={11} strokeWidth={3} />
            After · 4 steps
          </span>
          <FlowDiagram
            steps={["Phone", "ID", "PIN", "Photo → Done"]}
            title="Progressive KYC, zero unnecessary friction"
            accent
          />
        </div>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">
        Before: 8 sequential steps, 5 of them pure data-entry. After: 4 steps — data the bank
        already holds (phone) and data only the customer can provide (ID, PIN, photo).
      </p>
    </div>
  );
}

/* ---------- hero art + design gallery ---------- */

function HeroArt({ study }: { study: (typeof caseStudies)[number] }) {
  if (study.image) {
    return (
      <div className="rounded-soft-sm border border-border bg-card p-3">
        <img
          src={study.image.replace(".png", "-1200.webp")}
          srcSet={`${study.image.replace(".png", "-640.webp")} 640w, ${study.image.replace(".png", "-1200.webp")} 1200w`}
          sizes="(min-width: 1024px) 600px, 100vw"
          width={1200}
          height={750}
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
  if (study.slug === "mobile-banking-redesign") {
    return (
      <div className="rounded-soft-sm border border-border bg-card p-4 sm:p-6">
        <MiniBankingScreens />
      </div>
    );
  }
  if (study.image) {
    return (
      <div className="rounded-soft-sm border border-border bg-card p-3">
        <img
          src={study.image.replace(".png", "-1200.webp")}
          srcSet={`${study.image.replace(".png", "-640.webp")} 640w, ${study.image.replace(".png", "-1200.webp")} 1200w`}
          sizes="(min-width: 1024px) 700px, 100vw"
          width={1200}
          height={750}
          alt={`${study.name} — hi-fi screens`}
          className="w-full rounded-soft-sm"
          loading="lazy"
        />
      </div>
    );
  }
  return (
    <div className="rounded-soft-sm border border-border bg-card p-4 sm:p-6">
      <HeroArt study={study} />
    </div>
  );
}

/* ---------- AT A GLANCE ---------- */

function AtAGlance({ study }: { study: (typeof caseStudies)[number] }) {
  const rows = [
    { label: "Role", value: study.role },
    { label: "Timeline", value: study.timeline },
    { label: "Tools", value: study.tools.join(", ") },
    { label: "Contributions", value: study.methods.join(" · ") },
    { label: "Outcome", value: study.outcomes[0] ? `${study.outcomes[0].value} ${study.outcomes[0].metric.toLowerCase()}` : "—" },
  ];
  return (
    <>
      <div className="lg:hidden mb-8">
        <p className="mb-3 text-xs font-mono uppercase tracking-widest text-muted-foreground">
          At a glance
        </p>
        <div className="flex flex-wrap gap-2">
          {rows.map((r) => (
            <span
              key={r.label}
              className="inline-flex items-center gap-1.5 border border-border bg-card px-3 py-1.5 text-xs text-foreground rounded-full"
            >
              <span className="font-mono uppercase tracking-wider text-muted-foreground text-[10px]">
                {r.label}
              </span>
              {r.value}
            </span>
          ))}
        </div>
      </div>

      <aside className="hidden lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-auto lg:block border border-border bg-card">
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
    </>
  );
}

/* ---------- page ---------- */

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  useReveal();
  const index = useMemo(
    () => caseStudies.findIndex((s) => s.slug === params.slug),
    [params.slug],
  );
  const study = index >= 0 ? caseStudies[index] : undefined;
  const visuals = study ? caseVisuals[study.slug] : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    if (study) document.title = `${study.name} — Mike Waitindi`;
  }, [study]);

  if (!study || !visuals) {
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

  const validateArt = () => {
    switch (study.slug) {
      case "mobile-banking-redesign":
        return (
          <ValidatePair
            before={visuals.validate.before}
            after={visuals.validate.after}
            beforeArt={<RingArt />}
            afterArt={<RingArt label="Save goal" pct={68} />}
          />
        );
      case "kenyatrace":
        return (
          <ValidatePair
            before={visuals.validate.before}
            after={visuals.validate.after}
            beforeArt={<StepsArt n={6} />}
            afterArt={<StepsArt n={3} highlight={1} />}
          />
        );
      case "gigi-energy":
        return (
          <ValidatePair
            before={visuals.validate.before}
            after={visuals.validate.after}
            beforeArt={<StepsArt n={4} />}
            afterArt={<StepsArt n={3} highlight={2} />}
          />
        );
      case "dashboard-ui-system":
        return (
          <ValidatePair
            before={visuals.validate.before}
            after={visuals.validate.after}
            beforeArt={<RowArt selected={false} />}
            afterArt={<RowArt selected />}
          />
        );
      default:
        return (
          <ValidatePair
            before={visuals.validate.before}
            after={visuals.validate.after}
            beforeArt={<ChipsArt fixed={false} />}
            afterArt={<ChipsArt fixed />}
          />
        );
    }
  };

  const researchVisual = () => {
    switch (study.slug) {
      case "mobile-banking-redesign":
        return (
          <div className="space-y-4">
            {visuals.personas && <PersonaGrid personas={visuals.personas} />}
            {visuals.empathyMap && <EmpathyMap board={visuals.empathyMap} />}
            <Callouts section={study.research} />
          </div>
        );
      case "kenyatrace":
        return (
          <div className="space-y-4">
            {visuals.personas && <PersonaGrid personas={visuals.personas} />}
            <Callouts section={study.research} />
          </div>
        );
      case "gigi-energy":
        return (
          <div className="space-y-4">
            <div className="border border-border bg-card p-4 sm:p-5">
              <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
                GA4 funnel — the leak
              </p>
              <FunnelArt />
            </div>
            <div className="border border-border bg-card p-4 sm:p-5 max-w-[320px]">
              <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
                The payment step
              </p>
              <PaymentModalArt />
            </div>
          </div>
        );
      case "dashboard-ui-system":
        return (
          <div className="space-y-4">
            <ScanPanel />
            <IAMap />
          </div>
        );
      default:
        return <ButtonDrift />;
    }
  };

  const ideateVisual = () => {
    switch (study.slug) {
      case "mobile-banking-redesign":
        return (
          <div className="space-y-4">
            <BeforeAfterFlows />
            <SketchGallery items={visuals.sketches} />
          </div>
        );
      case "kenyatrace":
        return (
          <div className="space-y-4">
            <TripMap />
            <SketchGallery items={visuals.sketches} />
          </div>
        );
      case "dashboard-ui-system":
        return (
          <div className="space-y-4">
            <IAMap />
            <SketchGallery items={visuals.sketches} />
          </div>
        );
      case "design-system-creation":
        return (
          <div className="space-y-4">
            <DocsTree />
            <SketchGallery items={visuals.sketches} />
          </div>
        );
      default:
        return <SketchGallery items={visuals.sketches} />;
    }
  };

  const uiVisual = () => {
    switch (study.slug) {
      case "mobile-banking-redesign":
        return (
          <div className="space-y-4">
            <div className="rounded-soft-sm border border-border bg-card p-4 sm:p-6">
              <MiniBankingScreens />
            </div>
            {visuals.brandEvolution && (
              <BrandEvolution title={visuals.brandEvolution.title} items={visuals.brandEvolution.items} />
            )}
          </div>
        );
      case "kenyatrace":
      case "gigi-energy":
        return (
          <div className="space-y-4">
            <DesignGallery study={study} />
            {visuals.brandEvolution && (
              <BrandEvolution title={visuals.brandEvolution.title} items={visuals.brandEvolution.items} />
            )}
          </div>
        );
      case "dashboard-ui-system":
        return (
          <div className="space-y-4">
            <SpecSheet />
            <SketchGallery items={visuals.sketches} />
          </div>
        );
      default:
        return <TokensPoster />;
    }
  };

  return (
    <div className="min-h-screen bg-secondary">
      <div className="noise-overlay" />
      <BrandEdgeHeader />
      <ChapterNav />

      <main className="pt-16">
        <section className="bg-secondary border-b border-border">
          <div className="container py-12 lg:py-16">
            <div className="max-w-[1100px] mx-auto">
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
                className="mt-5 flex flex-wrap gap-2 items-center"
              >
                <span className="tag-pill text-xs">{study.kind}</span>
                <span className="tag-pill text-xs">{study.year}</span>
                <span className="tag-pill text-xs">{study.timeline}</span>
                <span className="tag-pill text-xs inline-flex items-center gap-1.5">
                  <Clock size={11} />
                  {visuals.readTime} min read
                </span>
                {visuals.prototypeUrl && (
                  <a
                    href={visuals.prototypeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tag-pill text-xs inline-flex items-center gap-1 bg-accent text-accent-foreground hover:bg-foreground hover:text-background transition-colors"
                  >
                    {visuals.prototypeLabel ?? "View prototype ↗"}
                  </a>
                )}
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
          <div className="max-w-[1100px] mx-auto grid lg:grid-cols-[1fr_280px] gap-10 lg:gap-12 items-start">
            <article className="min-w-0">
              <Reveal as="section" className="border-t border-border pt-10 mt-10 first:border-t-0 first:mt-0 first:pt-0">
                <SectionHeader index="01" title="The Problem" />
                <div className="border-l-4 border-accent bg-card p-5 sm:p-6">
                  <p className="font-display font-bold text-xl sm:text-2xl text-foreground leading-snug">
                    {trim(study.problem.lead, 2)}
                  </p>
                </div>
                {study.problem.paragraphs?.slice(0, 2).map((p) => (
                  <p key={p.slice(0, 32)} className="text-muted-foreground leading-relaxed mt-4">
                    {trim(p, 1)}
                  </p>
                ))}
              </Reveal>

              <VisualSection id="chapter-research" index="02" title="Research" section={study.research} maxLead={1}>
                {researchVisual()}
              </VisualSection>

              <VisualSection id="chapter-define" index="03" title="Define" section={study.designThinking}>
                {study.slug === "mobile-banking-redesign" ? (
                  <DirectionPair />
                ) : study.slug === "kenyatrace" ? (
                  <TripMap />
                ) : (
                  <DesignGallery study={study} />
                )}
              </VisualSection>

              <VisualSection id="chapter-ideate" index="04" title="Ideate" section={study.ia}>
                {ideateVisual()}
              </VisualSection>

              <VisualSection id="chapter-ui" index="05" title="UI" section={study.design}>
                {uiVisual()}
              </VisualSection>

              <VisualSection id="chapter-validate" index="06" title="Validate" section={study.testing}>
                {validateArt()}
              </VisualSection>

              <VisualSection id="chapter-outcome" index="07" title="Outcome" section={{ lead: trim(study.outcomeDetail, 2) }}>
                <MetricTable
                  metrics={visuals.metrics}
                  roadmap={visuals.roadmap}
                  outcomeDetail={study.outcomeDetail}
                />
              </VisualSection>

              <Reveal as="section" className="border-t border-border pt-10 mt-10">
                <SectionHeader index="08" title="What I'd change" />
                <div className="border border-border bg-card divide-y divide-border">
                  {study.lessons.map((l, i) => (
                    <p key={l.slice(0, 24)} className="flex gap-4 p-4 sm:p-5 text-sm text-muted-foreground leading-relaxed">
                      <span className="font-mono text-xs text-accent shrink-0 pt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {l}
                    </p>
                  ))}
                </div>
              </Reveal>
            </article>

            <div className="lg:block">
              <AtAGlance study={study} />
            </div>
          </div>

          <div className="max-w-[1100px] mx-auto mt-14 border-t border-border pt-8">
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

            <MoreWork current={study.slug} />
          </div>
        </div>
      </main>

      <BrandEdgeFooter onNavClick={(id) => goHomeToSection(id)} />
    </div>
  );
}
