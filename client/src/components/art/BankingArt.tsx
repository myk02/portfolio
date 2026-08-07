import { motion } from "framer-motion";

const ink = "#141310";
const muted = "#8a867e";

function PhoneFrame({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`relative rounded-[24px] bg-[#141310] p-[6px] border border-[rgba(20,19,16,0.1)] shadow-[0_24px_48px_rgba(20,19,16,0.12)] ${className}`}
      style={style}
    >
      <div
        className="relative overflow-hidden rounded-[18px] bg-[#f4efe7]"
        style={{ aspectRatio: "9/17" }}
      >
        {children}
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-3 pt-2 text-[7px] font-semibold" style={{ color: ink }}>
      <span>9:41</span>
      <div className="flex items-center gap-1">
        <svg width="8" height="6" viewBox="0 0 8 6" fill={ink}>
          <rect x="0" y="3" width="1.6" height="3" />
          <rect x="2.2" y="1.8" width="1.6" height="4.2" />
          <rect x="4.4" y="0.6" width="1.6" height="5.4" />
          <rect x="6.6" y="0" width="1.4" height="6" fill={muted} />
        </svg>
        <svg width="9" height="6" viewBox="0 0 9 6" fill="none" stroke={ink} strokeWidth="1">
          <rect x="0.5" y="0.5" width="8" height="5" rx="1" />
          <path d="M6.5 2v2M7.4 2.4v1.2" stroke={ink} strokeWidth="0.8" />
        </svg>
      </div>
    </div>
  );
}

function OnboardingScreen() {
  return (
    <div className="flex flex-col h-full">
      <StatusBar />
      <div className="px-3 mt-2">
        <p className="text-[8px] font-medium" style={{ color: muted }}>STEP 2 OF 4</p>
        <p className="text-[11px] font-bold mt-0.5" style={{ color: ink }}>
          Verify your number
        </p>
        <div className="flex gap-1 mt-1.5">
          <div className="h-[3px] flex-1 rounded-pill bg-[#e8ff47]" />
          <div className="h-[3px] flex-1 rounded-pill bg-[#141310] opacity-20" />
          <div className="h-[3px] flex-1 rounded-pill bg-[#141310] opacity-20" />
          <div className="h-[3px] flex-1 rounded-pill bg-[#141310] opacity-20" />
        </div>
      </div>
      <div className="px-3 mt-3">
        <div className="border rounded-[6px] px-2 py-1.5 flex items-center justify-between border-[#141310]/20">
          <span className="text-[9px]" style={{ color: muted }}>+254 712 345 678</span>
          <span className="text-[8px] font-semibold" style={{ color: ink }}>EDIT</span>
        </div>
        <div className="mt-2 rounded-[6px] bg-[#141310] py-1.5 text-center">
          <span className="text-[9px] font-bold text-[#f4efe7]">Send code</span>
        </div>
        <p className="mt-2 text-[7.5px] leading-relaxed" style={{ color: muted }}>
          We'll text a 6-digit code. No documents needed yet.
        </p>
      </div>
    </div>
  );
}

function DashboardScreen() {
  return (
    <div className="flex flex-col h-full">
      <StatusBar />
      <div className="px-3 mt-2">
        <p className="text-[10px] font-bold" style={{ color: ink }}>
          Habari, Mike
        </p>
        <p className="text-[8px]" style={{ color: muted }}>Good morning · Jambo</p>
      </div>

      <div className="px-3 mt-2">
        <div className="rounded-[8px] bg-[#141310] p-2.5">
          <div className="flex items-center justify-between">
            <p className="text-[7.5px] text-[#f4efe7]/60 font-medium">TOTAL BALANCE</p>
            <svg width="8" height="6" viewBox="0 0 8 6" fill="none" stroke="#e8ff47" strokeWidth="0.9">
              <path d="M.8 5.2 3 2.8l1.4 1.4L7.2.8" />
              <path d="M5.4.8H7.2v1.8" />
            </svg>
          </div>
          <p className="text-[16px] font-bold tracking-tight text-[#f4efe7] mt-0.5">
            KSh 24,580
            <span className="text-[#f4efe7]/60 text-[10px]">.00</span>
          </p>
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="text-[6.5px] font-bold text-[#141310] bg-[#e8ff47] rounded-pill px-1 py-[1px]">
              +12.4%
            </span>
            <span className="text-[6.5px] text-[#f4efe7]/50">vs last month</span>
          </div>
        </div>
      </div>

      <div className="px-3 mt-2 flex items-center gap-2">
        <div className="relative w-9 h-9 shrink-0">
          <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
            <circle cx="18" cy="18" r="15" fill="none" stroke="#141310" strokeOpacity="0.1" strokeWidth="3.5" />
            <circle
              cx="18"
              cy="18"
              r="15"
              fill="none"
              stroke="#e8ff47"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray={`${0.68 * 2 * Math.PI * 15} ${2 * Math.PI * 15}`}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[7px] font-bold" style={{ color: ink }}>
            68%
          </span>
        </div>
        <div className="min-w-0">
          <p className="text-[9px] font-bold truncate" style={{ color: ink }}>
            Trip to Mombasa
          </p>
          <p className="text-[7.5px]" style={{ color: muted }}>KSh 34,000 of 50,000 · +500</p>
        </div>
      </div>

      <div className="px-3 mt-2">
        <div className="grid grid-cols-4 gap-1">
          {[
            ["Tuma", "➜"],
            ["Lipa", "▣"],
            ["Airtime", "⌁"],
            ["More", "⋯"],
          ].map(([label, glyph]) => (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <div
                className="w-6 h-6 rounded-[6px] flex items-center justify-center text-[8px] font-bold"
                style={{ background: "rgba(20,19,16,0.07)", color: ink }}
              >
                {glyph}
              </div>
              <span className="text-[6.5px] font-semibold" style={{ color: ink }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-3 mt-2 pb-3 flex-1">
        <p className="text-[7px] font-bold uppercase tracking-wide" style={{ color: muted }}>
          Recent
        </p>
        <div className="mt-1 space-y-1">
          {[
            ["Gig payment", "Job · Upwork", "+KSh 1,800", true],
            ["Chai Point", "Nairobi CBD", "−KSh 120", false],
            ["Round-up save", "Auto · Goals", "+KSh 45", true],
          ].map(([title, sub, amount, pos]) => (
            <div key={title as string} className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-[4px] flex items-center justify-center text-[6px] bg-[#141310]/[0.07]" style={{ color: ink }}>
                {pos ? "↗" : "↙"}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[7.5px] font-semibold truncate" style={{ color: ink }}>{title}</p>
                <p className="text-[6.5px] truncate" style={{ color: muted }}>{sub}</p>
              </div>
              <span className="text-[7.5px] font-bold" style={{ color: pos ? "#1a7f37" : ink }}>
                {amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BankingArt({ className = "" }: { className?: string }) {
  return (
    <div className={`relative h-[320px] sm:h-[350px] w-full max-w-[420px] mx-auto ${className}`} role="img" aria-label="Youth mobile banking redesign — verification and dashboard screens">
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-0 sm:left-[4%] top-1/2 -translate-y-1/2 rotate-[2deg] z-0 w-[150px]"
      >
        <PhoneFrame>
          <OnboardingScreen />
        </PhoneFrame>
      </motion.div>

      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute right-0 sm:right-[6%] top-1/2 -translate-y-1/2 rotate-[-2deg] z-10 w-[176px]"
      >
        <PhoneFrame>
          <DashboardScreen />
        </PhoneFrame>
      </motion.div>
    </div>
  );
}
