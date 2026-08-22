import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../client/public/CV.pdf");

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN = 55;
const TEXT_W = PAGE_W - MARGIN * 2;

const CP1252 = {
  "\u2022": 0x95,
  "\u2013": 0x96,
  "\u2014": 0x97,
  "\u2018": 0x91,
  "\u2019": 0x92,
  "\u201C": 0x93,
  "\u201D": 0x94,
  "\u00B7": 0xb7,
};

function encode(text) {
  const bytes = [];
  for (const ch of text) {
    if (Object.prototype.hasOwnProperty.call(CP1252, ch)) {
      bytes.push(CP1252[ch]);
    } else {
      const code = ch.charCodeAt(0);
      bytes.push(code < 256 ? code : 0x3f);
    }
  }
  return Buffer.from(bytes);
}

const ops = [];

function textLine(text, { font = "F1", size = 9.5, x = MARGIN, y, color = [0.15, 0.15, 0.15], spacing = 0 } = {}) {
  ops.push(`BT /${font} ${size} Tf ${color.join(" ")} rg ${spacing} Tw ${x} ${y} Td (${text}) Tj ET`);
}

function rule(y, x = MARGIN, width = TEXT_W, weight = 0.8, color = [0.1, 0.1, 0.1]) {
  ops.push(`q ${weight} w ${color.join(" ")} RG ${x} ${y} m ${x + width} ${y} l S Q`);
}

const avgChar = (size) => size * 0.5;

