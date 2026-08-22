import { useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import BrandEdgeHeader from "@/components/BrandEdgeHeader";
import BrandEdgeHero from "@/components/BrandEdgeHero";
import BrandEdgeWork from "@/components/BrandEdgeWork";
import EngineeringEvidence from "@/components/engineering/EvidenceSection";
import BrandEdgeAbout from "@/components/BrandEdgeAbout";
import BrandEdgeContact from "@/components/BrandEdgeContact";
import BrandEdgeFooter from "@/components/BrandEdgeFooter";
import SiteHead, { DEFAULT_HEAD } from "@/components/SiteHead";
import { consumePendingSection } from "@/lib/navigation";
import { useReveal } from "@/hooks/useReveal";

export default function Home() {
  useReveal();
  const [location] = useLocation();

  const scrollToSection = useCallback((id: string) => {
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  /* Always start at hero on fresh load; only scroll to section when navigating from another page */
  useEffect(() => {
    window.scrollTo(0, 0);
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
      <div className="noise-overlay" />

      <BrandEdgeHeader onNavClick={scrollToSection} />

      <main>
        <BrandEdgeHero onCtaClick={scrollToSection} />
        <BrandEdgeWork />
        <EngineeringEvidence />
        <BrandEdgeAbout />
        <BrandEdgeContact />
      </main>

      <BrandEdgeFooter onNavClick={scrollToSection} />
    </div>
  );
}
