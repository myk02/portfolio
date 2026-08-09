import { ZoomImage } from "@/components/Lightbox";
import {
  DeviceShowcase,
  PhoneMockup,
  TabletMockup,
  DesktopMockup,
} from "@/components/artifacts/DeviceMockups";
import type { Shot } from "@/data/caseVisuals";

/** One wide screenshot in a bordered frame, with a caption. Opens in the lightbox. */
export function ShotFigure({
  src,
  alt,
  caption,
  eager = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  eager?: boolean;
}) {
  return (
    <figure className="border border-border bg-card p-3">
      <ZoomImage
        src={src}
        alt={alt}
        caption={caption ?? alt}
        loading={eager ? "eager" : "lazy"}
        imgClassName="w-full h-auto"
      />
      {caption && (
        <figcaption className="mt-2.5 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Hero design shown inside phone + tablet + desktop mockups so the employer
 * sees how the shipped design behaves across viewports. Clicking any device
 * opens that screenshot in the lightbox.
 */
export function HeroDeviceShowcase({
  hero,
  live,
}: {
  hero: NonNullable<import("@/data/caseVisuals").StudyVisuals["hero"]>;
  live?: boolean;
}) {
  const { mobile, tablet, desktop, alt, caption } = hero;
  return (
    <figure className="border border-border bg-card p-4 sm:p-6">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
        <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          {caption}
        </span>
        {live && (
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-accent">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Live product
          </span>
        )}
      </figcaption>
      <DeviceShowcase
        phone={{ src: mobile, alt: `${alt} — mobile` }}
        tablet={{ src: tablet, alt: `${alt} — tablet` }}
        desktop={{ src: desktop, alt: `${alt} — desktop` }}
        phoneClassName="w-[170px] sm:w-[200px]"
        tabletClassName="w-[220px] sm:w-[260px]"
        desktopClassName="w-[400px] sm:w-[520px]"
      />
    </figure>
  );
}

/**
 * Shipped screens — each distinct screen shown as a mobile + tablet + desktop
 * device trio, so the responsive behaviour is visible at a glance.
 */
export function DeviceShots({
  shots,
  title = "Shipped screens — one design, three viewports",
}: {
  shots: Shot[];
  title?: string;
}) {
  return (
    <figure className="border border-border bg-card p-4 sm:p-6">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
        <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          {title}
        </span>
        <span className="text-[10px] font-mono uppercase tracking-widest text-foreground/70">
          {shots.length} screens · mobile · tablet · desktop
        </span>
      </figcaption>

      <div className="grid grid-cols-1 gap-5 sm:gap-6">
        {shots.map(s => (
          <figure
            key={s.name}
            className="border border-border bg-secondary p-3 sm:p-4"
          >
            <p className="text-[10px] font-mono uppercase tracking-widest text-foreground mb-2">
              {s.name}
            </p>
            {/* desktop fills the column so the interface content is legible */}
            <DesktopMockup
              content={{ src: s.desktop, alt: `${s.alt} — desktop` }}
              className="w-full"
            />
            <div className="mt-3 flex flex-wrap items-start gap-4 sm:gap-5">
              <PhoneMockup
                content={{ src: s.mobile, alt: `${s.alt} — mobile` }}
                className="w-[200px] sm:w-[240px]"
              />
              <TabletMockup
                content={{ src: s.tablet, alt: `${s.alt} — tablet` }}
                className="w-[260px] sm:w-[320px]"
              />
            </div>
            <p className="mt-2.5 text-[11px] text-muted-foreground leading-snug">
              {s.caption}
            </p>
          </figure>
        ))}
      </div>
    </figure>
  );
}
