# Implementation note — engineering-led repositioning (Aug 2026)

> **Round 2 (LinkedIn alignment) appended at the bottom** — experience model,
> LegalFlow gating, What-I-do services, provenance-labeled capability cards.

Repositioning of mikeships.vercel.app from a UI/UX-designer-first portfolio to a
**Web Developer / Frontend Engineer** portfolio for the Savannah Informatics
application (Nairobi). This was an information-architecture and copy
repositioning on the existing stack — **no framework, routing, or backend
changes**. Visual identity untouched: cream/ink/lime brutalist system, Fraunces
+ mono type, noise overlay, dark-by-default theme, product mockups.

## What changed

### Repositioning
- Hero role label → `Web Developer · Frontend Engineer · Nairobi, Kenya`; H1 →
  "I build reliable web products from design to deployment." with supporting
  engineering copy (`client/src/data/siteContent.ts`).
- Hero CTAs: **View live work**, **See engineering evidence**, **Download CV**
  (primary); Buy-me-a-coffee removed from the hero, kept as secondary in the
  contact section and low-priority in the footer.
- Hero visual switched from conceptual banking art to **real KenyaTrace
  screenshots** (live product) in the device trio.
- Skill marquee now engineering-led (TypeScript, React 19, Tailwind v4, Vite,
  Convex, Playwright e2e, REST APIs, Git/GitHub, Vercel, Accessibility,
  Design tokens, Figma).

### Proof order & metadata
- `caseStudies.ts` reordered: **KenyaTrace → GiGi Energy → Youth Banking →
  Dashboard System → Design System Creation**. Home features KenyaTrace;
  `/work` groups "Live production (2)" before "Concept studies (3)".
- New reusable components under `client/src/components/engineering/`:
  - `StatusBadge` — Live production / Concept study chips (color never alone).
  - `ProjectMetaLine` — status · role · stack · scope · challenge · constraints
    · outcome (full `dl` strip on case-study heroes; compact line on cards).
  - `EvidenceSection` — 5 "Verified in this repo" evidence cards (Frontend;
    APIs & data; Testing & quality; Debugging & delivery; Accessibility &
    security), rendered after Work on home.
  - `TechSummary` — recruiter-readable skills matrix with a visually separated
    dashed **"Building next"** subsection + team-collaboration points (in About).
  - `ProposedBlock` — clearly-labeled "Proposed implementation" /
    "Engineering considerations" blocks ("Conceptual · not production
    evidence").
- Every case-study page gained a facts strip (Status/Role/Stack/Scope/
  Constraints/Outcome + links) directly below the hero, plus an Engineering
  Notes section (live products: architecture · state/forms · data · quality ·
  delivery) or Proposed-implementation block (concept studies) before the
  design journey.
- Prototype pages keep "Interactive concept · not a live product" and add a
  "What this demonstrates" panel per prototype (interactions, state model,
  keyboard/focus behavior, responsive scope).

### Case studies (all truthful to existing repo/user-provided content)
- **KenyaTrace** — lead case study: mobile-first, 3G constraint, list-first IA,
  route-builder single-state model, 360px parity, 6→3 interaction fix,
  progressive loading, Vercel deployment.
- **GiGi Energy** — live storefront, GA4 funnel review, M-Pesa-first decision,
  4→3 checkout merge, 2.1:1→AA contrast remediation at palette level.
- **Youth Banking** (concept) — kept research-led; adds "Proposed
  implementation" (auth/KYC state machine, validation, failure recovery,
  testing) and honest "Engineering considerations" (sessions, RBAC, privacy,
  idempotency) — all labeled proposals.
- **Dashboard System** (concept) — reframed toward enterprise/data-interface
  architecture; proposed table-state/pagination/permissions/error-state/test plan.
- **Design System Creation** (concept) — reframed as frontend foundations;
  proposed token naming/composition, component APIs, visual regression, docs.
- Conceptual metrics remain explicitly hypothesis-labeled (existing
  ConceptualDisclaimer retained in Results chapter).

