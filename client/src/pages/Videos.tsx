import { Link } from "wouter";
import SiteHead from "@/components/SiteHead";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import VideoCard from "@/components/VideoCard";
import { proofVideos } from "@/data/videos";
import { useReveal } from "@/hooks/useReveal";

export default function Videos() {
  useReveal();

  return (
    <div className="min-h-screen bg-secondary">
      <SiteHead
        title="Video Proof — Mike Waitindi"
        description="All short-form cybersecurity explainers from the AI with Mike channel."
        canonical="/videos"
        type="website"
      />

      <SiteHeader />

      <main id="main" tabIndex={-1} className="outline-none">
        <div className="container pt-24 pb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Home
          </Link>

          <div className="section-head mt-7">
            <div>
              <span className="section-label">
                <span className="section-label-line" aria-hidden /> Video proof
              </span>
              <h1 className="heading-section text-foreground">
                Watch the work
              </h1>
              <p className="mt-2 max-w-xl text-[0.92rem] leading-relaxed text-muted-foreground">
                Short scam breakdowns from the AI with Mike channel.
              </p>
            </div>
            <span className="section-note hidden sm:inline-block">
              {proofVideos.length} clips · AI with Mike
            </span>
          </div>

          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {proofVideos.map((video, i) => (
              <li key={video.slug} className="flex self-stretch">
                <VideoCard video={video} index={i} />
              </li>
            ))}
          </ul>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
