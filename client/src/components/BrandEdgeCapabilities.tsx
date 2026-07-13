import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { capabilities } from "@/data/brandEdgeContent";

export default function BrandEdgeCapabilities() {
  const [openId, setOpenId] = useState<string | null>("service-1");

  return (
    <section id="capabilities" className="section-pad bg-secondary">
      <div className="container">
        <div className="max-w-lg mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-1.5 mb-3">
          <div>
            <div className="section-label">
              <span className="section-label-line" />
              What I Do
            </div>
            <h2 className="heading-serif font-bold text-foreground" style={{ fontSize: "clamp(0.85rem, 2vw, 1.2rem)" }}>
              Six services.
              <span className="italic font-light text-muted-foreground block text-[10px]"> One focus — results.</span>
            </h2>
          </div>
          <p className="text-[10px] text-muted-foreground max-w-[200px] leading-relaxed lg:text-right">
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
                  className="w-full flex items-center justify-between py-2 lg:py-2.5 group"
                >
                  <div className="flex items-center gap-2 lg:gap-4">
                    <span className="font-mono text-[9px] tracking-wider text-muted-foreground w-5 shrink-0">
                      {cap.number}
                    </span>
                    <h3 className="font-display font-bold text-left tracking-tight text-foreground group-hover:text-accent transition-colors"
                      style={{ fontSize: "clamp(0.75rem, 1.5vw, 0.95rem)" }}
                    >
                      {cap.title}
                    </h3>
                  </div>                    <span
                      className={`font-mono text-[10px] transition-transform duration-300 ${
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
                      <div className="pb-2 lg:pb-3 pl-7 lg:pl-8 pr-6">
                        <p className="text-[10px] text-muted-foreground leading-relaxed mb-2 max-w-2xl">
                          {cap.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {cap.tags.map((tag) => (
                            <span
                              key={tag}
                              className="font-mono text-[8px] tracking-[0.15em] uppercase px-1.5 py-0.5 border border-border"
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

        <div className="flex items-center gap-1.5 mt-3">
          <span className="w-3 h-[1.5px] bg-accent" />
          <span className="font-mono text-[9px] text-muted-foreground italic">
            Every service available as a standalone project or part of a full engagement.
          </span>
        </div>
      </div>
      </div>
    </section>
  );
}
