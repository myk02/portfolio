import { useCallback, useEffect, useRef, useState } from "react";
import {
  Briefcase,
  FileText,
  EyeOff,
  ExternalLink,
  Image as ImageIcon,
  Slash,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { caseJourneys } from "@/data/caseJourneys";
import type { JourneyStageData } from "@/data/caseJourneys";
import { BankingScreen } from "@/components/art/BankingResponsive";
import {
  DashboardScreen,
  DesignSystemScreen,
} from "@/components/art/ResponsiveConceptArt";

const N = 6;
const IDLE_MS = 2000;
const FRAME_MS = 2500;
const REDUCED =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export interface JourneyStage {
  kicker: string;
  caption: string;
  chips: { text: string; icon?: React.ReactNode }[];
  art: React.ReactNode;
  data?: JourneyStageData;
}

/* ---------------- frame art pieces (styled compositions, no text walls) ---------------- */

function Chip({ text, icon }: { text: string; icon?: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 text-[9px] font-mono uppercase tracking-wider border border-foreground/25 text-foreground bg-secondary whitespace-nowrap">
      {icon}
      {text}
    </span>
  );
}

function IconTile({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <div className="w-11 h-11 grid place-items-center bg-foreground text-background">
        {icon}
      </div>
      <Chip text={label} />
    </div>
  );
}

function PersonaThumbs({ initials }: { initials: string[] }) {
  return (
    <div className="flex gap-2">
      {initials.map((ini, i) => (
        <div key={ini} className="flex flex-col items-center gap-1.5">
          <span
            className="w-9 h-9 rounded-full border-2 grid place-items-center text-[10px] font-bold"
            style={{
              borderColor: i === 0 ? "var(--accent)" : "rgba(20,19,16,0.3)",
              background: i === 0 ? "var(--accent)" : "var(--background)",
              color: i === 0 ? "var(--accent-foreground)" : "var(--foreground)",
            }}
          >
            {ini}
          </span>
          <span className="w-10 h-1 bg-foreground/25" />
          <span className="w-7 h-1 bg-foreground/15" />
        </div>
      ))}
    </div>
  );
}

function SketchCard() {
  return (
    <div
      className="w-[72px] p-1.5 border border-foreground/20"
      style={{
        background:
          "repeating-linear-gradient(0deg, rgba(20,19,16,0.04) 0 1px, transparent 1px 6px), #f6f1e4",
      }}
    >
      <div className="space-y-1">
        <div className="h-1 w-3/4 bg-foreground/35" />
        <div className="h-2.5 border border-foreground/25" />
        <div className="h-2.5 border border-foreground/25" />
        <div className="h-2 bg-foreground/20" />
      </div>
    </div>
  );
}

function ConceptCard({ chip, won }: { chip: string; won: boolean }) {
  return (
    <div className="w-[74px] p-1.5 border flex flex-col gap-1.5">
      <div className="space-y-1">
        <div className="h-1.5 w-2/3 bg-foreground/30" />
        <div className="h-4 bg-foreground/15" />
        <div className="h-1.5 w-1/2 bg-foreground/25" />
      </div>
      <span
        className={`self-start px-1 py-[1px] text-[6.5px] font-mono uppercase tracking-wider ${
          won
            ? "bg-accent text-accent-foreground"
            : "border border-rose-400/60 text-rose-400"
        }`}
      >
        {chip}
      </span>
    </div>
  );
}

/** Marks a stage that wants a real asset dropped in — code art stays visible behind it. */
function PlaceholderSlot({ label }: { label: string }) {
  return (
    <>
      <span className="pointer-events-none absolute inset-0 z-[1] border border-dashed border-foreground/30" />
      <span className="pointer-events-none absolute inset-[5px] z-[1] border border-dashed border-foreground/15" />
      <span className="absolute top-1.5 right-1.5 z-[2] inline-flex items-center gap-1 px-1.5 py-0.5 text-[8px] font-mono uppercase tracking-wider bg-card border border-dashed border-foreground/50 text-muted-foreground">
        <Slash size={8} aria-hidden />
        Real {label} slot
      </span>
    </>
  );
}

function PhoneMini({ src }: { src?: string }) {
  return (
    <div className="w-[72px] rounded-[14px] bg-[#141310] p-[3px] border border-[rgba(20,19,16,0.15)] shadow-[0_10px_24px_rgba(20,19,16,0.16)]">
      <div
        className="relative overflow-hidden rounded-[11px] bg-[#f4efe7]"
        style={{ aspectRatio: "9/17" }}
      >
        {src ? (
          <img
            src={src}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-top"
            loading="lazy"
            onError={e => {
              const img = e.currentTarget;
              if (src.includes(".webp") && !img.dataset.fallback) {
                img.dataset.fallback = "1";
                img.src = src.replace("-640.webp", ".png");
              }
            }}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col gap-1 p-1.5">
            <div className="h-1.5 w-2/3 bg-[#141310]/80" />
            <div className="h-4 bg-[#141310]/10 rounded-[2px]" />
            <div className="h-4 bg-[#e8ff47] border border-[#141310]/20 rounded-[2px]" />
            <div className="h-2 w-3/4 bg-[#141310]/15" />
            <div className="mt-auto h-2.5 bg-[#141310] rounded-[2px]" />
          </div>
        )}
      </div>
    </div>
  );
}

function TestArt({ prototypeLabel }: { prototypeLabel: string }) {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <div className="flex gap-2">
        <Chip text="Maze" icon={<FileText size={9} />} />
        <Chip text="5 tests" icon={<EyeOff size={9} />} />
      </div>
      <span className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[9px] font-mono uppercase tracking-wider bg-accent text-accent-foreground">
        <ExternalLink size={10} />
        {prototypeLabel}
      </span>
    </div>
  );
}

