import { Link } from "wouter";
import SiteHead from "@/components/SiteHead";
import { Surface } from "@/components/ui/section";

export default function NotFound() {
  return (
    <main className="min-h-screen grid place-items-center bg-secondary px-6 relative overflow-hidden">
      <SiteHead
        title="404 — Page not found | Mike Waitindi"
        description="Page not found."
        canonical="/404"
        noindex
      />
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" aria-hidden>
        <div
        className="w-full h-full text-foreground"
        style={{
          backgroundImage:
            "linear-gradient(color-mix(in srgb, currentColor 80%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, currentColor 80%, transparent) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
    </div>
      <div className="relative max-w-lg w-full">
        <Surface className="p-8 sm:p-10 text-center">
          <div className="inline-flex items-center gap-2 border border-accent bg-accent/10 px-3 py-1.5 mb-6">
            <span className="w-2 h-2 bg-accent" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-foreground">404 — Not found</span>
          </div>
          <h1 className="font-display font-semibold text-foreground leading-none tracking-[-0.02em]">
            <span className="block text-5xl sm:text-6xl" style={{ lineHeight: 0.95 }}>
              404
            </span>
            <span className="mt-3 block text-[1.35rem] sm:text-[1.6rem] leading-tight">
              Page not found<span className="text-accent">.</span>
            </span>
          </h1>
          <ul className="mt-4 text-[0.9375rem] text-muted-foreground leading-relaxed max-w-sm mx-auto list-disc list-inside space-y-1 text-left">
            <li>Page moved or missing</li>
            <li>Back home or view live work</li>
          </ul>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="btn btn-primary justify-center">
              ← Back home
            </Link>
            <Link href="/work" className="btn btn-secondary justify-center">
              View work
            </Link>
          </div>
        </Surface>
        <p className="text-center text-[11px] font-mono uppercase tracking-widest text-muted-foreground mt-4">
          If you typed the URL, check the spelling — case matters.
        </p>
      </div>
    </main>
  );
}
