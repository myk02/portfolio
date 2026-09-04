# Portfolio Restructure Plan V3 — Phased Rebuild

**Date:** 2026-09-04
**Working tree:** `C:\Users\ADMIN\OneDrive\Desktop\mike\sites\portfolio`
**Live:** https://mikeships.vercel.app (canonical in `client/src/lib/site.ts:3`)
**Stack:** Vite 7 · React 19 · TypeScript · Tailwind v4 · Convex · Wouter · Playwright · Framer Motion

**Status of prior plans:** `RESTRUCTURE-PLAN.md` and `RESTRUCTURE-PLAN-V2.md` are ~70% stale. Phase 0 cleanups they proposed (BrandEdge removal, `RolesShowcase` removal, `Shot.tablet`, `liveSlugs`, `projectType`, thumbnail dirs, `.project-config.json`, `attached_assets/`, `pawa-it-*` docs, dual icon systems, device-mockup addiction) have **already landed** — verified absent on disk. **Do not re-implement them.** This V3 is the new source of truth: it re-audits the *current* tree file-by-file, folds in fresh Sept-2026 web research, and lays out the remaining work in shippable phases.

**How to use this file:** implement Phase 0 first (no product decisions needed). Phases 1–2 need Mike's decisions in §8. Each phase ships only when `pnpm run check` + `pnpm run build` + `pnpm test` (Playwright smoke) are all green.

---

## 1. North star (one sentence)

A recruiter or hiring manager should, in **~30 seconds**, know who you are, that the work is live, what you personally owned, and how to contact you — then, if they stay, read **one visual-first study** without seeing the same screen twice or the same stat four times.

Bar (sources in §9):

- Matej Latin — portfolios get **rejected in ~30 seconds**; generic templates and repetitive images are kill signals.
- UXfol.io 2026 playbook (74 recruiters) — **3–5 min** skim; **3–5 projects max**; visuals carry the story.
- SuperHive / WeAreArch — name the **target role in plain language**; outcome in the thumbnail.
- Emily Backes — a case study is an **argument**, not a process dump.
- Brian Young / Fonzi — 2–3 deep studies, live URL + role + constraints + trade-offs + outcomes; 300–600 words is enough.
- Popout / Portfolio Studio 2026 — load **< 2s**, Lighthouse 90+; the portfolio *is* a code sample.

**Copy IA and restraint from** brittanychiang.com (+ v4), leerob.io, rauchg.com. **Do not copy** WebGL/Awwwards motion portfolios. Framer Motion already installed is enough — do not add another animation library.

---

## 2. Audit A — residue / broken / lying functionality (verified 2026-09-04)

### 2.1 Dead exports, types, props (safe to delete)

| # | Location | Finding | Action |
|---|---|---|---|
| A1 | `client/src/data/caseStudies.ts:51,115,175` | `liveUrlLabel` set 3× (`kenyatrace.vercel.app` etc.), **zero readers** | Delete field or render it under the Live link |
| A2 | `client/src/lib/site.ts:19` | `CONTACT.location` never imported; Hero/Footer/Contact all hardcode their own location strings | Use the constant everywhere, delete dupes |
| A3 | `client/src/lib/site.ts:12` | `CONTACT.phoneHref` (`tel:`) never imported | Either wire it into Contact or delete it |
| A4 | `client/src/data/siteContent.ts:7-9` → `Hero.tsx:140` | `heroStats` is a **1-element array mapped into a `grid-cols-3`** — 2 empty columns, layout bug | Replace with single stat block or 3 real distinct stats |
| A5 | `client/src/data/caseStudies.ts:1,217` | `StudyKind = "LIVE PRODUCT"` single literal; `liveStudies = filter(kind === "LIVE PRODUCT")` is a tautology | Collapse to plain `projects` array |
| A6 | `client/src/data/caseVisuals.ts:1-9` vs `components/artifacts/MetricCard.tsx:3-17` | **Duplicate `MetricCardData` interface** (identical 7 fields), two sources | Keep one, import in the other |
| A7 | `client/src/data/caseVisuals.ts:19-23` → `CaseStudyLayout.tsx:43,121-122` | `PrototypeLink.kind: "internal" \| "external"` — all 3 records are `external`; internal branch never taken | Collapse to plain URL |
| A8 | `client/src/data/caseStudies.ts:9-14` → `CaseStudyLayout.tsx:46-58` | `EngineeringNotes{architecture, stateForms?, dataIntegration?, qualityChecks?}` split is destroyed at render (two fields merged into "Build", one renamed "Quality") | Reshape type to `{ build, quality }` to match render |
| A9 | `client/src/data/caseVisuals.ts:27-30` | `validate: { before, after }` labels are verbatim `"Before"/"After"` ×3 — constants masquerading as data | Hoist to component, drop from data |
| A10 | `components/engineering/StatusBadge.tsx:6-11` | `label` + `className` props never passed by either caller (`ProjectCard.tsx:34`, `CaseStudyLayout.tsx:82`) | Remove props or wire a real variant |
| A11 | `components/artifacts/Screens.tsx:35-41` → `CaseStudyLayout.tsx:265-269` | `DeviceShots{ title = "Shipped screens" }` never passed; layout already renders `h2 Screens` → **double heading + `· N` count** | Delete prop, keep one heading |
| A12 | `components/Lightbox.tsx:166,177` | `quiet = false` — zero callers pass `quiet=true` | Delete prop |
| A13 | `components/ProjectCard.tsx:103-109` → `WorkSection.tsx:37`, `Work.tsx:41`, `MoreWork.tsx:12` | `ProjectCardGrid{ reveal = true }` — all 3 callers omit it; `else` branch `:117-121` dead | Delete prop/branch |
| A14 | `components/Reveal.tsx:5-8` | `as / scale / id / style` — `scale` used once (`About.tsx:43`), `as="div"` once, `id`/`style` zero uses | Trim to used props |
| A15 | `components/CountUp.tsx:15-27` → `Hero.tsx:146` | `parseCountable` regex + `className` prop overkill for a single `"3"` | Simplify or drop component |
| A16 | `contexts/ThemeContext.tsx:16,34-36` → `App.tsx:64`, `SiteHeader.tsx:126` | `getInitialTheme(fallback)`, `switchable = false` — always called with `switchable`, toggle always truthy | Remove dead conditional |
| A17 | `components/About.tsx:90` | `aboutParagraphs[1] &&` — array is always length 2 (`siteContent.ts:11-14`) | Remove guard |

