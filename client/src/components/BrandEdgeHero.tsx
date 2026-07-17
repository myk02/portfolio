import { useRef } from "react";
import { motion } from "framer-motion";

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
        <div className="max-w-2xl mx-auto">
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
                Design & Development
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
              Developer, designer, and automation specialist building brands, 
              web apps, and AI workflows from Nairobi.
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
        </div>
      </div>
    </section>
  );
}
