import { DeviceShowcase } from "@/components/artifacts/DeviceMockups";
import { FitCanvas } from "@/components/art/FitCanvas";

const ink = "#141310";
const cream = "#f4efe7";
const lime = "#e8ff47";
const muted = "#8a867e";

export type BankingVariant = "mobile" | "tablet" | "desktop";
export type BankingScreenName = "home" | "onboarding" | "goals" | "transfer";

/* Each screen is authored at a fixed "design size" and scaled to fill whatever
   device frame renders it — the same trick as a real screenshot. Design aspect
   ratios match the mockup screens (9/17, 3/4, 16/10). */
const DESIGN: Record<BankingVariant, { w: number; h: number }> = {
  mobile: { w: 320, h: 604 },
  tablet: { w: 320, h: 427 },
  desktop: { w: 640, h: 400 },
};

interface DSet {
  pad: string;
  gap: string;
  status: number;
  title: number;
  sub: number;
  label: number;
  small: number;
  base: number;
  val: number;
  ring: number;
  ringTxt: number;
  tile: number;
  tileIco: number;
  chip: string;
  navIco: number;
  navTxt: number;
  avatar: number;
  avatarTxt: number;
  kbd: number;
  kbdH: number;
  rowIco: number;
}

const D: Record<BankingVariant, DSet> = {
  mobile: {
    pad: "px-4",
    gap: "gap-2.5",
    status: 13,
    title: 18,
    sub: 11,
    label: 10,
    small: 10,
    base: 13,
    val: 30,
    ring: 60,
    ringTxt: 12,
    tile: 48,
    tileIco: 18,
    chip: "text-[12px] py-[9px]",
    navIco: 17,
    navTxt: 9,
    avatar: 36,
    avatarTxt: 16,
    kbd: 18,
    kbdH: 46,
    rowIco: 32,
  },
  tablet: {
    pad: "px-4",
    gap: "gap-2",
    status: 13,
    title: 16,
    sub: 11,
    label: 10,
    small: 9.5,
    base: 12.5,
    val: 21,
    ring: 52,
    ringTxt: 10.5,
    tile: 42,
    tileIco: 15,
    chip: "text-[11px] py-[8px]",
    navIco: 14,
    navTxt: 8.5,
    avatar: 30,
    avatarTxt: 13,
    kbd: 16,
    kbdH: 42,
    rowIco: 28,
  },
  desktop: {
    pad: "px-5",
    gap: "gap-2.5",
    status: 13,
    title: 16,
    sub: 11,
    label: 10,
    small: 10,
    base: 12.5,
    val: 25,
    ring: 58,
    ringTxt: 11.5,
    tile: 44,
    tileIco: 16,
    chip: "text-[12px] py-[9px]",
    navIco: 15,
    navTxt: 10.5,
    avatar: 28,
    avatarTxt: 12,
    kbd: 17,
    kbdH: 46,
    rowIco: 30,
  },
};

const NAV = [
  { key: "home", label: "Home", ico: "⌂" },
  { key: "money", label: "Money", ico: "≡" },
  { key: "goals", label: "Goals", ico: "◎" },
  { key: "cards", label: "Cards", ico: "▢" },
  { key: "more", label: "More", ico: "⋯" },
];

const NAV_ACTIVE: Record<BankingScreenName, string> = {
  home: "home",
  onboarding: "onboarding",
  goals: "goals",
  transfer: "money",
};

