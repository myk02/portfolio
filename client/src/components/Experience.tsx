import type { ReactNode } from "react";
import { CalendarDays, Clock3, Gem, MapPin } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/ui/section";

function LottsLogo() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="48" height="48" fill="#0b0b0b" />
      <path d="M15 12h7v18h11v6H15z" fill="#c8a951" />
      <path d="M33 12h5v5h-5z" fill="#c8a951" opacity="0.55" />
    </svg>
  );
}

function CleLogo() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="48" height="48" fill="#ffffff" />
      <circle
        cx="24"
        cy="24"
        r="17.5"
        fill="#faf7ee"
        stroke="#c8a951"
        strokeWidth="1.5"
      />
      <circle
        cx="24"
        cy="24"
        r="14"
        fill="none"
        stroke="#2f5d3a"
        strokeWidth="0.8"
        strokeDasharray="1.5 1.5"
      />
      <path
        d="M24 13v21M16.5 17h15"
        stroke="#2f5d3a"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M16.5 17l-4.5 8h9zM31.5 17l-4.5 8h9z"
        fill="none"
        stroke="#2f5d3a"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path
        d="M16 34.5h16"
        stroke="#c8a951"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function WhopLogo() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="48" height="48" fill="#ff4d1f" />
      <path
        d="M8 15l6 19 5-13 5 13 6-19"
        fill="none"
        stroke="#ffffff"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FreelancerLogo() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="48" height="48" fill="#0b0b0b" />
      <path d="M11 35 36 11 26 36 21 27z" fill="#29b2fe" />
      <path
        d="M21 27 36 11"
        stroke="#ffffff"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.9"
      />
    </svg>
  );
}

type Job = {
  role: string;
  company: string;
  employment: string;
  period: string;
  duration: string;
  location: string;
  workType: string;
  description?: string;
  skills?: string;
  current?: boolean;
  logo: ReactNode;
};

const JOBS: Job[] = [
  {
    role: "Founder",
    company: "Lotts",
    employment: "Full-time",
    period: "Oct 2026 – Present",
    duration: "2 mos",
    location: "Eastern Africa",
    workType: "Remote",
    description:
      "Founded Lotts, a cybersecurity brand protecting systems and IP through content and product marketing.",
    skills: "Cybersecurity · IP Protection · Marketing · Startups",
    current: true,
    logo: <LottsLogo />,
  },
  {
    role: "Information Technology Officer",
    company: "Council Of Legal Education (CLE)",
    employment: "Full-time",
    period: "Jan 2024 – Present",
    duration: "2 yrs 11 mos",
    location: "Karen ward, Nairobi County, Kenya",
    workType: "On-site",
    description:
      "Runs IT infrastructure, network security, and support for 30+ staff and students weekly.",
    skills: "IT Systems · Cybersecurity · Networking",
    current: true,
    logo: <CleLogo />,
  },
  {
    role: "UGC Marketing Lead",
    company: "Whop",
    employment: "Contract",
    period: "Jul 2025 – Aug 2026",
    duration: "1 yr 2 mos",
    location: "United States",
    workType: "Remote",
    description:
      "Built UGC campaigns that highlighted product value and drove user acquisition.",
    skills: "Marketing · UGC · Product Promotion",
    logo: <WhopLogo />,
  },
  {
    role: "Junior Software Engineer",
    company: "Freelancer.com",
    employment: "Freelance",
    period: "Jul 2021 – Feb 2022",
    duration: "8 mos",
    location: "Remote",
    workType: "Remote",
    description: "Built secure, responsive web apps for international clients.",
    skills: "Full-Stack Development · Web Security",
    logo: <FreelancerLogo />,
  },
];

/** LinkedIn-style track record: logo, role, dates, location, and skills. */
export default function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="section-pad bg-secondary border-t border-border"
    >
      <div className="container">
        <Reveal className="section-head items-start">
          <div>
            <SectionLabel>Track record</SectionLabel>
            <h2
              id="experience-heading"
              className="heading-section text-foreground"
            >
              Experience
            </h2>
            <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground">
              Roles across security, IT, marketing, and product delivery.
            </p>
          </div>
          <span className="section-note hidden sm:inline-block">
            {JOBS.length} roles · {JOBS.filter(job => job.current).length}{" "}
            current
          </span>
        </Reveal>

        <Reveal>
          <ol className="relative mx-auto max-w-5xl list-none space-y-4 p-0 before:absolute before:bottom-8 before:left-[1.35rem] before:top-8 before:w-px before:bg-border sm:before:left-[1.6rem]">
            {JOBS.map(job => (
              <li
                key={`${job.role}-${job.company}`}
                className="relative grid grid-cols-[2.75rem_minmax(0,1fr)] items-start gap-3.5 sm:grid-cols-[3.25rem_minmax(0,1fr)] sm:gap-5"
              >
                <div className="relative z-10 mt-4 h-11 w-11 overflow-hidden border border-border bg-card p-0.5 shadow-sm sm:mt-5 sm:h-13 sm:w-13">
                  {job.logo}
                </div>
                <article className="group min-w-0 border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-[0_14px_32px_-20px_rgba(0,0,0,0.24)] sm:p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-display text-[1.05rem] font-semibold leading-snug tracking-[-0.015em] text-foreground sm:text-[1.15rem]">
                        {job.role}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        <span className="font-medium text-foreground">
                          {job.company}
                        </span>
                        <span aria-hidden> · </span>
                        {job.employment}
                      </p>
                    </div>
                    {job.current && (
                      <span className="inline-flex shrink-0 items-center gap-1.5 border border-accent/40 bg-accent/10 px-2.5 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-foreground">
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-accent"
                          aria-hidden
                        />
                        Current
                      </span>
                    )}
                  </div>

                  {job.description && (
                    <p className="mt-3 max-w-3xl text-[0.88rem] leading-relaxed text-muted-foreground sm:text-[0.92rem]">
                      {job.description}
                    </p>
                  )}

                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-border/80 pt-3 text-[0.72rem] leading-relaxed text-muted-foreground sm:text-xs">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays size={13} aria-hidden />
                      {job.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 size={13} aria-hidden />
                      {job.duration}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={13} aria-hidden />
                      {job.location} · {job.workType}
                    </span>
                  </div>

                  {job.skills && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {job.skills.split(" · ").map(skill => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-1.5 border border-border bg-secondary/70 px-2 py-1 text-[0.68rem] leading-tight text-muted-foreground"
                        >
                          <Gem size={10} aria-hidden className="text-accent" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
