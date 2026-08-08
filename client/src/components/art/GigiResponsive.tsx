import { useId } from "react";
import { FitCanvas } from "@/components/art/FitCanvas";
import {
  DeviceShowcaseFigure,
  DeviceShowcaseCell,
} from "@/components/artifacts/DeviceShowcaseFigure";

/* ------------------------------------------------------------------ */
/* GiGi Energy Drink — bold youth e-commerce. Dark "can-approach"      */
/* containers keep the fluorescent palette loud while every text       */
/* surface passes WCAG AA. Authored at fixed design sizes and scaled   */
/* to fill whatever device frame renders it.                           */
/* ------------------------------------------------------------------ */

const ink = "#141310";
const card = "#1d1b18";
const cream = "#f4efe7";
const lime = "#e8ff47";
const orange = "#ff5a1f";
const pink = "#ff2d78";
const muted = "#9b9890";
const line = "rgba(244,239,231,0.15)";

export type GigiVariant = "mobile" | "tablet" | "desktop";
export type GigiScreenName = "storefront" | "flavours" | "checkout" | "events";

const DESIGN: Record<GigiVariant, { w: number; h: number }> = {
  mobile: { w: 320, h: 604 },
  tablet: { w: 320, h: 427 },
  desktop: { w: 640, h: 400 },
};

interface DSet {
  pad: string;
  gap: string;
  status: number;
  logo: number;
  display: number;
  title: number;
  sub: number;
  label: number;
  small: number;
  base: number;
  price: number;
  navTxt: number;
  canW: number;
  tile: number;
}

const D: Record<GigiVariant, DSet> = {
  mobile: {
    pad: "px-4",
    gap: "gap-2.5",
    status: 13,
    logo: 18,
    display: 30,
    title: 17,
    sub: 11,
    label: 10,
    small: 9.5,
    base: 12,
    price: 14,
    navTxt: 8.5,
    canW: 72,
    tile: 44,
  },
  tablet: {
    pad: "px-4",
    gap: "gap-2",
    status: 13,
    logo: 16,
    display: 24,
    title: 15,
    sub: 10.5,
    label: 9.5,
    small: 9,
    base: 11,
    price: 13,
    navTxt: 8,
    canW: 58,
    tile: 38,
  },
  desktop: {
    pad: "px-5",
    gap: "gap-2.5",
    status: 13,
    logo: 18,
    display: 38,
    title: 16,
    sub: 11,
    label: 10,
    small: 10,
    base: 11.5,
    price: 13.5,
    navTxt: 10,
    canW: 120,
    tile: 52,
  },
};

/* ---------------- energy can ---------------- */