Already-fixed V2 claims (do NOT redo): `liveSlugs`, `Shot.tablet`, `Lightbox srcSet/sizes`, `CaseStudyLayout scrollToSection`, `convex/schema projectType`, inline LinkedIn SVG, `scripts/thumb-variants.mjs`, `.project-config.json`, `attached_assets/`, `pawa-it-*`, `tsconfig.node.json`, `thumbnails/`, `*-tablet.jpg` — all verified gone.

### 2.2 Lying, unsourced, or drifting content

| # | Location | Finding |
|---|---|---|
| B1 | `client/index.html:10` vs `siteContent.ts:8`, `SiteHead.tsx:73`, `WorkSection.tsx:18`, `Work.tsx:36` | Dynamic count (`liveStudies.length` = 3) everywhere **except** hardcoded `Three live products shipped` in `index.html`. 4th project = drift. `Selected work · 03` zero-pad trick in `WorkSection.tsx:18` |
| B2 | `caseStudies.ts:55,119`, `caseVisuals.ts:70-98,129-156` | Unsourced deltas presented as fact: `6→3 taps (tested)`, `4→3 steps AA`, `100% every task at 360px`, `2.1:1→≥4.5:1`, `matches ~80% shoppers`, `Funnel halves at payment`, `12 interviews · 34 surveys`, `GA4 + 5-store audit`. No method, date, n, link, or artifact |
| B3 | `caseStudies.ts:101-104,160-164,208-213` | `engineeringNotes` are single-sentence fragments (`Verified at 360px; counted interactions`) styled as engineering rigor |
| B4 | `caseStudies.ts:179-180`, `caseVisuals.ts:166-222` | **LegalFlow honesty gap (worst):** copy claims matters/billing/M-Pesa/PWA; all 4 shots are marketing bands (`home-desktop/scroll/features-desktop.jpg`). Zero matter/billing UI in repo |
| B5 | `caseVisuals.ts:93` vs `:220` | Viewport inconsistency: KenyaTrace `360px` vs LegalFlow `390px` |
| B6 | `About.tsx:7-11` | `TIMELINE 2024/2025/2025 — shipped`, year-only, restates card facts. No months, no employers — reads as filler |
| B7 | `lib/site.ts:3` vs `AGENTS.md:11-13` | `mikeships.vercel.app` (code, correct) vs `portfolio-delta-bay-50.vercel.app` + `pastel-grouse-884.convex.cloud` (ops doc). Canonical lives in code; note the drift, don't fight the generator |
| B8 | Identity ×4 | `index.html:9` + `SiteHead.tsx:71` (`Software Developer · UI/UX Developer · Automation Specialist`) vs `siteContent.ts:3` (`Frontend developer · Nairobi / remote`) vs `index.html:27` JSON-LD `jobTitle: Software Developer` vs `scripts/generate-cv.mjs:101` (`Web Developer & Frontend Engineer`) |
| B9 | LinkedIn ×2, GitHub ×2 | `lib/site.ts:16` `/in/mikeships` (+ `Contact.tsx:163`, `index.html:35`) vs `generate-cv.mjs:105` `/in/mike-waitindi-654bb2344`. Committed `client/public/CV.pdf` ships the wrong handle |
| B10 | `caseStudies.ts:50,114` + `caseVisuals.ts:44,103,163` | Trailing-slash inconsistency (`gigiflavours.vercel.app/` vs `kenyatrace.vercel.app`) |
| B11 | `caseStudies.ts:52,116,176` | Per-project repo URLs (`myk02/tourist|drink|legalflow`) unverified public/private; e2e never checks them |
| B12 | `e2e/smoke.spec.ts:3` | `LIVE_SLUGS` hardcodes slugs — drifts from `caseStudies.ts:43,107,167` source of truth |
| B13 | `e2e/smoke.spec.ts:42,54` | `Live production ×3` passes only via `StatusBadge` default; tile-image count accidentally passes (footer `Live work` links have no `img`) |

### 2.3 Env / backend failure modes (form looks fine, submit fails)

| # | Location | Finding |
|---|---|---|
| C1 | `vite.config.ts:9-11`, `client/src/main.tsx:12-21` | Build throws without `VITE_CONVEX_URL` (correct); dev falls back to `placeholder.convex.cloud` + `console.error` → Contact/BuyMeCoffee render but fail at click time with generic `Couldn't start…` |
| C2 | `convex/serviceRequests.ts:47-51` | No `RESEND_API_KEY` → `console.warn` + store-only; **user sees success though owner is never emailed**. Silent lead loss |
| C3 | `convex/donations.ts:18-21`, `convex/http.ts:42-44` | No `PAYSTACK_SECRET_KEY` → 500/throw; client maps to generic error |
| C4 | `.env.example:1-7` | Mixes client (`VITE_`) + server keys with no prefix docs; `SITE_URL` duplicates `lib/site.ts:3` |

### 2.4 Unused assets / orphan scripts / docs in deploy

| # | Path | Finding |
|---|---|---|
| D1 | `client/public/shots/*/*-mobile.jpg` (11 files: kenyatrace ×5, gigi ×4, legalflow ×2) | Zero references in `src` (`grep mobile.jpg` = 0). Pure weight. `scripts/capture-live-screens.mjs:17,26-102` still generates `tablet` variants that were deleted — guarantees future waste |
| D2 | `client/public/CV.pdf` | Committed artifact of orphan `scripts/generate-cv.mjs` (wrong LinkedIn handle, B9). Decide: link once or delete |
| D3 | `client/public/og-cover.png` (via `SiteHead.tsx:43` default) | Existence/size/contrast unverified |
| D4 | `scripts/optimize-images.mjs:53-98` | References `process/home/*.png`, `refs/kenya-hero.png`, `brand1.png`, `thumbnails/*.mp4` — none exist. No `package.json` caller for any script in `scripts/` |
| D5 | `RESTRUCTURE-PLAN.md`, `RESTRUCTURE-PLAN-V2.md` (repo root) | No `README.md`; `vercel.json` has no exclusion → **old plans ship to Vercel**. Move out of source tree |
| D6 | `dist/`, `vite.log`, `test-results/`, `.vercel/`, `node_modules/`, `.freebuff/`, `.manus/`, `.manus-logs/` | Present on disk, correctly gitignored — do not commit |

