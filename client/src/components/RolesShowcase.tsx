import { ArrowUpRight, Code2, Palette, Zap } from "lucide-react";
import { Link } from "wouter";
import { Reveal } from "@/components/Reveal";
import { Kicker } from "@/components/ui/kicker";
import { caseStudies, liveCount } from "@/data/caseStudies";

const ROLES = [
  {
    icon: Code2,
    title: "Software Developer",
    subtitle: "React · TypeScript · Shipping",
    description: "React apps — architecture to deployment.",
    capabilities: ["React 19", "REST APIs", "Vercel"],
    provenBy: ["kenyatrace", "gigi-energy", "legalflow"],
    highlight: `${liveCount} live`,
  },
  {
    icon: Palette,
    title: "UI/UX Developer",
    subtitle: "Research → hi-fi → shipped",
    description: "Research → AA systems that ship.",
    capabilities: ["Figma", "Tokens", "WCAG AA"],
    provenBy: ["kenyatrace", "gigi-energy"],
    highlight: "6 → 3",
  },
  {
    icon: Zap,
    title: "Automation Specialist",
    subtitle: "Test · Measure · Repeat",
    description: "Playwright + GA4 · pipelines.",
    capabilities: ["Playwright", "GA4", "CI/CD"],
    provenBy: ["gigi-energy"],
    highlight: "10+ green",
  },
] as const;

function RoleCard({
  role,
}: {
  role: (typeof ROLES)[number];
}) {
  const Icon = role.icon;
  const linkedStudies = caseStudies.filter((s) =>
    (role.provenBy as readonly string[]).includes(s.slug)
  );

  return (
    <div className="group h-full border border-white/10 bg-[#1d1c1a] flex flex-col hover:border-white/20 transition-colors">
        <div className="p-5 sm:p-6 flex flex-col gap-4 flex-1">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 grid place-items-center shrink-0 bg-[#e8ff47] text-black">
              <Icon size={16} strokeWidth={1.7} />
            </div>
            <div className="min-w-0">
              <h3 className="font-display font-bold text-[#f2ede6] text-[15px] leading-tight">
                {role.title}
              </h3>
                  <Kicker className="text-white/45 mt-0.5">{role.subtitle}</Kicker>
            </div>
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
          <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest bg-accent text-black font-medium w-fit">
            {role.highlight}
          </span>

          {linkedStudies.length > 0 && (
            <div className="mt-auto pt-4 border-t border-white/10 space-y-2">
              <Kicker className="text-white/35">Proven in</Kicker>
              {linkedStudies.map((study) => (
                <Link
                  key={study.slug}
                  href={`/work/${study.slug}`}
                  className="flex items-center justify-between gap-2 px-3 py-2.5 bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] hover:border-white/20 transition-colors group/link"
                >
                  <span className="font-medium text-[#f2ede6] truncate text-xs">
                    {study.name}
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
      </div>
  );
}

export default function RolesShowcase() {
  return (
    <section
      id="roles"
      className="section-pad bg-[#141310] border-t border-white/10"
    >
      <div className="container">
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
                Developer, UI, automation
              </h2>
              <p
                className="text-sm max-w-lg leading-relaxed"
                style={{ color: "rgba(242,237,230,0.6)" }}
              >
                Same stack across the three live products below.
              </p>
            </div>
            <div className="hidden lg:flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-white/40 border border-white/10 px-4 py-3">
              <span className="w-2 h-2 bg-accent" />
              Available · Nairobi · Remote
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {ROLES.map((role) => (
              <RoleCard key={role.title} role={role} />
            ))}
          </div>

          <div
            className="mt-10 pt-6 border-t flex flex-wrap items-center gap-x-8 gap-y-3"
            style={{ borderColor: "rgba(242,237,230,0.08)" }}
          >
            {[
              { value: String(liveCount), label: "live products" },
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
          </div>
        </div>
      </div>
    </section>
  );
}
