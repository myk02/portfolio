import { useMemo } from "react";
import { useParams } from "wouter";
import { caseStudies } from "@/data/caseStudies";
import { caseVisuals } from "@/data/caseVisuals";
import NotFound from "@/pages/NotFound";
import MoreWork from "@/components/MoreWork";
import CaseStudyLayout from "@/components/caseStudy/CaseStudyLayout";
import { getChapters, getGlance } from "@/components/caseStudy/caseChapters";

const ORDER = [
  "mobile-banking-redesign",
  "kenyatrace",
  "gigi-energy",
  "dashboard-ui-system",
  "design-system-creation",
];

export default function CaseStudyPage() {
  const params = useParams();
  const slug = params.slug as string;

  const study = useMemo(() => caseStudies.find((s) => s.slug === slug), [slug]);
  const visuals = caseVisuals[slug];

  const { prev, next } = useMemo(() => {
    const i = ORDER.indexOf(slug);
    if (i === -1) return { prev: { slug, name: slug }, next: { slug, name: slug } };
    const p = ORDER[(i - 1 + ORDER.length) % ORDER.length];
    const n = ORDER[(i + 1) % ORDER.length];
    const ps = caseStudies.find((s) => s.slug === p)!;
    const ns = caseStudies.find((s) => s.slug === n)!;
    return {
      prev: { slug: p, name: ps.name },
      next: { slug: n, name: ns.name },
    };
  }, [slug]);

  const chapters = useMemo(
    () => (study && visuals ? getChapters(study, visuals) : []),
    [study, visuals],
  );
  const glance = useMemo(
    () => (study && visuals ? getGlance(study, visuals) : []),
    [study, visuals],
  );

  if (!study || !visuals) return <NotFound />;

  return (
    <CaseStudyLayout
      study={study}
      visuals={visuals}
      chapters={chapters}
      glance={glance}
      prev={prev}
      next={next}
      moreWork={<MoreWork current={slug} />}
    />
  );
}