---

## 3. Audit B — AI-slop UI (visual language)

Keep cream/ink/lime and `border-radius: 0`. Change the **repetition**. Counts verified by grep 2026-09-04.

### 3.1 Section-label / kicker soup (8 + ~10)

- `.section-label` class used **8×**: `WorkSection.tsx:16`, `About.tsx:29`, `Contact.tsx:94`, `CaseStudyLayout.tsx:153,184,261,278,319`.
- Same `text-[10px/11px] font-mono uppercase tracking-widest` hand-rolled **~10 more**: `MoreWork.tsx:9`, `Screens.tsx:44`, `SiteFooter.tsx:75,99,117`, `BuyMeCoffee.tsx:175,215,252`, `MetricCard.tsx:49`, `About.tsx:99,120`.
- `ui/kicker.tsx` `Kicker`/`Card` exists but is used only ~2×. **Fix:** one `SectionLabel` component, replace all 18; delete or repurpose `Kicker`.

### 3.2 Lime / accent (~30 hits — signal destroyed)

`bg-accent`: `Hero.tsx:68,89`, `Contact.tsx:62,90`, `ProjectCard.tsx:18`, `NotFound.tsx:25-26`, `SiteFooter.tsx:50`, `CaseStudyLayout.tsx:301`. `border-accent`: `Hero.tsx:143`, `About.tsx:92`, `CaseStudyLayout.tsx:242`, `MetricCard.tsx:45`. `text-accent`/hover: `Hero.tsx:51`, `Contact.tsx:120,136,147`, `SiteFooter.tsx:75,88,117,123,134,145,156`, `SiteHeader.tsx:104,118`. Lightbox hovers `Lightbox.tsx:108,124,139` (`hover:bg-[#e8ff47]` ×3). Lime period in `NotFound.tsx:34`.
**Rule (§6): one accent move per viewport** — hero highlight *or* section underline, never both; lime reserved for H1 highlight + live dot.

### 3.3 Card soup (19×) + token soup

`border border-border bg-card` hand-rolled **19×**: `kicker.tsx:10`, `ProjectCard.tsx:16,50`, `Hero.tsx:17,107`, `About.tsx:44,100`, `Contact.tsx:61,119,131,187`, `CaseStudyLayout.tsx:107,171,218,234,242,326`, `Screens.tsx:17`, `MetricCard.tsx:48`, `NotFound.tsx:24`, `BuyMeCoffee.tsx:166`.
`index.css:59,61,65` — `--background / --card / --secondary` **all `#f2ede6`** in light mode (distinction meaningless); dark diverges (`#141310/#1b1917/#141310`). Body uses `bg-secondary` (`index.css:137`).
**Fix:** one `Surface` component (`default | muted | outlined`); collapse `--card`/`--secondary` aliases (keep `--background`).

### 3.4 Hardcoded hex islands (13×, theme-blind)

`Lightbox.tsx:96` (`bg-[#0b0a08]/95`), `:99,146` (`border-[#f2ede6]/15` ×2), `:100,108,124,139,147,148` (`text-[#f2ede6]` ×6), hovers `#e8ff47/#141310` ×3. `NotFound.tsx:18` inline `rgba(10,10,10,0.8)` grid. Dark toggle leaves these stranded.
**Fix:** local CSS vars (`--lightbox-bg/fg/border/accent`) in Phase 3.

### 3.5 Screenshot duplication (cross-surface) + availability/CTA repetition

- In-page dedupe exists (`CaseStudyLayout.tsx:22-29` `uniqueSrcs`) but **tile→page repeats**: KenyaTrace `home-cards-desktop.jpg` = `tileShot (:56)` + decision bullet `(:77)`; GiGi `home-products-desktop.jpg` = `tileShot (:120)` + gallery `(:116)`; LegalFlow `home-features-desktop.jpg` = `tileShot (:180)` + gallery `(:181)`.
- **Availability told 4× per scroll:** Hero pill + About chip + Contact cards + Footer line. **CTAs with same intent, 3 labels:** `Work with me` ×2 (header + hero) + `Book a 15-min chat` (Contact).
- Device mockups already gone (flat `ShotFigure` only) — keep it that way. WhatsApp icon inconsistent: `SiteFooter.tsx:158-160` `WA` text box vs `MessageCircle` in `About.tsx:15` / `Contact.tsx:117,150`.
- Dead alias `--font-accent` (`index.css:9`, = DM Sans, zero JSX refs). `body` uses `bg-secondary` not `bg-background`.

---

## 4. Audit C — inconsistent workflows / navigation / IA

