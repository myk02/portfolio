# Portfolio Restructure Plan v2 — Phased Build

**Date:** 2026-09-03  
**Working tree:** `C:\Users\ADMIN\OneDrive\Desktop\mike\sites\portfolio`  
**Live:** https://mikeships.vercel.app  
**Stack:** Vite 7 · React 19 · TypeScript · Tailwind v4 · Convex · Wouter · Playwright

This is the **source of truth**. The previous `RESTRUCTURE-PLAN.md` landed Phase 0 + most of Phases 1–3 (no `BrandEdge*`, no `RolesShowcase`, no conceptual studies, flat gallery, tokenized live-dot, dead CSS removed). This plan covers the **remaining residue** plus the full structural rebuild informed by a fresh audit and 2026 best-practice research.

---

## 0. TL;DR — what to ship, in order

1. **Phase 0 — Stop the lying** (~0.5 day). Delete dead exports, leaked creds, dual-identity docs, contradictory copy, screenshot duplication in data.
2. **Phase 1 — One-page IA** (~1 day). Collapse dual Work surfaces into a single featured-work grid on `/`. Make `/work` a thin shareable index. One headline. One CTA. One availability line.
3. **Phase 2 — Outcome-led case studies** (~2–3 days). Replace numbered 01–06 template with 6-beat hybrid (Brian Young + Backes + Fonzi). Merge `caseStudies.ts` + `caseVisuals.ts`. Unique screenshots only.
4. **Phase 3 — Design system hygiene** (~1–2 days). One `SectionLabel` for 13 inline copies. Tokenize `Lightbox` hardcoded hex. Kill `--font-accent`. Resolve `bg-background` / `bg-card` / `bg-secondary` token soup. Lime used once per viewport.
5. **Phase 4 — Proof & growth** (ongoing). Per-project repos, JSON-LD `CreativeWork`, analytics, Convex `projectType` cleanup, custom domain.

Each phase ships behind green `pnpm run check`, `pnpm run build`, and Playwright on the smoke file. **Do not start with a visual redesign or a new animation library.**

---

## 1. North star (one sentence)

A recruiter or hiring manager should, in **~30 seconds**, know who you are, that the work is live, what you personally owned, and how to contact you — then, if they stay, read **one visual-first study** without seeing the same screen twice or the same stat four times.

Same bar as:
- Matej Latin — portfolios get rejected in ~30 seconds; generic templates and repetitive images are kill signals.
- UXfolio 2026 — 3–5 min skim; 3–5 projects max; visuals carry the story.
- SuperHive / WeAreArch — name the target role in plain language; outcome in the thumbnail.
- Emily Backes — a case study is an argument, not a process dump.
- Brian Young / Fonzi — 2–3 deep studies, live URL + role + constraints + trade-offs + outcomes; 300–600 words is enough.

**Copy IA and restraint** from brittanychiang.com (and the long-running v4). **Do not copy** WebGL / Awwwards motion portfolios. Framer Motion is already enough.

---

## 2. Audit summary — what's actually broken, slop, or inconsistent

(Full audit in `RESTRUCTURE-AUDIT.md`; reproduced here as decisions.)

### 2.1 Dead exports / types / props
- `client/src/data/caseStudies.ts:219` — `liveSlugs` exported, never imported.
- `client/src/data/caseStudies.ts:1` — `StudyKind` still allows `"CONCEPTUAL"`. No conceptual data exists.
- `client/src/data/caseVisuals.ts:11-22` — `Shot.tablet` declared, never set, never read. Dozens of `*-tablet.jpg` files are pure weight.
- `client/src/index.css:9` — `--font-accent` aliased to DM Sans; no JSX references it.
- `client/src/components/Lightbox.tsx:162-169` — `srcSet`, `sizes`, `width`, `height` props declared but never passed by any caller.
- `client/src/components/CaseStudyLayout.tsx:46` — `scrollToSection` wired to header but only called when `isHome`; dead wiring on case study.

