import { Link } from "wouter";
import { caseStudies } from "@/data/caseStudies";
import BankingArt from "@/components/art/BankingArt";
import MiniBankingScreens from "@/components/art/MiniBankingScreens";

function Thumb({ slug }: { slug: string }) {
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) return null;
  return (
    <Link
      href={`/work/${slug}`}
      className="group flex flex-col gap-2 w-[220px] sm:w-[240px] shrink-0"
    >
      <div className="border border-border bg-card p-3 overflow-hidden">
        {study.slug === "mobile-banking-redesign" ? (
          <div className="scale-[0.62] origin-top -mb-8">
            <MiniBankingScreens compact />
          </div>
        ) : study.image ? (
          <img
            src={study.image.replace(".png", "-640.webp")}
            srcSet={`${study.image.replace(".png", "-640.webp")} 640w, ${study.image.replace(".png", "-1200.webp")} 1200w`}
            sizes="240px"
            width={1200}
            height={750}
            alt=""
            loading="lazy"
            className="w-full aspect-[16/10] object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full aspect-[16/10] flex items-center justify-center bg-secondary">
            <span className="font-display font-black text-4xl text-foreground/20 tracking-tight">
              {study.name.split(" ").map((w) => w[0]).join("").slice(0, 3)}
            </span>
          </div>
        )}
      </div>
      <div>
        <p className="text-sm font-display font-bold text-foreground group-hover:underline underline-offset-4">
          {study.name}
        </p>
        <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mt-0.5">
          {study.year} · {study.kind}
        </p>
      </div>
    </Link>
  );
}

export default function MoreWork({ current }: { current: string }) {
  const others = caseStudies.filter((s) => s.slug !== current);
  return (
    <div className="mt-10">
      <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
        More work
      </p>
      <div className="flex gap-5 overflow-x-auto pb-3 snap-x">
        {others.map((s) => (
          <div key={s.slug} className="snap-start">
            <Thumb slug={s.slug} />
          </div>
        ))}
      </div>
    </div>
  );
}