| # | Area | Finding |
|---|---|---|
| E1 | **5 Work surfaces for 3 items** | Home `#work` (`Home.tsx:47`) + `/work` index (`Work.tsx:41`) + Footer `Live work` list (`SiteFooter.tsx:102-113`) + prev/next (`CaseStudyLayout.tsx:349-399`) + `MoreWork` 2 cards (`CaseStudyPage.tsx:40`). No `?from=` attribution |
| E2 | **Landmarks / skip link** | No skip-link anywhere (`grep skip` = 0). Single `<main>` only in `Home.tsx:45`; `Work.tsx:13`, `CaseStudyLayout.tsx:61`, `NotFound.tsx:6` use `div` |
| E3 | **Scroll race** | `App.tsx:22-28` `ScrollToTop window.scrollTo(0,0)` on every route races `Home.tsx:25-33` `consumePendingSection setTimeout 200ms` — works by timing, not ordering |
| E4 | **Nav divergence** | `lib/navigation.ts:37-72` documented, but `Work.tsx:21` + case pages `CaseStudyLayout.tsx:70` mount `<SiteHeader/>` with `onNavClick=undefined`; footer reimplements `onHomeSection` inline (`SiteFooter.tsx:14-26`) |
| E5 | **Logo is `<button>`, not `<a href="/">`** | `SiteHeader.tsx:99`, `SiteFooter.tsx:45` — breaks open-in-new-tab, middle-click, SEO |
| E6 | **Mobile menu focus** | `SiteHeader.tsx:45-73,158-191` traps `Tab` but never restores focus on close (Lightbox does: `Lightbox.tsx:34,57-60`) |
| E7 | **Image loading** | `ProjectCard.tsx:29` `loading="lazy"` on **all** cards incl. first above-fold (should be `eager` first, `lazy` rest). Hero visual `Hero.tsx:36-40` no `fetchpriority`. Case hero `Screens.tsx:22` eager — correct, keep |
| E8 | **SPA rewrite OK** | `vercel.json:4-10` rewrite correct for wouter; `outputDirectory dist/public` matches `vite.config.ts:23`; `buildCommand npx vite build` vs `pnpm@10` — align to `pnpm build` |

---

## 5. Research — what to copy (and what not to), Sept 2026

Fresh web research (brittanychiang.com, leerob.io, rauchg.com, UXfol.io playbook, Backes, Brian Young, Fonzi, Popout, Portfolio Studio, ShowProof). Full URL table in §9.

| Pattern | Copy | Avoid |
|---|---|---|
| **IA / nav** | Single page `/#work #about #contact` + sticky header + scroll-spy (`IntersectionObserver`); 3 projects → anchors on home + shareable `/work/[slug]` detail (static params + metadata). Header non-sticky over hero, shrink on scroll; mobile = full overlay, instant jump. Sticky in-case-study process nav | Bottom-center "modular dock", scroll-jacking, preloader gating content, hiding About/Contact from nav |
| **Hero** | `H1 name + role line` (e.g. "Frontend Engineer — I build accessible, pixel-perfect experiences") + 2–3 sentence bio + `Nairobi, Kenya / Remote · EAT UTC+3` + `Available for freelance` badge + 2 CTAs (`View Work → #work`, `Get in Touch → #contact`). Answer in <5s: who / specialty / next action. leerob-style: content-first, no decorative hero image needed | "Passionate developer who loves beautiful experiences"; 6 font sizes; stock avatar; splash animation gating LCP; rates wall (but `projects from $X` filter is OK for freelance) |
| **Project cards** | Max 3–5. Title = **outcome** (`Increasing conversions through redesigning X checkout`, not `Food Delivery App`). Each: 1-line what/who-for, Problem–Role–Stack–Result, **live + repo**, stack with *use* (`React Query for server state`), flat screenshot (640w WebP). Before/after + Lighthouse delta where relevant. Figma embed only for interaction inside the study | 10–15 tiles; screenshots-only; GitHub-only link (signals unfinished); expired/dead demos; custom cursor; heavy Lottie/particles; bootcamp clones; 40-logo tag cloud |
| **Case study** | Hybrid: UXfol.io `Hero > Overview > Discovery > Process > Final > Impact > Learnings` + Fonzi/Young engineering block (`Role/Scope, Constraints, Architecture/Tradeoffs`). Budget **300–600w dev / 600–800w UX**, cap 800–1500w; >1500w → split to `read full write-up`. Overview 3–4 sentences + 4–5 bullets (role, team, length, methods). Show failed wireframe → fix. Backes pattern: `7 interviews, 5 Zooms, 4 iterations, Smart Search 3 criteria → −18min/call` | Vague `Built todo in React`; invented %; AI-hallucinated metrics/quotes; documenting every sticky-note; linear-perfect story hiding the mess (Latin: use STAR but keep messy Action detail) |
| **Contact** | Single path: form (name + company + message → Convex, server-side + honeypot + rate-limit) + `GitHub / LinkedIn / resume PDF / timezone` in header *and* footer. Status line `Open to freelance Q3 2026`. Form > Calendly-only. Don't put raw `mailto:` in HTML (scraper) — `CONTACT.emailHref` constant + obfuscated display is the current compromise; keep | Raw `mailto:` footer; hidden email (= no replies); Calendly as only option; no contact reachable in 10s; `Coming soon` placeholder |
| **Design system** | Tokens: 1 bg + 1 ink + 1 accent for all interactive (Brittany: deep navy + mint; leerob: `#fff/#171717/#fafafa/#e5e5e5`, 17px/1.5 serif body, H1 24/−0.02em, radius 4–8px cards / 999px pills, focus `2px`, no drop shadows). Motion: entrance on in-view content only, `prefers-reduced-motion` gate, no scroll-hijack | 6 accent colors; custom cursor; scroll-jacked sections; 2.4MB animation blocking LCP; skill bars (`React 90%`); AI hero image; uncustomized template |
| **Performance** | WebP/AVIF + `width/height` (0 CLS), eager hero only, lazy below-fold, dynamic import non-critical, prerender + CDN, code-split <500KB parsed JS. Targets: **LCP <2.5s (<1.5 excellent), INP <200ms, CLS <0.1, Lighthouse 90+ mobile**. Check PageSpeed Insights mobile incognito | Hero video tanking mobile LCP; heavy anim libs on one-pager; missing dimensions; 4s LCP |
| **Credibility** | Per-project repo with README (problem, arch diagram, tradeoffs, metrics, limits); pinned repos curated; live contribution graph (not screenshot); `Person` + `CreativeWork` JSON-LD in sync with page; OG via `SiteHead` only; custom domain; `/resume` ATS PDF; analytics for which study is opened; last-updated <90d | Stale graph screenshot; hard-coded language %; 14-month-untouched pins; broken demo; full CV dump; lorem ipsum; stock laptop-cafe photo; AI filler without repo match |
| **A11y** | `Skip to Content` first focusable → `tabindex=-1` main, visible on focus. Landmarks `header/nav/main/section/footer`, one H1, logical H2/H3, alt + captions, AA 4.5:1, visible 3:1 focus ring, `Esc` closes drawer, `aria-pressed` filters, axe 0 violations, Lighthouse A11y 100. Test 375px iPhone SE | `outline:none` with no replacement; hover-only menus; drawer with no focus-return; icon-only unnamed buttons; heading jumps; overlay widget claiming compliance |

