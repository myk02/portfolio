import { mutation } from "./_generated/server";

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
    name: "CLE: ATP Webinar Flyer",
    description: "Flyer for a Council of Legal Education webinar with date, time, QR code, and contact details.",
    techStack: ["CLE", "Print"],
    url: "#",
    image: "/thumbnails/6.png",
    subBrand: "gmdesign" as const,
    order: 13,
  },
  {
    name: "CLE: Labour Day Social Post",
    description: "Labour Day post for CLE social channels using the organisation colours and logo.",
    techStack: ["CLE", "Social post"],
    url: "#",
    image: "/thumbnails/7.png",
    subBrand: "gmdesign" as const,
    order: 14,
  },
  {
    name: "CLE: Newsletter Cover",
    description: "Front cover for the CLE monthly newsletter with issue date, feature list, and QR code.",
    techStack: ["CLE", "Print"],
    url: "#",
    image: "/thumbnails/8.png",
    subBrand: "gmdesign" as const,
    order: 15,
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
      { name: "LegalFlow - Practice Management", description: "A platform for Kenyan law firms to handle intake, cases, documents, billing, and client messages in one place.", techStack: ["React", "Full-stack", "Legal Tech"], url: "https://law-five-eta.vercel.app/", image: "/thumbnails/legalflow.png", subBrand: "gmcode" as const, order: 1 },
      { name: "CodeMaster - Coding Learning Platform", description: "A coding learning site with 11 courses and 368+ lessons in JavaScript, Python, and AI. Students work through lessons and challenges in a built-in editor.", techStack: ["React", "Education", "Interactive"], url: "https://codemaster-ten.vercel.app/", image: "/thumbnails/codemaster.png", subBrand: "gmcode" as const, order: 2 },
      { name: "CarSoko - Car Rental Platform", description: "A car rental site for Nairobi with a large vehicle list. Users can browse by type, brand, and location and book online.", techStack: ["React", "E-commerce", "Full-stack"], url: "https://car-nu-ten.vercel.app/", image: "/thumbnails/carsoko.png", subBrand: "gmcode" as const, order: 3 },
      { name: "Nora Designs - Architecture Portfolio", description: "A portfolio site for an architecture studio in Nairobi. Built around large photos of residential, commercial, and interior projects.", techStack: ["React", "Portfolio", "Design"], url: "https://design-sigma-beryl.vercel.app/", image: "/thumbnails/nora-designs.png", subBrand: "gmcode" as const, order: 4 },
      { name: "GiGi Energy Drink - Product Website", description: "A product site for a Nairobi-made energy drink. Bold colours and simple messaging to match the brand.", techStack: ["React", "E-commerce", "Product"], url: "https://drink-sand.vercel.app/", image: "/thumbnails/gigi-energy.png", subBrand: "gmcode" as const, order: 5 },
      { name: "PureMatch254 - Matchmaking Platform", description: "A dating platform for people in Kenya looking for serious relationships. Profiles, matching, messaging, and an admin area for the team.", techStack: ["React", "Full-stack", "Social"], url: "https://www.purematch254.com/", image: "/thumbnails/purematch254.png", subBrand: "gmcode" as const, order: 6 },
      { name: "KenyaTrace - Tourism Explorer", description: "A site to help people discover places to visit in Kenya. Covers attractions, routes, and travel info across the country.", techStack: ["React", "Tourism", "Full-stack"], url: "https://kenya-tourism-app-xi.vercel.app/welcome", image: "/thumbnails/kenya-tourism.png", subBrand: "gmcode" as const, order: 7 },
    ];

    const marketingProjects = [
      { name: "Product Promo - Video Ad", description: "A short video ad showing product features and a call to action for social media.", techStack: ["Video", "Marketing"], url: "/thumbnails/one.mp4", image: "", subBrand: "gmmarketing" as const, order: 16 },
      { name: "Brand Story - Documentary Style", description: "A longer video about a company's background, what they do, and why they do it.", techStack: ["Video", "Branding"], url: "/thumbnails/two.mp4", image: "", subBrand: "gmmarketing" as const, order: 17 },
      { name: "Social Media Reel - Short Form", description: "Short videos made for TikTok, Instagram Reels, and YouTube Shorts.", techStack: ["Video", "Social Media"], url: "/thumbnails/three.mp4", image: "", subBrand: "gmmarketing" as const, order: 18 },
      { name: "Client Testimonial - Interview", description: "A video interview with a client talking about their experience working with the business.", techStack: ["Video", "Testimonials"], url: "/thumbnails/four.mp4", image: "", subBrand: "gmmarketing" as const, order: 19 },
      { name: "Event Recap - Highlight Reel", description: "A highlight video from an event covering key moments, speakers, and the overall atmosphere.", techStack: ["Video", "Events"], url: "/thumbnails/five.mp4", image: "", subBrand: "gmmarketing" as const, order: 24 },
    ];

    const projects = [...codeProjects, ...marketingProjects];

    for (const project of projects) {
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
    ];
    for (const project of refreshed) {
      if (project.subBrand === "gmdesign" && obsoleteNames.includes(project.name)) {
        await ctx.db.delete(project._id);
      }
    }

    const existingTestimonials = await ctx.db.query("testimonials").collect();
    if (existingTestimonials.length > 0) return;

    const skinTones = ["5C3A21","8B5E3C","6B4226","7B4A2B","4A2C17","9C6B4E","3E2212","A0674B"];
    const testimonials = [
      { name: "James Otieno", role: "Legal Firm Partner", text: "LegalFlow replaced three separate tools we were using. Matter tracking, billing, and client communication in one place.", avatar: `https://ui-avatars.com/api/?name=James+Otieno&background=${skinTones[0]}&color=fff&size=80`, rating: 5, isApproved: true },
      { name: "Grace Wanjiku", role: "Education Director", text: "CodeMaster is exactly what our students needed. The structured approach to learning coding is unmatched.", avatar: `https://ui-avatars.com/api/?name=Grace+Wanjiku&background=${skinTones[1]}&color=fff&size=80`, rating: 5, isApproved: true },
      { name: "Kevin Mwangi", role: "Car Rental Entrepreneur", text: "Finding and booking a car through CarSoko was seamless. The platform is intuitive and the service professional.", avatar: `https://ui-avatars.com/api/?name=Kevin+Mwangi&background=${skinTones[2]}&color=fff&size=80`, rating: 5, isApproved: true },
      { name: "Faith Nyambura", role: "Startup Founder", text: "Working with the team was seamless. They understood our needs, delivered on time, and communicated clearly.", avatar: `https://ui-avatars.com/api/?name=Faith+Nyambura&background=${skinTones[3]}&color=fff&size=80`, rating: 5, isApproved: true },
      { name: "Peter Kamau", role: "Tech Company CEO", text: "The software solution transformed our operations. We've seen a 40% increase in efficiency since implementation.", avatar: `https://ui-avatars.com/api/?name=Peter+Kamau&background=${skinTones[4]}&color=fff&size=80`, rating: 5, isApproved: true },
      { name: "Nancy Akinyi", role: "Marketing Manager", text: "The platform design is intuitive and beautiful. Our customers love the new experience.", avatar: `https://ui-avatars.com/api/?name=Nancy+Akinyi&background=${skinTones[5]}&color=fff&size=80`, rating: 5, isApproved: true },
      { name: "Samuel Kiprop", role: "IT Director", text: "System integration was seamless and the training provided was top-notch. Highly recommended.", avatar: `https://ui-avatars.com/api/?name=Samuel+Kiprop&background=${skinTones[6]}&color=fff&size=80`, rating: 5, isApproved: true },
      { name: "Diana Wambui", role: "Non-Profit Lead", text: "We needed a platform that could scale with our growing community. The solution delivered beyond expectations.", avatar: `https://ui-avatars.com/api/?name=Diana+Wambui&background=${skinTones[7]}&color=fff&size=80`, rating: 5, isApproved: true },
      { name: "Brian Omondi", role: "E-commerce Owner", text: "Sales have doubled since the new site launched. The user experience is smooth and the checkout flow is flawless.", avatar: `https://ui-avatars.com/api/?name=Brian+Omondi&background=${skinTones[0]}&color=fff&size=80`, rating: 5, isApproved: true },
      { name: "Catherine Njeri", role: "University Admin", text: "The learning management system revolutionized how we deliver education. Students and faculty both love it.", avatar: `https://ui-avatars.com/api/?name=Catherine+Njeri&background=${skinTones[1]}&color=fff&size=80`, rating: 5, isApproved: true },
      { name: "David Muthomi", role: "Healthcare Executive", text: "Patient management has never been easier. The system is reliable, secure, and our staff adapted quickly.", avatar: `https://ui-avatars.com/api/?name=David+Muthomi&background=${skinTones[2]}&color=fff&size=80`, rating: 5, isApproved: true },
      { name: "Esther Chebet", role: "Event Coordinator", text: "The booking platform streamlined our entire process. We've reduced no-shows by 60%.", avatar: `https://ui-avatars.com/api/?name=Esther+Chebet&background=${skinTones[3]}&color=fff&size=80`, rating: 5, isApproved: true },
      { name: "Francis Njoroge", role: "Real Estate Agent", text: "Property listings now look stunning online. The virtual tour integration was a game-changer.", avatar: `https://ui-avatars.com/api/?name=Francis+Njoroge&background=${skinTones[4]}&color=fff&size=80`, rating: 5, isApproved: true },
      { name: "Gladys Jeruto", role: "Banking Consultant", text: "Security and reliability were our top concerns. The system exceeded all our requirements.", avatar: `https://ui-avatars.com/api/?name=Gladys+Jeruto&background=${skinTones[5]}&color=fff&size=80`, rating: 5, isApproved: true },
      { name: "Henry Kiplagat", role: "Logistics Manager", text: "Fleet management has never been this efficient. Real-time tracking saved us hours of manual work.", avatar: `https://ui-avatars.com/api/?name=Henry+Kiplagat&background=${skinTones[6]}&color=fff&size=80`, rating: 5, isApproved: true },
      { name: "Irene Achieng", role: "Retail Chain Owner", text: "Multi-store inventory system is now fully integrated. Stock management became effortless.", avatar: `https://ui-avatars.com/api/?name=Irene+Achieng&background=${skinTones[7]}&color=fff&size=80`, rating: 5, isApproved: true },
      { name: "John Kioko", role: "Restaurant Group Owner", text: "The reservation and ordering system transformed our business. Online orders now make up 60% of revenue.", avatar: `https://ui-avatars.com/api/?name=John+Kioko&background=${skinTones[0]}&color=fff&size=80`, rating: 5, isApproved: true },
      { name: "Khadija Hassan", role: "Media Producer", text: "Content management became effortless. The team delivered exactly what we envisioned.", avatar: `https://ui-avatars.com/api/?name=Khadija+Hassan&background=${skinTones[1]}&color=fff&size=80`, rating: 5, isApproved: true },
      { name: "Lawrence Mutua", role: "Manufacturing Lead", text: "Production tracking went digital. We now have real-time visibility across all factory lines.", avatar: `https://ui-avatars.com/api/?name=Lawrence+Mutua&background=${skinTones[2]}&color=fff&size=80`, rating: 5, isApproved: true },
      { name: "Margaret Wairimu", role: "HR Director", text: "The HR management system simplified recruitment, payroll, and performance tracking. A complete game-changer.", avatar: `https://ui-avatars.com/api/?name=Margaret+Wairimu&background=${skinTones[3]}&color=fff&size=80`, rating: 5, isApproved: true },
    ];

    for (const t of testimonials) {
      await ctx.db.insert("testimonials", t);
    }
  },
});
