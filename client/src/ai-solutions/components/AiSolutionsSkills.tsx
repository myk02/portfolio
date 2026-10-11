import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/ui/section";
import { Card } from "@/components/ui/kicker";
import { AI_SKILLS_GROUP } from "../demoContent";

/** NEW skills group — rendered beside existing skills, never replacing them. */
export default function AiSolutionsSkills() {
  return (
    <div>
      <Reveal className="section-intro mb-8">
        <SectionLabel>{AI_SKILLS_GROUP.title}</SectionLabel>
        <h2 className="heading-section text-foreground mt-2">
          What the demo really uses
        </h2>
      </Reveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {AI_SKILLS_GROUP.skills.map(skill => (
          <Reveal key={skill}>
            <Card className="p-4 h-full">
              <p className="text-[0.8375rem] text-foreground leading-relaxed">
                {skill}
              </p>
            </Card>
          </Reveal>
        ))}
      </div>
      <p className="mt-6 text-center text-sm text-muted-foreground max-w-2xl mx-auto">
        {AI_SKILLS_GROUP.strengthening}
      </p>
    </div>
  );
}
