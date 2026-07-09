import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { capabilities } from "@/data/brandEdgeContent";

export default function BrandEdgeCapabilities() {
  const [openId, setOpenId] = useState<string | null>("service-1");

  return (
    <section id="capabilities" className="section-pad bg-secondary">
      <div className="container">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-12">
          <div>
            <div className="section-label">
              <span className="section-label-line" />
              What I Do
            </div>
            <h2 className="heading-serif font-bold text-foreground" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              Six services.
              <span className="italic font-light text-muted-foreground block text-sm"> One focus — results.</span>
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed lg:text-right">
            I don&apos;t do everything. I do six things well — and I&apos;m invested in every single one.
          </p>
        </div>

        <div className="border-t border-border">
          {capabilities.map((cap) => {
            const isOpen = openId === cap.id;
            return (
              <div key={cap.id} className="border-b border-border">
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : cap.id)}
                  className="w-full flex items-center justify-between py-5 lg:py-6 group"
                >
                  <div className="flex items-center gap-4 lg:gap-8">
                    <span className="font-mono text-[11px] tracking-wider text-muted-foreground w-8 shrink-0">
                      {cap.number}
                    </span>
                    <h3 className="font-display font-bold text-left tracking-tight text-foreground group-hover:text-accent transition-colors"
                      style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)" }}
                    >
                      {cap.title}
                    </h3>
                  </div>
                  <span
                    className={`font-mono text-sm transition-transform duration-300 ${
                      isOpen ? "rotate-45 text-accent" : "text-muted-foreground group-hover:text-accent"
                    }`}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.35 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 lg:pb-8 pl-12 lg:pl-16 pr-12">
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-2xl">
                          {cap.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {cap.tags.map((tag) => (
                            <span
                              key={tag}
                              className="font-mono text-[10px] tracking-[0.15em] uppercase px-3 py-1 border border-border"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-3 mt-8">
          <span className="w-6 h-[1.5px] bg-accent" />
          <span className="font-mono text-[11px] text-muted-foreground italic">
            Every service available as a standalone project or part of a full engagement.
          </span>
        </div>
      </div>
    </section>
  );
}
