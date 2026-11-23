import { useRef, useState } from "react";
import { ChevronDown, ExternalLink, Play } from "lucide-react";
import { CONTACT } from "@/lib/site";
import { proofVideos, type ProofVideo } from "@/data/videos";
import { Reveal } from "@/components/Reveal";
import { SectionLabel, Surface } from "@/components/ui/section";

function VideoCard({ video, index }: { video: ProofVideo; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const start = () => {
    setPlaying(true);
    void videoRef.current?.play();
  };

  return (
    <Surface className="group relative flex h-full w-full flex-col overflow-hidden transition-all duration-300 hover:border-foreground/30 hover:-translate-y-1 hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.12)]">
      <div
        className="absolute top-0 left-0 right-0 h-[3px] bg-accent opacity-0 group-hover:opacity-100 transition-opacity z-10"
        aria-hidden
      />
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        <video
          ref={videoRef}
          playsInline
          controls
          preload="none"
          poster={video.poster}
          aria-label={`${video.title} (${video.duration})`}
          onEnded={() => setPlaying(false)}
          className="h-full w-full object-cover"
        >
          <source src={video.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {!playing && (
          <>
            <button
              type="button"
              onClick={start}
              aria-label={`Play ${video.title}`}
              className="absolute inset-0 flex items-center justify-center bg-black/15 transition-all duration-300 hover:bg-black/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-black/60 text-white backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent">
                <Play size={18} fill="currentColor" aria-hidden className="ml-0.5" />
              </span>
            </button>
            <span className="absolute bottom-2.5 right-2.5 px-1.5 py-0.5 bg-black/80 backdrop-blur-sm text-white font-mono text-[9px] font-medium tracking-wider pointer-events-none z-10 border border-white/10">
              {video.duration}
            </span>
          </>
        )}
      </div>
      <div className="p-3.5 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
          <span className="flex items-center gap-1.5 truncate">
            <span className="text-foreground font-semibold">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span aria-hidden className="text-border">·</span>
            <span className="truncate text-foreground/80">{video.tag}</span>
          </span>
          <span className="shrink-0 text-muted-foreground/70">{video.duration}</span>
        </div>
        <h3 className="mt-2 font-display font-semibold text-[0.95rem] leading-[1.2] tracking-[-0.015em] text-foreground group-hover:text-foreground/90">
          {video.title}
        </h3>
        <div className="pt-3 mt-auto border-t border-border/80">
          <a
            href={CONTACT.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[0.8rem] font-medium text-foreground underline-offset-4 hover:underline group-hover:text-accent-foreground transition-colors"
          >
            Watch on TikTok <ExternalLink size={12} aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </Surface>
  );
}

/** Video proof: short cybersecurity explainers published on the AI with Mike channel. */
export default function VideoProof() {
  const [showAll, setShowAll] = useState(true);

  return (
    <section
      id="proof"
      aria-labelledby="proof-heading"
      className="section-pad bg-secondary border-t border-border"
    >
      <div className="container">
        <Reveal className="section-head">
          <div>
            <SectionLabel>Proof · On camera</SectionLabel>
            <h2 id="proof-heading" className="heading-section text-foreground">
              Watch the work
            </h2>
          </div>
          <span className="section-note hidden sm:inline-block">
            Short-form · TikTok
          </span>
        </Reveal>

        <p className="mx-auto mb-8 max-w-md text-center text-[0.88rem] leading-relaxed text-muted-foreground">
          Short scam breakdowns · <strong className="text-foreground font-medium">AI with Mike</strong>
        </p>

        <Reveal>
          <ul
            className={
              showAll
                ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "carousel-mask -mx-2 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-2 pb-4 xl:justify-center"
            }
          >
            {proofVideos.map((video, i) => (
              <li
                key={video.slug}
                className={showAll ? "flex self-stretch" : "flex w-[190px] shrink-0 snap-start self-stretch sm:w-[210px]"}
              >
                <VideoCard video={video} index={i} />
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setShowAll((value) => !value)}
            aria-expanded={showAll}
            className="inline-flex items-center gap-2 border border-border bg-card px-4 py-2 text-[0.85rem] font-medium text-foreground transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
          >
            {showAll ? "Browse as carousel" : `View all ${proofVideos.length} videos`}
            <ChevronDown size={14} aria-hidden className={`transition-transform ${showAll ? "rotate-180" : ""}`} />
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          More on{" "}
          <a
            href={CONTACT.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            TikTok @littlabs
          </a>
        </p>
      </div>
    </section>
  );
}
