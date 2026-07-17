import { useRef } from "react";
import { motion } from "framer-motion";

interface BrandEdgeHeroProps {
  onCtaClick: (id: string) => void;
}

const heroWords = [
  { text: "Create.", highlight: false, italic: false },
  { text: "Elevate.", highlight: false, italic: false },
  { text: "Convert.", highlight: true, italic: true },
];

export default function BrandEdgeHero({ onCtaClick }: BrandEdgeHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-[50vh] bg-primary flex items-center overflow-hidden"
    >
      <div className="grid-overlay" />

      <div className="container relative z-10 w-full">
        <div className="max-w-lg mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-0">
          <div className="flex-1 py-8 lg:py-0">
            <div className="section-label text-accent mb-2">
              <span className="section-label-line" />
              AI workflows | design | dev | marketing — Nairobi
            </div>

            <h1 className="heading-serif text-secondary" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
              {heroWords.map((word, i) => (
                <motion.span
                  key={word.text}
                  className={`inline-block overflow-hidden ${i > 0 ? "ml-[0.15em]" : ""}`}
                >
                  <motion.span
                    initial={{ y: "110%", opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: i * 0.12,
                      ease: [0.16, 1, 0.3, 1],
                      duration: 0.7,
                    }}
                    className={`inline-block ${
                      word.highlight ? "text-accent" : ""
                    } ${word.italic ? "italic font-light" : "font-bold"}`}
                  >
                    {word.text}
                  </motion.span>
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-secondary/60 font-sans text-[15px] leading-relaxed max-w-lg mt-3"
            >
              Developer, designer & Automation Specialist. Brand direction, web apps, AI automation, and launch-ready digital experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-2 mt-4"
            >
              <button
                type="button"
                onClick={() => onCtaClick("work")}
                className="btn-ghost text-secondary border-secondary/30 hover:bg-accent hover:text-primary hover:border-accent"
              >
                View projects
              </button>
              <button
                type="button"
                onClick={() => onCtaClick("contact")}
                className="btn-accent"
              >
                Get in touch →
              </button>
            </motion.div>
          </div>

          <div className="flex-shrink-0 self-center lg:self-auto lg:absolute lg:right-[8%] lg:top-1/2 lg:-translate-y-1/2">
            <div className="w-[70px] sm:w-[90px] lg:w-[140px] aspect-square overflow-hidden [clip-path:circle(50%)]">
              <img
                src="/mike.png"
                alt="Mike Waitindi"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-4 left-4 lg:left-6"
      >
        <div className="scroll-indicator">
          <span className="font-mono text-[12px] tracking-[0.4em] text-secondary/50">SCROLL</span>
          <div className="scroll-line">
            <div className="scroll-line-fill" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