### 2.2 Lying / inconsistent data
- **Three-title stack** in `index.html:9` ("Software Developer · UI/UX Developer · Automation Specialist") vs Hero `roleLine: "Frontend developer · Nairobi / remote"` vs JSON-LD `jobTitle: "Software Developer"`. **Three identities, two files.**
- **Hero stats mix unit scales.** `siteContent.ts:8-11` mixes portfolio output ("Live products: 3") with project-specific deltas ("Route taps 6→3", "Checkout cut 4→3"). A first-time visitor can't tell what is personal vs per-project.
- **About timeline** (`About.tsx:7-11`) re-states KenyaTrace 6→3, GiGi 4→3, LegalFlow — same facts already in `caseStudies.ts`. Drift risk.
- **`convex/schema.ts:9`** comment says `projectType` is "kept optional so existing rows still validate" — no code reads or writes it.
- **`Contact.tsx:48`** treats honeypot success as `null` → "Message received" with no record saved. Quiet lie to bot user.
- **e2e test count is 8**, not "10+" (per current copy). Plan already calls this out.
- **`scripts/thumb-variants.mjs`** only handles `kenya-tourism` and `gigi-energy`; `thumbnails/legalflow-*.{jpg,webp}` were hand-added. Stale script.

### 2.3 Screenshot duplication in data
| Study | Tile | Hero | Gallery[0] | Decision bullet overlap |
|---|---|---|---|---|
| KenyaTrace | `home-cards-desktop.jpg` | `plan-desktop.jpg` | `discover-desktop.jpg` | `home-cards-desktop.jpg` (bullet 1) |
| GiGi | `home-products-desktop.jpg` | `home-desktop.jpg` | `home-products-desktop.jpg` | — |
| LegalFlow | `home-features-desktop.jpg` | `home-desktop.jpg` | `home-scroll-desktop.jpg` | — |

Plus a `legalflow.png` + 6 variants in `/thumbnails/` that no TSX references.

### 2.4 Slop-AI UI patterns (grouped by repetition)
- **Section-label recipe duplicated 13 times** (mono kicker + 6px lime dash + Fraunces heading). One `Kicker` component exists but is unused as a section label.
- **Lime overuse** — Hero highlight, every section divider, About left-border, Hero stat border, StatusBadge dot, Contact success check, lime period after "Not found.", lime "MW" tile in footer. The lime has been spread so wide it has lost signal value.
- **Availability told 4 times on a single scroll.** Hero pill + About chip + Contact cards + Footer line.
- **Three CTAs with same intent, three labels.** "Work with me" × 2 (header + hero) + "Book a 15-min chat" (Contact).
- **One card pattern drawn 30+ times.** `border border-border bg-card` is hand-rolled in `ProjectCard`, About, Contact, footer link rows, Case-study fact cards, decision bullets, before/after cards, engineering notes. The token soup `bg-background` / `bg-card` / `bg-secondary` all resolve to `#f2ede6`.
- **`Lightbox.tsx`** has 9 hardcoded hex literals (`#0b0a08`, `#f2ede6`, `#e8ff47`, `#141310`). Theme-blind islands.
- **Two icon systems.** Lucide everywhere + one inline LinkedIn SVG in `Contact.tsx:161`.

### 2.5 Inconsistent workflows
- **Dual Work IA still present.** Home `#work` + `/work` page + Footer "Live work" sub-list + Case-study prev/next + Case-study "More work" = **5 navigation surfaces for 3 items**.
- **Skip-to-content missing.** Only `Home.tsx:45` has `<main>`; `Work.tsx` and `CaseStudyLayout.tsx` don't.
- **Above-the-fold image lazy.** `ProjectCard.tsx:29` is `loading="lazy"` for the first card too. Should be `eager` on first card.
- **Two LinkedIn handles in repo.** `lib/site.ts:16` `linkedin.com/in/mikeships` vs `documents/pawa-it-*.md:62` `linkedin.com/in/mike-waitindi-654bb2344`. Two GitHub handles (`myk02` vs `garymike07`).
- **Two Vercel URLs.** `lib/site.ts:3` `mikeships.vercel.app` vs `AGENTS.md:11` `portfolio-delta-bay-50.vercel.app`.
- **Two OG descriptions live** — `index.html:13` and `SiteHead.tsx` rewrites.

