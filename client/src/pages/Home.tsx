import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import WorkSection from "@/components/WorkSection";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import SiteFooter from "@/components/SiteFooter";
import SiteHead, { DEFAULT_HEAD } from "@/components/SiteHead";
import { consumePendingSection, scrollToHomeSection } from "@/lib/navigation";
import { useReveal } from "@/hooks/useReveal";

export default function Home() {
  useReveal();
  const [location] = useLocation();

  useEffect(() => {
    const pending = consumePendingSection();
    if (pending && pending !== "home") {
      const t = window.setTimeout(() => {
        document.getElementById(pending)?.scrollIntoView({ behavior: "smooth" });
      }, 200);
      return () => window.clearTimeout(t);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-secondary">
      <SiteHead
        title={DEFAULT_HEAD.title}
        description={DEFAULT_HEAD.description}
        canonical="/"
      />

      <SiteHeader onNavClick={scrollToHomeSection} />

      <main id="main" tabIndex={-1} className="outline-none">
        <Hero onCtaClick={scrollToHomeSection} />
        <WorkSection />
        <section aria-label="AI Solutions" className="section-pad bg-secondary border-t border-border">
          <div className="container max-w-3xl text-center">
            <p className="text-sm text-muted-foreground">
              New: checked AI tools that show their sources —{" "}
              <Link href="/ai-solutions" className="underline underline-offset-4 text-foreground">
                try the Partner &amp; Proposal demo
              </Link>
              .
            </p>
          </div>
        </section>
        <Services />
        <About />
        <Contact />
      </main>

      <SiteFooter />
    </div>
  );
}
