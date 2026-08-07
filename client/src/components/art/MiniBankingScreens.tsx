const ink = "#141310";
const muted = "#8a867e";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-[170px] mx-auto rounded-[22px] bg-[#141310] p-[5px] border border-[rgba(20,19,16,0.1)] shadow-[0_16px_32px_rgba(20,19,16,0.14)]">
      <div className="relative overflow-hidden rounded-[16px] bg-[#f4efe7]" style={{ aspectRatio: "9/17" }}>
        {children}
      </div>
    </div>
  );
}

function Bar() {
  return (
    <div className="flex items-center justify-between px-2.5 pt-1.5 text-[6px] font-semibold" style={{ color: ink }}>
      <span>9:41</span>
      <span className="flex gap-[3px]">
        <span className="w-2.5 h-1 rounded-pill bg-[#141310] opacity-70" />
        <span className="w-2.5 h-1 rounded-pill bg-[#141310] opacity-30" />
      </span>
    </div>
  );
}

function ScreenOnboarding() {
  return (
    <div className="flex flex-col h-full">
      <Bar />
      <div className="px-2.5 mt-1.5">
        <p className="text-[6px] font-medium" style={{ color: muted }}>STEP 2 OF 4</p>
        <p className="text-[9px] font-bold mt-0.5" style={{ color: ink }}>Verify your number</p>
        <div className="flex gap-[3px] mt-1">
          <div className="h-[3px] flex-1 rounded-pill bg-[#e8ff47]" />
          <div className="h-[3px] flex-1 rounded-pill bg-[#141310] opacity-20" />
          <div className="h-[3px] flex-1 rounded-pill bg-[#141310] opacity-20" />
          <div className="h-[3px] flex-1 rounded-pill bg-[#141310] opacity-20" />
        </div>
        <div className="mt-2 rounded-[5px] border border-[#141310]/20 px-2 py-1.5 flex justify-between">
          <span className="text-[7px]" style={{ color: muted }}>+254 712 345 678</span>
          <span className="text-[6px] font-bold" style={{ color: ink }}>EDIT</span>
        </div>
        <div className="mt-1.5 rounded-[5px] bg-[#141310] py-1.5 text-center">
          <span className="text-[7px] font-bold text-[#f4efe7]">Send code</span>
        </div>
      </div>
    </div>
  );
}

