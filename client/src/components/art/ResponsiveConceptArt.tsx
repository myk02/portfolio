import { FitCanvas } from "@/components/art/FitCanvas";
import {
  ArrowUpRight,
  CircleDot,
  Hexagon,
  LayoutGrid,
  Mail,
  Menu,
  Settings2,
  Sparkles,
} from "lucide-react";

const ink = "#141310";
const panel = "#1b1917";
const fg = "#f2ede6";
const muted = "#9b9890";
const lime = "#e8ff47";
const cream = "#f4efe7";
const green = "#3ddc84";
const red = "#ff6b6b";

type ConceptVariant = "mobile" | "tablet" | "desktop";

const DESIGN: Record<ConceptVariant, { w: number; h: number }> = {
  mobile: { w: 320, h: 604 },
  tablet: { w: 320, h: 427 },
  desktop: { w: 640, h: 400 },
};

function StatusBar({ color }: { color: string }) {
  return (
    <div
      className="flex items-center justify-between px-4 pt-2 pb-0.5 shrink-0"
      style={{ color }}
    >
      <span className="font-semibold" style={{ fontSize: 13 }}>
        9:41
      </span>
      <div className="flex items-center gap-1.5">
        <svg width="13" height="9" viewBox="0 0 8 6" fill={color}>
          <rect x="0" y="3" width="1.6" height="3" />
          <rect x="2.2" y="1.8" width="1.6" height="4.2" />
          <rect x="4.4" y="0.6" width="1.6" height="5.4" />
          <rect x="6.6" y="0" width="1.4" height="6" fill={muted} />
        </svg>
        <svg
          width="13"
          height="9"
          viewBox="0 0 9 6"
          fill="none"
          stroke={color}
          strokeWidth="1"
        >
          <rect x="0.5" y="0.5" width="8" height="5" rx="1" />
          <path d="M6.5 2v2M7.4 2.4v1.2" stroke={color} strokeWidth="0.8" />
        </svg>
      </div>
    </div>
  );
}

/* ---------------- DASHBOARD (dark ops console) ---------------- */

const DASH_KPIS: [string, string, string, boolean][] = [
  ["Revenue", "KSh 2.4M", "+12.4% vs prev", true],
  ["Active users", "18,204", "+8.1% vs prev", true],
  ["Escalations", "36", "−14.2% vs prev", true],
  ["Conversion", "3.2%", "−0.4% vs prev", false],
];

const DASH_TABLE: [string, string, string, string][] = [
  ["#4821", "M-Pesa → savings · failed retry", "A. Njeri", "Escalated"],
  ["#4820", "Card chargeback · duplicate", "M. Otieno", "Open"],
  ["#4819", "Goal deposit · amount mismatch", "J. Wambui", "Open"],
  ["#4818", "PIN reset · fraud check", "A. Njeri", "Resolved"],
];

function DashKpi({
  label,
  value,
  delta,
  up,
  s,
}: {
  label: string;
  value: string;
  delta: string;
  up: boolean;
  s: { label: number; value: number; delta: number; pad: string };
}) {
  return (
    <div
      className={`rounded-lg border border-white/10 ${s.pad}`}
      style={{ background: panel }}
    >
      <p
        className="uppercase tracking-wide"
        style={{ fontSize: s.label, color: muted }}
      >
        {label}
      </p>
      <p
        className="font-bold tracking-tight mt-1"
        style={{ fontSize: s.value, color: fg }}
      >
        {value}
      </p>
      <p
        className="font-semibold mt-0.5"
        style={{ fontSize: s.delta, color: up ? green : red }}
      >
        {delta}
      </p>
    </div>
  );
}