Outcome-aware titles to adopt (Matej formula):

- KenyaTrace — "Multi-stop trip planning in 3 taps on 3G"
- GiGi — "Checkout 4→3, M-Pesa first, AA contrast"
- LegalFlow — "Matters, billing, and M-Pesa in one mobile workspace" (only once real app screens exist; until then use honest "landing-page" framing per Phase 2)

---

## 6. Target structure

### 6.1 Content model (single source — merge `caseStudies.ts` + `caseVisuals.ts`)

New `client/src/data/projects.ts` so a tile cannot drift from its case page:

```ts
type Project = {
  slug: string;
  name: string;
  year: number;
  liveUrl: string;          // normalized, no trailing slash
  liveUrlLabel: string;     // rendered under Live link (fixes A1) — or delete
  repoUrl?: string;         // omitted = "private — stack listed"
  outcomeTitle: string;     // Matej formula (§5)
  oneLiner: string;
  role: string;             // active verbs, not "Research · IA · UI build"
  stack: string[];          // with use, e.g. "React Query for server state"
  timeline: string;         // e.g. "Solo · 5 weeks"
  context: string;          // 1–2 sentences, before you touched it
  ownership: string[];      // 3 bullets, active verbs
  problem: string;          // 2–3 sentences
  ordeal: string;           // 3–5 sentences, what broke
  decisions: Array<{ label: string; text: string; shot?: string }>;
  metrics: Array<{ label: string; before?: string; after: string }>; // units + before→after, or qualitative
  screens: string[];        // unique paths only, never equal to heroShot/tileShot
  heroShot: string;
  tileShot: string;         // must differ from heroShot and from every screens[] entry
  buildNotes?: { build?: string; quality?: string };  // matches render (fixes A8)
};
```

Delete: `StudyKind` tautology (A5), duplicate `MetricCardData` (A6), `PrototypeLink.kind` (A7), `validate` Before/After constants (A9), `image`/thumbnail fields, `liveSlugs`-style derived lists (import from source instead).

### 6.2 Component inventory

| Keep / reshape | Kill or fold |
|---|---|
| `SiteHeader`, `SiteFooter`, `Hero`, `Contact`, `About`, `Lightbox`, `SiteHead`, `ProjectCard`, `CountUp` (simplified) | `TileArt` phone (already gone — keep gone) |
| `CaseStudyLayout` as **showcase** (6-beat hybrid, §7 Phase 2) | Numbered 01–06 chrome; 4 identical engineering cards |
| `BuyMeCoffee` in footer only | Any second placement |
| `StatusBadge` live-only | Unused `label`/`className` props (A10) |
| `Reveal` (trimmed props) | `as/scale/id/style` arms nobody uses (A14) |
| **Add:** `ui/SectionLabel`, `ui/Surface`, `ShotFigure` (flat, already exists — standardize) | `Kicker` if not repurposed as `SectionLabel` |

One `SectionLabel`. One `Surface` (`default | muted | outlined`). One flat `ShotFigure`. Stop inventing a fourth kicker.

### 6.3 Visual system rules (write into CSS)

1. Tokens only — no `#e8ff47 / #f2ede6 / #0b0a08 / #141310` in JSX except documented exceptions (lightbox overlay vars).
2. **One accent move per viewport** (hero highlight *or* section underline, not both).
3. Type: Fraunces + DM Sans + JetBrains Mono. Delete `--font-accent` alias (`index.css:9`) or point it at mono for kickers only.
4. `border-radius: 0` global stays; `live-dot` pill exception already documented — keep.
5. Light cream default. Footer: tokenize or document "always inverted" — stop fighting it.
6. Availability: **one** live pill (header right or hero). Nowhere else.
7. Lime reserved for H1 highlight + live dot. Nowhere else.
8. Collapse `--card` / `--secondary` into `--background` in light theme (all `#f2ede6` today); keep distinct only in dark.

### 6.4 Navigation / a11y rules

- In-page ids only on `/`. `Work` from other routes → `/work` (share URL). Logo → `/` as `<a href="/">` (fixes E5).
- Primary CTA in header only. Footer: compact nav + email + LinkedIn + GitHub + coffee. No second theme switch.
- Skip-to-content link as first focusable element → `<main id="main" tabIndex={-1}>` on **every** route (fixes E2).
- One H1 per route; logical H2/H3; `Esc` closes menu + lightbox; focus restored on close (fixes E6); `prefers-reduced-motion` kept.
- Above-fold first `ProjectCard` image `eager` + `fetchpriority="high"`; rest `lazy` (fixes E7). Case hero `eager` (keep). Order `ScrollToTop` vs pending-section consumption (fixes E3) — consume first, then scroll.

---

## 7. Phased roadmap

Estimates assume one implementer who knows this repo. **Do not start with a visual redesign or a new animation library.**

### Phase 0 — Stop the lying (~0.5 day, no Mike decisions needed)

**Goal:** tests, docs, UI, identity, and env handling agree. Nothing dead, nothing silently failing.

**Code & data:**

