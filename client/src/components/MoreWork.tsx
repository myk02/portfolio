import { projects } from "@/data/projects";
import { ProjectCardGrid } from "@/components/ProjectCard";

export default function MoreWork({ current }: { current: string }) {
  const others = projects.filter((s) => s.slug !== current);
  if (others.length === 0) return null;
  return (
    <div className="container py-9 sm:py-11 border-t border-border">
      <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-5 text-center">
        More work
      </p>
      <ProjectCardGrid studies={others} />
    </div>
  );
}
