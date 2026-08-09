/**
 * Design-journey evidence per case study.
 *
 * Each study has 6 frames (brief → research → sketches → wireframes → hi-fi
 * → test & ship). A frame may carry a REAL image scraped from the shipped
 * product (product renders, live screenshots) plus a one-line note. Stages
 * without a real image fall back to the inline concept art rendered by
 * DesignJourney.
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
      image: {
        src: "/refs/kenya-hero.png",
        alt: "The live KenyaTrace hero image",
        fit: "cover",
      },
      note: "Ten county tourism sites, no shared planner.",
    },
    {
      kicker: "02 Research",
      caption: "Research",
      image: {
        src: "/shots/kenyatrace/discover-desktop.jpg",
        alt: "KenyaTrace destination browse",
        fit: "cover",
      },
      note: "12 interviews + 34-survey. Planning is the product — mostly on 3G.",
    },
    {
      kicker: "03 Sketches",
      caption: "Sketches",
      note: "Map-first was obvious — but timed out on patchy networks.",
    },
    {
      kicker: "04 Wireframes",
      caption: "Wireframes",
      note: "List-first won; map became secondary.",
    },
    {
      kicker: "05 Hi-fi",
      caption: "Hi-fi",
      image: {
        src: "/shots/kenyatrace/home-mobile.jpg",
        alt: "KenyaTrace shipped home screen",
        fit: "cover",
      },
      note: "Photography leads; tested at 360px on 3G.",
    },
    {
      kicker: "06 Test & ship",
      caption: "Test & ship",
      image: {
        src: "/shots/kenyatrace/trips-mobile.jpg",
        alt: "KenyaTrace shipped trips screen",
        fit: "cover",
      },
      note: "Inline add-stop: 6 interactions → 3. Shipped.",
    },
  ],
  "gigi-energy": [
    {
      kicker: "01 Brief",
      caption: "Brief",
      image: {
        src: "/refs/gigi-can.png",
        alt: "The real GiGi Energy can — scraped from the live storefront",
        fit: "contain",
      },
      note: "GA4: add-to-cart → checkout fell 52%.",
    },
    {
      kicker: "02 Research",
      caption: "Research",
      image: {
        src: "/shots/gigi-energy/flavours-desktop.jpg",
        alt: "GiGi flavours grid on desktop",
        fit: "cover",
      },
      note: "2.1:1 contrast on brand text; M-Pesa-first checkout won.",
    },
    {
      kicker: "03 Sketches",
      caption: "Sketches",
      note: "The 'can' approach won — the brand IS the product.",
    },
    {
      kicker: "04 Wireframes",
      caption: "Wireframes",
      note: "4 → 3 steps; M-Pesa moved first.",
    },
    {
      kicker: "05 Hi-fi",
      caption: "Hi-fi",
      image: {
        src: "/shots/gigi-energy/flavours-mobile.jpg",
        alt: "GiGi flavours screen on mobile",
        fit: "cover",
      },
      note: "Bold type carries hierarchy; all text at AA.",
    },
    {
      kicker: "06 Test & ship",
      caption: "Test & ship",
      image: {
        src: "/shots/gigi-energy/events-mobile.jpg",
        alt: "GiGi events page on mobile",
        fit: "cover",
      },
      note: "Shipped: 3-step checkout, M-Pesa first.",
    },
  ],
  "mobile-banking-redesign": [
    {
      kicker: "01 Brief",
      caption: "Brief",
      note: "Onboarding dies at documents. 49% bank via mobile money alone.",
      source: "World Bank Global Findex 2024",
    },
    {
      kicker: "02 Research",
      caption: "Research",
      note: "8 interviews + 47-survey + 6-app audit. Fixed-income assumptions broke.",
    },
    {
      kicker: "03 Sketches",
      caption: "Sketches",
      note: "Savings-first from the start.",
    },
    {
      kicker: "04 Wireframes",
      caption: "Wireframes",
      note: "Calm surfaces + progressive KYC (8 → 4).",
    },
    {
      kicker: "05 Hi-fi",
      caption: "Hi-fi",
      note: "Goal ring, quick-save, padlock confirmations.",
    },
    {
      kicker: "06 Test & ship",
      caption: "Test & ship",
      note: "Round 1: ring read as spinner. Round 2: 100% pass. SUS 68 → 84.",
    },
  ],
  "dashboard-ui-system": [
    {
      kicker: "01 Brief",
      caption: "Brief",
      note: "Dashboards either cram data or hide it in cards.",
    },
    {
      kicker: "02 Research",
      caption: "Research",
      note: "Users scan for exceptions; the data table is the workhorse.",
    },
    {
      kicker: "03 Sketches",
      caption: "Sketches",
      note: "Density-first: written rules, not vibes.",
    },
    {
      kicker: "04 Wireframes",
      caption: "Wireframes",
      note: "Three tiers: KPI → exceptions → dense spec'd table.",
    },
    {
      kicker: "05 Hi-fi",
      caption: "Hi-fi",
      note: "Warm dark surfaces; semantic color only for exceptions.",
    },
    {
      kicker: "06 Test & ship",
      caption: "Test & ship",
      note: "Dev walkthrough caught missing row states — added. 100% spec'd.",
    },
  ],
  "design-system-creation": [
    {
      kicker: "01 Brief",
      caption: "Brief",
      note: "17 button styles, 6 type scales, unlimited grays.",
    },
    {
      kicker: "02 Research",
      caption: "Research",
      note: "Copy-paste drift; designers feared a locked library.",
    },
    {
      kicker: "03 Sketches",
      caption: "Sketches",
      note: "Token-first: primitives that compose into anything.",
    },
    {
      kicker: "04 Wireframes",
      caption: "Wireframes",
      note: "Tokens + docs won over component-first.",
    },
    {
      kicker: "05 Hi-fi",
      caption: "Hi-fi",
      note: "The system as a poster — one view of everything.",
    },
    {
      kicker: "06 Test & ship",
      caption: "Test & ship",
      note: "Dashboard consumed it first, surfacing 3 gaps — documented.",
    },
  ],
};
