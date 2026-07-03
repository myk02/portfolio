import { mutation } from "./_generated/server";

export const seed = mutation({
  handler: async (ctx) => {
    const existingNames = (await ctx.db.query("projects").collect()).map((p) => p.name);
    const existingSet = new Set(existingNames);

    const projects = [
      { name: "LegalFlow - Practice Management", description: "Practice management platform for Kenyan law firms. Moves intake, matters, documents, billing, and client communication into one workspace.", techStack: ["React", "Full-stack", "Legal Tech"], url: "https://law-five-eta.vercel.app/", image: "/thumbnails/legalflow.png", subBrand: "gmcode" as const, order: 1 },
      { name: "CodeMaster - Coding Learning Platform", description: "Structured coding education with 11 courses and 368+ lessons across JavaScript, Python, and AI. Interactive editor and auto-graded challenges.", techStack: ["React", "Education", "Interactive"], url: "https://codemaster-ten.vercel.app/", image: "/thumbnails/codemaster.png", subBrand: "gmcode" as const, order: 2 },
      { name: "CarSoko - Car Rental Platform", description: "Car rental platform in Nairobi with 100,000+ vehicle inventory. Browse by type, brand, and location with secure booking.", techStack: ["React", "E-commerce", "Full-stack"], url: "https://car-nu-ten.vercel.app/", image: "/thumbnails/carsoko.png", subBrand: "gmcode" as const, order: 3 },
      { name: "Nora Designs - Architecture Portfolio", description: "Modern architecture studio portfolio showcasing residential, commercial, and interior design projects in Nairobi.", techStack: ["React", "Portfolio", "Design"], url: "https://design-sigma-beryl.vercel.app/", image: "/thumbnails/nora-designs.png", subBrand: "gmcode" as const, order: 4 },
      { name: "GiGi Energy Drink - Product Website", description: "E-commerce product website for zero sugar, natural flavor energy drink made in Nairobi.", techStack: ["React", "E-commerce", "Product"], url: "https://drink-sand.vercel.app/", image: "/thumbnails/gigi-energy.png", subBrand: "gmcode" as const, order: 5 },
      { name: "PureMatch254 - Matchmaking Platform", description: "Trustworthy dating platform for serious relationships in Kenya. Secure profiles, matching, messaging, and admin controls.", techStack: ["React", "Full-stack", "Social"], url: "https://www.purematch254.com/", image: "/thumbnails/purematch254.png", subBrand: "gmcode" as const, order: 6 },
      { name: "KenyaTrace - Tourism Explorer", description: "Tourism discovery platform for Kenya — explore places, attractions, routes, and travel information across the country.", techStack: ["React", "Tourism", "Full-stack"], url: "https://kenya-tourism-app-xi.vercel.app/welcome", image: "/thumbnails/kenya-tourism.png", subBrand: "gmcode" as const, order: 7 },
      { name: "Brand Identity - Logos & Guidelines", description: "Complete brand identity systems including logo design, color palettes, typography selection, and brand guidelines.", techStack: ["Branding", "Identity"], url: "#", image: "/thumbnails/1.png", subBrand: "gmdesign" as const, order: 8 },
      { name: "Social Media Graphics", description: "Custom social media templates and graphics optimized for engagement across Instagram, LinkedIn, and Twitter.", techStack: ["Social Media", "Graphics"], url: "#", image: "/thumbnails/2.png", subBrand: "gmdesign" as const, order: 9 },
      { name: "Business Stationery Design", description: "Professional business card, letterhead, and corporate stationery designs that reflect your brand identity.", techStack: ["Print", "Identity"], url: "#", image: "/thumbnails/3.png", subBrand: "gmdesign" as const, order: 10 },
      { name: "UI/UX Interface Design", description: "Clean, user-centered interface designs for web and mobile applications with focus on usability and aesthetics.", techStack: ["UI/UX", "Figma"], url: "#", image: "/thumbnails/4.png", subBrand: "gmdesign" as const, order: 11 },
      { name: "Brand Style Guide", description: "Comprehensive brand style guides covering logo usage, color systems, typography, iconography, and design tokens.", techStack: ["Branding", "Documentation"], url: "#", image: "/thumbnails/5.png", subBrand: "gmdesign" as const, order: 12 },
      { name: "Marketing Collateral Design", description: "Flyers, brochures, banners, and promotional materials designed to communicate your message effectively.", techStack: ["Marketing", "Print"], url: "#", image: "/thumbnails/6.png", subBrand: "gmdesign" as const, order: 13 },
      { name: "Packaging & Label Design", description: "Product packaging and label designs that stand out on shelves and communicate brand values at a glance.", techStack: ["Packaging", "Product"], url: "#", image: "/thumbnails/7.png", subBrand: "gmdesign" as const, order: 14 },
      { name: "Mobile App UI Design", description: "Mobile-first interface designs for iOS and Android apps with intuitive navigation and pixel-perfect screens.", techStack: ["Mobile", "UI/UX"], url: "#", image: "/thumbnails/8.png", subBrand: "gmdesign" as const, order: 15 },
      { name: "Product Promo - Video Ad", description: "Engaging video advertisement showcasing product features, benefits, and call-to-action for social media campaigns.", techStack: ["Video", "Marketing"], url: "/thumbnails/one.mp4", image: "", subBrand: "gmmarketing" as const, order: 16 },
      { name: "Brand Story - Documentary Style", description: "Cinematic brand storytelling video that communicates company mission, values, and journey.", techStack: ["Video", "Branding"], url: "/thumbnails/two.mp4", image: "", subBrand: "gmmarketing" as const, order: 17 },
      { name: "Social Media Reel - Short Form", description: "High-energy short-form video optimized for TikTok, Instagram Reels, and YouTube Shorts to maximize reach.", techStack: ["Video", "Social Media"], url: "/thumbnails/three.mp4", image: "", subBrand: "gmmarketing" as const, order: 18 },
      { name: "Client Testimonial - Interview", description: "Professional client testimonial video featuring real customer experiences and success stories.", techStack: ["Video", "Testimonials"], url: "/thumbnails/four.mp4", image: "", subBrand: "gmmarketing" as const, order: 19 },
      { name: "Event Recap - Highlight Reel", description: "Dynamic event highlight reel capturing key moments, speakers, and attendee experiences.", techStack: ["Video", "Events"], url: "/thumbnails/five.mp4", image: "", subBrand: "gmmarketing" as const, order: 20 },
    ];

    for (const project of projects) {
      if (!existingSet.has(project.name)) {
        await ctx.db.insert("projects", project);
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
