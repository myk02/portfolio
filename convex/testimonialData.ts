export type TestimonialSeed = {
  name: string;
  role: string;
  text: string;
  avatar: string;
  rating: number;
  isApproved: boolean;
};

export const TESTIMONIAL_SEEDS: TestimonialSeed[] = [
  { name: "James Otieno", role: "Legal Firm Partner", text: "LegalFlow replaced three separate tools we were using. Matter tracking, billing, and client communication in one place.", avatar: "/avatars/avatar-m1.jpg", rating: 5, isApproved: true },
  { name: "Grace Wanjiku", role: "Education Director", text: "CodeMaster is exactly what our students needed. The structured approach to learning coding is unmatched.", avatar: "/avatars/avatar-f1.jpg", rating: 5, isApproved: true },
  { name: "Kevin Mwangi", role: "Car Rental Entrepreneur", text: "Finding and booking a car through CarSoko was seamless. The platform is intuitive and the service professional.", avatar: "/avatars/avatar-m2.jpg", rating: 5, isApproved: true },
  { name: "Faith Nyambura", role: "Startup Founder", text: "Working with the team was seamless. They understood our needs, delivered on time, and communicated clearly.", avatar: "/avatars/avatar-f2.jpg", rating: 5, isApproved: true },
  { name: "Peter Kamau", role: "Tech Company CEO", text: "The software solution transformed our operations. We've seen a 40% increase in efficiency since implementation.", avatar: "/avatars/avatar-m3.jpg", rating: 5, isApproved: true },
  { name: "Nancy Akinyi", role: "Marketing Manager", text: "The platform design is intuitive and beautiful. Our customers love the new experience.", avatar: "/avatars/avatar-f3.jpg", rating: 5, isApproved: true },
  { name: "Samuel Kiprop", role: "IT Director", text: "System integration was seamless and the training provided was top-notch. Highly recommended.", avatar: "/avatars/avatar-m4.jpg", rating: 5, isApproved: true },
  { name: "Diana Wambui", role: "Non-Profit Lead", text: "We needed a platform that could scale with our growing community. The solution delivered beyond expectations.", avatar: "/avatars/avatar-f4.jpg", rating: 5, isApproved: true },
  { name: "Brian Omondi", role: "E-commerce Owner", text: "Sales have doubled since the new site launched. The user experience is smooth and the checkout flow is flawless.", avatar: "/avatars/avatar-m5.jpg", rating: 5, isApproved: true },
  { name: "Catherine Njeri", role: "University Admin", text: "The learning management system revolutionized how we deliver education. Students and faculty both love it.", avatar: "/avatars/avatar-f5.jpg", rating: 5, isApproved: true },
  { name: "David Muthomi", role: "Healthcare Executive", text: "Patient management has never been easier. The system is reliable, secure, and our staff adapted quickly.", avatar: "/avatars/avatar-m6.jpg", rating: 5, isApproved: true },
  { name: "Esther Chebet", role: "Event Coordinator", text: "The booking platform streamlined our entire process. We've reduced no-shows by 60%.", avatar: "/avatars/avatar-f6.jpg", rating: 5, isApproved: true },
  { name: "Francis Njoroge", role: "Real Estate Agent", text: "Property listings now look stunning online. The virtual tour integration was a game-changer.", avatar: "/avatars/avatar-m7.jpg", rating: 5, isApproved: true },
  { name: "Gladys Jeruto", role: "Banking Consultant", text: "Security and reliability were our top concerns. The system exceeded all our requirements.", avatar: "/avatars/avatar-f7.jpg", rating: 5, isApproved: true },
  { name: "Henry Kiplagat", role: "Logistics Manager", text: "Fleet management has never been this efficient. Real-time tracking saved us hours of manual work.", avatar: "/avatars/avatar-m8.jpg", rating: 5, isApproved: true },
  { name: "Irene Achieng", role: "Retail Chain Owner", text: "Multi-store inventory system is now fully integrated. Stock management became effortless.", avatar: "/avatars/avatar-f8.jpg", rating: 5, isApproved: true },
  { name: "John Kioko", role: "Restaurant Group Owner", text: "The reservation and ordering system transformed our business. Online orders now make up 60% of revenue.", avatar: "/avatars/avatar-m9.jpg", rating: 5, isApproved: true },
  { name: "Khadija Hassan", role: "Media Producer", text: "Content management became effortless. The team delivered exactly what we envisioned.", avatar: "/avatars/avatar-f9.jpg", rating: 5, isApproved: true },
  { name: "Lawrence Mutua", role: "Manufacturing Lead", text: "Production tracking went digital. We now have real-time visibility across all factory lines.", avatar: "/avatars/avatar-m10.jpg", rating: 5, isApproved: true },
  { name: "Margaret Wairimu", role: "HR Director", text: "The HR management system simplified recruitment, payroll, and performance tracking. A complete game-changer.", avatar: "/avatars/avatar-f10.jpg", rating: 5, isApproved: true },
];

export const AVATAR_BY_NAME = Object.fromEntries(
  TESTIMONIAL_SEEDS.map((t) => [t.name, t.avatar]),
) as Record<string, string>;
