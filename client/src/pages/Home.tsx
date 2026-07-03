import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Code, Palette, Printer, Layers, BarChart3, Video, Shield, Headphones, Mail, Phone, MapPin, ArrowRight, Menu, X, Moon, Sun, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import FeedbackForm from "@/components/FeedbackForm";
import ServiceRequestForm from "@/components/ServiceRequestForm";

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());
  const [formTab, setFormTab] = useState<"service" | "feedback">("service");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const seed = useMutation(api.seed.seed);

  useEffect(() => { seed(); }, [seed]);

  const handleImageError = (index: number) => {
    setFailedImages(prev => new Set(prev).add(index));
  };

  const getProjectPlaceholder = (name: string) => {
    const words = name.split(/[\s-]+/);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const placeholderColors = [
    "from-blue-400 to-blue-600",
    "from-purple-400 to-purple-600",
    "from-emerald-400 to-emerald-600",
    "from-rose-400 to-rose-600",
    "from-amber-400 to-amber-600",
    "from-cyan-400 to-cyan-600",
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    { icon: Palette, title: "Brand & Graphic Design", desc: "Logos, brand colours, social posts, email graphics, presentations, and print work. I use Figma, Adobe Creative Suite, and Canva." },
    { icon: Code, title: "Web Design & WordPress", desc: "I design and build websites on WordPress and Webflow. I also code with JavaScript, TypeScript, Python, PHP, and SQL when a project needs more than a template." },
    { icon: Video, title: "Motion & Social Video", desc: "Short videos, GIFs, and simple motion graphics for social media. I use CapCut Pro, Canva, and Adobe tools." },
    { icon: Layers, title: "UX/UI Design", desc: "I plan and design website and app screens so they are easy to use and work well on phones and computers." },
    { icon: BarChart3, title: "SEO & Web Analytics", desc: "I set up pages with proper titles, alt text, and structure. I also use GA4 to see what is working and what needs to change." },
    { icon: Printer, title: "Print & Event Materials", desc: "Brochures, banners, merch, and event materials that match the rest of your brand." },
  ];

  const toolkit = ["Figma", "Adobe CC", "WordPress", "Canva", "CapCut Pro", "HTML/CSS", "GA4", "Webflow"];

  const devToolkit = ["JavaScript", "TypeScript", "Python", "PHP", "SQL", "REST APIs", "Git", "GitHub", "Vercel", "Azure", "Postman"];

  const skillGroups = [
    {
      title: "Design & Brand",
      skills: ["Figma", "Adobe Creative Suite", "Canva", "CapCut Pro", "Brand Guidelines", "Typography", "Print Design", "Motion Graphics"],
    },
    {
      title: "Web & Development",
      skills: ["WordPress", "Webflow", "HTML/CSS", "JavaScript", "TypeScript", "Python", "PHP", "SQL", "REST APIs", "Responsive Design", "Accessible Design"],
    },
    {
      title: "Cloud & Developer Tools",
      skills: ["Azure", "Git", "GitHub", "Vercel", "Postman", "Ubuntu Linux", "macOS", "Figma Handoffs", "AI Workflow Tools"],
    },
    {
      title: "Web Management & Analytics",
      skills: ["Uptime Monitoring", "Site Speed", "On-page SEO", "GA4", "Scheduled Updates", "Hosting Support"],
    },
    {
      title: "IT Support & Infrastructure",
      skills: ["Jira", "Active Directory", "Microsoft 365", "ERP Systems", "LAN/WAN", "DNS", "DHCP", "Wi-Fi", "Security Patching", "Backup & Restore", "Training & Documentation"],
    },
    {
      title: "Languages",
      skills: ["English (Fluent)", "Kiswahili (Fluent)"],
    },
  ];

  const supplementaryServices = [
    { icon: BarChart3, title: "Website Management", desc: "I keep client sites updated and running. I track uptime, watch page speed, apply patches on schedule, and call hosting support when a site goes down." },
    { icon: Headphones, title: "IT Support & Helpdesk", desc: "Hardware problems, software errors, locked accounts, and AV setup for meetings and events. I log everything in Jira so there is a clear record." },
    { icon: Shield, title: "Network & Security", desc: "LAN and WAN issues, DNS, DHCP, Wi-Fi problems, security checks, patches, and backups that are actually tested." },
  ];

  const [activeBrand, setActiveBrand] = useState<"gmcode" | "gmdesign" | "gmmarketing">("gmdesign");

  const subBrands = [
    { id: "gmdesign" as const, label: "GMDesign", icon: Palette },
    { id: "gmmarketing" as const, label: "GM Marketing", icon: Video },
    { id: "gmcode" as const, label: "GMCode", icon: Code },
  ];

  const sortByOrder = <T extends { order?: number }>(items: T[]) =>
    [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const allProjects = useQuery(api.projects.list, {}) ?? [];
  const allProjectsSorted = sortByOrder(allProjects);
  const featuredCaseStudies = allProjectsSorted.slice(0, 3);
  const caseStudyOutcomes: Record<string, string> = {
    gmcode: "Built for measurable growth and smoother customer journeys.",
    gmdesign: "Crafted to strengthen brand recall across print and digital touchpoints.",
    gmmarketing: "Designed to increase engagement with short-form storytelling.",
  };

  const researchBackedRules = [
    "Clear positioning in the hero with who I help and the outcome I deliver.",
    "A curated set of deep project stories instead of a crowded gallery.",
    "Scannable case-study structure: challenge, approach, and outcome.",
    "Strong CTA repeated at key moments to reduce drop-off.",
  ];

  const processSteps = [
    { title: "1. Discover", desc: "Align on goals, audience, and constraints before any visual work starts." },
    { title: "2. Design", desc: "Shape concepts, systems, and prototypes with feedback loops and iteration." },
    { title: "3. Deliver", desc: "Build, test, and launch with performance, accessibility, and SEO basics in place." },
  ];

  const projectsByBrand: Record<string, typeof allProjects> = {
    gmcode: sortByOrder(allProjects.filter((p: { subBrand: string }) => p.subBrand === "gmcode")),
    gmdesign: sortByOrder(allProjects.filter((p: { subBrand: string }) => p.subBrand === "gmdesign")),
    gmmarketing: sortByOrder(allProjects.filter((p: { subBrand: string }) => p.subBrand === "gmmarketing")),
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-white dark:bg-[#0a0f1a] text-slate-900 dark:text-white min-h-screen transition-colors duration-300">
      {/* Header */}
      <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 dark:bg-[#0a0f1a]/90 backdrop-blur-sm border-b border-gray-100 dark:border-slate-800/50" : "bg-transparent"}`}>
        <div className="container flex justify-between items-center py-4">
          <span className="flex items-center gap-2.5">
            <img src="/brand1.png" alt="GMLink" className="h-10 w-auto" />
            <span className="text-lg font-bold tracking-tight font-display">GMLink</span>
            <span className="hidden sm:flex items-center gap-1 ml-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            </span>
          </span>

          <nav className="hidden md:flex gap-8 items-center">
            {["home", "about", "skills", "services", "pricing", "projects", "contact"].map((item) => (
              <button key={item} onClick={() => scrollToSection(item)} className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </nav>

          <div className="flex gap-2 items-center">
            {toggleTheme && (
              <button onClick={toggleTheme} className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 rounded-none transition">
                {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
              </button>
            )}
            <Button onClick={() => scrollToSection("contact")} className="hidden md:inline-flex bg-blue-600 hover:bg-blue-700 text-white rounded-none px-5 py-2 text-sm font-medium">
              Get in Touch
            </Button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-none transition">
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-[#0a0f1a] border-t border-gray-100 dark:border-slate-800">
            <nav className="flex flex-col p-4 gap-1">
              {["home", "about", "skills", "services", "pricing", "projects", "contact"].map((item) => (
                <button key={item} onClick={() => scrollToSection(item)} className="text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium rounded-none hover:bg-gray-50 dark:hover:bg-slate-800/50 transition">
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="pt-36 pb-20 md:pb-28">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            <div className="flex-1 max-w-3xl text-center md:text-left md:mx-0">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 dark:bg-slate-800/60 text-gray-500 dark:text-gray-400 rounded-none text-xs font-medium mb-8 border border-gray-200 dark:border-slate-700/50">
                Graphic & Web Designer
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl leading-[0.95] tracking-tight mb-6 text-slate-900 dark:text-slate-100">
                <span className="block font-script text-blue-600 dark:text-blue-400">Create.</span>
                <span className="block font-hand">Elevate.</span>
                <span className="block font-display font-bold">Convert.</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 mb-5 max-w-2xl leading-relaxed">
                Nairobi-based designer and developer for service businesses, startups, and growing brands. I handle strategy, visual identity, and launch-ready websites so the final result is consistent from first concept to production.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-8 font-medium">
                Available for freelance, contract, and full-time opportunities.
              </p>

              <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
                {toolkit.map((skill) => (
                  <span key={skill} className="text-xs px-3 py-1.5 bg-gray-50 dark:bg-slate-800/60 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-slate-700/50 font-medium">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-10 justify-center md:justify-start">
                {devToolkit.map((skill) => (
                  <span key={skill} className="text-xs px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50 font-medium">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 flex-wrap justify-center md:justify-start mb-8">
                <Button onClick={() => scrollToSection("projects")} className="bg-blue-600 hover:bg-blue-700 text-white gap-2 px-6 py-3 rounded-none font-medium shadow-sm">
                  View case studies <ArrowRight size={16} />
                </Button>
                <Button onClick={() => scrollToSection("contact")} variant="outline" className="px-6 py-3 rounded-none font-medium border-2">
                  Book a discovery call
                </Button>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-500 dark:text-gray-400 justify-center md:justify-start">
                <span>4+ years experience</span>
                <span>15+ design projects</span>
                <span>7+ live websites</span>
              </div>
            </div>

            <div className="shrink-0 photo-glow">
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border border-gray-200/50 dark:border-slate-700/50 shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-transparent to-purple-600/15 z-10 pointer-events-none" />
                <img
                  src="/mike.png"
                  alt="Mike Waitindi"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-6xl" />

      <section className="py-12 md:py-14">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-6">
            {researchBackedRules.map((rule) => (
              <div key={rule} className="flex items-start gap-3 bg-gray-50 dark:bg-slate-800/30 border border-gray-200 dark:border-slate-700/50 p-4">
                <CheckCircle2 size={18} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{rule}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-6xl" />

      {/* About */}
      <section id="about" className="py-24 md:py-32 bg-gray-50 dark:bg-[#0d1421]">
        <div className="container">
          <div className="max-w-2xl mb-20">
            <h2 className="font-hand text-4xl md:text-5xl font-normal mb-6">
              About me
            </h2>
            <div className="space-y-5 text-gray-600 dark:text-gray-400 leading-relaxed">
              <p>
                I've been working in IT and design for close to four years. My time is split between fixing things when they break, building websites and software, and designing the look and feel on top. I did an ICT internship at the Council of Legal Education and IT support work at IEBC during elections. Now I freelance for clients in healthcare, education, retail, legal, and tech.
              </p>
              <p>
                For design work I use Figma, Adobe Creative Suite, Canva, and CapCut Pro. For websites I use WordPress, Webflow, JavaScript, TypeScript, Python, PHP, and SQL. I try to keep branding consistent, make pages accessible, and check GA4 and basic SEO so sites actually get found. I run GMLink with three parts: <strong className="text-purple-600">GMDesign</strong> for brand and visual work, <strong className="text-amber-600">GM Marketing</strong> for campaigns and video, and <strong className="text-blue-600">GMCode</strong> for web development.
              </p>
              <p>
                <strong className="text-gray-800 dark:text-gray-200">Bachelor of Information Technology</strong>, South Eastern Kenya University (SEKU), Kitui. I speak English and Kiswahili fluently.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Years experience", value: "4+" },
              { label: "Design projects", value: "15+" },
              { label: "Live websites", value: "7+" },
              { label: "Tools & skills", value: "40+" },
            ].map((stat, i) => (
              <div key={i} className={`bg-white dark:bg-slate-800/60 rounded-none p-6 border transition-all duration-200 group hover:-translate-y-0.5 hover:shadow-md ${i === 0 ? 'border-blue-200 dark:border-blue-800/50 md:scale-[1.04] md:origin-left' : 'border-gray-200 dark:border-slate-700/50'}`}>
                <div className={`font-display font-bold mb-1 transition-colors ${i === 0 ? 'text-4xl text-blue-600' : 'text-3xl text-blue-600'}`}>{stat.value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-6xl" />

      {/* Skills */}
      <section id="skills" className="py-24 md:py-32">
        <div className="container">
          <div className="max-w-xl mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              Skills & tools
            </h2>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              Here is what I work with, from design tools through to IT support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillGroups.map((group) => (
              <div key={group.title} className="bg-white dark:bg-slate-800/40 rounded-none p-6 border border-gray-200 dark:border-slate-700/50">
                <h3 className="font-display font-bold text-base mb-4 text-gray-800 dark:text-gray-200">{group.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span key={skill} className="text-xs px-2.5 py-1 bg-gray-50 dark:bg-slate-800/60 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-slate-700/50">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-6xl" />

      {/* Services */}
      <section id="services" className="py-24 md:py-32">
        <div className="container">
          <div className="max-w-xl mb-16">
            <h2 className="font-beanie text-4xl md:text-5xl font-normal mb-6">
              What I do
            </h2>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              I design brands, build websites, and make marketing materials.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <div key={i} className="bg-white dark:bg-slate-800/40 rounded-none p-6 border border-gray-200 dark:border-slate-700/50 hover:-translate-y-1 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800/50 transition-all duration-200">
                  <div className="w-11 h-11 rounded-none bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-display font-bold text-base mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{service.desc}</p>
                </div>
              );
            })}
            {supplementaryServices.map((service, i) => {
              const Icon = service.icon;
              return (
                <div key={`supp-${i}`} className="bg-white dark:bg-slate-800/40 rounded-none p-6 border border-gray-200 dark:border-slate-700/50 hover:-translate-y-1 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800/50 transition-all duration-200">
                  <div className="w-11 h-11 rounded-none bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-display font-bold text-base mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{service.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-6xl" />

      <section className="py-24 md:py-28">
        <div className="container">
          <div className="max-w-xl mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 tracking-tight">How I run projects</h2>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              A simple process focused on outcomes, not just visuals.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {processSteps.map((step) => (
              <div key={step.title} className="bg-white dark:bg-slate-800/40 rounded-none p-6 border border-gray-200 dark:border-slate-700/50">
                <h3 className="font-display font-semibold mb-2 text-gray-800 dark:text-gray-100">{step.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-6xl" />

      {/* Pricing */}
      <section id="pricing" className="py-24 md:py-32 bg-gray-50 dark:bg-[#0d1421]">
        <div className="container">
          <div className="max-w-xl mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              Pricing
            </h2>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              Starting prices for common jobs. All amounts are in Kenya Shillings (KES).
            </p>
          </div>

          {[
            { service: "Brand & Graphic Design", starting: "KSh 20,000", range: "KSh 20,000 to 100,000", model: "Per project", icon: Palette },
            { service: "Web Design & WordPress", starting: "KSh 30,000", range: "KSh 30,000 to 150,000", model: "Per project", icon: Code },
            { service: "Motion & Social Video", starting: "KSh 15,000", range: "KSh 15,000 to 60,000", model: "Per project", icon: Video },
            { service: "UX/UI Design", starting: "KSh 25,000", range: "KSh 25,000 to 120,000", model: "Per project", icon: Layers },
            { service: "SEO & Web Analytics", starting: "KSh 10,000", range: "KSh 10,000 to 50,000", model: "Monthly retainer", icon: BarChart3 },
            { service: "Print & Event Materials", starting: "KSh 15,000", range: "KSh 15,000 to 80,000", model: "Per project", icon: Printer },
          ].map((row, i) => {
            const Icon = row.icon;
            return (
              <div key={i} className="bg-white dark:bg-slate-800/40 rounded-none border border-gray-200 dark:border-slate-700/50 p-5 mb-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md last:mb-0">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-none bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={18} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
                      <h3 className="font-display font-semibold text-gray-800 dark:text-gray-200">{row.service}</h3>
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 inline-block w-fit">{row.model}</span>
                    </div>
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">{row.starting}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{row.range}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <p className="text-xs text-gray-400 dark:text-gray-500 mt-4 text-center">
            Final price depends on the job. <a href="#contact" className="text-blue-600 dark:text-blue-400 hover:underline" onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }}>Contact me</a> for a quote.
          </p>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-6xl" />

      {/* Projects */}
      <section id="projects" className="py-24 md:py-32 bg-gray-50 dark:bg-[#0d1421]">
        <div className="container">
          <div className="max-w-xl mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              My work
            </h2>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              {activeBrand === "gmdesign"
                ? "Logos, packaging, social posts, print, and colour studies. Sorted by type."
                : "Design work, marketing videos, and live websites. Pick a category below."}
            </p>
          </div>

          {featuredCaseStudies.length > 0 && (
            <div className="mb-12">
              <h3 className="font-display text-lg font-semibold mb-4">Featured case-study highlights</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {featuredCaseStudies.map((project) => (
                  <div key={`feature-${project._id}`} className="bg-white dark:bg-slate-800/40 border border-gray-200 dark:border-slate-700/50 p-5">
                    <p className="text-[11px] uppercase tracking-wide text-blue-600 dark:text-blue-400 mb-1">Challenge</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-3">{project.description}</p>
                    <p className="text-[11px] uppercase tracking-wide text-blue-600 dark:text-blue-400 mb-1">Approach</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
                      Combined brand direction, UX thinking, and practical implementation decisions.
                    </p>
                    <p className="text-[11px] uppercase tracking-wide text-blue-600 dark:text-blue-400 mb-1">Outcome</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                      {caseStudyOutcomes[project.subBrand] ?? "Delivered a polished final experience aligned to business goals."}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sub-brand tabs */}
          <div className="flex gap-2 mb-10 flex-wrap">
            {subBrands.map((brand) => {
              const Icon = brand.icon;
              return (
                <button
                  key={brand.id}
                  onClick={() => setActiveBrand(brand.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-none text-sm font-medium transition-all ${
                    activeBrand === brand.id
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-white dark:bg-slate-800/60 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-slate-700/50 hover:border-blue-300 dark:hover:border-blue-600"
                  }`}
                >
                  <Icon size={15} />
                  {brand.label}
                </button>
              );
            })}
          </div>

          {/* Projects grid */}
          {projectsByBrand[activeBrand].length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectsByBrand[activeBrand]!.map((project: { name: string; description: string; url: string; image: string; subBrand: string; techStack?: string[] }, i: number, arr: typeof projectsByBrand['gmcode']) => {
                const isMarketing = project.subBrand === "gmmarketing";
                const isDesign = project.subBrand === "gmdesign";
                const count = arr.length;
                const isLastAloneMd = count % 2 !== 0 && i === count - 1;
                const isLastAloneLg = count % 3 !== 0 && i === count - 1;
                const lastAloneCls = isLastAloneMd ? 'md:col-span-2 md:max-w-[50%] md:mx-auto' : '';
                const lastAloneClsLg = isLastAloneLg ? 'lg:col-span-3 lg:max-w-[33.333%] lg:mx-auto' : '';
                return (
                <div key={i} className={`bg-white dark:bg-slate-800/40 rounded-none border border-gray-200 dark:border-slate-700/50 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group ${lastAloneCls} ${lastAloneClsLg}`}>
                  <div className="aspect-[4/3] bg-gray-100 dark:bg-slate-800 overflow-hidden">
                    {isMarketing ? (
                      <video src={project.url} muted autoPlay loop playsInline className="w-full h-full object-cover" />
                    ) : !failedImages.has(i) && project.image ? (
                      <img src={project.image} alt={project.name} className={`w-full h-full ${isDesign ? 'object-contain bg-gray-50 dark:bg-slate-900 p-3' : 'object-cover group-hover:scale-[1.03]'} transition-transform duration-500`} onError={() => handleImageError(i)} />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${placeholderColors[i % placeholderColors.length]} text-white`}>
                        <span className="font-display text-3xl font-bold">{getProjectPlaceholder(project.name)}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4 lg:p-5">
                    {isDesign && project.techStack && project.techStack.length >= 2 && (
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        <span className="text-[10px] px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50 font-semibold uppercase tracking-wide">
                          {project.techStack[0]}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/50 font-medium">
                          {project.techStack[1]}
                        </span>
                      </div>
                    )}
                    <h3 className="font-display font-bold text-base lg:text-lg mb-1.5 leading-snug">{project.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 leading-relaxed line-clamp-2">{project.description}</p>
                    {project.subBrand === "gmcode" ? (
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium">
                        View project &rarr;
                      </a>
                    ) : (
                      <button onClick={() => setPreviewImage(isMarketing ? project.url : project.image)} className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium cursor-pointer">
                        View project &rarr;
                      </button>
                    )}
                  </div>
                </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-white dark:bg-slate-800/40 rounded-none border border-gray-200 dark:border-slate-700/50">
              <div className="text-4xl mb-4 text-gray-300 dark:text-gray-600">&lowast;</div>
              <h3 className="font-display text-xl font-bold mb-1 text-gray-500 dark:text-gray-400">Coming soon</h3>
              <p className="text-sm text-gray-400 dark:text-gray-500">Nothing here yet. I'm adding more work to this section.</p>
            </div>
          )}

          <Dialog open={!!previewImage} onOpenChange={(open) => { if (!open) setPreviewImage(null); }}>
            <DialogContent className="max-w-4xl w-[90vw] bg-black dark:bg-black border border-gray-200 dark:border-slate-700/50 rounded-none p-0 overflow-hidden flex items-center justify-center">
              <DialogTitle className="sr-only">Project preview</DialogTitle>
              {previewImage && (
                previewImage.endsWith(".mp4") ? (
                  <video src={previewImage} controls autoPlay className="w-full h-auto max-h-[85vh]" />
                ) : (
                  <img src={previewImage} alt="Project preview" className="w-full h-auto max-h-[85vh] object-contain" />
                )
              )}
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-6xl" />

      {/* Contact */}
      <section id="contact" className="py-24 md:py-32 bg-gray-50 dark:bg-[#0d1421]">
        <div className="container">
          <div className="max-w-xl mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              Get in touch
            </h2>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              Got a project? Send me a message.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {/* Contact info */}
            <div>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-none bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                    <Mail size={16} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider font-medium">Email</div>
                    <a href="mailto:wrootmike@gmail.com" className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
                      wrootmike@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-none bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                    <Phone size={16} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider font-medium">Phone</div>
                    <a href="tel:+254792618156" className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
                      +254 792 618 156
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-none bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                    <MapPin size={16} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider font-medium">Location</div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Nairobi, Kenya &middot; Remote</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-gray-200 dark:border-slate-700/50">
                <div className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider font-medium mb-3">Social</div>
                <div className="flex gap-3">
                  <a href="mailto:wrootmike@gmail.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-none bg-gray-100 dark:bg-slate-700 flex items-center justify-center hover:bg-[#EA4335] transition">
                    <img src="https://cdn.simpleicons.org/gmail/EA4335" alt="Email" className="w-5 h-5" />
                  </a>
                  <a href="https://wa.me/254792618156" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-none bg-gray-100 dark:bg-slate-700 flex items-center justify-center hover:bg-[#25D366] transition">
                    <img src="https://cdn.simpleicons.org/whatsapp/25D366" alt="WhatsApp" className="w-5 h-5" />
                  </a>
                  <a href="https://www.instagram.com/myk.ih_1/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-none bg-gray-100 dark:bg-slate-700 flex items-center justify-center hover:bg-gradient-to-tr hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#FCAF45] transition">
                    <img src="https://cdn.simpleicons.org/instagram/E4405F" alt="Instagram" className="w-5 h-5" />
                  </a>
                  <a href="https://linkedin.com/in/mike-waitindi-654bb2344" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-none bg-[#0A66C2] flex items-center justify-center hover:bg-[#084e96] transition" aria-label="LinkedIn">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                  <a href="https://github.com/garymike07" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-none bg-gray-100 dark:bg-slate-700 flex items-center justify-center hover:bg-[#181717] transition">
                    <img src="https://cdn.simpleicons.org/github/181717" alt="GitHub" className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Tabbed forms */}
            <div>
              <div className="bg-white dark:bg-slate-800/40 rounded-none border border-gray-200 dark:border-slate-700/50 overflow-hidden">
                <div className="flex border-b border-gray-200 dark:border-slate-700/50">
                  <button onClick={() => setFormTab("service")} className={`flex-1 py-3.5 px-4 text-sm font-medium transition ${formTab === "service" ? "bg-blue-600 text-white" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-700/30"}`}>
                    Request a service
                  </button>
                  <button onClick={() => setFormTab("feedback")} className={`flex-1 py-3.5 px-4 text-sm font-medium transition ${formTab === "feedback" ? "bg-blue-600 text-white" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-700/30"}`}>
                    Leave a review
                  </button>
                </div>
                <div className="p-1">
                  {formTab === "service" ? <ServiceRequestForm /> : <FeedbackForm />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 dark:border-slate-800/50">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3 text-sm text-gray-400 dark:text-gray-500">
              <div className="flex items-center gap-2">
                <img src="/brand1.png" alt="GMLink" className="h-9 w-auto" />
                <span className="flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-blue-500" />
                  <span className="w-1 h-1 rounded-full bg-purple-500" />
                  <span className="w-1 h-1 rounded-full bg-amber-500" />
                </span>
              </div>
              &copy; 2026 GMLink. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm text-gray-400 dark:text-gray-500">
              <a href="mailto:wrootmike@gmail.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Email</a>
              <a href="https://wa.me/254792618156" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 dark:hover:text-green-400 transition">WhatsApp</a>
              <a href="https://www.instagram.com/myk.ih_1/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 dark:hover:text-pink-400 transition">Instagram</a>
              <a href="https://linkedin.com/in/mike-waitindi-654bb2344" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition">LinkedIn</a>
              <a href="https://github.com/garymike07" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
