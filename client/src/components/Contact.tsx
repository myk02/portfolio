import { useState } from "react";
import { CheckCircle2, Linkedin, Mail, MessageCircle, Clock, ShieldCheck } from "lucide-react";
import { useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { applicationLine } from "@/data/siteContent";
import { CONTACT } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/ui/section";
import { Surface } from "@/components/ui/section";

const inputClass =
  "w-full bg-card border border-border px-4 min-h-[44px] text-[15px] text-foreground placeholder:text-foreground/50 outline-none transition-colors focus:border-foreground focus:bg-secondary/20";
const labelClass = "block text-[11px] font-mono uppercase tracking-widest text-muted-foreground mb-2";

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
          <div className="max-w-3xl mx-auto">
            <Surface className="p-8 sm:p-10 text-center">
              <div className="w-14 h-14 mx-auto flex items-center justify-center bg-accent text-accent-foreground mb-5">
                <CheckCircle2 size={28} />
              </div>
              <h2 className="heading-section text-foreground mb-3" style={{ fontSize: "clamp(1.6rem, 4vw, 2rem)" }}>Message received</h2>
              <p className="text-muted-foreground text-sm mt-2">
                Thanks{name.trim() ? `, ${name.trim().split(" ")[0]}` : ""} — I reply within 24 hours (Mon–Sat, EAT).
              </p>
              {!notified && (
                <p className="text-muted-foreground text-xs mt-3 border border-border bg-secondary px-3 py-2">
                  Note: email relay isn't configured on this deployment, so your
                  message is stored in the inbox dashboard only — I still review
                  every inquiry within 24 hours.
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
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <SectionLabel>Contact</SectionLabel>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.15fr] gap-8 lg:gap-10 mt-8 items-start">
            {/* left — info */}
            <div className="space-y-6">
              <Reveal>
                <h2 className="heading-section text-foreground" style={{ letterSpacing: "-0.03em" }}>
                  Work with me
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-md mt-3">
                  {applicationLine}
                </p>
              </Reveal>

              <Reveal delay={1}>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-3">
                  {[
                    { icon: Clock, label: "Response", value: "< 24 hours" },
                    { icon: ShieldCheck, label: "Timezone", value: "EAT · UTC+3" },
                    { icon: MessageCircle, label: "Prefers", value: "Email · WhatsApp" },
                  ].map((item) => (
                    <Surface key={item.label} className="p-3 flex items-center gap-3">
                      <item.icon size={16} className="text-accent shrink-0" />
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground leading-none">{item.label}</p>
                        <p className="text-xs font-medium text-foreground mt-1 leading-none">{item.value}</p>
                      </div>
                    </Surface>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={2}>
                <Surface className="p-5 space-y-4">
                  <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Direct</p>
                  <div className="space-y-3">
                    <a
                      href={CONTACT.emailHref}
                      className="flex items-center gap-3 text-sm text-foreground hover:text-accent transition-colors group"
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
                      className="flex items-center gap-3 text-sm text-foreground hover:text-accent transition-colors group"
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
                      className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span className="w-8 h-8 grid place-items-center border border-border bg-secondary">
                        <Linkedin size={14} aria-hidden />
                      </span>
                      linkedin.com/in/mikeships
                    </a>
                  </div>
                  <div className="pt-4 border-t border-border flex flex-col gap-2">
                    <a
                      href={CONTACT.whatsappChat}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary w-full justify-center"
                    >
                      Book a 15-min chat
                    </a>
                    <p className="text-[11px] text-muted-foreground text-center">
                      WhatsApp, or email — no form required.
                    </p>
                  </div>
                </Surface>
              </Reveal>


            </div>

            {/* right — form */}
            <Reveal delay={1}>
              <form onSubmit={handleSubmit} noValidate className="border border-border bg-card p-6 sm:p-7 space-y-5">
                <div className="flex items-center justify-between gap-3 pb-4 border-b border-border">
                  <h3 className="font-display font-bold text-foreground text-lg">Send a message</h3>
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
