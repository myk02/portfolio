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
textLine("Full-Stack Software Engineer \u2014 Connecting Dots in Tech", { size: 12.5, y, color: [0.3, 0.3, 0.3] });
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
  "Full-stack software engineer who connects dots across building, running and selling technology. Builds full-stack web, mobile and desktop apps for clients and integrates them with third-party payment systems (M-Pesa, Paystack). Uses AI and imaging technologies in the daily build workflow. IT professional with hands-on technical support experience - troubleshooting hardware, software and network systems to keep operations smooth. An outspoken communicator who explains complex technology simply; communication is treated as the ultimate skill. Currently venturing into marketing with AI - building apps and automations that are tested against one question: do they actually win customers? Shipped live products include a mobile-first tourism trip planner (KenyaTrace), an e-commerce storefront (GiGi Energy Drink) and a legal practice workspace concept (LegalFlow).",
  y,
);
y -= 18;

y = sectionHeader("ENGINEERING HIGHLIGHTS", y);
y = bullet("Ships full-stack apps end to end: React + TypeScript frontends against typed Convex backend APIs, with Git-to-Vercel deployment.", y);
y = bullet("Integrates third-party payment systems into client apps - M-Pesa-first ordering and Paystack tips with server-side transaction verification and webhook reconciliation.", y);
y = bullet("Builds and ships live products: KenyaTrace (kenyatrace.vercel.app), a list-first tourism trip planner built for 3G conditions; GiGi Energy Drink storefront (gigiflavours.vercel.app) with a shortened mobile checkout; LegalFlow (law-ten-iota.vercel.app), a matter-and-billing workspace for small law firms.", y);
y = bullet("Uses AI and imaging technologies in the build workflow - sourced outputs held to manual review, with evals and safe-fail patterns.", y);
y = bullet("Quality in daily use: Playwright end-to-end suite covering routes, CTAs, dialogs, form validation and the 404 path; tsc typecheck gates; fixes traced to root cause in browser DevTools.", y);
y = bullet("Marketing in progress: applying AI tooling to position, explain and sell shipped apps - testing whether products actually win customers, not just whether they run.", y);
y -= 18;

y = sectionHeader("EXPERIENCE", y);
y = bullet("Freelancer & Full-Stack Software Engineer - Self-employed, Nairobi / Remote (Feb 2025 - Present). Web, mobile and desktop apps for clients with third-party payments; currently venturing into marketing with AI.", y);
y = bullet("ICT Intern - Council of Legal Education, Kenya (Jan 2024 - Feb 2025). Technical support and ICT operations for the council.", y);
y = bullet("IT Clerk - IEBC, Kenya (Jul 2022 - Oct 2022). Hardware, software and network support; staff training.", y);
y = bullet("Junior Software Engineer - Freelancer.com (Jul 2021 - Feb 2022). Web apps for clients.", y);
y -= 18;

y = sectionHeader("KEY SKILLS", y);
y = bullet("Engineering - TypeScript, React, Next.js, semantic HTML, CSS/Tailwind, REST-style API integration, typed data contracts, responsive layouts.", y);
y = bullet("Full-stack delivery - Convex APIs, third-party payment integration (M-Pesa / Paystack), mobile and desktop app builds, Git/GitHub, Vercel deployment.", y);
y = bullet("IT & operations - technical support, hardware/software/network troubleshooting, device setup, staff training, smooth-systems operations.", y);
y = bullet("AI + imaging - AI-assisted building with manual review, imaging technologies in the workflow, automation for small businesses.", y);
y = bullet("Marketing & communication - explaining complex technology simply, customer-fit testing, AI-assisted marketing.", y);
y = bullet("Tools - Playwright, GA4, Git, Figma.  Languages - English (fluent), Kiswahili (fluent).", y);
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
