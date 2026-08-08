import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import FigmaFrame from "@/components/art/FigmaFrame";
import { useInView, prefersReducedMotion } from "@/hooks/useInView";

const REDUCED = prefersReducedMotion();

export interface PipelineStage {
  tool: "Figma" | "FigJam" | "Maze";
  frameName: string;
  caption: string;
  art: React.ReactNode;
}

function TransformArrow({ active }: { active: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center shrink-0 px-1 sm:px-2 self-center">
      <svg width="36" height="16" viewBox="0 0 36 16" fill="none" aria-hidden className="hidden sm:block">
        <path
          d="M0 8 H28 M24 4 L30 8 L24 12"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`pipeline-arrow ${active ? "drawn" : ""}`}
          pathLength={1}
        />
      </svg>
      <ArrowRight size={14} className="text-accent sm:hidden" />
    </div>
  );
}

/* ---------- stage art factories ---------- */

function FigJamBoard() {
  return (
    <div className="relative h-full min-h-[100px] p-2 bg-[#f4efe7] flex flex-wrap gap-1.5 content-start">
      {["Says", "Thinks", "Feels", "Does"].map((q) => (
        <div key={q} className="w-[calc(50%-3px)] p-1.5 bg-white border border-[#141310]/15 rounded-sm">
          <p className="text-[6px] font-mono uppercase text-[#9747FF] mb-1">{q}</p>
          <div className="space-y-0.5">
            <div className="h-1 w-full bg-[#141310]/15 rounded-full" />
            <div className="h-1 w-3/4 bg-[#141310]/10 rounded-full" />
          </div>
        </div>
      ))}
      <div className="absolute bottom-2 right-2 w-8 h-5 bg-[#e8ff47] rounded-sm border border-[#141310]/20 rotate-3 shadow-sm" />
    </div>
  );
}

/* ── Banking-specific empathy map with real quotes ── */
function BankingEmpathyMap() {
  return (
    <div className="h-full min-h-[100px] p-1.5 bg-[#fdf9f2] flex flex-col gap-1">
      <div className="text-[5.5px] font-bold uppercase tracking-wider text-[#9747FF] mb-0.5">Empathy Map · 8 interviews</div>
      <div className="grid grid-cols-2 gap-1 flex-1">
        <div className="bg-white border border-[#141310]/12 rounded-[3px] p-1">
          <p className="text-[5px] font-mono uppercase text-[#9747FF] mb-0.5">Says</p>
          <p className="text-[5px] text-[#141310]/70 leading-tight">"I'll finish the docs later."</p>
          <p className="text-[5px] text-[#141310]/50 leading-tight mt-0.5">"My money lives in M-Pesa."</p>
        </div>
        <div className="bg-white border border-[#141310]/12 rounded-[3px] p-1">
          <p className="text-[5px] font-mono uppercase text-[#9747FF] mb-0.5">Thinks</p>
          <p className="text-[5px] text-[#141310]/70 leading-tight">"The app is watching me."</p>
          <p className="text-[5px] text-[#141310]/50 leading-tight mt-0.5">"Budgets are for salaried people."</p>
        </div>
        <div className="bg-white border border-[#141310]/12 rounded-[3px] p-1">
          <p className="text-[5px] font-mono uppercase text-[#9747FF] mb-0.5">Feels</p>
          <p className="text-[5px] text-[#141310]/70 leading-tight">Shame · avoidance</p>
          <div className="flex gap-0.5 mt-0.5">
            {["😓", "😤", "😰"].map(e => <span key={e} className="text-[7px]">{e}</span>)}
          </div>
        </div>
        <div className="bg-white border border-[#141310]/12 rounded-[3px] p-1">
          <p className="text-[5px] font-mono uppercase text-[#9747FF] mb-0.5">Does</p>
          <p className="text-[5px] text-[#141310]/70 leading-tight">Avoids the app</p>
          <p className="text-[5px] text-[#141310]/50 leading-tight mt-0.5">Saves cash in chamas</p>
        </div>
      </div>
      <div className="flex gap-1 mt-0.5">
        {["A · 21", "K · 23", "W · 26"].map(n => (
          <span key={n} className="px-1 py-[1px] text-[4.5px] font-mono bg-[#9747FF]/15 text-[#9747FF] rounded-full">{n}</span>
        ))}
        <span className="px-1 py-[1px] text-[4.5px] font-mono bg-[#e8ff47]/60 text-[#141310] rounded-full">+5 more</span>
      </div>
    </div>
  );
}

