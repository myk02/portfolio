/**
 * Content for the IT Support & Security page. FACTS ONLY — see the task
 * brief. Anything not personally done is labelled Template / Learning in
 * progress, with [ADD REAL FACT] where only Mike knows the answer.
 */

export const IT_SECURITY_INTRO = {
  title: "IT Support & Security",
  lede:
    "I help staff get unstuck with their computers, accounts, email and network problems, and I keep shared records accurate and private. When something breaks under pressure, I fix what I can and escalate the rest.",
  points: [
    "First-line support: hardware, accounts, email and network issues, with escalation.",
    "Data care: accurate records in shared systems; sensitive data stays private.",
    "Calm under pressure: set up and checked devices against the clock, trained the people using them.",
  ],
};

export const IT_SKILLS_GROUP = {
  title: "IT Support & Security",
  skills: [
    "First-line IT support to 30+ staff and students weekly (Council of Legal Education)",
    "Device setup, maintenance and checks: computers, tablets, KIEMS biometric devices",
    "Training 50+ polling staff, cutting data-entry errors (IEBC)",
    "Sensitive trainee records: 2,000+ kept accurate and protected in the student portal",
    "Role-based access control (LegalFlow); sign-in flows (KenyaTrace)",
    "Input validation with Zod; Playwright and Vitest tests; regression tests",
    "Dependency upgrades; Git and Vercel CI/CD; Docker; Linux, Windows, macOS",
    "Website and learning-management-system testing; verifying fixes after deployment",
  ],
  strengthening:
    "Currently strengthening (Learning in progress): firewall and network security configuration, backup and disaster recovery testing, endpoint protection, incident response. [ADD REAL FACT or remove: Security+ or CCNA study status]",
};

export interface CaseStudy {
  title: string;
  badge: string;
  situation: string;
  did: string[];
  pressure: string;
  dataSafety: string;
  learned: string;
  improve: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    title: "Supporting 30+ staff and students at the Council of Legal Education",
    badge: "ICT Intern · Jan 2024 – Jan 2025",
    situation:
      "Staff and students needed help every week with hardware, accounts, email and network problems, while 2,000+ trainee records in the student-portal application had to stay accurate and private.",
    did: [
      "Gave first-line IT support to 30+ staff and students every week, escalating what I could not fix.",
      "Kept 2,000+ trainee records accurate in the student-portal application.",
      "Tested the website and learning-management system and checked fixes after deployment.",
    ],
    pressure:
      "Support requests came in alongside record work. I handled the quick fixes first, escalated blockers early, and [ADD REAL FACT: how you prioritised a busy week].",
    dataSafety:
      "Trainee records are sensitive, so I worked inside the portal's access rules, never shared records outside the system, and [ADD REAL FACT: any specific step, e.g. lock screen / need-to-know sharing].",
    learned:
      "Most repeat issues come from a few root causes; writing down the fix once saves hours later.",
    improve:
      "I would keep a simple known-issues log so staff can solve common problems themselves. [ADD REAL FACT: anything you would add]",
  },
  {
    title: "Setting up election devices at 20+ polling stations (IEBC)",
    badge: "IT Clerk · Jul – Oct 2022",
    situation:
      "Over 500 voters had to be registered with computers, tablets and KIEMS biometric devices across 20+ polling stations, under serious time pressure.",
    did: [
      "Set up, maintained and checked computers, tablets and KIEMS biometric devices at 20+ polling stations.",
      "Trained 50+ polling staff on the devices and the registration steps.",
      "Supported registration of 500+ voters; training cut data-entry errors.",
    ],
    pressure:
      "Devices had to work on the day, with no second chances. I checked each device before deployment, carried spares where possible, and [ADD REAL FACT: what you did when a device failed on site].",
    dataSafety:
      "Voter data is sensitive. Devices stayed with authorised staff, access followed the issued procedures, and [ADD REAL FACT: any handover / sign-off step you followed].",
    learned:
      "Training the people matters as much as the devices — most errors disappeared after a short hands-on session.",
    improve:
      "I would add a one-page device checklist per station so checks are identical everywhere. (A starter version is in the templates below.)",
  },
];

/** What was actually done to secure THIS site — page section + honest proof. */
export const SITE_SECURITY_MEASURES: { title: string; text: string }[] = [
  {
    title: "Security headers",
    text: "Content-Security-Policy, X-Content-Type-Options, Referrer-Policy, Permissions-Policy and frame protection are set in vercel.json. [ADD REAL FACT if you change hosts]",
  },
  {
    title: "Validated input, safe errors",
    text: "The contact form validates on the client and again on the server (Convex), trims and length-limits fields, uses a honeypot for bots, and shows generic error messages.",
  },
  {
    title: "Signed webhooks",
    text: "Paystack tip webhooks verify the HMAC-SHA512 signature before trusting anything; unsigned calls get a 401 and change nothing.",
  },
  {
    title: "Secrets stay out",
    text: "Keys live in environment variables, never in the repo; .env.example documents names only. A gitleaks step scans CI, and Dependabot proposes dependency updates.",
  },
  {
    title: "Known gap: rate limiting",
    text: "The contact form has no server-side rate limit yet (Convex has no built-in throttle). Honest next step, listed openly rather than claimed.",
  },
];
