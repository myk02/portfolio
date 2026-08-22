import { Reveal } from "@/components/Reveal";
import { serviceGroups } from "@/data/siteContent";

/**
 * "What I do" — the full service surface (mirroring the public LinkedIn
 * categories), grouped Build / Design / Operate & improve so the primary web-
 * developer narrative stays dominant while freelance/support work stays visible.
 */
export default function WhatIDo() {
  return (
    <section id="services" className="section-pad bg-primary border-t border-border">
      <div className="container">
        <div className="max-w-6xl mx-auto text-secondary">
          <Reveal as="div" className="mb-10">
            <span className="section-label">
              <span className="section-label-line" />
              What I do
            </span>
            <h2 className="heading-section text-secondary mb-3">
              One developer, full circle
            </h2>
            <p className="text-sm max-w-2xl text-secondary/80 leading-relaxed">
              The same reliability bar applies across all of it — build it,
              design it, and keep it running. Web development is the core;
              everything else supports shipping products that hold up.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            {serviceGroups.map((group, gi) => (
              <Reveal key={group.id} delay={gi}>
                <h3 className="text-xs font-mono uppercase tracking-widest text-accent mb-1">
                  {group.heading}
                </h3>
                <p className="text-[13px] text-secondary/70 mb-5">{group.blurb}</p>
                <ul className="space-y-4">
                  {group.items.map(item => (
                    <li key={item.title} className="border-l border-secondary/20 pl-4">
                      {item.href ? (
                        <a
                          href={item.href}
                          className="font-display font-bold text-[15px] text-secondary underline-offset-4 hover:text-accent hover:underline transition-colors"
                        >
                          {item.title}
                        </a>
                      ) : (
                        <p className="font-display font-bold text-[15px] text-secondary">
                          {item.title}
                        </p>
                      )}
                      <p className="text-[13px] text-secondary/70 leading-snug mt-0.5">
                        {item.desc}
                      </p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
