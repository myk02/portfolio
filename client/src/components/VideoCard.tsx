import { useRef, useState } from "react";
import { ExternalLink, Play } from "lucide-react";
import { CONTACT } from "@/lib/site";
import { type ProofVideo } from "@/data/videos";
import { Surface } from "@/components/ui/section";

export default function VideoCard({ video, index }: { video: ProofVideo; index: number }) {
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
        {playing ? (
          <video
            ref={videoRef}
            playsInline
            controls
            autoPlay
            preload="metadata"
            poster={video.poster}
            aria-label={`${video.title} (${video.duration})`}
            onEnded={() => setPlaying(false)}
            className="h-full w-full object-cover"
          >
            <source src={video.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <>
            <img
              src={video.poster}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            />
            <span
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0"
              aria-hidden
            />
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
            className="inline-flex items-center gap-1.5 text-[0.8rem] font-medium text-foreground decoration-accent decoration-2 underline-offset-4 hover:underline"
          >
            Watch on TikTok <ExternalLink size={12} aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </Surface>
  );
}
