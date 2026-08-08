import type { CaseStudy, CaseSection } from "@/data/caseStudies";

const WORDS_PER_MINUTE = 200;

function countWords(text?: string): number {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function sectionWords(section?: CaseSection): number {
  if (!section) return 0;
  let n = countWords(section.lead);
  section.paragraphs?.forEach((p) => (n += countWords(p)));
  section.bullets?.forEach((b) => (n += countWords(b.label) + countWords(b.text)));
  section.callouts?.forEach((c) => (n += countWords(c.quote) + countWords(c.source)));
  return n;
}

/** Word count of everything a reader actually reads on a case study page. */
export function studyWordCount(study: CaseStudy): number {
  let n = 0;
  n += countWords(study.tagline);
  n += countWords(study.summary);
  n += countWords(study.heroCaption);
  n += countWords(study.problem.lead);
  study.problem.paragraphs.forEach((p) => (n += countWords(p)));
  n += sectionWords(study.research);
  n += sectionWords(study.designThinking);
  n += sectionWords(study.ia);
  n += sectionWords(study.design);
  n += sectionWords(study.testing);
  study.outcomes.forEach((o) => {
    n += countWords(o.metric) + countWords(o.value) + countWords(o.note);
  });
  n += countWords(study.outcomeDetail);
  study.lessons.forEach((l) => (n += countWords(l)));
  return n;
}

/** Reading time in whole minutes at ~200 wpm (never below 2). */
export function readingMinutes(study: CaseStudy): number {
  return Math.max(2, Math.round(studyWordCount(study) / WORDS_PER_MINUTE));
}
