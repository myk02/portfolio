import { mutation } from "./_generated/server";
import { AVATAR_BY_NAME, TESTIMONIAL_SEEDS } from "./testimonialData";

export const seed = mutation({
  handler: async (ctx) => {
    const existing = await ctx.db.query("projects").collect();
    const existingNames = existing.map((p) => p.name);
    const existingSet = new Set(existingNames);

    const codeProjects = [
      { name: "GiGi Energy Drink - Product Website", description: "A product site for a Nairobi-made energy drink. Bold colours and simple messaging to match the brand.", techStack: ["React", "E-commerce", "Product"], url: "https://gigiflavours.vercel.app/", image: "/thumbnails/gigi-energy.png", subBrand: "gmcode" as const, order: 5 },
      { name: "KenyaTrace - Tourism Explorer", description: "A site to help people discover places to visit in Kenya. Covers attractions, routes, and travel info across the country.", techStack: ["React", "Tourism", "Development"], url: "https://kenyatrace.vercel.app", image: "/thumbnails/kenya-tourism.png", subBrand: "gmcode" as const, order: 7 },
    ];

    const marketingProjects = [
      { name: "Product Promo - Video Ad", description: "A short video ad showing product features and a call to action for social media.", techStack: ["Video", "Marketing"], url: "/thumbnails/one.mp4", image: "", subBrand: "gmmarketing" as const, order: 16 },
      { name: "Brand Story - Documentary Style", description: "A longer video about a company's background, what they do, and why they do it.", techStack: ["Video", "Branding"], url: "/thumbnails/two.mp4", image: "", subBrand: "gmmarketing" as const, order: 17 },
      { name: "Social Media Reel - Short Form", description: "Short videos made for TikTok, Instagram Reels, and YouTube Shorts.", techStack: ["Video", "Social Media"], url: "/thumbnails/three.mp4", image: "", subBrand: "gmmarketing" as const, order: 18 },
      { name: "Client Testimonial - Interview", description: "A video interview with a client talking about their experience working with the business.", techStack: ["Video", "Testimonials"], url: "/thumbnails/four.mp4", image: "", subBrand: "gmmarketing" as const, order: 19 },
      { name: "Event Recap - Highlight Reel", description: "A highlight video from an event covering key moments, speakers, and the overall atmosphere.", techStack: ["Video", "Events"], url: "/thumbnails/five.mp4", image: "", subBrand: "gmmarketing" as const, order: 24 },
    ];

    // Automation cards use View JSON only — no external "Visit site" URL.
    const automationProjects = [
      { name: "AI Blog Content Generation & Publishing", description: "Automate blog creation in brand voice with AI. Extracts writing style from existing articles, understands brand voice characteristics, and generates new content aligned with your brand. Publishes drafts to WordPress for human review.", techStack: ["n8n", "OpenAI", "WordPress", "Content Automation"], url: "#", image: "/thumbnails/gmautomation/blog-automation.png", subBrand: "gmautomation" as const, order: 25, workflowJson: "/workflows/blog-automation.json" },
      { name: "Social Media Content Scheduling Engine", description: "Multi-client social media scheduler that pulls approved content from Notion, optimizes captions via AI for LinkedIn and Twitter, auto-publishes, and updates status with live post URLs.", techStack: ["n8n", "OpenAI", "Notion", "LinkedIn", "Twitter"], url: "#", image: "/thumbnails/gmautomation/social-media-scheduler.png", subBrand: "gmautomation" as const, order: 26, workflowJson: "/workflows/social-media-scheduler.json" },
      { name: "SEO Keyword Research & Content Brief Automation", description: "Automated SEO keyword and SERP analysis using DataForSEO. Tracks search volume, CPC, competition, and ranking data. Auto-creates Google Sheets with keyword metrics and competitor insights.", techStack: ["n8n", "DataForSEO", "Google Sheets", "SEO Analytics"], url: "#", image: "/thumbnails/gmautomation/seo-research.png", subBrand: "gmautomation" as const, order: 27, workflowJson: "/workflows/seo-research.json" },
      { name: "AI Lead Qualification & Scoring System", description: "AI-powered lead qualification that captures inbound leads, scores and enriches them with OpenAI, routes priority leads to Slack and Gmail, and logs all submissions to Google Sheets.", techStack: ["n8n", "OpenAI", "Slack", "Gmail", "Google Sheets"], url: "#", image: "/thumbnails/gmautomation/lead-qualification.png", subBrand: "gmautomation" as const, order: 28, workflowJson: "/workflows/lead-qualification.json" },
    ];

    const existingByName: Record<string, (typeof existing)[number]> = {};
    for (const p of existing) {
      existingByName[p.name] = p;
    }

    const projects = [...codeProjects, ...marketingProjects];

    for (const project of projects) {
      const match = existingByName[project.name];
      if (match) {
        await ctx.db.patch(match._id, project);
      } else {
        await ctx.db.insert("projects", project);
      }
    }

    for (const project of automationProjects) {
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

export const seedAutomation = mutation({
  handler: async (ctx) => {
    const existing = await ctx.db.query("projects").collect();
    const existingByName: Record<string, typeof existing[number]> = {};
    for (const p of existing) {
      existingByName[p.name] = p;
    }

    // Automation: keep workflowJson for View JSON; no external visit URL.
    const automationProjects = [
      { name: "AI Blog Content Generation & Publishing", description: "Automate blog creation in brand voice with AI. Extracts writing style from existing articles, understands brand voice characteristics, and generates new content aligned with your brand. Publishes drafts to WordPress for human review.", techStack: ["n8n", "OpenAI", "WordPress", "Content Automation"], url: "#", image: "/thumbnails/gmautomation/blog-automation.png", subBrand: "gmautomation" as const, order: 25, workflowJson: "/workflows/blog-automation.json" },
      { name: "Social Media Content Scheduling Engine", description: "Multi-client social media scheduler that pulls approved content from Notion, optimizes captions via AI for LinkedIn and Twitter, auto-publishes, and updates status with live post URLs.", techStack: ["n8n", "OpenAI", "Notion", "LinkedIn", "Twitter"], url: "#", image: "/thumbnails/gmautomation/social-media-scheduler.png", subBrand: "gmautomation" as const, order: 26, workflowJson: "/workflows/social-media-scheduler.json" },
      { name: "SEO Keyword Research & Content Brief Automation", description: "Automated SEO keyword and SERP analysis using DataForSEO. Tracks search volume, CPC, competition, and ranking data. Auto-creates Google Sheets with keyword metrics and competitor insights.", techStack: ["n8n", "DataForSEO", "Google Sheets", "SEO Analytics"], url: "#", image: "/thumbnails/gmautomation/seo-research.png", subBrand: "gmautomation" as const, order: 27, workflowJson: "/workflows/seo-research.json" },
      { name: "AI Lead Qualification & Scoring System", description: "AI-powered lead qualification that captures inbound leads, scores and enriches them with OpenAI, routes priority leads to Slack and Gmail, and logs all submissions to Google Sheets.", techStack: ["n8n", "OpenAI", "Slack", "Gmail", "Google Sheets"], url: "#", image: "/thumbnails/gmautomation/lead-qualification.png", subBrand: "gmautomation" as const, order: 28, workflowJson: "/workflows/lead-qualification.json" },
    ];

    for (const project of automationProjects) {
      const match = existingByName[project.name];
      if (match) {
        await ctx.db.patch(match._id, {
          workflowJson: project.workflowJson,
          image: project.image,
          url: project.url,
        });
      } else {
        await ctx.db.insert("projects", project);
      }
    }
  },
});
