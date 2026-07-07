import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  aboutParagraphs,
  aboutStats,
  contactItems,
  devToolkit,
  footerLinks,
  heroStats,
  NAV_ITEMS,
  pricingRows,
  processSteps,
  services,
  skillGroups,
  socialLinks,
  subBrands,
  supplementaryServices,
  toolkit,
} from "@/data/siteContent";
import { ArrowRight, Mail, MapPin, Menu, Moon, Phone, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import FeedbackForm from "@/components/FeedbackForm";
import ServiceRequestForm from "@/components/ServiceRequestForm";

function SectionHeader({ 
  label, 
  title,
  labelClassName = "section-kicker text-gray-500 dark:text-gray-400",
  headingClassName = "section-heading"
}: { 
  label: string; 
  title: string;
  labelClassName?: string;
  headingClassName?: string;
}) {
  return (
    <div className="section-intro mb-5 sm:mb-6">
      <p className={labelClassName}>{label}</p>
      <h2 className={headingClassName}>{title}</h2>
    </div>
  );
}

function TagList({ items, variant = "neutral" }: { items: string[]; variant?: "neutral" | "accent" }) {
  const classes =
    variant === "accent"
      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/50"
      : "bg-white/80 dark:bg-slate-800/70 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-slate-700/50";

  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <span key={item} className={`text-[11px] sm:text-xs px-2 py-1 border font-medium ${classes}`}>
          {item}
        </span>
      ))}
    </div>
  );
}

