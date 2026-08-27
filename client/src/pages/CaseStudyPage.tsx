import { useMemo } from "react";
import { useParams } from "wouter";
import { caseStudies } from "@/data/caseStudies";
import { caseVisuals } from "@/data/caseVisuals";
import NotFound from "@/pages/NotFound";
import MoreWork from "@/components/MoreWork";
import CaseStudyLayout from "@/components/caseStudy/CaseStudyLayout";

/* Sequencing follows the canonical order in the data file */
const ORDER = caseStudies.map(s => s.slug);

export default function CaseStudyPage() {
  const params = useParams();
  const slug = params.slug as string;

  const study = useMemo(() => caseStudies.find((s) => s.slug === slug), [slug]);
  const visuals = caseVisuals[slug];

  const { prev, next } = useMemo(() => {
    const i = ORDER.indexOf(slug);
    if (i === -1) return { prev: null, next: null };
    // With only two studies, prev and next would both point at the same
    // study — render a single "next" link instead.
    const p = i > 0 ? ORDER[i - 1] : null;
    const n = i < ORDER.length - 1 ? ORDER[i + 1] : null;
    const ps = p ? caseStudies.find((s) => s.slug === p) : undefined;
    const ns = n ? caseStudies.find((s) => s.slug === n) : undefined;
    return {
      prev: ps ? { slug: p!, name: ps.name } : null,
      next: ns ? { slug: n!, name: ns.name } : null,
    };
  }, [slug]);

  if (!study || !visuals) return <NotFound />;

  return (
    <CaseStudyLayout
      study={study}
      visuals={visuals}
      prev={prev}
      next={next}
      moreWork={<MoreWork current={slug} />}
    />
  );
}
