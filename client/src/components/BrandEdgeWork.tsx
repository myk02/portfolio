import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { caseStudies, type CaseStudy } from "@/data/caseStudies";
import { Reveal } from "@/components/Reveal";
import StatusBadge, { toneFromKind } from "@/components/engineering/StatusBadge";
import { type DeviceContent } from "@/components/artifacts/DeviceMockups";

interface TileArtProps {
  phone: DeviceContent;
  desktop: DeviceContent;
  bg?: string;
}

/**
 * Tile art — the design shown large (desktop fills the tile so its content is
 * readable) with the phone view overlaid, instead of a tiny three-device trio.
 */
function TileArt({ phone, desktop, bg = "#f4efe7" }: TileArtProps) {
  return (
    <div
      className="w-full h-full relative tile-kb overflow-hidden transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
      style={{ background: bg }}
    >
      <div className="absolute inset-0">
        {"src" in desktop ? (
          <img
            src={desktop.src}
            alt={desktop.alt}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div className="w-full h-full">{desktop.node}</div>
        )}
      </div>
      <div className="absolute bottom-2.5 right-2.5 w-[24%] rounded-[12px] bg-[#141310] p-[3px] border border-black/15 shadow-[0_12px_28px_rgba(20,19,16,0.45)]">
        <div
          className="relative overflow-hidden rounded-[9px] bg-[#f4efe7]"
          style={{ aspectRatio: "9/17" }}
        >
          {"src" in phone ? (
            <img
              src={phone.src}
              alt={phone.alt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          ) : (
            <div className="absolute inset-0">{phone.node}</div>
          )}
        </div>
      </div>
    </div>
  );
}

const TILE_ART: Record<
  CaseStudy["art"],
  { bg: string; trio: () => { phone: DeviceContent; desktop: DeviceContent } }
> = {
  kenyatrace: {
    bg: "#efe9dd",
    trio: () => ({
      phone: {
        src: "/shots/kenyatrace/home-mobile.jpg",
        alt: "KenyaTrace home — mobile",
      },
      desktop: {
        src: "/shots/kenyatrace/home-cards-desktop.jpg",
        alt: "KenyaTrace home — destination cards on desktop",
      },
    }),
  },
  gigi: {
    bg: "#141310",
    trio: () => ({
      phone: {
        src: "/shots/gigi-energy/home-mobile.jpg",
        alt: "GiGi Energy storefront — mobile",
      },
      desktop: {
        src: "/shots/gigi-energy/home-products-desktop.jpg",
        alt: "GiGi Energy storefront — product grid on desktop",
      },
    }),
  },
  /* LegalFlow: add a "legalflow" entry with real screenshots from
     client/public/shots/legalflow/ once the deployment URL is live. */
  legalflow: {
    bg: "#141310",
    trio: () => ({
      phone: {
        src: "/shots/legalflow/home-mobile.jpg",
        alt: "LegalFlow — mobile",
      },
      desktop: {
        src: "/shots/legalflow/home-desktop.jpg",
        alt: "LegalFlow — desktop",
      },
    }),
  },
} as const;

function Artwork({ study }: { study: CaseStudy }) {
  const art = TILE_ART[study.art];
  const { phone, desktop } = art.trio();
  return <TileArt bg={art.bg} phone={phone} desktop={desktop} />;
}

function TileBody({ study }: { study: CaseStudy }) {
  return (
    <div className="p-5 space-y-3">
      <h3 className="font-display font-bold text-lg sm:text-xl text-foreground leading-snug">
        {study.name}
      </h3>
      <p className="text-sm text-muted-foreground leading-snug">
        {study.tileLine}
      </p>
      {/* Vital proof numbers */}
      <span className="inline-flex px-2 py-1 text-[10px] font-mono uppercase tracking-widest bg-accent/20 text-foreground border border-accent/40">
        {study.tileBadge}
      </span>
      {/* Descriptive, distinct link targets */}
      <div className="pt-1 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium">
        <Link
          href={`/work/${study.slug}`}
          className="inline-flex items-center gap-1.5 text-foreground transition-transform duration-300 group-hover:translate-x-1 underline-offset-4 hover:underline"
        >
          Case study
          <ArrowUpRight size={14} aria-hidden />
        </Link>
        {study.liveUrl && (
          <a
            href={study.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
          >
            Live site
            <span aria-hidden>↗</span>
          </a>
        )}
      </div>
    </div>
  );
}

function CardBadges({ study }: { study: CaseStudy }) {
  return (
    <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-[1]">
      <StatusBadge tone={toneFromKind(study.kind)} />
      <span className="px-2 py-1 text-[11px] font-mono tracking-widest uppercase bg-background/85 backdrop-blur border border-border text-foreground">
        {study.year}
      </span>
    </div>
  );
}

function CardShell({
  study,
  children,
}: {
  study: CaseStudy;
  children: React.ReactNode;
}) {
  return (
    <div className="group block h-full border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-foreground/40 hover:shadow-[0_16px_40px_-16px_rgba(10,10,10,0.3)]">
      <Link
        href={`/work/${study.slug}`}
        className="block relative aspect-[16/9] md:aspect-[16/8] overflow-hidden bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
        aria-label={`${study.name} — case study`}
      >
        <Artwork study={study} />
        <CardBadges study={study} />
        <span className="tile-flash" aria-hidden />
      </Link>
      {children}
    </div>
  );
}

function FeatureCard({ study }: { study: CaseStudy }) {
  return (
    <Reveal className="lg:col-span-2">
      <CardShell study={study}>
        <TileBody study={study} />
      </CardShell>
    </Reveal>
  );
}

function GridCard({ study, i }: { study: CaseStudy; i: number }) {
  return (
    <Reveal delay={i % 4} className="h-full">
      <CardShell study={study}>
        <TileBody study={study} />
      </CardShell>
    </Reveal>
  );
}

export default function BrandEdgeWork() {
  const live = caseStudies.filter(s => s.kind === "LIVE PRODUCT");
  const [featured, ...rest] = live;
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
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="heading-section text-foreground mb-3">
                  Shipped products
                </h2>
                <p className="text-muted-foreground text-sm max-w-md">
                  {live.length} live production apps — every one states its stack,
                  role, and measurable outcome.
                </p>
              </div>
              <Link
                href="/work"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors shrink-0"
              >
                View all work
                <ArrowUpRight size={14} aria-hidden />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
            {featured && <FeatureCard study={featured} />}
            {rest.map((study, i) => (
              <GridCard key={study.slug} study={study} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
