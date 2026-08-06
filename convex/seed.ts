import { mutation } from "./_generated/server";
import { AVATAR_BY_NAME, TESTIMONIAL_SEEDS } from "./testimonialData";

export const seed = mutation({
  handler: async (ctx) => {
    const existing = await ctx.db.query("projects").collect();
    const existingNames = existing.map((p) => p.name);
    const existingSet = new Set(existingNames);

    const designProjects = [
      { name: "GiGi Energy Drink", description: "Led the UI/UX design for a Nairobi-made energy drink e-commerce platform. Focused on bold typography, accessible color palettes, and a streamlined checkout flow to increase conversion rates.", techStack: ["UI Design", "E-commerce", "User Flows"], url: "https://gigiflavours.vercel.app/", image: "/thumbnails/gigi-energy.png", subBrand: "gmdesign" as const, order: 5 },
      { name: "KenyaTrace", description: "Conducted user research to build a comprehensive tourism explorer platform. Designed the information architecture, created interactive prototypes for route planning, and ensured a seamless mobile experience.", techStack: ["UX Research", "Prototyping", "Mobile Design"], url: "https://kenyatrace.vercel.app", image: "/thumbnails/kenya-tourism.png", subBrand: "gmux" as const, order: 7 },
      { name: "Mobile Banking App Redesign", description: "Conceptual case study for youth-focused financial services: intuitive navigation, secure data visualization, and a frictionless onboarding flow designed around how young users actually bank.", techStack: ["UX Research", "Mobile Design", "Fintech"], url: "#", image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1600&auto=format&fit=crop", subBrand: "gmux" as const, order: 8 },
      { name: "Complex Dashboard UI System", description: "Conceptual case study exploring information architecture and data density: a scalable dashboard UI system with clear hierarchy, dense but legible data tables, and developer-ready handoff.", techStack: ["Information Architecture", "UI Systems", "Handoff"], url: "#", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop", subBrand: "gmdesign" as const, order: 9 },
      { name: "Design System Creation", description: "Conceptual case study on building a cohesive design system: typography scales, color theory, a reusable component library, and documentation that keeps products consistent at scale.", techStack: ["Design Systems", "Typography", "Components"], url: "#", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1600&auto=format&fit=crop", subBrand: "gmdesign" as const, order: 10 },
    ];

    const existingByName: Record<string, (typeof existing)[number]> = {};
    for (const p of existing) {
      existingByName[p.name] = p;
    }

    for (const project of designProjects) {
      const match = existingByName[project.name];
      if (match) {
        await ctx.db.patch(match._id, project);
      } else {
        await ctx.db.insert("projects", project);
      }
    }

    const refreshed = await ctx.db.query("projects").collect();
    const obsoleteNames = [
      "Meeting Long Island - T-Shirt Graphic",
      "Graza - Bottle Packaging Front",
      "Graza - Lifestyle Product Shot",
      "Fesaskin - Glowing Package Post",
      "Nadhifa Beauty Care - Product Range",
      "Forest Palette Study",
      "Sunset Palette Study",
      "Canvas - Olive Grove Pack",
      "Canvas - Bottle Range Layout",
      "Elva - Drink Packaging Line",
      "Qantra - Brand System Board",
      "Voront Glass - Brand Mockups",
      "CarSoko - Car Rental Platform",
      "CodeMaster - Coding Learning Platform",
      "LegalFlow - Practice Management",
      "Nora Designs - Architecture Portfolio",
      "PureMatch254 - Matchmaking Platform",
      "GM Voice - AI Voice Agents",
      "CLE: ATP Webinar Flyer",
      "CLE: Labour Day Social Post",
      "CLE: Newsletter Cover",
      "Automated Personalized Sales Outreach",
      "AI Ticket Classification & Intelligent Routing",
      "Invoice Processing & Data Extraction",
      "Automated Reporting & Dashboard Insights",
      "GiGi Energy Drink - Product Website",
      "KenyaTrace - Tourism Explorer",
      "Product Promo - Video Ad",
      "Brand Story - Documentary Style",
      "Social Media Reel - Short Form",
      "Client Testimonial - Interview",
      "Event Recap - Highlight Reel",
      "AI Blog Content Generation & Publishing",
      "Social Media Content Scheduling Engine",
      "SEO Keyword Research & Content Brief Automation",
      "AI Lead Qualification & Scoring System",
    ];
    for (const project of refreshed) {
      if (obsoleteNames.includes(project.name)) {
        await ctx.db.delete(project._id);
      }
    }

    const existingTestimonials = await ctx.db.query("testimonials").collect();

    for (const testimonial of existingTestimonials) {
      const avatar = AVATAR_BY_NAME[testimonial.name];
      if (avatar && testimonial.avatar !== avatar) {
        await ctx.db.patch(testimonial._id, { avatar });
      }
    }

    if (existingTestimonials.length === 0) {
      for (const t of TESTIMONIAL_SEEDS) {
        await ctx.db.insert("testimonials", t);
      }
    }
  },
});