- [ ] Delete dead props/branches: A10 (`StatusBadge` props), A11 (`DeviceShots.title`), A12 (`Lightbox.quiet`), A13 (`ProjectCardGrid.reveal`), A14 (`Reveal` unused arms), A16 (`ThemeContext` dead conditional), A17 (`About` guard). Fix A4 (`heroStats` grid-cols-3 with 1 item).
- [ ] Collapse dead types: A5 (`StudyKind` tautology), A6 (duplicate `MetricCardData`), A7 (`PrototypeLink.kind`), A8 (`EngineeringNotes` → `{ build, quality }`), A9 (`validate` constants).
- [ ] Wire or delete: A1 (`liveUrlLabel`), A2 (`CONTACT.location`), A3 (`CONTACT.phoneHref`).
- [ ] Env honesty (C1–C4): dev banner when `VITE_CONVEX_URL` is placeholder ("contact form disabled in dev"); `serviceRequests.ts` — either send owner email or surface "stored, email not configured" instead of fake success; document `VITE_` vs server keys in `.env.example`; align `buildCommand` to `pnpm build` (E8).
- [ ] E2E: derive slugs from `caseStudies.ts` instead of hardcoding (B12); tighten tile selectors (B13).
- [ ] Identity triage (cheap half): normalize trailing slashes (B10); note `AGENTS.md` URL drift (B7) without fighting the generator.
- [ ] Media diet: delete 11 `*-mobile.jpg` (D1) and stop `capture-live-screens.mjs` generating `tablet` variants; decide CV link-once vs delete `CV.pdf` (D2); verify `og-cover.png` size/contrast (D3).
- [ ] Repo hygiene: move `RESTRUCTURE-PLAN.md` + `RESTRUCTURE-PLAN-V2.md` out of the source tree (D5, e.g. `docs/archive/` gitignored or outside repo); stub orphan `scripts/` entries or add `package.json` callers (D4).

**Done when:** `pnpm run check` + `build` + `test` green; no dead props; dev-without-Convex states its limits; slugs come from one source; no unused `*-mobile.jpg` in deploy; old plans no longer ship to Vercel.

### Phase 1 — One story, one path (~1 day; needs §8 decisions 1–3)

**Goal:** IA a recruiter can operate without thinking. One identity, one CTA, one availability line.

**Home composition:**

```
Hero (compact, content-first per leerob)
  Kicker (mono, one line, ONE role — §8.1)
  H1 (one lime highlight word, only here)
  Availability pill (once — header right OR hero, not both)
  CTAs: View work → #work · Work with me → #contact
  One featured visual (KenyaTrace money shot: Plan/live UI, not a third home)
  Stats: 1 portfolio stat only ("3 live products"); per-project deltas move to cards/studies
Featured work (3 ProjectCards, flat)
  Outcome one-liner on each card (Matej formula, §5)
  Live + Case study text links (+ Repo or "private — stack listed")
  First card eager + fetchpriority high; rest lazy
  No nested phone collage (already gone — keep)
About (short): portrait, 2 paragraphs, skills, real dates only; social once
Contact: direct links + short form; single intent label ("Work with me")
Footer: compact nav + social + coffee + colophon; WhatsApp icon = lucide MessageCircle
```

**`/work`:** keep as share URL; **strip the giant second hero** — page = short title + same `ProjectCardGrid` as home.

**Nav:** Work · About · Contact. Cross-page Work → `/work` except on home (scroll `#work`). Document in `lib/navigation.ts`; fix logo to `<a href="/">` (E5); single `onHomeSection` implementation shared by header + footer (E4); restore focus on mobile-menu close (E6).

**Identity:** one headline everywhere (`index.html` title + `SiteHead` + JSON-LD `jobTitle` + `roleLine` + CV header) — §8.1. One LinkedIn, one GitHub (B9). `index.html` defers title/description to `SiteHead` (single source).

**Done when:** one headline in all 5 surfaces; `/work` is not a second landing page; availability appears once; first card eager; logo is a real link; menu returns focus.

### Phase 2 — Outcome-led case studies (~2–3 days; needs §8 decisions 4–6)

**Goal:** visual-first pages matching UXfol.io skim + Fonzi engineering bar. 300–600 words per study.

**Per study (rebuild `CaseStudyLayout.tsx`):**

1. **Hero:** `outcomeTitle` + one-sentence tagline + snapshot `dl` (Role · Stack · Timeline · Live [+ Repo]) + **one** image + Live [+ GitHub] text link.
2. **Context** (1–2 sentences, before you touched it).
3. **What I owned** (3 bullets, active verbs — "built X with Y", not "Research · IA · UI build").
4. **The call to adventure** (2–3 sentences, the problem that forced the work).
5. **The ordeal** (3–5 sentences, the moment the plan broke — research surprise, constraint, estimate miss).
6. **What I shipped** (decision + 1 supporting shot; use `stays`/`plan`/`events` where they illustrate the decision, not decorative).
7. **Result** (2–3 honest metrics with units, before → after; LegalFlow qualitative-only until real screens exist).
8. **What I'd do differently** (2–3 sentences — growth signal).
9. **Build notes** — compact `dl` beside the decision, not 4 essays after Results.
10. Prev/next + More work via `ProjectCard`.

**Screens rules (critical):**

- Each unique `src` **once per page AND once across tile→page**: `tileShot ≠ heroShot ∉ screens[]`. Un-duplicate the three current collisions (§3.5).
- Gallery = unique leftover shots, **flat** `ShotFigure`, lightbox. No hero repeat. One annotated desktop/mobile pair for the money flow only.
- KenyaTrace gallery must include **Plan** first-class (the 6→3 story), not a second Home.
- LegalFlow: capture **actual** matter/billing UI or reframe copy to honest "marketing-site + PWA shell" until then. Don't invent metrics.
- Merge `caseStudies.ts` + `caseVisuals.ts` → `projects.ts` (§6.1) so drift is structurally impossible.
- Roles rewritten as actions (fixes vague "UI engineering · flows"); viewports standardized (360 vs 390 — pick one, document device).

**E2E update:** keep structural assertions (Role/Stack/Outcome/Screens/Results/Live); assert `tileShot ≠ heroShot` per study (new honesty test); lightbox multi-image nav test once KenyaTrace gallery grows.

**Done when:** no `src` repeats tile→page or in-page; e2e proves it; LegalFlow is either real-app screens or honest landing-page copy; word budget ≤600/study; roles are verbs.

### Phase 3 — Design system hygiene (~1–2 days)

**Goal:** looks designed once, not generated four times.

