import type { ReactNode } from "react";
import type { CaseStudy } from "@/data/caseStudies";
import type { StudyVisuals } from "@/data/caseVisuals";
import ConceptBoard, { Wire } from "@/components/artifacts/ConceptBoard";
import FidelityLadder, {
  type FidelityStep,
} from "@/components/artifacts/FidelityLadder";
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
import { DeviceShots } from "@/components/artifacts/Screens";
import {
  PhoneMockup,
  DesktopMockup,
} from "@/components/artifacts/DeviceMockups";
import PersonaGrid from "@/components/artifacts/PersonaCard";
import {
  BankingScreen,
  type BankingScreenName,
} from "@/components/art/BankingResponsive";
import {
  DashboardScreen,
  DesignSystemScreen,
} from "@/components/art/ResponsiveConceptArt";
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

/* ------------------------------------------------------------------ */
/* Stage 01 — The problem: a visual of why it matters                  */
/* ------------------------------------------------------------------ */

const PROBLEM_RAILS: Record<string, RailItem> = {
  "mobile-banking-redesign": {
    kind: "stat",
    value: "49%",
    label: "bank via mobile money alone",
  },
  kenyatrace: { kind: "stat", value: "10", label: "county sites, no shared planner" },
  "gigi-energy": {
    kind: "stat",
    value: "−52%",
    label: "add-to-cart → checkout",
  },
  "dashboard-ui-system": {
    kind: "stat",
    value: "3 tools",
    label: "screenshot handoff, no specs",
  },
  "design-system-creation": {
    kind: "stat",
    value: "17",
    label: "button styles, re-derived per screen",
  },
};

function ProblemVisual({
  slug,
  study,
  visuals,
}: {
  slug: string;
  study: CaseStudy;
  visuals: StudyVisuals;
}) {
  if (slug === "gigi-energy") {
    return (
      <div className="space-y-4">
        <ContrastAudit />
        {study.research.bullets && (
          <ChipRow
            label="Why shoppers vanished"
            chips={study.research.bullets.map((b) => ({ text: b.text }))}
          />
        )}
      </div>
    );
  }
  if (slug === "design-system-creation") {
    return <ButtonAudit />;
  }
  if (study.research.bullets) {
    return (
      <PainPointBoard
        title="Research findings — what was breaking"
        tiles={study.research.bullets.map((b) => ({
          label: b.label ?? "Finding",
          detail: b.text,
        }))}
        quote={
          slug === "kenyatrace"
            ? study.research.callouts?.[0]
            : slug === "mobile-banking-redesign"
              ? study.research.callouts?.[1]
              : undefined
        }
      />
    );
  }
  return null;
}

/* ------------------------------------------------------------------ */
/* Stage 02 — Research: people + what they said                        */
/* ------------------------------------------------------------------ */