function wrap(text, size, maxWidth = TEXT_W) {
  const cpl = Math.max(1, Math.floor(maxWidth / avgChar(size)));
  const words = text.split(/\s+/);
  const lines = [];
  let current = "";
  for (const word of words) {
    if (!current) {
      current = word;
    } else if ((current + " " + word).length <= cpl) {
      current += " " + word;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function paragraph(text, y, size = 9.5, lineHeight = 13, indent = 0, options = {}) {
  const lines = wrap(text, size, TEXT_W - indent);
  lines.forEach((ln, i) => {
    textLine(ln, { size, y: y - i * lineHeight, x: MARGIN + indent, ...options });
  });
  return y - lines.length * lineHeight;
}

function bullet(text, y, size = 9.5, lineHeight = 13) {
  const bulletWidth = 12;
  const lines = wrap(text, size, TEXT_W - bulletWidth);
  lines.forEach((ln, i) => {
    textLine(ln, {
      size,
      y: y - i * lineHeight,
      x: MARGIN + (i === 0 ? 0 : bulletWidth),
      ...(i === 0 ? {} : { spacing: -0.15 }),
    });
  });
  textLine("\u2022", { size: size + 1, y: y - 0.5, x: MARGIN + bulletWidth - 9 });
  return y - lines.length * lineHeight;
}

function sectionHeader(text, y) {
  textLine(text, { font: "F2", size: 11, y, color: [0.05, 0.05, 0.05] });
  rule(y - 3.5);
  return y - 16;
}

let y = 800;

textLine("MIKE WAITINDI", { font: "F2", size: 25, y, color: [0.05, 0.05, 0.05] });
y -= 22;
textLine("Web Developer & Frontend Engineer", { size: 12.5, y, color: [0.3, 0.3, 0.3] });
y -= 15;
textLine("Nairobi, Kenya \u00B7 Remote", { size: 9, y, color: [0.4, 0.4, 0.4] });
y -= 12.5;
textLine("mikegary201@gmail.com  \u00B7  +254 792 618 156  \u00B7  linkedin.com/in/mike-waitindi-654bb2344", { size: 9, y, color: [0.4, 0.4, 0.4] });
y -= 12.5;
textLine("Portfolio: mikeships.vercel.app", { size: 9, y, color: [0.4, 0.4, 0.4] });
y -= 14;
rule(y);
y -= 26;

y = sectionHeader("PROFESSIONAL SUMMARY", y);
y = paragraph(
  "Web developer focused on turning designs and requirements into reliable, accessible, responsive production interfaces. Shipped live products include a mobile-first tourism trip planner (KenyaTrace) and an e-commerce storefront (GiGi Energy Drink). Builds and maintains full frontend systems in React, TypeScript and Tailwind against typed backend APIs, with end-to-end tests and Git-to-Vercel deployment. A background in UX research and design means requirements are read accurately, designers get a collaborator who speaks their language, and handoff ambiguity is designed out.",
  y,
);
y -= 18;

y = sectionHeader("ENGINEERING HIGHLIGHTS", y);
y = bullet("Built and shipped KenyaTrace (kenyatrace.vercel.app), a live mobile-first tourism planner for 3G conditions - list-first architecture, client-side route-builder state, progressive loading, and every planning task verified usable at a 360px viewport.", y);
y = bullet("Rebuilt the GiGi Energy Drink storefront (gigiflavours.vercel.app): merged checkout from 4 steps to 3, lifted text contrast from 2.1:1 to WCAG AA across the brand palette, and ordered payment options M-Pesa first to match real purchase behavior.", y);
y = bullet("Engineered this portfolio end-to-end: React + TypeScript application with typed Convex backend functions powering the contact form and Paystack donations, verified server-side before confirming success.", y);
y = bullet("Quality practice in daily use: Playwright end-to-end suite covering routes, CTAs, dialogs, form validation and the 404 path; tsc typecheck gates; Prettier formatting; fixes traced to root cause in browser DevTools rather than patched symptoms.", y);
y = bullet("Delivery workflow: feature branches and reviewed pull requests in Git/GitHub, automatic deployment to Vercel on merge, canonical URLs and per-route metadata kept healthy.", y);
y -= 18;

y = sectionHeader("EXPERIENCE & DESIGN BACKGROUND", y);
y = bullet("Led end-to-end UI/UX design for e-commerce, tourism and banking platforms, including youth-focused mobile banking concepts validated in moderated testing.", y);
y = bullet("Conducted user research, stakeholder interviews, competitive analysis and usability testing to ground interface decisions in evidence.", y);
y = bullet("Built scalable design systems - tokens, typography scales, reusable component libraries - documented with states and edge cases for developer handoff.", y);
y = bullet("Created wireframes, user flows and high-fidelity prototypes in Figma with build-ready specs, reducing back-and-forth during implementation.", y);
y = bullet("Collaborated across business, technology and creative stakeholders to scope, estimate and prioritize features on tight deadlines.", y);
y -= 18;

y = sectionHeader("KEY SKILLS", y);
y = bullet("Frontend - JavaScript/ES6+, TypeScript, React, Next.js, semantic HTML, CSS/Tailwind, responsive layouts.", y);
y = bullet("Quality & testing - Playwright e2e, accessibility (WCAG AA contrast, keyboard/focus states), form validation, loading/error/empty states, cross-browser and viewport testing.", y);
y = bullet("Systems & data - component architecture, design tokens, state modeling (hooks/context), REST-style API integration, typed data contracts.", y);
y = bullet("Delivery - Git/GitHub, code review via pull requests, Vercel deployment, browser DevTools debugging, performance basics (image pipelines, lazy loading).", y);
y = bullet("Design & research - Figma, FigJam/Miro, wireframing, prototyping, information architecture, usability testing.", y);
y = bullet("Tools - GA4, Jira.  Languages - English (fluent), Kiswahili (fluent).", y);
y -= 18;

y = sectionHeader("EDUCATION", y);
y = paragraph("Bachelor of Information Technology \u2014 South Eastern Kenya University (SEKU), Kitui, Kenya (2015\u20132020)", y);
y -= 22;
rule(y);
y -= 14;
textLine("Available for roles in Nairobi or remote. References available on request.", { size: 8.5, y, color: [0.45, 0.45, 0.45] });

const stream = Buffer.from(ops.join("\n"), "latin1");

const objects = [];
const catalog = "<< /Type /Catalog /Pages 2 0 R >>";
const pages = `<< /Type /Pages /Kids [3 0 R] /Count 1 >>`;
const page = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>`;
const f1 = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>";
const f2 = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>";
const contents = `<< /Length ${stream.length} >>\nstream\n${stream.toString("latin1")}\nendstream`;
objects.push(catalog, pages, page, f1, f2, contents);

const header = Buffer.from(
  [0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34, 0x0d, 0x0a, 0x25, 0xe2, 0xe3, 0xcf, 0xd3, 0x0d, 0x0a],
);
const chunks = [header];
const offsets = [];
for (let i = 0; i < objects.length; i++) {
  offsets.push(Buffer.byteLength(Buffer.concat(chunks)));
  chunks.push(Buffer.from(`${i + 1} 0 obj\n${objects[i]}\nendobj\n`));
}
const xrefOffset = Buffer.byteLength(Buffer.concat(chunks));
let xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
for (const off of offsets) {
  xref += `${String(off).padStart(10, "0")} 00000 n \n`;
}
xref += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
chunks.push(Buffer.from(xref));

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, Buffer.concat(chunks));
console.log(`Wrote ${OUT} (${Buffer.byteLength(Buffer.concat(chunks))} bytes)`);
