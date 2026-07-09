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
}

interface BrandEdgeWorkProps {
  projects: Project[];
  onPreview: (url: string) => void;
}

const projectAccents: Record<string, string> = {
  gmcode: "#e8ff47",
  gmdesign: "#ff6b35",
  gmmarketing: "#c4a882",
};

const brandLabels: Record<string, string> = {
  gmcode: "Development",
  gmdesign: "Design",
  gmmarketing: "Marketing",
};

const brandOrder = ["gmdesign", "gmmarketing", "gmcode"] as const;
type BrandId = (typeof brandOrder)[number];

function ProjectCard({ project, onPreview }: { project: Project; onPreview: (url: string) => void }) {
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
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 font-mono text-[10px] tracking-[0.15em] uppercase text-accent hover:text-foreground transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          Visit site →
        </a>
      </div>
    </div>
  );
}

export default function BrandEdgeWork({ projects, onPreview }: BrandEdgeWorkProps) {
  const [activeBrand, setActiveBrand] = useState<BrandId | "all">("all");

  const filteredProjects = activeBrand === "all" ? projects : projects.filter((p) => p.subBrand === activeBrand);

  const hasProjects = filteredProjects.length > 0;

  return (
    <section id="work" className="section-pad bg-secondary overflow-hidden">
      <div className="container mb-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <div className="section-label">
              <span className="section-label-line" />
              Portfolio
            </div>
            <h2 className="heading-serif font-bold text-foreground" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              My work.
              <span className="italic font-light text-muted-foreground block text-sm"> {projects.length} projects and counting.</span>
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-6">
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
              <ProjectCard key={`${project._id ?? project.name}-${i}`} project={project} onPreview={onPreview} />
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
