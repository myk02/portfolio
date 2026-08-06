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
textLine("UI/UX Designer & Product Strategist", { size: 12.5, y, color: [0.3, 0.3, 0.3] });
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
  "UI/UX Designer and product strategist with 4+ years of experience delivering research-driven digital products for fintech, e-commerce, tourism and B2B clients. I translate complex business requirements into intuitive, accessible interfaces \u2014 leading user research, competitive analysis, wireframing and high-fidelity prototyping in Figma. I scope, estimate and prioritize work in fast-paced environments, collaborate across business, technology and creative teams, and ship polished designs through to production.",
  y,
);
y -= 18;

y = sectionHeader("EXPERIENCE & PROJECT HIGHLIGHTS", y);
y = bullet("Led end-to-end UI/UX design for e-commerce, tourism and banking platforms, including a youth-focused mobile banking app and a research-driven tourism explorer (KenyaTrace).", y);
y = bullet("Conducted user research, stakeholder interviews, competitive analysis and usability testing to ground every design decision in evidence and insight.", y);
y = bullet("Built scalable design systems \u2014 typography scales, colour theory, reusable component libraries \u2014 and documented them for consistent product teams.", y);
y = bullet("Created wireframes, user flows, journey maps and high-fidelity prototypes in Figma with developer-ready specs and clean handoff.", y);
y = bullet("Collaborated with business, technology and creative stakeholders to scope, estimate and prioritize features, delivering on tight deadlines.", y);
y = bullet("Designed and shipped 7+ live, responsive websites and web apps (React, Next.js, TypeScript), bridging design and front-end implementation.", y);
y = bullet("Applied on-page SEO, GA4 analytics and WCAG accessibility fundamentals to improve usability, visibility and conversion.", y);
y -= 18;

y = sectionHeader("KEY SKILLS", y);
y = bullet("Design \u2014 Figma, FigJam/Miro, Adobe Creative Cloud, Sketch, wireframing, prototyping, design systems, typography, usability testing, information architecture.", y);
y = bullet("Strategy \u2014 user research, competitive analysis, journey mapping, stakeholder management, scoping, estimation and prioritization.", y);
y = bullet("Technical \u2014 HTML/CSS, React, Next.js, TypeScript, Tailwind CSS, REST APIs, WordPress, Webflow, Git, Vercel.", y);
y = bullet("Tools \u2014 GA4, Jira, n8n, CapCut Pro, Canva.  Languages \u2014 English (fluent), Kiswahili (fluent).", y);
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
