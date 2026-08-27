import { motion } from "framer-motion";
import { ArrowUpRight, Code2, Palette, Zap, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { Reveal } from "@/components/Reveal";
import { caseStudies } from "@/data/caseStudies";

/** Maps each professional role to a description + the projects that prove it */
const ROLES = [
  {
    icon: Code2,
    title: "Software Developer",
    subtitle: "Full-stack web applications",
    description:
      "React 19, TypeScript, Tailwind v4, Convex, Playwright e2e — production-grade apps from architecture to deployment.",
    capabilities: [
      "React + TypeScript SPAs",
      "REST API integration",
      "Playwright e2e test suites",
      "Vercel & Convex deployment",
      "Accessible, WCAG AA interfaces",
    ],
    provenBy: ["kenyatrace", "gigi-energy"],
    highlight: "2 live products shipped",
    accentColor: "#e8ff47",
    bgAccent: "rgba(232,255,71,0.04)",
  },
  {
    icon: Palette,
    title: "UI/UX Developer",
    subtitle: "Research-led product design",
    description:
      "End-to-end UX — user research, IA, wireframes, hi-fi prototypes, and usability testing — shipped as real products.",
    capabilities: [
      "User research & interviews",
      "Information architecture",
      "Figma hi-fi prototyping",
      "Usability testing",
      "Accessibility audit (WCAG AA)",
    ],
    provenBy: ["kenyatrace", "gigi-energy"],
    highlight: "Route planning cut 6 → 3 taps",
    accentColor: "#f2ede6",
    bgAccent: "rgba(242,237,230,0.04)",
  },
  {
    icon: Zap,
    title: "Automation Specialist",
    subtitle: "Quality assurance & CI workflows",
    description:
      "End-to-end test automation with Playwright, GA4 funnel analytics, and data-driven decisions that replace guesswork.",
    capabilities: [
      "Playwright e2e test suites",
      "GA4 analytics & funnel analysis",
      "Data-driven UX decisions",
      "CI/CD deployment pipelines",
      "Performance & contrast audits",
    ],
    provenBy: ["gigi-energy"],
    highlight: "10+ e2e tests passing",
    accentColor: "#e8ff47",
    bgAccent: "rgba(232,255,71,0.03)",
  },
] as const;

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function RoleCard({
  role,
  index,
}: {
  role: (typeof ROLES)[number];
  index: number;
}) {
  const Icon = role.icon;
  const linkedStudies = caseStudies.filter((s) =>
    (role.provenBy as readonly string[]).includes(s.slug)
  );

  return (
    <Reveal delay={index} className="h-full">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="group h-full border border-border bg-card p-6 sm:p-7 flex flex-col gap-5 hover:border-accent/60 transition-colors duration-300"
        style={{ background: role.bgAccent }}
      >
        {/* icon + title */}
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 flex items-center justify-center shrink-0 border border-border bg-foreground text-background">
            <Icon size={20} strokeWidth={1.5} />
          </div>
          <div className="min-w-0">
            <h3 className="font-display font-bold text-foreground text-lg leading-tight">
              {role.title}
            </h3>
            <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground mt-0.5">
              {role.subtitle}
            </p>
          </div>
        </div>

        {/* description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {role.description}
        </p>

        {/* capabilities */}
        <ul className="flex flex-col gap-1.5">
          {role.capabilities.map((cap) => (
            <li key={cap} className="flex items-start gap-2 text-[12px] text-foreground/80">
              <span
                className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                style={{ background: role.accentColor }}
                aria-hidden
              />
              {cap}
            </li>
          ))}
        </ul>

        {/* highlight badge */}
        <div className="mt-auto pt-4 border-t border-border">
          <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest border bg-accent/10 border-accent/30 text-foreground">
            {role.highlight}
          </span>
        </div>

        {/* linked projects */}
        {linkedStudies.length > 0 && (
          <div className="space-y-2">
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              Demonstrated in
            </p>
            {linkedStudies.map((study) => (
              <Link
                key={study.slug}
                href={`/work/${study.slug}`}
                className="flex items-center justify-between gap-2 px-3 py-2 border border-border bg-background/40 hover:border-foreground/40 hover:bg-background/80 transition-all group/link"
              >
                <span className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{
                      background:
                        study.kind === "LIVE PRODUCT" ? "#22c55e" : "#e8ff47",
                    }}
                  />
                  <span className="font-medium text-foreground truncate text-xs">
                    {study.name}
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground whitespace-nowrap">
                    {study.kind === "LIVE PRODUCT" ? "live" : "concept"}
                  </span>
                </span>
                <ArrowUpRight
                  size={13}
                  className="text-muted-foreground group-hover/link:text-foreground transition-colors shrink-0"
                />
              </Link>
            ))}
            {linkedStudies.find((s) => s.liveUrl) && (
              <a
                href={linkedStudies.find((s) => s.liveUrl)!.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
              >
                <ExternalLink size={11} />
                View live product
              </a>
            )}
          </div>
        )}
      </motion.div>
    </Reveal>
  );
}

export default function RolesShowcase() {
  return (
    <section
      id="roles"
      className="section-pad bg-[#141310] border-t border-border relative overflow-hidden"
    >
      {/* background grid accent */}
      <div className="grid-overlay" aria-hidden />

      <div className="relative z-10 container">
        <div className="max-w-6xl mx-auto">
          <Reveal as="div" className="mb-10">
            <span className="section-label" style={{ color: "rgba(242,237,230,0.5)" }}>
              <span className="section-label-line" />
              Experience
            </span>
            <h2
              className="heading-section mb-3"
              style={{ color: "#f2ede6" }}
            >
              Three roles, one portfolio
            </h2>
            <p
              className="text-sm max-w-lg"
              style={{ color: "rgba(242,237,230,0.6)" }}
            >
              Every project below is clickable — see the work that proves each
              role, not just a label on a CV.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {ROLES.map((role, i) => (
              <RoleCard key={role.title} role={role} index={i} />
            ))}
          </div>

          {/* proof stats strip */}
          <Reveal
            delay={3}
            as="div"
            className="mt-10 pt-8 border-t"
            style={{ borderColor: "rgba(242,237,230,0.08)" }}
          >
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              {[
                { value: "2", label: "Live products in production" },
                { value: "10+", label: "e2e tests passing" },
                { value: "5 wks", label: "Average build-to-ship" },
                { value: "AA", label: "WCAG contrast on all text" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-baseline gap-2">
                  <span
                    className="font-display font-bold text-2xl"
                    style={{ color: "#e8ff47" }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-[11px] font-mono uppercase tracking-wide"
                    style={{ color: "rgba(242,237,230,0.5)" }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