function DarkPhoneMini() {
  return (
    <div className="w-[72px] rounded-[14px] bg-[#141310] p-[3px] border border-[rgba(20,19,16,0.15)]">
      <div
        className="overflow-hidden rounded-[11px] bg-[#141310]"
        style={{ aspectRatio: "9/17" }}
      >
        <div className="p-1.5 space-y-1">
          <div className="h-1.5 w-1/2 bg-[#e8ff47]" />
          <div className="grid grid-cols-3 gap-1">
            {[0, 1, 2].map(i => (
              <div key={i} className="h-3 bg-[#f4efe7]/20" />
            ))}
          </div>
          <div className="h-4 bg-[#f4efe7]/10" />
          <div className="h-3 bg-[#f4efe7]/15" />
        </div>
      </div>
    </div>
  );
}

function TokensMini() {
  return (
    <div
      className="w-[72px] border border-foreground/30 p-1.5"
      style={{ background: "var(--background)" }}
    >
      <div className="space-y-1">
        <div className="flex gap-1">
          <span className="w-3 h-3 bg-[#141310] border border-foreground/20" />
          <span className="w-3 h-3 bg-[#f4efe7] border border-foreground/20" />
          <span className="w-3 h-3 bg-[#e8ff47] border border-foreground/20" />
        </div>
        <div className="h-1.5 w-4/5 bg-foreground/30" />
        <div className="h-1.5 w-3/5 bg-foreground/20" />
        <div className="h-1.5 w-2/5 bg-foreground/25" />
      </div>
    </div>
  );
}

/* ---------------- stage factories per study ---------------- */

