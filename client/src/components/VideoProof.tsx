import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { proofVideos } from "@/data/videos";
import VideoCard from "@/components/VideoCard";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/ui/section";

/** Compact teaser on the landing page; the full library lives at /videos. */
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
            <SectionLabel>Video proof</SectionLabel>
            <h2 id="proof-heading" className="heading-section text-foreground">
              Watch the work
            </h2>
          </div>
          <Link
            href="/videos"
            className="section-note hidden items-center gap-1.5 sm:inline-flex hover:text-foreground transition-colors"
          >
            All {proofVideos.length} videos
            <ArrowUpRight size={13} aria-hidden />
          </Link>
        </Reveal>

        <Reveal>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {proofVideos.slice(0, 3).map((video, i) => (
              <li key={video.slug} className="flex self-stretch">
                <VideoCard video={video} index={i} />
              </li>
            ))}
          </ul>
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
