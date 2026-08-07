import { Reveal } from "@/components/Reveal";

function DiscoverArtifact() {
  const notes = [
    ["“The app asked for docs I didn't have.”", "21 · campus"],
    ["“I don't check my balance.”", "23 · freelancer"],
    ["“Save when I have it.”", "26 · trader"],
  ];
  return (
    <div className="relative h-24 flex items-center justify-center overflow-hidden rounded-soft-sm bg-secondary/40 border border-secondary/20">
      <div className="flex gap-1.5">
        {notes.map(([quote, tag], i) => (
          <div
            key={i}
            className={`w-16 h-[74px] rounded-soft-sm p-1.5 flex flex-col justify-between transition-transform duration-300 group-hover:rotate-0 ${
              i === 0 ? "rotate-[-3deg]" : i === 2 ? "rotate-[3deg]" : ""
            }`}
            style={{ background: i === 1 ? "#e8ff47" : "rgba(242,237,230,0.14)" }}
          >
            <p className="text-[7px] font-medium leading-tight" style={{ color: i === 1 ? "#141310" : "#f2ede6" }}>
              {quote}
            </p>
            <p className="text-[6px] font-mono uppercase tracking-wide" style={{ color: i === 1 ? "rgba(20,19,16,0.6)" : "rgba(242,237,230,0.5)" }}>
              {tag}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DefineArtifact() {
  return (
    <div className="relative h-24 flex items-center justify-center overflow-hidden rounded-soft-sm bg-secondary/40 border border-secondary/20">
      <svg viewBox="0 0 220 60" className="w-[88%] h-auto" aria-hidden>
        {(
          [
            ["1", 0],
            ["2", 1],
            ["3", 2],
          ] as [string, number][]
        ).map(([label, i]) => (
          <g key={i}>
            <rect
              x={10 + i * 72}
              y="16"
              width="52"
              height="28"
              rx="6"
              fill="rgba(242,237,230,0.1)"
              stroke={i === 2 ? "#e8ff47" : "rgba(242,237,230,0.35)"}
              strokeWidth="1"
            />
            <text
              x={36 + i * 72}
              y="34"
              textAnchor="middle"
              fontSize="10"
              fontWeight="700"
              fill={i === 2 ? "#e8ff47" : "#f2ede6"}
              fontFamily="JetBrains Mono, monospace"
            >
              {label}
            </text>
            {i < 2 && (
              <path
                d={`M64 ${30} h18`}
                stroke="rgba(242,237,230,0.5)"
                strokeWidth="1.2"
                markerEnd="url(#arrow)"
              />
            )}
          </g>
        ))}
        <defs>
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill="rgba(242,237,230,0.5)" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function DesignArtifact() {
  return (
    <div className="relative h-24 flex items-center justify-center overflow-hidden rounded-soft-sm bg-secondary/40 border border-secondary/20">
      <div className="w-[52px] rounded-[8px] border border-secondary/40 bg-[#f4efe7] p-1.5">
        <div className="h-[3px] w-2/3 rounded-pill bg-[#141310] opacity-15 mb-1" />
        <div className="h-[7px] rounded-[3px] bg-[#141310] mb-1" />
        <div className="h-[10px] rounded-[3px] bg-[#141310] opacity-10 mb-1" />
        <div className="h-[10px] rounded-[3px] bg-[#e8ff47] border border-[#141310]/20 mb-1" />
        <div className="flex gap-1">
          <div className="h-[4px] flex-1 rounded-pill bg-[#141310] opacity-10" />
          <div className="h-[4px] flex-1 rounded-pill bg-[#141310] opacity-10" />
        </div>
      </div>
    </div>
  );
}

function ValidateArtifact() {
  const checks = ["Task 1 ✓", "Task 2 ✓", "Task 3 ✗ → fix"];
  return (
    <div className="relative h-24 flex items-center justify-center overflow-hidden rounded-soft-sm bg-secondary/40 border border-secondary/20">
      <div className="space-y-1">
        {checks.map((c) => (
          <div key={c} className="flex items-center gap-1.5 text-[8px] font-medium" style={{ color: "#f2ede6" }}>
            <span
              className={`w-2.5 h-2.5 rounded-[3px] flex items-center justify-center text-[6px] font-bold ${
                c.includes("✗") ? "bg-[#e8ff47] text-[#141310]" : "bg-[#3ddc84]/20 text-[#3ddc84]"
              }`}
            >
              {c.includes("✗") ? "↻" : "✓"}
            </span>
            {c}
          </div>
        ))}
        <p className="text-[6.5px] font-mono uppercase tracking-wider" style={{ color: "rgba(242,237,230,0.45)" }}>
          Iterate → retest
        </p>
      </div>
    </div>
  );
}

const phases = [
  {
    number: "01",
    title: "Discover",
    def: "Interviews, surveys, and analytics — understand users, goals, and constraints before any screen.",
    artifact: <DiscoverArtifact />,
  },
  {
    number: "02",
    title: "Define",
    def: "Turn research into structure — site maps, user flows, and the wireframes that carry them.",
    artifact: <DefineArtifact />,
  },
  {
    number: "03",
    title: "Design",
    def: "High-fidelity screens with consistent systems — every interaction specified, every state covered.",
    artifact: <DesignArtifact />,
  },
  {
    number: "04",
    title: "Validate",
    def: "Usability testing with real users, honest iteration, and measurable deltas before launch.",
    artifact: <ValidateArtifact />,
  },
];

export default function UXProcessSection() {
  return (
    <section id="process" className="section-pad bg-primary border-t border-border">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 sm:mb-12">
            <Reveal>
              <span className="section-label text-secondary/70">
                <span className="section-label-line" />
                How I work
              </span>
              <h2 className="heading-section text-secondary mb-3">My Design Process</h2>
              <p className="text-secondary text-base max-w-lg leading-relaxed opacity-80">
                Four phases, one goal — make young customers feel understood.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {phases.map((phase, i) => (
              <Reveal
                key={phase.number}
                delay={i}
                className="group border border-secondary/25 p-4 sm:p-5 flex flex-col relative overflow-hidden hover:border-secondary/60 transition-colors"
              >
                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 w-full h-[3px] bg-accent origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
                />
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-mono text-xs tracking-widest text-accent">{phase.number}</span>
                  <h3 className="font-display font-bold text-xl text-secondary group-hover:text-accent transition-colors">
                    {phase.title}
                  </h3>
                </div>
                {phase.artifact}
                <p className="text-secondary text-sm leading-relaxed mt-3 opacity-80">{phase.def}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8 text-center text-secondary/70 text-sm">
            This is the same Discover → Define → Design → Validate process I run on every
            project, end to end.
          </Reveal>
        </div>
      </div>
    </section>
  );
}