function DashChart({ s }: { s: { head: number; sub: number; mt: string } }) {
  return (
    <div
      className={`rounded-lg border border-white/10 p-2.5 ${s.mt}`}
      style={{ background: panel }}
    >
      <div className="flex items-center justify-between">
        <p className="font-bold" style={{ fontSize: s.head, color: fg }}>
          Exceptions · last 30 days
        </p>
        <div className="flex items-center gap-1.5">
          <span
            className="w-1.5 h-1.5 rounded-pill"
            style={{ background: lime }}
          />
          <span style={{ fontSize: s.sub, color: muted }}>Escalated</span>
        </div>
      </div>
      <svg
        viewBox="0 0 300 64"
        className="w-full h-auto mt-1.5"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="dashAreaG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={lime} stopOpacity="0.35" />
            <stop offset="100%" stopColor={lime} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[12, 24, 36, 48].map(y => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="300"
            y2={y}
            stroke="rgba(242,237,230,0.07)"
            strokeWidth="1"
          />
        ))}
        <path
          d="M0 44 L30 40 L60 42 L90 34 L120 36 L150 26 L180 30 L210 20 L240 24 L270 14 L300 18 L300 64 L0 64 Z"
          fill="url(#dashAreaG)"
        />
        <path
          d="M0 44 L30 40 L60 42 L90 34 L120 36 L150 26 L180 30 L210 20 L240 24 L270 14 L300 18"
          fill="none"
          stroke={lime}
          strokeWidth="1.6"
        />
        <circle cx="270" cy="14" r="2.4" fill={lime} />
        <circle cx="270" cy="14" r="5" fill={lime} fillOpacity="0.25" />
      </svg>
    </div>
  );
}

function DashTable({
  rows,
  s,
}: {
  rows: [string, string, string, string][];
  s: { head: number; cell: number; row: string };
}) {
  return (
    <div
      className="rounded-lg border border-white/10 overflow-hidden"
      style={{ background: panel }}
    >
      <div
        className="grid grid-cols-[1fr_2fr_1fr_0.8fr] px-2.5 py-1.5 border-b border-white/10 uppercase tracking-wide font-bold"
        style={{ fontSize: s.head, color: muted }}
      >
        <span>Case</span>
        <span>Route</span>
        <span>Owner</span>
        <span>Status</span>
      </div>
      {rows.map(([id, route, owner, status]) => (
        <div
          key={id}
          className={`grid grid-cols-[1fr_2fr_1fr_0.8fr] px-2.5 border-b border-white/5 items-center ${s.row}`}
          style={{ fontSize: s.cell }}
        >
          <span className="font-mono font-bold" style={{ color: fg }}>
            {id}
          </span>
          <span className="truncate pr-1" style={{ color: muted }}>
            {route}
          </span>
          <span style={{ color: muted }}>{owner}</span>
          <span
            className="justify-self-start px-1.5 py-0.5 rounded-pill font-bold uppercase"
            style={{
              fontSize: s.cell - 1,
              background:
                status === "Escalated"
                  ? lime
                  : status === "Open"
                    ? "rgba(255,107,107,0.15)"
                    : "rgba(61,220,132,0.15)",
              color:
                status === "Escalated" ? ink : status === "Open" ? red : green,
            }}
          >
            {status}
          </span>
        </div>
      ))}
    </div>
  );
}

