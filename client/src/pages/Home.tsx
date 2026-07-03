import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Code, Palette, Zap, Printer, Layers, Smartphone, Mail, Phone, MapPin, ArrowRight, Menu, X, Moon, Sun } from "lucide-react";
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

              <h1 className="font-script text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.2] tracking-normal text-blue-600 mb-8">
                Code meets
                <br />
                canvas
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

      {/* About */}
      <section id="about" className="py-24 md:py-32 bg-gray-50 dark:bg-[#0d1421]">
        <div className="container">
          <div className="max-w-2xl mb-20">
            <h2 className="font-hand text-4xl md:text-5xl font-normal mb-6">
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
              <div key={i} className={`bg-white dark:bg-slate-800/60 rounded-none p-6 border transition-all duration-200 group hover:-translate-y-0.5 hover:shadow-md ${i === 0 ? 'border-blue-200 dark:border-blue-800/50 md:scale-[1.04] md:origin-left' : 'border-gray-200 dark:border-slate-700/50'}`}>
                <div className={`font-display font-bold mb-1 transition-colors ${i === 0 ? 'text-4xl text-blue-600' : 'text-3xl text-blue-600'}`}>{stat.value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
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
              From concept to deployment — I cover the full spectrum of building digital products.
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
              Transparent rates for every service. All prices in Kenya Shillings (KES).
            </p>
          </div>

          {[
            { service: "Software Development", starting: "KSh 60,000", range: "KSh 60,000 – 250,000", model: "Per project", icon: Code },
            { service: "UX/UI & Graphic Design", starting: "KSh 20,000", range: "KSh 20,000 – 100,000", model: "Per project", icon: Palette },
            { service: "IT Support & Helpdesk", starting: "KSh 15,000", range: "KSh 15,000 – 50,000", model: "Monthly retainer", icon: Zap },
            { service: "System Integration", starting: "KSh 80,000", range: "KSh 80,000 – 300,000", model: "Per project", icon: Layers },
            { service: "Network & Security", starting: "KSh 50,000", range: "KSh 50,000 – 200,000", model: "Per project", icon: Smartphone },
            { service: "Training & Documentation", starting: "KSh 25,000", range: "KSh 25,000 – 80,000", model: "Per session", icon: Printer },
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
                      <span className="text-xs text-gray-400 dark:text-gray-500">—</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{row.range}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <p className="text-xs text-gray-400 dark:text-gray-500 mt-4 text-center">
            Prices are indicative and may vary based on scope. <a href="#contact" className="text-blue-600 dark:text-blue-400 hover:underline" onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }}>Get in touch</a> for a custom quote.
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectsByBrand[activeBrand]!.map((project: { name: string; description: string; url: string; image: string; subBrand: string }, i: number, arr: typeof projectsByBrand['gmcode']) => {
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
                      <img src={project.image} alt={project.name} className={`w-full h-full ${isDesign ? 'object-contain bg-white dark:bg-slate-900 p-2' : 'object-cover group-hover:scale-[1.03]'} transition-transform duration-500`} onError={() => handleImageError(i)} />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${placeholderColors[i % placeholderColors.length]} text-white`}>
                        <span className="font-display text-3xl font-bold">{getProjectPlaceholder(project.name)}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4 lg:p-5">
                    <h3 className="font-display font-bold text-base lg:text-lg mb-1.5">{project.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 leading-relaxed line-clamp-3 lg:line-clamp-2">{project.description}</p>
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

      <div className="section-divider mx-auto max-w-6xl" />

      <div className="section-divider mx-auto max-w-6xl" />

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
                  <a href="mailto:wrootmike@gmail.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-none bg-gray-100 dark:bg-slate-800 flex items-center justify-center hover:bg-blue-600 dark:hover:bg-blue-600 transition group">
                    <img src="https://cdn.simpleicons.org/gmail/64748b" alt="Email" className="w-4 h-4 group-hover:opacity-0 transition-opacity" />
                    <img src="https://cdn.simpleicons.org/gmail/ffffff" alt="" className="w-4 h-4 absolute opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <a href="https://wa.me/254792618156" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-none bg-gray-100 dark:bg-slate-800 flex items-center justify-center hover:bg-green-600 dark:hover:bg-green-600 transition group">
                    <img src="https://cdn.simpleicons.org/whatsapp/64748b" alt="WhatsApp" className="w-4 h-4 group-hover:opacity-0 transition-opacity" />
                    <img src="https://cdn.simpleicons.org/whatsapp/ffffff" alt="" className="w-4 h-4 absolute opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <a href="https://www.instagram.com/myk.ih_1/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-none bg-gray-100 dark:bg-slate-800 flex items-center justify-center hover:bg-gradient-to-tr hover:from-purple-600 hover:via-pink-500 hover:to-orange-400 dark:hover:from-purple-600 dark:hover:via-pink-500 dark:hover:to-orange-400 transition group">
                    <img src="https://cdn.simpleicons.org/instagram/64748b" alt="Instagram" className="w-4 h-4 group-hover:opacity-0 transition-opacity" />
                    <img src="https://cdn.simpleicons.org/instagram/ffffff" alt="" className="w-4 h-4 absolute opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <a href="https://linkedin.com/in/mike-waitindi-654bb2344" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-none bg-gray-100 dark:bg-slate-800 flex items-center justify-center hover:bg-blue-600 dark:hover:bg-blue-600 transition group">
                    <img src="https://cdn.simpleicons.org/linkedin/64748b" alt="LinkedIn" className="w-4 h-4 group-hover:opacity-0 transition-opacity" />
                    <img src="https://cdn.simpleicons.org/linkedin/ffffff" alt="" className="w-4 h-4 absolute opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <a href="https://github.com/garymike07" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-none bg-gray-100 dark:bg-slate-800 flex items-center justify-center hover:bg-gray-900 dark:hover:bg-gray-900 transition group">
                    <img src="https://cdn.simpleicons.org/github/64748b" alt="GitHub" className="w-4 h-4 group-hover:opacity-0 transition-opacity" />
                    <img src="https://cdn.simpleicons.org/github/ffffff" alt="" className="w-4 h-4 absolute opacity-0 group-hover:opacity-100 transition-opacity" />
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
