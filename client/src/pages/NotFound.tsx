import { Link } from "wouter";
import SiteHead from "@/components/SiteHead";

export default function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center bg-secondary px-6 relative overflow-hidden">
      <SiteHead
        title="404 — Page not found | Mike Waitindi"
        description="Page not found."
        canonical="/404"
        noindex
      />
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" aria-hidden>
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(10,10,10,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,10,0.8) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>
      <div className="relative max-w-lg w-full">
        <div className="border border-border bg-card p-8 sm:p-10 text-center">
          <div className="inline-flex items-center gap-2 border border-accent bg-accent/10 px-3 py-1.5 mb-6">
            <span className="w-2 h-2 bg-accent" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-foreground">404 — Not found</span>
          </div>
          <h1 className="font-display font-black text-foreground leading-none tracking-tight" style={{ letterSpacing: "-0.03em" }}>
            <span className="block text-7xl sm:text-8xl" style={{ lineHeight: 0.9 }}>
              404
            </span>
            <span className="mt-3 block text-2xl sm:text-3xl font-bold">
              Page not found<span className="text-accent">.</span>
            </span>
          </h1>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has moved. Head back to the portfolio or explore the live work.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="btn btn-primary justify-center">
              ← Back home
            </Link>
            <Link href="/work" className="btn btn-secondary justify-center">
              View work
            </Link>
          </div>
        </div>
        <p className="text-center text-[11px] font-mono uppercase tracking-widest text-muted-foreground mt-4">
          If you typed the URL, check the spelling — case matters.
        </p>
      </div>
    </div>
  );
}