### 2.6 Template residue / leaks
- **`.project-config.json`** — third-party template (`inkwell_nextjs`, AWS S3 git remote creds, Manus deployment). Not used by Vite or Convex. **Contains active-looking AWS credentials.**
- **`attached_assets/`** — 6 unreferenced PNGs (Carsoko, CodeMaster, Nora Designs, PureMatch254). Old product candidates that didn't ship.
- **`documents/pawa-it-*.md`** — describe a Graphic Design / WordPress / Adobe role. Wrong identity.
- **`tsconfig.node.json`** — orphaned, not referenced from `tsconfig.json` or Vite.
- **`client/public/.gitkeep`** — unnecessary; directory is full.
- **`RESTRUCTURE-PLAN.md`** — lives in source tree. Decision needed: ship it or move out.

---

## 3. What the site is *right now* (before this plan lands)

Hire-me / freelance portfolio for **Mike Waitindi** (Nairobi). Copy still stacks three titles:

> Software Developer · UI/UX Developer · Automation Specialist  
> "I ship reliable web products."

**Shipped work (`caseStudies.ts`):**

| Project | Live URL | Role | Headline proof |
|---|---|---|---|
| KenyaTrace | kenyatrace.vercel.app | Research · IA · UI build | Route 6→3 taps |
| GiGi Energy | gigiflavours.vercel.app | UI engineering · flows | Checkout 4→3, AA |
| LegalFlow | law-ten-iota.vercel.app | Product · UX · Build | One workspace, PWA |

**Routes:** `/` · `/work` · `/work/:slug` · 404.

**Home:** Header → hero (copy + one KenyaTrace still) → three `ProjectCard`s → About → Contact → inverted footer + coffee.

**Case study:** Status + giant name + tagline → Role/Stack/Outcome cards → live link → one desktop shot → 01 Problem → 02 Research → 03 Design decisions → 04 Before/after → 05 Device gallery → 06 inverted Results → Engineering notes (4 cards) → Prev/next → More work (`ProjectCard` × 2).

---

## 4. Research — what to copy, what to skip

### 4.1 Information architecture — Brittany Chiang, not Dribbble
**Pattern:** sticky simple nav (About · Experience · Work · Contact). Hero = name + role + one sentence. Featured projects: name, one sentence, stack chips, live + GitHub. Experience = dated jobs. Contact = email, not a second brochure.

**Apply here:**
```
/                 Hero → Featured work (3) → About → Contact
/work             thin share URL, same 3 cards, thinner chrome
/work/:slug       showcase (not 6 numbered chapters)
```
Nav: **Work · About · Contact**. No "Experience" until dated employment exists. Header CTA: one "Work with me."

### 4.2 Homepage work tiles — engineer sites
Large still of the live UI, name, **outcome one-liner**, stack, two text links (Case study · Live). Optional repo. Not a nested phone-on-desktop collage. One featured visual in the hero is enough theater.

**Outcome-aware titles (Matej Latin formula):**
- KenyaTrace — "Multi-stop trip planning in 3 taps on 3G"
- GiGi — "Checkout 4→3, M-Pesa first, AA contrast"
- LegalFlow — "Matters, billing, and M-Pesa in one mobile workspace"

### 4.3 Case-study shape — hybrid showcase + engineering write-up
From UXfolio + Backes + Fonzi + Brian Young:

```
ABOVE THE FOLD
  Outcome-aware title (not only product name)
  One sentence: who it is for + what changed
  Snapshot dl: Role · Stack · Timeline · Live [· Repo]
  One hero visual

THEN (short, visual)
  Context (1–2 sentences, before you touched it)
  What I owned (3 bullets, active verbs)
  The call to adventure (the problem that forced the work)
  The ordeal (the moment your plan broke — research, stakeholder, estimate)
  What I shipped (decision + 1 supporting shot)
  Result (2–3 honest metrics with units, before → after)
  What I'd do differently (honest, demonstrates growth)

Build notes — compact dl, beside the decision, not 4 essays after.
```

Copy budget: **300–600 words per study**. Don't invent LegalFlow conversion metrics.

### 4.4 Contact — one primary path
UXfolio: hidden/duplicated CTAs waste the skim.
- Header CTA → `#contact` or `mailto:`
- Contact section: email + WhatsApp + LinkedIn primary; short form optional
- Do not repeat the same four icons in About + Footer

