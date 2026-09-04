# Portfolio restructure plan (current tree)

**Date:** 3 Sep 2026  
**Live site:** [mikeships.vercel.app](https://mikeships.vercel.app)  
**Stack:** Vite 7 · React 19 · TypeScript · Tailwind v4 · Convex · Wouter · Playwright  
**This file is the source of truth.** Do not implement from archived notes — they described BrandEdge components, conceptual studies, dark-default, CV CTAs, and a 5-project Work page that no longer exist.

### Implementation status (3 Sep 2026, this session)

Landed: Phase 0, most of Phase 1–3 (honesty, thinner `/work`, flat cards/gallery, showcase layout, tokenized live-dot, dead CSS, About/footer availability cut).  
Still open: Phase 4 (per-project repos, analytics, JSON-LD CreativeWork, Convex `projectType` cleanup) and §9 product decisions (one headline, claim checks, LegalFlow in-app shots, CV).  

---

## 0. How to read this

A first pass already landed in this working tree (uncommitted as of this audit):

- `BrandEdge*` → `SiteHeader`, `Hero`, `WorkSection`, `About`, `Contact`, `SiteFooter`
- `RolesShowcase` removed
- Shared `ProjectCard` on home, `/work`, and “More work”
- Hero coffee CTA removed; Paystack stays in the footer
- Design-decision bullets now render
- GitHub in `lib/site.ts` + footer; JSON-LD `Person`; JetBrains Mono loaded
- GitHub Actions `check` + Playwright on `master`/`main`/PRs

**Do not redo those.** This plan is the *remaining* residue: dual Work IA, numbered UX-template studies, unused media, AI-pattern UI, stale tests/docs, and honesty gaps.

---

## 1. What the site is *right now*

Hire-me / freelance portfolio for **Mike Waitindi** (Nairobi). Copy still stacks three titles:

> Software Developer · UI/UX Developer · Automation Specialist  
> “I ship reliable web products.”

### Shipped work (`caseStudies.ts`)

| Project | Live URL | Role in data | Headline proof |
|---|---|---|---|
| KenyaTrace | kenyatrace.vercel.app | Research · IA · UI build | Route 6→3 taps |
| GiGi Energy | gigiflavours.vercel.app | UI engineering · flows | Checkout 4→3, AA |
| LegalFlow | law-ten-iota.vercel.app | Product · UX · Build | One workspace, PWA |

### Routes

`/` · `/work` · `/work/:slug` · 404.

**Home:** Header → hero (copy + one KenyaTrace still) → three `ProjectCard`s → About (portrait, micro-timeline, skills, social) → Contact (direct links + form) → inverted footer + coffee.

**Case study:** Status + giant name + tagline → Role/Stack/Outcome cards → live link → one desktop `ShotFigure` → 01 Problem → 02 Research (3 cards) → 03 Design decisions (3 cards) → 04 Before/after notes → 05 Device-chrome gallery → 06 inverted Results → Engineering notes (4 cards) → Prev/next → More work (`ProjectCard` × 2).

Identity (cream / ink / lime, 0 radius, Fraunces display) is still the asset. The problem is **layered residue**: two Work surfaces, a Double-Diamond chapter template on engineering products, screenshot duplication, and UI that still reads as “generated brutalist kit.”

---

## 2. North star (one sentence)

A recruiter or hiring manager should, **in ~30 seconds**, know who you are, that the work is live, what you personally owned, and how to contact you — then, if they stay, read **one visual-first study** without seeing the same screen twice or the same stat four times.

Same bar as:

- Matej Latin — portfolios get **rejected in ~30 seconds**; generic template case studies and repetitive images are kill signals ([article](https://matejlatin.com/blog/only-30-seconds-to-reject-your-portfolio/)).
- UXfol.io 2026 recruiter playbook — **3–5 minutes** to skim a whole portfolio; **3–5 projects max**; visuals carry the story; impact early ([playbook](https://blog.uxfol.io/ux-portfolio-playbook/)).
- SuperHive / WeAreArch 2026 — name the **target role in plain language**; 2–4 relevant projects; outcome in the thumbnail, not just the product name ([SuperHive](https://www.superhive.co/ux-design-portfolio-projects-structure-recruiters-want), [WeAreArch](https://wearearch.com/blog/ui-ux-design-portfolio)).
- Emily Backes — a case study is an **argument** (problem, constraint, outcome in the first screen), not a process dump ([2026](https://emilybackes.design/post/ux-case-studies-broken)).
- Developer hiring 2025–26 — **2–3 deep studies**, live URL + role + constraints + trade-offs + outcomes; GitHub when possible; site load **&lt; 2s** ([Popout 2026](https://www.popout.page/blog/developer-portfolio-2026-complete-guide-build-career-selling-ai-tools), [Portfolio Studio](https://portfoliostudio.dev/blog/best-developer-portfolio-examples), [Brian Young / DEV](https://dev.to/brianyoung/how-to-write-developer-project-case-studies-recruiters-can-actually-understand-4oe4), [Fonzi engineering case study](https://fonzi.ai/blog/engineering-case-study)).

**Copy IA and restraint from** [brittanychiang.com](https://brittanychiang.com/) (and the well-known [v4](https://v4.brittanychiang.com/)): one headline, featured work with screenshot + stack + **live + repo**, real contact, no services-icon theater.

**Do not copy** WebGL / Awwwards motion portfolios. Those sell a different skill. Framer Motion is already enough.

---

## 3. Audit — broken, lying, or leftover functionality

### 3.1 Actually broken, empty, or false

| Issue | Where | Why it matters |
|---|---|---|
| **e2e test name + comment lie** | `e2e/smoke.spec.ts` | Test is titled “exactly the **two** live projects” but asserts **3** cards / 6 tile images. CI green, humans confused. |
| **`caseStudies.image` is dead** | `caseStudies.ts` → `/thumbnails/*.png` | Cards use `TILE_ART` in `ProjectCard.tsx`. Thumbnail PNG/JPG/WebP variants are unused by the UI. |
| **Tablet shots never render** | `caseVisuals.ts` `hero.tablet` / `Shot.tablet` | Data and files exist; `ShotFigure` and `DeviceShots` only use desktop + phone. Bytes with no job. |
| **Hero Home still in the gallery data** | KenyaTrace / GiGi `screens[0]` | Layout filters `desktop === hero.desktop`, so Home/Storefront is skipped — but data still pretends those are gallery shots. Fragile. |
| **KenyaTrace hero vs tile vs live** | Three different “home” stills | Hero: `home-cards-desktop.jpg`. Case hero: `home-desktop.jpg`. Tile: cards + `home-mobile.jpg`. Recruiter sees three “homes.” |
| **Unused product screens** | `public/shots` | KenyaTrace `stays-*`, `home-scroll-*` unused. GiGi `events-*`, `home-products-*` only on tiles. LegalFlow gallery is two home-scroll/features crops of the marketing site, not matter/billing UI. |
| **Orphan process pack** | `public/process/home/*` | Homepage process timeline was deleted. Eight WebPs sit unused. |
| **Ghost `projectType`** | `Contact.tsx` always sends `"General Inquiry"` | Convex schema still requires it. Leftover from a fuller form. |
| **Ghost `CONCEPTUAL` kind** | `caseStudies.ts`, `StatusBadge` tones `concept` / `prototype` / `saas` | No conceptual studies. Dead API. |
| **Stale case-layout comment** | `CaseStudyLayout.tsx` | Still says “Hero devices → Process sections (Research / Design / Test).” Hero is one figure; process is still 01–06. |
| **Docs contradict the tree** | `IMPLEMENTATION-NOTE.md`, `PORTFOLIO-REFINEMENT-PLAN.md` | Talk about 5 studies, EvidenceSection, Engineering nav, dark-default, CV download. Any agent following them will reintroduce slop. |
| **Deploy URL drift** | `AGENTS.md` vs `lib/site.ts` | Guardian: `portfolio-delta-bay-50.vercel.app`. Canonical: `mikeships.vercel.app`. OG/canonical in code is correct; ops docs are not. |
| **“10+ e2e passing”** | `siteContent.ts` `heroStats` | Playwright suite is a small smoke file, not 10+ product tests. CI now exists (`.github/workflows/ci.yml`) — the *number* is still a slogan. |
| **CV is in public but hidden** | `public/CV.pdf` + e2e forbids Download CV | File is fetchable at `/CV.pdf`. Either link it once (header or About) or stop shipping it. Don’t leave a secret PDF. |

### 3.2 Fragile, not crashing

- Contact + coffee **require Convex**. Dev without `VITE_CONVEX_URL` logs an error and uses `https://placeholder.convex.cloud` — form looks fine, submit fails. Prod build correctly throws if the env is missing.
- Theme boot script in `index.html` must stay in sync with `ThemeContext` (`localStorage` key `theme`, light default). Easy to desync.
- `SiteHeader` on case studies passes `onNavClick={goHomeToSection}` but **Work** is special-cased to `/work`. Correct, but undocumented — next edit will break it.
- Lightbox + Esc is covered by e2e. Keep it. Stop wrapping every gallery row in full device chrome if lightbox is the detail view.
- Social icons load from `cdn.simpleicons.org` (About). Extra origin, GitHub invert hack, LinkedIn inline SVG elsewhere. Three icon systems.
- `playwright.config.ts` `reuseExistingServer: true` — local `pnpm test` against a dirty dev server can pass tests that CI (fresh server) would fail.

### 3.3 Dual Work workflow (the main IA bug)

```
Header "Work" on /     →  #work (home grid)
Header "Work" on /work →  scroll top of the same three cards
Header "Work" on /work/:slug → /work (index)
Home has no "View all work"  → good
Case study back link   → /work
Footer "Live work"     → /work/:slug
```

This is **better than the old BrandEdge era** (Experience → roles, Work from studies → home#work). It is still two full grids of the same three products with different chrome (home section header vs `/work` giant “Work.”).

While there are only three studies, Brittany-style sites use **one featured list**. A dedicated index earns its keep at 6+ projects or when you need a shareable `/work` URL — then it must be the *same* composition, not a second landing page.

---

## 4. Audit — AI-slop UI (visual language)

Keep cream / ink / lime and 0 radius. Change the **repetition**.

### 4.1 Same trick, too many times

- **Lime underline / highlight:** “reliable” in the H1, “products” in Work h2, accent period after “Work.” and “KenyaTrace.”
- **Section label recipe:** mono kicker + 6px lime dash + Fraunces heading. Every block. Fine once; numbing as a system.
- **Bordered card + 10px tracking-widest label + 13px body:** hero chips, research/design/engineering cards, contact meta, facts, timeline years — one molecule drawn everywhere.
- **Availability:** hero (“Available for work · 24h · Nairobi · Remote”), About (location chip + green Available + 24h + open-to-roles card), Contact (24h chips + timezone), Footer (available pill + Nairobi · Remote · Mon–Sat). **One place** (header or hero).
- **Stats repeated:** 3 live / 4→3 / 6→3 / AA in hero numbers, work chips, about timeline, case-study metrics. Proof should appear **once at the altitude it belongs** (hero: 3 live products; study: the specific delta).

### 4.2 Hardcoded islands (theme-blind)

Footer is `bg-foreground text-background` — inverted in both themes (intentional “dark slab”). Fine if committed; currently it fights the cream identity in light mode and looks like a second product.

Hardcoded hex still in JSX/CSS:

- `#f4efe7`, `#141310` in `ProjectCard` / `DeviceMockups`
- `#22c55e` live-dot and About “Available” (not the brand lime)
- Device chrome `#2a2a28`, black island

Light/dark cannot restyle those. Tokenize or drop.

### 4.3 Device-mockup addiction

Tiles: desktop bleed + nested phone bezel. Gallery: `DesktopMockup` + `PhoneMockup` per screen (comment even says “reduced from 3 to 2 to cut LCP”). Hero of the *portfolio* is a flat still — good. Case hero is a second still of the same product home.

**Rule:** each unique screenshot **once per page**. Hero = one money shot. Gallery = leftover screens, **flat**, click-to-lightbox. Cross-viewport proof = one annotated pair, not nested bezels on every row.

Matej Latin’s reject list includes **low-res / repetitive images** as “no attention to detail.” Recruiters read repetition as thin work.

### 4.4 CSS / component costume

Dead CSS in `index.css` (no TSX usage): `.grid-overlay`, `.tag-pill`, `.form-shell`, `.form-field`, `.type-form-title`, `.type-subtitle-hand`, `.no-scrollbar`, `.tile-flash`. Leftover from template / old tiles.

`--font-accent` is aliased to DM Sans (Space Grotesk dropped). Either delete the alias or use it on purpose.

`KickerAccent` is exported and unused.

`DeviceContent` still allows `{ node: ReactNode }` for generated art — conceptual banking era. Live studies only pass `src`.

### 4.5 Template / repo residue (non-UI)

| Residue | Action |
|---|---|
| `.manus/`, `.manus-logs/`, `.freebuff/` | Do not commit; gitignore if local tooling |
| `documents/pawa-it-*` | Graphic-design CV for another role. Conflicts with “software developer” positioning. Move out of this repo. |
| `IMPLEMENTATION-NOTE.md`, `PORTFOLIO-REFINEMENT-PLAN.md` | Archive or delete after this plan is accepted |
| `scripts/capture-portfolio-thumbnails.mjs`, `thumb-variants.mjs` | Only if `/thumbnails` is killed |
| `public/process/` | Delete with unused shots |
| `attached_assets/` | Audit; don’t ship unused binaries |

Dependencies are already slim (`package.json` is clean vs the old `add` / Google Maps / Manus plugins diet). Don’t re-add a motion library.

---

## 5. Audit — inconsistent content / positioning

1. **Three-title pile-up.** Software Developer + UI/UX Developer + Automation Specialist. Recruiters need **one headline** aligned with LinkedIn + CV ([TailorCV](https://thetailorcv.com/blog/how-to-write-portfolio-case-study), SuperHive). JSON-LD `jobTitle` is only “Software Developer” — already a split.
2. **Case studies are still a numbered UX template** (01–06) after the product was repositioned as engineering. Design and research are three identical cards; engineering is an appendix. Hiring managers for frontend look for **problem → constraint → decision → shipped UI → result**, with build notes **beside** the decision ([Fonzi](https://fonzi.ai/blog/engineering-case-study)).
3. **Roles are vague.** “Research · IA · UI build” vs “UI engineering · flows” vs “Product · UX · Build.” Recruiter cannot tell if you wrote production React or designed in Figma. Brian Young: state role as **actions you owned**.
4. **Proof is not clickable.** “Playwright e2e”, “GA4”, “verified at 360px” have no test screenshot, Lighthouse, or Action badge on the *product* studies. This repo now has CI — the **portfolio** can show a green check; KenyaTrace still cannot.
5. **LegalFlow screens don’t show the product claim.** Copy says matters / billing / M-Pesa; gallery is landing-page crops. Honesty gap.
6. **Pawa IT documents** in-repo describe WordPress/Webflow/Adobe — different person-story than the live site.

---

## 6. Research — what to copy (and what not to)

### 6.1 Information architecture — Brittany Chiang, not Dribbble

**Pattern:** sticky simple nav: About, Experience, Work, Contact. Hero = **one line of craft + one line of role**. Featured projects: name, one sentence, stack chips, **live + GitHub**. Experience = dated jobs. Contact = email, not a second brochure.

**Apply here:**

```
/                 Hero → Work (3 products) → About (short) → Contact
/work             keep as canonical share URL, same cards, thinner chrome
/work/:slug       showcase (not 6 chapters)
```

Nav: **Work · About · Contact**. No “Experience” until dated employment exists. Header CTA: one “Work with me.”

### 6.2 Homepage work tiles — engineer sites

Large **still of the live UI**, name, **outcome one-liner**, stack, two links (Case study · Live). Optional repo.

Not a nested phone-on-desktop collage on every card. One featured visual in the hero is enough theater.

Thumbnail copy should carry outcome ([WeAreArch](https://wearearch.com/blog/ui-ux-design-portfolio)): “Multi-stop trip planning in 3 taps on 3G” beats “KenyaTrace.”

### 6.3 Case-study shape — hybrid showcase + eng write-up

From UXfol.io + Femke/Backes (scan) + Fonzi/DEV/Popout (engineering):

```
ABOVE THE FOLD
  Outcome-aware title (not only product name)
  One sentence: who it is for + what changed
  Snapshot: Role · Stack · Timeline · Live [· Repo]
  One hero visual

THEN (short, visual)
  Problem + constraint chips          — 1 sentence
  The decision                        — 2–4 “chose X / cut Y” + one supporting shot
  Shipped UI                          — unique leftover screens, flat, lightbox
  Result                              — 2–3 honest metrics (move up; not chapter 06)
  Build notes                         — compact dl, not four essays
```

Copy budget: **~300–500 words** per study ([Brian Young](https://dev.to/brianyoung/how-to-write-developer-project-case-studies-recruiters-can-actually-understand-4oe4)). Fonzi: title/summary must state **challenge + primary result**; results need units and before/after; lessons include what you’d change.

Do **not** invent LegalFlow conversion metrics. Qualitative “spreadsheets → one app” is fine.

Outcome-aware titles (example):

- KenyaTrace — “Multi-stop trip planning in 3 taps on 3G”
- GiGi — “Checkout 4→3, M-Pesa first, AA contrast”
- LegalFlow — “Matters, billing, and M-Pesa in one mobile workspace”

### 6.4 Contact — one primary path

UXfol.io: hidden or duplicated CTAs waste the skim. Pattern:

- Header: Work with me → `#contact` or `mailto:`
- Contact section: email + WhatsApp + LinkedIn as primary; **optional** short form
- Do not also repeat the same four icons in About + Footer Connect

Coffee/tips: personal blogs keep this in the **footer** (already done). Keep it there.

### 6.5 Performance — the portfolio *is* a sample

Popout / Portfolio Studio: load **&lt; 2s**, Lighthouse 90+. Today: many **JPGs** in `/shots`, duplicate `/thumbnails` in 3–5 sizes, device mockups multiply bytes, unused process WebPs still download if ever referenced.

Finish `scripts/optimize-images.mjs`: one folder `/media/{slug}/`, WebP + srcset, no tablet files unless shown.

### 6.6 Honesty — protect Round 2 rules

- No conceptual studies until real artifacts exist.
- No “7+ live websites.”
- Soften or source-check KenyaTrace/GiGi implementation claims (open in old notes: design-only vs frontend).
- “10+ e2e” → count real tests or drop. Prefer “Playwright smoke + CI on this repo.”
- GitHub profile is live (`github.com/myk02`). Add **per-project** repo or “private repo — stack listed.”

---

## 7. Target structure

### 7.1 Content model (single source)

Merge `caseStudies.ts` + `caseVisuals.ts` into **one module per study** (or `projects.ts`) so a tile cannot drift from its case page.

Fields once:

- identity: `slug`, `name`, `year`, `liveUrl`, `repoUrl?`
- positioning: `outcomeTitle`, `oneLiner`, `role`, `stack`, `timeline`
- story: `problem`, `decisions[]` (`label` + `text` + optional `shot`)
- proof: `metrics[]`, `screens[]` (unique paths only), `heroShot` (one path)
- build: short notes `{ architecture, quality }`

Delete `kind: CONCEPTUAL` until needed. Delete unused `image` / thumbnail fields. Delete `Shot.tablet` unless a tablet row is designed.

### 7.2 Component inventory

| Keep / reshape | Kill or fold |
|---|---|
| `SiteHeader`, `SiteFooter`, `Hero`, `Contact`, `About`, `Lightbox`, `SiteHead`, `ProjectCard` | Nested `TileArt` phone; `PhoneMockup`/`DesktopMockup` as default gallery |
| `CaseStudyLayout` as **showcase** | Numbered 01–06 chrome; four identical engineering cards |
| `BuyMeCoffee` in footer | Any second placement |
| `StatusBadge` live-only | concept / prototype / saas tones |
| `CountUp` | Optional; already skips `4→3` |

One `SectionHeader`, one `Fact`, one `Chip`. Stop inventing a fourth kicker.

### 7.3 Visual system rules (write into CSS)

1. Tokens only — no `#e8ff47` / `#22c55e` / `#141310` in JSX except documented exceptions (device bezel).
2. **One accent move per viewport** (hero highlight *or* section underline, not both).
3. Type: Fraunces + DM Sans + JetBrains Mono. Drop `--font-accent` alias or set it to mono for kickers only.
4. Global `border-radius: 0` stays; phone bezels may keep `rounded-soft` **if** a mockup remains.
5. Light cream default (already). Footer: either tokenize so it isn’t a foreign black slab, or document “always inverted” and stop fighting it.
6. Availability: **one** live pill (header right or hero). Nowhere else.

### 7.4 Navigation rules

- In-page ids only on `/`.
- `Work` from other routes → `/work` (keep share URL).
- Logo → `/`.
- Primary CTA in header only.
- Footer: compact nav + email + LinkedIn + GitHub + coffee. No second theme switch (already only in header — keep).

---

## 8. Phased roadmap

Estimates assume one implementer who knows this repo. Each phase ships behind green `pnpm run check`, `pnpm run build`, and updated Playwright. **Do not start with a visual redesign or a new animation library.**

---

### Phase 0 — Stop the lying (0.5 day)

**Goal:** Tests, docs, and UI agree. Nothing empty, nothing claiming two projects.

- Rename/fix e2e: “three live products”; drop “two live projects.”
- Remove dead `image` fields or wire them — don’t leave `/thumbnails` as a lie.
- Filter gallery **in data**, not only at render time (drop Home/Storefront rows that equal hero).
- Fix `CaseStudyLayout` file comment.
- Delete or gitignore unused `public/process/`.
- Align human docs: delete/archive `IMPLEMENTATION-NOTE.md` + `PORTFOLIO-REFINEMENT-PLAN.md` once this file is accepted. Note `AGENTS.md` Vercel URL drift (guardian-generated — don’t fight the generator; keep `SITE_URL` as canonical in code).
- Soften hero stat: e.g. `3 live` + one real product delta — **or** count Playwright tests and print that number.
- Decide CV: link once or remove `public/CV.pdf`.

**Done when:** a stranger reading smoke tests, home, and `/work` gets the same count (3); no unused process folder in the deploy; gallery data has no hero duplicates.

---

### Phase 1 — One story, one path (1–2 days)

**Goal:** IA a recruiter can operate without thinking.

**Home**

```
Hero (compact; not a second landing page)
  ONE role line (blocked on §9)
  H1
  Availability once
  CTAs: View work · Work with me
  One featured visual (KenyaTrace money shot — Plan or live UI, not a third home)
  ≤3 stats, each unique
Work
  Same ProjectCard × 3
  Outcome one-liner on the card (not only product name)
  Live + case study [+ repo if any]
  No nested phone unless one featured card only
About
  Portrait, 2 paragraphs, skills, real dates only
  Social once (prefer Contact/footer)
Contact
  Direct links + form
Footer
  Nav, social, coffee, copyright
```

**`/work`:** keep as share URL; **strip the giant second hero**. Page = short title + `ProjectCardGrid`. Same cards as home.

**Nav:** Work / About / Contact. Cross-page Work always `/work` except on home (scroll `#work`) — document in `navigation.ts`.

**Done when:** KenyaTrace is not three different collages; `/work` does not feel like a different product; “Experience” stays gone.

---

### Phase 2 — Showcase case studies (2–3 days)

**Goal:** Visual-first pages matching UXfol.io skim + Fonzi engineering bar.

Per study:

1. **Hero:** `outcomeTitle` + tagline + snapshot dl + **one** image + Live [+ GitHub].
2. **Problem** + constraint chips (unnumbered, or drop numbers).
3. **Decisions:** Kept/Cut bullets **with** one supporting screenshot each (use `stays`, `plan`, `events` where they illustrate the decision — not decorative).
4. **Screens:** unique leftover shots, **flat** `ShotFigure`, lightbox. No hero repeat. No desktop+phone shrine per row. Optional: one “desktop vs mobile” pair for the money flow only.
5. **Results:** existing `MetricCardRow` **before** long build text. LegalFlow qualitative only.
6. **Build notes:** one compact grid / `dl`, merge one-liners.
7. Prev/next + More work via `ProjectCard` (already).

KenyaTrace gallery must include **Plan** as first-class (the 6→3 story), not a second Home.

LegalFlow: capture **actual** matter/billing UI or stop claiming it in captions. Don’t invent metrics.

**Done when:** no page renders the same `src` twice; e2e still finds Role/Stack/Outcome/Screens/Results/Live; Lighthouse images are WebP/lazy.

---

### Phase 3 — Design system hygiene (1–2 days)

**Goal:** Looks designed once, not generated four times.

- Tokenize live-dot, tile backgrounds, leftover hex.
- Delete dead CSS + unused `KickerAccent` + conceptual `DeviceContent.node` if unused.
- One accent move per viewport; availability once.
- Image pipeline: `/media/{slug}/` WebP + srcset; delete unused JPG/tablet/thumbnail variants; document `optimize-images.mjs` in README if you add a README.
- Footer: tokens or committed inverted band.
- Lime-on-cream contrast audit; keep `prefers-reduced-motion`.
- Replace Simple Icons CDN with Lucide (already in footer) or local SVGs.
- Ignore `.manus/` etc.; move `documents/pawa-it-*` out.

**Done when:** theme toggle doesn’t leave foreign hex islands; `pnpm run build` asset list has no unused process/thumbnail trees.

---

### Phase 4 — Proof and growth (ongoing, needs Mike)

**Goal:** Developer-credible artifacts without fake seniority.

- Per-project GitHub or “private — stack listed.”
- Optional: screenshot of green CI / Playwright on the **portfolio** quality note (CI file already exists).
- Employment timeline **only** with titles and dates Mike pastes.
- Privacy-friendly analytics (Plausible/Umami) — which study is opened.
- JSON-LD `CreativeWork` for the three products (Person already in `index.html`).
- Custom domain if still applying off `*.vercel.app`.
- Convex: drop `projectType` in a migration when convenient.

**Not in this phase:** conceptual banking/dashboard/DS studies until Figma exports and process photos exist.

---

## 9. Decisions Mike should make before Phase 1

Product decisions. Implementing without them adds another residue layer.

1. **One headline** for LinkedIn + CV + `<title>` + hero kicker. Examples:  
   - “Frontend engineer (React) who can also design”  
   - “Product-minded frontend developer — Nairobi / remote”  
   Stop listing three jobs in the kicker.
2. **Keep `/work`?** Recommend **yes** as share URL, thinner chrome (Phase 1).
3. **CV:** public link vs remove file.
4. **Confirm claims:** did you implement KenyaTrace/GiGi frontend (not design-only)? Are GiGi validation/cart notes true? Are 6→3 and 360px parity measured?
5. **Per-project GitHub URLs** (or explicit private).
6. **LegalFlow** URL stability (`law-ten-iota` vs older 404s in notes). Need unique in-app screens if the product has them.
7. **Coffee** stays footer-only (recommend keep current).

---

## 10. Suggested sequence if coding starts next

```
Phase 0  →  ship immediately (tests, dead assets, gallery data, CV, stats honesty)
Phase 1  →  IA + thinner /work + outcome titles on cards + kill nested phones
Phase 2  →  case-study showcase + unique screens
Phase 3  →  tokens, dead CSS, image pipeline
Phase 4  →  repos, analytics, JSON-LD CreativeWork, real experience, Convex cleanup
```

Do **not** add a fourth live tile until the three existing stories are unique and true.

---

## 11. Sources

| Source | What we took |
|---|---|
| [Matej Latin — 30 seconds](https://matejlatin.com/blog/only-30-seconds-to-reject-your-portfolio/) | First-screen clarity; kill generic templates, repetition, weak titles |
| [UXfol.io 2026 playbook](https://blog.uxfol.io/ux-portfolio-playbook/) | 3–5 projects; 3–5 min skim; visuals replace paragraphs |
| [SuperHive — recruiter structure](https://www.superhive.co/ux-design-portfolio-projects-structure-recruiters-want) | One target role; decisions + trade-offs; outcomes |
| [WeAreArch — scan window](https://wearearch.com/blog/ui-ux-design-portfolio) | Outcome in the thumbnail; impact near the top of the study |
| [Emily Backes — case studies broken](https://emilybackes.design/post/ux-case-studies-broken) | Argument not process dump; &lt;800 words; tension early |
| [Popout — developer portfolio 2026](https://www.popout.page/blog/developer-portfolio-2026-complete-guide-build-career-selling-ai-tools) | 3–5 CASE studies; live demo + contact; speed |
| [Portfolio Studio — examples](https://portfoliostudio.dev/blog/best-developer-portfolio-examples) | Chiang pattern: 3–6 projects, live+GitHub, restraint |
| [Brian Young — recruiter-readable studies](https://dev.to/brianyoung/how-to-write-developer-project-case-studies-recruiters-can-actually-understand-4oe4) | Role as actions; honest outcomes; 300–600 words |
| [Fonzi — engineering case study](https://fonzi.ai/blog/engineering-case-study) | Challenge + result in the title; constraints; before/after units; lessons |
| [brittanychiang.com](https://brittanychiang.com/) / [v4](https://v4.brittanychiang.com/) | IA, CTA restraint, live+repo, no services-icon theater |

---

## 12. File map (implementer)

| Path | Role |
|---|---|
| `client/src/pages/Home.tsx` | Phase 1 section list (already the right shape) |
| `client/src/components/Hero.tsx` | Phase 1: one money shot from data, not hardcoded KenyaTrace cards |
| `client/src/components/ProjectCard.tsx` | Phase 1: drop nested phone; outcome title |
| `client/src/pages/Work.tsx` | Phase 1: thin index |
| `client/src/lib/navigation.ts` | Document Work home vs `/work` |
| `client/src/components/caseStudy/CaseStudyLayout.tsx` | Phase 0 comment; Phase 2 showcase |
| `client/src/data/caseStudies.ts` + `caseVisuals.ts` | Merge; unique screens |
| `client/src/components/artifacts/Screens.tsx` | Phase 2: flat figures |
| `client/src/index.css` | Phase 3 dead CSS + tokens |
| `e2e/smoke.spec.ts` | Update every phase |
| `public/shots`, `public/thumbnails`, `public/process` | Phase 0–3 media diet |
| `documents/` | Move out (positioning conflict) |

When you want implementation, start at **Phase 0** only — it does not need the headline/GitHub-per-project decisions in §9.
