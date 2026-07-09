import { useState } from "react";
import { motion } from "framer-motion";

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

const projectAccents: Record<string, string> = {
  gmcode: "#e8ff47",
  gmdesign: "#ff6b35",
  gmmarketing: "#c4a882",
  gmautomation: "#00b4d8",
};

const brandLabels: Record<string, string> = {
  gmcode: "Development",
  gmdesign: "Design",
  gmmarketing: "Marketing",
  gmautomation: "Automation",
};

const brandOrder = ["gmdesign", "gmautomation", "gmcode", "gmmarketing"] as const;
type BrandId = (typeof brandOrder)[number];

function ProjectCard({ project, onPreview, onViewJson }: { project: Project; onPreview: (url: string) => void; onViewJson?: (workflowJson: string) => void }) {
  const accent = projectAccents[project.subBrand] ?? "#e8ff47";
  const isMarketing = project.subBrand === "gmmarketing";
  const year = project.year ?? "2025";
  const isCode = project.subBrand === "gmcode";

  return (
    <div className="flex-shrink-0 w-[220px] lg:w-[280px] border-[1.5px] border-border bg-secondary">
      <div className="relative aspect-[4/3] overflow-hidden group">
        <div className="cursor-pointer" onClick={() => onPreview(isMarketing ? project.url : project.image)}>
          {isMarketing ? (
            <video
              src={project.url}
              muted
              autoPlay
              loop
              playsInline
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : project.subBrand === "gmautomation" ? (
            <div className="w-full h-full bg-muted/30 flex items-center justify-center">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-contain p-1 transition-transform duration-700 group-hover:scale-105"
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
        </div>
        <span className="absolute top-2 right-2 tag-pill bg-secondary/90 text-foreground text-[9px]">
          {year}
        </span>
      </div>
      <div className="p-3 relative">
        <span className="absolute top-3 right-3 w-1.5 h-1.5" style={{ background: accent }} />
        <span className="tag-pill text-[9px] text-muted-foreground mb-2 inline-block">
          {brandLabels[project.subBrand] ?? project.subBrand}
        </span>
        <h3 className="font-display font-bold text-sm tracking-tight text-foreground mt-1">{project.name}</h3>
        {project.description && (
          <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed line-clamp-2">{project.description}</p>
        )}
        {project.techStack && project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {project.techStack.map((tech) => (
              <span key={tech} className="font-mono text-[9px] tracking-[0.1em] uppercase px-1.5 py-0.5 border border-border">
                {tech}
              </span>
            ))}
          </div>
        )}
        {project.subBrand === "gmautomation" && project.workflowJson ? (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onViewJson?.(project.workflowJson!); }}
            className="inline-block mt-2 font-mono text-[10px] tracking-[0.15em] uppercase text-foreground hover:text-accent transition-colors"
          >
            View JSON →
          </button>
        ) : (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 font-mono text-[10px] tracking-[0.15em] uppercase text-foreground hover:text-accent transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            Visit site →
          </a>
        )}
      </div>
    </div>
  );
}

export default function BrandEdgeWork({ projects, onPreview, onViewJson }: BrandEdgeWorkProps) {
  const [activeBrand, setActiveBrand] = useState<BrandId | "all">("all");

  const filteredProjects = activeBrand === "all" ? projects : projects.filter((p) => p.subBrand === activeBrand);

  const hasProjects = filteredProjects.length > 0;

  return (
    <section id="work" className="section-pad bg-secondary overflow-hidden">
      <div className="container mb-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3">
          <div>
            <div className="section-label">
              <span className="section-label-line" />
              Portfolio
            </div>
            <h2 className="heading-serif font-bold text-foreground" style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)" }}>
              My work.
              <span className="italic font-light text-muted-foreground block text-sm"> {projects.length} projects and counting.</span>
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <button
            type="button"
            onClick={() => setActiveBrand("all")}
            className={`font-mono text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 border transition-colors ${
              activeBrand === "all"
                ? "bg-primary text-accent border-primary"
                : "text-muted-foreground border-border hover:border-foreground"
            }`}
          >
            All ({projects.length})
          </button>
          {brandOrder.map((brand) => {
            const count = projects.filter((p) => p.subBrand === brand).length;
            if (count === 0) return null;
            return (
              <button
                key={brand}
                type="button"
                onClick={() => setActiveBrand(brand)}
                className={`font-mono text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 border transition-colors ${
                  activeBrand === brand
                    ? "bg-primary text-accent border-primary"
                    : "text-muted-foreground border-border hover:border-foreground"
                }`}
              >
                {brandLabels[brand]} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {hasProjects ? (
        <div className="marquee-container">
          <div className="marquee-track">
            {[...filteredProjects, ...filteredProjects].map((project, i) => (
              <ProjectCard key={`${project._id ?? project.name}-${i}`} project={project} onPreview={onPreview} onViewJson={onViewJson} />
            ))}
          </div>
        </div>
      ) : (
        <div className="container">
          <p className="text-muted-foreground font-mono text-xs tracking-wider uppercase">No projects yet.</p>
        </div>
      )}
    </section>
  );
}
