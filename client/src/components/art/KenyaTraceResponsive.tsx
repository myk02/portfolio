import { FitCanvas } from "@/components/art/FitCanvas";
import {
  DeviceShowcaseFigure,
  DeviceShowcaseCell,
} from "@/components/artifacts/DeviceShowcaseFigure";

/* ------------------------------------------------------------------ */
/* KenyaTrace — tourism explorer. Calm editorial UI, list-first, big   */
/* photography, one terracotta accent. Authored at fixed design sizes  */
/* and scaled to fill whatever device frame renders it.                */
/* ------------------------------------------------------------------ */

const ink = "#1c1a17";
const cream = "#faf6ee";
const card = "#ffffff";
const muted = "#8a867e";
const terra = "#e05a2a";
const terraSoft = "#f4d8c4";
const sand = "#e9ddc8";
const line = "rgba(28,26,23,0.14)";

export type KenyaVariant = "mobile" | "tablet" | "desktop";
export type KenyaScreenName = "home" | "discover" | "plan" | "trips";

const DESIGN: Record<KenyaVariant, { w: number; h: number }> = {
  mobile: { w: 320, h: 604 },
  tablet: { w: 320, h: 427 },
  desktop: { w: 640, h: 400 },
};

interface DSet {
  pad: string;
  gap: string;
  status: number;
  logo: number;
  title: number;
  sub: number;
  label: number;
  small: number;
  base: number;
  card: number;
  chip: string;
  navTxt: number;
  rowIco: number;
}

const D: Record<KenyaVariant, DSet> = {
  mobile: {
    pad: "px-4",
    gap: "gap-2.5",
    status: 13,
    logo: 15,
    title: 22,
    sub: 11,
    label: 10,
    small: 10,
    base: 12,
    card: 13,
    chip: "text-[11px] px-2.5 py-[6px]",
    navTxt: 8.5,
    rowIco: 30,
  },
  tablet: {
    pad: "px-4",
    gap: "gap-2",
    status: 13,
    logo: 14,
    title: 18,
    sub: 10.5,
    label: 9.5,
    small: 9,
    base: 11,
    card: 11.5,
    chip: "text-[10px] px-2 py-[5px]",
    navTxt: 8,
    rowIco: 26,
  },
  desktop: {
    pad: "px-5",
    gap: "gap-2.5",
    status: 13,
    logo: 16,
    title: 24,
    sub: 11,
    label: 10,
    small: 10,
    base: 11.5,
    card: 12.5,
    chip: "text-[11px] px-3 py-[7px]",
    navTxt: 10,
    rowIco: 34,
  },
};

/* ---------------- photo scenes (SVG editorial imagery) ---------------- */

type SceneKind = "savanna" | "coast" | "mountain" | "lake" | "forest" | "city";

const SCENES: Record<SceneKind, { sky: [string, string]; tag: string }> = {
  savanna: { sky: ["#f2b367", "#efd9ad"], tag: "Safari" },
  coast: { sky: ["#9fd3e8", "#e6f4f4"], tag: "Coast" },
  mountain: { sky: ["#cfe0ee", "#f4efe4"], tag: "Mountains" },
  lake: { sky: ["#f3c9d6", "#e9f0ec"], tag: "Lake" },
  forest: { sky: ["#d3e5cd", "#eef3e2"], tag: "Forest" },
  city: { sky: ["#e6dfd3", "#f7f2e9"], tag: "City" },
};

