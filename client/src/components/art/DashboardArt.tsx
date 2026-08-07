const ink = "#141310";
const panel = "#1b1917";
const fg = "#f2ede6";
const muted = "#9b9890";
const lime = "#e8ff47";

function Kpi({
  label,
  value,
  delta,
  up,
}: {
  label: string;
  value: string;
  delta: string;
  up: boolean;
}) {
  return (
    <div className="rounded-soft-sm p-2 border border-white/10" style={{ background: panel }}>
      <p className="text-[7px] uppercase tracking-wide" style={{ color: muted }}>
        {label}
      </p>
      <p className="text-[13px] font-bold tracking-tight mt-0.5" style={{ color: fg }}>
        {value}
      </p>
      <p className="text-[7px] font-semibold" style={{ color: up ? "#3ddc84" : "#ff6b6b" }}>
        {delta}
      </p>
    </div>
  );
}

export default function DashboardArt({ className = "" }: { className?: string }) {
  const nav = ["Overview", "Reports", "Teams", "Automations", "Billing", "Settings"];
  return (
    <div
      className={`w-full rounded-soft overflow-hidden border border-white/10 text-left ${className}`}
      style={{ background: ink, boxShadow: "0 24px 60px -24px rgba(20,19,16,0.5)" }}
      role="img"
      aria-label="Dashboard UI system — sidebar, KPI cards, trend chart, and data table"
    >
      <div className="flex">
        <div className="w-[92px] shrink-0 border-r border-white/10 p-2 hidden sm:block">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-[3px] flex items-center justify-center text-[6px] font-black" style={{ background: lime, color: ink }}>
              O
            </div>
            <span className="text-[8px] font-bold" style={{ color: fg }}>OSS</span>
          </div>
          <div className="mt-3 space-y-1.5">
            {nav.map((item, i) => (
              <div
                key={item}
                className="flex items-center gap-1.5 px-1.5 py-[3px] rounded-[4px]"
                style={{
                  background: i === 0 ? lime : "transparent",
                  color: i === 0 ? ink : muted,
                }}
              >
                <span className="w-1 h-1 rounded-pill" style={{ background: i === 0 ? ink : "currentColor", opacity: i === 0 ? 1 : 0.5 }} />
                <span className="text-[7px] font-semibold">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 min-w-0 p-2.5 sm:p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold" style={{ color: fg }}>Operations overview</p>
              <p className="text-[7px]" style={{ color: muted }}>Exceptions surfaced · Updated 2 min ago</p>
            </div>
            <div className="flex gap-1">
              {["7D", "30D", "QTR"].map((p, i) => (
                <span
                  key={p}
                  className="px-1.5 py-[2px] rounded-pill text-[6.5px] font-bold"
                  style={{
                    background: i === 1 ? lime : "rgba(242,237,230,0.08)",
                    color: i === 1 ? ink : muted,
                  }}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mt-2">
            <Kpi label="Revenue" value="KSh 2.4M" delta="+12.4% vs prev" up />
            <Kpi label="Active users" value="18,204" delta="+8.1% vs prev" up />
            <Kpi label="Escalations" value="36" delta="−14.2% vs prev" up />
            <Kpi label="Conversion" value="3.2%" delta="−0.4% vs prev" up={false} />
          </div>

          <div className="mt-2 rounded-soft-sm border border-white/10 p-2" style={{ background: panel }}>
            <div className="flex items-center justify-between">
              <p className="text-[7.5px] font-bold" style={{ color: fg }}>Exceptions · last 30 days</p>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-pill" style={{ background: lime }} />
                <span className="text-[6.5px]" style={{ color: muted }}>Escalated</span>
              </div>
            </div>
            <svg viewBox="0 0 300 64" className="w-full h-auto mt-1" preserveAspectRatio="none" aria-hidden>
              <defs>
                <linearGradient id="dashArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={lime} stopOpacity="0.35" />
                  <stop offset="100%" stopColor={lime} stopOpacity="0" />
                </linearGradient>
              </defs>
              {[12, 24, 36, 48].map((y) => (
                <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="rgba(242,237,230,0.07)" strokeWidth="1" />
              ))}
              <path
                d="M0 44 L30 40 L60 42 L90 34 L120 36 L150 26 L180 30 L210 20 L240 24 L270 14 L300 18 L300 64 L0 64 Z"
                fill="url(#dashArea)"
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

          <div className="mt-2 rounded-soft-sm border border-white/10 overflow-hidden" style={{ background: panel }}>
            <div className="grid grid-cols-[1fr_1.4fr_0.8fr_0.6fr] px-2 py-1 border-b border-white/10 text-[6.5px] font-bold uppercase tracking-wide" style={{ color: muted }}>
              <span>Case</span>
              <span>Route</span>
              <span>Owner</span>
              <span>Status</span>
            </div>
            {[
              ["#4821", "M-Pesa → savings · failed retry", "A. Njeri", "Escalated"],
              ["#4820", "Card chargeback · duplicate", "M. Otieno", "Open"],
              ["#4819", "Goal deposit · amount mismatch", "J. Wambui", "Open"],
              ["#4818", "PIN reset · fraud check", "A. Njeri", "Resolved"],
            ].map(([id, route, owner, status]) => (
              <div key={id} className="grid grid-cols-[1fr_1.4fr_0.8fr_0.6fr] px-2 py-[5px] border-b border-white/5 text-[7px] items-center">
                <span className="font-mono font-bold" style={{ color: fg }}>{id}</span>
                <span className="truncate pr-1" style={{ color: muted }}>{route}</span>
                <span style={{ color: muted }}>{owner}</span>
                <span
                  className="justify-self-start px-1 py-[1px] rounded-pill text-[6px] font-bold uppercase"
                  style={{
                    background:
                      status === "Escalated" ? lime : status === "Open" ? "rgba(255,107,107,0.15)" : "rgba(61,220,132,0.15)",
                    color: status === "Escalated" ? ink : status === "Open" ? "#ff8f8f" : "#3ddc84",
                  }}
                >
                  {status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
