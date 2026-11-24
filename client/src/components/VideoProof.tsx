import { useState, type CSSProperties } from "react";
import { Link } from "wouter";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { proofVideos } from "@/data/videos";
import VideoCard from "@/components/VideoCard";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/ui/section";

/** Compact teaser on the landing page; the full library lives at /videos. */
export default function VideoProof() {
  const [isPaused, setIsPaused] = useState(false);
  const [playingVideos, setPlayingVideos] = useState<Set<string>>(() => new Set());
  const marqueeStyle = {
    "--video-marquee-duration": `${Math.max(54, proofVideos.length * 7)}s`,
  } as CSSProperties;

  const setVideoPlaying = (slug: string, playing: boolean) => {
    setPlayingVideos(current => {
      const next = new Set(current);
      if (playing) next.add(slug);
      else next.delete(slug);
      return next;
    });
  };

  const videoCards = (duplicate = false) =>
    proofVideos.map((video, index) => (
      <li key={video.slug} className="video-marquee-card flex self-stretch">
        <VideoCard
          video={video}
          index={index}
          posterLoading={duplicate || index >= 3 ? "lazy" : "eager"}
          onPlayStateChange={duplicate ? undefined : setVideoPlaying}
        />
      </li>
    ));

  return (
    <section
      id="proof"
      aria-labelledby="proof-heading"
      className="section-pad bg-background border-t border-border"
    >
      <div className="container">
        <Reveal className="section-head">
          <div>
            <SectionLabel>Video proof</SectionLabel>
            <h2 id="proof-heading" className="heading-section text-foreground">
              Watch the work
            </h2>
            <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground">
              Short, practical scam breakdowns from AI with Mike.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsPaused(paused => !paused)}
              aria-pressed={isPaused}
              aria-label={isPaused ? "Resume video carousel" : "Pause video carousel"}
              className="video-marquee-toggle"
            >
              {isPaused ? <Play size={13} aria-hidden /> : <Pause size={13} aria-hidden />}
              <span>{isPaused ? "Resume" : "Pause"}</span>
            </button>
            <Link
              href="/videos"
              className="section-note hidden items-center gap-1.5 sm:inline-flex hover:text-foreground transition-colors"
            >
              All {proofVideos.length} videos
              <ArrowUpRight size={13} aria-hidden />
            </Link>
          </div>
        </Reveal>

        <Reveal>
          <div
            className="video-marquee-viewport carousel-mask"
            role="region"
            aria-label="Portfolio videos scrolling from right to left"
            data-playing={playingVideos.size > 0}
            data-paused={isPaused}
            tabIndex={0}
          >
            <div className="video-marquee-track" style={marqueeStyle}>
              <ul className="video-marquee-group" aria-label="Featured videos">
                {videoCards()}
              </ul>
              <ul className="video-marquee-group" aria-hidden="true" inert>
                {videoCards(true)}
              </ul>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 text-center">
          <Link
            href="/videos"
            className="inline-flex items-center gap-2 border border-border bg-card px-4 py-2 text-[0.85rem] font-medium text-foreground transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
          >
            View all {proofVideos.length} videos
            <ArrowUpRight size={14} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
