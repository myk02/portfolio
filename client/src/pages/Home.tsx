import { useState, useEffect, useCallback, useMemo } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import BrandEdgeHeader from "@/components/BrandEdgeHeader";
import BrandEdgeHero from "@/components/BrandEdgeHero";
import BrandEdgeWork from "@/components/BrandEdgeWork";
import BrandEdgeCapabilities from "@/components/BrandEdgeCapabilities";
import BrandEdgeProcess from "@/components/BrandEdgeProcess";
import BrandEdgeAbout from "@/components/BrandEdgeAbout";
import BrandEdgeContact from "@/components/BrandEdgeContact";
import BrandEdgeFooter from "@/components/BrandEdgeFooter";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { pricingRows } from "@/data/siteContent";

export default function Home() {
  const seed = useMutation(api.seed.seed);
  const allProjects = useQuery(api.projects.list, {}) ?? [];
  const allTestimonials = useQuery(api.testimonials.listApproved) ?? [];
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (allProjects.length === 0 && allTestimonials.length === 0) {
      seed();
    }
  }, [seed, allProjects.length, allTestimonials.length]);

  const sortedProjects = useMemo(
    () => [...allProjects].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    [allProjects],
  );

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-secondary">
      <div className="noise-overlay" />

      <BrandEdgeHeader onNavClick={scrollToSection} />

      <main>
        <BrandEdgeHero onCtaClick={scrollToSection} />

        <BrandEdgeWork
          projects={sortedProjects}
          onPreview={(url) => setPreviewUrl(url)}
        />

        <BrandEdgeCapabilities />

        <BrandEdgeProcess />

        <BrandEdgeAbout />

        {allTestimonials.length > 0 && (
          <section id="reviews" className="section-pad bg-secondary border-t border-border overflow-hidden">
            <div className="container mb-8">
              <div className="section-label">
                <span className="section-label-line" />
                Client Feedback
              </div>
              <h2 className="heading-serif font-bold text-foreground" style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}>
                What people say.
              </h2>
            </div>
            <div className="marquee-container">
              <div className="marquee-track">
                {[...allTestimonials, ...allTestimonials, ...allTestimonials].map((t, i) => {
                  const key = `${t._id ?? t.name}-${i}`;
                  return (
                    <div
                      key={key}
                      className="flex-shrink-0 w-[240px] lg:w-[280px] border-[1.5px] border-border p-4"
                    >
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        &ldquo;{t.text}&rdquo;
                      </p>
                      <div className="flex items-center gap-2 mt-4">
                        <div className="w-7 h-7 bg-primary text-secondary flex items-center justify-center font-mono text-[10px] font-bold">
                          {t.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-foreground">
                            {t.name}
                          </p>
                          {t.role && (
                            <p className="font-mono text-[10px] tracking-[0.1em] uppercase text-muted-foreground">
                              {t.role}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        <BrandEdgeContact />

        <section id="pricing" className="section-pad bg-secondary border-t border-border">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="section-label">
                <span className="section-label-line" />
                Investment
              </div>
              <h2 className="heading-serif font-bold text-foreground" style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}>
                Starting prices.
                <span className="italic font-light text-muted-foreground block text-sm"> Transparent from day one.</span>
              </h2>
              <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-muted-foreground mt-6 mb-8">
                Every project starts with a conversation. Prices below are starting points.
              </p>
              <div className="space-y-3">
                <div className="grid grid-cols-12 gap-3 font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground pb-2 border-b border-border">
                  <span className="col-span-5">Service</span>
                  <span className="col-span-3">Model</span>
                  <span className="col-span-4 text-right">Starting</span>
                </div>
                {pricingRows.map((row) => (
                  <div
                    key={row.service}
                    className="grid grid-cols-12 gap-3 py-3 border-b border-border items-center hover:bg-primary/5 transition-colors"
                  >
                    <span className="col-span-5 font-display font-bold text-[13px] text-foreground">
                      {row.service}
                    </span>
                    <span className="col-span-3 font-mono text-[11px] tracking-[0.1em] uppercase text-muted-foreground">
                      {row.model}
                    </span>
                    <span className="col-span-4 font-display font-bold text-[13px] text-foreground text-right">
                      {row.starting}
                    </span>
                  </div>
                ))}
              </div>
              <p className="font-mono text-[11px] tracking-[0.1em] text-muted-foreground mt-6 text-center">
                Final price depends on scope.{' '}
                <button
                  type="button"
                  onClick={() => scrollToSection("contact")}
                  className="underline hover:text-foreground transition-colors"
                >
                  Contact me
                </button>{' '}
                for a quote.
              </p>
            </div>
          </div>
        </section>
      </main>

      <BrandEdgeFooter onNavClick={scrollToSection} />

      <Dialog open={!!previewUrl} onOpenChange={(open) => { if (!open) setPreviewUrl(null); }}>
        <DialogContent className="max-w-4xl w-[95vw] bg-primary border-0 p-0">
          <DialogTitle className="sr-only">Project preview</DialogTitle>
          {previewUrl &&
            (previewUrl.endsWith(".mp4") ? (
              <video src={previewUrl} controls autoPlay className="w-full max-h-[85vh]" />
            ) : (
              <img src={previewUrl} alt="Project preview" className="w-full max-h-[85vh] object-contain" />
            ))}
        </DialogContent>
      </Dialog>
    </div>
  );
}
