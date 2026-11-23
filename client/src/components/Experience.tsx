import type { ReactNode } from "react";
import { Gem } from "lucide-react";
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
    description:
      "Built secure, responsive web apps for international clients.",
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
          </div>
          <span className="section-note hidden sm:inline-block">
            Career &amp; Leadership
          </span>
        </Reveal>

        <Reveal>
          <ol className="max-w-5xl list-none divide-y divide-border border-y border-border p-0">
            {JOBS.map(job => (
              <li
                key={`${job.role}-${job.company}`}
                className={`relative py-5 sm:py-6 lg:grid lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-10 ${job.current ? "pl-3 before:absolute before:left-0 before:top-5 before:bottom-5 before:w-[2px] before:bg-accent/70" : ""}`}
              >
                <div className="flex gap-3.5 sm:gap-4 lg:block">
                  <div className="h-11 w-11 shrink-0 overflow-hidden border border-border/70 sm:h-12 sm:w-12 bg-card">
                    {job.logo}
                  </div>
                  <div className="min-w-0 flex-1 lg:mt-3">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-[1.02rem] font-semibold leading-snug text-foreground">
                        {job.role}
                      </h3>
                      {job.current && (
                        <span className="shrink-0 rounded-[2px] bg-foreground/10 px-2 py-0.5 font-mono text-[9px] font-medium uppercase tracking-[0.1em] text-foreground/80 inline-flex items-center gap-1.5 lg:hidden">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden />
                          Present
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-[0.84rem] leading-snug text-foreground">
                      {job.company}
                      <span className="text-muted-foreground">
                        {" "}
                        · {job.employment}
                      </span>
                    </p>
                    <p className="mt-1 flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-muted-foreground">
                      {job.period}
                      {job.current && (
                        <span className="hidden rounded-[2px] bg-accent/25 px-2 py-0.5 text-foreground/90 lg:inline-flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden />
                          Present
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="mt-3 min-w-0 lg:mt-0">
                  <p className="text-[0.78rem] leading-snug text-muted-foreground">
                    {job.location}
                    {job.workType !== job.location && ` · ${job.workType}`}
                    {" · "}
                    {job.duration}
                  </p>
                  {job.description && (
                    <p className="mt-2.5 text-[0.86rem] leading-relaxed text-foreground/90">
                      {job.description}
                    </p>
                  )}
                  {job.skills && (
                    <p className="mt-2.5 flex items-start gap-1.5 text-[0.78rem] leading-snug text-muted-foreground">
                      <Gem
                        size={12}
                        className="mt-[0.2rem] shrink-0"
                        aria-hidden
                      />
                      <span>{job.skills}</span>
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