function ScreenHome() {
  return (
    <div className="flex flex-col h-full">
      <Bar />
      <div className="px-2.5 mt-1.5">
        <p className="text-[8px] font-bold" style={{ color: ink }}>Habari, Mike</p>
        <div className="mt-1.5 rounded-[7px] bg-[#141310] p-2">
          <p className="text-[6px] text-[#f4efe7]/60">TOTAL BALANCE</p>
          <p className="text-[13px] font-bold tracking-tight text-[#f4efe7]">
            KSh 24,580<span className="text-[8px] text-[#f4efe7]/60">.00</span>
          </p>
          <span className="inline-block mt-1 text-[5.5px] font-bold text-[#141310] bg-[#e8ff47] rounded-pill px-1">
            +12.4% vs last month
          </span>
        </div>
        <div className="mt-1.5 flex items-center gap-1.5">
          <div className="relative w-7 h-7 shrink-0">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <circle cx="18" cy="18" r="15" fill="none" stroke="#141310" strokeOpacity="0.1" strokeWidth="4" />
              <circle cx="18" cy="18" r="15" fill="none" stroke="#e8ff47" strokeWidth="4" strokeLinecap="round" strokeDasharray={`${0.68 * 2 * Math.PI * 15} ${2 * Math.PI * 15}`} />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[5.5px] font-bold" style={{ color: ink }}>68%</span>
          </div>
          <div>
            <p className="text-[7px] font-bold" style={{ color: ink }}>Trip to Mombasa</p>
            <p className="text-[6px]" style={{ color: muted }}>KSh 34,000 of 50,000</p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-1 mt-1.5">
          {["Tuma", "Lipa", "Airtime", "More"].map((l) => (
            <div key={l} className="rounded-[4px] bg-[#141310]/[0.07] py-1 text-center">
              <span className="text-[6px] font-bold" style={{ color: ink }}>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScreenGoal() {
  return (
    <div className="flex flex-col h-full">
      <Bar />
      <div className="px-2.5 mt-1.5">
        <p className="text-[6px] font-medium uppercase tracking-wide" style={{ color: muted }}>Save goal</p>
        <p className="text-[9px] font-bold mt-0.5" style={{ color: ink }}>Trip to Mombasa</p>
        <div className="relative w-14 h-14 mx-auto mt-2">
          <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
            <circle cx="18" cy="18" r="15" fill="none" stroke="#141310" strokeOpacity="0.1" strokeWidth="3" />
            <circle cx="18" cy="18" r="15" fill="none" stroke="#e8ff47" strokeWidth="3" strokeLinecap="round" strokeDasharray={`${0.68 * 2 * Math.PI * 15} ${2 * Math.PI * 15}`} />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold" style={{ color: ink }}>68%</span>
        </div>
        <p className="text-center text-[6px] mt-1" style={{ color: muted }}>KSh 34,000 of 50,000</p>
        <p className="text-[6.5px] font-bold uppercase tracking-wide mt-2" style={{ color: ink }}>Quick save</p>
        <div className="flex gap-1 mt-1">
          {["+200", "+500", "+1000"].map((v) => (
            <span key={v} className="flex-1 rounded-[4px] bg-[#141310] py-1 text-center">
              <span className="text-[6px] font-bold text-[#f4efe7]">{v}</span>
            </span>
          ))}
        </div>
        <div className="mt-1.5 flex items-center justify-between rounded-[5px] border border-[#141310]/20 px-2 py-1">
          <span className="text-[6.5px] font-semibold" style={{ color: ink }}>Round-up savings</span>
          <span className="w-5 h-3 rounded-pill bg-[#141310] flex items-center justify-end px-[2px]">
            <span className="w-2 h-2 rounded-pill bg-[#e8ff47]" />
          </span>
        </div>
      </div>
    </div>
  );
}

function ScreenTransfer() {
  return (
    <div className="flex flex-col h-full">
      <Bar />
      <div className="px-2.5 mt-1.5">
        <p className="text-[9px] font-bold" style={{ color: ink }}>Tuma — send money</p>
        <div className="mt-1.5 rounded-[5px] border border-[#141310]/20 px-2 py-1.5">
          <p className="text-[5.5px] uppercase tracking-wide" style={{ color: muted }}>To</p>
          <p className="text-[7px] font-bold" style={{ color: ink }}>M-Pesa · 0712 345 678</p>
        </div>
        <div className="mt-1.5 rounded-[5px] border border-[#141310] px-2 py-1.5">
          <p className="text-[5.5px] uppercase tracking-wide" style={{ color: muted }}>Amount</p>
          <p className="text-[13px] font-bold tracking-tight" style={{ color: ink }}>
            KSh 1,500<span className="text-[7px] text-[#e8ff47]">▎</span>
          </p>
        </div>
        <div className="grid grid-cols-3 gap-[3px] mt-1.5">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((n) => (
            <div key={n} className="rounded-[4px] bg-[#141310]/[0.06] py-1.5 text-center">
              <span className="text-[8px] font-bold" style={{ color: ink }}>{n}</span>
            </div>
          ))}
          <div className="rounded-[4px] py-1.5" />
          <div className="rounded-[4px] bg-[#141310]/[0.06] py-1.5 text-center">
            <span className="text-[8px] font-bold" style={{ color: ink }}>0</span>
          </div>
          <div className="rounded-[4px] py-1.5 flex items-center justify-center">
            <span className="text-[8px]" style={{ color: muted }}>⌫</span>
          </div>
        </div>
        <div className="mt-2 rounded-[5px] bg-[#e8ff47] py-1.5 text-center">
          <span className="text-[7px] font-bold" style={{ color: ink }}>Send with padlock</span>
        </div>
        <p className="mt-1 text-center text-[5.5px]" style={{ color: muted }}>
          Bank-grade · encrypted · instant
        </p>
      </div>
    </div>
  );
}

const screens = [
  {
    name: "Onboarding",
    note: "Progressive KYC — essentials first, documents deferred.",
    el: <ScreenOnboarding />,
  },
  {
    name: "Home",
    note: "Savings-first: balance, goal ring, and quick actions in 0 taps.",
    el: <ScreenHome />,
  },
  {
    name: "Goals",
    note: "Quick-save sized to irregular income: +200, +500, +1000.",
    el: <ScreenGoal />,
  },
  {
    name: "Transfer",
    note: "Explicit trust cues: padlock + encrypted + instant at the final tap.",
    el: <ScreenTransfer />,
  },
];

export default function MiniBankingScreens() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 my-8">
      {screens.map((s) => (
        <div key={s.name} className="flex flex-col items-center gap-2.5">
          <Frame>{s.el}</Frame>
          <div className="text-center">
            <p className="text-[11px] font-mono uppercase tracking-widest text-foreground">{s.name}</p>
            <p className="text-xs text-muted-foreground leading-relaxed mt-1 max-w-[200px]">{s.note}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
