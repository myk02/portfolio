/**
 * Design-journey evidence per case study.
 *
 * Each study has 6 frames (brief → research → sketches → wireframes → hi-fi
 * → test & ship). A frame may carry a REAL image scraped from the shipped
 * product (product renders, live screenshots) plus a transformation note that
 * explains how that step became the design. Stages without a real image fall
 * back to the inline concept art rendered by DesignJourney.
 */

export interface JourneyImage {
  src: string;
  alt: string;
  /** cover = fill the frame (screenshots), contain = show the whole product */
  fit?: "cover" | "contain";
}

export interface JourneyStageData {
  kicker: string;
  caption: string;
  note?: string;
  image?: JourneyImage;
  /** research source the step is grounded in */
  source?: string;
}

export const caseJourneys: Record<string, JourneyStageData[]> = {
  kenyatrace: [
    {
      kicker: "01 Brief",
      caption: "Brief",
      image: { src: "/refs/kenya-hero.png", alt: "The live KenyaTrace hero image", fit: "cover" },
      note: "Ten county tourism sites, no shared planner. Travelers assemble multi-stop trips with tabs, PDFs, and WhatsApp.",
    },
    {
      kicker: "02 Research",
      caption: "Research",
      image: { src: "/shots/kenyatrace/discover-desktop.jpg", alt: "KenyaTrace destination browse", fit: "cover" },
      note: "12 interviews + 34-survey. The core job is assembling a multi-stop itinerary — planning is the product. Most of it happens on 3G phones.",
      source: "Tour Kenya national portal · tourkenya.go.ke",
    },
    {
      kicker: "03 Sketches",
      caption: "Sketches",
      note: "Route-first sketches. Map-first was the obvious explorer answer, but participants planning on patchy networks timed out on map loads.",
    },
    {
      kicker: "04 Wireframes",
      caption: "Wireframes",
      note: "Three concepts → list-first browse won; the map became a secondary view. The route builder turns stops into a day-by-day plan.",
    },
    {
      kicker: "05 Hi-fi",
      caption: "Hi-fi",
      image: { src: "/shots/kenyatrace/home-mobile.jpg", alt: "KenyaTrace shipped home screen", fit: "cover" },
      note: "Editorial photography, calm palette, one accent — the interface steps back so destinations lead. Tested at 360px on 3G.",
    },
    {
      kicker: "06 Test & ship",
      caption: "Test & ship",
      image: { src: "/shots/kenyatrace/trips-mobile.jpg", alt: "KenyaTrace shipped trips screen", fit: "cover" },
      note: "Round 1 found the route builder's fatal flaw: adding a stop left the route. Inline add-stop cut it from 6 interactions to 3 — then it shipped.",
    },
  ],
  "gigi-energy": [
    {
      kicker: "01 Brief",
      caption: "Brief",
      image: { src: "/refs/gigi-can.png", alt: "The real GiGi Energy can — scraped from the live storefront", fit: "contain" },
      note: "The actual product. GA4 showed the funnel halving at the form-heavy middle: add-to-cart → checkout fell 52%.",
    },
    {
      kicker: "02 Research",
      caption: "Research",
      image: { src: "/shots/gigi-energy/flavours-desktop.jpg", alt: "GiGi flavours grid on desktop", fit: "cover" },
      note: "Five-store audit + GA4. Brand text scored 2.1:1 contrast — illegible for low-vision users. Competitors won with one-page checkout and M-Pesa first.",
    },
    {
      kicker: "03 Sketches",
      caption: "Sketches",
      note: "Two directions: keep the fluorescent palette but unreadable, or remap it onto dark containers. The 'can' approach won — the brand IS the product.",
    },
    {
      kicker: "04 Wireframes",
      caption: "Wireframes",
      note: "Four-step checkout → three: address and delivery merged into one continuous form, M-Pesa moved first in payment order.",
    },
    {
      kicker: "05 Hi-fi",
      caption: "Hi-fi",
      image: { src: "/shots/gigi-energy/flavours-mobile.jpg", alt: "GiGi flavours screen on mobile", fit: "cover" },
      note: "Bold display type carries hierarchy so color can stay loud. Every flavour accent maps to its can — all text at AA contrast.",
    },
    {
      kicker: "06 Test & ship",
      caption: "Test & ship",
      image: { src: "/shots/gigi-energy/events-mobile.jpg", alt: "GiGi events page on mobile", fit: "cover" },
      note: "Shipped storefront: 3-step checkout, M-Pesa first, delivery estimate at the final tap. Funnel tracked in GA4 post-launch.",
    },
  ],
  "mobile-banking-redesign": [
    {
      kicker: "01 Brief",
      caption: "Brief",
      note: "18–30-year-olds abandon onboarding at documents and avoid their own app. 49% of young Kenyan adults bank through mobile money alone — the app must earn its place.",
      source: "World Bank Global Findex 2024",
    },
    {
      kicker: "02 Research",
      caption: "Research",
      note: "8 interviews + 47-survey + a 6-app audit. Fixed-income assumptions broke in the field — freelancers, traders, riders. Money hides in M-Pesa, chamas, or under a mattress.",
    },
    {
      kicker: "03 Sketches",
      caption: "Sketches",
      note: "Savings-first from the start. Dashboards built for salaried customers feel like surveillance to irregular earners.",
    },
    {
      kicker: "04 Wireframes",
      caption: "Wireframes",
      note: "Dark 'premium fintech' and a one-screen dashboard both failed concept checks. Chosen: calm high-contrast surfaces + progressive KYC (8 steps → 4).",
    },
    {
      kicker: "05 Hi-fi",
      caption: "Hi-fi",
      note: "Goal ring, quick-save chips (+200 / +500 / +1000), padlock + confirmation at first send. AA contrast, 48px targets, dark-safe palette.",
    },
    {
      kicker: "06 Test & ship",
      caption: "Test & ship",
      note: "Maze + 5 moderated tests. Round 1: the goal ring read as a loading spinner. Round 2 with the '%' label: 100% task completion. SUS 68 → 84.",
    },
  ],
  "dashboard-ui-system": [
    {
      kicker: "01 Brief",
      caption: "Brief",
      note: "Operational dashboards either cram data without hierarchy, or flatten it into cards that hide the work. This study builds the third option.",
    },
    {
      kicker: "02 Research",
      caption: "Research",
      note: "Three internal tools + task interviews. Users scan for exceptions first; the data table is the workhorse (60% of tasks) yet the least designed.",
      source: "AI-dashboard best practices 2026 — one hero metric, clear hierarchy",
    },
    {
      kicker: "03 Sketches",
      caption: "Sketches",
      note: "Density-first: every tier gets written density and hierarchy rules, not vibes.",
    },
    {
      kicker: "04 Wireframes",
      caption: "Wireframes",
      note: "Card-only and table-only both rejected. Three-tier system: KPI cards → exception list + charts → dense, spec'd data table.",
    },
    {
      kicker: "05 Hi-fi",
      caption: "Hi-fi",
      note: "Warm dark surfaces, lime accent for interactivity, semantic color reserved strictly for exceptions. Charts carry data — no decorative geometry.",
    },
    {
      kicker: "06 Test & ship",
      caption: "Test & ship",
      note: "A developer handoff walkthrough caught missing row-selection and pagination states — added as explicit component variants. 100% spec'd.",
    },
  ],
  "design-system-creation": [
    {
      kicker: "01 Brief",
      caption: "Brief",
      note: "17 button styles, 6 type scales, unlimited grays — drift is a quality problem, not a taste problem.",
    },
    {
      kicker: "02 Research",
      caption: "Research",
      note: "Audit of three surfaces + designer interviews. Copy-paste drift everywhere; designers feared a locked-down library they couldn't extend.",
    },
    {
      kicker: "03 Sketches",
      caption: "Sketches",
      note: "Token-first, not component-first — ship primitives that compose into any pattern, with a starter component set and a clear extension path.",
      source: "ABB component-lifecycle case study · Toptal",
    },
    {
      kicker: "04 Wireframes",
      caption: "Wireframes",
      note: "Component-first was adopted, then abandoned. Tokens + docs won: 7-step type scale, semantic color roles, 4px spacing base, radii, elevation.",
    },
    {
      kicker: "05 Hi-fi",
      caption: "Hi-fi",
      note: "The system as a poster — scale, chips, states, and grid in one view. Editorial serif for display, grotesque for UI, cream/ink/lime tokens.",
    },
    {
      kicker: "06 Test & ship",
      caption: "Test & ship",
      note: "The dashboard study consumed it first and surfaced 3 gaps — warning state, focus ring, nested tables. Each became a documented addition. Governance is the point.",
      source: "Assurant design-system governance · Cadabra",
    },
  ],
};