function DashMobile() {
  const k = { label: 8, value: 16, delta: 8, pad: "p-2.5" };
  return (
    <div
      className="h-full flex flex-col overflow-hidden"
      style={{ background: ink }}
    >
      <StatusBar color={fg} />
      <div className="px-4 mt-2 flex items-center justify-between shrink-0">
        <div>
          <p className="font-bold" style={{ fontSize: 15, color: fg }}>
            Operations overview
          </p>
          <p style={{ fontSize: 9, color: muted }}>
            Exceptions surfaced · Updated 2 min ago
          </p>
        </div>
        <span
          className="rounded-pill grid place-items-center font-bold shrink-0 border border-white/10"
          style={{
            width: 30,
            height: 30,
            background: panel,
            color: fg,
            fontSize: 13,
          }}
        >
          M
        </span>
      </div>
      <div className="px-4 mt-2 grid grid-cols-2 gap-2 shrink-0">
        {DASH_KPIS.map(([l, v, d, up]) => (
          <DashKpi key={l} label={l} value={v} delta={d} up={up} s={k} />
        ))}
      </div>
      <DashChart s={{ head: 10, sub: 7, mt: "mx-4 mt-2 shrink-0" }} />
      <DashTable
        rows={DASH_TABLE.slice(0, 3)}
        s={{ head: 7, cell: 7, row: "py-[7px]" }}
      />
      <div className="mx-4 mt-2" />
      <nav className="mt-auto shrink-0 border-t border-white/10">
        <div className="grid grid-cols-4">
          {(
            [
              ["Overview", true],
              ["Reports", false],
              ["Teams", false],
              ["More", false],
            ] as [string, boolean][]
          ).map(([label, on]) => (
            <div
              key={label}
              className="flex flex-col items-center py-2"
              style={{ opacity: on ? 1 : 0.45 }}
            >
              <span
                className="w-1.5 h-1.5 rounded-pill"
                style={{ background: on ? lime : "currentColor", color: fg }}
              />
              <span
                className="mt-1 font-semibold"
                style={{ fontSize: 9, color: fg }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
}

function DashTablet() {
  const k = { label: 7.5, value: 13, delta: 7.5, pad: "p-2" };
  return (
    <div
      className="h-full flex flex-col overflow-hidden"
      style={{ background: ink }}
    >
      <StatusBar color={fg} />
      <div className="px-4 mt-1.5 flex items-center justify-between shrink-0">
        <p className="font-bold" style={{ fontSize: 14, color: fg }}>
          Operations overview
        </p>
        <span
          className="rounded-pill grid place-items-center font-bold border border-white/10"
          style={{
            width: 26,
            height: 26,
            background: panel,
            color: fg,
            fontSize: 11,
          }}
        >
          M
        </span>
      </div>
      <div className="px-4 mt-2 grid grid-cols-2 gap-2 shrink-0">
        {DASH_KPIS.map(([l, v, d, up]) => (
          <DashKpi key={l} label={l} value={v} delta={d} up={up} s={k} />
        ))}
      </div>
      <DashChart s={{ head: 9, sub: 6.5, mt: "mx-4 mt-2 shrink-0" }} />
      <DashTable
        rows={DASH_TABLE.slice(0, 2)}
        s={{ head: 6.5, cell: 6.5, row: "py-[5px]" }}
      />
    </div>
  );
}

function DashSidebar({ active }: { active: string }) {
  const nav = [
    "Overview",
    "Reports",
    "Teams",
    "Automations",
    "Billing",
    "Settings",
  ];
  return (
    <div className="w-[132px] shrink-0 border-r border-white/10 flex flex-col px-2.5 py-3">
      <div className="flex items-center gap-1.5">
        <div
          className="w-4 h-4 rounded-[4px] grid place-items-center font-black"
          style={{ background: lime, color: ink, fontSize: 8 }}
        >
          O
        </div>
        <span className="font-bold" style={{ fontSize: 12, color: fg }}>
          OSS
        </span>
      </div>
      <div className="mt-3 space-y-0.5">
        {nav.map(n => {
          const on = n === active;
          return (
            <div
              key={n}
              className="flex items-center gap-1.5 px-1.5 py-[6px] rounded-[4px]"
              style={{
                background: on ? lime : "transparent",
                color: on ? ink : muted,
              }}
            >
              <span
                className="w-1 h-1 rounded-pill shrink-0"
                style={{
                  background: on ? ink : "currentColor",
                  opacity: on ? 1 : 0.5,
                }}
              />
              <span className="font-semibold" style={{ fontSize: 10.5 }}>
                {n}
              </span>
            </div>
          );
        })}
      </div>
      <div
        className="mt-auto rounded-md border border-white/10 p-2"
        style={{ background: panel }}
      >
        <p style={{ fontSize: 8, color: muted }}>Systems</p>
        <p className="font-bold flex items-center gap-1.5" style={{ fontSize: 10, color: fg }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: green }} />
          Normal
        </p>
      </div>
    </div>
  );
}

function DashDesktop() {
  const k = { label: 8, value: 15, delta: 8, pad: "p-2.5" };
  return (
    <div className="h-full flex overflow-hidden" style={{ background: ink }}>
      <DashSidebar active="Overview" />
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="px-5 pt-3 flex items-center justify-between shrink-0">
          <div>
            <p className="font-bold" style={{ fontSize: 14, color: fg }}>
              Operations overview
            </p>
            <p style={{ fontSize: 9, color: muted }}>Updated 2 min ago</p>
          </div>
          <div className="flex items-center gap-1.5">
            {["7D", "30D", "QTR"].map((p, i) => (
              <span
                key={p}
                className="px-2 py-0.5 rounded-pill font-bold"
                style={{
                  fontSize: 8,
                  background: i === 1 ? lime : "rgba(242,237,230,0.08)",
                  color: i === 1 ? ink : muted,
                }}
              >
                {p}
              </span>
            ))}
            <span
              className="rounded-pill grid place-items-center font-bold border border-white/10"
              style={{
                width: 26,
                height: 26,
                background: panel,
                color: fg,
                fontSize: 11,
              }}
            >
              M
            </span>
          </div>
        </div>
        <div className="px-5 mt-2.5 grid grid-cols-4 gap-2 shrink-0">
          {DASH_KPIS.map(([l, v, d, up]) => (
            <DashKpi key={l} label={l} value={v} delta={d} up={up} s={k} />
          ))}
        </div>
        <DashChart s={{ head: 9.5, sub: 7, mt: "mx-5 mt-2.5 shrink-0" }} />
        <DashTable
          rows={DASH_TABLE.slice(0, 2)}
          s={{ head: 7.5, cell: 8, row: "py-[6px]" }}
        />
      </div>
    </div>
  );
}

export function DashboardScreen({ variant }: { variant: ConceptVariant }) {
  const design = DESIGN[variant];
  return (
    <div
      className="h-full w-full overflow-hidden"
      role="img"
      aria-label={`Dashboard UI system — ${variant} view`}
    >
      <FitCanvas designW={design.w} designH={design.h}>
        {variant === "mobile" ? (
          <DashMobile />
        ) : variant === "tablet" ? (
          <DashTablet />
        ) : (
          <DashDesktop />
        )}
      </FitCanvas>
    </div>
  );
}

/* ---------------- DESIGN SYSTEM (cream style guide) ---------------- */

const TYPE_SCALE: [string, number][] = [
  ["Display", 40],
  ["H1", 24],
  ["H2", 17],
  ["Body", 12],
  ["Caption", 9],
];

const COLOR_TOKENS: [string, string, string][] = [
  ["Ink", ink, cream],
  ["Cream", cream, ink],
  ["Lime", lime, ink],
  ["Muted", muted, cream],
];

function TypeScale({ s }: { s: { title: number; row: number; size: number } }) {
  return (
    <div>
      <p
        className="font-bold uppercase tracking-wide"
        style={{ fontSize: s.title, color: ink }}
      >
        Type scale
      </p>
      <div className="mt-1">
        {TYPE_SCALE.map(([name, size]) => (
          <div
            key={name}
            className="flex items-center justify-between border-b py-1.5"
            style={{ borderColor: "rgba(20,19,16,0.12)" }}
          >
            <span
              className="uppercase tracking-wide"
              style={{ fontSize: s.row, color: muted }}
            >
              {name} · {size}
            </span>
            <span
              className="font-black leading-none"
              style={{ fontSize: size, color: ink }}
            >
              Ag
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ColorTokens({
  s,
}: {
  s: { title: number; label: number; hex: number };
}) {
  return (
    <div>
      <p
        className="font-bold uppercase tracking-wide"
        style={{ fontSize: s.title, color: ink }}
      >
        Color tokens
      </p>
      <div className="grid grid-cols-2 gap-1.5 mt-1.5">
        {COLOR_TOKENS.map(([label, bg, textColor]) => (
          <div key={label} className="flex flex-col items-center">
            <div
              className="w-full h-7 rounded-md border border-black/10"
              style={{ background: bg }}
            />
            <p
              className="font-semibold mt-0.5"
              style={{
                fontSize: s.label,
                color: textColor === cream ? ink : muted,
              }}
            >
              {label}
            </p>
            <p className="font-mono" style={{ fontSize: s.hex, color: muted }}>
              {bg}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ButtonsForms({ s }: { s: { title: number; row: number } }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div>
        <p
          className="font-bold uppercase tracking-wide mb-1.5"
          style={{ fontSize: s.title, color: ink }}
        >
          Buttons
        </p>
        <div className="space-y-1">
          <div
            className="rounded-md bg-[#141310] text-[#f4efe7] font-bold text-center py-[7px]"
            style={{ fontSize: s.row }}
          >
            Primary
          </div>
          <div
            className="rounded-md border border-[#141310] text-[#141310] font-bold text-center py-[7px]"
            style={{ fontSize: s.row }}
          >
            Secondary
          </div>
          <div
            className="rounded-md text-[#141310] font-bold text-center py-[7px]"
            style={{ fontSize: s.row, boxShadow: "inset 0 0 0 2px #e8ff47" }}
          >
            Focus ring
          </div>
        </div>
      </div>
      <div>
        <p
          className="font-bold uppercase tracking-wide mb-1.5"
          style={{ fontSize: s.title, color: ink }}
        >
          Form states
        </p>
        <div className="space-y-1">
          <div
            className="rounded-md border border-[#141310]/25 px-2 py-[7px]"
            style={{ fontSize: s.row, color: muted }}
          >
            Placeholder text
          </div>
          <div
            className="rounded-md border border-[#141310] px-2 py-[7px] font-semibold"
            style={{ fontSize: s.row, color: ink }}
          >
            Active field
          </div>
          <div
            className="rounded-md border border-[#c81e1e] px-2 py-[7px] font-semibold"
            style={{ fontSize: s.row, color: "#c81e1e" }}
          >
            Error — required
          </div>
        </div>
      </div>
    </div>
  );
}

function IconsSpacing({ s }: { s: { icon: number; label: number } }) {
  const icons = [
    LayoutGrid,
    Sparkles,
    Hexagon,
    ArrowUpRight,
    Settings2,
    Mail,
    Menu,
    CircleDot,
  ];
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        {icons.map((Icon, i) => (
          <span
            key={i}
            className="w-5 h-5 rounded-[4px] border border-black/10 grid place-items-center"
            style={{
              background: "rgba(20,19,16,0.05)",
              color: ink,
            }}
          >
            <Icon size={s.icon + 1} strokeWidth={2} />
          </span>
        ))}
      </div>
      <div className="flex items-center gap-1.5">
        <span style={{ fontSize: s.label, color: muted }}>Toggle</span>
        <div className="w-8 h-4 rounded-pill bg-[#141310] flex items-center justify-end px-[3px]">
          <div className="w-3 h-3 rounded-pill bg-[#e8ff47]" />
        </div>
      </div>
    </div>
  );
}

function DSHeader({ s }: { s: number }) {
  return (
    <div
      className="flex items-center justify-between px-3 py-2 border-b shrink-0"
      style={{ borderColor: "rgba(20,19,16,0.12)" }}
    >
      <div className="flex items-center gap-2">
        <div
          className="w-4 h-4 rounded-[4px] grid place-items-center font-black"
          style={{ background: lime, color: ink, fontSize: 8 }}
        >
          O
        </div>
        <span
          className="font-bold uppercase tracking-widest"
          style={{ fontSize: s, color: ink }}
        >
          OS Style Guide
        </span>
      </div>
      <span
        className="font-mono uppercase tracking-wider"
        style={{ fontSize: 7, color: muted }}
      >
        v1.0 · tokens-first
      </span>
    </div>
  );
}

function DsMobile() {
  const ts = { title: 10, row: 7.5, size: 12 };
  const ct = { title: 10, label: 7, hex: 6.5 };
  const bf = { title: 10, row: 9 };
  const is = { icon: 8, label: 8 };
  return (
    <div
      className="h-full flex flex-col overflow-hidden"
      style={{ background: cream }}
    >
      <StatusBar color={ink} />
      <DSHeader s={10} />
      <div className="p-3 flex-1 min-h-0 overflow-hidden space-y-3">
        <TypeScale s={ts} />
        <ColorTokens s={ct} />
        <ButtonsForms s={bf} />
        <IconsSpacing s={is} />
        <div
          className="border-t pt-2"
          style={{ borderColor: "rgba(20,19,16,0.12)" }}
        >
          <div className="flex items-center justify-between">
            <p
              className="font-bold uppercase tracking-wide"
              style={{ fontSize: 10, color: ink }}
            >
              Spacing · 4px base
            </p>
            <div className="flex items-end gap-1">
              {[4, 8, 12, 16, 24, 32].map(sp => (
                <div
                  key={sp}
                  className="rounded-[1px]"
                  style={{
                    width: 3,
                    height: Math.min(sp, 28),
                    background: ink,
                    opacity: 0.25 + sp / 64,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DsTablet() {
  const ts = { title: 9, row: 7, size: 10 };
  const ct = { title: 9, label: 6.5, hex: 6 };
  const bf = { title: 9, row: 8 };
  const is = { icon: 7, label: 7 };
  return (
    <div
      className="h-full flex flex-col overflow-hidden"
      style={{ background: cream }}
    >
      <StatusBar color={ink} />
      <DSHeader s={9} />
      <div className="p-3 flex-1 min-h-0 overflow-hidden space-y-2.5">
        <div className="grid grid-cols-2 gap-3 items-start">
          <TypeScale s={ts} />
          <ColorTokens s={ct} />
        </div>
        <ButtonsForms s={bf} />
        <IconsSpacing s={is} />
      </div>
    </div>
  );
}

function DsDesktop() {
  const ts = { title: 10, row: 7.5, size: 14 };
  const ct = { title: 10, label: 7, hex: 6.5 };
  const bf = { title: 10, row: 9 };
  const is = { icon: 8, label: 8 };
  return (
    <div
      className="h-full flex flex-col overflow-hidden"
      style={{ background: cream }}
    >
      <DSHeader s={10} />
      <div className="p-4 flex-1 min-h-0 overflow-hidden">
        <div className="grid grid-cols-[1.2fr_1fr] gap-6">
          <div className="space-y-4">
            <TypeScale s={ts} />
            <div
              className="border-t pt-3"
              style={{ borderColor: "rgba(20,19,16,0.12)" }}
            >
              <div className="flex items-center justify-between">
                <p
                  className="font-bold uppercase tracking-wide"
                  style={{ fontSize: 10, color: ink }}
                >
                  Spacing · 4px base
                </p>
                <div className="flex items-end gap-1">
                  {[4, 8, 12, 16, 24, 32, 40].map(sp => (
                    <div
                      key={sp}
                      className="rounded-[1px]"
                      style={{
                        width: 4,
                        height: Math.min(sp, 40),
                        background: ink,
                        opacity: 0.25 + sp / 80,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <ColorTokens s={ct} />
            <ButtonsForms s={bf} />
            <IconsSpacing s={is} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function DesignSystemScreen({ variant }: { variant: ConceptVariant }) {
  const design = DESIGN[variant];
  return (
    <div
      className="h-full w-full overflow-hidden"
      role="img"
      aria-label={`Design system style guide — ${variant} view`}
    >
      <FitCanvas designW={design.w} designH={design.h}>
        {variant === "mobile" ? (
          <DsMobile />
        ) : variant === "tablet" ? (
          <DsTablet />
        ) : (
          <DsDesktop />
        )}
      </FitCanvas>
    </div>
  );
}
