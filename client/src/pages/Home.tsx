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
import { projectMeta } from "@/data/siteContent";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import JsonViewer from "@/components/JsonViewer";

export default function Home() {
  const seed = useMutation(api.seed.seed);
  const allProjects = useQuery(api.projects.list, {}) ?? [];
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [jsonWorkflowPath, setJsonWorkflowPath] = useState<string | null>(null);

  useEffect(() => {
    if (allProjects.length === 0) {
      seed();
    }
  }, [seed, allProjects.length]);

  const sortedProjects = useMemo(() => {
    const rank = (p: { name: string; order?: number }) =>
      projectMeta[p.name]?.live ? 0 : 1;
    return [...allProjects].sort(
      (a, b) =>
        rank(a) - rank(b) || (a.order ?? 99) - (b.order ?? 99),
    );
  }, [allProjects]);

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
