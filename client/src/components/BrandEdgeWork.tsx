import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { caseStudies, type CaseStudy } from "@/data/caseStudies";
import { Reveal } from "@/components/Reveal";
import { Chip, ChipAccent } from "@/components/ui/kicker";
import StatusBadge, { toneFromKind } from "@/components/engineering/StatusBadge";
import { type DeviceContent } from "@/components/artifacts/DeviceMockups";

function TileArt({ phone, desktop, bg = "#f4efe7" }: { phone: DeviceContent; desktop: DeviceContent; bg?: string }) {
  return (
    <div className="w-full h-full relative overflow-hidden" style={{ background: bg }}>
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

function TileBody({ study, index }: { study: CaseStudy; index: number }) {
  return (
    <div className="p-5 sm:p-6 space-y-3 flex flex-col flex-1">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold tracking-widest px-1.5 py-1 bg-foreground text-background">
            0{index + 1}
          </span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            {study.timeline} · {study.year}
          </span>
        </div>
        <span className="hidden sm:inline-flex text-[10px] font-mono uppercase tracking-widest px-2 py-1 border border-border bg-card text-muted-foreground">
          {study.stack[0]}
        </span>
      </div>

      <h3 className="font-display font-black text-[19px] sm:text-[21px] text-foreground leading-none tracking-tight">
        {study.name}
      </h3>
      <p className="text-sm text-muted-foreground leading-snug line-clamp-2">
        {study.tileLine}
      </p>

      <div className="flex flex-wrap gap-1.5">
        <ChipAccent>{study.tileBadge}</ChipAccent>
        <Chip>{study.role}</Chip>
      </div>

      <div className="pt-3 mt-auto border-t border-border flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium">
        <Link
          href={`/work/${study.slug}`}
          className="inline-flex items-center gap-1.5 text-foreground underline-offset-4 hover:underline group-hover:translate-x-0.5 transition-transform"
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
            <ExternalLink size={13} aria-hidden />
            Live site
          </a>
        )}
      </div>
    </div>
  );
}

function CardBadges({ study }: { study: CaseStudy }) {
  return (
    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
      <StatusBadge tone={toneFromKind(study.kind)} />
      <span className="px-2 py-1 text-[11px] font-mono tracking-widest uppercase bg-background/90 backdrop-blur border border-border text-foreground">
        {study.year}
      </span>
    </div>
  );
}

function CardShell({
  study,
  index,
}: {
  study: CaseStudy;
  index: number;
}) {
  return (
    <div className="group relative h-full border border-border bg-card flex flex-col overflow-hidden transition-colors duration-200 hover:border-foreground/20">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-accent opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden />
      <Link
        href={`/work/${study.slug}`}
        className="block relative aspect-[16/9.2] overflow-hidden bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
        aria-label={`${study.name} — case study`}
      >
        <Artwork study={study} />
        <CardBadges study={study} />
        <span className="absolute inset-0 border border-transparent group-hover:border-accent/40 transition-colors pointer-events-none" aria-hidden />
      </Link>
      <TileBody study={study} index={index} />
    </div>
  );
}

export default function BrandEdgeWork() {
  const live = caseStudies.filter(s => s.kind === "LIVE PRODUCT");
  return (
    <section
      id="work"
      className="section-pad bg-secondary border-t border-border relative"
    >
      {/* subtle top accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-accent/40" aria-hidden />
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <Reveal as="div" className="mb-10">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="section-label">
                  <span className="section-label-line" />
                  Selected work · 0{live.length}
                </span>
                <h2
                  className="heading-section text-foreground mt-2"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  Shipped <span className="relative inline-block"><span className="relative z-10 text-accent-foreground px-1">products</span><span aria-hidden className="absolute left-0 right-0 bottom-[0.15em] h-[0.55em] bg-accent -z-0" /></span>
                </h2>
                <p className="text-muted-foreground text-sm max-w-[520px] mt-3 leading-relaxed">
                  Live apps — each with stack, role, and the decision that moved the work forward.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["React 19", "TypeScript", "Playwright", "Vercel"].map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-start sm:items-end gap-3 shrink-0">
                <Link
                  href="/work"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground border border-foreground px-4 py-2.5 hover:bg-foreground hover:text-background transition-colors"
                >
                  View all work
                  <ArrowUpRight size={14} aria-hidden />
                </Link>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
            {live.map((study, i) => (
              <Reveal key={study.slug} delay={i} className="h-full">
                <CardShell study={study} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
