import type { ReactNode } from "react";
import type { CaseStudy } from "@/data/caseStudies";
import type { StudyVisuals } from "@/data/caseVisuals";
import ConceptBoard, { Wire } from "@/components/artifacts/ConceptBoard";
import { MetricCardRow } from "@/components/artifacts/MetricCard";
import ComparisonTable from "@/components/artifacts/ComparisonTable";
import ConceptualDisclaimer from "@/components/artifacts/ConceptualDisclaimer";
import BeforeAfterCompare from "@/components/BeforeAfterCompare";
import DirectionPair from "@/components/art/DirectionPair";
import {
  QuoteCard,
  PullStat,
  PainPointBoard,
  SiteMapDiagram,
  UserFlowDiagram,
  StatesMatrix,
  ButtonAudit,
  ContrastAudit,
  TestRounds,
  ChipRow,
} from "@/components/artifacts/Diagrams";
import { DeviceShots, HeroDeviceShowcase } from "@/components/artifacts/Screens";
import { DesktopMockup } from "@/components/artifacts/DeviceMockups";
import PersonaCard from "@/components/artifacts/PersonaCard";
import BankingArt from "@/components/art/BankingArt";
import DashboardArt from "@/components/art/DashboardArt";
import DesignSystemArt from "@/components/art/DesignSystemArt";

export interface RailItem {
  kind: "quote" | "stat";
  quote?: string;
  source?: string;
  value?: string;
  label?: string;
}

export interface ChapterBlock {
  id: string;
  label: string;
  kicker: string;
  title: string;
  lead?: string;
  rail?: RailItem;
  body: ReactNode;
}

export interface GlanceItem {
  label: string;
  value: string;
}

/* shared section renderer for the CaseSection shape */
function Section({
  section,
  calloutLabel,
}: {
  section?: {
    lead?: string;
    paragraphs?: string[];
    bullets?: { label?: string; text: string }[];
    callouts?: { quote: string; source: string }[];
  };
  calloutLabel?: string;
}) {
  if (!section) return null;
  return (
    <div className="space-y-4">
      {section.lead && (
        <p className="text-base sm:text-lg text-foreground leading-relaxed">{section.lead}</p>
      )}
      {section.paragraphs?.map((p, i) => (
        <p key={i} className="text-[15px] sm:text-base text-foreground/90 leading-relaxed">
          {p}
        </p>
      ))}
      {section.bullets && section.bullets.length > 0 && (
        <ul className="space-y-2.5 border-l border-foreground/15 pl-4">
          {section.bullets.map((b, i) => (
            <li key={i} className="text-[15px] sm:text-base text-foreground/90 leading-relaxed">
              {b.label && <span className="font-semibold text-foreground">{b.label}: </span>}
              {b.text}
            </li>
          ))}
        </ul>
      )}
      {section.callouts && section.callouts.length > 0 && (
        <div className="space-y-3">
          {calloutLabel && (
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              {calloutLabel}
            </p>
          )}
          {section.callouts.map((c, i) => (
            <QuoteCard key={i} quote={c.quote} source={c.source} />
          ))}
        </div>
      )}
    </div>
  );
}

/* validate interactive: round-1 vs round-2 with a before/after wire */
function ValidateBlock({ slug, visuals }: { slug: string; visuals: StudyVisuals }) {
  const v = visuals.validate;
  const wireBySlug: Record<string, [string, string]> = {
    "mobile-banking-redesign": ["dark", "home"],
    kenyatrace: ["map", "list"],
    "gigi-energy": ["cart", "pay"],
    "dashboard-ui-system": ["table", "tiers"],
    "design-system-creation": ["buttons", "tokens"],
  };
  const [before, after] = wireBySlug[slug] ?? ["grid", "tiers"];

  return (
    <TestRounds roundOne={v.before.note} roundTwo={v.after.note}>
      <BeforeAfterCompare
        variant="phone"
        beforeLabel={v.before.label}
        afterLabel={v.after.label}
        beforeArt={<Wire layout={before} />}
        afterArt={<Wire layout={after} />}
        counterFrom={1}
        counterTo={2}
        fromNote={v.before.note}
        toNote={v.after.note}
      />
    </TestRounds>
  );
}

/* UI chapter: live products shown as phone + tablet + desktop device mockups;
   packaged CSS/SVG artifacts for conceptual studies */
