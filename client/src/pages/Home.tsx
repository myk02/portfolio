import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Code, Palette, Zap, Printer, Layers, Smartphone, Mail, Phone, MapPin, ArrowRight, Menu, X, Moon, Sun, Github, Linkedin } from "lucide-react";
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
  const [failedAvatars, setFailedAvatars] = useState<Set<number>>(new Set());
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
    { icon: Code, title: "Software Development", desc: "Full-stack web apps built with modern frameworks, TypeScript, Python, and cloud infrastructure. I also build and customize sites on WordPress and Webflow." },
    { icon: Palette, title: "UX/UI & Graphic Design", desc: "User-centered interfaces, brand identity, and visual design using Figma and the Adobe Suite." },
    { icon: Zap, title: "IT Support & Helpdesk", desc: "Technical support, hardware troubleshooting, and system maintenance across multiple platforms." },
    { icon: Layers, title: "System Integration", desc: "APIs, cloud solutions, Active Directory, and enterprise system integration." },
    { icon: Smartphone, title: "Network & Security", desc: "Network architecture, security audits, backup strategies, and infrastructure." },
    { icon: Printer, title: "Training & Documentation", desc: "IT training, practical guides, and documentation that empower teams to work independently." },
  ];

  const [activeBrand, setActiveBrand] = useState<"gmcode" | "gmdesign" | "gmmarketing">("gmcode");

  const subBrands = [
    { id: "gmcode" as const, label: "GMCode", icon: Code },
    { id: "gmdesign" as const, label: "GMDesign", icon: Palette },
    { id: "gmmarketing" as const, label: "GM Marketing", icon: Zap },
  ];

  const allProjects = useQuery(api.projects.list, {}) ?? [];
  const testimonials = useQuery(api.testimonials.listApproved) ?? [];

  const projectsByBrand: Record<string, typeof allProjects> = {
    gmcode: allProjects.filter((p: { subBrand: string }) => p.subBrand === "gmcode"),
    gmdesign: allProjects.filter((p: { subBrand: string }) => p.subBrand === "gmdesign"),
    gmmarketing: allProjects.filter((p: { subBrand: string }) => p.subBrand === "gmmarketing"),
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
          <span className="flex items-center gap-2">
            <img src="/brand1.png" alt="GMLink" className="h-10 w-auto bg-white dark:bg-slate-900 rounded-none p-0.5" />
            <span className="text-lg font-bold tracking-tight font-display">GMLink</span>
          </span>

          <nav className="hidden md:flex gap-8 items-center">
            {["home", "about", "services", "pricing", "projects", "contact"].map((item) => (
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
              {["home", "about", "services", "pricing", "projects", "contact"].map((item) => (
                <button key={item} onClick={() => scrollToSection(item)} className="text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium rounded-none hover:bg-gray-50 dark:hover:bg-slate-800/50 transition">
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="pt-36 pb-20 md:pb-32">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            <div className="flex-1 max-w-3xl text-center md:text-left md:mx-0">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 dark:bg-slate-800/60 text-gray-500 dark:text-gray-400 rounded-none text-xs font-medium mb-8 border border-gray-200 dark:border-slate-700/50">
                Design & Development Studio
              </div>

              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-8">
                Code meets
                <br />
                <span className="text-blue-600">canvas</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 mb-10 max-w-xl leading-relaxed">
                I'm a designer and developer based in Nairobi. I build digital products — from clean interfaces to solid backends — and I care about how things look just as much as how they work.
              </p>

              <div className="flex gap-4 flex-wrap justify-center md:justify-start">
                <Button onClick={() => scrollToSection("projects")} className="bg-blue-600 hover:bg-blue-700 text-white gap-2 px-6 py-3 rounded-none font-medium shadow-sm">
                  See my work <ArrowRight size={16} />
                </Button>
                <Button onClick={() => scrollToSection("contact")} variant="outline" className="px-6 py-3 rounded-none font-medium border-2">
                  Get in touch
                </Button>
              </div>
            </div>

            <div className="shrink-0">
              <img
                src="/mike.png"
                alt="Mike Waitindi"
                className="w-64 h-64 md:w-80 md:h-80 object-cover border border-gray-200 dark:border-slate-700/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 md:py-32 bg-gray-50 dark:bg-[#0d1421]">
        <div className="container">
          <div className="max-w-2xl mb-20">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              About me
            </h2>
            <div className="space-y-5 text-gray-600 dark:text-gray-400 leading-relaxed">
              <p>
                I've been working in IT for close to four years. Most of my time is split between building web applications and fixing things when they break — which means I understand how systems are put together from both sides.
              </p>
              <p>
                I also design. Interfaces, brand identities, user flows — I use Figma and the Adobe Suite to create work that's as functional as it is intentional. At <strong className="text-blue-600">GMLink</strong>, I operate through three sub-brands: <strong className="text-blue-600">GMCode</strong>, <strong className="text-purple-600">GMDesign</strong>, and <strong className="text-amber-600">GM Marketing</strong> — software, design, and growth under one roof.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Years in IT", value: "4+" },
              { label: "Live projects", value: "6+" },
              { label: "Users supported", value: "500+" },
              { label: "Sub-brands", value: "3" },
            ].map((stat, i) => (
              <div key={i} className="bg-white dark:bg-slate-800/60 rounded-none p-6 border border-gray-200 dark:border-slate-700/50">
                <div className="font-display text-3xl font-bold text-blue-600 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 md:py-32">
        <div className="container">
          <div className="max-w-xl mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              What I do
            </h2>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              From concept to deployment — I cover the full spectrum of building digital products.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <div key={i} className="bg-white dark:bg-slate-800/40 rounded-none p-6 border border-gray-200 dark:border-slate-700/50 hover:-translate-y-1 hover:shadow-md transition-all duration-200">
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

      {/* Pricing */}
      <section id="pricing" className="py-24 md:py-32 bg-gray-50 dark:bg-[#0d1421]">
        <div className="container">
          <div className="max-w-xl mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              Pricing
            </h2>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              Transparent rates for every service. All prices in Kenya Shillings (KES).
            </p>
          </div>

          <div className="overflow-hidden border border-gray-200 dark:border-slate-700/50">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-slate-800/60 border-b border-gray-200 dark:border-slate-700/50">
                  <th className="text-left px-5 py-3.5 font-semibold text-gray-700 dark:text-gray-300">Service</th>
                  <th className="text-left px-5 py-3.5 font-semibold text-gray-700 dark:text-gray-300">Starting from</th>
                  <th className="text-left px-5 py-3.5 font-semibold text-gray-700 dark:text-gray-300 hidden sm:table-cell">Typical range</th>
                  <th className="text-right px-5 py-3.5 font-semibold text-gray-700 dark:text-gray-300">Pricing model</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { service: "Software Development", starting: "KSh 60,000", range: "KSh 60,000 – 250,000", model: "Per project" },
                  { service: "UX/UI & Graphic Design", starting: "KSh 20,000", range: "KSh 20,000 – 100,000", model: "Per project" },
                  { service: "IT Support & Helpdesk", starting: "KSh 15,000", range: "KSh 15,000 – 50,000", model: "Monthly retainer" },
                  { service: "System Integration", starting: "KSh 80,000", range: "KSh 80,000 – 300,000", model: "Per project" },
                  { service: "Network & Security", starting: "KSh 50,000", range: "KSh 50,000 – 200,000", model: "Per project" },
                  { service: "Training & Documentation", starting: "KSh 25,000", range: "KSh 25,000 – 80,000", model: "Per session" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-gray-100 dark:border-slate-700/30 hover:bg-white dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-4 font-medium text-gray-800 dark:text-gray-200">{row.service}</td>
                    <td className="px-5 py-4 text-gray-600 dark:text-gray-400">{row.starting}</td>
                    <td className="px-5 py-4 text-gray-500 dark:text-gray-400 hidden sm:table-cell">{row.range}</td>
                    <td className="px-5 py-4 text-right text-gray-500 dark:text-gray-400">{row.model}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-gray-400 dark:text-gray-500 mt-4 text-center">
            Prices are indicative and may vary based on scope. <a href="#contact" className="text-blue-600 dark:text-blue-400 hover:underline" onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }}>Get in touch</a> for a custom quote.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 md:py-32 bg-gray-50 dark:bg-[#0d1421]">
        <div className="container">
          <div className="max-w-xl mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              My work
            </h2>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              Three sub-brands, one studio. Browse projects by category — software, design, or marketing.
            </p>
          </div>

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
            <div className="grid md:grid-cols-2 gap-6">
              {projectsByBrand[activeBrand]!.map((project: { name: string; description: string; url: string; image: string; subBrand: string }, i: number) => (
                <div key={i} className="bg-white dark:bg-slate-800/40 rounded-none border border-gray-200 dark:border-slate-700/50 overflow-hidden hover:shadow-md transition-all duration-200">
                  <div className="aspect-[16/10] bg-gray-100 dark:bg-slate-800 overflow-hidden">
                    {project.subBrand === "gmmarketing" ? (
                      <video src={project.url} muted autoPlay loop playsInline className="w-full h-full object-cover" />
                    ) : project.subBrand === "gmdesign" && !failedImages.has(i) && project.image ? (
                      <img src={project.image} alt={project.name} className="w-full h-full object-contain bg-white dark:bg-slate-900 p-2" onError={() => handleImageError(i)} />
                    ) : !failedImages.has(i) && project.image ? (
                      <img src={project.image} alt={project.name} className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-500" onError={() => handleImageError(i)} />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${placeholderColors[i % placeholderColors.length]} text-white`}>
                        <span className="font-display text-3xl font-bold">{getProjectPlaceholder(project.name)}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-bold text-lg mb-1.5">{project.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 leading-relaxed">{project.description}</p>
                    {project.subBrand === "gmcode" ? (
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium">
                        View project &rarr;
                      </a>
                    ) : (
                      <button onClick={() => setPreviewImage(project.subBrand === "gmmarketing" ? project.url : project.image)} className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium cursor-pointer">
                        View project &rarr;
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white dark:bg-slate-800/40 rounded-none border border-gray-200 dark:border-slate-700/50">
              <div className="text-4xl mb-4 text-gray-300 dark:text-gray-600">&lowast;</div>
              <h3 className="font-display text-xl font-bold mb-1 text-gray-500 dark:text-gray-400">Coming soon</h3>
              <p className="text-sm text-gray-400 dark:text-gray-500">Projects for this sub-brand are in the works.</p>
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

      {/* Testimonials */}
      <section id="testimonials" className="py-24 md:py-32 overflow-hidden">
        <div className="container mb-12">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              Client feedback
            </h2>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              Trust built through delivering results.
            </p>
          </div>
        </div>

        <div className="marquee-container">
          <div className="marquee-track">
            {[...testimonials, ...testimonials].map((testimonial: { name: string; role: string; text: string; avatar?: string }, i: number) => (
              <div key={i} className="min-w-[200px] max-w-[200px] p-4 bg-white dark:bg-slate-800/40 rounded-none border border-gray-200 dark:border-slate-700/50 shrink-0">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-2.5">
                  {!failedAvatars.has(i) && testimonial.avatar ? (
                    <img src={testimonial.avatar} alt={testimonial.name} className="w-7 h-7 rounded-full object-cover shrink-0" onError={() => setFailedAvatars(prev => new Set(prev).add(i))} />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0">{testimonial.name.charAt(0)}</div>
                  )}
                  <div className="min-w-0">
                    <div className="font-medium text-sm text-gray-900 dark:text-white truncate">{testimonial.name}</div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 truncate">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 md:py-32 bg-gray-50 dark:bg-[#0d1421]">
        <div className="container">
          <div className="max-w-xl mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              Get in touch
            </h2>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              Have a project in mind? I'd love to hear about it.
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
                  <a href="https://linkedin.com/in/mike-waitindi-654bb2344" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-none bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400 flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition">
                    <Linkedin size={16} />
                  </a>
                  <a href="https://github.com/garymike07" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-none bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400 flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition">
                    <Github size={16} />
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
              <img src="/brand1.png" alt="GMLink" className="h-10 w-auto bg-white dark:bg-slate-900 rounded-none p-0.5" />
              &copy; 2026 GMLink. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm text-gray-400 dark:text-gray-500">
              <a href="mailto:wrootmike@gmail.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Email</a>
              <a href="https://linkedin.com/in/mike-waitindi-654bb2344" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition">LinkedIn</a>
              <a href="https://github.com/garymike07" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
