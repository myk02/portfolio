import { useState } from "react";
import { CheckCircle2, Linkedin, Mail, MessageCircle, Github } from "lucide-react";
import { useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { CONTACT } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/ui/section";
import { Surface } from "@/components/ui/section";

const inputClass =
  "w-full bg-card border border-border px-3.5 min-h-[46px] text-[0.9375rem] text-foreground placeholder:text-foreground/50 outline-none transition-colors focus:border-foreground focus:bg-secondary/20";
const labelClass = "block text-[0.6875rem] font-mono font-medium uppercase tracking-[0.12em] text-muted-foreground mb-2";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [notified, setNotified] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const submitRequest = useAction(api.serviceRequests.submit);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setError("Please fill in all fields before sending.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      const result = await submitRequest({
        name: trimmedName,
        email: trimmedEmail,
        message: trimmedMessage,
        website: honeypot,
      });
      setNotified(result.notified);
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section id="contact" className="section-pad bg-secondary border-t border-border">
        <div className="container">
          <div className="max-w-xl mx-auto">
            <Surface className="p-6 sm:p-8 text-center">
              <div className="w-11 h-11 mx-auto flex items-center justify-center bg-accent text-accent-foreground mb-4">
                <CheckCircle2 size={22} />
              </div>
              <h2 className="heading-section text-foreground mb-2">Message received</h2>
              <p className="text-muted-foreground text-xs mt-2">
                Thanks{name.trim() ? `, ${name.trim().split(" ")[0]}` : ""} — I reply within 24 hours (Mon–Sat, EAT).
              </p>
              {!notified && (
                <p className="text-muted-foreground text-xs mt-3 border border-border bg-secondary px-3 py-2">
                  Saved to inbox — I review every message within 24 hours.
                </p>
              )}
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setName("");
                  setEmail("");
                  setMessage("");
                }}
                className="btn btn-ghost mt-6"
              >
                Send another message
              </button>
            </Surface>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="section-pad bg-secondary border-t border-border">
      <div className="container">
        <div>
          <Reveal className="section-intro">
            <SectionLabel>Contact</SectionLabel>
            <h2 className="heading-section text-foreground">
              Let’s talk
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">One message. I reply in 24h.</p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-5 mt-8 items-start max-w-4xl mx-auto">
            {/* left — info */}
            <div className="space-y-5">
              <Reveal delay={1}>
                <Surface className="p-5 space-y-4">
                  <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Contact & profiles</p>
                  <div className="space-y-3">
                    <a
                      href={CONTACT.emailHref}
                      className="flex items-center gap-3 text-xs text-foreground hover:text-accent transition-colors group"
                    >
                      <span className="w-8 h-8 grid place-items-center border border-border bg-secondary group-hover:border-foreground transition-colors">
                        <Mail size={14} />
                      </span>
                      {CONTACT.email}
                    </a>
                    <a
                      href={CONTACT.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-xs text-foreground hover:text-accent transition-colors group"
                    >
                      <span className="w-8 h-8 grid place-items-center border border-border bg-secondary group-hover:border-foreground transition-colors">
                        <MessageCircle size={14} />
                      </span>
                      WhatsApp · {CONTACT.phone}
                    </a>
                    <a
                      href={CONTACT.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span className="w-8 h-8 grid place-items-center border border-border bg-secondary">
                        <Linkedin size={14} aria-hidden />
                      </span>
                      linkedin.com/in/mikeships
                    </a>
                    <a
                      href={CONTACT.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span className="w-8 h-8 grid place-items-center border border-border bg-secondary">
                        <Github size={14} aria-hidden />
                      </span>
                      github.com/myk02
                    </a>
                  </div>
                </Surface>
              </Reveal>


            </div>

            {/* right — form */}
            <Reveal delay={1}>
              <form onSubmit={handleSubmit} noValidate className="border border-border bg-card p-4 sm:p-5 space-y-4">
                <div className="flex items-center justify-between gap-3 pb-4 border-b border-border">
                  <h3 className="font-display font-semibold text-foreground text-[1.05rem] tracking-[-0.015em]">Send a message</h3>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground border border-border px-2 py-1 bg-secondary">
                    Replies in 24h
                  </span>
                </div>

                <div className="absolute -left-[9999px] top-auto" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className={labelClass}>
                      Name <span aria-hidden className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      aria-required="true"
                      aria-invalid={Boolean(error && !name.trim())}
                      aria-describedby={error ? "contact-form-error" : undefined}
                      className={inputClass}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Email <span aria-hidden className="text-destructive">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      aria-required="true"
                      aria-invalid={Boolean(error && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))}
                      aria-describedby={error ? "contact-form-error" : undefined}
                      className={inputClass}
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>
                    Message <span aria-hidden className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    aria-required="true"
                    aria-invalid={Boolean(error && !message.trim())}
                    aria-describedby={error ? "contact-form-error" : undefined}
                    className={`${inputClass} min-h-28 resize-none py-3`}
                    placeholder="Project, goals, timeline..."
                  />
                </div>

                {error && (
                  <p id="contact-form-error" role="alert" className="text-sm text-destructive border border-destructive/20 bg-destructive/5 px-3 py-2">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary w-full justify-center disabled:opacity-60"
                >
                  {submitting ? "Sending..." : "Send message →"}
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