- [ ] Add `components/ui/SectionLabel.tsx`; replace all 8 `.section-label` + ~10 hand-rolled kickers (§3.1). Repurpose or delete `Kicker`.
- [ ] Add `components/ui/Surface.tsx` (`default | muted | outlined`); replace 19 hand-rolled card instances (§3.3). Collapse `--card`/`--secondary` aliases.
- [ ] Tokenize `Lightbox.tsx` 13 hardcoded hex → local CSS vars; fix `NotFound.tsx:18` inline grid.
- [ ] Delete `--font-accent` alias or point at mono. Body `bg-secondary` → `bg-background` (or document the choice).
- [ ] One accent move per viewport; availability once; lime = H1 highlight + live dot only.
- [ ] A11y: skip-link + `<main id="main" tabIndex={-1}>` every route (E2); order scroll-restoration vs pending-section (E3); visible focus (already in CSS — keep); axe 0 violations; 375px pass.
- [ ] Media pipeline: `/media/{slug}/` WebP + `srcset` + `width/height` (0 CLS); `optimize-images.mjs` rewritten to match reality or deleted; README documents the pipeline.
- [ ] Icons: lucide everywhere incl. WhatsApp (`MessageCircle`); footer `WA` box gone.
- [ ] Lime-on-cream contrast audit (AA 4.5:1); `prefers-reduced-motion` kept.

**Done when:** one `SectionLabel`, one `Surface`, one `ShotFigure`; theme toggle leaves no stranded hex; `build` asset list has no unused image trees; Lighthouse A11y 100.

### Phase 4 — Proof & growth (ongoing, needs Mike)

**Goal:** developer-credible artifacts without fake seniority.

- [ ] Per-project GitHub (README: problem, arch diagram, tradeoffs, metrics, limits) or explicit "private — stack listed". Verify the three `repoUrl`s (B11).
- [ ] Green-CI / Playwright note on the **portfolio** quality section (`.github/workflows/ci.yml` already exists — surface it).
- [ ] Employment timeline **only** with titles + dates Mike pastes (replace year-only `TIMELINE` filler, B6).
- [ ] Privacy-friendly analytics (Plausible/Umami) — which study is opened; optional `?from=` attribution on the 5 Work surfaces (E1).
- [ ] JSON-LD `CreativeWork` for the three products (`Person` already in `index.html`; sync `jobTitle` with §8.1).
- [ ] Custom domain if still applying off `*.vercel.app`; `/resume` ATS PDF (fix handle, B9); `/uses` page (SEO per research).
- [ ] Convex: `RESEND_API_KEY`/`PAYSTACK_SECRET_KEY`-absent paths honest (Phase 0 stopgap → real config here); `Resend from` off `onboarding@resend.dev` to custom domain.
- [ ] Reduce 5 Work surfaces to 3 (home grid + thin `/work` + prev/next) or instrument all 5 before keeping them.

**Not in this phase:** conceptual banking/dashboard/DS studies until Figma exports and process photos exist. No 4th live tile until the three stories are unique and true.

---

## 8. Decisions Mike must make (blocking Phase 1–2)

1. **One headline** for LinkedIn + CV + `<title>` + hero kicker + JSON-LD. Pick one, propagate to all 5 surfaces:
   - "Frontend engineer (React) who can also design", or
   - "Product-minded frontend developer — Nairobi / remote", or
   - "Software developer who ships design, UI, and reliable backends".
   Stop listing three jobs in the kicker.
2. **Keep `/work`?** Recommend **yes** as share URL with thin chrome (Phase 1).
3. **Per-project GitHub URLs** (or explicit private). If neither, omit the repo field per card.
4. **CV:** public link once (header or About) vs delete `client/public/CV.pdf`. Current default: file ships with wrong LinkedIn — fix handle or remove.
5. **Confirm claims:** did you implement KenyaTrace/GiGi frontend (not design-only)? Are GiGi validation/cart notes true? Are 6→3 and 360px parity measured? Unsourced → soften to qualitative or add method/n/date.
6. **LegalFlow:** is `law-ten-iota` stable? Are in-app matter/billing screens capturable? If not, approve honest "landing + PWA shell" framing.
7. **Coffee** stays footer-only (recommend keep current).
8. **Identity:** one LinkedIn (`/in/mikeships` vs `/in/mike-waitindi-654bb2344`), one GitHub (`myk02` vs stray `garymike07` in old notes). CV generator must match the pick.

---

## 9. Sources

