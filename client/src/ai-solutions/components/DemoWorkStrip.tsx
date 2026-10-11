import { Link } from "wouter";
import { ChipAccent, Chip } from "@/components/ui/kicker";
import { Surface } from "@/components/ui/section";
import { DEMO_PROJECT_CARD } from "../demoContent";

/**
 * Demo project card. Deliberately NOT in data/projects.ts: that array feeds
 * existing tests that assert exactly 3 tiles and 404s for its slugs.
 * This strip is appended after the existing grid instead (additive only).
 */
export default function DemoWorkStrip() {
  return (
    <div className="mt-10 max-w-5xl mx-auto">
      <Surface className="p-5 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap gap-1.5">
            <ChipAccent>{DEMO_PROJECT_CARD.badge}</ChipAccent>
            <Chip>{DEMO_PROJECT_CARD.role}</Chip>
          </div>
          <h3 className="mt-2 font-display font-semibold text-[1.05rem] text-foreground leading-snug">
            {DEMO_PROJECT_CARD.name}
          </h3>
          <p className="text-[0.8125rem] text-muted-foreground leading-relaxed mt-1">
            {DEMO_PROJECT_CARD.outcomeTitle}
          </p>
        </div>
        <Link href="/ai-solutions" className="btn btn-primary text-xs shrink-0">
          Open demo & write-up
        </Link>
      </Surface>
    </div>
  );
}
