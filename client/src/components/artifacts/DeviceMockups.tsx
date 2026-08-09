import type { ReactNode } from "react";
import { ZoomImage } from "@/components/Lightbox";

/** A device screen holds either a real screenshot (src) or a rendered node (art). */
export type DeviceContent = { src: string; alt: string } | { node: ReactNode };

function Screen({
  content,
  radius,
  className,
}: {
  content: DeviceContent;
  radius: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-[#f4efe7] ${radius} ${className}`}
    >
      {"src" in content ? (
        <ZoomImage
          src={content.src}
          alt={content.alt}
          caption={content.alt}
          loading="lazy"
          quiet
          className="h-full"
          imgClassName="h-full object-cover object-top"
        />
      ) : (
        <div className="w-full h-full">{content.node}</div>
      )}
    </div>
  );
}

function Label({ children }: { children?: ReactNode }) {
  if (!children) return null;
  return (
    <figcaption className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground text-center">
      {children}
    </figcaption>
  );
}

/** Realistic phone frame with dynamic island, side buttons and a soft drop shadow. */
export function PhoneMockup({
  content,
  label = "Mobile",
  className = "w-full",
  figureClassName,
}: {
  content: DeviceContent;
  label?: string;
  className?: string;
  figureClassName?: string;
}) {
  return (
    <figure
      className={`flex flex-col items-center gap-2 shrink-0 ${figureClassName ?? ""}`}
    >
      <div
        className={`relative rounded-[26px] border border-black/15 bg-[#141310] p-[5px] shadow-[0_20px_45px_-14px_rgba(20,19,16,0.45)] ${className}`}
      >
        <span className="absolute -left-[3px] top-[72px] w-[3px] h-8 rounded-l bg-[#2a2a28]" />
        <span className="absolute -left-[3px] top-[118px] w-[3px] h-12 rounded-l bg-[#2a2a28]" />
        <span className="absolute -right-[3px] top-[84px] w-[3px] h-14 rounded-r bg-[#2a2a28]" />
        <Screen
          content={content}
          radius="rounded-[20px]"
          className="w-full aspect-[9/17]"
        />
        <span className="absolute left-1/2 top-[13px] -translate-x-1/2 w-9 h-[7px] rounded-full bg-black/90" />
      </div>
      <Label>{label}</Label>
    </figure>
  );
}

/** Realistic tablet frame with a front camera dot and a soft drop shadow. */
export function TabletMockup({
  content,
  label = "Tablet",
  className = "w-full",
  figureClassName,
}: {
  content: DeviceContent;
  label?: string;
  className?: string;
  figureClassName?: string;
}) {
  return (
    <figure
      className={`flex flex-col items-center gap-2 shrink-0 ${figureClassName ?? ""}`}
    >
      <div
        className={`relative rounded-[22px] border border-black/15 bg-[#141310] p-[7px] shadow-[0_20px_45px_-14px_rgba(20,19,16,0.45)] ${className}`}
      >
        <Screen
          content={content}
          radius="rounded-[14px]"
          className="w-full aspect-[3/4]"
        />
        <span className="absolute left-1/2 top-[11px] -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-black/70" />
      </div>
      <Label>{label}</Label>
    </figure>
  );
}

/** Desktop monitor with a stand. `aspect` is "aspect-auto" for fluid concept art. */
export function DesktopMockup({
  content,
  label = "Desktop",
  className = "w-full",
  aspect = "aspect-[16/10]",
  showStand = true,
  figureClassName,
}: {
  content: DeviceContent;
  label?: string;
  className?: string;
  aspect?: string;
  showStand?: boolean;
  figureClassName?: string;
}) {
  return (
    <figure
      className={`flex flex-col items-center gap-2 shrink-0 ${figureClassName ?? ""}`}
    >
      <div
        className={`relative rounded-[10px] border border-black/15 bg-[#141310] p-[8px] shadow-[0_20px_45px_-14px_rgba(20,19,16,0.45)] ${className}`}
      >
        <Screen
          content={content}
          radius="rounded-[4px]"
          className={`w-full ${aspect}`}
        />
      </div>
      {showStand && (
        <div className="flex flex-col items-center -mt-1.5">
          <div className="w-[28%] h-5 bg-[#2a2a28]" />
          <div className="w-[74%] h-1.5 bg-[#2a2a28] rounded-b" />
        </div>
      )}
      <Label>{label}</Label>
    </figure>
  );
}

/**
 * Device showcase — the same design in mobile, tablet and desktop mockups.
 * Best practice: consistent frame style, device as a supporting actor, labelled viewports.
 */
export function DeviceShowcase({
  phone,
  tablet,
  desktop,
  className = "",
  showLabels = true,
  phoneClassName = "w-20 sm:w-28",
  tabletClassName = "w-24 sm:w-36",
  desktopClassName = "w-36 sm:w-64",
  phoneFigureClassName,
  tabletFigureClassName,
  desktopFigureClassName,
}: {
  phone?: DeviceContent;
  tablet?: DeviceContent;
  desktop?: DeviceContent;
  className?: string;
  showLabels?: boolean;
  phoneClassName?: string;
  tabletClassName?: string;
  desktopClassName?: string;
  phoneFigureClassName?: string;
  tabletFigureClassName?: string;
  desktopFigureClassName?: string;
}) {
  return (
    <div
      className={`relative flex flex-wrap items-end justify-center gap-3 sm:gap-5 px-1 pt-5 pb-1 ${className}`}
    >
      <div
        aria-hidden
        className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-[82%] h-3 rounded-full bg-foreground/10 blur-md"
      />
      {phone && (
        <PhoneMockup
          content={phone}
          label={showLabels ? "Mobile · 390×844" : undefined}
          className={phoneClassName}
          figureClassName={phoneFigureClassName}
        />
      )}
      {tablet && (
        <TabletMockup
          content={tablet}
          label={showLabels ? "Tablet · 834×1112" : undefined}
          className={tabletClassName}
          figureClassName={tabletFigureClassName}
        />
      )}
      {desktop && (
        <DesktopMockup
          content={desktop}
          label={showLabels ? "Desktop · 1440×900" : undefined}
          className={desktopClassName}
          figureClassName={desktopFigureClassName}
        />
      )}
    </div>
  );
}
