import { useEffect, useCallback } from "react";
import BrandEdgeHeader from "@/components/BrandEdgeHeader";
import BrandEdgeHero, { SkillMarquee } from "@/components/BrandEdgeHero";
import BrandEdgeWork from "@/components/BrandEdgeWork";
import UXProcessSection from "@/components/UXProcessSection";
import DesignPlaybook from "@/components/DesignPlaybook";
import BrandEdgeAbout from "@/components/BrandEdgeAbout";
import BrandEdgeContact from "@/components/BrandEdgeContact";
import BrandEdgeFooter from "@/components/BrandEdgeFooter";
import { consumePendingSection } from "@/lib/navigation";
import { useReveal } from "@/hooks/useReveal";

export default function Home() {
  useReveal();
  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const pending = consumePendingSection();
    if (pending) {
      const t = window.setTimeout(() => {
        document.getElementById(pending)?.scrollIntoView({ behavior: "smooth" });
      }, 120);
      return () => window.clearTimeout(t);
    }
  }, []);

  return (
    <div className="min-h-screen bg-secondary">
      <div className="noise-overlay" />

      <BrandEdgeHeader onNavClick={scrollToSection} />

      <main>
        <BrandEdgeHero onCtaClick={scrollToSection} />
        <SkillMarquee />
        <BrandEdgeWork />
        <UXProcessSection />
        <DesignPlaybook />
        <BrandEdgeAbout />
        <BrandEdgeContact />
      </main>

      <BrandEdgeFooter onNavClick={scrollToSection} />
    </div>
  );
}
