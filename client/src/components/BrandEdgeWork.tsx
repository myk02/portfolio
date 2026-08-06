import { motion, AnimatePresence } from "framer-motion";
import { projectMeta } from "@/data/siteContent";

interface Project {
  _id?: string;
  name: string;
  description?: string;
  image: string;
  url: string;
  subBrand: string;
  techStack?: string[];
  year?: string;
  workflowJson?: string;
}

interface BrandEdgeWorkProps {
  projects: Project[];
  onPreview: (url: string) => void;
  onViewJson?: (workflowJson: string) => void;
}

const brandLabels: Record<string, string> = {
  gmcode: "Development",
  gmmarketing: "Marketing",
  gmautomation: "Automation",
  gmdesign: "Product Design",
  gmux: "UX Research & Design",
};

function ProjectCard({ project, onPreview, onViewJson }: { project: Project; onPreview: (url: string) => void; onViewJson?: (workflowJson: string) => void }) {
  const isMarketing = project.subBrand === "gmmarketing";
  const isAutomation = project.subBrand === "gmautomation";
  const hasVisitSite =
    (project.subBrand === "gmcode" ||
      project.subBrand === "gmdesign" ||
      project.subBrand === "gmux") &&
    typeof project.url === "string" &&
    /^https?:\/\//i.test(project.url);

  const meta = projectMeta[project.name] ?? {};
  const year = meta.year ?? project.year;
  const isConceptual =
    meta.conceptual ?? /conceptual case study/i.test(project.description ?? "");

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group cursor-pointer"
      onClick={() => onPreview(isMarketing ? project.url : project.image)}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted mb-3">
        {isMarketing ? (
          <video
            src={project.url}
            muted
            autoPlay
            loop
            playsInline
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : isAutomation ? (
          <div className="w-full h-full flex items-center justify-center p-4">
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        ) : (
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        )}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1.5">
          {year && (
            <span className="px-2 py-1 text-[11px] font-mono tracking-widest uppercase bg-background/85 backdrop-blur border border-border text-foreground">
              {year}
            </span>
          )}
          {isConceptual && (
            <span className="px-2 py-1 text-[11px] font-mono tracking-widest uppercase bg-accent text-accent-foreground">
              Conceptual
            </span>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            {brandLabels[project.subBrand] ?? project.subBrand}
          </span>
          {project.year && (
            <span className="text-xs text-muted-foreground">· {project.year}</span>
          )}
        </div>
        
        <h3 className="font-display font-bold text-lg text-foreground group-hover:text-accent transition-colors">
          {project.name}
        </h3>
        
        {project.description && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        )}
        
        {project.techStack && project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.techStack.map((tech) => (
              <span key={tech} className="tag-pill text-xs">
                {tech}
              </span>
            ))}
          </div>
        )}
        
        <div className="pt-2">
          {isAutomation && project.workflowJson ? (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onViewJson?.(project.workflowJson!); }}
              className="text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              View workflow →
            </button>
          ) : hasVisitSite ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-foreground hover:text-accent transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              Visit site →
            </a>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}

export default function BrandEdgeWork({ projects, onPreview, onViewJson }: BrandEdgeWorkProps) {
  return (
    <section id="work" className="section-pad bg-secondary border-t border-border">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="heading-serif font-bold text-foreground mb-2" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}>
              My work
            </h2>
            <p className="text-muted-foreground text-base max-w-lg">
              Featured UX &amp; Product Design projects.
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {projects.map((project) => (
                <ProjectCard
                  key={project._id ?? project.name}
                  project={project}
                  onPreview={onPreview}
                  onViewJson={onViewJson}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {projects.length === 0 && (
            <p className="text-muted-foreground text-center py-12">
              No projects yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
