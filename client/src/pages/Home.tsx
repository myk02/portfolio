import { useEffect } from "react";
import { useLocation } from "wouter";
import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import WorkSection from "@/components/WorkSection";
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
        <About />
        <Contact />
      </main>

      <SiteFooter />
    </div>
  );
}