function stagesFor(slug: string): JourneyStage[] {
  /* ── per-study inline art helpers ── */

  /* Banking-specific mini art pieces */
  function BankingBriefArt() {
    return (
      <div className="flex flex-col items-center gap-2">
        <IconTile icon={<Briefcase size={18} />} label="Mobile banking" />
        <div className="flex gap-1.5 mt-1">
          <Chip text="6 weeks" />
          <Chip text="Conceptual" />
        </div>
      </div>
    );
  }

  function BankingResearchArt() {
    return (
      <div className="flex flex-col gap-2 w-full px-2">
        <PersonaThumbs initials={["A", "K", "W"]} />
        <div className="flex flex-wrap gap-1 mt-1">
          <Chip text="8 interviews" />
          <Chip text="47 survey" />
        </div>
      </div>
    );
  }

  function BankingSketchesArt() {
    return (
      <div className="flex flex-col gap-1.5 items-center">
        <div className="flex gap-2 rotate-[-2deg]">
          <SketchCard />
          <SketchCard />
        </div>
        <Chip text="Savings-first" />
      </div>
    );
  }

  function BankingWireframesArt() {
    return (
      <div className="flex gap-2 items-end">
        <ConceptCard chip="Dark · ✗" won={false} />
        <ConceptCard chip="Grid · ✗" won={false} />
        <ConceptCard chip="Goals · ✓" won />
      </div>
    );
  }

  function BankingHifiArt() {
    return (
      <div className="w-full h-full">
        <BankingScreen variant="mobile" screen="goals" />
      </div>
    );
  }

  function BankingShipArt() {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-2">
          <Chip text="Maze" icon={<FileText size={9} />} />
          <Chip text="5 tests" icon={<EyeOff size={9} />} />
        </div>
        <span className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[9px] font-mono uppercase tracking-wider bg-accent text-accent-foreground">
          <ExternalLink size={10} />
          100% pass ↗
        </span>
      </div>
    );
  }

  /* KenyaTrace-specific art pieces */
  function KenyaBriefArt() {
    return (
      <div className="flex flex-col items-center gap-2">
        <IconTile icon={<Briefcase size={18} />} label="Trip planner" />
        <div className="flex gap-1.5 mt-1">
          <Chip text="5 weeks" />
          <Chip text="Live" />
        </div>
      </div>
    );
  }

  function KenyaResearchArt() {
    return (
      <div className="flex flex-col gap-2 w-full px-2">
        <PersonaThumbs initials={["B", "A", "T"]} />
        <div className="flex flex-wrap gap-1 mt-1">
          <Chip text="12 interviews" />
          <Chip text="34 survey" />
        </div>
      </div>
    );
  }

  function KenyaSketchesArt() {
    return (
      <div className="flex flex-col gap-1.5 items-center">
        <div className="flex gap-2 rotate-[-2deg]">
          <SketchCard />
          <SketchCard />
        </div>
        <Chip text="Route-first" />
      </div>
    );
  }

  function KenyaWireframesArt() {
    return (
      <div className="flex gap-2 items-end">
        <ConceptCard chip="Map · ✗" won={false} />
        <ConceptCard chip="List · ✓" won />
        <ConceptCard chip="Route · ✓" won />
      </div>
    );
  }

  function KenyaHifiArt() {
    return (
      <div className="flex gap-1.5 items-center justify-center">
        <PhoneMini />
        <div className="flex flex-col gap-1">
          <Chip text="Browse" />
          <Chip text="Plan" />
          <Chip text="Share" />
        </div>
      </div>
    );
  }

  function KenyaShipArt() {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-2">
          <Chip text="5 tests" icon={<EyeOff size={9} />} />
          <Chip text="6→3 taps" />
        </div>
        <span className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[9px] font-mono uppercase tracking-wider bg-accent text-accent-foreground">
          <ExternalLink size={10} />
          View live ↗
        </span>
      </div>
    );
  }

  /* GiGi Energy-specific art pieces */
  function GigiBriefArt() {
    return (
      <div className="flex flex-col items-center gap-2">
        <IconTile icon={<Briefcase size={18} />} label="Storefront" />
        <div className="flex gap-1.5 mt-1">
          <Chip text="4 weeks" />
          <Chip text="Live" />
        </div>
      </div>
    );
  }

  function GigiResearchArt() {
    return (
      <div className="flex flex-col gap-2 w-full px-2">
        <div className="space-y-1.5 w-full">
          <div className="flex items-center gap-2">
            <span className="text-[8px] font-mono text-muted-foreground w-16 shrink-0">
              Cart
            </span>
            <div className="flex-1 h-3 bg-foreground/20" />
            <span className="text-[8px] font-mono w-8 text-right">100%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[8px] font-mono text-muted-foreground w-16 shrink-0">
              Checkout
            </span>
            <div
              className="flex-1 h-3 bg-foreground/20"
              style={{ width: "48%" }}
            />
            <span className="text-[8px] font-mono w-8 text-right">48%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[8px] font-mono text-rose-400 w-16 shrink-0">
              Payment
            </span>
            <div className="h-3 bg-rose-400/50" style={{ width: "31%" }} />
            <span className="text-[8px] font-mono text-rose-400 w-8 text-right">
              31%
            </span>
          </div>
        </div>
        <Chip text="GA4 funnel · −52%" />
      </div>
    );
  }

  function GigiSketchesArt() {
    return (
      <div className="flex flex-col gap-1.5 items-center">
        <div className="flex gap-2 rotate-[-2deg]">
          <SketchCard />
          <SketchCard />
        </div>
        <Chip text="Can-first" />
      </div>
    );
  }

  function GigiWireframesArt() {
    return (
      <div className="flex gap-2 items-end">
        <ConceptCard chip="Neon · ✗" won={false} />
        <ConceptCard chip="Can · ✓" won />
        <ConceptCard chip="3-step · ✓" won />
      </div>
    );
  }

  function GigiHifiArt() {
    return (
      <div className="flex gap-1.5 items-center justify-center">
        <div className="w-[72px] rounded-[14px] bg-[#141310] p-[3px] border border-[rgba(20,19,16,0.15)]">
          <div
            className="overflow-hidden rounded-[11px]"
            style={{ aspectRatio: "9/17", background: "#f4efe7" }}
          >
            <div className="p-1.5 space-y-1">
              <div className="h-2 w-2/3 bg-[#141310]" />
              <div className="text-[6px] font-mono text-[#141310]/60">
                FUEL YOUR
              </div>
              <div
                className="text-[6px] font-bold"
                style={{ color: "#a3e635" }}
              >
                AMBITION
              </div>
              <div className="h-3 bg-[#141310]/10 rounded" />
              <div className="h-4 flex items-center justify-center bg-[#141310] rounded">
                <span className="text-[5px] text-[#f4efe7]">Explore →</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Chip text="Bold type" />
          <Chip text="AA contrast" />
          <Chip text="M-Pesa" />
        </div>
      </div>
    );
  }

  function GigiShipArt() {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-2">
          <Chip text="5 tests" icon={<EyeOff size={9} />} />
          <Chip text="4→3 steps" />
        </div>
        <span className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[9px] font-mono uppercase tracking-wider bg-accent text-accent-foreground">
          <ExternalLink size={10} />
          View live ↗
        </span>
      </div>
    );
  }

  /* Dashboard-specific art pieces */
  function DashBriefArt() {
    return (
      <div className="flex flex-col items-center gap-2">
        <IconTile icon={<Briefcase size={18} />} label="Ops dashboard" />
        <div className="flex gap-1.5 mt-1">
          <Chip text="4 weeks" />
          <Chip text="Conceptual" />
        </div>
      </div>
    );
  }

  function DashResearchArt() {
    return (
      <div className="flex flex-col gap-2 w-full px-2">
        <PersonaThumbs initials={["O", "F", "C"]} />
        <div className="flex flex-wrap gap-1 mt-1">
          <Chip text="3 tools" />
          <Chip text="Interviews" />
        </div>
      </div>
    );
  }

  function DashSketchesArt() {
    return (
      <div className="flex flex-col gap-1.5 items-center">
        <div className="flex gap-1.5">
          <div className="w-[56px] border border-foreground/20 p-1 bg-[#141310]">
            <div className="space-y-0.5">
              <div className="flex gap-0.5">
                {[0, 1, 2].map(i => (
                  <div key={i} className="flex-1 h-2 bg-[#e8ff47]/40" />
                ))}
              </div>
              <div className="h-3 bg-[#f4efe7]/10" />
              <div className="h-4 bg-[#f4efe7]/5" />
            </div>
          </div>
          <SketchCard />
        </div>
        <Chip text="Density first" />
      </div>
    );
  }

  function DashWireframesArt() {
    return (
      <div className="flex gap-2 items-end">
        <ConceptCard chip="Cards · ✗" won={false} />
        <ConceptCard chip="Table · ✗" won={false} />
        <ConceptCard chip="3-tier · ✓" won />
      </div>
    );
  }

  function DashHifiArt() {
    return (
      <div className="w-full h-full">
        <DashboardScreen variant="mobile" />
      </div>
    );
  }

  function DashShipArt() {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-2">
          <Chip text="Dev walkthrough" />
          <Chip text="100% spec'd" />
        </div>
        <span className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[9px] font-mono uppercase tracking-wider bg-accent text-accent-foreground">
          <ExternalLink size={10} />
          View prototype ↗
        </span>
      </div>
    );
  }

  /* Design system-specific art pieces */
  function DsBriefArt() {
    return (
      <div className="flex flex-col items-center gap-2">
        <IconTile icon={<Briefcase size={18} />} label="Standards layer" />
        <div className="flex gap-1.5 mt-1">
          <Chip text="3 weeks" />
          <Chip text="Conceptual" />
        </div>
      </div>
    );
  }

  function DsResearchArt() {
    return (
      <div className="flex flex-col gap-2 w-full px-2">
        <div className="flex flex-wrap gap-1.5">
          <span className="px-2 py-1 text-[7px] font-mono border border-foreground/30 text-foreground">
            17 button styles
          </span>
          <span className="px-2 py-1 text-[7px] font-mono border border-foreground/30 text-foreground">
            6 type scales
          </span>
          <span className="px-2 py-1 text-[7px] font-mono border border-foreground/30 text-foreground">
            ∞ grays
          </span>
        </div>
        <Chip text="3 surfaces · designers" />
      </div>
    );
  }

  function DsSketchesArt() {
    return (
      <div className="flex flex-col gap-1.5 items-center">
        <div className="flex gap-2 rotate-[-2deg]">
          <TokensMini />
          <SketchCard />
        </div>
        <Chip text="Tokens first" />
      </div>
    );
  }

  function DsWireframesArt() {
    return (
      <div className="flex gap-2 items-end">
        <ConceptCard chip="Comp · ✗" won={false} />
        <ConceptCard chip="Tokens · ✓" won />
        <ConceptCard chip="Docs · ✓" won />
      </div>
    );
  }

  function DsHifiArt() {
    return (
      <div className="w-full h-full">
        <DesignSystemScreen variant="mobile" />
      </div>
    );
  }

  function DsShipArt() {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-2">
          <Chip text="17→3 buttons" />
          <Chip text="10 components" />
        </div>
        <span className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[9px] font-mono uppercase tracking-wider bg-accent text-accent-foreground">
          <ExternalLink size={10} />
          View prototype ↗
        </span>
      </div>
    );
  }

  switch (slug) {
    case "kenyatrace":
      return [
        {
          kicker: "01 Brief",
          caption: "Brief",
          chips: [{ text: "5 weeks" }],
          art: <KenyaBriefArt />,
        },
        {
          kicker: "02 Research",
          caption: "Research",
          chips: [{ text: "12 interviews" }, { text: "34 survey" }],
          art: <KenyaResearchArt />,
        },
        {
          kicker: "03 Sketches",
          caption: "Sketches",
          chips: [{ text: "Route-first" }],
          art: <KenyaSketchesArt />,
        },
        {
          kicker: "04 Wireframes",
          caption: "Wireframes",
          chips: [{ text: "3 concepts" }],
          art: <KenyaWireframesArt />,
        },
        {
          kicker: "05 Hi-fi",
          caption: "Hi-fi",
          chips: [{ text: "Shipped" }],
          art: <KenyaHifiArt />,
        },
        {
          kicker: "06 Test & ship",
          caption: "Test & ship",
          chips: [{ text: "Usability pass" }],
          art: <KenyaShipArt />,
        },
      ];
    case "gigi-energy":
      return [
        {
          kicker: "01 Brief",
          caption: "Brief",
          chips: [{ text: "4 weeks" }],
          art: <GigiBriefArt />,
        },
        {
          kicker: "02 Research",
          caption: "Research",
          chips: [{ text: "GA4 review" }, { text: "5-store audit" }],
          art: <GigiResearchArt />,
        },
        {
          kicker: "03 Sketches",
          caption: "Sketches",
          chips: [{ text: "Can-first" }],
          art: <GigiSketchesArt />,
        },
        {
          kicker: "04 Wireframes",
          caption: "Wireframes",
          chips: [{ text: "3 concepts" }],
          art: <GigiWireframesArt />,
        },
        {
          kicker: "05 Hi-fi",
          caption: "Hi-fi",
          chips: [{ text: "Shipped" }],
          art: <GigiHifiArt />,
        },
        {
          kicker: "06 Test & ship",
          caption: "Test & ship",
          chips: [{ text: "Usability pass" }],
          art: <GigiShipArt />,
        },
      ];
    case "dashboard-ui-system":
      return [
        {
          kicker: "01 Brief",
          caption: "Brief",
          chips: [{ text: "4 weeks" }],
          art: <DashBriefArt />,
        },
        {
          kicker: "02 Research",
          caption: "Research",
          chips: [{ text: "3 tools" }, { text: "interviews" }],
          art: <DashResearchArt />,
        },
        {
          kicker: "03 Sketches",
          caption: "Sketches",
          chips: [{ text: "Density first" }],
          art: <DashSketchesArt />,
        },
        {
          kicker: "04 Wireframes",
          caption: "Wireframes",
          chips: [{ text: "3 concepts" }],
          art: <DashWireframesArt />,
        },
        {
          kicker: "05 Hi-fi",
          caption: "Hi-fi",
          chips: [{ text: "Spec'd" }],
          art: <DashHifiArt />,
        },
        {
          kicker: "06 Test & ship",
          caption: "Test & ship",
          chips: [{ text: "Dev walkthrough" }],
          art: <DashShipArt />,
        },
      ];
    case "design-system-creation":
      return [
        {
          kicker: "01 Brief",
          caption: "Brief",
          chips: [{ text: "3 weeks" }],
          art: <DsBriefArt />,
        },
        {
          kicker: "02 Research",
          caption: "Research",
          chips: [{ text: "3 surfaces" }, { text: "designers" }],
          art: <DsResearchArt />,
        },
        {
          kicker: "03 Sketches",
          caption: "Sketches",
          chips: [{ text: "Tokens first" }],
          art: <DsSketchesArt />,
        },
        {
          kicker: "04 Wireframes",
          caption: "Wireframes",
          chips: [{ text: "3 concepts" }],
          art: <DsWireframesArt />,
        },
        {
          kicker: "05 Hi-fi",
          caption: "Hi-fi",
          chips: [{ text: "Token poster" }],
          art: <DsHifiArt />,
        },
        {
          kicker: "06 Test & ship",
          caption: "Test & ship",
          chips: [{ text: "Dashboard consumed it" }],
          art: <DsShipArt />,
        },
      ];
    default:
      /* mobile-banking-redesign */
      return [
        {
          kicker: "01 Brief",
          caption: "Brief",
          chips: [{ text: "6 weeks" }],
          art: <BankingBriefArt />,
        },
        {
          kicker: "02 Research",
          caption: "Research",
          chips: [{ text: "8 interviews" }, { text: "47 survey" }],
          art: <BankingResearchArt />,
        },
        {
          kicker: "03 Sketches",
          caption: "Sketches",
          chips: [{ text: "Savings-first" }],
          art: <BankingSketchesArt />,
        },
        {
          kicker: "04 Wireframes",
          caption: "Wireframes",
          chips: [{ text: "3 concepts" }],
          art: <BankingWireframesArt />,
        },
        {
          kicker: "05 Hi-fi",
          caption: "Hi-fi",
          chips: [{ text: "4 screens" }],
          art: <BankingHifiArt />,
        },
        {
          kicker: "06 Test & ship",
          caption: "Test & ship",
          chips: [{ text: "Usability pass" }],
          art: <BankingShipArt />,
        },
      ];
  }
}

