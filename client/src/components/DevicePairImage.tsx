/** Mobile + desktop screenshot pair for process / journey frames */
export default function DevicePairImage({
  mobile,
  desktop,
  alt = "",
  tall = false,
}: {
  mobile: string;
  desktop: string;
  alt?: string;
  tall?: boolean;
}) {
  return (
    <div
      className={`flex items-end justify-center gap-1.5 sm:gap-2 w-full h-full p-1 sm:p-1.5 bg-[#1a1a1a]/5 ${
        tall ? "min-h-[140px]" : ""
      }`}
    >
      <figure className="flex flex-col items-center gap-0.5 h-full max-h-full">
        <div className="relative h-[calc(100%-14px)] max-h-[120px] sm:max-h-[140px] aspect-[9/17] rounded-[8px] sm:rounded-[10px] border border-foreground/15 bg-[#141310] p-[2px] shadow-sm overflow-hidden">
          <img
            src={mobile}
            alt={alt ? `${alt} — mobile` : "Mobile screen"}
            className="w-full h-full object-cover object-top rounded-[6px] sm:rounded-[8px]"
            loading="lazy"
          />
        </div>
        <figcaption className="text-[6px] sm:text-[7px] font-mono uppercase tracking-wider text-muted-foreground">
          Mobile
        </figcaption>
      </figure>
      <figure className="flex flex-col items-center gap-0.5 h-full max-h-full flex-1 min-w-0">
        <div className="relative w-full h-[calc(100%-14px)] max-h-[90px] sm:max-h-[110px] rounded-[4px] sm:rounded-[6px] border border-foreground/15 overflow-hidden shadow-sm bg-secondary">
          <img
            src={desktop}
            alt={alt ? `${alt} — desktop` : "Desktop screen"}
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
        </div>
        <figcaption className="text-[6px] sm:text-[7px] font-mono uppercase tracking-wider text-muted-foreground">
          Desktop
        </figcaption>
      </figure>
    </div>
  );
}

export function ProcessShot({
  slug,
  stage,
  alt,
}: {
  slug: string;
  stage: string;
  alt?: string;
}) {
  const base = `/process/${slug}/${stage}`;
  return (
    <DevicePairImage
      mobile={`${base}-mobile.png`}
      desktop={`${base}-desktop.png`}
      alt={alt ?? stage}
      tall
    />
  );
}