/* ── Banking onboarding flow: 8 → 4 steps ── */
function BankingFlowArt() {
  return (
    <div className="h-full min-h-[100px] p-2 bg-white flex flex-col gap-2 justify-center">
      <div className="text-[5.5px] font-mono uppercase tracking-wider text-[#141310]/50 mb-0.5">Onboarding · 8 → 4 steps</div>
      {/* Before */}
      <div className="space-y-0.5">
        <p className="text-[5px] font-mono text-rose-400 uppercase">Before · abandoned</p>
        <div className="flex items-center gap-0.5 flex-wrap">
          {["Open", "Details", "Docs ✗", "Verify", "Addr.", "PIN", "Agree", "Done"].map((s, i) => (
            <span key={s} className={`flex items-center gap-0.5`}>
              <span className={`px-0.5 py-[1px] text-[5px] rounded-[2px] border ${s === "Docs ✗" ? "bg-rose-400/20 border-rose-400/50 text-rose-400" : "border-[#141310]/20 text-[#141310]/60"}`}>{s}</span>
              {i < 7 && <span className="text-[6px] text-[#141310]/25">›</span>}
            </span>
          ))}
        </div>
      </div>
      {/* After */}
      <div className="space-y-0.5">
        <p className="text-[5px] font-mono text-[#141310]/50 uppercase">After · progressive KYC</p>
        <div className="flex items-center gap-0.5">
          {["Phone", "ID", "PIN", "Done ✓"].map((s, i) => (
            <span key={s} className="flex items-center gap-0.5">
              <span className={`px-1 py-[1px] text-[5px] rounded-[2px] font-semibold ${s === "Done ✓" ? "bg-[#e8ff47] border border-[#141310]/20 text-[#141310]" : "bg-[#141310] text-[#f4efe7]"}`}>{s}</span>
              {i < 3 && <span className="text-[7px] text-[#e8ff47]">→</span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Banking wireframe: savings-first home layout ── */
function BankingWireframeArt() {
  return (
    <div className="h-full min-h-[100px] p-2 bg-white flex flex-col gap-1">
      <div className="text-[5.5px] font-mono uppercase tracking-wider text-[#141310]/40 mb-0.5">Savings-first home</div>
      <div className="flex-1 flex gap-1.5">
        {/* Phone wireframe */}
        <div className="w-[55px] shrink-0 border border-dashed border-[#141310]/30 rounded-[6px] p-1 space-y-0.5 bg-[#fafafa]">
          {/* greeting */}
          <div className="h-1 w-2/3 bg-[#141310]/20 rounded-full" />
          {/* goal ring */}
          <div className="flex items-center justify-center my-1">
            <div className="w-8 h-8 rounded-full border-[3px] border-dashed border-[#141310]/25 flex items-center justify-center">
              <div className="text-[5px] text-[#141310]/40">62%</div>
            </div>
          </div>
          {/* quick save chips */}
          <div className="flex gap-0.5 justify-center">
            {["+200", "+500"].map(c => <span key={c} className="px-0.5 py-[1px] text-[4px] border border-dashed border-[#141310]/30 rounded-[2px]">{c}</span>)}
          </div>
          {/* balance */}
          <div className="h-1 w-1/2 bg-[#141310]/15 rounded-full mx-auto mt-0.5" />
          {/* actions */}
          <div className="grid grid-cols-3 gap-0.5 mt-0.5">
            {[0,1,2].map(i => <div key={i} className="h-3 border border-dashed border-[#141310]/20 rounded-[2px]" />)}
          </div>
        </div>
        {/* Annotations */}
        <div className="flex flex-col gap-1 justify-center">
          {[
            { dot: "①", text: "Goal ring first" },
            { dot: "②", text: "Quick-save +200" },
            { dot: "③", text: "Balance 2nd" },
            { dot: "④", text: "Actions row" },
          ].map(a => (
            <div key={a.dot} className="flex items-center gap-1">
              <span className="text-[5px] font-bold text-[#141310]/50">{a.dot}</span>
              <span className="text-[5px] text-[#141310]/60 leading-none">{a.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Banking hi-fi: real savings-first home screen ── */
function BankingHiFiArt() {
  return (
    <div className="h-full min-h-[100px] p-2 bg-[#f4efe7] flex items-center justify-center gap-2">
      {/* Phone mockup */}
      <div className="w-[58px] rounded-[12px] bg-[#141310] p-[2.5px] shadow-lg shrink-0">
        <div className="rounded-[10px] bg-[#f4efe7] overflow-hidden">
          {/* Status bar */}
          <div className="flex justify-between px-1.5 py-0.5">
            <span className="text-[4px] text-[#141310]/50 font-mono">9:41</span>
            <span className="text-[4px] text-[#141310]/50">●●●</span>
          </div>
          {/* Greeting */}
          <div className="px-1.5 pb-0.5">
            <div className="text-[5px] font-bold text-[#141310]">Hey, Amina 👋</div>
            <div className="text-[4px] text-[#141310]/50">Hustle on.</div>
          </div>
          {/* Goal ring card */}
          <div className="mx-1 mb-0.5 bg-[#141310] rounded-[5px] p-1 flex items-center gap-1">
            <div className="relative w-7 h-7 shrink-0">
              <svg viewBox="0 0 28 28" className="w-full h-full -rotate-90">
                <circle cx="14" cy="14" r="10" fill="none" stroke="#ffffff20" strokeWidth="3" />
                <circle cx="14" cy="14" r="10" fill="none" stroke="#e8ff47" strokeWidth="3" strokeLinecap="round" strokeDasharray={`${0.62 * 62.8} 62.8`} />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[4.5px] font-bold text-[#e8ff47]">62%</span>
            </div>
            <div>
              <div className="text-[4px] text-[#f4efe7]/70">Trip · Mombasa</div>
              <div className="flex gap-0.5 mt-0.5">
                {["+200", "+500"].map(c => (
                  <span key={c} className="px-0.5 py-[1px] text-[3.5px] bg-[#e8ff47] text-[#141310] rounded-[2px] font-bold">{c}</span>
                ))}
              </div>
            </div>
          </div>
          {/* Balance row */}
          <div className="mx-1 mb-0.5 flex justify-between items-center">
            <span className="text-[4px] text-[#141310]/50">Balance</span>
            <span className="text-[5px] font-bold text-[#141310]">KSh 4,200</span>
          </div>
          {/* Action row */}
          <div className="mx-1 mb-1 grid grid-cols-3 gap-0.5">
            {["Send", "Save", "Pay"].map(a => (
              <div key={a} className="bg-[#141310]/8 border border-[#141310]/15 rounded-[3px] py-1 flex flex-col items-center gap-0.5">
                <div className="w-2 h-2 bg-[#141310]/25 rounded-full" />
                <span className="text-[3.5px] text-[#141310]/60">{a}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Labels */}
      <div className="flex flex-col gap-1">
        {[
          { color: "#e8ff47", text: "Goal ring" },
          { color: "#141310", text: "Quick-save" },
          { color: "#141310", text: "Balance 2nd" },
        ].map(l => (
          <div key={l.text} className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: l.color, border: l.color === "#141310" ? "1px solid #141310" : "none" }} />
            <span className="text-[5px] text-[#141310]/70 leading-none">{l.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function WireframeArt() {
  return (
    <div className="h-full min-h-[100px] p-2 bg-white flex flex-col gap-1">
      <div className="h-2 w-2/3 bg-[#141310]/25 rounded-sm" />
      <div className="flex-1 border-2 border-dashed border-[#141310]/30 rounded-sm p-1.5 space-y-1">
        <div className="h-3 bg-[#141310]/10 rounded-sm" />
        <div className="h-6 bg-[#141310]/08 rounded-sm" />
        <div className="h-3 bg-[#141310]/10 rounded-sm" />
        <div className="grid grid-cols-2 gap-1 mt-auto">
          <div className="h-4 bg-[#141310]/12 rounded-sm" />
          <div className="h-4 bg-[#141310]/12 rounded-sm" />
        </div>
      </div>
    </div>
  );
}

function HiFiPhone({ accent = false }: { accent?: boolean }) {
  return (
    <div className="h-full min-h-[100px] p-2 bg-[#f4efe7] flex items-center justify-center">
      <div className="w-[70%] rounded-[10px] bg-[#141310] p-[3px] shadow-lg">
        <div className="rounded-[8px] bg-[#f4efe7] p-1.5 space-y-1">
          <div className="h-1.5 w-1/2 bg-[#141310]/70 rounded-full" />
          {accent ? (
            <div className="h-5 bg-[#e8ff47] border border-[#141310]/20 rounded-sm" />
          ) : (
            <div className="h-5 bg-[#141310]/10 rounded-sm" />
          )}
          <div className="h-3 bg-[#141310]/15 rounded-sm" />
          <div className="h-2.5 bg-[#141310] rounded-sm mt-1" />
        </div>
      </div>
    </div>
  );
}

function PrototypeChip() {
  return (
    <div className="h-full min-h-[100px] p-2 bg-[#f4efe7] flex flex-col items-center justify-center gap-2">
      <div className="w-10 h-10 rounded-full border-4 border-[#0052FF]/30 border-t-[#0052FF] animate-spin" style={{ animationDuration: "3s" }} />
      <span className="px-2 py-1 text-[7px] font-mono uppercase bg-[#0052FF] text-white rounded-sm">
        Prototype ↗
      </span>
      <div className="flex gap-1">
        {["✓", "✓", "↻"].map((s, i) => (
          <span key={i} className="w-4 h-4 grid place-items-center text-[7px] bg-white border border-[#141310]/20 rounded-sm">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

function TokensArt() {
  return (
    <div className="h-full min-h-[100px] p-2 bg-white space-y-1.5">
      <div className="flex gap-1">
        {["#141310", "#f4efe7", "#e8ff47"].map((c) => (
          <span key={c} className="w-4 h-4 rounded-sm border border-black/10" style={{ background: c }} />
        ))}
      </div>
      <div className="h-2 w-full bg-[#141310]/80 rounded-sm" />
      <div className="h-1.5 w-4/5 bg-[#141310]/50 rounded-sm" />
      <div className="h-1.5 w-3/5 bg-[#141310]/30 rounded-sm" />
      <div className="flex gap-1 mt-2">
        {["Primary", "Ghost"].map((b) => (
          <span key={b} className="flex-1 h-4 text-[5px] font-bold grid place-items-center border border-[#141310]/30 rounded-sm">
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}

function FlowArt() {
  return (
    <div className="h-full min-h-[100px] p-2 bg-white flex items-center justify-center">
      <div className="flex items-center gap-0.5 flex-wrap justify-center">
        {["Cart", "Pay", "Done"].map((s, i) => (
          <span key={s} className="flex items-center gap-0.5">
            <span className={`px-1 py-0.5 text-[6px] font-semibold border rounded-sm ${i === 2 ? "bg-[#e8ff47] border-[#141310]/30" : "border-[#141310]/25"}`}>
              {s}
            </span>
            {i < 2 && <span className="text-[8px] text-[#141310]/40">→</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

function IAMapMini() {
  return (
    <div className="h-full min-h-[100px] p-2 bg-white space-y-1">
      <div className="h-2 w-1/3 bg-[#141310]/60 rounded-sm mx-auto" />
      <div className="flex justify-center gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex flex-col items-center gap-0.5">
            <div className="w-6 h-3 border border-[#141310]/30 rounded-sm" />
            <div className="w-px h-2 bg-[#141310]/20" />
          </div>
        ))}
      </div>
      <div className="h-2 w-2/3 bg-[#141310]/20 rounded-sm mx-auto" />
    </div>
  );
}

function LiveShipArt() {
  return (
    <div className="h-full min-h-[100px] p-2 bg-[#141310] flex flex-col items-center justify-center gap-1.5">
      <span className="px-2 py-0.5 text-[7px] font-mono uppercase bg-[#e8ff47] text-[#141310] rounded-sm">
        Shipped ✓
      </span>
      <div className="w-[75%] h-12 rounded-sm bg-[#f4efe7]/10 border border-[#f4efe7]/20" />
      <span className="text-[6px] font-mono text-[#f4efe7]/50">vercel.app</span>
    </div>
  );
}

function SpecArt() {
  return (
    <div className="h-full min-h-[100px] p-1.5 bg-[#141310] space-y-1">
      <div className="h-1.5 w-1/2 bg-[#e8ff47]/80 rounded-sm" />
      <div className="grid grid-cols-3 gap-0.5">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-3 bg-[#f4efe7]/10 rounded-[2px]" />
        ))}
      </div>
      <div className="h-8 border border-dashed border-[#e8ff47]/40 rounded-sm p-1">
        <span className="text-[5px] font-mono text-[#e8ff47]/70">24px · 8px grid</span>
      </div>
    </div>
  );
}

export function stagesForSlug(slug: string): PipelineStage[] {
  switch (slug) {
    case "kenyatrace":
      return [
        { tool: "FigJam", frameName: "Research board", caption: "12 interviews", art: <FigJamBoard /> },
        { tool: "Figma", frameName: "IA · sitemap", caption: "County taxonomy", art: <IAMapMini /> },
        { tool: "Figma", frameName: "Mobile wire", caption: "List-first", art: <WireframeArt /> },
        { tool: "Figma", frameName: "Hi-fi screens", caption: "Editorial UI", art: <HiFiPhone accent /> },
        { tool: "Figma", frameName: "Live product", caption: "Shipped", art: <LiveShipArt /> },
      ];
    case "gigi-energy":
      return [
        { tool: "FigJam", frameName: "Funnel audit", caption: "GA4 leak", art: <FigJamBoard /> },
        { tool: "Figma", frameName: "Checkout flow", caption: "4 → 3 steps", art: <FlowArt /> },
        { tool: "Figma", frameName: "UI frames", caption: "AA contrast", art: <HiFiPhone accent /> },
        { tool: "Maze", frameName: "Usability", caption: "Form merge", art: <PrototypeChip /> },
        { tool: "Figma", frameName: "Live store", caption: "Shipped", art: <LiveShipArt /> },
      ];
    case "dashboard-ui-system":
      return [
        { tool: "FigJam", frameName: "Task interviews", caption: "3 tools", art: <FigJamBoard /> },
        { tool: "Figma", frameName: "IA diagram", caption: "KPI → table", art: <IAMapMini /> },
        { tool: "Figma", frameName: "Wireframes", caption: "Density tiers", art: <WireframeArt /> },
        { tool: "Figma", frameName: "Spec sheet", caption: "Dev handoff", art: <SpecArt /> },
        { tool: "Figma", frameName: "Hi-fi dark UI", caption: "Ops dashboard", art: <HiFiPhone /> },
      ];
    case "design-system-creation":
      return [
        { tool: "FigJam", frameName: "Audit board", caption: "17 buttons", art: <FigJamBoard /> },
        { tool: "Figma", frameName: "Token poster", caption: "Color · type", art: <TokensArt /> },
        { tool: "Figma", frameName: "Components", caption: "3 + states", art: <WireframeArt /> },
        { tool: "Figma", frameName: "Docs tree", caption: "Guidelines", art: <IAMapMini /> },
        { tool: "Figma", frameName: "Applied UI", caption: "In products", art: <HiFiPhone accent /> },
      ];
    default:
      return [
        { tool: "FigJam", frameName: "Empathy map", caption: "8 interviews", art: <FigJamBoard /> },
        { tool: "Figma", frameName: "User flows", caption: "8 → 4 steps", art: <FlowArt /> },
        { tool: "Figma", frameName: "Wireframes", caption: "3 concepts", art: <WireframeArt /> },
        { tool: "Figma", frameName: "Hi-fi UI", caption: "Savings-first", art: <HiFiPhone accent /> },
        { tool: "Maze", frameName: "Prototype", caption: "5 tests", art: <PrototypeChip /> },
      ];
  }
}

/** Homepage teaser — generic pipeline */
export const heroPipelineStages: PipelineStage[] = [
  { tool: "FigJam", frameName: "Discover", caption: "Research", art: <FigJamBoard /> },
  { tool: "Figma", frameName: "Define", caption: "Flows · IA", art: <WireframeArt /> },
  { tool: "Figma", frameName: "Design", caption: "Hi-fi UI", art: <HiFiPhone accent /> },
  { tool: "Maze", frameName: "Validate", caption: "Test · ship", art: <PrototypeChip /> },
];

export default function FigmaPipeline({
  stages,
  title = "Figma → shipped",
  subtitle,
  compact = false,
}: {
  stages: PipelineStage[];
  title?: string;
  subtitle?: string;
  compact?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(REDUCED);

  useInView(ref, (v) => {
    if (v) setVisible(true);
  });

  return (
    <div ref={ref} className="w-full">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <div>
          <span className="section-label mb-1">
            <span className="section-label-line" />
            {title}
          </span>
          {subtitle && (
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mt-1">
              {subtitle}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {["FigJam", "Figma", "Maze"].map((t) => (
            <span key={t} className="px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider border border-border bg-card text-muted-foreground">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto no-scrollbar pb-2">
        <div className={`flex items-start min-w-max ${compact ? "gap-1" : "gap-0"}`}>
          {stages.map((stage, i) => (
            <div key={stage.frameName} className="flex items-start">
              <div className="flex flex-col gap-1">
                <FigmaFrame
                  tool={stage.tool}
                  frameName={stage.frameName}
                  selected={i === stages.length - 2}
                  compact={compact}
                >
                  {stage.art}
                </FigmaFrame>
                <span className="text-[10px] font-mono uppercase tracking-wider text-accent pl-1">
                  {stage.caption}
                </span>
              </div>
              {i < stages.length - 1 && (
                <TransformArrow active={visible && !REDUCED} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
