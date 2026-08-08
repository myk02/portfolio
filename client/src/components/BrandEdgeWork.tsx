import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { caseStudies, type CaseStudy } from "@/data/caseStudies";
import { Reveal } from "@/components/Reveal";
import {
  PhoneMockup,
  TabletMockup,
  DesktopMockup,
  type DeviceContent,
} from "@/components/artifacts/DeviceMockups";
import { BankingScreen } from "@/components/art/BankingResponsive";
import {
  DashboardScreen,
  DesignSystemScreen,
} from "@/components/art/ResponsiveConceptArt";
import { KenyaTraceScreen } from "@/components/art/KenyaTraceResponsive";
import { GigiScreen } from "@/components/art/GigiResponsive";

interface TileTrioProps {
  phone: DeviceContent;
  tablet: DeviceContent;
  desktop: DeviceContent;
  bg?: string;
}

function TileTrio({ phone, tablet, desktop, bg = "#f4efe7" }: TileTrioProps) {
  return (
    <div
      className="w-full h-full flex items-center justify-center gap-[2%] px-[3%] py-[5%] tile-kb transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
      style={{ background: bg }}
    >
      <PhoneMockup
        content={phone}
        className="w-full"
        // slightly larger phone frame for better legibility in tiles
        figureClassName="w-[26%]"
      />
      <TabletMockup
        content={tablet}
        className="w-full"
        // slightly larger tablet frame to match phone sizing
        figureClassName="w-[30%]"
      />
      <DesktopMockup
        content={desktop}
        className="w-full"
        figureClassName="w-[44%]"
      />
    </div>
  );
}

const TILE_ART = {
  banking: {
    bg: "#f4efe7",
    trio: () => ({
      phone: { node: <BankingScreen variant="mobile" screen="home" /> },
      tablet: { node: <BankingScreen variant="tablet" screen="home" /> },
      desktop: { node: <BankingScreen variant="desktop" screen="home" /> },
    }),
  },
  dashboard: {
    bg: "#141310",
    trio: () => ({
      phone: { node: <DashboardScreen variant="mobile" /> },
      tablet: { node: <DashboardScreen variant="tablet" /> },
      desktop: { node: <DashboardScreen variant="desktop" /> },
    }),
  },
  "design-system": {
    bg: "#f4efe7",
    trio: () => ({
      phone: { node: <DesignSystemScreen variant="mobile" /> },
      tablet: { node: <DesignSystemScreen variant="tablet" /> },
      desktop: { node: <DesignSystemScreen variant="desktop" /> },
    }),
  },
  kenyatrace: {
    bg: "#efe9dd",
    trio: () => ({
      phone: { node: <KenyaTraceScreen variant="mobile" screen="home" /> },
      tablet: { node: <KenyaTraceScreen variant="tablet" screen="home" /> },
      desktop: { node: <KenyaTraceScreen variant="desktop" screen="home" /> },
    }),
  },
  gigi: {
    bg: "#141310",
    trio: () => ({
      phone: { node: <GigiScreen variant="mobile" screen="storefront" /> },
      tablet: { node: <GigiScreen variant="tablet" screen="storefront" /> },
      desktop: { node: <GigiScreen variant="desktop" screen="storefront" /> },
    }),
  },
} as const;

function Artwork({ study }: { study: CaseStudy }) {
  const art = TILE_ART[study.art];
  const { phone, tablet, desktop } = art.trio();
  return (
    <TileTrio bg={art.bg} phone={phone} tablet={tablet} desktop={desktop} />
  );
}

function TileBody({ study }: { study: CaseStudy }) {
  return (
    <div className="p-5 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display font-bold text-lg sm:text-xl text-foreground leading-snug group-hover:opacity-70 transition-opacity">
          {study.name}
        </h3>
        <ArrowUpRight
          size={18}
          className="mt-0.5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      </div>
      <p className="text-sm text-muted-foreground leading-snug">
        {study.tileLine}
      </p>
      <span className="inline-flex px-2 py-1 text-[10px] font-mono uppercase tracking-widest bg-accent/20 text-foreground border border-accent/40">
        {study.tileBadge}
      </span>
      <div className="pt-1 text-sm font-medium text-foreground transition-transform duration-300 group-hover:translate-x-1">
        View case →
      </div>
    </div>
  );
}

function Badges({ study }: { study: CaseStudy }) {
  return (
    <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-[1]">
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
  );
}

function FeatureCard({ study }: { study: CaseStudy }) {
  return (
    <Reveal className="lg:col-span-2">
      <Link
        href={`/work/${study.slug}`}
        className="group block h-full border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-foreground/40 hover:shadow-[0_16px_40px_-16px_rgba(10,10,10,0.3)]"
      >
        <div className="relative aspect-[16/9] md:aspect-[16/8] overflow-hidden bg-muted">
          <Artwork study={study} />
          <Badges study={study} />
          <span className="tile-flash" aria-hidden />
        </div>
        <TileBody study={study} />
      </Link>
    </Reveal>
  );
}

function GridCard({ study, i }: { study: CaseStudy; i: number }) {
  return (
    <Reveal delay={i % 4}>
      <Link
        href={`/work/${study.slug}`}
        className="group block h-full border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-foreground/40 hover:shadow-[0_16px_40px_-16px_rgba(10,10,10,0.3)]"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <Artwork study={study} />
          <Badges study={study} />
          <span className="tile-flash" aria-hidden />
        </div>
        <TileBody study={study} />
      </Link>
    </Reveal>
  );
}

export default function BrandEdgeWork() {
  const [featured, ...rest] = caseStudies;
  return (
    <section
      id="work"
      className="section-pad bg-secondary border-t border-border"
    >
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <Reveal as="div" className="mb-10">
            <span className="section-label">
              <span className="section-label-line" />
              Selected work
            </span>
            <h2 className="heading-section text-foreground mb-3">
              Case studies
            </h2>
            <p className="text-muted-foreground text-sm max-w-md">
              Five studies. Watch how each was made.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
            <FeatureCard study={featured} />
            {rest.map((study, i) => (
              <GridCard key={study.slug} study={study} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
