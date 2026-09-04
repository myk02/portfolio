import { ZoomImage } from "@/components/Lightbox";
import type { Shot } from "@/data/projects";

/** One wide screenshot in a bordered frame. Opens in the lightbox. */
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

/** Remaining unique screens — flat, one src each, click-to-lightbox. */
export function DeviceShots({ shots }: { shots: Shot[] }) {
  return (
    <div className="space-y-5">
      <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
        Shipped screens · {shots.length}
      </p>
      <div className="grid grid-cols-1 gap-5">
        {shots.map((s) => (
          <ShotFigure
            key={s.src}
            src={s.src}
            alt={s.alt}
            caption={`${s.name} — ${s.caption}`}
          />
        ))}
      </div>
    </div>
  );
}
