# Portfolio Refinement Plan — Mike Waitindi, UI/UX Portfolio

*Audit date: Aug 2026 · Stack: Vite + React 19 + TypeScript + Tailwind v4 + Framer Motion, Convex backend, deployed on Vercel.*

This document is the result of a full codebase analysis (every page, component, data file, and image asset), a live walkthrough of the running site, and deep research into what hiring managers and recruiters actually look for in UX portfolios. It ends with a prioritized roadmap.

---

## 1. What the site is today

**Identity (keep this — it's the strongest asset).** Cream `#f2ede6` / ink `#0a0a0a` / lime `#e8ff47` brutalist identity, zero border-radius, noise overlay, Fraunces display + JetBrains Mono + Space Grotesk + DM Sans. This is a memorable, interview-grade visual brand. Nothing in this plan changes the identity — it sharpens it.

**Pages:**
- `/` — Hero (device trio + stats) → skill marquee → Work grid (1 featured + 4 tiles) → Process timeline (4 phases w/ real screenshots) → Playbook (3 cards) → About (portrait + stats + skills + contact) → Contact form → Footer
- `/work` — plain text list of 5 studies (much weaker than the home work section)
- `/work/:slug` — case study: hero device showcase → DesignJourney scroll strip (6 frames) → 8 text chapters with sticky "At a glance / Jump to" rail → prev/next → more work
- `/work/:slug/prototype` — interactive concept prototypes for the 3 conceptual studies

**The 5 studies:** Youth Mobile Banking Redesign (conceptual), KenyaTrace (live), GiGi Energy (live), Complex Dashboard UI System (conceptual), Design System Creation (conceptual).

**Assets:**
- Live products: 18 real screenshots for KenyaTrace, 15 for GiGi (mobile/tablet/desktop JPGs) — these are the strongest visuals on the site.
- Conceptual studies: hand-built React art (BankingScreen, DashboardScreen, DesignSystemScreen). High quality, but **repetitive and marked with dashed "REAL SKETCH / WIREFRAMES / FINAL SCREENS SLOT" placeholders** in the Design Journey — i.e., the site itself is telling you where real assets are missing.

---

## 2. Audit findings — what's weak, by section

### 2.1 Case studies are text-first, not visual-first (the biggest issue)
Each study has **8 chapters, and every chapter carries lead + paragraphs + bullets + callouts**. Total narrative copy across all five studies is ~2,300 words, and each page *re-tells in words* the story the Design Journey already told visually. Research is unambiguous that recruiters skim — 30 seconds to reject (Matej Latin, UX Collective 2024), 3–5 minutes for the whole portfolio, seconds per study — and that case-study clarity is the #1 rejection reason.

### 2.2 The same screen repeats ~10× on one page
On the banking study, the home screen renders in: hero trio (3) → journey hi-fi frame (1) → fidelity ladder hi-fi (1) → UI chapter trio (3) → "Concept screens" gallery trio (3). **~11 renderings of one screen.** Same pattern for dashboard and design-system studies. Repetition reads as thin work and buries the *new* screens.

### 2.3 The three conceptual studies have no real design-process artifacts
The journey shows "REAL PAPER SKETCH SLOT", "REAL WIREFRAMES SLOT", "REAL FINAL SCREENS SLOT" badges. The code art is good, but a hiring manager comparing this to a portfolio with real Figma exports, hand sketches, and process photos will feel the difference instantly.

### 2.4 Weak spots outside the case studies
- `/work` is a text list — inconsistent with the visual home grid.
- Hero stats include `Design tools: Figma` — reads as filler next to real numbers.
- Featured work tile is the *conceptual* banking study; the two **live** products with real screenshots (KenyaTrace, GiGi) sit in the grid.
- Contact appears 4× (About block, Contact form section, "Prefer email?" + "Book a chat", footer) — diluted.
- Case-study hero + journey + chapter all open with the same "one design, three viewports" trio.
- All screenshots are JPGs; an `optimize-images.mjs` script exists but webp conversion isn't complete site-wide.

---

## 3. Research summary (what the evidence says)

| Finding | Source |
|---|---|
| Recruiters spend **~30 seconds rejecting** and seconds-to-minutes per case study; they **scan, not read**. | Matej Latin, *Only 30 seconds to reject your portfolio?* (UX Collective, 2024); multiple 2024–26 recruiter surveys |
| The **first screen of a case study must communicate problem, role, and outcome instantly** — ambiguity there is the top kill reason. | NN/g (200+ hiring managers interviewed); Matej Latin |
| **2–3 strong studies beat 5+ mediocre ones.** Recruiters won't read five. | UX Design Institute; "3 case study rule" (2026) |
| Show **works-in-progress** — sketches, wireframes, post-its, whiteboards, session photos — to tell the journey with *fewer words*. | IxDF, *How to Use Visuals to Elevate Your UX/UI Case Studies* |
| Use **info-visualization** (survey charts, journey maps, impact graphs) to replace paragraphs. | IxDF |
| **Embed interactive prototypes** and state **role + measurable outcomes up front**. | Webflow 15-best analysis (Olga Rody, Gina Yu, Sarah Lauchli) |
| 2025–26 trend: **"showcases" over "case studies"** — digestible, visual walkthroughs instead of long-form text. | Femke van Schoonhoven (2025), design-community consensus |
| Keep every image <100KB, prefer WebP; the case study *is* a designed product. | IxDF |

**Implication for this site:** the codebase is already *architecturally* ahead (journey strip, personas, concept boards, metric cards). The refinement is not "add more stuff" — it's **replace text with visuals, kill duplication, and fill the asset gaps**.

---

## 4. The target model: a visual "showcase" case study

Each case study becomes **5 visual stages + a compact result band**, with ~60–70% of the narrative copy removed:

```
HERO        — one strong image (the money shot) + 1-line tagline + role/timeline chips
STAGE 01    — The problem (visual: before-state, funnel/chart, or pain-point board) + 1 line
STAGE 02    — Research (personas as cards + one insight chart + 1 quote) + 1 line
STAGE 03    — Explore (concept board: kept / won / rejected) + 1 line
STAGE 04    — Refine (wireframe → hi-fi ladder, same layout at 3 fidelities) + 1 line
STAGE 05    — Ship (full screen gallery, every screen exactly once + prototype link)
RESULT BAND — 3 metric cards + roadmap chips + lessons as short lines
```

Rules that enforce "less words, more designs":
1. **One visual = one idea.** Each stage leads with a large image; copy is capped at one sentence + up to 4 chips.
2. **Every unique screen appears exactly once.** Hero shows the *whole* design (all screens as a gallery or a single composite), not one screen in three frames.
3. **The journey is the page.** Stages are full-bleed visuals with a scroll-triggered timeline, replacing the 8-chapter text layout. A slim sticky rail keeps "At a glance / Jump to" and the active pull-quote.
4. **Concrete numbers stay** — metric cards, delta tables, SUS scores. That's the part recruiters *do* read.

### What fills the visual gap per study (code-first, no external assets needed for most):
- **Banking:** add low-fi *wireframe variants* of the same 4 screens (grey boxes, same layout) so Refine shows a true wireframe→hi-fi transformation; show onboarding/goals/transfer as a 4-up gallery (each once); keep the interactive prototype.
- **Dashboard:** wireframe variants (KPI→exceptions→table tiers) + existing states matrix + prototype.
- **Design system:** token→component→usage poster (already exists) + button-audit visual + prototype.
- **KenyaTrace / GiGi:** use the real screenshot sets as the full gallery (each screen once), plus before/after round-1 vs round-2 wireframe pairs (already built).

### The copy budget per study (~1,400 words → ~450):
- Keep: tagline, problem stat, 1–2 interview quotes, stage captions, metric notes, 3 lessons.
- Cut: most chapter leads, all paragraph pairs, redundant bullets, repeated callouts. The rail and journey already carry the story.

---

## 5. Site-wide refinements

1. **Hero** — replace `Design tools: Figma` stat with something real (e.g., "SUS 68 → 84 best score" or "2 live products"). Consider swapping the hero trio for a stronger single composition (the banking dashboard is good; a live-product screenshot or a 4-screen banking gallery would be stronger).
2. **Featured tile** — feature a **live product** (KenyaTrace or GiGi) on the home work grid; conceptual studies below. Live screenshots > code art for credibility.
3. **`/work` page** — rebuild as the same visual tile grid as home (reuse BrandEdgeWork tile components) instead of a text list.
4. **Contact consolidation** — one clear CTA ("Book a 15-min chat" via email link is fine); trim the About contact block or fold it into one place.
5. **Design Journey strip** — make each of the 6 frames a *different* visual (brief art, personas, sketch, wireframe, hi-fi, test) — never the same screen as the hero.
6. **Images** — finish WebP optimization across shots/thumbnails/process (script exists); add `loading="lazy"` + `decoding="async"` everywhere (mostly done); keep each asset <100KB target.
7. **Lightbox** — wire the existing `Lightbox` component into screenshot galleries so shots can be enlarged (screen detail is the point of a UI portfolio).
8. **Accessibility / polish** — hero-kicker animations already respect reduced motion; keep AA contrast on all lime-on-cream text (some `text-accent` on light backgrounds needs checking at 11px base font).

---

## 6. Prioritized roadmap

### P0 — Case studies become visual showcases (biggest win, mostly code) ✅ done
- [x] Restructure `caseChapters.tsx` → 6-stage visual layout (problem → research → explore → refine → ship → results); deleted ~60% of copy in `caseStudies.ts`
- [x] Kill screen duplication: ship gallery shows each screen once (single-phone grid); journey hi-fi frames switched to distinct screens (goals / mobile variants)
- [ ] *Deferred:* add wireframe-mode variants to Banking/Dashboard/DesignSystem art — the FidelityLadder already shows wireframe→structured→hi-fi with matched `Wire` layouts
- [x] Fill the "REAL … SLOT" placeholders with code-rendered frames (dashed badges removed from `caseJourneys.ts`); real exports can still be dropped into the same slots later

### P1 — Home + Work page
- [ ] Fix hero stats; strengthen hero visual
- [ ] Feature a live product on the work grid
- [ ] Rebuild `/work` as visual grid (reuse tile components)

### P2 — Assets from the designer (needs Mike)
- [ ] Export real Figma screens for the 3 conceptual studies (4–6 screens each @2x) + drop into `caseVisuals.screens` and `caseJourneys` image slots
- [ ] Photograph/scan paper sketches + wireframes for each study (the placeholders are waiting)
- [ ] Replace the placeholder journey frames with these real assets

### P3 — Polish
- [ ] WebP pass on all images; lightbox on galleries; contact consolidation; final AA contrast sweep

**Effort estimate:** P0 ≈ 1 focused session (it is a data + layout refactor, not a rewrite). P1 ≈ 1 session. P2 is dependent on Mike exporting assets. P3 ≈ half a session.

---

## 7. What I need from you to go further

1. **Figma exports** for the 3 conceptual studies — even phone-only PNGs at 2× would lift the portfolio enormously.
2. **Any real process photos** — sketches, whiteboard/post-it shots, testing session photos. These are the single biggest credibility upgrade and the site already has slots waiting.
3. Approval on the two judgment calls: (a) **feature a live product** on the home grid, and (b) **cut the case-study copy** down to the ~450-word budget.

Everything in P0/P1 can be implemented now without any new assets — say the word and I'll start.