function EmpathyMap({
  map,
}: {
  map: NonNullable<StudyVisuals["empathyMap"]>;
}) {
  return (
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
              {map[k].map((x, i) => (
                <li key={i} className="text-[13px] text-foreground/90 leading-snug">
                  {x}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </figure>
  );
}

const RESEARCH_RAILS: Record<string, RailItem> = {
  "mobile-banking-redesign": {
    kind: "quote",
    quote:
      "I don't check my balance because I don't want to see it. I know it's low and I'll just feel bad.",
    source: "Interviewee, 23 · freelancer",
  },
  kenyatrace: { kind: "stat", value: "12 + 34", label: "interviews + survey" },
  "gigi-energy": { kind: "stat", value: "2.1:1", label: "contrast on brand text" },
  "dashboard-ui-system": {
    kind: "stat",
    value: "3 tools",
    label: "internal tools audited",
  },
  "design-system-creation": {
    kind: "stat",
    value: "6 scales",
    label: "competing type scales",
  },
};

function ResearchVisual({
  slug,
  visuals,
}: {
  slug: string;
  visuals: StudyVisuals;
}) {
  if (visuals.personas?.length) {
    return (
      <div className="space-y-4">
        <PersonaGrid personas={visuals.personas} />
        {visuals.empathyMap && <EmpathyMap map={visuals.empathyMap} />}
        {slug === "mobile-banking-redesign" && visuals.personas && (
          <QuoteCard
            quote="I'll finish the documents later. That was three months ago."
            source="Interviewee, 21 · campus student"
          />
        )}
      </div>
    );
  }
  const stat =
    slug === "gigi-energy"
      ? { value: "−52%", label: "add-to-cart → checkout funnel" }
      : slug === "dashboard-ui-system"
        ? { value: "3 tools", label: "internal tools, task-focused interviews" }
        : { value: "3 surfaces", label: "audited + designer interviews" };
  return (
    <div className="space-y-4">
      <PullStat value={stat.value} label={stat.label} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Stage 03 — Explore: directions tried, kept, rejected                */
/* ------------------------------------------------------------------ */

function ExploreVisual({ slug, visuals }: { slug: string; visuals: StudyVisuals }) {
  return (
    <div className="space-y-4">
      <ConceptBoard items={visuals.sketches} />
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
                  {it.swatches.map((c, i) => (
                    <span
                      key={`${c}-${i}`}
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
}

/* ------------------------------------------------------------------ */
/* Stage 04 — Refine: wireframe → hi-fi, IA / flows                    */
/* ------------------------------------------------------------------ */

function refineDiagrams(slug: string): ReactNode {
  switch (slug) {
    case "kenyatrace":
      return (
        <SiteMapDiagram
          title="Information architecture — what stayed, what was cut"
          root="KenyaTrace"
          branches={[
            { label: "Browse", children: ["County", "Stop", "Stay"] },
            { label: "Plan", children: ["Route", "Days", "Preview"] },
            { label: "Trips", children: ["Saved", "Shared", "Export"] },
            { label: "Discover", children: ["Levels", "Stays", "Events"] },
          ]}
        />
      );
    case "dashboard-ui-system":
      return (
        <SiteMapDiagram
          title="Three tiers — status, context, detail"
          root="Ops dashboard"
          branches={[
            { label: "Status", children: ["KPI cards", "Deltas"] },
            { label: "Context", children: ["Exception list", "Trend charts"] },
            { label: "Detail", children: ["Dense table", "Pinned columns", "Keyboard-first"] },
          ]}
        />
      );
    case "mobile-banking-redesign":
      return (
        <UserFlowDiagram
          title="Activation — 8 steps cut to 4, documents deferred"
          flows={[
            {
              name: "Sign up",
              steps: ["Open app", "Verify number", "Create PIN", "Goals tour"],
            },
            {
              name: "First send",
              steps: ["Recipient", "Amount", "Padlock confirm", "Done"],
            },
          ]}
        />
      );
    case "gigi-energy":
      return (
        <UserFlowDiagram
          title="Checkout — 4 steps merged to 3, M-Pesa first"
          flows={[
            {
              name: "Buy",
              steps: ["Cart", "Details & delivery", "M-Pesa", "Done"],
            },
          ]}
        />
      );
    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/* Stage 05 — Ship: the design, once; plus how it was tested           */
/* ------------------------------------------------------------------ */

const SCREEN_NOTES: Record<BankingScreenName, string> = {
  home: "Savings-first home — balance, goal ring, quick actions in 0 taps.",
  onboarding: "Progressive KYC — essentials first, documents deferred.",
  goals: "Quick-save sized to irregular income: +200, +500, +1000.",
  transfer: "Explicit trust cues — padlock + encrypted at the final tap.",
};

function PhoneGallery() {
  const shots: { name: string; screen: BankingScreenName }[] = [
    { name: "Home", screen: "home" },
    { name: "Goals", screen: "goals" },
    { name: "Onboarding", screen: "onboarding" },
    { name: "Send", screen: "transfer" },
  ];
  return (
    <figure className="border border-border bg-card p-4 sm:p-5">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
        <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          The concept — every screen, once
        </span>
        <span className="text-[10px] font-mono uppercase tracking-widest text-foreground/70">
          {shots.length} screens · mobile
        </span>
      </figcaption>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 items-start">
        {shots.map((s) => (
          <figure key={s.screen} className="border border-border bg-secondary p-3 sm:p-4">
            <p className="text-[10px] font-mono uppercase tracking-widest text-foreground mb-2">
              {s.name}
            </p>
            <PhoneMockup
              content={{ node: <BankingScreen variant="mobile" screen={s.screen} /> }}
              label={undefined}
              className="w-[120px] mx-auto"
            />
            <p className="mt-2.5 text-[11px] text-muted-foreground leading-snug">
              {SCREEN_NOTES[s.screen]}
            </p>
          </figure>
        ))}
      </div>
    </figure>
  );
}

function ShipVisual({ slug, visuals }: { slug: string; visuals: StudyVisuals }) {
  if (slug === "mobile-banking-redesign") {
    return (
      <div className="space-y-4">
        <PhoneGallery />
        <figure className="border border-border bg-card p-4 sm:p-5">
          <figcaption className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
            Direction test — which home won
          </figcaption>
          <DirectionPair />
        </figure>
      </div>
    );
  }
  if (slug === "kenyatrace" || slug === "gigi-energy") {
    return visuals.screens && visuals.screens.length > 0 ? (
      <DeviceShots shots={visuals.screens} />
    ) : null;
  }
  const art =
    slug === "dashboard-ui-system" ? <DashboardArt /> : <DesignSystemArt />;
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

/* ------------------------------------------------------------------ */
/* wireframe → structured → hi-fi progression per study                */
/* ------------------------------------------------------------------ */

function fidelityFor(slug: string): FidelityStep[] {
  const mobile = { wireW: "w-full max-w-[130px]", hiW: "w-full max-w-[130px]" };
  const desktop = { wireW: "w-full max-w-[240px]", hiW: "w-full max-w-[260px]" };

  switch (slug) {
    case "kenyatrace":
      return [
        {
          label: "Wireframe",
          sub: "List-first structure — browse beats map on 3G.",
          node: (
            <div className={mobile.wireW}>
              <Wire layout="list" />
            </div>
          ),
        },
        {
          label: "Structured",
          sub: "Map kept as secondary; route previews added.",
          node: (
            <div className={mobile.wireW}>
              <Wire layout="map" />
            </div>
          ),
        },
        {
          label: "Hi-fi",
          sub: "Photography leads the shipped screen.",
          node: (
            <img
              src="/shots/kenyatrace/home-mobile.jpg"
              alt="KenyaTrace shipped home screen"
              className={`${mobile.hiW} aspect-[9/17] object-cover object-top`}
            />
          ),
        },
      ];
    case "gigi-energy":
      return [
        {
          label: "Wireframe",
          sub: "Cart-first, then a wall at payment.",
          node: (
            <div className={mobile.wireW}>
              <Wire layout="cart" />
            </div>
          ),
        },
        {
          label: "Structured",
          sub: "M-Pesa moved first — payment is one decision.",
          node: (
            <div className={mobile.wireW}>
              <Wire layout="pay" />
            </div>
          ),
        },
        {
          label: "Hi-fi",
          sub: "Bold type carries hierarchy — shipped.",
          node: (
            <img
              src="/shots/gigi-energy/flavours-mobile.jpg"
              alt="GiGi flavours screen on mobile"
              className={`${mobile.hiW} aspect-[9/17] object-cover object-top`}
            />
          ),
        },
      ];
    case "dashboard-ui-system":
      return [
        {
          label: "Wireframe",
          sub: "The data table is the workhorse — scan for exceptions.",
          node: (
            <div className={desktop.wireW}>
              <Wire layout="table" />
            </div>
          ),
        },
        {
          label: "Structured",
          sub: "Three tiers: KPI → exceptions → dense spec'd table.",
          node: (
            <div className={desktop.wireW}>
              <Wire layout="tiers" />
            </div>
          ),
        },
        {
          label: "Hi-fi",
          sub: "Warm dark surfaces; color only for exceptions.",
          node: (
            <div className={desktop.hiW}>
              <DashboardScreen variant="desktop" />
            </div>
          ),
        },
      ];
    case "design-system-creation":
      return [
        {
          label: "Wireframe",
          sub: "17 button styles collapse into one spec.",
          node: (
            <div className={desktop.wireW}>
              <Wire layout="buttons" />
            </div>
          ),
        },
        {
          label: "Structured",
          sub: "Tokens first — primitives compose into anything.",
          node: (
            <div className={desktop.wireW}>
              <Wire layout="tokens" />
            </div>
          ),
        },
        {
          label: "Hi-fi",
          sub: "The system as a poster — one view of everything.",
          node: (
            <div className={desktop.hiW}>
              <DesignSystemScreen variant="desktop" />
            </div>
          ),
        },
      ];
    default:
      return [
        {
          label: "Wireframe",
          sub: "Calm surfaces, progressive KYC.",
          node: (
            <div className={mobile.wireW}>
              <Wire layout="onboard" />
            </div>
          ),
        },
        {
          label: "Structured",
          sub: "The goal ring becomes the home-screen anchor.",
          node: (
            <div className={mobile.wireW}>
              <Wire layout="ring" />
            </div>
          ),
        },
        {
          label: "Hi-fi",
          sub: "Goal ring, quick-save, padlock confirmations.",
          node: (
            <div className={mobile.hiW}>
              <BankingScreen variant="mobile" screen="home" />
            </div>
          ),
        },
      ];
  }
}

/* ------------------------------------------------------------------ */
/* chapters                                                            */
/* ------------------------------------------------------------------ */

export function getChapters(study: CaseStudy, visuals: StudyVisuals): ChapterBlock[] {
  const slug = study.slug;
  const isConceptual = study.kind === "CONCEPTUAL";
  const won = visuals.sketches.filter((s) => s.state === "won").length;
  const rejected = visuals.sketches.filter((s) => s.state === "rejected").length;

  const prototypeHref = visuals.prototype.href;

  const chapters: ChapterBlock[] = [
    {
      id: "problem",
      label: "The Problem",
      kicker: "01 — The problem",
      title: "The problem",
      lead: study.problem.lead,
      rail: PROBLEM_RAILS[slug],
      body: (
        <div className="space-y-4">
          <ProblemVisual slug={slug} study={study} visuals={visuals} />
        </div>
      ),
    },
    {
      id: "research",
      label: "Research",
      kicker: "02 — Research",
      title: "Research",
      lead: study.research.lead,
      rail: RESEARCH_RAILS[slug],
      body: (
        <div className="space-y-4">
          <ResearchVisual slug={slug} visuals={visuals} />
        </div>
      ),
    },
    {
      id: "explore",
      label: "Explore",
      kicker: "03 — Explore",
      title: "Explore",
      lead: study.designThinking.lead,
      rail: {
        kind: "stat",
        value: `${won} won`,
        label: `${visuals.sketches.length} explored · ${rejected} cut`,
      },
      body: (
        <div className="space-y-4">
          <ExploreVisual slug={slug} visuals={visuals} />
        </div>
      ),
    },
    {
      id: "refine",
      label: "Refine",
      kicker: "04 — Refine",
      title: "Refine",
      lead: study.ia.lead,
      body: (
        <div className="space-y-4">
          <FidelityLadder steps={fidelityFor(slug)} />
          {refineDiagrams(slug)}
        </div>
      ),
    },
    {
      id: "ship",
      label: "Ship",
      kicker: "05 — Ship",
      title: "Ship",
      lead: study.design.lead,
      rail: {
        kind: "stat",
        value: "R1 ✗ → R2 ✓",
        label: "usability rounds",
      },
      body: (
        <div className="space-y-4">
          <ShipVisual slug={slug} visuals={visuals} />
          <ValidateBlock slug={slug} visuals={visuals} />
          <a
            href={prototypeHref}
            target={visuals.prototype.kind === "external" ? "_blank" : undefined}
            rel={
              visuals.prototype.kind === "external"
                ? "noopener noreferrer"
                : undefined
            }
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            {visuals.prototype.label}
          </a>
        </div>
      ),
    },
    {
      id: "results",
      label: "Results",
      kicker: "06 — Results",
      title: "Results",
      rail: visuals.metricCards[0]
        ? {
            kind: "stat",
            value: visuals.metricCards[0].value,
            label: visuals.metricCards[0].label,
          }
        : undefined,
      body: (
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
          {isConceptual && (
            <ConceptualDisclaimer
              detail={
                study.outcomeDetail ||
                "Design hypothesis validated in moderated usability testing — not measured in production."
              }
            />
          )}
          {study.lessons && study.lessons.length > 0 && (
            <div className="border border-border bg-card p-4 sm:p-5">
              <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3">
                Lessons
              </p>
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
            </div>
          )}
        </div>
      ),
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
