import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import Cube3D from "./Cube3D";

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
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    setMouseX(x);
    setMouseY(y);
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReduced) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen bg-primary flex items-center overflow-hidden"
    >
      <div className="grid-overlay" />

      <div className="container relative z-10 w-full">
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-0">
          <div className="flex-1 max-w-[680px] py-20 lg:py-0">
            <div className="section-label text-accent mb-6">
              <span className="section-label-line" />
              Developer &amp; Designer — Nairobi
            </div>

            <h1 className="heading-serif text-secondary" style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}>
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
              className="text-secondary/60 font-sans text-sm leading-relaxed max-w-lg mt-6"
            >
              Developer, designer, and marketer for service businesses, startups, and growing brands. I deliver brand direction, user-focused interfaces, and launch-ready digital experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-3 mt-8"
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

          <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[45%] h-[70vh]">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <Cube3D mouseX={mouseX} mouseY={mouseY} />
            </Canvas>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-6 lg:left-10"
      >
        <div className="scroll-indicator">
          <span className="font-mono text-[10px] tracking-[0.4em] text-secondary/50">SCROLL</span>
          <div className="scroll-line">
            <div className="scroll-line-fill" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
