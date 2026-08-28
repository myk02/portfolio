import { motion } from "framer-motion";
import { ArrowUpRight, Code2, Palette, Zap, Check } from "lucide-react";
import { Link } from "wouter";
import { Reveal } from "@/components/Reveal";
import { caseStudies } from "@/data/caseStudies";

/** Minimal code artifact — no window chrome, muted palette */
function DevVisual() {
  return (
    <div className="h-[118px] bg-[#0f1419] border-b border-white/10 p-3 flex flex-col gap-2 overflow-hidden">
      <div className="flex items-center gap-2 text-[9px] font-mono text-white/45">
        <span>App.tsx</span>
        <span className="w-1 h-1 rounded-full bg-white/20" />
        <span>React 19</span>
        <span className="ml-auto text-white/30">TS</span>
      </div>
      <div className="font-mono text-[11px] leading-[1.5] text-white/85">
        <div>
          <span className="text-white/30">1</span>{" "}
          <span className="text-white/50">function</span> <span className="text-[#e8ff47]">RouteBuilder</span>
          <span className="text-white/40">() {"{"}</span>
        </div>
        <div>
          <span className="text-white/30">2</span>{" "}
          <span className="text-white/40 ml-3">{"return ("}</span>
        </div>
        <div>
          <span className="text-white/30">3</span>{" "}
          <span className="text-white/85 ml-6">{"<Card reusable />"}</span>
        </div>
        <div>
          <span className="text-white/30">4</span>{" "}
          <span className="text-white/40 ml-3">{")"}</span>
        </div>
        <div>
          <span className="text-white/30">5</span>{" "}
          <span className="text-white/40 ml-1">{"}"}</span>{" "}
          <span className="text-white/25">// list-first on 3G</span>
        </div>
      </div>
    </div>
  );
}

