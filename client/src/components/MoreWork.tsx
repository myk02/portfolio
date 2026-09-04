import { projects } from "@/data/projects";
import { ProjectCardGrid } from "@/components/ProjectCard";

export default function MoreWork({ current }: { current: string }) {
  const others = projects.filter((s) => s.slug !== current);
  if (others.length === 0) return null;
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-12 border-t border-border">
      <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6">
        More work
      </p>
      <ProjectCardGrid studies={others} />
    </div>
  );
}