function Scene({ kind }: { kind: SceneKind }) {
  const [a, b] = SCENES[kind].sky;
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id={`sky-${kind}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={a} />
          <stop offset="100%" stopColor={b} />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#sky-${kind})`} />

      {kind === "savanna" && (
        <>
          <circle cx="300" cy="70" r="26" fill="#ffe9c2" opacity="0.95" />
          <path d="M0 210 Q100 170 200 205 T400 195 L400 300 L0 300 Z" fill="#dfa25c" opacity="0.9" />
          <path d="M0 240 Q120 210 230 235 T400 228 L400 300 L0 300 Z" fill="#c8873f" />
          <path d="M0 268 Q140 248 260 265 T400 262 L400 300 L0 300 Z" fill="#a96f2f" />
          {/* acacia */}
          <path d="M92 300 v-95" stroke="#3f2b1d" strokeWidth="5" fill="none" />
          <path d="M70 205 h92 M74 205 v6 M88 205 v10 M102 205 v7 M116 205 v12 M128 205 v6 M142 205 v9" stroke="#3f2b1d" strokeWidth="3" fill="none" />
          <path d="M62 200 Q92 186 122 200 Q96 194 62 200 Z" fill="#4c3826" />
          <path d="M88 199 Q98 188 120 194 Q100 190 88 199 Z" fill="#5c4630" />
          {/* birds */}
          <path d="M250 90 q6 -6 12 0 M268 82 q5 -5 10 0" stroke="#6b4a26" strokeWidth="2" fill="none" />
        </>
      )}

      {kind === "coast" && (
        <>
          <circle cx="330" cy="62" r="22" fill="#fdf3dc" opacity="0.9" />
          <path d="M0 190 Q100 172 200 186 T400 178 L400 300 L0 300 Z" fill="#cde9e2" />
          <path d="M0 210 Q110 194 210 206 T400 200 L400 300 L0 300 Z" fill="#a7d8cd" />
          <path d="M0 260 Q120 244 250 256 T400 250 L400 300 L0 300 Z" fill="#78bdb0" />
          <path d="M0 282 L400 282 L400 300 L0 300 Z" fill="#4fa393" />
          <path d="M210 268 l-34 14 h34 v-14 Z M176 300 h34" fill="#8a5a33" opacity="0.85" />
          <path d="M96 300 q-4 -42 22 -52 q-10 40 6 52 Z" fill="#2f6f64" />
          <path d="M62 264 q4 -10 12 -4 M56 272 q4 -8 12 -4" stroke="#8a5a33" strokeWidth="2" fill="none" />
        </>
      )}

      {kind === "mountain" && (
        <>
          <path d="M0 220 L80 110 L160 190 L240 100 L320 180 L400 130 L400 300 L0 300 Z" fill="#c7d6e0" opacity="0.85" />
          <path d="M120 220 L200 120 L280 200 L360 150 L400 190 L400 300 L0 300 L0 260 Q60 230 120 220 Z" fill="#9db4c4" />
          <path d="M0 250 Q120 230 240 252 T400 244 L400 300 L0 300 Z" fill="#6d889b" />
          <path d="M76 116 l10 -14 12 13 q-10 4 -22 1 Z" fill="#f4f6f7" />
          <path d="M236 106 l12 -15 14 14 q-12 4 -26 1 Z" fill="#f4f6f7" />
          <circle cx="310" cy="60" r="20" fill="#fdf5df" opacity="0.9" />
        </>
      )}

      {kind === "lake" && (
        <>
          <circle cx="96" cy="72" r="24" fill="#fbe8ee" opacity="0.9" />
          <path d="M0 190 Q100 178 200 186 T400 180 L400 300 L0 300 Z" fill="#e7c9d2" />
          <path d="M0 220 Q110 208 210 216 T400 212 L400 300 L0 300 Z" fill="#d3a5b3" />
          <path d="M0 258 L400 258 L400 300 L0 300 Z" fill="#b98a9c" />
          <g stroke="#e9a9b6" strokeWidth="2.5" fill="none" strokeLinecap="round">
            <path d="M120 236 q5 -7 10 0 M138 232 q5 -6 9 0" />
            <path d="M232 224 q5 -7 10 0 M250 220 q5 -6 9 0 M268 226 q5 -7 10 0" />
            <path d="M300 238 q5 -7 10 0" />
          </g>
          <path d="M0 268 Q100 256 200 264 T400 260 L400 300 L0 300 Z" fill="#9c6f83" />
        </>
      )}

      {kind === "forest" && (
        <>
          <path d="M0 220 Q120 190 240 214 T400 200 L400 300 L0 300 Z" fill="#a9c99f" />
          <path d="M0 250 Q140 224 280 244 T400 240 L400 300 L0 300 Z" fill="#7fa976" />
          <path d="M0 280 L400 280 L400 300 L0 300 Z" fill="#55854d" />
          {[40, 90, 150, 205, 265, 325].map((x, i) => (
            <g key={x}>
              <path d={`M${x} 300 v-70`} stroke="#4c3b26" strokeWidth="5" fill="none" />
              <path
                d={`M${x - 30} 245 Q${x} 150 ${x + 30} 245 Q${x} 228 ${x - 30} 245 Z`}
                fill={i % 2 ? "#3c6b37" : "#2f562b"}
              />
            </g>
          ))}
          <path d="M292 100 q8 -10 16 0 q-8 2 -16 0 Z" fill="#5f4a2e" />
        </>
      )}

      {kind === "city" && (
        <>
          {[30, 62, 98, 140, 185, 230, 275, 320].map((x, i) => {
            const h = 120 + (i % 4) * 34;
            const w = i % 3 === 0 ? 34 : 26;
            return (
              <g key={x}>
                <rect x={x} y={300 - h} width={w} height={h} fill="#8f887c" />
                <rect x={x + 3} y={300 - h} width={w - 6} height={h} fill="#a89f90" />
                <path d={`M${x + w / 2} ${300 - h - 12} l12 12 h-24 Z`} fill="#7a7367" />
              </g>
            );
          })}
          <path d="M0 300 Q100 288 200 296 T400 290 L400 300 L0 300 Z" fill="#6f685c" />
          <g fill="#f7e9c8" opacity="0.9">
            <rect x="36" y="150" width="3" height="3" />
            <rect x="46" y="166" width="3" height="3" />
            <rect x="68" y="140" width="3" height="3" />
            <rect x="108" y="120" width="3" height="3" />
            <rect x="118" y="138" width="3" height="3" />
            <rect x="150" y="158" width="3" height="3" />
            <rect x="194" y="130" width="3" height="3" />
            <rect x="206" y="150" width="3" height="3" />
            <rect x="240" y="110" width="3" height="3" />
            <rect x="254" y="132" width="3" height="3" />
            <rect x="282" y="120" width="3" height="3" />
            <rect x="292" y="144" width="3" height="3" />
            <rect x="328" y="136" width="3" height="3" />
            <rect x="338" y="158" width="3" height="3" />
          </g>
        </>
      )}
    </svg>
  );
}