function DesignVisual() {
  return (
    <div className="h-[118px] bg-[#f4efe7] border-b border-border p-3 flex flex-col gap-2.5 overflow-hidden">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-mono uppercase tracking-widest text-black/50">Design tokens</span>
        <span className="text-[9px] font-mono px-1.5 py-0.5 bg-[#0a0a0a] text-[#f2ede6]">Figma → code</span>
      </div>
      <div className="flex gap-1.5">
        {[
          { c: "#0a0a0a", l: "ink" },
          { c: "#f2ede6", l: "cream", border: true },
          { c: "#e8ff47", l: "lime" },
          { c: "#ff5a1f", l: "flame" },
          { c: "#141310", l: "char" },
        ].map((s) => (
          <div key={s.l} className="flex-1">
            <div
              className={`h-8 border ${s.border ? "border-black/15" : "border-transparent"}`}
              style={{ background: s.c }}
            />
            <p className="text-[8px] font-mono text-black/50 mt-1 text-center leading-none">{s.l}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <span className="px-2 py-1 text-[10px] font-medium bg-[#0a0a0a] text-white border border-[#0a0a0a]">Primary</span>
        <span className="px-2 py-1 text-[10px] font-medium bg-white text-[#0a0a0a] border border-black/15">Secondary</span>
        <span className="px-2 py-1 text-[10px] font-medium bg-[#e8ff47] text-black border border-black/10">Accent</span>
      </div>
    </div>
  );
}

function AutoVisual() {
  return (
    <div className="h-[118px] bg-[#141310] border-b border-border p-3 flex flex-col gap-2 overflow-hidden">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-mono uppercase tracking-widest text-white/50">Pipeline</span>
        <span className="inline-flex items-center gap-1 text-[9px] font-mono text-[#22c55e]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" /> passing
        </span>
      </div>
      <div className="flex items-center gap-1.5 mt-1">
        {[
          { label: "commit", ok: true },
          { label: "test", ok: true },
          { label: "build", ok: true },
          { label: "deploy", ok: true },
        ].map((step, i) => (
          <div key={step.label} className="flex items-center gap-1.5 flex-1">
            <div className="flex-1 flex flex-col items-center gap-1">
              <div className="w-7 h-7 rounded-full bg-white text-black grid place-items-center">
                {step.ok ? <Check size={12} strokeWidth={2.5} /> : <span className="w-2 h-2 bg-black" />}
              </div>
              <span className="text-[8px] font-mono uppercase tracking-widest text-white/60">{step.label}</span>
            </div>
            {i < 3 && <div className="h-[2px] flex-1 bg-[#22c55e]/50 -mt-4" />}
          </div>
        ))}
      </div>
      <div className="flex gap-1.5 mt-1">
        <span className="text-[9px] font-mono px-2 py-1 bg-[#e8ff47] text-black">Playwright</span>
        <span className="text-[9px] font-mono px-2 py-1 border border-white/20 text-white/70">GA4</span>
        <span className="text-[9px] font-mono px-2 py-1 border border-white/20 text-white/70">Vercel</span>
      </div>
    </div>
  );
}

const ROLES = [
  {
    icon: Code2,
    title: "Software Developer",
    subtitle: "React · TypeScript · Shipping",
    description: "React apps — architecture to deployment.",
    capabilities: ["React 19", "REST APIs", "Vercel"],
    provenBy: ["kenyatrace", "gigi-energy"],
    highlight: "2 live",
    visual: DevVisual,
  },
  {
    icon: Palette,
    title: "UI/UX Developer",
    subtitle: "Research → hi-fi → shipped",
    description: "Research → AA systems that ship.",
    capabilities: ["Figma", "Tokens", "WCAG AA"],
    provenBy: ["kenyatrace", "gigi-energy"],
    highlight: "6 → 3",
    visual: DesignVisual,
  },
  {
    icon: Zap,
    title: "Automation Specialist",
    subtitle: "Test · Measure · Repeat",
    description: "Playwright + GA4 · pipelines.",
    capabilities: ["Playwright", "GA4", "CI/CD"],
    provenBy: ["gigi-energy"],
    highlight: "10+ green",
    visual: AutoVisual,
  },
] as const;

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function RoleCard({
  role,
  index,
}: {
  role: (typeof ROLES)[number];
  index: number;
}) {
  const Icon = role.icon;
  const Visual = role.visual;
  const linkedStudies = caseStudies.filter((s) =>
    (role.provenBy as readonly string[]).includes(s.slug)
  );

  return (
    <Reveal delay={index} className="h-full">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="group h-full border border-white/10 bg-[#1d1c1a] flex flex-col overflow-hidden hover:border-white/20 transition-all duration-300"
      >
        <Visual />

        <div className="p-5 sm:p-6 flex flex-col gap-4 flex-1">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 grid place-items-center shrink-0 bg-[#e8ff47] text-black">
              <Icon size={16} strokeWidth={1.7} />
            </div>
            <div className="min-w-0">
              <h3 className="font-display font-bold text-[#f2ede6] text-[15px] leading-tight">
                {role.title}
              </h3>
              <p className="text-[10px] font-mono uppercase tracking-widest text-white/45 mt-0.5">
                {role.subtitle}
              </p>
            </div>
            <span className="ml-auto hidden sm:inline-flex text-[10px] font-mono uppercase tracking-widest px-2 py-1 bg-white/10 text-white/80 border border-white/10 shrink-0">
              0{index + 1}
            </span>
          </div>

          <p className="text-[13px] text-white/65 leading-relaxed">
            {role.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {role.capabilities.map((cap) => (
              <span
                key={cap}
                className="px-2 py-1 text-[10px] font-mono uppercase tracking-widest border border-white/10 bg-white/[0.04] text-white/70"
              >
                {cap}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest bg-[#e8ff47] text-black font-medium">
              {role.highlight}
            </span>
            <span className="text-[10px] font-mono text-white/30">— measurable</span>
          </div>

          {linkedStudies.length > 0 && (
            <div className="mt-auto pt-4 border-t border-white/10 space-y-2">
              <p className="text-[10px] font-mono uppercase tracking-widest text-white/35">
                Proven in
              </p>
              {linkedStudies.map((study) => (
                <Link
                  key={study.slug}
                  href={`/work/${study.slug}`}
                  className="flex items-center justify-between gap-2 px-3 py-2.5 bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] hover:border-white/20 transition-colors group/link"
                >
                  <span className="flex items-center gap-2 min-w-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] shrink-0" />
                    <span className="font-medium text-[#f2ede6] truncate text-xs">
                      {study.name}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={13}
                    className="text-white/40 group-hover/link:text-white transition-colors shrink-0"
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </Reveal>
  );
}

export default function RolesShowcase() {
  return (
    <section
      id="roles"
      className="section-pad bg-[#141310] border-t border-white/10 relative overflow-hidden"
    >
      <div className="grid-overlay opacity-30" aria-hidden />

      <div className="relative z-10 container">
        <div className="max-w-6xl mx-auto">
          <Reveal as="div" className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="section-label" style={{ color: "rgba(242,237,230,0.5)" }}>
                <span className="section-label-line" />
                What I do
              </span>
              <h2
                className="heading-section mb-3 max-w-xl"
                style={{ color: "#f2ede6", letterSpacing: "-0.03em" }}
              >
                Three roles,<br />
                <span className="text-[#e8ff47]">one standard.</span>
              </h2>
              <p
                className="text-sm max-w-lg leading-relaxed"
                style={{ color: "rgba(242,237,230,0.6)" }}
              >
                Proof, not claims — see the work.
              </p>
            </div>
            <div className="hidden lg:flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-white/40 border border-white/10 px-4 py-3">
              <span className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse" />
              Available · Nairobi · Remote
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {ROLES.map((role, i) => (
              <RoleCard key={role.title} role={role} index={i} />
            ))}
          </div>

          <Reveal
            delay={3}
            as="div"
            className="mt-10 pt-6 border-t flex flex-wrap items-center gap-x-8 gap-y-3"
            style={{ borderColor: "rgba(242,237,230,0.08)" }}
          >
            {[
              { value: "2", label: "live products" },
              { value: "10+", label: "e2e passing" },
              { value: "AA", label: "contrast" },
              { value: "< 5wk", label: "ship cycle" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-2">
                <span
                  className="font-display font-black text-xl"
                  style={{ color: "#e8ff47" }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-[10px] font-mono uppercase tracking-widest"
                  style={{ color: "rgba(242,237,230,0.5)" }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
            <span className="ml-auto text-[11px] font-mono text-white/30 hidden sm:inline">
              Stack: React 19 · TypeScript · Tailwind v4 · Convex · Playwright · Vercel
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