function ProjectThumbnail({
  project,
  failed,
  onError,
  placeholderIndex,
}: {
  project: { name: string; url: string; image: string; subBrand: string };
  failed: boolean;
  onError: () => void;
  placeholderIndex: number;
}) {
  const isMarketing = project.subBrand === "gmmarketing";
  const isDesign = project.subBrand === "gmdesign";

  if (isMarketing) {
    return (
      <div className="project-thumb">
        <video
          src={project.url}
          muted
          autoPlay
          loop
          playsInline
          preload="metadata"
          className="project-thumb-media"
        />
      </div>
    );
  }

  if (!failed && project.image) {
    return (
      <div className="project-thumb">
        <img
          src={project.image}
          alt={project.name}
          className={`project-thumb-media ${isDesign ? "is-design" : "is-code"}`}
          onError={onError}
          loading="lazy"
          decoding="async"
        />
      </div>
    );
  }

  const placeholderColors = [
    "from-blue-400 to-blue-600",
    "from-purple-400 to-purple-600",
    "from-emerald-400 to-emerald-600",
    "from-rose-400 to-rose-600",
    "from-amber-400 to-amber-600",
    "from-cyan-400 to-cyan-600",
  ];

  return (
    <div className={`project-thumb flex items-center justify-center bg-gradient-to-br ${placeholderColors[placeholderIndex % placeholderColors.length]} text-white`}>
      <span className="font-display text-xl font-bold">
        {project.name
          .split(/[\s-]+/)
          .slice(0, 2)
          .map((w) => w[0])
          .join("")
          .toUpperCase() || project.name.slice(0, 2).toUpperCase()}
      </span>
    </div>
  );
}

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [formTab, setFormTab] = useState<"service" | "feedback">("service");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [activeBrand, setActiveBrand] = useState<"gmcode" | "gmdesign" | "gmmarketing">("gmdesign");
  const seed = useMutation(api.seed.seed);

  useEffect(() => { seed(); }, [seed]);

  const sortByOrder = <T extends { order?: number }>(items: T[]) =>
    [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const allProjects = useQuery(api.projects.list, {}) ?? [];
  const testimonials = useQuery(api.testimonials.listApproved) ?? [];
  const projectsByBrand = {
    gmcode: sortByOrder(allProjects.filter((p) => p.subBrand === "gmcode")),
    gmdesign: sortByOrder(allProjects.filter((p) => p.subBrand === "gmdesign")),
    gmmarketing: sortByOrder(allProjects.filter((p) => p.subBrand === "gmmarketing")),
  };

  const getProjectKey = (project: { _id?: string; name: string; image: string; url: string }) =>
    project._id ?? `${project.name}-${project.image || project.url}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal-on-scroll"));
    if (elements.length === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => {
        element.style.removeProperty("--reveal-delay");
        element.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    elements.forEach((element, index) => {
      const staggerIndex = Number(element.dataset.revealIndex ?? `${index % 6}`);
      element.style.setProperty("--reveal-delay", `${Math.min(staggerIndex, 5) * 60}ms`);
      element.classList.remove("is-visible");
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
      elements.forEach((element) => element.style.removeProperty("--reveal-delay"));
    };
  }, [allProjects.length, testimonials.length, activeBrand, formTab]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const navItems = NAV_ITEMS.filter((item) => item.id !== "reviews" || testimonials.length > 0);

  return (
    <div className="site-minimal text-slate-900 dark:text-white min-h-screen">
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="container header-inner">
          <button type="button" onClick={() => scrollToSection("home")} className="brand-lockup">
            <img src="/brand1.png" alt="GMLink" className="h-7 sm:h-8 w-auto" />
            <span className="font-display font-semibold text-sm sm:text-base">GMLink</span>
          </button>

          <nav className="hidden xl:flex items-center gap-4">
            {navItems.map((item) => (
              <button key={item.id} type="button" onClick={() => scrollToSection(item.id)} className="nav-link">
                {item.label}
              </button>
            ))}
          </nav>

          <div className="header-actions">
            {toggleTheme && (
              <button type="button" onClick={toggleTheme} className="icon-btn" aria-label="Toggle theme">
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            )}
            <Button type="button" onClick={() => scrollToSection("contact")} className="hidden md:inline-flex btn-gradient rounded-none px-3 py-1.5 text-xs sm:text-sm">
              Contact
            </Button>
            <button type="button" onClick={() => setIsMenuOpen(!isMenuOpen)} className="icon-btn xl:hidden" aria-label="Menu">
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="mobile-nav xl:hidden">
            {navItems.map((item) => (
              <button key={item.id} type="button" onClick={() => scrollToSection(item.id)} className="mobile-nav-link">
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      <main>
        <section id="home" className="section-pad-tight pt-24 sm:pt-28">
          <div className="container">
            <div className="hero-grid">
              <div className="hero-copy reveal-on-scroll" data-reveal-index="0">
                <p className="eyebrow">Web Developer · Nairobi</p>
                <h1 className="hero-title">
                  <span className="font-script text-blue-600 dark:text-blue-400">Create.</span>
                  <span className="font-hand">Elevate.</span>
                  <span className="font-display font-bold">Convert.</span>
                </h1>
                <p className="lead type-subtitle-serif">
                  Web developer for service businesses, startups, and growing brands. I handle brand direction, user-focused interfaces, and launch-ready web experiences from frontend to backend.
                </p>
                <p className="sublead type-subtitle-hand">Available for freelance, contract, and full-time opportunities.</p>

                <div className="stack gap-3">
                  <TagList items={toolkit} />
                  <TagList items={devToolkit} variant="accent" />
                </div>

                <div className="hero-actions">
                  <Button type="button" onClick={() => scrollToSection("work")} className="btn-gradient rounded-none">
                    View work <ArrowRight size={15} />
                  </Button>
                  <Button type="button" onClick={() => scrollToSection("contact")} variant="outline" className="rounded-none border">
                    Get in touch
                  </Button>
                </div>

                <div className="hero-stats">
                  {heroStats.map((s) => (
                    <span key={s.label}>{s.value} {s.label.toLowerCase()}</span>
                  ))}
                </div>
              </div>

              <div className="hero-photo reveal-on-scroll" data-reveal-index="1">
                <img src="/mike.png" alt="Mike Waitindi" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section-pad-tight section-muted">
          <div className="container">
            <SectionHeader 
              label="About" 
              title="Mike Waitindi"
              labelClassName="section-kicker-about"
              headingClassName="section-heading-about"
            />
            <div className="about-grid">
              <div className="stack gap-3 text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed reveal-on-scroll">
                {aboutParagraphs.map((p) => (
                  <p key={p.slice(0, 24)} className="type-subtitle-display">{p}</p>
                ))}
              </div>
              <div className="stat-grid reveal-on-scroll">
                {aboutStats.map((stat) => (
                  <div key={stat.label} className="minimal-card p-3 sm:p-4">
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section-pad-tight">
          <div className="container">
            <SectionHeader 
              label="Skills" 
              title="Tools & capabilities"
              labelClassName="section-kicker-skills"
              headingClassName="section-heading-skills"
            />
            <div className="skills-grid">
              {skillGroups.map((group) => (
                <div key={group.title} className="minimal-card p-4 reveal-on-scroll">
                  <h3 className="text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200 section-title-display">{group.title}</h3>
                  <TagList items={group.skills} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="section-pad-tight section-muted">
          <div className="container">
            <SectionHeader 
              label="Services" 
              title="What I do"
              labelClassName="section-kicker-services"
              headingClassName="section-heading-services"
            />
            <div className="services-grid">
              {[...services, ...supplementaryServices].map((service) => {
                const Icon = service.icon;
                return (
                  <article key={service.title} className="minimal-card p-4 reveal-on-scroll">
                    <div className="flex gap-3">
                      <div className="icon-chip shrink-0"><Icon size={16} /></div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold mb-1 section-title-display">{service.title}</h3>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed type-subtitle-hand">{service.desc}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="process-grid mt-6 sm:mt-8">
              {processSteps.map((step, i) => (
                <div key={step.title} className="minimal-card p-4 reveal-on-scroll">
                  <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">Step {i + 1}</p>
                  <h3 className="text-sm font-semibold mb-1 section-title-display">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 type-subtitle-display">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="section-pad-tight">
          <div className="container">
            <SectionHeader 
              label="Portfolio" 
              title="My work"
              labelClassName="section-kicker-portfolio"
              headingClassName="section-heading-portfolio"
            />

            <div className="tab-row mb-5">
              {subBrands.map((brand) => {
                const Icon = brand.icon;
                const count = projectsByBrand[brand.id].length;
                return (
                  <button
                    key={brand.id}
                    type="button"
                    onClick={() => setActiveBrand(brand.id)}
                    className={`tab-btn ${activeBrand === brand.id ? "is-active" : ""}`}
                  >
                    <Icon size={13} />
                    {brand.label}
                    <span className="tab-count">{count}</span>
                  </button>
                );
              })}
            </div>

            {projectsByBrand[activeBrand].length > 0 ? (
              <div className="projects-grid">
                {projectsByBrand[activeBrand].map((project, i) => {
                  const isDesign = project.subBrand === "gmdesign";
                  const isMarketing = project.subBrand === "gmmarketing";
                  const projectKey = getProjectKey(project);
                  return (
                    <article key={projectKey} className="minimal-card overflow-hidden reveal-on-scroll">
                    <ProjectThumbnail
                      project={project}
                      failed={failedImages.has(projectKey)}
                      onError={() => setFailedImages((prev) => new Set(prev).add(projectKey))}
                      placeholderIndex={i}
                    />
                    <div className="p-2.5 sm:p-3">
                      {isDesign && project.techStack && project.techStack.length >= 2 && (
                        <div className="flex flex-wrap gap-0.5 mb-1.5">
                          <span className="text-[9px] px-1 py-0.25 border border-blue-200 dark:border-blue-800/50 text-blue-700 dark:text-blue-300">{project.techStack[0]}</span>
                          <span className="text-[9px] px-1 py-0.25 border border-purple-200 dark:border-purple-800/50 text-purple-700 dark:text-purple-300">{project.techStack[1]}</span>
                        </div>
                      )}
                      <h3 className="text-xs sm:text-sm font-semibold mb-0.5 section-title-display">{project.name}</h3>
                      <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mb-1.5 type-subtitle-display">{project.description}</p>
                      {project.subBrand === "gmcode" ? (
                        <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-[10px] sm:text-xs text-blue-600 dark:text-blue-400 font-medium">
                          View project →
                        </a>
                      ) : (
                        <button type="button" onClick={() => setPreviewImage(isMarketing ? project.url : project.image)} className="text-[10px] sm:text-xs text-blue-600 dark:text-blue-400 font-medium">
                          View project →
                        </button>
                      )}
                    </div>
                  </article>
                  );
                })}
              </div>
            ) : (
              <p className="minimal-card p-6 text-center text-sm text-gray-500">Nothing here yet.</p>
            )}

            <Dialog open={!!previewImage} onOpenChange={(open) => { if (!open) setPreviewImage(null); }}>
              <DialogContent className="max-w-4xl w-[95vw] bg-black border-0 rounded-none p-0">
                <DialogTitle className="sr-only">Project preview</DialogTitle>
                {previewImage &&
                  (previewImage.endsWith(".mp4") ? (
                    <video src={previewImage} controls autoPlay className="w-full max-h-[85vh]" />
                  ) : (
                    <img src={previewImage} alt="Project preview" className="w-full max-h-[85vh] object-contain" />
                  ))}
              </DialogContent>
            </Dialog>
          </div>
        </section>

        <section id="pricing" className="section-pad-tight section-muted">
          <div className="container">
            <SectionHeader 
              label="Pricing" 
              title="Starting prices (KES)"
              labelClassName="section-kicker-pricing"
              headingClassName="section-heading-pricing"
            />
            <div className="pricing-list">
              {pricingRows.map((row) => {
                const Icon = row.icon;
                return (
                  <div key={row.service} className="minimal-card pricing-row reveal-on-scroll">
                    <div className="icon-chip shrink-0"><Icon size={15} /></div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <h3 className="text-sm font-semibold section-title-display">{row.service}</h3>
                        <span className="text-[10px] px-1.5 py-0.5 border border-gray-200 dark:border-slate-700 text-gray-500">{row.model}</span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 type-subtitle-display">{row.range}</p>
                    </div>
                    <p className="text-sm font-semibold shrink-0 section-title-display">{row.starting}</p>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-gray-400 mt-3 text-center sm:text-left">
              Final price depends on scope. <button type="button" onClick={() => scrollToSection("contact")} className="text-blue-600 dark:text-blue-400 underline">Contact me</button> for a quote.
            </p>
          </div>
        </section>

        {testimonials.length > 0 && (
          <section id="reviews" className="section-pad-tight overflow-x-clip">
            <div className="container mb-4">
              <SectionHeader 
                label="Reviews" 
                title={`Client feedback (${testimonials.length})`}
                labelClassName="section-kicker-reviews"
                headingClassName="section-heading-reviews"
              />
            </div>
            <div className="marquee-container">
              <div className="marquee-track">
                {[...testimonials, ...testimonials].map((t, i) => {
                  const avatarKey = `${t._id ?? t.name}-${i}`;
                  return (
                    <article key={avatarKey} className="minimal-card marquee-card reveal-on-scroll">
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 type-subtitle-display">&ldquo;{t.text}&rdquo;</p>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                          {t.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-medium truncate section-title-display">{t.name}</p>
                          <p className="text-[10px] text-gray-400 truncate type-subtitle-display">{t.role}</p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        <section id="contact" className="section-pad-tight section-muted">
          <div className="container">
            <SectionHeader 
              label="Contact" 
              title="Get in touch"
              labelClassName="section-kicker-contact"
              headingClassName="section-heading-contact"
            />
            <div className="contact-grid">
              <div className="stack gap-4">
                {contactItems.map((item) => (
                  <div key={item.label} className="flex items-start gap-3 reveal-on-scroll">
                    <div className="icon-chip shrink-0">
                      {item.label === "Email" && <Mail size={15} />}
                      {item.label === "Phone" && <Phone size={15} />}
                      {item.label === "Location" && <MapPin size={15} />}
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wide text-gray-400 mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-sm break-all hover:text-blue-600 dark:hover:text-blue-400">{item.value}</a>
                      ) : (
                        <p className="text-sm">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
                <div className="flex flex-wrap gap-2">
                  {socialLinks.map((s) => (
                    <a key={s.alt} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.alt} className={`social-chip ${s.className}`}>
                      {s.icon ? <img src={s.icon} alt="" className="w-4 h-4" /> : (
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                      )}
                    </a>
                  ))}
                </div>
              </div>

              <div className="minimal-card overflow-hidden reveal-on-scroll">
                <div className="flex border-b border-gray-200 dark:border-slate-700">
                  <button type="button" onClick={() => setFormTab("service")} className={`form-tab ${formTab === "service" ? "is-active" : ""}`}>Request service</button>
                  <button type="button" onClick={() => setFormTab("feedback")} className={`form-tab ${formTab === "feedback" ? "is-active" : ""}`}>Leave review</button>
                </div>
                {formTab === "service" ? <ServiceRequestForm /> : <FeedbackForm />}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <p>&copy; 2026 GMLink. All rights reserved.</p>
          <div className="footer-links">
            {footerLinks.map((link) => (
              <a key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