/* ---------------- per-frame style (transform/opacity/filter only) ---------------- */

function applyFrame(
  el: HTMLElement,
  base: number,
  blend: number,
  reduced: boolean,
  autoSlide = 0
) {
  const idx = Number(el.dataset.frame) || 0;
  const isActive = idx === base;
  const isNext = idx === base + 1;
  let scale = 1;
  let opacity = 0.55;
  let blur = "2px";
  let ring = "0 0 0 0px rgba(232,255,71,0)";
  let tx = 0;

  if (isActive) {
    scale = reduced ? 1 : 1.04;
    opacity = 1;
    blur = "0px";
    ring = "0 0 0 2px var(--accent)";
    tx = reduced ? 0 : -autoSlide * 8;
  } else if (isNext && !reduced) {
    const t = Math.max(0, Math.min(1, blend));
    scale = 1 + 0.04 * t;
    opacity = 0.55 + 0.45 * t;
    blur = `${(2 - 2 * t).toFixed(2)}px`;
    tx = (1 - t) * 8;
  }

  el.style.transform = `translateX(${tx.toFixed(1)}px) scale(${scale})`;
  el.style.opacity = opacity.toFixed(3);
  el.style.filter = reduced ? "none" : `blur(${blur})`;
  el.style.boxShadow = ring;
  el.style.willChange = "transform, opacity, filter";
}