function Bar({ v }: { v: BankingVariant }) {
  const d = D[v];
  return (
    <div
      className="flex items-center justify-between px-4 pt-1.5 pb-0.5 shrink-0"
      style={{ color: ink }}
    >
      <span className="font-semibold" style={{ fontSize: d.status }}>
        9:41
      </span>
      <div className="flex items-center gap-1.5">
        <svg
          width={d.status}
          height={d.status * 0.72}
          viewBox="0 0 8 6"
          fill={ink}
        >
          <rect x="0" y="3" width="1.6" height="3" />
          <rect x="2.2" y="1.8" width="1.6" height="4.2" />
          <rect x="4.4" y="0.6" width="1.6" height="5.4" />
          <rect x="6.6" y="0" width="1.4" height="6" fill={muted} />
        </svg>
        <svg
          width={d.status}
          height={d.status * 0.72}
          viewBox="0 0 9 6"
          fill="none"
          stroke={ink}
          strokeWidth="1"
        >
          <rect x="0.5" y="0.5" width="8" height="5" rx="1" />
          <path d="M6.5 2v2M7.4 2.4v1.2" stroke={ink} strokeWidth="0.8" />
        </svg>
      </div>
    </div>
  );
}

function BottomNav({ v, active }: { v: BankingVariant; active: string }) {
  const d = D[v];
  return (
    <div
      className="mt-auto shrink-0 border-t"
      style={{ borderColor: "rgba(20,19,16,0.1)" }}
    >
      <div className="grid grid-cols-5">
        {NAV.map(n => (
          <div
            key={n.key}
            className={`flex flex-col items-center py-2 ${active === n.key ? "" : "opacity-40"}`}
          >
            <span
              className="leading-none"
              style={{ fontSize: d.navIco, color: ink }}
            >
              {n.ico}
            </span>
            <span
              className="mt-1 font-semibold"
              style={{ fontSize: d.navTxt, color: ink }}
            >
              {n.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Sidebar({ v, active }: { v: BankingVariant; active: string }) {
  const d = D[v];
  return (
    <div
      className="shrink-0 w-[150px] border-r flex flex-col px-3 py-4"
      style={{ borderColor: "rgba(20,19,16,0.1)" }}
    >
      <div className="flex items-center gap-1.5 px-1">
        <span
          className="w-3 h-3 rounded-pill shrink-0"
          style={{ background: lime }}
        />
        <span
          className="font-black tracking-tight"
          style={{ fontSize: 15, color: ink }}
        >
          Pesa
        </span>
      </div>
      <div className="mt-3 space-y-1">
        {NAV.map(n => {
          const on = active === n.key;
          return (
            <div
              key={n.key}
              className={`flex items-center gap-2 px-2 py-[7px] rounded-soft-sm ${
                on ? "bg-[#141310]" : ""
              }`}
              style={on ? { color: cream } : { color: ink }}
            >
              <span style={{ fontSize: d.navIco }} className="leading-none">
                {n.ico}
              </span>
              <span className="font-semibold" style={{ fontSize: d.navTxt }}>
                {n.label}
              </span>
            </div>
          );
        })}
      </div>
      <div
        className="mt-auto rounded-soft-sm p-2.5"
        style={{ background: "rgba(20,19,16,0.06)" }}
      >
        <p
          className="uppercase tracking-wide"
          style={{ fontSize: 9, color: muted }}
        >
          Saved
        </p>
        <p className="font-bold" style={{ fontSize: 15, color: ink }}>
          KSh 12,400
        </p>
      </div>
    </div>
  );
}

function Topbar({ v }: { v: BankingVariant }) {
  const d = D[v];
  return (
    <div
      className="flex items-center justify-between px-4 py-2.5 shrink-0 border-b"
      style={{ borderColor: "rgba(20,19,16,0.1)" }}
    >
      <span className="font-bold" style={{ fontSize: d.title, color: ink }}>
        Habari, Mike
      </span>
      <div className="flex items-center gap-2">
        <span
          className="flex items-center gap-1 px-2 py-1 rounded-soft-sm"
          style={{ background: "rgba(20,19,16,0.06)" }}
        >
          <span style={{ fontSize: d.small, color: muted }}>⌕</span>
          <span style={{ fontSize: d.small, color: muted }}>Search</span>
        </span>
        <span
          className="rounded-pill grid place-items-center shrink-0"
          style={{
            width: d.avatar,
            height: d.avatar,
            background: ink,
            color: cream,
          }}
        >
          <span style={{ fontSize: d.avatarTxt }}>M</span>
        </span>
      </div>
    </div>
  );
}

function Ring({
  v,
  pct,
  size,
  value,
}: {
  v: BankingVariant;
  pct: number;
  size?: number;
  value?: string;
}) {
  const d = D[v];
  const px = size ?? d.ring;
  return (
    <div className="relative shrink-0" style={{ width: px, height: px }}>
      <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
        <circle
          cx="18"
          cy="18"
          r="15"
          fill="none"
          stroke={ink}
          strokeOpacity="0.1"
          strokeWidth="3.5"
        />
        <circle
          cx="18"
          cy="18"
          r="15"
          fill="none"
          stroke={lime}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray={`${(pct / 100) * 2 * Math.PI * 15} ${2 * Math.PI * 15}`}
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center font-bold"
        style={{ fontSize: value ? d.ringTxt * 0.9 : d.ringTxt, color: ink }}
      >
        {value ?? `${pct}%`}
      </span>
    </div>
  );
}

const RECENTS: [string, string, string, boolean][] = [
  ["Gig payment", "Job · Upwork", "+KSh 1,800", true],
  ["Chai Point", "Nairobi CBD", "−KSh 120", false],
  ["Round-up save", "Auto · Goals", "+KSh 45", true],
];

function HomeContent({ v }: { v: BankingVariant }) {
  const d = D[v];
  return (
    <div className={`h-full flex flex-col ${d.pad} ${d.gap} overflow-hidden`}>
      {v !== "desktop" && (
        <div className="flex items-center justify-between pt-1 shrink-0">
          <div className="min-w-0">
            <p
              className="font-black leading-none"
              style={{ fontSize: d.title, color: ink }}
            >
              Habari, Mike
            </p>
            <p className="mt-1" style={{ fontSize: d.sub, color: muted }}>
              Good morning · Jambo
            </p>
          </div>
          <span
            className="rounded-pill grid place-items-center font-bold shrink-0"
            style={{
              width: d.avatar,
              height: d.avatar,
              background: ink,
              color: cream,
            }}
          >
            <span style={{ fontSize: d.avatarTxt }}>M</span>
          </span>
        </div>
      )}

      <div className="rounded-[16px] p-4 shrink-0" style={{ background: ink }}>
        <div className="flex items-center justify-between">
          <p
            className="font-medium uppercase tracking-wide"
            style={{ fontSize: d.label, color: "rgba(244,239,231,0.6)" }}
          >
            Total balance
          </p>
          <span style={{ fontSize: d.small, color: lime }}>↗</span>
        </div>
        <p
          className="font-black tracking-tight leading-tight mt-1"
          style={{ fontSize: d.val, color: cream }}
        >
          KSh 24,580
          <span
            className="opacity-60"
            style={{ fontSize: `${d.val * 0.62}px` }}
          >
            .00
          </span>
        </p>
        <div className="flex items-center gap-1.5 mt-1.5">
          <span
            className="font-bold rounded-pill px-2 py-0.5"
            style={{ background: lime, color: ink, fontSize: d.small }}
          >
            +12.4%
          </span>
          <span style={{ fontSize: d.small, color: "rgba(244,239,231,0.5)" }}>
            vs last month
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <Ring v={v} pct={68} />
        <div className="min-w-0">
          <p
            className="font-bold truncate"
            style={{ fontSize: d.base + 1, color: ink }}
          >
            Trip to Mombasa
          </p>
          <p className="truncate" style={{ fontSize: d.small, color: muted }}>
            KSh 34,000 of 50,000 · +500
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 shrink-0">
        {[
          ["Tuma", "➜"],
          ["Lipa", "▣"],
          ["Airtime", "⌁"],
          ["More", "⋯"],
        ].map(([label, glyph]) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <div
              className="rounded-[14px] grid place-items-center font-bold"
              style={{
                width: d.tile,
                height: d.tile,
                background: "rgba(20,19,16,0.07)",
                color: ink,
                fontSize: d.tileIco,
              }}
            >
              {glyph}
            </div>
            <span
              className="font-semibold"
              style={{ fontSize: d.small, color: ink }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      <div className="min-h-0 flex-1 flex flex-col mt-1 overflow-hidden">
        <p
          className="font-bold uppercase tracking-wide shrink-0"
          style={{ fontSize: d.label, color: muted }}
        >
          Recent
        </p>
        <div className="mt-1.5 space-y-2">
          {RECENTS.map(([t, sub, amt, pos]) => (
            <div key={t} className="flex items-center gap-2.5">
              <div
                className="rounded-[10px] grid place-items-center shrink-0"
                style={{
                  width: d.rowIco,
                  height: d.rowIco,
                  background: "rgba(20,19,16,0.07)",
                  color: ink,
                  fontSize: d.rowIco * 0.45,
                }}
              >
                {pos ? "↗" : "↙"}
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className="font-semibold truncate"
                  style={{ fontSize: d.base, color: ink }}
                >
                  {t}
                </p>
                <p
                  className="truncate leading-none mt-0.5"
                  style={{ fontSize: d.small, color: muted }}
                >
                  {sub}
                </p>
              </div>
              <span
                className="font-bold"
                style={{ fontSize: d.base, color: pos ? "#1a7f37" : ink }}
              >
                {amt}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OnboardingContent({ v }: { v: BankingVariant }) {
  const d = D[v];
  const maxW = v === "desktop" ? "max-w-[420px]" : "max-w-[270px]";
  return (
    <div
      className={`h-full flex flex-col ${d.pad} justify-center overflow-hidden`}
    >
      <div className={`w-full ${maxW} mx-auto`}>
        <p className="font-medium" style={{ fontSize: d.label, color: muted }}>
          STEP 2 OF 4
        </p>
        <p
          className="font-black mt-1.5"
          style={{ fontSize: d.title + 4, color: ink }}
        >
          Verify your number
        </p>
        <div className="flex gap-1.5 mt-3">
          <div
            className="h-[5px] flex-1 rounded-pill"
            style={{ background: lime }}
          />
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="h-[5px] flex-1 rounded-pill"
              style={{ background: "rgba(20,19,16,0.2)" }}
            />
          ))}
        </div>
        <div
          className="mt-5 rounded-[14px] px-3 py-3 flex items-center justify-between border"
          style={{ borderColor: "rgba(20,19,16,0.2)" }}
        >
          <span style={{ fontSize: d.base + 1, color: muted }}>
            +254 712 345 678
          </span>
          <span className="font-bold" style={{ fontSize: d.small, color: ink }}>
            EDIT
          </span>
        </div>
        <div
          className="mt-3 rounded-[14px] py-3.5 text-center"
          style={{ background: ink }}
        >
          <span
            className="font-bold"
            style={{ fontSize: d.base + 1, color: cream }}
          >
            Send code
          </span>
        </div>
        <p
          className="mt-3 leading-relaxed"
          style={{ fontSize: d.small + 1, color: muted }}
        >
          We'll text a 6-digit code. No documents needed yet.
        </p>
      </div>
    </div>
  );
}

function GoalsContent({ v }: { v: BankingVariant }) {
  const d = D[v];
  const bigRing = v === "desktop" ? 130 : v === "mobile" ? 100 : 88;
  return (
    <div className={`h-full flex flex-col ${d.pad} ${d.gap} overflow-hidden`}>
      <div className="pt-1 shrink-0">
        <p
          className="uppercase tracking-wide"
          style={{ fontSize: d.label, color: muted }}
        >
          Save goal
        </p>
        <p
          className="font-black mt-0.5"
          style={{ fontSize: d.title + 2, color: ink }}
        >
          Trip to Mombasa
        </p>
      </div>
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Ring v={v} pct={68} size={bigRing} />
          <p className="mt-2" style={{ fontSize: d.small, color: muted }}>
            KSh 34,000 of 50,000
          </p>
        </div>
      </div>
      <div className="shrink-0">
        <p
          className="font-bold uppercase tracking-wide"
          style={{ fontSize: d.label, color: ink }}
        >
          Quick save
        </p>
        <div className="flex gap-2 mt-1.5">
          {["+200", "+500", "+1000"].map(vl => (
            <span
              key={vl}
              className={`flex-1 rounded-[12px] text-center font-bold ${d.chip}`}
              style={{ background: ink, color: cream }}
            >
              {vl}
            </span>
          ))}
        </div>
        <div
          className="mt-2.5 flex items-center justify-between rounded-[12px] px-3 py-2.5 border"
          style={{ borderColor: "rgba(20,19,16,0.2)" }}
        >
          <span style={{ fontSize: d.base, color: ink }}>Round-up savings</span>
          <span
            className="rounded-pill flex items-center justify-end px-[3px] shrink-0"
            style={{ width: 38, height: 20, background: ink }}
          >
            <span
              className="rounded-pill"
              style={{ width: 15, height: 15, background: lime }}
            />
          </span>
        </div>
      </div>
    </div>
  );
}

function TransferContent({ v }: { v: BankingVariant }) {
  const d = D[v];
  return (
    <div className={`h-full flex flex-col ${d.pad} ${d.gap} overflow-hidden`}>
      <p
        className="font-black pt-1 shrink-0"
        style={{ fontSize: d.title, color: ink }}
      >
        Tuma — send money
      </p>
      <div className="shrink-0">
        <div
          className="rounded-[14px] px-3 py-2.5 border"
          style={{ borderColor: "rgba(20,19,16,0.2)" }}
        >
          <p
            className="uppercase tracking-wide"
            style={{ fontSize: d.small, color: muted }}
          >
            To
          </p>
          <p
            className="font-bold mt-0.5"
            style={{ fontSize: d.base + 1, color: ink }}
          >
            M-Pesa · 0712 345 678
          </p>
        </div>
        <div
          className="mt-2 rounded-[14px] px-3 py-2.5"
          style={{ borderColor: ink, borderWidth: 1 }}
        >
          <p
            className="uppercase tracking-wide"
            style={{ fontSize: d.small, color: muted }}
          >
            Amount
          </p>
          <p
            className="font-black tracking-tight mt-0.5"
            style={{ fontSize: d.val, color: ink }}
          >
            KSh 1,500
            <span style={{ color: lime }}>▎</span>
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1.5 shrink-0">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"].map(
          (n, i) => (
            <div
              key={i}
              className="rounded-[12px] text-center font-bold grid place-items-center"
              style={
                n === ""
                  ? { height: d.kbdH, fontSize: d.kbd }
                  : {
                      height: d.kbdH,
                      fontSize: d.kbd,
                      background: "rgba(20,19,16,0.06)",
                      color: ink,
                    }
              }
            >
              {n}
            </div>
          )
        )}
      </div>
      <div className="mt-auto shrink-0">
        <div
          className="rounded-[14px] py-3 text-center"
          style={{ background: lime }}
        >
          <span
            className="font-bold"
            style={{ fontSize: d.base + 1, color: ink }}
          >
            Send with padlock
          </span>
        </div>
        <p
          className="text-center mt-1.5"
          style={{ fontSize: d.small, color: muted }}
        >
          Bank-grade · encrypted · instant
        </p>
      </div>
    </div>
  );
}

function ContentFor({
  v,
  screen,
}: {
  v: BankingVariant;
  screen: BankingScreenName;
}) {
  if (screen === "onboarding") return <OnboardingContent v={v} />;
  if (screen === "goals") return <GoalsContent v={v} />;
  if (screen === "transfer") return <TransferContent v={v} />;
  return <HomeContent v={v} />;
}

export function BankingScreen({
  variant,
  screen = "home",
  className = "",
}: {
  variant: BankingVariant;
  screen?: BankingScreenName;
  className?: string;
}) {
  const v = variant;
  const design = DESIGN[v];
  const withNav = screen !== "onboarding";
  const content = <ContentFor v={v} screen={screen} />;

  return (
    <div
      className={`h-full w-full overflow-hidden ${className}`}
      role="img"
      aria-label={`Youth mobile banking redesign — ${screen} screen (${variant})`}
    >
      <FitCanvas designW={design.w} designH={design.h}>
        {v === "desktop" ? (
          <div className="h-full flex">
            <Sidebar v={v} active={NAV_ACTIVE[screen]} />
            <div className="flex-1 min-w-0 flex flex-col">
              <Topbar v={v} />
              <div className="flex-1 min-h-0 overflow-hidden">{content}</div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col">
            <Bar v={v} />
            <div className="flex-1 min-h-0 overflow-hidden">{content}</div>
            {withNav && <BottomNav v={v} active={NAV_ACTIVE[screen]} />}
          </div>
        )}
      </FitCanvas>
    </div>
  );
}

const SCREEN_NOTES: Record<BankingScreenName, string> = {
  home: "Savings-first home — balance, goal ring, and quick actions in 0 taps.",
  onboarding: "Progressive KYC — essentials first, documents deferred.",
  goals: "Quick-save sized to irregular income: +200, +500, +1000.",
  transfer:
    "Explicit trust cues — padlock + encrypted + instant at the final tap.",
};

/* Hero-style trio — the chosen screen rendered in phone + tablet + desktop frames. */
export function BankingDeviceShowcase({
  screen = "home",
  title = "Concept hi-fi — one design, three viewports",
}: {
  screen?: BankingScreenName;
  title?: string;
}) {
  return (
    <figure className="border border-border bg-card p-4 sm:p-6">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
        <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          {title}
        </span>
        <span className="text-[10px] font-mono uppercase tracking-widest text-foreground/70">
          mobile · tablet · desktop
        </span>
      </figcaption>
      <DeviceShowcase
        phone={{ node: <BankingScreen variant="mobile" screen={screen} /> }}
        tablet={{ node: <BankingScreen variant="tablet" screen={screen} /> }}
        desktop={{ node: <BankingScreen variant="desktop" screen={screen} /> }}
        phoneClassName="w-[180px]"
        tabletClassName="w-[240px]"
        desktopClassName="w-[520px]"
      />
      <p className="mt-3 text-[11px] text-muted-foreground leading-snug">
        {SCREEN_NOTES[screen]}
      </p>
    </figure>
  );
}

/** UI chapter — every screen of the redesign as a mobile + tablet + desktop trio. */
export function BankingShots({
  title = "Concept screens — one design, three viewports",
}: {
  title?: string;
}) {
  const shots: { name: string; screen: BankingScreenName }[] = [
    { name: "Onboarding", screen: "onboarding" },
    { name: "Home", screen: "home" },
    { name: "Goals", screen: "goals" },
    { name: "Transfer", screen: "transfer" },
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
          <figure
            key={s.screen}
            className="border border-border bg-secondary p-3 sm:p-4"
          >
            <p className="text-[10px] font-mono uppercase tracking-widest text-foreground mb-2">
              {s.name}
            </p>
            <DeviceShowcase
              showLabels={false}
              phone={{
                node: <BankingScreen variant="mobile" screen={s.screen} />,
              }}
              tablet={{
                node: <BankingScreen variant="tablet" screen={s.screen} />,
              }}
              desktop={{
                node: <BankingScreen variant="desktop" screen={s.screen} />,
              }}
              phoneClassName="w-[115px]"
              tabletClassName="w-[150px]"
              desktopClassName="w-[210px]"
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
