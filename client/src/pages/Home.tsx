import { useState, useEffect, useCallback, useMemo } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import BrandEdgeHeader from "@/components/BrandEdgeHeader";
import BrandEdgeHero from "@/components/BrandEdgeHero";
import BrandEdgeWork from "@/components/BrandEdgeWork";
import UXProcessSection from "@/components/UXProcessSection";
import BrandEdgeAbout from "@/components/BrandEdgeAbout";
import BrandEdgeContact from "@/components/BrandEdgeContact";
import BrandEdgeFooter from "@/components/BrandEdgeFooter";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import JsonViewer from "@/components/JsonViewer";

const FEATURED_TESTIMONIALS = ["Nancy Akinyi", "Brian Omondi", "Gladys Jeruto"];

export default function Home() {
  const seed = useMutation(api.seed.seed);
  const allProjects = useQuery(api.projects.list, {}) ?? [];
  const allTestimonials = useQuery(api.testimonials.listApproved) ?? [];
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [jsonWorkflowPath, setJsonWorkflowPath] = useState<string | null>(null);

  useEffect(() => {
    if (allProjects.length === 0 && allTestimonials.length === 0) {
      seed();
    }
  }, [seed, allProjects.length, allTestimonials.length]);

  const featuredTestimonials = useMemo(
    () => allTestimonials.filter((t) => FEATURED_TESTIMONIALS.includes(t.name)),
    [allTestimonials],
  );

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

        <UXProcessSection />

        <BrandEdgeAbout />

        {featuredTestimonials.length > 0 && (
          <section id="reviews" className="section-pad bg-secondary border-t border-border">
            <div className="container">
              <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                  <h2 className="heading-serif font-bold text-foreground mb-2" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}>
                    Testimonials
                  </h2>
                  <p className="text-muted-foreground text-base">
                    What clients say about working with me.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
                  {featuredTestimonials.map((t) => (
                    <div
                      key={t._id ?? t.name}
                      className="border border-border p-6 flex flex-col"
                    >
                      <p className="text-muted-foreground leading-relaxed mb-4 flex-grow">
                        &ldquo;{t.text}&rdquo;
                      </p>
                      <div className="flex items-center gap-3 mt-auto">
                        <div className="w-10 h-10 bg-foreground text-background flex items-center justify-center font-medium text-sm shrink-0">
                          {t.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm">
                            {t.name}
                          </p>
                          {t.role && (
                            <p className="text-xs text-muted-foreground">
                              {t.role}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
          <DialogTitle className="font-medium text-sm text-accent">Workflow JSON</DialogTitle>
          {jsonWorkflowPath && <JsonViewer path={jsonWorkflowPath} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
