import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { caseStudies, type CaseStudy } from "@/data/caseStudies";
import BankingArt from "@/components/art/BankingArt";
import DashboardArt from "@/components/art/DashboardArt";
import DesignSystemArt from "@/components/art/DesignSystemArt";

function Artwork({ study }: { study: CaseStudy }) {
  if (study.image) {
    return (
      <img
        src={study.image}
        alt={`${study.name} — product screenshot`}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        loading="lazy"
        decoding="async"
      />
    );
  }
  switch (study.art) {
    case "banking":
      return (
        <div className="w-full h-full flex items-center justify-center bg-[#f4efe7] transition-transform duration-700 group-hover:scale-[1.03] p-3 sm:p-4">
          <BankingArt className="max-w-full" />
        </div>
      );
    case "dashboard":
      return (
        <div className="w-full h-full flex items-center justify-center bg-[#141310] p-2.5 sm:p-3.5 transition-transform duration-700 group-hover:scale-[1.03]">
          <DashboardArt />
        </div>
      );
    case "design-system":
      return (
        <div className="w-full h-full flex items-center justify-center bg-[#f4efe7] p-2.5 sm:p-3.5 transition-transform duration-700 group-hover:scale-[1.03]">
          <DesignSystemArt />
        </div>
      );
  }
}

function WorkTile({ study, wide = false }: { study: CaseStudy; wide?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={wide ? "md:col-span-2" : ""}
    >
      <Link
        href={`/work/${study.slug}`}
        className="group block h-full border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-foreground/40 hover:shadow-[0_16px_40px_-16px_rgba(10,10,10,0.3)]"
      >
        <div className={`relative overflow-hidden bg-muted ${wide ? "aspect-[16/9] md:aspect-[16/8]" : "aspect-[4/3]"}`}>
          <Artwork study={study} />
          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
            <span
              className={`px-2 py-1 text-[11px] font-mono tracking-widest uppercase transition-transform duration-300 group-hover:-translate-y-0.5 ${
                study.kind === "LIVE PRODUCT"
                  ? "bg-foreground text-background"
                  : "bg-accent text-accent-foreground"
              }`}
            >
              {study.kind}
            </span>
            <span className="px-2 py-1 text-[11px] font-mono tracking-widest uppercase bg-background/85 backdrop-blur border border-border text-foreground">
              {study.year}
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-5 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display font-bold text-lg sm:text-xl text-foreground leading-snug group-hover:opacity-70 transition-opacity">
              {study.name}
            </h3>
            <ArrowUpRight
              size={18}
              className="mt-0.5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{study.tagline}</p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {study.methods.slice(0, 3).map((m) => (
              <span key={m} className="tag-pill text-xs">
                {m}
              </span>
            ))}
          </div>
          <div className="pt-1 text-sm font-medium text-foreground group-hover:underline underline-offset-4">
            Read case study →
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function BrandEdgeWork() {
  const [first, ...rest] = caseStudies;
  return (
    <section id="work" className="section-pad bg-secondary border-t border-border">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <span className="section-label">
              <span className="section-label-line" />
              Selected work
            </span>
            <h2 className="heading-section text-foreground mb-3">Case studies</h2>
            <p className="text-muted-foreground text-base max-w-xl leading-relaxed">
              Two live products and three conceptual studies — each documented end to end:
              problem, research, decisions, artifacts, and what I'd change.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            <WorkTile study={first} wide />
            {rest.map((study) => (
              <WorkTile key={study.slug} study={study} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