Coffee/tips: personal blogs keep this in the **footer**. Keep there.

### 4.5 Performance — the portfolio *is* a sample
Popout / Portfolio Studio: load < 2s, Lighthouse 90+. Today: many JPGs in `/shots`, duplicate `/thumbnails` in 3–5 sizes, device mockups multiply bytes (already removed in previous pass — good), tablet variants never rendered.

Finish `optimize-images.mjs`: one folder `/media/{slug}/`, WebP + srcset, no tablet files unless shown.

### 4.6 Honesty — protect Round 2 rules
- No conceptual studies until real artifacts exist.
- No "7+ live websites."
- Soften or source-check KenyaTrace/GiGi implementation claims (old notes flag design-only vs frontend).
- "10+ e2e" → count real tests (8 today) or drop. Prefer "Playwright smoke + CI on this repo."
- GitHub profile is live (`github.com/myk02`). Add per-project repo or "private — stack listed."

---

## 5. Target structure

### 5.1 Content model (single source)
Merge `caseStudies.ts` + `caseVisuals.ts` into **one module per study** (`projects.ts`) so a tile cannot drift from its case page.

```ts
type Project = {
  slug: string;
  name: string;
  year: number;
  liveUrl: string;
  repoUrl?: string;
  outcomeTitle: string;       // Matej formula
  oneLiner: string;
  role: string;
  stack: string[];
  timeline: string;           // e.g. "Solo · 5 weeks"
  context: string;            // 1–2 sentences, before you touched it
  ownership: string[];        // 3 bullets, active verbs
  problem: string;            // 2–3 sentences
  ordeal: string;             // 3–5 sentences, what broke
  decisions: Array<{ label: string; text: string; shot?: string }>;
  metrics: Array<{ label: string; before?: string; after: string }>;
  screens: string[];          // unique paths only, no hero repeat
  heroShot: string;
  buildNotes?: { architecture?: string; quality?: string };
};
```

Delete `StudyKind`'s `"CONCEPTUAL"` arm. Delete unused `image`/thumbnail fields. Delete `Shot.tablet`.

### 5.2 Component inventory

| Keep / reshape | Kill or fold |
|---|---|
| `SiteHeader`, `SiteFooter`, `Hero`, `Contact`, `About`, `Lightbox`, `SiteHead`, `ProjectCard` | Nested `TileArt` phone (already gone) |
| `CaseStudyLayout` as showcase | Numbered 01–06 chrome; 4 identical engineering cards |
| `BuyMeCoffee` in footer | Any second placement |
| `StatusBadge` live-only | concept / prototype / saas tones |
| `CountUp` | Optional; already skips non-integers |
| **Add:** `SectionLabel`, `Surface` (one card), `ShotFigure` (flat) | `Kicker` if not repurposed |

One `SectionLabel`. One `Surface`. One `ShotFigure`. Stop inventing variants.

### 5.3 Visual system rules (write into CSS)
1. Tokens only — no `#e8ff47` / `#22c55e` / `#141310` in JSX except documented exceptions (device bezel, lightbox overlay).
2. **One accent move per viewport** (hero highlight *or* section underline, not both).
3. Type: Fraunces + DM Sans + JetBrains Mono. Drop `--font-accent` alias or set it to mono for kickers only.
4. `border-radius: 0` global. Phone bezels may keep `rounded-soft` only if a mockup remains.
5. Light cream default (already). Footer: tokens or committed inverted band.
6. Availability: **one** live pill (header or hero). Nowhere else.
7. Lime period / lime accent only on the single H1 highlight and the single status dot. Nowhere else.

### 5.4 Navigation rules
- In-page ids only on `/`.
- `Work` from other routes → `/work` (share URL).
- Logo → `/`.
- Primary CTA in header only.
- Footer: compact nav + email + LinkedIn + GitHub + coffee. No second theme switch.

### 5.5 Accessibility baseline
- Skip-to-content link (`<a href="#main">Skip to content</a>`) before the header.
- Single `<main id="main">` landmark per route.
- Above-the-fold hero image: `eager`; everything else `lazy`.
- Focus-visible styles on every interactive element.
- `prefers-reduced-motion` respected (already in place — keep).

