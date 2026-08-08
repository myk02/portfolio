/**
 * Rough word-count QA for v4 budgets:
 * homepage ≤250 words, each case study ≤150 words (visible text only).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..", "client", "src");

function countWords(text) {
  return text
    .replace(/<[^>]+>/g, " ")
    .replace(/\{[^}]+\}/g, " ")
    .match(/\b[\w'’-]+\b/g)?.length ?? 0;
}

function readFile(rel) {
  return fs.readFileSync(path.join(root, rel), "utf8");
}

/* homepage: hero + work + process + playbook + about intro (not form labels) */
const homeFiles = [
  "components/BrandEdgeHero.tsx",
  "components/BrandEdgeWork.tsx",
  "components/UXProcessSection.tsx",
  "components/DesignPlaybook.tsx",
  "components/BrandEdgeAbout.tsx",
];
let homeWords = 0;
for (const f of homeFiles) {
  homeWords += countWords(readFile(f));
}

/* case studies: CAPTIONS + LESSONS in CaseStudyPage */
const casePage = readFile("pages/CaseStudyPage.tsx");
const capsMatch = casePage.match(/const CAPTIONS[\s\S]*?};/);
const lessonsMatch = casePage.match(/const LESSONS[\s\S]*?};/);
const studies = [
  "mobile-banking-redesign",
  "kenyatrace",
  "gigi-energy",
  "dashboard-ui-system",
  "design-system-creation",
];

console.log("=== Word count report (source strings, approximate) ===\n");
console.log(`Homepage components total: ~${homeWords} words (target ≤250)`);
console.log(homeWords <= 250 ? "  ✔ within budget" : "  ✖ OVER budget — trim more copy\n");

for (const slug of studies) {
  let w = 0;
  if (capsMatch) {
    const block = capsMatch[0].match(new RegExp(`"${slug}"[\\s\\S]*?},`, "m"));
    if (block) w += countWords(block[0]);
  }
  if (lessonsMatch) {
    const block = lessonsMatch[0].match(new RegExp(`"${slug}"[\\s\\S]*?],`, "m"));
    if (block) w += countWords(block[0]);
  }
  /* section titles are shared ~30 words */
  w += 35;
  console.log(`${slug}: ~${w} words (target ≤150)`);
  console.log(w <= 150 ? "  ✔ within budget" : "  ✖ OVER budget");
}