function Photo({
  kind,
  className,
  overlay,
  overlayLabel,
  labelBg,
}: {
  kind: SceneKind;
  className?: string;
  overlay?: string;
  overlayLabel?: string;
  labelBg?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden ${className ?? ""}`}
      role="img"
      aria-label={`${SCENES[kind].tag} photograph`}
    >
      <Scene kind={kind} />
      {overlay && (
        <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/55 via-black/20 to-transparent">
          <p className="text-white font-bold leading-tight" style={{ fontSize: 13 }}>
            {overlay}
          </p>
          {overlayLabel && (
            <p
              className="text-white/85 font-semibold"
              style={{ fontSize: 9 }}
            >
              {overlayLabel}
            </p>
          )}
        </div>
      )}
      {labelBg && !overlay && (
        <span
          className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 font-mono uppercase tracking-wider"
          style={{ fontSize: 7, background: labelBg, color: ink }}
        >
          {SCENES[kind].tag}
        </span>
      )}
    </div>
  );
}

/* ---------------- chrome ---------------- */

function Bar({ color = ink }: { color?: string }) {
  return (
    <div
      className="flex items-center justify-between px-4 pt-1.5 pb-0.5 shrink-0"
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

function Logo({ d, mark }: { d: DSet; mark?: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <svg width={d.logo * 0.85} height={d.logo * 0.85} viewBox="0 0 24 24" aria-hidden>
        <path d="M12 2 L20 12 L14 12 L20 22 L4 10 L10 10 Z" fill={terra} />
      </svg>
      {mark !== false && (
        <span className="font-display font-bold tracking-tight" style={{ fontSize: d.logo, color: ink }}>
          Kenya<span style={{ color: terra }}>Trace</span>
        </span>
      )}
    </div>
  );
}

const NAV = [
  { key: "explore", label: "Explore", ico: "◈" },
  { key: "plan", label: "Plan", ico: "✎" },
  { key: "trips", label: "Trips", ico: "≣" },
  { key: "profile", label: "Profile", ico: "◉" },
];

function BottomNav({ d, active }: { d: DSet; active: string }) {
  return (
    <div
      className="mt-auto shrink-0 border-t bg-white"
      style={{ borderColor: line }}
    >
      <div className="grid grid-cols-4">
        {NAV.map(n => (
          <div
            key={n.key}
            className={`flex flex-col items-center py-2 ${active === n.key ? "" : "opacity-40"}`}
          >
            <span className="leading-none" style={{ fontSize: 14, color: ink }}>
              {n.ico}
            </span>
            <span className="mt-0.5 font-semibold" style={{ fontSize: d.navTxt, color: ink }}>
              {n.label}
            </span>
            {active === n.key && (
              <span className="mt-1 w-3 h-[2px] rounded-pill" style={{ background: terra }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const COUNTIES = ["Maasai Mara", "Coast", "Nakuru", "Amboseli"];

const TRIPS: [string, SceneKind, string, string][] = [
  ["Mara to the Coast", "savanna", "4 stops · 3 days", "KSh 42k"],
  ["Rift Valley Loop", "mountain", "5 stops · 4 days", "KSh 38k"],
  ["Lakes & Flamingos", "lake", "3 stops · 2 days", "KSh 21k"],
];

/* ---------------- home ---------------- */

function HomeContent({ v }: { v: KenyaVariant }) {
  const d = D[v];

  if (v === "desktop") {
    return (
      <div className="h-full flex flex-col overflow-hidden" style={{ background: cream }}>
        <div className="flex items-center justify-between px-5 pt-2.5 pb-2 border-b shrink-0" style={{ borderColor: line }}>
          <Logo d={d} />
          <div className="flex items-center gap-3">
            {["Explore", "Plan a route", "My trips"].map((l, i) => (
              <span
                key={l}
                className="font-semibold"
                style={{ fontSize: d.navTxt, color: i === 1 ? terra : ink }}
              >
                {l}
              </span>
            ))}
          </div>
          <div
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-pill"
            style={{ background: "rgba(28,26,23,0.06)" }}
          >
            <span style={{ fontSize: 10, color: muted }}>⌕</span>
            <span style={{ fontSize: 10, color: muted }}>Search Kenya…</span>
          </div>
        </div>

        <div className="flex-1 min-h-0 grid grid-cols-[1.15fr_1fr] gap-4 px-5 pt-3 pb-2">
          <div className="min-w-0 flex flex-col justify-center">
            <p className="uppercase tracking-widest font-semibold" style={{ fontSize: 9, color: terra }}>
              Kenya, planned once
            </p>
            <h1
              className="font-display font-black tracking-tight leading-[0.98] mt-1.5"
              style={{ fontSize: 26, color: ink }}
            >
              Build your Kenya,
              <br />
              one stop at a time.
            </h1>
            <p className="mt-2" style={{ fontSize: 10.5, color: muted }}>
              Every county, one route. No PDF chains, no 14 tabs — one
              shareable itinerary.
            </p>
            <div className="flex items-center gap-2 mt-2.5">
              {COUNTIES.map(c => (
                <span
                  key={c}
                  className="rounded-pill font-semibold"
                  style={{ fontSize: 9, background: card, color: ink, border: `1px solid ${line}`, padding: "5px 10px" }}
                >
                  {c}
                </span>
              ))}
            </div>
            <div
              className="mt-3 inline-flex items-center gap-1.5 rounded-pill font-bold"
              style={{ background: terra, color: "#fff", fontSize: 11, padding: "9px 18px" }}
            >
              ✎ Plan a route
            </div>
          </div>
          <Photo
            kind="savanna"
            className="rounded-soft-sm min-h-0"
            overlay="Maasai Mara"
            overlayLabel="Safari · 210 sites"
          />
        </div>

        <div className="px-5 pb-2 shrink-0">
          <div className="flex items-baseline justify-between mb-1.5">
            <span className="font-bold uppercase tracking-wide" style={{ fontSize: 9, color: ink }}>
              Popular trips
            </span>
            <span className="font-semibold" style={{ fontSize: 9, color: terra }}>
              View all →
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {TRIPS.map(([name, kind, meta, price]) => (
              <div key={name} className="rounded-soft-sm overflow-hidden bg-white" style={{ border: `1px solid ${line}` }}>
                <Photo kind={kind} className="aspect-[16/9]" labelBg="#fff" />
                <div className="px-2 py-1.5 flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="font-bold truncate" style={{ fontSize: 9.5, color: ink }}>
                      {name}
                    </p>
                    <p className="truncate" style={{ fontSize: 8, color: muted }}>
                      {meta}
                    </p>
                  </div>
                  <span className="font-bold shrink-0" style={{ fontSize: 9, color: terra }}>
                    {price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="h-full flex flex-col overflow-hidden"
      style={{ background: cream }}
    >
      <Bar />
      <div className={`flex items-center justify-between ${d.pad} mt-0.5 shrink-0`}>
        <Logo d={d} />
        <span
          className="rounded-pill grid place-items-center font-bold shrink-0"
          style={{ width: d.rowIco, height: d.rowIco, background: ink, color: cream }}
        >
          M
        </span>
      </div>

      <div className={`${d.pad} mt-2 shrink-0`}>
        <p className="font-bold" style={{ fontSize: d.title, color: ink }}>
          Where to next?
        </p>
        <div
          className="mt-1.5 flex items-center gap-1.5 rounded-pill px-3 py-2"
          style={{ background: card, border: `1px solid ${line}` }}
        >
          <span style={{ fontSize: d.small, color: muted }}>⌕</span>
          <span style={{ fontSize: d.small, color: muted }}>Search counties, towns, safaris…</span>
        </div>
      </div>

      <div className={`${d.pad} mt-2 shrink-0`}>
        <Photo
          kind="savanna"
          className="rounded-soft-sm w-full aspect-[16/10]"
          overlay="Maasai Mara"
          overlayLabel="Safari · 210 sites · KSh from 3,500"
        />
      </div>

      <div className={`${d.pad} mt-2 shrink-0`}>
        <div
          className="flex items-center justify-between rounded-pill px-3.5 py-2.5"
          style={{ background: ink }}
        >
          <div>
            <p className="font-bold" style={{ fontSize: d.base, color: cream }}>
              Plan a route
            </p>
            <p style={{ fontSize: d.small, color: "rgba(250,246,238,0.6)" }}>
              Stops → days → one shareable link
            </p>
          </div>
          <span
            className="rounded-pill grid place-items-center font-black"
            style={{ width: 30, height: 30, background: terra, color: "#fff", fontSize: 14 }}
          >
            →
          </span>
        </div>
      </div>

      <div className={`${d.pad} mt-2 shrink-0`}>
        <div className="flex items-center justify-between mb-1.5">
          <p className="font-bold uppercase tracking-wide" style={{ fontSize: d.label, color: ink }}>
            Popular trips
          </p>
          <span className="font-semibold" style={{ fontSize: d.small, color: terra }}>
            View all →
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {TRIPS.slice(0, 2).map(([name, kind, meta]) => (
            <div
              key={name}
              className="rounded-soft-sm overflow-hidden bg-white"
              style={{ border: `1px solid ${line}` }}
            >
              <Photo kind={kind} className="aspect-[16/10]" labelBg="#fff" />
              <div className="px-2 py-1.5">
                <p className="font-bold truncate" style={{ fontSize: d.card, color: ink }}>
                  {name}
                </p>
                <p className="truncate" style={{ fontSize: d.small, color: muted }}>
                  {meta}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav d={d} active="explore" />
    </div>
  );
}

/* ---------------- discover ---------------- */

const FILTERS = ["All", "Safari", "Coast", "Culture", "Adventure"];

const DESTINATIONS: [string, SceneKind, string, string][] = [
  ["Maasai Mara", "savanna", "Narok · Safari", "210 sites"],
  ["Diani Beach", "coast", "Kwale · Coast", "96 sites"],
  ["Lake Nakuru", "lake", "Nakuru · Culture", "74 sites"],
  ["Mt. Kenya", "mountain", "Nyeri · Adventure", "122 sites"],
  ["Aberdare Forest", "forest", "Nyandarua · Adventure", "58 sites"],
  ["Nairobi", "city", "Nairobi · Culture", "180 sites"],
];

function DiscoverContent({ v }: { v: KenyaVariant }) {
  const d = D[v];

  if (v === "desktop") {
    return (
      <div className="h-full flex overflow-hidden" style={{ background: cream }}>
        <div className="w-[118px] shrink-0 border-r px-3 py-3 flex flex-col gap-1" style={{ borderColor: line }}>
          <p className="uppercase tracking-widest font-bold mb-1" style={{ fontSize: 8, color: muted }}>
            Levels
          </p>
          {["County", "Destination", "Experiences"].map((l, i) => (
            <div
              key={l}
              className="px-2 py-1.5 font-semibold"
              style={{
                fontSize: 9,
                color: i === 1 ? "#fff" : ink,
                background: i === 1 ? terra : "transparent",
                borderRadius: 6,
              }}
            >
              {l}
            </div>
          ))}
          <div className="mt-auto rounded-soft-sm p-2" style={{ background: "rgba(28,26,23,0.05)" }}>
            <p style={{ fontSize: 7.5, color: muted }}>On 3G? Lists load first.</p>
            <p className="font-bold" style={{ fontSize: 9, color: terra }}>
              List-first ▸
            </p>
          </div>
        </div>
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="px-4 py-2.5 flex items-center justify-between border-b shrink-0" style={{ borderColor: line }}>
            <p className="font-display font-bold" style={{ fontSize: 15, color: ink }}>
              Discover Kenya
            </p>
            <div className="flex items-center gap-1.5 rounded-pill px-2.5 py-1.5" style={{ background: card, border: `1px solid ${line}` }}>
              <span style={{ fontSize: 9, color: muted }}>⌕</span>
              <span style={{ fontSize: 9, color: muted }}>Search…</span>
            </div>
          </div>
          <div className="px-4 pt-2 flex items-center gap-1.5 shrink-0">
            {FILTERS.map((f, i) => (
              <span
                key={f}
                className="rounded-pill font-semibold"
                style={{
                  fontSize: 8.5,
                  padding: "4px 10px",
                  background: i === 0 ? ink : card,
                  color: i === 0 ? cream : muted,
                  border: `1px solid ${line}`,
                }}
              >
                {f}
              </span>
            ))}
          </div>
          <div className="flex-1 min-h-0 px-4 py-2 grid grid-cols-2 gap-2 overflow-hidden">
            {DESTINATIONS.slice(0, 4).map(([name, kind, county, sites]) => (
              <div key={name} className="rounded-soft-sm overflow-hidden bg-white flex" style={{ border: `1px solid ${line}` }}>
                <Photo kind={kind} className="w-[74px] shrink-0 min-h-full" />
                <div className="px-2 py-1.5 min-w-0">
                  <p className="font-bold truncate" style={{ fontSize: 10, color: ink }}>
                    {name}
                  </p>
                  <p className="truncate" style={{ fontSize: 8, color: muted }}>
                    {county}
                  </p>
                  <p className="mt-0.5 font-semibold" style={{ fontSize: 8, color: terra }}>
                    {sites} →
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="h-full flex flex-col overflow-hidden"
      style={{ background: cream }}
    >
      <Bar />
      <div className={`${d.pad} mt-0.5 shrink-0`}>
        <p className="font-display font-bold" style={{ fontSize: d.title, color: ink }}>
          Discover
        </p>
        <div
          className="mt-1.5 flex items-center gap-1.5 rounded-pill px-3 py-2"
          style={{ background: card, border: `1px solid ${line}` }}
        >
          <span style={{ fontSize: d.small, color: muted }}>⌕</span>
          <span style={{ fontSize: d.small, color: muted }}>Search Kenya…</span>
        </div>
      </div>

      <div className={`${d.pad} mt-2 shrink-0 overflow-hidden`}>
        <div className="flex items-center gap-1.5 overflow-hidden">
          {FILTERS.map((f, i) => (
            <span
              key={f}
              className="rounded-pill font-semibold whitespace-nowrap"
              style={{
                fontSize: d.small - 0.5,
                padding: "5px 11px",
                background: i === 0 ? ink : card,
                color: i === 0 ? cream : muted,
                border: `1px solid ${line}`,
              }}
            >
              {f}
            </span>
          ))}
        </div>
      </div>

      <div className={`${d.pad} mt-2 flex-1 min-h-0 overflow-hidden`}>
        <p className="uppercase tracking-wide font-bold mb-1.5" style={{ fontSize: d.label, color: muted }}>
          {v === "tablet" ? "Destinations" : "Top destinations"}
        </p>
        <div className={v === "tablet" ? "grid grid-cols-2 gap-2" : "space-y-2"}>
          {DESTINATIONS.slice(0, v === "tablet" ? 4 : 5).map(([name, kind, county, sites]) => (
            <div
              key={name}
              className="rounded-soft-sm overflow-hidden bg-white flex"
              style={{ border: `1px solid ${line}` }}
            >
              <Photo kind={kind} className={v === "tablet" ? "w-[58px] shrink-0 min-h-full" : "w-[70px] shrink-0 min-h-full"} />
              <div className="px-2 py-1.5 min-w-0 flex-1 flex items-center justify-between gap-1">
                <div className="min-w-0">
                  <p className="font-bold truncate" style={{ fontSize: v === "tablet" ? 10 : d.card, color: ink }}>
                    {name}
                  </p>
                  <p className="truncate" style={{ fontSize: d.small, color: muted }}>
                    {county}
                  </p>
                </div>
                <span className="font-semibold shrink-0" style={{ fontSize: d.small, color: terra }}>
                  {sites} →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav d={d} active="explore" />
    </div>
  );
}

/* ---------------- plan (route builder) ---------------- */

const ROUTE_STOPS: [string, SceneKind, string][] = [
  ["Nairobi", "city", "Start"],
  ["Lake Nakuru", "lake", "Day 1–2"],
  ["Maasai Mara", "savanna", "Day 3–4"],
  ["Diani Beach", "coast", "Day 5–6"],
];

function PlanContent({ v }: { v: KenyaVariant }) {
  const d = D[v];

  if (v === "desktop") {
    return (
      <div className="h-full flex overflow-hidden" style={{ background: cream }}>
        <div className="w-[168px] shrink-0 border-r flex flex-col px-3 py-3" style={{ borderColor: line }}>
          <p className="uppercase tracking-widest font-bold" style={{ fontSize: 8, color: muted }}>
            Your route
          </p>
          <p className="font-display font-bold mt-0.5" style={{ fontSize: 12, color: ink }}>
            Nairobi → Coast
          </p>
          <div className="mt-2 space-y-1.5">
            {ROUTE_STOPS.map(([name, kind, days], i) => (
              <div key={name} className="flex items-center gap-1.5 rounded-soft-sm px-1.5 py-1" style={{ background: card, border: `1px solid ${line}` }}>
                <span
                  className="grid place-items-center font-bold shrink-0 rounded-pill"
                  style={{ width: 16, height: 16, background: i === 0 ? terra : "rgba(28,26,23,0.1)", color: i === 0 ? "#fff" : ink, fontSize: 8 }}
                >
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <p className="font-bold truncate" style={{ fontSize: 9, color: ink }}>
                    {name}
                  </p>
                  <p className="truncate" style={{ fontSize: 7, color: muted }}>
                    {days}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div
            className="mt-2 rounded-soft-sm text-center font-bold py-1.5"
            style={{ background: terra, color: "#fff", fontSize: 8.5 }}
          >
            + Add stop
          </div>
          <div className="mt-auto flex items-center gap-1.5">
            <span className="font-bold" style={{ fontSize: 9, color: ink }}>
              1,240 km
            </span>
            <span className="text-[8px]" style={{ color: muted }}>
              · 6 days
            </span>
          </div>
        </div>

        <div className="flex-1 min-w-0 flex flex-col">
          <div className="px-4 py-2 flex items-center justify-between border-b shrink-0" style={{ borderColor: line }}>
            <p className="font-bold" style={{ fontSize: 11, color: ink }}>
              Day by day
            </p>
            <span className="font-semibold rounded-pill px-2 py-0.5" style={{ fontSize: 8, background: terraSoft, color: terra }}>
              Auto-ordered
            </span>
          </div>
          <div className="px-4 py-2 flex-1 min-h-0">
            <div className="space-y-1.5">
              {[
                ["Day 1", "Nairobi — city tour & Nyama Choma", "city"],
                ["Day 2", "Drive to Nakuru, lake view lodge", "lake"],
                ["Day 3", "Nakuru → Mara, game drive", "savanna"],
                ["Day 4", "Mara morning drive, fly to coast", "savanna"],
              ].map(([day, text, kind]) => (
                <div key={day} className="flex items-center gap-2">
                  <span className="font-bold shrink-0 rounded-pill px-2 py-0.5" style={{ fontSize: 8, background: ink, color: cream }}>
                    {day}
                  </span>
                  <p className="truncate" style={{ fontSize: 9, color: muted }}>
                    {text}
                  </p>
                  <Photo kind={kind as SceneKind} className="w-8 h-6 shrink-0 rounded-[4px]" />
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-soft-sm relative overflow-hidden h-[78px]">
              <Scene kind="coast" />
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden>
                <path d="M40 250 L150 170 L250 120 L360 90" stroke="#e05a2a" strokeWidth="3.5" fill="none" strokeDasharray="1 7" strokeLinecap="round" />
                <circle cx="40" cy="250" r="7" fill="#e05a2a" stroke="#fff" strokeWidth="2" />
                <circle cx="150" cy="170" r="7" fill="#e05a2a" stroke="#fff" strokeWidth="2" />
                <circle cx="250" cy="120" r="7" fill="#e05a2a" stroke="#fff" strokeWidth="2" />
                <circle cx="360" cy="90" r="7" fill="#fff" stroke="#e05a2a" strokeWidth="2.5" />
              </svg>
              <span className="absolute bottom-1 right-1.5 rounded-pill px-1.5 py-0.5 font-bold" style={{ background: "rgba(255,255,255,0.92)", color: ink, fontSize: 7 }}>
                Route preview · 1,240 km
              </span>
            </div>
          </div>
          <div className="px-4 pb-2.5 shrink-0 flex items-center gap-2">
            <div
              className="flex-1 rounded-pill text-center font-bold py-2"
              style={{ background: ink, color: cream, fontSize: 9.5 }}
            >
              Preview route
            </div>
            <div
              className="rounded-pill px-3 py-2 font-bold"
              style={{ background: terra, color: "#fff", fontSize: 9.5 }}
            >
              Share trip ↗
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="h-full flex flex-col overflow-hidden"
      style={{ background: cream }}
    >
      <Bar />
      <div className={`${d.pad} mt-0.5 shrink-0`}>
        <p className="font-bold" style={{ fontSize: d.title, color: ink }}>
          Your route
        </p>
        <p style={{ fontSize: d.sub, color: muted }}>
          Nairobi → Coast · 6 days · 1,240 km
        </p>
      </div>

      <div className={`${d.pad} mt-2 shrink-0`}>
        {ROUTE_STOPS.map(([name, kind, days], i) => (
          <div key={name} className="flex items-center gap-1.5">
            <span
              className="grid place-items-center font-bold rounded-pill shrink-0"
              style={{
                width: d.rowIco * 0.75,
                height: d.rowIco * 0.75,
                background: i === 0 ? terra : "rgba(28,26,23,0.1)",
                color: i === 0 ? "#fff" : ink,
                fontSize: d.base,
              }}
            >
              {i + 1}
            </span>
            <div className="flex-1 flex items-center gap-2 rounded-soft-sm px-2 py-1.5 bg-white" style={{ border: `1px solid ${line}` }}>
              <Photo kind={kind} className="w-9 h-9 shrink-0 rounded-[6px]" />
              <div className="min-w-0">
                <p className="font-bold truncate" style={{ fontSize: d.card, color: ink }}>
                  {name}
                </p>
                <p style={{ fontSize: d.small, color: muted }}>
                  {days}
                </p>
              </div>
              <span className="ml-auto text-muted-foreground" style={{ fontSize: d.small, color: muted }}>
                ⠿
              </span>
            </div>
          </div>
        ))}
        <div
          className="mt-1.5 rounded-pill text-center font-bold py-2"
          style={{ background: terraSoft, color: terra, fontSize: d.base }}
        >
          + Add stop
        </div>
      </div>

      <div className={`${d.pad} mt-2 shrink-0`}>
        <div className="flex items-center justify-between mb-1.5">
          <p className="font-bold uppercase tracking-wide" style={{ fontSize: d.label, color: ink }}>
            Day by day
          </p>
          <span className="font-semibold" style={{ fontSize: d.small, color: muted }}>
            Reorder ⠿
          </span>
        </div>
        <div className="space-y-1.5">
          {[
            ["Day 1", "Nairobi — city tour"],
            ["Day 2", "Drive to Nakuru"],
            ["Day 3", "Nakuru → Mara drive"],
            ["Day 4", "Mara fly to coast"],
          ].map(([day, text]) => (
            <div key={day} className="flex items-center gap-2">
              <span className="font-bold shrink-0 rounded-pill px-2 py-0.5" style={{ fontSize: d.small, background: ink, color: cream }}>
                {day}
              </span>
              <p className="truncate" style={{ fontSize: d.small, color: muted }}>
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className={`${d.pad} mt-2 shrink-0`}>
        <div
          className="rounded-soft-sm text-center font-bold py-2.5"
          style={{ background: ink, color: cream, fontSize: d.base + 1 }}
        >
          Preview route →
        </div>
      </div>

      <BottomNav d={d} active="plan" />
    </div>
  );
}

/* ---------------- trips ---------------- */

function TripsContent({ v }: { v: KenyaVariant }) {
  const d = D[v];

  if (v === "desktop") {
    return (
      <div className="h-full flex flex-col overflow-hidden" style={{ background: cream }}>
        <div className="flex items-center justify-between px-5 pt-2.5 pb-2 border-b shrink-0" style={{ borderColor: line }}>
          <p className="font-display font-bold" style={{ fontSize: 16, color: ink }}>
            My trips
          </p>
          <span className="font-semibold" style={{ fontSize: 9, color: terra }}>
            + New route
          </span>
        </div>
        <div className="flex-1 min-h-0 px-5 py-2.5 grid grid-cols-2 gap-2.5">
          {[
            ["Mara to the Coast", "savanna", "4 stops · 6 days"],
            ["Rift Valley Loop", "mountain", "5 stops · 4 days"],
          ].map(([name, kind, meta]) => (
            <div key={name} className="rounded-soft-sm overflow-hidden bg-white flex flex-col" style={{ border: `1px solid ${line}` }}>
              <Photo kind={kind as SceneKind} className="w-full aspect-[16/8]" />
              <div className="px-2.5 py-2 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-1">
                  <p className="font-bold" style={{ fontSize: 11.5, color: ink }}>
                    {name}
                  </p>
                  <span className="shrink-0" style={{ fontSize: 11, color: terra }}>
                    ⤴
                  </span>
                </div>
                <p style={{ fontSize: 8.5, color: muted }}>
                  {meta}
                </p>
                <div
                  className="mt-auto rounded-pill text-center font-bold py-1.5 mt-2"
                  style={{ background: ink, color: cream, fontSize: 8.5 }}
                >
                  Open itinerary
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mx-5 mb-2.5 rounded-soft-sm px-3.5 py-2 flex items-center justify-between shrink-0" style={{ background: ink }}>
          <div>
            <p className="font-bold" style={{ fontSize: 9.5, color: cream }}>
              Shareable link — one URL
            </p>
            <p style={{ fontSize: 8, color: "rgba(250,246,238,0.6)" }}>
              kenyatrace.vercel.app/t/mara-coast
            </p>
          </div>
          <span className="font-bold rounded-pill px-2.5 py-1" style={{ background: terra, color: "#fff", fontSize: 8.5 }}>
            Copy link
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="h-full flex flex-col overflow-hidden"
      style={{ background: cream }}
    >
      <Bar />
      <div className={`${d.pad} mt-0.5 shrink-0 flex items-center justify-between`}>
        <p className="font-display font-bold" style={{ fontSize: d.title, color: ink }}>
          Saved trips
        </p>
        <span className="font-semibold" style={{ fontSize: d.small, color: terra }}>
          + New
        </span>
      </div>

      <div className={`${d.pad} mt-2 shrink-0`}>
        <div
          className="rounded-soft-sm px-3 py-2.5 flex items-center gap-2.5"
          style={{ background: ink }}
        >
          <span
            className="rounded-pill grid place-items-center shrink-0"
            style={{ width: 34, height: 34, background: terra, color: "#fff", fontSize: 15 }}
          >
            ⤴
          </span>
          <div className="min-w-0">
            <p className="font-bold truncate" style={{ fontSize: d.base, color: cream }}>
              Mara to the Coast · ready to share
            </p>
            <p className="truncate" style={{ fontSize: d.small, color: "rgba(250,246,238,0.6)" }}>
              One link — no PDF, no WhatsApp chain
            </p>
          </div>
        </div>
      </div>

      <div className={`${d.pad} mt-2 flex-1 min-h-0 overflow-hidden`}>
        <p className="uppercase tracking-wide font-bold mb-1.5" style={{ fontSize: d.label, color: muted }}>
          Itineraries
        </p>
        <div className={v === "tablet" ? "grid grid-cols-2 gap-2" : "space-y-2"}>
          {TRIPS.slice(0, v === "tablet" ? 2 : 3).map(([name, kind, meta]) => (
            <div
              key={name}
              className="rounded-soft-sm overflow-hidden bg-white"
              style={{ border: `1px solid ${line}` }}
            >
              <div className="flex items-center gap-2 p-1.5">
                <Photo kind={kind} className="w-12 h-12 shrink-0 rounded-[6px]" />
                <div className="min-w-0 flex-1">
                  <p className="font-bold truncate" style={{ fontSize: d.card, color: ink }}>
                    {name}
                  </p>
                  <p className="truncate" style={{ fontSize: d.small, color: muted }}>
                    {meta}
                  </p>
                </div>
                <span className="shrink-0" style={{ fontSize: d.base, color: terra }}>
                  →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav d={d} active="trips" />
    </div>
  );
}

/* ---------------- public API ---------------- */

function ContentFor({ v, screen }: { v: KenyaVariant; screen: KenyaScreenName }) {
  if (screen === "discover") return <DiscoverContent v={v} />;
  if (screen === "plan") return <PlanContent v={v} />;
  if (screen === "trips") return <TripsContent v={v} />;
  return <HomeContent v={v} />;
}

export function KenyaTraceScreen({
  variant,
  screen = "home",
  className = "",
}: {
  variant: KenyaVariant;
  screen?: KenyaScreenName;
  className?: string;
}) {
  const design = DESIGN[variant];
  return (
    <div
      className={`h-full w-full overflow-hidden ${className}`}
      role="img"
      aria-label={`KenyaTrace — ${screen} screen (${variant} view)`}
    >
      <FitCanvas designW={design.w} designH={design.h}>
        <ContentFor v={variant} screen={screen} />
      </FitCanvas>
    </div>
  );
}

const SCREEN_NOTES: Record<KenyaScreenName, string> = {
  home: "List-first home — the place starts with a photo and a plan button, not a map.",
  discover: "County → destination → experiences — three predictable levels.",
  plan: "Route builder — stops, day-by-day plan and an inline add-stop in one view.",
  trips: "Saved itineraries — one shareable link replaces the PDF + WhatsApp chain.",
};

export function KenyaTraceShowcase({
  screen = "home",
  title = "Hi-fi concept — one design, three viewports",
  live,
}: {
  screen?: KenyaScreenName;
  title?: string;
  live?: boolean;
}) {
  return (
    <DeviceShowcaseFigure
      title={title}
      meta="mobile · tablet · desktop"
      note={SCREEN_NOTES[screen]}
      live={live}
      phone={<KenyaTraceScreen variant="mobile" screen={screen} />}
      tablet={<KenyaTraceScreen variant="tablet" screen={screen} />}
      desktop={<KenyaTraceScreen variant="desktop" screen={screen} />}
      phoneClassName="w-[120px]"
      tabletClassName="w-[158px]"
      desktopClassName="w-[300px]"
    />
  );
}

export function KenyaTraceShots({
  title = "Concept screens — one design, three viewports",
}: {
  title?: string;
}) {
  const shots: { name: string; screen: KenyaScreenName }[] = [
    { name: "Home", screen: "home" },
    { name: "Discover", screen: "discover" },
    { name: "Plan", screen: "plan" },
    { name: "Trips", screen: "trips" },
  ];
  return (
    <figure className="border border-border bg-card p-4 sm:p-6">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
        <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          {title}
        </span>
        <span className="text-[10px] font-mono uppercase tracking-widest text-foreground/70">
          {shots.length} screens · mobile · tablet · desktop
        </span>
      </figcaption>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-start">
        {shots.map(s => (
          <DeviceShowcaseCell
            key={s.screen}
            name={s.name}
            note={SCREEN_NOTES[s.screen]}
            phone={<KenyaTraceScreen variant="mobile" screen={s.screen} />}
            tablet={<KenyaTraceScreen variant="tablet" screen={s.screen} />}
            desktop={<KenyaTraceScreen variant="desktop" screen={s.screen} />}
          />
        ))}
      </div>
    </figure>
  );
}
