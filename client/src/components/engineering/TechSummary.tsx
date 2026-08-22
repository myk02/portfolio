import { Reveal } from "@/components/Reveal";
import {
  skillMatrix,
  buildingNext,
  buildingNextNote,
  collaborationPoints,
} from "@/data/engineering";

/**
 * Recruiter-readable skills matrix. Supported skills only in `skillMatrix`;
 * everything unproven is quarantined in the "Building next" subsection.
 */
export default function TechSummary() {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
        {skillMatrix.map((group, i) => (
          <Reveal key={group.title} delay={i % 4}>
            <h3 className="text-xs font-mono uppercase tracking-widest text-accent mb-3">
              {group.title}
            </h3>
            <ul className="flex flex-wrap gap-1.5">
              {group.skills.map(skill => (
                <li key={skill} className="tag-pill text-xs">
                  {skill}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      {/* Building next — clearly separated from demonstrated skills */}
      <Reveal className="border border-dashed border-border bg-card/60 p-5">
        <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
          Building next
        </h3>
        <p className="text-[13px] text-muted-foreground mb-3 leading-snug max-w-2xl">
          {buildingNextNote}
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5">
          {buildingNext.map(item => (
            <li
              key={item}
              className="text-[13px] text-foreground/75 leading-snug flex gap-2"
            >
              <span aria-hidden className="text-muted-foreground shrink-0">
                →
              </span>
              {item}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal>
        <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
          Working with teams
        </h3>
        <ul className="space-y-2 max-w-2xl">
          {collaborationPoints.map((point, i) => (
            <li
              key={i}
              className="text-sm text-foreground/90 leading-relaxed pl-4 relative"
            >
              <span
                aria-hidden
                className="absolute left-0 top-[9px] w-1.5 h-1.5 bg-accent"
              />
              {point}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
