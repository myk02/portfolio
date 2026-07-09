import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { projectTypes, timelineOptions } from "@/data/brandEdgeContent";

const formSteps = [
  { label: "Contact", subtitle: "Hi, I'm..." },
  { label: "Service", subtitle: "I need help with..." },
  { label: "Budget", subtitle: "Budget & timing..." },
  { label: "Details", subtitle: "Tell me about the project..." },
];

const budgetLabels = ["KSh 10k", "KSh 25k", "KSh 50k", "KSh 75k", "KSh 100k", "KSh 150k", "KSh 200k", "KSh 300k", "KSh 400k", "KSh 500k+"];

export default function BrandEdgeContact() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("");
  const [budget, setBudget] = useState(2);
  const [timeline, setTimeline] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const submitRequest = useMutation(api.serviceRequests.create);

  const canContinue = () => {
    switch (step) {
      case 0: return name.trim() && email.trim();
      case 1: return !!projectType;
      case 2: return true;
      case 3: return message.trim().length >= 10;
      default: return false;
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setDirection(1);
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  };

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !projectType || !message.trim()) return;
    setSubmitting(true);
    setError("");
    try {
      await submitRequest({
        name: name.trim(),
        email: email.trim(),
        projectType,
        message: `Company: ${company}\nBudget: ${budgetLabels[budget]}\nTimeline: ${timeline}\n\n${message.trim()}`,
      });
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const variants = {
    enter: (d: number) => ({
      x: d > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({
      x: d > 0 ? -200 : 200,
      opacity: 0,
    }),
  };

  if (submitted) {
    return (
      <section id="contact" className="section-pad" style={{ background: "#e8ff47" }}>
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-primary/50 mb-4">
              Message Received
            </div>
            <h2 className="heading-serif font-bold text-primary" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              I&apos;ll be in touch within 24 hours.
            </h2>
            <p className="font-mono text-[11px] tracking-[0.15em] text-primary/60 mt-6">
              Thanks, {name.split(" ")[0]}! I&apos;ll review your message and reach out to schedule a call.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="section-pad" style={{ background: "#e8ff47" }}>
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="section-label text-primary/50">
            <span className="section-label-line !bg-primary/50" />
            Get in Touch
          </div>

          <h2 className="heading-serif font-bold text-primary mt-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
            Let&apos;s build something
            <span className="italic font-light block text-sm"> worth talking about.</span>
          </h2>

          <div className="mt-10">
            <div className="flex items-center gap-3 mb-2">
              {formSteps.map((_, i) => (
                <div
                  key={i}
                  className={`h-0.5 flex-1 transition-colors duration-300 ${i <= step ? "bg-primary" : "bg-primary/20"}`}
                />
              ))}
              <span className="font-mono text-[11px] tracking-[0.15em] text-primary/60 shrink-0 ml-2">
                {step + 1} / 4
              </span>
            </div>

            <div className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary/40 mb-8">
              {formSteps[step].subtitle}
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-primary text-accent font-mono text-xs">
              {error}
            </div>
          )}

          <div className="min-h-[280px] relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.3 }}
              >
                {step === 0 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-transparent border-b-[1.5px] border-primary/20 focus:border-primary py-2 font-display text-foreground text-[clamp(1.2rem,3vw,1.8rem)] font-light placeholder:text-primary/30 outline-none transition-colors"
                      />
                      <input
                        type="text"
                        placeholder="Company (optional)"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full bg-transparent border-b-[1.5px] border-primary/20 focus:border-primary py-2 font-display text-foreground text-[clamp(1.2rem,3vw,1.8rem)] font-light placeholder:text-primary/30 outline-none transition-colors"
                      />
                    </div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent border-b-[1.5px] border-primary/20 focus:border-primary py-2 font-display text-foreground text-[clamp(1.2rem,3vw,1.8rem)] font-light placeholder:text-primary/30 outline-none transition-colors"
                    />
                  </div>
                )}

                {step === 1 && (
                  <div className="flex flex-wrap gap-3">
                    {projectTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setProjectType(type)}
                        className={`font-mono text-[11px] tracking-[0.15em] uppercase px-5 py-3 border border-primary/20 transition-colors ${
                          projectType === type
                            ? "bg-primary text-accent border-primary"
                            : "text-primary/60 hover:border-primary/50"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-8">
                    <div>
                      <div className="font-display font-bold text-primary" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                        {budgetLabels[budget]}
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={9}
                        step={1}
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                        className="w-full mt-4 accent-primary h-1 appearance-none bg-primary/20 rounded-none outline-none"
                        style={{ height: "2px" }}
                      />
                      <div className="flex justify-between mt-1">
                        <span className="font-mono text-[10px] text-primary/40">KSh 10k</span>
                        <span className="font-mono text-[10px] text-primary/40">KSh 500k+</span>
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary/40 mb-3">
                        Timeline
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {timelineOptions.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setTimeline(opt.label)}
                            className={`font-mono text-[11px] tracking-[0.15em] uppercase px-5 py-3 border border-primary/20 transition-colors ${
                              timeline === opt.label
                                ? "bg-primary text-accent border-primary"
                                : "text-primary/60 hover:border-primary/50"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <textarea
                      placeholder="Tell me about your project, goals, and timeline..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={5}
                      className="w-full bg-transparent border-b-[1.5px] border-primary/20 focus:border-primary py-2 font-display text-foreground text-[clamp(1rem,2.5vw,1.4rem)] font-light placeholder:text-primary/30 outline-none transition-colors resize-none"
                    />
                    <div className="font-mono text-[11px] tracking-[0.15em] text-primary/40 mt-2">
                      {message.length} characters {message.length < 10 ? "(min 10)" : ""}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-primary/20">
            <button
              type="button"
              onClick={handleBack}
              className={`font-mono text-[11px] tracking-[0.15em] uppercase transition-colors ${
                step === 0 ? "text-primary/20 cursor-default" : "text-primary/60 hover:text-primary"
              }`}
              disabled={step === 0}
            >
              ← Back
            </button>
            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!canContinue()}
                className={`font-mono text-[11px] tracking-[0.15em] uppercase px-5 py-3 transition-colors ${
                  canContinue()
                    ? "bg-primary text-accent hover:bg-primary/90"
                    : "bg-primary/20 text-primary/40 cursor-default"
                }`}
              >
                Continue →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!canContinue() || submitting}
                className={`font-mono text-[11px] tracking-[0.15em] uppercase px-5 py-3 transition-colors ${
                  canContinue() && !submitting
                    ? "bg-primary text-accent hover:bg-primary/90"
                    : "bg-primary/20 text-primary/40 cursor-default"
                }`}
              >
                {submitting ? "Sending..." : "Send Message →"}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