### About / Contact / Footer / Nav
- About rewritten around engineering-with-design-advantage; application-facing
  line added ("I'm interested in building reliable products for people and
  teams who depend on them."); technical skills matrix placed above contact;
  hobby tags removed from the top of About.
- Header nav + footer nav gained "Engineering"; footer identity line updated.
- Contact form: labels ✓, required markers, `aria-required`, `aria-invalid`,
  `aria-describedby`→`role=alert` error wiring, disabled submit while sending,
  success state unchanged (Convex mutation).

### Metadata & CV
- `index.html` title/description/OG updated; `SiteHead.DEFAULT_HEAD` updated;
  Home now renders SiteHead so SPA back-navigation restores correct metadata.
- Per-route titles: case studies use "live production"/"concept study"
  phrasing; descriptions include stack.
- `scripts/generate-cv.mjs` rewritten (source lives in-repo) and PDF
  regenerated: title "Web Developer & Frontend Engineer", engineering summary +
  Engineering Highlights first; all accurate design credentials preserved in
  "Experience & Design Background"; unverifiable counts dropped; education
  untouched.

### Quality / a11y
- `MotionConfig reducedMotion="user"` wraps the app — Framer animations now
  respect OS reduced-motion (CSS animations, CountUp, journey strip already did).
- Hero H1 is static (no animation dependency); CTAs are plain buttons/links.
- Focus-visible outlines added to new card/link targets; alt text on all new
  hero images; badges pair text + color; heading hierarchy h1→h2→h3 checked.
- Lazy loading + async decoding on tile images (pre-existing pattern kept);
  mockup figures are aspect-boxed (no layout shift).

## Verified

- `pnpm run check` — TypeScript clean.
- `pnpm run build` — production build passes (chunk-size warning pre-existing).
- `pnpm test` — **18/18 Playwright e2e pass**, including:
  hero copy/CTAs/stats, badge counts (2 live / 3 concept), descriptive card
  links, external product links, facts strip on all 5 studies, Engineering
  Notes vs Proposed-block labeling, prototype proof panels, metadata titles,
  lightbox Esc, 404 route, form validation a11y state.
- CV regenerated via `node scripts/generate-cv.mjs`.

## Route checklist

| Route | Status |
|---|---|
| `/` | Repositioned hero, live-first work grid, evidence section |
| `/work` | Grouped grid, status badges, distinct link labels |
| `/work/kenyatrace` | Facts strip + Engineering Notes (lead study) |
| `/work/gigi-energy` | Facts strip + Engineering Notes |
| `/work/mobile-banking-redesign` | Facts strip + Proposed impl + Engineering considerations |
| `/work/dashboard-ui-system` | Facts strip + Proposed impl |
| `/work/design-system-creation` | Facts strip + Proposed impl |
| `/work/{banking,dashboard,design-system}/prototype` | Label + "What this demonstrates" |
| `/404` + unknown routes | Brand 404 (tested) |

## Not claimed / building next (deliberate)

Listed only in the site's "Building next" subsection, never presented as done:
SCSS tooling · unit/integration tests beyond the e2e suite (Vitest installed,
unused) · production SQL schema work · end-to-end auth/session/RBAC
implementation · observability/uptime tooling. No CI config files exist in the
repo — delivery story is Git→PR→auto-deploy on Vercel (stated as such).

## Claims needing Mike's confirmation before sending the application

1. **KenyaTrace/GiGi roles** — data now says "Research · IA · UI & frontend
   build" and "UI engineering · conversion flows". Confirm you implemented the
   frontend of both products (not design-only), otherwise soften to "design +
   prototype implementation".
2. **GiGi form/validation/cart details** — Engineering Notes describe inline
   field validation and persistent cart state. Confirm these match the shipped
   storefront's actual behavior.
3. **KenyaTrace quality checks** — "interaction counts measured before/after"
   and "360px parity verified" come from your earlier case-study copy; confirm
   they reflect real measurements.
4. **CV "7+ live websites" claim** — dropped as unverified; restore if you can
   stand behind it.
5. **About stat "18 e2e tests passing"** — true today; update if the suite grows.

---

# Round 2 � LinkedIn alignment (Aug 2026)

Goal: represent the full public LinkedIn identity (developer, designer, API,
automation, tech support, SaaS, web design, UX) without inventing a single
fact. Unconfirmed content is **structurally present but excluded from
production** � verified by grepping the built bundle.

## New content model (`client/src/data/experience.ts`)

- `ExperienceEntry` with `source` ("repository" | "live project" | "LinkedIn" |
  "CV" | "user confirmation") and `todo[]`.
- `experienceEntries`: seeded ONLY with the publicly-visible Freelancer.com
  entry; title/dates/description deliberately blank (LinkedIn hides them behind
  an auth wall). Marked slots show exactly where to paste the real text.
- `pendingProjects`: LegalFlow with scope copied from its public LinkedIn
  description and a TODO list (role, status, stack, auth/roles, AI boundaries,
  links, dates). **Not rendered anywhere in production** � the string
  "LegalFlow" does not exist in the shipped bundle.
- Gate rule: entries render only when complete. Dev builds preview pending
  entries behind "Details to be confirmed � dev only"; production strips the
  branch at build time via inline `import.meta.env.DEV`.

## New components

- `components/engineering/ExperienceTimeline.tsx` � renders confirmed entries;
  renders nothing misleading otherwise (in prod, currently shows only an honest
  note that history publishes once titles/dates are confirmed).
- `components/WhatIDo.tsx` (#services) � LinkedIn service categories grouped:
  **Build** (web dev, SaaS, API integrations, automation) / **Design** (web,
  UI/UX, design systems, brand) / **Operate & improve** (support, debugging,
  site management & analytics, accessibility, security-minded implementation,
  network support).

## Engineering section expansion

Second card row ("Beyond the frontend") added under #engineering, each card
carrying an explicit provenance label � no generic "verified":

| Card | Label |
|---|---|
| APIs & integrations | Verified in this repo |
| Security-minded implementation | Verified in this repo |
| Automation & workflows | Professional experience |
| SaaS & product development | Professional experience |
| Technical support & troubleshooting | Professional experience |
| Network & infrastructure support | Professional experience |

The SaaS card references "a legal-practice SaaS project � details published
once confirmed" � existence is public on LinkedIn; role/status are not claimed.

## Other changes

- Header + mobile CTA renamed "Get in touch" ? **"Work with me"** (suits both
  employment and freelance/SaaS inquiries); contact section retitled to match.
- Hero supporting copy broadened: interfaces "connected to working APIs,
  automated where it saves real time".
- About first paragraph now states the broader developer/designer/API/
  automation identity (Mike's own suggested wording).
- `StatusBadge` gained a "SaaS project" tone, ready for LegalFlow once
  confirmed.

## LinkedIn items � representation status

Represented now: developer ? � designer/UX ? � API specialist ? � automation ?
� tech support ? � web design ? � SaaS development ? (card + services, without
unconfirmed specifics) � network support ? (service-level wording from Mike's
own existing copy) � cybersecurity ? folded into "Security-minded
implementation" (repo-evidenced practices only) and Building next.

Awaiting Mike's input before publishing: exact LinkedIn employment titles +
dates (Freelancer.com entry and any other roles), LegalFlow role/status/stack/
links/AI-boundaries, final sign-off on the About paragraph.

## Claims relabeled or constrained this round

- "Cybersecurity" (a listed LinkedIn service) is NOT presented as expertise �
  only concrete repo-verifiable security practices are claimed.
- No employer/title/date inferred for Freelancer.com.
- LegalFlow existence acknowledged only as "pending confirmation", never as
  shipped work.

## Verification (round 2)

- `pnpm run check` ? � `pnpm run build` ? � `pnpm test` ? **22/22** ?
- Production-bundle grep: "Details to be confirmed", "Awaiting:",
  "Title/Dates to be confirmed", "LegalFlow" � all **absent** from dist.

---

# Round 3 � vital-info trim (Aug 2026)

User directive: keep only vital info, show only real shipped projects.

## Changes

- **caseStudies.ts reduced to the two live products** (KenyaTrace, GiGi Energy).
  The three conceptual studies were removed from display entirely; their
  routes now resolve to 404 (covered by e2e). A documented LegalFlow slot with
  a template entry remains in the data file � wire it in once its public URL
  (law-five-eta.vercel.app currently returns DEPLOYMENT_NOT_FOUND) is live,
  plus visuals/journeys/TILE_ART entries.
- **Prototype route + page removed** (only conceptual studies had internal
  prototypes).
- **Homepage slimmed to five sections**: Hero (one-line supporting copy,
  three honest stats) ? Shipped products grid ? compact evidence strip
  ("Proof, not claims", five cards, =3 short bullets each) ? slim About
  (portrait, two-sentence bio, core-skills pills, contact links) ? contact
  form. Removed from home: skill marquee, What-I-do services, process
  timeline, design playbook, skills matrix/building-next blocks.
- Header nav simplified to Work / About / Contact (+CV); footer reduced to
  brand + nav + contact links; buy-me-a-coffee panel removed from the contact
  section (still low-priority in footer bar).
- LegalFlow tile art key pre-wired in BrandEdgeWork (renders from
  /shots/legalflow/ when captures exist).

## Verification

- `pnpm run check` ? � build ? � **12/12 e2e pass** (incl. assertions that
  removed studies 404 and exactly 2 live badges render)
- Live tiles use real product screenshots only (4 images across 2 tiles).
