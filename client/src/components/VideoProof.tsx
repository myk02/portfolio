import { useRef, useState } from "react";
import { ExternalLink, Play } from "lucide-react";
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
    <Surface className="group relative flex w-[180px] shrink-0 flex-col overflow-hidden transition-all duration-200 hover:border-foreground/20 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_rgba(10,10,10,0.08)] sm:w-[200px]">
      <div
        className="absolute top-0 left-0 right-0 h-[3px] bg-accent opacity-0 group-hover:opacity-100 transition-opacity z-10"
        aria-hidden
      />
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <video
          ref={videoRef}
          playsInline
          preload="none"
          controls={playing}
          poster={video.poster}
          aria-label={`${video.title} (${video.duration})`}
          onEnded={() => setPlaying(false)}
          className="h-full w-full object-cover"
        >
          <source src={video.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {!playing && (
          <button
            type="button"
            onClick={start}
            aria-label={`Play ${video.title}`}
            className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors hover:bg-black/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/55 text-white backdrop-blur-sm transition-transform duration-200 group-hover:scale-105">
              <Play size={18} fill="currentColor" aria-hidden />
            </span>
          </button>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2 font-mono text-[8px] uppercase tracking-[0.12em] text-muted-foreground">
          <span className="flex items-center gap-1.5 truncate">
            <span className="text-foreground">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span aria-hidden>·</span>
            <span className="truncate">{video.tag}</span>
          </span>
          <span className="shrink-0">{video.duration}</span>
        </div>
        <h3 className="mt-2 font-display font-semibold text-[0.95rem] leading-[1.2] tracking-[-0.015em] text-foreground">
          {video.title}
        </h3>
        <p className="mt-2 text-[0.8rem] leading-relaxed text-muted-foreground line-clamp-2">
          {video.description}
        </p>
        <div className="pt-3 mt-auto border-t border-border">
          <a
            href={CONTACT.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[0.78rem] font-medium text-foreground underline-offset-4 hover:underline"
          >
            Watch on TikTok <ExternalLink size={12} aria-hidden />
          </a>
        </div>
      </div>
    </Surface>
  );
}

/** Video proof: short cybersecurity explainers published on the AI with Mike channel. */
export default function VideoProof() {
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
        </Reveal>

        <p className="mx-auto mb-8 max-w-xl text-center text-[0.92rem] leading-relaxed text-muted-foreground">
          Cybersecurity explainers from the <strong className="text-foreground font-medium">AI with Mike</strong> channel —
          breaking down how common scams, threats, and attacks work so they're easier to spot and stop.
        </p>

        <Reveal>
          <ul className="flex gap-4 overflow-x-auto pb-2 sm:justify-center">
            {proofVideos.map((video, i) => (
              <li key={video.slug} className="flex shrink-0">
                <VideoCard video={video} index={i} />
              </li>
            ))}
          </ul>
        </Reveal>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          More explainers on{" "}
          <a
            href={CONTACT.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            TikTok @aiwithmike1
          </a>
          .
        </p>
      </div>
    </section>
  );
}
