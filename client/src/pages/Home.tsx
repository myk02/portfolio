import { useState, useEffect, useCallback, useMemo } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import BrandEdgeHeader from "@/components/BrandEdgeHeader";
import BrandEdgeHero from "@/components/BrandEdgeHero";
import BrandEdgeWork from "@/components/BrandEdgeWork";
import BrandEdgeAbout from "@/components/BrandEdgeAbout";
import BrandEdgeContact from "@/components/BrandEdgeContact";
import BrandEdgeFooter from "@/components/BrandEdgeFooter";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import JsonViewer from "@/components/JsonViewer";

export default function Home() {
  const seed = useMutation(api.seed.seed);
  const seedAutomation = useMutation(api.seed.seedAutomation);
  const allProjects = useQuery(api.projects.list, {}) ?? [];
  const allTestimonials = useQuery(api.testimonials.listApproved) ?? [];
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [jsonWorkflowPath, setJsonWorkflowPath] = useState<string | null>(null);

  useEffect(() => {
    if (allProjects.length === 0 && allTestimonials.length === 0) {
      seed();
    }
    const hasAutomation = allProjects.some((p) => p.subBrand === "gmautomation");
    if (allProjects.length > 0 && !hasAutomation) {
      seedAutomation();
    }
  }, [seed, seedAutomation, allProjects.length, allTestimonials.length, allProjects]);

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
          onViewJson={(path) => setJsonWorkflowPath(path)}
        />

        <BrandEdgeAbout />

          {allTestimonials.length > 0 && (
          <section id="reviews" className="section-pad bg-secondary border-t border-border overflow-hidden">
            <div className="container mb-4">
              <div className="section-label">
                <span className="section-label-line" />
                Client Feedback
              </div>
              <h2 className="heading-serif font-bold text-foreground" style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)" }}>
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
                      className="flex-shrink-0 w-[120px] lg:w-[150px] border border-border p-1.5"
                    >
                      <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
                        &ldquo;{t.text}&rdquo;
                      </p>
                      <div className="flex items-center gap-1 mt-1.5">
                        <div className="w-4 h-4 bg-primary text-secondary flex items-center justify-center font-mono text-[8px] font-bold shrink-0">
                          {t.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-mono text-[9px] tracking-[0.1em] uppercase text-foreground truncate">
                            {t.name}
                          </p>
                          {t.role && (
                            <p className="font-mono text-[8px] tracking-[0.1em] uppercase text-muted-foreground truncate">
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

      <Dialog open={!!jsonWorkflowPath} onOpenChange={(open) => { if (!open) setJsonWorkflowPath(null); }}>
        <DialogContent className="max-w-4xl w-[95vw] bg-primary border-0 max-h-[90vh] overflow-hidden flex flex-col">
          <DialogTitle className="font-mono text-xs tracking-wider uppercase text-accent">Workflow JSON</DialogTitle>
          {jsonWorkflowPath && <JsonViewer path={jsonWorkflowPath} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