| Source | What we took |
|---|---|
| [Matej Latin — 30 seconds to reject](https://matejlatin.com/blog/only-30-seconds-to-reject-your-portfolio/) | First-screen clarity; kill generic templates, repetition, weak titles |
| [Matej Latin — STAR case study framework](https://matejlatin.com/star-case-study-framework/) | STAR with messy Action detail |
| [UXfol.io 2026 portfolio playbook](https://blog.uxfol.io/ux-portfolio-playbook/) | 3–5 projects; 3–5 min skim; visuals replace paragraphs |
| [UXfol.io case study template](https://blog.uxfol.io/ux-case-study-template/) | Hero > Overview > Discovery > Process > Final > Impact > Learnings |
| [Emily Backes — case studies broken](https://emilybackes.design/post/ux-case-studies-broken) | Argument not process dump; <800 words; tension early |
| [Emily Backes — Folsom case study](https://emilybackes.design/case-study/folsom-psychology) | Concrete receipts (7 interviews, −18min/call) |
| [Brian Young — recruiter-readable studies](https://dev.to/brianyoung/how-to-write-developer-project-case-studies-recruiters-can-actually-understand-4oe4) | Role as actions; honest outcomes; 300–600 words |
| [Fonzi — engineering case study](https://fonzi.ai/blog/engineering-case-study) | Challenge + result in title; constraints; before/after units; lessons |
| [Fonzi — portfolio for engineers](https://fonzi.ai/blog/portfolio-for-engineer) | Repo README bar; live graph |
| [Popout — developer portfolio 2026](https://www.popout.page/blog/developer-portfolio-2026-complete-guide-build-career-selling-ai-tools) | 3–5 studies; live demo + contact; speed |
| [Popout — what gets you hired 2026](https://www.popout.page/blog/developer-portfolio-2026-what-actually-gets-you-hired) | Pinned repos; last-updated <90d |
| [Portfolio Studio — examples](https://portfoliostudio.dev/blog/best-developer-portfolio-examples) | Chiang pattern: 3–6 projects, live+GitHub, restraint |
| [Portfolio Studio — how to build](https://portfoliostudio.dev/blog/how-to-build-developer-portfolio-website) | Perf + SEO thresholds |
| [ShowProof — what to include](https://showproof.io/guides/what-to-include-in-developer-portfolio/) | Contact single path; no hidden email |
| [ShowProof — frontend portfolio](https://showproof.io/guides/frontend-developer-portfolio/) | Outcome titles; flat screenshots; no tag cloud |
| [brittanychiang.com](https://brittanychiang.com/) | IA, CTA restraint, live+repo, one accent |
| [leerob.io](https://leerob.io/) | Single-page anchor IA; content-first hero; token restraint |
| [rauchg.com](https://rauchg.com/) | Extreme minimal — restraint as craft |
| [Richard Lemon — rebuilt nav twice](https://richardlemon.com/why-i-rebuilt-my-portfolio-navigation-from-scratch-twice/) | Sticky header + scroll-spy; no menu concepts |
| [Max Kruijsvoorberge — portfolio build](https://maxkruijsvoorberge.dev/projects/portfolio-website) | LCP/CLS budgets; eager-hero-only |

---

## 10. File map (implementer)

| Path | Phase | Change |
|---|---|---|
| `client/src/data/projects.ts` (new) | 2 | Merge of `caseStudies.ts` + `caseVisuals.ts`; single `Project` type (§6.1) |
| `client/src/data/caseStudies.ts` | 0–2 | Trim dead (A1, A5, A8); deleted on merge |
| `client/src/data/caseVisuals.ts` | 0–2 | Trim dead (A6, A7, A9); deleted on merge |
| `client/src/data/siteContent.ts` | 0–1 | Fix `heroStats` grid bug (A4); one headline |
| `client/src/components/CaseStudyLayout.tsx` | 0–2 | Drop double heading (A11); 6-beat rebuild; tile≠hero≠gallery enforcement |
| `client/src/components/ProjectCard.tsx` | 0–1 | Drop dead branch (A13); outcome title; eager first image |
| `client/src/components/Hero.tsx` | 1 | One role line, one CTA pair, one featured visual, one stat |
| `client/src/pages/Home.tsx` | 1–3 | `<main id="main">` model; section list (shape already right) |
| `client/src/pages/Work.tsx` | 1–3 | Thin index; `<main>`; shared `onHomeSection` |
| `client/src/pages/CaseStudyPage.tsx` | 2 | Pass merged `Project`; prev/next kept |
| `client/src/lib/navigation.ts` | 1 | Document Work home vs `/work`; shared implementation (E4) |
| `client/src/components/SiteHeader.tsx` | 1–3 | Logo `<a>` (E5); focus restore (E6); single availability pill decision |
| `client/src/components/SiteFooter.tsx` | 1–3 | Shared nav impl; lucide WhatsApp; tokenize |
| `client/src/components/WorkSection.tsx` | 1 | `SectionLabel`; drop `· 03` trick |
| `client/src/components/About.tsx` | 0–1 | Drop guard (A17); real dates; `SectionLabel` |
| `client/src/components/Contact.tsx` | 0–1 | Wire/delete phone (A3); honest no-key path (C2); `SectionLabel` |
| `client/src/components/Lightbox.tsx` | 0–3 | Drop `quiet` (A12); tokenize hex |
| `client/src/components/Reveal.tsx` | 0 | Trim props (A14) |
| `client/src/components/CountUp.tsx` | 0 | Simplify (A15) |
| `client/src/components/ui/SectionLabel.tsx` | 3 | New — replaces 18 kickers |
| `client/src/components/ui/Surface.tsx` | 3 | New — replaces 19 cards |
| `client/src/components/artifacts/Screens.tsx` | 0–2 | Single heading; flat figures; eager hero only |
| `client/src/components/artifacts/MetricCard.tsx` | 0 | Own the shared `MetricCardData` type (A6) |
| `client/src/components/engineering/StatusBadge.tsx` | 0 | Drop unused props (A10) |
| `client/src/contexts/ThemeContext.tsx` | 0 | Drop dead conditional (A16) |
| `client/src/lib/site.ts` | 0–1 | `CONTACT.location` used everywhere (A2); canonical URL stays |
| `client/src/App.tsx` | 1–3 | Skip-link; ordered scroll restoration (E3) |
| `client/index.html` | 0–1 | Defer title/desc to `SiteHead`; sync `jobTitle`; fix hardcoded count (B1) |
| `client/src/components/SiteHead.tsx` | 1, 4 | Sole OG/canonical source; `CreativeWork` JSON-LD |
| `client/src/index.css` | 0–3 | Drop `--font-accent`; collapse card/secondary soup; `bg-background` body |
| `client/src/main.tsx` | 0 | Dev placeholder banner (C1) |
| `convex/serviceRequests.ts` | 0–4 | Honest no-RESEND path (C2) |
| `convex/donations.ts`, `convex/http.ts` | 0–4 | Honest no-PAYSTACK path (C3) |
| `e2e/smoke.spec.ts` | 0–2 | Slugs from source; tile≠hero≠gallery test |
| `client/public/shots/**/*-mobile.jpg` | 0 | Delete (D1) |
| `client/public/CV.pdf` + `scripts/generate-cv.mjs` | 0–4 | Fix handle or remove (B9, D2) |
| `scripts/capture-live-screens.mjs` | 0 | Stop emitting `tablet` (D1) |
| `scripts/optimize-images.mjs` | 3 | Rewrite to reality or delete (D4) |
| `RESTRUCTURE-PLAN.md`, `RESTRUCTURE-PLAN-V2.md` | 0 | Move out of deploy tree (D5) |
| `vercel.json` / `package.json` | 0 | `pnpm build`; confirm `dist/public` (E8) |

**Suggested sequence:** Phase 0 → ship immediately (dead props, env honesty, slugs, media diet, plan-archive) → Phase 1 (IA + one headline) → Phase 2 (showcase + unique screens + `projects.ts` merge) → Phase 3 (tokens, `SectionLabel`/`Surface`, a11y) → Phase 4 (repos, analytics, JSON-LD, domain, Convex config). Do not add a 4th live tile until the three stories are unique and true.
