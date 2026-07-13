import { mutation } from "./_generated/server";
import { AVATAR_BY_NAME, TESTIMONIAL_SEEDS } from "./testimonialData";

const designProjects = [
  {
    name: "GiGi Energy: Logo & Can Label",
    description: "Logo, colour palette, and can label design for a Nairobi energy drink.",
    techStack: ["GiGi Energy", "Logo"],
    url: "#",
    image: "/thumbnails/1.png",
    subBrand: "gmdesign" as const,
    order: 8,
  },
  {
    name: "GiGi Energy: Product Campaign",
    description: "Product photo layout built around the can, fruit, and brand colours.",
    techStack: ["GiGi Energy", "Social post"],
    url: "#",
    image: "/thumbnails/2.png",
    subBrand: "gmdesign" as const,
    order: 9,
  },
  {
    name: "KenyaTrace: Merch T-Shirt",
    description: "Logo applied to merchandise for the KenyaTrace tourism brand.",
    techStack: ["KenyaTrace", "Print"],
    url: "#",
    image: "/thumbnails/3.png",
    subBrand: "gmdesign" as const,
    order: 10,
  },
  {
    name: "GiGi Energy: Lemon Lime Ad",
    description: "Social-style product ad with the GiGi can, citrus fruit, and brand green.",
    techStack: ["GiGi Energy", "Social post"],
    url: "#",
    image: "/thumbnails/4.png",
    subBrand: "gmdesign" as const,
    order: 11,
  },
  {
    name: "GiGi Energy: Pineapple Coconut Line",
    description: "A second flavour line with yellow and brown tones and tropical visuals.",
    techStack: ["GiGi Energy", "Packaging"],
    url: "#",
    image: "/thumbnails/5.png",
    subBrand: "gmdesign" as const,
    order: 12,
  },
  {
    name: "Graza: Packaging",
    description: "Olive oil squeeze bottles with a bold green and yellow label system.",
    techStack: ["Graza", "Packaging"],
    url: "#",
    image: "/thumbnails/gmdesign/graza-bottle-packaging-front.png",
    subBrand: "gmdesign" as const,
    order: 16,
  },
  {
    name: "Graza: Lifestyle Shot",
    description: "Product bottles styled in a kitchen setting for web and social use.",
    techStack: ["Graza", "Social post"],
    url: "#",
    image: "/thumbnails/gmdesign/graza-bottle-lifestyle-shot.png",
    subBrand: "gmdesign" as const,
    order: 17,
  },
  {
    name: "Fesaskin: Social Post",
    description: "Beauty campaign graphic with product lineup and soft pink brand colours.",
    techStack: ["Fesaskin", "Social post"],
    url: "#",
    image: "/thumbnails/gmdesign/fesaskin-glowing-package-post.png",
    subBrand: "gmdesign" as const,
    order: 18,
  },
  {
    name: "Nadhifa: Product Line",
    description: "Skincare packaging in white and pink, shown as a matched product set.",
    techStack: ["Nadhifa Beauty Care", "Packaging"],
    url: "#",
    image: "/thumbnails/gmdesign/nadhifa-beauty-product-line.png",
    subBrand: "gmdesign" as const,
    order: 19,
  },
  {
    name: "Colour Study: Forest",
    description: "Six-colour palette pulled from a tree-lined path photo.",
    techStack: ["Colour study", "Brand colours"],
    url: "#",
    image: "/thumbnails/gmdesign/forest-colour-palette-study.png",
    subBrand: "gmdesign" as const,
    order: 20,
  },
  {
    name: "Elva: Drink Line",
    description: "Premium drink bottles in black, blue, and purple for three formulas.",
    techStack: ["Elva", "Packaging"],
    url: "#",
    image: "/thumbnails/gmdesign/elva-drink-packaging-line.png",
    subBrand: "gmdesign" as const,
    order: 21,
  },
  {
    name: "Qantra: Brand System",
    description: "Logo, app icon, business card, tote bag, and signage in one brand board.",
    techStack: ["Qantra", "Logo"],
    url: "#",
    image: "/thumbnails/gmdesign/qantra-brand-system-board.png",
    subBrand: "gmdesign" as const,
    order: 22,
  },
  {
    name: "Voront Glass: Brand Mockups",
    description: "Gold logo applied across mugs, stationery, apparel, vehicle graphics, and a cap.",
    techStack: ["Voront Glass", "Logo"],
    url: "#",
    image: "/thumbnails/gmdesign/voront-glass-brand-mockups.png",
    subBrand: "gmdesign" as const,
    order: 23,
  },
];

