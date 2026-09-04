import { useMemo } from "react";
import { useParams } from "wouter";
import { projects } from "@/data/projects";
import NotFound from "@/pages/NotFound";
import MoreWork from "@/components/MoreWork";
import CaseStudyLayout from "@/components/caseStudy/CaseStudyLayout";

/* Sequencing follows the canonical order in the data file */
const ORDER = projects.map(s => s.slug);

export default function CaseStudyPage() {
  const params = useParams();
  const slug = params.slug as string;

  const project = useMemo(() => projects.find((s) => s.slug === slug), [slug]);

  const { prev, next } = useMemo(() => {
    const i = ORDER.indexOf(slug);
    if (i === -1) return { prev: null, next: null };
    const p = i > 0 ? ORDER[i - 1] : null;
    const n = i < ORDER.length - 1 ? ORDER[i + 1] : null;
    const ps = p ? projects.find((s) => s.slug === p) : undefined;
    const ns = n ? projects.find((s) => s.slug === n) : undefined;
    return {
      prev: ps ? { slug: p!, name: ps.name } : null,
      next: ns ? { slug: n!, name: ns.name } : null,
    };
  }, [slug]);

  if (!project) return <NotFound />;

  return (
    <CaseStudyLayout
      project={project}
      prev={prev}
      next={next}
      moreWork={<MoreWork current={slug} />}
    />
  );
}