---

## 6. Phased roadmap

---

### Phase 0 — Stop the lying (~0.5 day)

**Goal:** Tests, docs, UI, and identity agree. Nothing dead, nothing claiming two stories.

**Code & data:**
- Delete `liveSlugs` (`caseStudies.ts:219`).
- Remove `"CONCEPTUAL"` from `StudyKind` (`caseStudies.ts:1`).
- Remove `Shot.tablet` interface field (`caseVisuals.ts:11-22`) and delete all `*-tablet.jpg` files from `public/shots/**`.
- Remove `srcSet`, `sizes`, `width`, `height` props from `Lightbox.tsx:162-169`.
- Remove dead `scrollToSection` wiring in `CaseStudyLayout.tsx:46`.
- Fix `convex/schema.ts:9` comment about `projectType`.
- Fix `Contact.tsx:48` honeypot success path — either throw on bot or surface "discarded." Pick: throw (returns ConvexError with `code: "BOT_DETECTED"`).
- Replace inline LinkedIn SVG in `Contact.tsx:161` with the lucide `Linkedin` icon.
- Tighten e2e assertions to count `a[href^="/work/"]` rather than fuzzy text (`e2e/smoke.spec.ts:51`).
- Either fix or remove `scripts/thumb-variants.mjs` (recommend: delete + delete `client/public/thumbnails/*`).

**Residue to delete:**
- `.project-config.json` (contains AWS credentials + template residue).
- `attached_assets/` (6 unused PNGs).
- `documents/pawa-it-cv-summary.md`, `documents/pawa-it-cover-letter.md`.
- `tsconfig.node.json` (orphaned).
- `client/public/.gitkeep`.
- `public/process/` (already empty per cleanup — verify and `.gitkeep` remove).

**Honesty:**
- Decide CV: link once (header or About) **or** remove `client/public/CV.pdf`. Recommend: remove, since About already has a "CV (PDF)" link.
- Hero stats: drop the project-specific "Route taps 6→3" and "Checkout cut 4→3" from the global hero stats — keep "3 live products" only. Per-project deltas belong on the project card and case study only.
- Index.html hardcoded title ("Three live products shipped.") — let `SiteHead` be the only source.
- AGENTS.md Vercel URL drift — note in plan, don't fight the generator; canonical lives in code.

**Done when:** a stranger reading smoke tests, home, and `/work` gets the same count (3); no unused process folder in the deploy; no leaked creds in repo.

---

### Phase 1 — One-page IA + one headline (~1 day)

**Goal:** A recruiter can operate without thinking. One identity.

**Decisions needed (Mike):**
1. **One headline** for LinkedIn + CV + `<title>` + Hero kicker. Pick from:
   - "Frontend engineer (React) who can also design"
   - "Product-minded frontend developer — Nairobi / remote"
   - "Software developer who ships design, UI, and reliable backends"
   Stop listing three jobs in the kicker.
2. **Keep `/work`?** Recommend **yes** as share URL, thinner chrome (no second hero).
3. **Per-project GitHub URLs** (or explicit private). If neither, the repo field is omitted.

**Home composition:**
```
Hero (compact)
  Kicker (mono, one line, with role)
  H1 (with one lime highlight word, only here)
  Availability pill (once, top-right or under H1)
  CTAs: View work · Work with me
  One featured visual (KenyaTrace money shot — Plan or live UI, not a third home)
  No stats strip

Featured work (3 ProjectCards, flat)
  Outcome one-liner on each card (Matej formula)
  Live + Case study text links (+ Repo if any)
  No nested phone collage

About (short)
  Portrait, 2 paragraphs, skills, real dates only
  Social once (prefer Contact/footer)

Contact
  Direct links + short form

Footer
  Compact nav + social + coffee + colophon
```

**`/work`:** keep as share URL; **strip the giant second hero**. Page = `ProjectCardGrid` only. Same cards as home. Add `?from=` UTM for analytics (Phase 4).

**Nav:** Work · About · Contact. Cross-page Work always `/work` except on home (scroll `#work`). Document in `lib/navigation.ts` (already partial — finish).

**Done when:** KenyaTrace is not three different collages; `/work` does not feel like a different product; "Experience" stays gone until you have dates.