function UiBlock({ slug, visuals }: { slug: string; visuals: StudyVisuals }) {
  if (slug === "kenyatrace" || slug === "gigi-energy") {
    return (
      <div className="space-y-4">
        {visuals.hero && <HeroDeviceShowcase hero={visuals.hero} live />}
        {visuals.screens && visuals.screens.length > 0 && <DeviceShots shots={visuals.screens} />}
      </div>
    );
  }

  const art =
    slug === "dashboard-ui-system" ? (
      <DashboardArt />
    ) : slug === "design-system-creation" ? (
      <DesignSystemArt />
    ) : (
      <BankingArt />
    );

  return (
    <div className="space-y-4">
      <figure className="border border-border bg-card p-4 sm:p-5">
        <figcaption className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
          Hi-fi concept — desktop monitor
        </figcaption>
        <DesktopMockup
          content={{ node: art }}
          showStand
          aspect="aspect-auto"
          className="w-full"
          label="Desktop · concept"
        />
      </figure>
      {slug === "dashboard-ui-system" && <StatesMatrix />}
      {slug === "design-system-creation" && <ButtonAudit />}
      {slug === "gigi-energy" ? null : null}
      {slug === "mobile-banking-redesign" && (
        <figure className="border border-border bg-card p-4 sm:p-5">
          <figcaption className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
            Direction test — which home won
          </figcaption>
          <DirectionPair />
        </figure>
      )}
    </div>
  );
}

