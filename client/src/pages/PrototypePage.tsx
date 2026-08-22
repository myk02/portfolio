import { useState } from "react";
import { Link, useParams } from "wouter";
import SiteHead from "@/components/SiteHead";
import { ArrowLeft, Plus, Check } from "lucide-react";
import { FlaskConical } from "lucide-react";

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-[300px] rounded-[28px] bg-[#141310] p-[10px] border border-foreground/20 shadow-[0_24px_60px_rgba(20,19,16,0.28)]">
      <div className="relative overflow-hidden rounded-[20px] bg-[#f4efe7] aspect-[9/19]">
        <span
          aria-hidden
          className="absolute top-2 left-1/2 -translate-x-1/2 z-10 w-16 h-1.5 rounded-full bg-[#141310]/25"
        />
        <div className="absolute inset-0 overflow-y-auto pt-7 px-4 pb-4">{children}</div>
      </div>
    </div>
  );
}

function BankingPrototype() {
  const [saved, setSaved] = useState(2400);
  const goal = 5000;
  const pct = Math.min(100, Math.round((saved / goal) * 100));
  const [sheet, setSheet] = useState(false);

  return (
    <PhoneFrame>
      <div className="flex flex-col gap-4 h-full">
        <div className="flex items-center justify-between">
          <p className="font-display font-bold text-foreground text-lg">Hi Amina</p>
          <span className="w-8 h-8 rounded-full bg-foreground/10 grid place-items-center text-[10px] font-bold text-foreground">
            A
          </span>
        </div>

        <div className="rounded-2xl bg-foreground text-background p-4">
          <p className="text-[10px] font-mono uppercase tracking-widest opacity-70">Balance</p>
          <p className="font-display font-black text-2xl">Ksh {(saved + 12000).toLocaleString()}</p>
        </div>

        <div className="rounded-2xl border border-foreground/15 bg-card p-4 flex items-center gap-3">
          <div className="relative w-16 h-16 shrink-0">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <circle cx="18" cy="18" r="15" fill="none" stroke="#141310" strokeOpacity="0.12" strokeWidth="4" />
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke="#e8ff47"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${(pct / 100) * 2 * Math.PI * 15} ${2 * Math.PI * 15}`}
              />
            </svg>
            <span className="absolute inset-0 grid place-items-center text-[9px] font-bold text-foreground">
              {pct}%
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-mono uppercase tracking-widest text-foreground/70">
              Save goal · {pct}%
            </p>
            <p className="text-sm font-semibold text-foreground">Ksh {saved.toLocaleString()} / 5,000</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setSheet(true)}
          className="w-full bg-accent text-accent-foreground py-2.5 text-sm font-semibold flex items-center justify-center gap-1.5"
        >
          <Plus size={15} aria-hidden /> Quick save
        </button>

        <div className="mt-auto grid grid-cols-3 gap-2 text-center">
          {["Send", "Pay", "More"].map((t) => (
            <div key={t} className="border border-foreground/15 py-2 text-[11px] text-foreground">
              {t}
            </div>
          ))}
        </div>
      </div>

      {sheet && (
        <div className="absolute inset-0 bg-foreground/40 grid place-items-end" onClick={() => setSheet(false)}>
          <div
            className="w-full bg-card border-t-2 border-foreground/30 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-[10px] font-mono uppercase tracking-widest text-foreground/70 mb-2">
              Save when you're paid
            </p>
            <div className="flex gap-2">
              {[500, 1000, 2000].map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => {
                    setSaved((s) => s + a);
                    setSheet(false);
                  }}
                  className="flex-1 border border-foreground/20 py-2 text-xs font-semibold text-foreground hover:bg-foreground hover:text-background transition-colors"
                >
                  +{a}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </PhoneFrame>
  );
}

function DashboardPrototype() {
  const [dense, setDense] = useState(false);
  const [selected, setSelected] = useState<number | null>(2);
  const rows = [
    { name: "Nairobi–Mombasa lane", status: "On track", delta: "+4%" },
    { name: "Kisumu feeder", status: "Exception", delta: "−12%" },
    { name: "Eldoret hub", status: "On track", delta: "+1%" },
    { name: "Nakuru loop", status: "Review", delta: "0%" },
    { name: "Coast corridor", status: "On track", delta: "+7%" },
    { name: "Rift express", status: "Exception", delta: "−3%" },
  ];
  const visible = dense ? rows : rows.slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-md border border-border bg-card p-4">
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { k: "Throughput", v: "1.2k", d: "+8%" },
          { k: "Exceptions", v: "2", d: "live" },
          { k: "On-time", v: "94%", d: "+2%" },
        ].map((c) => (
          <div key={c.k} className="border border-border bg-secondary p-3">
            <p className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">{c.k}</p>
            <p className="font-display font-black text-foreground text-xl leading-none mt-1">{c.v}</p>
            <p className="text-[10px] text-accent mt-1">{c.d}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-2">
        <p className="text-[10px] font-mono uppercase tracking-widest text-foreground/70">
          Lanes {dense ? "· 2× rows" : "· 1× rows"}
        </p>
        <button
          type="button"
          onClick={() => setDense((d) => !d)}
          className="text-[10px] font-mono uppercase tracking-widest border border-foreground/30 px-2 py-1 text-foreground hover:bg-foreground hover:text-background transition-colors"
        >
          {dense ? "1×" : "2×"} density
        </button>
      </div>

      <div className="border border-border">
        {visible.map((r, i) => {
          const isSel = selected === i;
          const isEx = r.status === "Exception";
          return (
            <button
              key={r.name}
              type="button"
              onClick={() => setSelected(isSel ? null : i)}
              className={`w-full text-left px-3 py-2 border-b border-border flex items-center justify-between gap-2 ${
                isEx ? "bg-[#e8ff47]/15" : ""
              } ${isSel ? "outline outline-2 outline-offset-[-2px] outline-[var(--accent)]" : ""}`}
            >
              <span className="text-[12px] text-foreground truncate">{r.name}</span>
              <span
                className={`text-[10px] font-mono uppercase tracking-wider shrink-0 ${
                  isEx ? "text-foreground font-bold" : "text-muted-foreground"
                }`}
              >
                {r.status}
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-2 text-[10px] text-muted-foreground">
        Exception row is visible without reading (lime tint). Click a row to select it.
      </p>
    </div>
  );
}

function DesignSystemPrototype() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (t: string) => {
    navigator.clipboard?.writeText(t).then(() => {
      setCopied(t);
      window.setTimeout(() => setCopied(null), 1200);
    });
  };
  const scale = [
    { n: "Display", s: "2.6rem", w: "font-black" },
    { n: "H1", s: "1.9rem", w: "font-bold" },
    { n: "H2", s: "1.4rem", w: "font-bold" },
    { n: "Body", s: "1rem", w: "font-normal" },
    { n: "Caption", s: "0.8rem", w: "font-normal" },
  ];
  const tokens = ["#141310", "#f4efe7", "#e8ff47", "#8a867e"];

  return (
    <div className="mx-auto w-full max-w-md space-y-5 border border-border bg-card p-4">
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
          Buttons · 3 styles × states
        </p>
        <div className="flex flex-wrap gap-2">
          <button className="bg-foreground text-background px-3 py-1.5 text-sm font-semibold">Primary</button>
          <button className="border border-foreground/40 px-3 py-1.5 text-sm">Secondary</button>
          <button className="border border-transparent px-3 py-1.5 text-sm text-foreground underline underline-offset-4">
            Ghost
          </button>
          <button disabled className="bg-foreground/20 text-foreground/40 px-3 py-1.5 text-sm">
            Disabled
          </button>
        </div>
      </div>

      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
          Type scale · 5 steps
        </p>
        <div className="space-y-1">
          {scale.map((t) => (
            <p key={t.n} className={`text-foreground ${t.w}`} style={{ fontSize: t.s }}>
              {t.n}
            </p>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
          Color tokens
        </p>
        <div className="flex gap-2">
          {tokens.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => copy(c)}
              className="w-12 h-12 rounded-full border border-foreground/15 relative"
              style={{ background: c }}
              aria-label={`Copy ${c}`}
            >
              {copied === c && (
                <span className="absolute inset-0 grid place-items-center">
                  <Check size={16} className="text-white" />
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const PROTOS: Record<
  string,
  {
    title: string;
    render: () => React.ReactNode;
    demonstrates: { label: string; text: string }[];
  }
> = {
  "mobile-banking-redesign": {
    title: "Mobile banking — savings-first",
    render: () => <BankingPrototype />,
    demonstrates: [
      {
        label: "Interaction",
        text: "Quick save opens a bottom sheet; tapping an amount updates balance and progress in place.",
      },
      {
        label: "State",
        text: "The goal ring percentage is derived from a single saved-amount value — one source of truth across the screen.",
      },
      {
        label: "Focus behavior",
        text: "All controls are native buttons — keyboard-focusable with visible browser focus outlines.",
      },
      {
        label: "Responsive scope",
        text: "Fixed 300px frame by design: it demos one mobile viewport, not a responsive layout.",
      },
    ],
  },
  "dashboard-ui-system": {
    title: "Ops dashboard — dense, scannable",
    render: () => <DashboardPrototype />,
    demonstrates: [
      {
        label: "Component variants",
        text: "Density toggle switches the table between 1× and 2× row heights without re-layout of KPI cards.",
      },
      {
        label: "Row states",
        text: "Exception rows carry a lime tint plus a bold text status — color never carries meaning alone.",
      },
      {
        label: "Keyboard behavior",
        text: "Rows are real buttons: Tab through them, Enter to select, visible outline marks the selected row.",
      },
      {
        label: "Responsive scope",
        text: "Single-column demo panel; the full three-tier layout is specified in the case study.",
      },
    ],
  },
  "design-system-creation": {
    title: "Design system — tokens & components",
    render: () => <DesignSystemPrototype />,
    demonstrates: [
      {
        label: "Component variants",
        text: "Three button styles shown across default and disabled states, exactly as spec'd in the study.",
      },
      {
        label: "Token application",
        text: "Type scale and color swatches render from the same token values documented in the case study.",
      },
      {
        label: "Feedback pattern",
        text: "Copy-to-clipboard on each swatch shows a transient confirmation state — a micro-interaction done accessibly.",
      },
      {
        label: "Focus behavior",
        text: "Swatches are labeled buttons (aria-label carries the hex) so screen readers announce the action.",
      },
    ],
  },
};

export default function PrototypePage() {
  const { slug } = useParams();
  const proto = PROTOS[slug ?? ""];

  if (!proto) {
    return (
      <div className="min-h-screen grid place-items-center bg-background px-6 text-center">
        <div>
          <p className="font-display font-black text-foreground text-3xl">Prototype not found</p>
          <Link href="/work" className="mt-4 inline-block text-sm underline text-foreground">
            Back to work
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHead
        title={`${proto.title} — interactive prototype | Mike Waitindi`}
        description="Interactive concept prototype showing the key interaction decisions from the case study."
        canonical={`/work/${slug}/prototype`}
        type="article"
      />
      <div className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6">
          <Link
            href={`/work/${slug}`}
            className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={13} aria-hidden /> Back to case study
          </Link>
          <h1 className="mt-3 font-display font-black text-foreground text-3xl sm:text-4xl tracking-tight">
            {proto.title}
          </h1>
          <aside className="mt-3 inline-flex items-center gap-2 border border-border border-l-4 border-l-accent bg-card px-3 py-2">
            <FlaskConical size={14} aria-hidden className="text-foreground" />
            <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
              Interactive concept · not a live product
            </p>
          </aside>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
          <div>{proto.render()}</div>

          {/* WHAT THIS DEMONSTRATES — recruiter-readable proof panel */}
          <aside
            aria-labelledby="demonstrates-heading"
            className="border border-dashed border-border bg-card p-5"
          >
            <h2
              id="demonstrates-heading"
              className="text-xs font-mono uppercase tracking-widest text-accent mb-4"
            >
              What this demonstrates
            </h2>
            <dl className="space-y-4">
              {proto.demonstrates.map(d => (
                <div key={d.label}>
                  <dt className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
                    {d.label}
                  </dt>
                  <dd className="text-[13px] text-foreground/90 leading-snug">
                    {d.text}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
        <p className="mt-8 text-center text-xs text-muted-foreground max-w-md mx-auto">
          Tap through the screens. This is a clickable mock-up built to show the interaction
          decisions described in the case study.
        </p>
      </div>
    </div>
  );
}