---

### Phase 2 — Outcome-led case studies (~2–3 days)

**Goal:** Visual-first pages matching UXfolio skim + Fonzi engineering bar.

**Per study (rebuilt in `CaseStudyLayout.tsx`):**

1. **Hero:** `outcomeTitle` + one-sentence tagline + snapshot dl (Role · Stack · Timeline · Live [+ Repo]) + **one** image + Live [+ GitHub] text link.
2. **Context** (1–2 sentences, before you touched it).
3. **What I owned** (3 bullets, active verbs).
4. **The call to adventure** (2–3 sentences, the problem that forced the work).
5. **The ordeal** (3–5 sentences, the moment your plan broke).
6. **What I shipped** (decision + 1 supporting shot — use `stays`, `plan`, `events` where they illustrate the decision, not decorative).
7. **Result** (2–3 honest metrics with units, before → after).
8. **What I'd do differently** (2–3 sentences, honest, growth signal).
9. **Build notes** — compact `dl`, beside the decision, not 4 essays after Results.
10. Prev/next + More work via `ProjectCard`.

**Screens rules (critical):**
- Each unique `src` **once per page**. Hero = one money shot. Gallery = leftover screens, **flat** `ShotFigure`, lightbox. Cross-viewport proof = one annotated pair for the money flow only.
- KenyaTrace gallery must include **Plan** as first-class (the 6→3 story), not a second Home.
- LegalFlow: capture **actual** matter/billing UI or stop claiming it in captions. Don't invent metrics.
- Inline-merge GiGi `screens[]` so gallery doesn't reuse `tileShot` src.
- Inline-merge LegalFlow `screens[]` so gallery doesn't reuse `tileShot` src.

**E2E update:**
- Keep the structural assertions (Role/Stack/Outcome/Screens/Results/Live).
- Drop the `expect(page.getByRole("link", { name: /^Case study$/ })).toHaveCount(3)` in favor of `a[href^="/work/"]` count.
- Update lightbox test to navigate across multiple images once KenyaTrace gallery grows.

**Done when:** no page renders the same `src` twice; e2e still finds Role/Stack/Outcome/Screens/Results/Live; Lighthouse images are WebP/lazy; LegalFlow either has real product screens or honest "landing-page only" copy.

---

### Phase 3 — Design system hygiene (~1–2 days)

**Goal:** Looks designed once, not generated four times.

**Components:**
- Add `client/src/components/ui/SectionLabel.tsx`. Replace **all 13** inline section-label recipes. Source list: `WorkSection.tsx:16-19`, `About.tsx:29-32`, `Contact.tsx:94-97`, `CaseStudyLayout.tsx:155-158,186-189,263-266,280-283,321-324`, `SiteFooter.tsx:75-77,117-119`, `BuyMeCoffee.tsx:175-177,215-217,252-257`. Use the existing `Kicker` or delete it.
- Add `client/src/components/ui/Surface.tsx`. Replace 30+ hand-rolled `border border-border bg-card` instances. Standardize tone prop: `default` | `muted` | `outlined`.
- Tokenize `Lightbox.tsx` hardcoded hex into local CSS vars (`--lightbox-bg`, `--lightbox-fg`, `--lightbox-border`, `--lightbox-accent-fg`).
- Resolve token soup in `index.css` — pick one of: `--background`/`--card`/`--secondary`. Recommend: kill `--card` and `--secondary` aliases (all currently `#f2ede6`), keep `--background`.
- Drop `--font-accent` alias or set it to mono for kickers only.
- Add `<a href="#main" class="sr-only focus:not-sr-only">Skip to content</a>` in `App.tsx`. Wrap page bodies in `<main id="main">`.
- Eager-load the first `ProjectCard` image; lazy the rest.

**Visual rules:**
- One accent move per viewport (hero highlight *or* section underline).
- Availability once (header right or hero).
- Lime on cream: contrast audit, keep `prefers-reduced-motion`.
- Footer: tokenize so it isn't a foreign black slab, **or** document "always inverted" and stop fighting it.

**Media diet:**
- Image pipeline: `/media/{slug}/` WebP + srcset.
- Delete unused JPG/tablet/thumbnail variants.
- Update `optimize-images.mjs` to skip the deleted variants.
- Document `optimize-images.mjs` in README if you add a README.

