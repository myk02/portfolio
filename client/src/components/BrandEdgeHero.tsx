import { useRef } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

interface BrandEdgeHeroProps {
  onCtaClick: (id: string) => void;
}

export default function BrandEdgeHero({ onCtaClick }: BrandEdgeHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-[60vh] bg-secondary flex items-center overflow-hidden"
    >
      <div className="container relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] items-center gap-10 lg:gap-16 max-w-6xl mx-auto">
          <div className="py-12 lg:py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6"
            >
              <span className="section-label">
                <span className="section-label-line" />
                UI/UX Design | Product Strategy | Visual Thinking — Nairobi
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="heading-serif font-bold text-foreground"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
            >
              Mike Waitindi
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-muted-foreground text-lg leading-relaxed max-w-xl mt-4"
            >
              <span className="font-display font-semibold text-foreground block text-xl mb-1">
                UI/UX Designer &amp; Product Strategist
              </span>
              Designing intuitive, engaging digital experiences for mobile, web, and app environments.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-3 mt-8"
            >
              <button
                type="button"
                onClick={() => onCtaClick("work")}
                className="btn-accent"
              >
                View work
              </button>
              <button
                type="button"
                onClick={() => onCtaClick("contact")}
                className="btn-ghost"
              >
                Get in touch
              </button>
              <a
                href="/CV.pdf"
                download
                className="btn-ghost inline-flex items-center justify-center gap-2"
              >
                <Download size={15} />
                Download CV
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex gap-8 mt-12 pt-8 border-t border-border"
            >
              <div>
                <div className="font-display font-bold text-2xl text-foreground">4+</div>
                <div className="text-sm text-muted-foreground">Years experience</div>
              </div>
              <div>
                <div className="font-display font-bold text-2xl text-foreground">30+</div>
                <div className="text-sm text-muted-foreground">Projects delivered</div>
              </div>
              <div>
                <div className="font-display font-bold text-2xl text-foreground">7+</div>
                <div className="text-sm text-muted-foreground">Live websites</div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex justify-center py-12"
          >
            <div className="relative">
              <div className="absolute -top-3 -right-3 w-full h-full border border-accent" aria-hidden="true" />
              <img
                src="/miki.png"
                alt="Mike Waitindi — portrait"
                className="relative w-full max-w-sm h-auto object-cover border border-border"
              />
              <div className="absolute -bottom-3 -left-3 w-full h-full bg-foreground/5 border border-border" aria-hidden="true" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