function Can({
  color,
  className,
  bolt = true,
}: {
  color: string;
  className?: string;
  bolt?: boolean;
}) {
  const id = useId().replace(/[:]/g, "");
  return (
    <svg viewBox="0 0 44 96" className={className} aria-hidden>
      <defs>
        <linearGradient id={`can-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={color} stopOpacity="0.55" />
          <stop offset="28%" stopColor={color} />
          <stop offset="62%" stopColor={color} />
          <stop offset="100%" stopColor={color} stopOpacity="0.45" />
        </linearGradient>
      </defs>
      <rect x="3" y="10" width="38" height="76" rx="10" fill={`url(#can-${id})`} />
      <rect x="3" y="10" width="38" height="14" rx="10" fill="rgba(20,19,16,0.28)" />
      <rect x="8" y="4" width="28" height="9" rx="3.5" fill="#cfcfcf" />
      <rect x="10" y="5.5" width="24" height="6" rx="3" fill="#e8e8e8" />
      <rect x="3" y="79" width="38" height="7" rx="3.5" fill="rgba(20,19,16,0.22)" />
      {bolt && (
        <path d="M26 34 L17 52 h6 l-3 14 13 -21 h-7 Z" fill="#f4efe7" stroke="rgba(20,19,16,0.35)" strokeWidth="1" />
      )}
      <rect x="13" y="68" width="18" height="3.4" rx="1.7" fill="rgba(20,19,16,0.55)" />
    </svg>
  );
}

/* ---------------- chrome ---------------- */

function Bar({ color = cream }: { color?: string }) {
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

function Logo({ d, compact }: { d: DSet; compact?: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        className="grid place-items-center rounded-[5px] font-black leading-none"
        style={{ width: d.logo + 4, height: d.logo + 4, background: lime, color: ink, fontSize: d.logo * 0.75 }}
      >
        G
      </span>
      {!compact && (
        <span
          className="font-black tracking-tight"
          style={{ fontSize: d.logo * 0.78, color: cream }}
        >
          GiGi
        </span>
      )}
    </div>
  );
}

const GNAV = [
  { key: "home", label: "Home", ico: "⌂" },
  { key: "shop", label: "Shop", ico: "▦" },
  { key: "cart", label: "Cart", ico: "▤" },
  { key: "account", label: "Account", ico: "◉" },
];

function BottomNav({ d, active }: { d: DSet; active: string }) {
  return (
    <div
      className="mt-auto shrink-0 border-t"
      style={{ borderColor: line, background: card }}
    >
      <div className="grid grid-cols-4">
        {GNAV.map(n => (
          <div
            key={n.key}
            className={`flex flex-col items-center py-2 ${active === n.key ? "" : "opacity-40"}`}
          >
            <span className="leading-none" style={{ fontSize: 14, color: cream }}>
              {n.ico}
            </span>
            <span className="mt-0.5 font-semibold" style={{ fontSize: d.navTxt, color: cream }}>
              {n.label}
            </span>
            {active === n.key && (
              <span className="mt-1 w-3 h-[2px] rounded-pill" style={{ background: lime }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- flavours ---------------- */

const FLAVOURS: { name: string; color: string; price: string; tag: string }[] = [
  { name: "Citrus Volt", color: lime, price: "120", tag: "Best seller" },
  { name: "Berry Blast", color: pink, price: "120", tag: "New" },
  { name: "Mango Rush", color: orange, price: "110", tag: "Fan pick" },
  { name: "Midnight Cola", color: "#4a4640", price: "110", tag: "Zero sugar" },
];

const CHIPS = ["All", "Zero sugar", "Caffeine+", "Limited"];

/* ---------------- storefront ---------------- */

function StorefrontContent({ v }: { v: GigiVariant }) {
  const d = D[v];

  if (v === "desktop") {
    return (
      <div className="h-full flex flex-col overflow-hidden" style={{ background: ink }}>
        <div className="flex items-center justify-between px-5 pt-2.5 pb-2 border-b shrink-0" style={{ borderColor: line }}>
          <Logo d={d} />
          <div className="flex items-center gap-4">
            {["Shop", "Flavours", "Events"].map((l, i) => (
              <span key={l} className="font-semibold" style={{ fontSize: d.navTxt, color: i === 0 ? lime : cream }}>
                {l}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span
              className="rounded-pill px-2.5 py-1 font-bold"
              style={{ background: lime, color: ink, fontSize: 9 }}
            >
              M-Pesa first
            </span>
            <div className="relative">
              <span className="grid place-items-center rounded-soft-sm" style={{ width: 30, height: 30, background: card, color: cream, fontSize: 13 }}>
                ▤
              </span>
              <span className="absolute -top-1 -right-1 rounded-pill grid place-items-center font-bold" style={{ width: 13, height: 13, background: orange, color: "#fff", fontSize: 7.5 }}>
                3
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 min-h-0 grid grid-cols-[1.2fr_1fr] px-5 pt-3 pb-2 gap-4">
          <div className="min-w-0 flex flex-col justify-center">
            <span
              className="inline-flex w-fit rounded-pill px-2 py-0.5 font-bold uppercase tracking-widest"
              style={{ fontSize: 7.5, background: "rgba(244,239,231,0.1)", color: lime }}
            >
              Nairobi-made · zero crash
            </span>
            <h1
              className="font-black tracking-tight leading-[0.92] mt-1.5"
              style={{ fontSize: d.display, color: cream }}
            >
              FUEL THE
              <br />
              <span style={{ color: lime }}>HUSTLE.</span>
            </h1>
            <p className="mt-1.5" style={{ fontSize: d.sub, color: muted }}>
              Bold energy drinks built for long days and loud playlists.
            </p>
            <div className="flex items-center gap-2 mt-2.5">
              <span
                className="rounded-pill font-black px-4 py-2"
                style={{ background: lime, color: ink, fontSize: 11 }}
              >
                Shop now — from KSh 110
              </span>
              <span className="font-semibold" style={{ fontSize: 9.5, color: cream }}>
                Free delivery over 1k
              </span>
            </div>
            <div className="flex items-center gap-3 mt-3">
              {["✓ M-Pesa", "✓ Card", "✓ AA contrast"].map(t => (
                <span key={t} className="font-semibold" style={{ fontSize: 8.5, color: muted }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div
            className="rounded-soft-sm relative overflow-hidden min-h-0"
            style={{ background: "linear-gradient(160deg, #f4efe7 0%, #e4d8c2 100%)" }}
          >
            <div className="absolute inset-x-0 top-0 flex items-center justify-between px-3 py-2">
              <span
                className="rounded-pill font-bold px-2 py-0.5"
                style={{ background: ink, color: lime, fontSize: 8 }}
              >
                NEW · Citrus Volt
              </span>
              <span className="font-black" style={{ fontSize: 13, color: ink }}>
                KSh 120
              </span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center pt-4">
              <Can color={lime} className="h-[78%]" />
            </div>
            <div className="absolute inset-x-0 bottom-0 px-3 pb-2 flex items-center justify-between">
              <div>
                <p className="font-black" style={{ fontSize: 12, color: ink }}>
                  Citrus Volt
                </p>
                <p style={{ fontSize: 8, color: ink, opacity: 0.65 }}>
                  24 cans · 250 ml
                </p>
              </div>
              <span
                className="rounded-pill font-black px-3 py-1.5"
                style={{ background: ink, color: lime, fontSize: 9 }}
              >
                + Add
              </span>
            </div>
          </div>
        </div>

        <div className="px-5 pb-2.5 shrink-0">
          <div className="flex items-baseline justify-between mb-1.5">
            <span className="font-bold uppercase tracking-wide" style={{ fontSize: 9, color: cream }}>
              Pick your flavour
            </span>
            <span className="font-semibold" style={{ fontSize: 9, color: lime }}>
              View all →
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {FLAVOURS.map(f => (
              <div key={f.name} className="rounded-soft-sm flex items-center gap-2 px-2 py-1.5" style={{ background: card, border: `1px solid ${line}` }}>
                <span className="shrink-0" style={{ width: 10, height: 10, borderRadius: 999, background: f.color }} />
                <p className="font-semibold truncate" style={{ fontSize: 9, color: cream }}>
                  {f.name}
                </p>
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
      style={{ background: ink }}
    >
      <Bar />
      <div className={`${d.pad} mt-0.5 flex items-center justify-between shrink-0`}>
        <Logo d={d} />
        <div className="relative">
          <span
            className="grid place-items-center rounded-soft-sm"
            style={{ width: d.tile - 6, height: d.tile - 6, background: card, color: cream, fontSize: d.base + 2 }}
          >
            ▤
          </span>
          <span
            className="absolute -top-1 -right-1 rounded-pill grid place-items-center font-bold"
            style={{ width: 15, height: 15, background: orange, color: "#fff", fontSize: 9 }}
          >
            3
          </span>
        </div>
      </div>

      <div className={`${d.pad} mt-1 shrink-0`}>
        <h1
          className="font-black tracking-tight leading-[0.92]"
          style={{ fontSize: d.display, color: cream }}
        >
          FUEL THE
          <br />
          <span style={{ color: lime }}>HUSTLE.</span>
        </h1>
        <p className="mt-1" style={{ fontSize: d.sub, color: muted }}>
          Nairobi-made energy. Zero crash.
        </p>
      </div>

      <div className={`${d.pad} mt-2 shrink-0`}>
        <div
          className="rounded-soft-sm relative overflow-hidden px-3 py-2 flex items-center gap-3"
          style={{ background: cream }}
        >
          <div className="flex-1 min-w-0">
            <span
              className="rounded-pill font-bold px-2 py-0.5 uppercase tracking-wider"
              style={{ background: ink, color: lime, fontSize: 7 }}
            >
              New · Citrus Volt
            </span>
            <p className="font-black mt-1" style={{ fontSize: d.title, color: ink }}>
              Citrus Volt
            </p>
            <p style={{ fontSize: d.small, color: ink, opacity: 0.6 }}>
              24 cans · KSh 2,880
            </p>
            <div className="flex items-center gap-2 mt-1.5">
              <span
                className="rounded-pill font-black px-3 py-1.5"
                style={{ background: ink, color: lime, fontSize: 9.5 }}
              >
                + Add — KSh 120
              </span>
            </div>
          </div>
          <Can color={lime} className="h-[86px] shrink-0" />
        </div>
      </div>

      <div className={`${d.pad} mt-2 shrink-0`}>
        <p className="font-bold uppercase tracking-wide mb-1.5" style={{ fontSize: d.label, color: cream }}>
          Pick your flavour
        </p>
        <div className="grid grid-cols-2 gap-2">
          {FLAVOURS.map(f => (
            <div key={f.name} className="rounded-soft-sm flex items-center gap-2 px-2 py-2" style={{ background: card, border: `1px solid ${line}` }}>
              <Can color={f.color} className="h-12 shrink-0" bolt={f.name !== "Midnight Cola"} />
              <div className="min-w-0">
                <p className="font-bold truncate" style={{ fontSize: d.base, color: cream }}>
                  {f.name}
                </p>
                <p className="font-semibold" style={{ fontSize: d.small, color: lime }}>
                  KSh {f.price}
                </p>
                <span
                  className="rounded-pill px-1.5 py-0.5 font-bold uppercase tracking-wider mt-0.5 inline-block"
                  style={{ fontSize: 6.5, background: f.color, color: ink }}
                >
                  {f.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav d={d} active="home" />
    </div>
  );
}

/* ---------------- flavours page ---------------- */

function FlavoursContent({ v }: { v: GigiVariant }) {
  const d = D[v];

  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ background: ink }}>
      <Bar />
      <div className={`${d.pad} mt-0.5 flex items-center justify-between shrink-0`}>
        <p className="font-black" style={{ fontSize: d.title, color: cream }}>
          Flavours
        </p>
        <span className="font-semibold" style={{ fontSize: d.small, color: lime }}>
          4 flavours · 250 ml
        </span>
      </div>

      <div className={`${d.pad} mt-1.5 shrink-0 overflow-hidden`}>
        <div className="flex items-center gap-1.5 overflow-hidden">
          {CHIPS.map((c, i) => (
            <span
              key={c}
              className="rounded-pill font-semibold whitespace-nowrap"
              style={{
                fontSize: d.small - 0.5,
                padding: "5px 11px",
                background: i === 0 ? lime : card,
                color: i === 0 ? ink : muted,
                border: `1px solid ${line}`,
              }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className={`${d.pad} mt-2 flex-1 min-h-0 overflow-hidden`}>
        <div className={v === "desktop" ? "grid grid-cols-4 gap-2" : v === "tablet" ? "grid grid-cols-2 gap-2" : "grid grid-cols-2 gap-2"}>
          {FLAVOURS.map(f => (
            <div key={f.name} className="rounded-soft-sm flex flex-col items-center pt-2 px-1.5 pb-1.5" style={{ background: card, border: `1px solid ${line}` }}>
              <div
                className="rounded-[10px] w-full grid place-items-center"
                style={{ background: "rgba(244,239,231,0.06)", height: v === "desktop" ? 92 : v === "tablet" ? 76 : 64 }}
              >
                <Can color={f.color} className={v === "desktop" ? "h-20" : "h-14"} bolt={f.name !== "Midnight Cola"} />
              </div>
              <p className="font-bold text-center truncate w-full mt-1" style={{ fontSize: v === "desktop" ? 9.5 : 9, color: cream }}>
                {f.name}
              </p>
              <p className="font-semibold" style={{ fontSize: v === "desktop" ? 9 : 8.5, color: lime }}>
                KSh {f.price}
              </p>
              <span
                className="rounded-pill w-full text-center font-bold py-1 mt-1"
                style={{ fontSize: v === "desktop" ? 8 : 7.5, background: f.color, color: ink }}
              >
                + Add
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={`${d.pad} pb-1 shrink-0`}>
        <p style={{ fontSize: d.small, color: muted }}>
          All text at ≥ 4.5:1 contrast — the brand stays loud, the palette stays safe.
        </p>
      </div>

      <BottomNav d={d} active="shop" />
    </div>
  );
}

/* ---------------- checkout ---------------- */

function CheckoutContent({ v }: { v: GigiVariant }) {
  const d = D[v];

  const steps = (
    <div className="flex items-center gap-1.5 shrink-0">
      {[["Cart", true], ["Details", true], ["Pay", false]].map(([l, done], i) => (
        <div key={l as string} className="flex items-center gap-1.5">
          <span
            className="rounded-pill grid place-items-center font-bold"
            style={{
              width: 20,
              height: 20,
              fontSize: 8.5,
              background: done ? lime : "rgba(244,239,231,0.14)",
              color: done ? ink : muted,
            }}
          >
            {done ? "✓" : i + 1}
          </span>
          <span className="font-semibold" style={{ fontSize: 8.5, color: done ? cream : muted }}>
            {l}
          </span>
          {i < 2 && <span className="w-4 h-[2px]" style={{ background: line }} />}
        </div>
      ))}
    </div>
  );

  const form = (
    <div className="space-y-1.5">
      <div className="rounded-soft-sm px-2.5 py-1.5" style={{ background: card, border: `1px solid ${line}` }}>
        <p className="uppercase tracking-wider font-bold" style={{ fontSize: 7, color: muted }}>
          Name
        </p>
        <p className="font-semibold" style={{ fontSize: d.base, color: cream }}>
          Mike Waitindi
        </p>
      </div>
      <div className="rounded-soft-sm px-2.5 py-1.5" style={{ background: card, border: `1px solid ${line}` }}>
        <p className="uppercase tracking-wider font-bold" style={{ fontSize: 7, color: muted }}>
          M-Pesa number
        </p>
        <p className="font-semibold" style={{ fontSize: d.base, color: cream }}>
          +254 712 345 678
        </p>
      </div>
      <div className="rounded-soft-sm px-2.5 py-1.5" style={{ background: card, border: `1px solid ${line}` }}>
        <p className="uppercase tracking-wider font-bold" style={{ fontSize: 7, color: muted }}>
          Delivery
        </p>
        <p className="font-semibold" style={{ fontSize: d.base, color: cream }}>
          Nairobi CBD · today, 1–4 pm
        </p>
      </div>
    </div>
  );

  const payment = (
    <div className="space-y-1.5">
      <div className="rounded-soft-sm px-2.5 py-2 flex items-center gap-2" style={{ background: "rgba(232,255,71,0.12)", border: `1.5px solid ${lime}` }}>
        <span className="rounded-pill grid place-items-center" style={{ width: 18, height: 18, background: lime }}>
          <span className="w-2 h-2 rounded-pill" style={{ background: ink }} />
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-bold" style={{ fontSize: d.base, color: cream }}>
            M-Pesa
          </p>
          <p style={{ fontSize: d.small, color: muted }}>
            Fastest · used by 8 in 10 shoppers
          </p>
        </div>
        <span className="font-semibold" style={{ fontSize: d.small, color: lime }}>
          Selected
        </span>
      </div>
      <div className="rounded-soft-sm px-2.5 py-2 flex items-center gap-2" style={{ background: card, border: `1px solid ${line}` }}>
        <span className="rounded-pill grid place-items-center shrink-0" style={{ width: 18, height: 18, border: `1.5px solid ${muted}` }} />
        <p className="font-semibold flex-1" style={{ fontSize: d.base, color: cream }}>
          Card
        </p>
        <span style={{ fontSize: d.small, color: muted }}>Visa · M-Pesa</span>
      </div>
    </div>
  );

  const summary = (
    <div className="rounded-soft-sm px-2.5 py-2" style={{ background: card, border: `1px solid ${line}` }}>
      <p className="font-bold uppercase tracking-wide mb-1.5" style={{ fontSize: 8, color: muted }}>
        Order
      </p>
      {[
        ["Citrus Volt × 2", "240"],
        ["Berry Blast × 1", "120"],
        ["Delivery", "FREE"],
      ].map(([l, p]) => (
        <div key={l} className="flex items-center justify-between py-1">
          <span style={{ fontSize: d.base, color: cream }}>{l}</span>
          <span className="font-semibold" style={{ fontSize: d.base, color: muted }}>
            KSh {p}
          </span>
        </div>
      ))}
      <div className="border-t mt-1.5 pt-1.5 flex items-center justify-between" style={{ borderColor: line }}>
        <span className="font-bold" style={{ fontSize: d.base + 1, color: cream }}>
          Total
        </span>
        <span className="font-black" style={{ fontSize: d.price, color: lime }}>
          KSh 360
        </span>
      </div>
    </div>
  );

  if (v === "desktop") {
    return (
      <div className="h-full flex flex-col overflow-hidden" style={{ background: ink }}>
        <div className="flex items-center justify-between px-5 pt-2.5 pb-2 border-b shrink-0" style={{ borderColor: line }}>
          <Logo d={d} compact />
          {steps}
          <span className="font-semibold" style={{ fontSize: 9, color: muted }}>
            Secure · 256-bit
          </span>
        </div>
        <div className="flex-1 min-h-0 px-5 py-3 grid grid-cols-[1.25fr_1fr] gap-3">
          <div className="min-w-0 flex flex-col">
            <p className="font-black mb-1.5" style={{ fontSize: 14, color: cream }}>
              Delivery details
            </p>
            {form}
            <p className="font-black mt-2.5 mb-1.5" style={{ fontSize: 14, color: cream }}>
              Payment
            </p>
            {payment}
          </div>
          <div className="min-w-0 flex flex-col gap-2">
            {summary}
            <div
              className="rounded-soft-sm py-2.5 text-center font-black flex items-center justify-center gap-1.5"
              style={{ background: lime, color: ink, fontSize: 11 }}
            >
              🔒 Pay KSh 360 with M-Pesa
            </div>
            <p className="text-center" style={{ fontSize: 8.5, color: muted }}>
              Padlock · encrypted · instant confirmation
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ background: ink }}>
      <Bar />
      <div className={`${d.pad} mt-0.5 shrink-0`}>
        <p className="font-black" style={{ fontSize: d.title, color: cream }}>
          Checkout
        </p>
        {steps}
      </div>

      <div className={`${d.pad} mt-2 flex-1 min-h-0 overflow-hidden flex flex-col ${d.gap}`}>
        <p className="font-bold uppercase tracking-wide" style={{ fontSize: d.label, color: muted }}>
          Delivery details
        </p>
        {form}
        <p className="font-bold uppercase tracking-wide" style={{ fontSize: d.label, color: muted }}>
          Payment
        </p>
        {payment}
        {summary}
      </div>

      <div className={`${d.pad} pb-1.5 shrink-0`}>
        <div
          className="rounded-soft-sm py-2.5 text-center font-black flex items-center justify-center gap-1.5"
          style={{ background: lime, color: ink, fontSize: d.base + 1 }}
        >
          <span style={{ fontSize: d.base }}>🔒</span> Pay KSh 360 with M-Pesa
        </div>
        <p className="text-center mt-1" style={{ fontSize: d.small, color: muted }}>
          Padlock · encrypted · instant
        </p>
      </div>
    </div>
  );
}

/* ---------------- events ---------------- */

const EVENTS: [string, string, string, string][] = [
  ["SAT 14", "JULY", "Volt Block Party", "Uhuru Park · 4pm"],
  ["FRI 20", "JULY", "Berry Blast Fridays", "Terra Club · 9pm"],
  ["SUN 22", "JULY", "Mango Rush Run", "Karura Forest · 7am"],
];

function EventsContent({ v }: { v: GigiVariant }) {
  const d = D[v];

  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ background: ink }}>
      <Bar />
      <div className={`${d.pad} mt-0.5 flex items-center justify-between shrink-0`}>
        <p className="font-black" style={{ fontSize: d.title, color: cream }}>
          Events
        </p>
        <span className="font-semibold" style={{ fontSize: d.small, color: lime }}>
          Free entry
        </span>
      </div>

      <div className={`${d.pad} mt-2 flex-1 min-h-0 overflow-hidden ${d.gap} flex flex-col`}>
        {EVENTS.map(([day, month, name, venue], i) => (
          <div
            key={name}
            className="rounded-soft-sm px-3 py-2 flex items-center gap-3"
            style={{ background: card, border: `1px solid ${line}` }}
          >
            <div
              className="rounded-soft-sm flex flex-col items-center justify-center shrink-0 text-center"
              style={{ width: d.tile + 4, height: d.tile + 4, background: i === 0 ? lime : "rgba(244,239,231,0.08)" }}
            >
              <span className="font-black leading-none" style={{ fontSize: d.base + 2, color: i === 0 ? ink : cream }}>
                {day}
              </span>
              <span className="font-semibold tracking-widest" style={{ fontSize: 6.5, color: i === 0 ? ink : muted }}>
                {month}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold truncate" style={{ fontSize: d.base + 0.5, color: cream }}>
                {name}
              </p>
              <p className="truncate" style={{ fontSize: d.small, color: muted }}>
                {venue}
              </p>
            </div>
            <span
              className="rounded-pill font-bold px-2 py-1 shrink-0"
              style={{ fontSize: 7.5, background: "rgba(255,90,31,0.2)", color: orange }}
            >
              RSVP
            </span>
          </div>
        ))}

        <div
          className="rounded-soft-sm px-3 py-2 flex items-center justify-between"
          style={{ background: "linear-gradient(120deg, #ff5a1f, #ff2d78)" }}
        >
          <div>
            <p className="font-black" style={{ fontSize: d.base + 1, color: "#fff" }}>
              Host with GiGi
            </p>
            <p style={{ fontSize: d.small, color: "rgba(255,255,255,0.85)" }}>
              Free cooler + merch for campus fests
            </p>
          </div>
          <span className="rounded-pill font-black px-3 py-1.5" style={{ background: "#fff", color: ink, fontSize: 9 }}>
            Apply →
          </span>
        </div>
      </div>

      <BottomNav d={d} active="account" />
    </div>
  );
}

/* ---------------- public API ---------------- */

function ContentFor({ v, screen }: { v: GigiVariant; screen: GigiScreenName }) {
  if (screen === "flavours") return <FlavoursContent v={v} />;
  if (screen === "checkout") return <CheckoutContent v={v} />;
  if (screen === "events") return <EventsContent v={v} />;
  return <StorefrontContent v={v} />;
}

export function GigiScreen({
  variant,
  screen = "storefront",
  className = "",
}: {
  variant: GigiVariant;
  screen?: GigiScreenName;
  className?: string;
}) {
  const design = DESIGN[variant];
  return (
    <div
      className={`h-full w-full overflow-hidden ${className}`}
      role="img"
      aria-label={`GiGi Energy — ${screen} screen (${variant} view)`}
    >
      <FitCanvas designW={design.w} designH={design.h}>
        <ContentFor v={variant} screen={screen} />
      </FitCanvas>
    </div>
  );
}

const SCREEN_NOTES: Record<GigiScreenName, string> = {
  storefront: "Loud brand, legible containers — display type carries the hierarchy.",
  flavours: "One accent per can; every product card passes the AA contrast bar.",
  checkout: "Three steps, M-Pesa first — address + delivery merged into one form.",
  events: "The brand voice, containerised — events stay loud without hurting the eyes.",
};

export function GigiShowcase({
  screen = "storefront",
  title = "Hi-fi concept — one design, three viewports",
  live,
}: {
  screen?: GigiScreenName;
  title?: string;
  live?: boolean;
}) {
  return (
    <DeviceShowcaseFigure
      title={title}
      meta="mobile · tablet · desktop"
      note={SCREEN_NOTES[screen]}
      live={live}
      phone={<GigiScreen variant="mobile" screen={screen} />}
      tablet={<GigiScreen variant="tablet" screen={screen} />}
      desktop={<GigiScreen variant="desktop" screen={screen} />}
      phoneClassName="w-[120px]"
      tabletClassName="w-[158px]"
      desktopClassName="w-[300px]"
    />
  );
}

export function GigiShots({
  title = "Concept screens — one design, three viewports",
}: {
  title?: string;
}) {
  const shots: { name: string; screen: GigiScreenName }[] = [
    { name: "Storefront", screen: "storefront" },
    { name: "Flavours", screen: "flavours" },
    { name: "Checkout", screen: "checkout" },
    { name: "Events", screen: "events" },
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
            phone={<GigiScreen variant="mobile" screen={s.screen} />}
            tablet={<GigiScreen variant="tablet" screen={s.screen} />}
            desktop={<GigiScreen variant="desktop" screen={s.screen} />}
          />
        ))}
      </div>
    </figure>
  );
}