**Done when:** theme toggle doesn't leave foreign hex islands; `pnpm run build` asset list has no unused process/thumbnail trees; one `SectionLabel`, one `Surface`, one `ShotFigure`.

---

### Phase 4 — Proof and growth (ongoing, needs Mike)

**Goal:** Developer-credible artifacts without fake seniority.

- Per-project GitHub or "private — stack listed." (Decision in §9 below.)
- Optional: screenshot of green CI / Playwright on the **portfolio** quality note (CI file already exists).
- Employment timeline **only** with titles and dates Mike pastes.
- Privacy-friendly analytics (Plausible / Umami) — which study is opened.
- JSON-LD `CreativeWork` for the three products (`Person` already in `index.html`).
- Custom domain if still applying off `*.vercel.app`.
- Convex: drop `projectType` in a migration when convenient.
- Resend `from` for service request emails: replace `onboarding@resend.dev` with custom domain or document why it stays.

**Not in this phase:** conceptual banking/dashboard/DS studies until Figma exports and process photos exist.

---

## 7. Decisions Mike should make before Phase 1

Product decisions. Implementing without them adds another residue layer.

1. **One headline.** Pick one (see §6 Phase 1).
2. **Keep `/work`?** Recommend yes as share URL.
3. **CV:** public link vs remove file. (Phase 0 default: remove.)
4. **Confirm claims:** did you implement KenyaTrace/GiGi frontend (not design-only)? Are GiGi validation/cart notes true? Are 6→3 and 360px parity measured?
5. **Per-project GitHub URLs** (or explicit private).
6. **LegalFlow** URL stability (`law-ten-iota` vs older 404s). Need unique in-app screens if the product has them.
7. **Coffee** stays footer-only (recommend keep).
8. **Identity:** one LinkedIn handle, one GitHub handle. Pick one set, delete the other from `documents/`.

---

## 8. Suggested implementation sequence

```
Phase 0  →  ship immediately (dead exports, leaked creds, identity drift, stats honesty)
Phase 1  →  IA + thinner /work + outcome titles + one headline + one CTA
Phase 2  →  case-study showcase + unique screens
Phase 3  →  tokens, dead CSS, SectionLabel, Surface, image pipeline
Phase 4  →  repos, analytics, JSON-LD CreativeWork, real experience, Convex cleanup
```

**Do not** add a fourth live tile until the three existing stories are unique and true.

---

## 9. Implementation file map