export default function DesignJourney({ slug }: { slug: string }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeBase = useRef(0);
  const blendCurrent = useRef(0);
  const lastBase = useRef(-1);
  const lastBlend = useRef(-1);
  const lastSet = useRef(-1);
  const lastActivity = useRef(performance.now());
  const autoOrigin = useRef(0);
  const autoStart = useRef<number | null>(null);
  const pinnedFrame = useRef<number | null>(null);
  const pinUntil = useRef(0);
  const rafId = useRef(0);

  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [started, setStarted] = useState(false);

  const stages = stagesFor(slug).map((s, i) => ({
    ...s,
    data: caseJourneys[slug]?.[i],
  }));
  const prototypeHref =
    slug === "kenyatrace"
      ? "https://kenyatrace.vercel.app"
      : slug === "gigi-energy"
        ? "https://gigiflavours.vercel.app/"
        : `/work/${slug}/prototype`;

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsMobile(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const markActivity = useCallback(() => {
    lastActivity.current = performance.now();
    autoStart.current = null;
  }, []);

  useEffect(() => {
    if (REDUCED) return;
    window.addEventListener("scroll", markActivity, { passive: true });
    window.addEventListener("pointerdown", markActivity, { passive: true });
    window.addEventListener("touchstart", markActivity, { passive: true });
    const strip = stripRef.current;
    if (strip) {
      strip.addEventListener("pointermove", markActivity, { passive: true });
      strip.addEventListener("wheel", markActivity, { passive: true });
    }
    return () => {
      window.removeEventListener("scroll", markActivity);
      window.removeEventListener("pointerdown", markActivity);
      window.removeEventListener("touchstart", markActivity);
      strip?.removeEventListener("pointermove", markActivity);
      strip?.removeEventListener("wheel", markActivity);
    };
  }, [markActivity]);

  const paint = useCallback((autoSlide = 0) => {
    const base = activeBase.current;
    const blend = blendCurrent.current;
    if (
      base !== lastBase.current ||
      Math.abs(blend - lastBlend.current) > 0.03 ||
      autoSlide > 0
    ) {
      frameRefs.current.forEach(
        el => el && applyFrame(el, base, blend, REDUCED, autoSlide)
      );
      lastBase.current = base;
      lastBlend.current = blend;
    }
    if (base !== lastSet.current) {
      setActive(base);
      lastSet.current = base;
    }
  }, []);

  useEffect(() => {
    if (REDUCED) {
      frameRefs.current.forEach(el => el && applyFrame(el, 0, 0, true));
      setActive(0);
      return;
    }
    if (!started) return;

    const tick = () => {
      let base = 0;
      let blend = 0;
      let autoSlide = 0;
      const strip = stripRef.current;
      const outer = outerRef.current;
      const nowMs = performance.now();

      /* pin after dot click — hold frame for a beat, then resume */
      if (pinnedFrame.current != null && nowMs < pinUntil.current) {
        base = pinnedFrame.current;
        blend = 0;
      } else if (strip && strip.scrollWidth > strip.clientWidth + 2) {
        /* strip is horizontally scrollable — drive frames from strip position */
        const max = strip.scrollWidth - strip.clientWidth;
        const p = max > 0 ? strip.scrollLeft / max : 0;
        const fi = p * (N - 1);
        base = Math.min(N - 1, Math.max(0, Math.floor(fi)));
        blend = fi - base;
      } else if (outer) {
        const vh = window.innerHeight;
        const outerH = outer.offsetHeight;
        const zone = outerH - vh;
        const top = outer.getBoundingClientRect().top;
        const p = zone > 0 ? Math.min(1, Math.max(0, -top / zone)) : 0;
        const fi = p * (N - 1);
        base = Math.min(N - 1, Math.max(0, Math.floor(fi)));
        blend = fi - base;
      }

      /* idle auto-play after 2s of no activity */
      if (nowMs - lastActivity.current > IDLE_MS) {
        if (autoStart.current == null) {
          autoStart.current = nowMs;
          autoOrigin.current = base;
        }
        const elapsed = (nowMs - autoStart.current) / FRAME_MS;
        const fi = (autoOrigin.current + elapsed) % N;
        base = Math.floor(fi) % N;
        blend = fi - Math.floor(fi);
        autoSlide = blend;
      } else {
        autoStart.current = null;
      }

      activeBase.current = base;
      blendCurrent.current = blend;
      paint(autoSlide);
      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [isMobile, paint, started]);

  useInView(outerRef, inView => {
    if (inView) setStarted(true);
    else markActivity();
  });

  const jump = (i: number) => {
    const target = Math.min(N - 1, Math.max(0, i));
    pinnedFrame.current = target;
    pinUntil.current = performance.now() + FRAME_MS;
    lastActivity.current = performance.now();
    autoStart.current = null;
    activeBase.current = target;
    blendCurrent.current = 0;
    setActive(target);
    frameRefs.current.forEach(el => el && applyFrame(el, target, 0, REDUCED));

    /* scroll strip to frame on all breakpoints */
    const strip = stripRef.current;
    const frame = frameRefs.current[target];
    if (strip && frame) {
      strip.scrollTo({ left: frame.offsetLeft - 16, behavior: "smooth" });
    }

    /* desktop: scroll outer so progress lands on this frame (no horizontal strip) */
    if (
      !isMobile &&
      outerRef.current &&
      strip &&
      strip.scrollWidth <= strip.clientWidth + 2
    ) {
      const outer = outerRef.current;
      const vh = window.innerHeight;
      const zone = outer.offsetHeight - vh;
      if (zone > 0) {
        const top = window.scrollY + outer.getBoundingClientRect().top;
        const y = top + (target / (N - 1)) * zone;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  return (
    <div ref={outerRef} className={isMobile || REDUCED ? "" : "h-[140vh]"}>
      <div
        ref={stripRef}
        className={`${isMobile || REDUCED ? "" : "sticky top-[20vh]"} overflow-x-auto no-scrollbar snap-x snap-mandatory py-2`}
      >
        <div className="mb-3 flex items-center gap-2">
          <span className="section-label mb-0">
            <span className="section-label-line" />
            Design journey
          </span>
          <span className="hidden md:inline text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            scroll to watch
          </span>
        </div>

        <div className="flex gap-3 sm:gap-4 w-max pr-6">
          {stages.map((s, i) => (
            <div
              key={s.kicker}
              ref={el => {
                frameRefs.current[i] = el;
              }}
              data-frame={i}
              className={`snap-start shrink-0 w-[calc((100vw-5rem)/3)] min-w-[140px] sm:w-[300px] md:w-[340px] border border-border bg-card p-3 sm:p-4 flex flex-col gap-2.5 transition-[transform,opacity,filter,box-shadow] duration-300 ease-out ${
                REDUCED ? "" : "will-change-transform"
              }`}
            >
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                {s.kicker}
              </span>
              <div className="h-[150px] sm:h-[170px] grid place-items-center border border-border bg-secondary/60 overflow-hidden relative">
                {s.data?.image ? (
                  <img
                    src={s.data.image.src}
                    alt={s.data.image.alt}
                    loading="lazy"
                    decoding="async"
                    className={`w-full h-full ${
                      s.data.image.fit === "contain"
                        ? "object-contain p-2 bg-secondary"
                        : "object-cover"
                    }`}
                  />
                ) : (
                  s.art
                )}
                {s.data?.placeholder && !s.data?.image && (
                  <PlaceholderSlot label={s.data.placeholder} />
                )}
                {s.data?.image && (
                  <span className="absolute top-1.5 left-1.5 inline-flex items-center gap-1 px-1.5 py-0.5 text-[8px] font-mono uppercase tracking-wider bg-foreground text-background">
                    <ImageIcon size={8} aria-hidden />
                    Live
                  </span>
                )}
              </div>
              <p className="font-display font-bold text-base sm:text-lg text-foreground leading-snug">
                {s.caption}
              </p>
              {s.data?.note && (
                <p className="text-[11px] sm:text-xs text-muted-foreground leading-snug">
                  {s.data.note}
                </p>
              )}
              {s.data?.source && (
                <p className="text-[9px] font-mono uppercase tracking-wider text-foreground/60">
                  Source · {s.data.source}
                </p>
              )}
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {s.chips.map(c => (
                  <Chip key={c.text} text={c.text} icon={c.icon} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {!REDUCED && (
          <div className="mt-4 flex items-center justify-center gap-3">
            {stages.map((s, i) => (
              <button
                key={s.kicker}
                type="button"
                aria-label={`Jump to ${s.caption}`}
                onClick={() => jump(i)}
                className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
                  i === active
                    ? "bg-accent border-accent scale-110"
                    : "border-foreground/30 hover:border-foreground/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <a
        href={prototypeHref}
        target={prototypeHref.startsWith("http") ? "_blank" : undefined}
        rel={
          prototypeHref.startsWith("http") ? "noopener noreferrer" : undefined
        }
        className="sr-only"
        aria-label="Open prototype"
      >
        Open prototype
      </a>
    </div>
  );
}