export const seed = mutation({
  handler: async (ctx) => {
    const existing = await ctx.db.query("projects").collect();
    const existingNames = existing.map((p) => p.name);
    const existingSet = new Set(existingNames);
    const validDesignImages = new Set(designProjects.map((p) => p.image));

    const codeProjects = [
      { name: "LegalFlow - Practice Management", description: "A platform for Kenyan law firms to handle intake, cases, documents, billing, and client messages in one place.", techStack: ["React", "Development", "Legal Tech"], url: "https://law-five-eta.vercel.app/", image: "/thumbnails/legalflow.png", subBrand: "gmcode" as const, order: 1 },
      { name: "CodeMaster - Coding Learning Platform", description: "A coding learning site with 11 courses and 368+ lessons in JavaScript, Python, and AI. Students work through lessons and challenges in a built-in editor.", techStack: ["React", "Education", "Interactive"], url: "https://codemaster-ten.vercel.app/", image: "/thumbnails/codemaster.png", subBrand: "gmcode" as const, order: 2 },
      { name: "GiGi Energy Drink - Product Website", description: "A product site for a Nairobi-made energy drink. Bold colours and simple messaging to match the brand.", techStack: ["React", "E-commerce", "Product"], url: "https://drink-sand.vercel.app/", image: "/thumbnails/gigi-energy.png", subBrand: "gmcode" as const, order: 5 },
      { name: "KenyaTrace - Tourism Explorer", description: "A site to help people discover places to visit in Kenya. Covers attractions, routes, and travel info across the country.", techStack: ["React", "Tourism", "Development"], url: "https://kenya-tourism-app-xi.vercel.app/welcome", image: "/thumbnails/kenya-tourism.png", subBrand: "gmcode" as const, order: 7 },
    ];

    const marketingProjects = [
      { name: "Product Promo - Video Ad", description: "A short video ad showing product features and a call to action for social media.", techStack: ["Video", "Marketing"], url: "/thumbnails/one.mp4", image: "", subBrand: "gmmarketing" as const, order: 16 },
      { name: "Brand Story - Documentary Style", description: "A longer video about a company's background, what they do, and why they do it.", techStack: ["Video", "Branding"], url: "/thumbnails/two.mp4", image: "", subBrand: "gmmarketing" as const, order: 17 },
      { name: "Social Media Reel - Short Form", description: "Short videos made for TikTok, Instagram Reels, and YouTube Shorts.", techStack: ["Video", "Social Media"], url: "/thumbnails/three.mp4", image: "", subBrand: "gmmarketing" as const, order: 18 },
      { name: "Client Testimonial - Interview", description: "A video interview with a client talking about their experience working with the business.", techStack: ["Video", "Testimonials"], url: "/thumbnails/four.mp4", image: "", subBrand: "gmmarketing" as const, order: 19 },
      { name: "Event Recap - Highlight Reel", description: "A highlight video from an event covering key moments, speakers, and the overall atmosphere.", techStack: ["Video", "Events"], url: "/thumbnails/five.mp4", image: "", subBrand: "gmmarketing" as const, order: 24 },
    ];

    const automationProjects = [
      { name: "AI Blog Content Generation & Publishing", description: "Automate blog creation in brand voice with AI. Extracts writing style from existing articles, understands brand voice characteristics, and generates new content aligned with your brand. Publishes drafts to WordPress for human review.", techStack: ["n8n", "OpenAI", "WordPress", "Content Automation"], url: "https://n8n.io/workflows/2648-automate-blog-creation-in-brand-voice-with-ai", image: "/thumbnails/gmautomation/blog-automation.png", subBrand: "gmautomation" as const, order: 25, workflowJson: "/workflows/blog-automation.json" },
      { name: "Social Media Content Scheduling Engine", description: "Multi-client social media scheduler that pulls approved content from Notion, optimizes captions via AI for LinkedIn and Twitter, auto-publishes, and updates status with live post URLs.", techStack: ["n8n", "OpenAI", "Notion", "LinkedIn", "Twitter"], url: "https://n8nlab.io/blog/n8n-agency-social-media-scheduling-workflow", image: "/thumbnails/gmautomation/social-media-scheduler.png", subBrand: "gmautomation" as const, order: 26, workflowJson: "/workflows/social-media-scheduler.json" },
      { name: "SEO Keyword Research & Content Brief Automation", description: "Automated SEO keyword and SERP analysis using DataForSEO. Tracks search volume, CPC, competition, and ranking data. Auto-creates Google Sheets with keyword metrics and competitor insights.", techStack: ["n8n", "DataForSEO", "Google Sheets", "SEO Analytics"], url: "https://n8n.io/workflows/10137-automate-seo-keyword-and-serp-analysis-with-dataforseo-and-google-sheets", image: "/thumbnails/gmautomation/seo-research.png", subBrand: "gmautomation" as const, order: 27, workflowJson: "/workflows/seo-research.json" },
      { name: "AI Lead Qualification & Scoring System", description: "AI-powered lead qualification that captures inbound leads, scores and enriches them with OpenAI, routes priority leads to Slack and Gmail, and logs all submissions to Google Sheets.", techStack: ["n8n", "OpenAI", "Slack", "Gmail", "Google Sheets"], url: "https://github.com/matolengwe96/ai-lead-qualification-n8n", image: "/thumbnails/gmautomation/lead-qualification.png", subBrand: "gmautomation" as const, order: 28, workflowJson: "/workflows/lead-qualification.json" },
    ];

    const projects = [...codeProjects, ...marketingProjects];

    for (const project of projects) {
      if (!existingSet.has(project.name)) {
        await ctx.db.insert("projects", project);
      }
    }

    for (const project of automationProjects) {
      if (!existingSet.has(project.name)) {
        await ctx.db.insert("projects", project);
      }
    }

    for (const design of designProjects) {
      const match = existing.find((p) => p.image === design.image);
      if (match) {
        await ctx.db.patch(match._id, design);
      } else if (!existingSet.has(design.name)) {
        await ctx.db.insert("projects", design);
      }
    }

    const gmdesign = existing.filter((p) => p.subBrand === "gmdesign");
    for (const project of gmdesign) {
      if (!validDesignImages.has(project.image)) {
        await ctx.db.delete(project._id);
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

    const automationProjects = [
      { name: "AI Blog Content Generation & Publishing", description: "Automate blog creation in brand voice with AI. Extracts writing style from existing articles, understands brand voice characteristics, and generates new content aligned with your brand. Publishes drafts to WordPress for human review.", techStack: ["n8n", "OpenAI", "WordPress", "Content Automation"], url: "https://n8n.io/workflows/2648-automate-blog-creation-in-brand-voice-with-ai", image: "/thumbnails/gmautomation/blog-automation.png", subBrand: "gmautomation" as const, order: 25, workflowJson: "/workflows/blog-automation.json" },
      { name: "Social Media Content Scheduling Engine", description: "Multi-client social media scheduler that pulls approved content from Notion, optimizes captions via AI for LinkedIn and Twitter, auto-publishes, and updates status with live post URLs.", techStack: ["n8n", "OpenAI", "Notion", "LinkedIn", "Twitter"], url: "https://n8nlab.io/blog/n8n-agency-social-media-scheduling-workflow", image: "/thumbnails/gmautomation/social-media-scheduler.png", subBrand: "gmautomation" as const, order: 26, workflowJson: "/workflows/social-media-scheduler.json" },
      { name: "SEO Keyword Research & Content Brief Automation", description: "Automated SEO keyword and SERP analysis using DataForSEO. Tracks search volume, CPC, competition, and ranking data. Auto-creates Google Sheets with keyword metrics and competitor insights.", techStack: ["n8n", "DataForSEO", "Google Sheets", "SEO Analytics"], url: "https://n8n.io/workflows/10137-automate-seo-keyword-and-serp-analysis-with-dataforseo-and-google-sheets", image: "/thumbnails/gmautomation/seo-research.png", subBrand: "gmautomation" as const, order: 27, workflowJson: "/workflows/seo-research.json" },
      { name: "AI Lead Qualification & Scoring System", description: "AI-powered lead qualification that captures inbound leads, scores and enriches them with OpenAI, routes priority leads to Slack and Gmail, and logs all submissions to Google Sheets.", techStack: ["n8n", "OpenAI", "Slack", "Gmail", "Google Sheets"], url: "https://github.com/matolengwe96/ai-lead-qualification-n8n", image: "/thumbnails/gmautomation/lead-qualification.png", subBrand: "gmautomation" as const, order: 28, workflowJson: "/workflows/lead-qualification.json" },
    ];

    for (const project of automationProjects) {
      const match = existingByName[project.name];
      if (match) {
        if (!match.workflowJson || match.image !== project.image) {
          await ctx.db.patch(match._id, { workflowJson: project.workflowJson, image: project.image });
        }
      } else {
        await ctx.db.insert("projects", project);
      }
    }
  },
});
