import { ExternalLink } from "lucide-react";
import { CONTACT } from "@/lib/site";
import { proofVideos } from "@/data/videos";
import { Reveal } from "@/components/Reveal";
import { SectionLabel, Surface } from "@/components/ui/section";

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
          Short cybersecurity explainers from the AI with Mike channel —
          breaking down how common scams work so they are easier to spot.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {proofVideos.map((video, i) => (
            <Reveal key={video.slug} delay={i} className="h-full">
              <Surface className="group relative h-full flex flex-col overflow-hidden transition-all duration-200 hover:border-foreground/20 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_rgba(10,10,10,0.08)]">
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] bg-accent opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  aria-hidden
                />
                <div className="relative aspect-[9/16] overflow-hidden bg-muted">
                  <video
                    controls
                    playsInline
                    preload="none"
                    poster={video.poster}
                    aria-label={`${video.title} (${video.duration})`}
                    className="h-full w-full object-cover"
                  >
                    <source src={video.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="p-4.5 flex flex-col flex-1">
                  <div className="flex items-center justify-between gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                    <span>{video.tag}</span>
                    <span>{video.duration}</span>
                  </div>
                  <h3 className="mt-2 font-display font-semibold text-[1.05rem] leading-[1.2] tracking-[-0.015em] text-foreground">
                    {video.title}
                  </h3>
                  <p className="mt-2 text-[0.85rem] leading-relaxed text-muted-foreground">
                    {video.description}
                  </p>
                  <div className="pt-3.5 mt-auto border-t border-border">
                    <a
                      href={CONTACT.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[0.82rem] font-medium text-foreground underline-offset-4 hover:underline"
                    >
                      Watch on TikTok <ExternalLink size={13} aria-hidden />
                    </a>
                  </div>
                </div>
              </Surface>
            </Reveal>
          ))}
        </div>

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