| Path | Phase | Change |
|---|---|---|
| `.project-config.json` | 0 | Delete (leaked creds) |
| `attached_assets/` | 0 | Delete |
| `documents/pawa-it-*` | 0 | Move out |
| `tsconfig.node.json` | 0 | Delete |
| `client/public/.gitkeep` | 0 | Delete |
| `client/public/thumbnails/*` | 0 | Delete (unused) |
| `client/public/shots/**/*-tablet.jpg` | 0 | Delete (unused) |
| `client/public/CV.pdf` | 0 | Delete (CV link stays in About only if Phase 1 keeps it) |
| `client/src/data/caseStudies.ts` | 0–2 | Drop `liveSlugs`, `StudyKind.CONCEPTUAL`; merge into `projects.ts` in Phase 2 |
| `client/src/data/caseVisuals.ts` | 0–2 | Drop `Shot.tablet`; merge into `projects.ts` in Phase 2 |
| `client/src/data/siteContent.ts` | 0–1 | Drop project-specific hero stats; align with one headline |
| `client/src/components/CaseStudyLayout.tsx` | 0–2 | Remove dead wiring; rebuild per 6-beat template |
| `client/src/components/ProjectCard.tsx` | 1 | Outcome title on card; eager first image |
| `client/src/components/Hero.tsx` | 1 | One role line, one CTA, one featured visual |
| `client/src/pages/Home.tsx` | 1 | Section list (already correct shape) |
| `client/src/pages/Work.tsx` | 1 | Thin index — strip giant second hero |
| `client/src/lib/navigation.ts` | 1 | Document Work home vs `/work` |
| `client/src/components/WorkSection.tsx` | 1 | Use SectionLabel; remove "Selected work · 03" trick |
| `client/src/components/About.tsx` | 1 | Use SectionLabel; remove duplicated timeline stats |
| `client/src/components/Contact.tsx` | 0–1 | Replace inline LinkedIn SVG; honeypot throws; use SectionLabel |
| `client/src/components/SiteFooter.tsx` | 1–3 | Tokenize; use SectionLabel; drop redundant "Live work" sub-list or keep minimal |
| `client/src/components/Lightbox.tsx` | 0–3 | Drop unused props; tokenize hex |
| `client/src/components/BuyMeCoffee.tsx` | 3 | Use SectionLabel |
| `client/src/components/ui/SectionLabel.tsx` | 3 | New — one component |
| `client/src/components/ui/Surface.tsx` | 3 | New — one card component |
| `client/src/index.css` | 0–3 | Drop `--font-accent`; resolve `bg-background/card/secondary` soup; live-dot already tokenized |
| `client/src/App.tsx` | 3 | Skip-to-content link |
| `client/index.html` | 0–1 | Drop hardcoded title/description/OG (SiteHead is source); align JSON-LD `jobTitle` with one headline |
| `convex/schema.ts` | 0 | Fix `projectType` comment |
| `convex/serviceRequests.ts` | 0 | Throw on honeypot (ConvexError) |
| `e2e/smoke.spec.ts` | 0–2 | Tighten assertions; add multi-image lightbox nav test |
| `scripts/thumb-variants.mjs` | 0 | Delete (output dir also deleted) |
| `scripts/optimize-images.mjs` | 3 | WebP + srcset only; document in README |
| `scripts/capture-portfolio-thumbnails.mjs` | 3 | Delete (no consumer) |
| `playwright.config.ts` | — | Leave; flag `reuseExistingServer: true` divergence |
| `AGENTS.md` | 0 | Note Vercel URL drift; canonical is `SITE_URL` in code |

---

## 10. Sources

| Source | What we took |
|---|---|
| [Matej Latin — 30 seconds](https://matejlatin.com/blog/only-30-seconds-to-reject-your-portfolio/) | First-screen clarity; kill generic templates, repetition, weak titles |
| [UXfolio 2026 playbook](https://blog.uxfol.io/ux-portfolio-playbook/) | 3–5 projects; 3–5 min skim; visuals replace paragraphs |
| [SuperHive — recruiter structure](https://www.superhive.co/ux-design-portfolio-projects-structure-recruiters-want) | One target role; decisions + trade-offs; outcomes |
| [WeAreArch — scan window](https://wearearch.com/blog/ui-ux-design-portfolio) | Outcome in the thumbnail; impact near the top of the study |
| [Emily Backes — case studies broken](https://emilybackes.design/post/ux-case-studies-broken) | Argument not process dump; <800 words; tension early |
| [Popout — developer portfolio 2026](https://www.popout.page/blog/developer-portfolio-2026-complete-guide-build-career-selling-ai-tools) | 3–5 case studies; live demo + contact; speed |
| [Portfolio Studio — examples](https://portfoliostudio.dev/blog/best-developer-portfolio-examples) | Chiang pattern: 3–6 projects, live+GitHub, restraint |
| [Brian Young — recruiter-readable studies](https://dev.to/brianyoung/how-to-write-developer-project-case-studies-recruiters-can-actually-understand-4oe4) | Role as actions; honest outcomes; 300–600 words |
| [Fonzi — engineering case study](https://fonzi.ai/blog/engineering-case-study) | Challenge + result in the title; constraints; before/after units; lessons |
| [brittanychiang.com](https://brittanychiang.com/) / [v4](https://v4.brittanychiang.com/) | IA, CTA restraint, live+repo, no services-icon theater |
| [rauchg.com](https://rauchg.com/) | Extreme minimal — restraint as craft |
| [leerob.io](https://leerob.io/) | Single-page anchor IA; bio + writing + projects |

---

## 11. Closing rule

When implementation starts, start at **Phase 0**. It does not need the headline/GitHub-per-project decisions in §7.

After each phase: `pnpm run check`, `pnpm run build`, `pnpm test` (Playwright smoke). No merge unless all three are green.