export function getChapters(study: CaseStudy, visuals: StudyVisuals): ChapterBlock[] {
  const slug = study.slug;
  const isConceptual = study.kind === "CONCEPTUAL";

  /* personas + empathy live in research */
  const researchExtras = (
    <div className="space-y-4">
      {visuals.personas && visuals.personas.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-stretch">
          {visuals.personas.map((p) => (
            <PersonaCard key={p.name} personas={[p]} />
          ))}
        </div>
      )}
      {visuals.empathyMap && (
        <figure className="border border-border bg-card p-4 sm:p-5">
          <figcaption className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
            Empathy map — what users actually said and felt
          </figcaption>
          <div className="grid grid-cols-2 gap-2">
            {(["says", "does", "thinks", "feels"] as const).map((k) => (
              <div key={k} className="border border-border bg-secondary p-3">
                <p className="text-[10px] font-mono uppercase tracking-widest text-foreground/70 mb-2">
                  {k}
                </p>
                <ul className="space-y-1.5">
                  {visuals.empathyMap![k].map((x, i) => (
                    <li key={i} className="text-[13px] text-foreground/90 leading-snug">
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </figure>
      )}
    </div>
  );

  const ideateExtras = (
    <div className="space-y-4">
      {visuals.sketches && visuals.sketches.length > 0 && (
        <ConceptBoard items={visuals.sketches} />
      )}
      {visuals.brandEvolution && (
        <figure className="border border-border bg-card p-4 sm:p-5">
          <figcaption className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
            {visuals.brandEvolution.title}
          </figcaption>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 items-stretch">
            {visuals.brandEvolution.items.map((it) => (
              <div
                key={it.label}
                className={`border p-3 flex flex-col gap-2 h-full ${
                  it.state === "rejected"
                    ? "border-border"
                    : it.state === "won"
                      ? "border-accent"
                      : "border-foreground/40"
                }`}
              >
                <div className="flex gap-1.5">
                  {it.swatches.map((c) => (
                    <span
                      key={c}
                      className="w-5 h-5 rounded-full border border-foreground/15"
                      style={{ background: c }}
                    />
                  ))}
                </div>
                <p className="text-[11px] text-foreground leading-snug mt-auto">{it.label}</p>
                <span
                  className={`text-[9px] font-mono uppercase tracking-wider w-fit px-1.5 py-0.5 ${
                    it.state === "won"
                      ? "bg-accent text-accent-foreground"
                      : it.state === "rejected"
                        ? "text-muted-foreground line-through"
                        : "text-foreground border border-foreground/30"
                  }`}
                >
                  {it.state}
                </span>
              </div>
            ))}
          </div>
        </figure>
      )}
    </div>
  );

  const outcomeBody = (
    <div className="space-y-4">
      <MetricCardRow cards={visuals.metricCards} />
      <ComparisonTable
        rows={visuals.metrics}
        caption="How each outcome was measured and what changed"
      />
      {visuals.roadmap && visuals.roadmap.length > 0 && (
        <ChipRow
          label="What's next"
          chips={visuals.roadmap.map((r) => ({ text: r }))}
        />
      )}
    </div>
  );

  const reflectionBody = (
    <div className="space-y-4">
      {isConceptual && (
        <ConceptualDisclaimer
          detail={
            study.outcomeDetail ||
            "Design hypothesis validated in moderated usability testing — not measured in production."
          }
        />
      )}
      {study.lessons && study.lessons.length > 0 && (
        <ul className="space-y-3 border-l border-foreground/15 pl-4">
          {study.lessons.map((l, i) => (
            <li key={i} className="text-[15px] sm:text-base text-foreground/90 leading-relaxed">
              <span className="font-mono text-[10px] tracking-widest text-accent mr-2">
                {String(i + 1).padStart(2, "0")}
              </span>
              {l}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const chapters: ChapterBlock[] = [
    {
      id: "problem",
      label: "The Problem",
      kicker: "01 — The Problem",
      title: "The problem",
      lead: study.problem.lead,
      rail:
        study.problem.paragraphs[0] !== undefined
          ? { kind: "stat", value: String(study.year), label: "Year the work began" }
          : undefined,
      body: (
        <div className="space-y-4">
          {study.problem.paragraphs.map((p, i) => (
            <p key={i} className="text-[15px] sm:text-base text-foreground/90 leading-relaxed">
              {p}
            </p>
          ))}
          {slug === "gigi-energy" && (
            <ContrastAudit />
          )}
        </div>
      ),
    },
    {
      id: "research",
      label: "Research",
      kicker: "02 — Research",
      title: "Research",
      body: (
        <div className="space-y-4">
          <Section section={study.research} />
          {researchExtras}
        </div>
      ),
    },
    {
      id: "define",
      label: "Define",
      kicker: "03 — Define",
      title: "Define",
      body: (
        <div className="space-y-4">
          <Section section={study.designThinking} />
          {(slug === "kenyatrace" || slug === "dashboard-ui-system") && (
            <SiteMapDiagram
              title="Information architecture — what stayed, what was cut"
              root={study.name}
              branches={[
                { label: "Browse", children: ["County", "Stop", "Stay"] },
                { label: "Plan", children: ["Route", "Days", "Preview"] },
                { label: "Trips", children: ["Saved", "Shared", "Export"] },
                { label: "Discover", children: ["Levels", "Stays", "Events"] },
              ]}
            />
          )}
        </div>
      ),
    },
    {
      id: "ideate",
      label: "Ideate",
      kicker: "04 — Ideate",
      title: "Ideate",
      body: (
        <div className="space-y-4">
          <Section section={study.ia} />
          {ideateExtras}
        </div>
      ),
    },
    {
      id: "ui",
      label: "UI",
      kicker: "05 — UI",
      title: "UI design",
      body: (
        <div className="space-y-4">
          <Section section={study.design} />
          <UiBlock slug={slug} visuals={visuals} />
        </div>
      ),
    },
    {
      id: "validate",
      label: "Validate",
      kicker: "06 — Validate",
      title: "Validate",
      body: (
        <div className="space-y-4">
          <Section section={study.testing} />
          <ValidateBlock slug={slug} visuals={visuals} />
        </div>
      ),
    },
    {
      id: "outcome",
      label: "Outcome",
      kicker: "07 — Outcome",
      title: "Outcome",
      body: outcomeBody,
    },
    {
      id: "reflection",
      label: "Reflection",
      kicker: "08 — Reflection",
      title: "Reflection",
      body: reflectionBody,
    },
  ];

  return chapters;
}

export function getGlance(study: CaseStudy, visuals: StudyVisuals): GlanceItem[] {
  const items: GlanceItem[] = [
    { label: "Type", value: study.kind },
    { label: "Year", value: study.year },
    { label: "Role", value: study.role },
    { label: "Timeline", value: study.timeline },
    { label: "Status", value: study.status },
  ];
  if (study.methods?.length) items.push({ label: "Methods", value: study.methods.join(" · ") });
  if (study.tools?.length) items.push({ label: "Tools", value: study.tools.join(" · ") });
  return items;
}
