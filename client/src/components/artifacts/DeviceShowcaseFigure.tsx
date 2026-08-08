import type { ReactNode } from "react";
import { DeviceShowcase } from "@/components/artifacts/DeviceMockups";

/**
 * Shared framed figure — a caption + meta line on top, a phone/tablet/desktop
 * device trio in the middle (the same design in three viewports), and an
 * optional note underneath. Used by every project so the presentation stays
 * visually consistent across the portfolio.
 */
export function DeviceShowcaseFigure({
  title,
  meta,
  note,
  phone,
  tablet,
  desktop,
  phoneClassName = "w-[100px] sm:w-[120px]",
  tabletClassName = "w-[128px] sm:w-[158px]",
  desktopClassName = "w-[190px] sm:w-[260px]",
  showLabels = false,
  live,
}: {
  title: string;
  meta?: string;
  note?: string;
  phone: ReactNode;
  tablet: ReactNode;
  desktop: ReactNode;
  phoneClassName?: string;
  tabletClassName?: string;
  desktopClassName?: string;
  showLabels?: boolean;
  live?: boolean;
}) {
  return (
    <figure className="border border-border bg-card p-4 sm:p-6">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
        <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          {title}
        </span>
        <span className="flex items-center gap-2">
          {live && (
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-accent">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              Live product
            </span>
          )}
          {meta && (
            <span className="text-[10px] font-mono uppercase tracking-widest text-foreground/70">
              {meta}
            </span>
          )}
        </span>
      </figcaption>
      <DeviceShowcase
        showLabels={showLabels}
        phone={{ node: phone }}
        tablet={{ node: tablet }}
        desktop={{ node: desktop }}
        phoneClassName={phoneClassName}
        tabletClassName={tabletClassName}
        desktopClassName={desktopClassName}
      />
      {note && (
        <p className="mt-3 text-[11px] text-muted-foreground leading-snug">{note}</p>
      )}
    </figure>
  );
}

/** Compact variant used inside the UI chapter's screen grid. */
export function DeviceShowcaseCell({
  name,
  note,
  phone,
  tablet,
  desktop,
}: {
  name: string;
  note?: string;
  phone: ReactNode;
  tablet: ReactNode;
  desktop: ReactNode;
}) {
  return (
    <figure className="border border-border bg-secondary p-3 sm:p-4">
      <p className="text-[10px] font-mono uppercase tracking-widest text-foreground mb-2">
        {name}
      </p>
      <DeviceShowcase
        showLabels={false}
        phone={{ node: phone }}
        tablet={{ node: tablet }}
        desktop={{ node: desktop }}
        phoneClassName="w-[88px]"
        tabletClassName="w-[112px]"
        desktopClassName="w-[168px]"
      />
      {note && (
        <p className="mt-2.5 text-[11px] text-muted-foreground leading-snug">{note}</p>
      )}
    </figure>
  );
}
