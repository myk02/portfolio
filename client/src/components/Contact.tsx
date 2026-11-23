import { useState } from "react";
import { CheckCircle2, Copy, Check } from "lucide-react";
import { useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { CONTACT } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/ui/section";
import { Surface } from "@/components/ui/section";
import {
  TikTokBrandIcon,
  LinkedInBrandIcon,
  GitHubBrandIcon,
  GmailBrandIcon,
  WhatsAppBrandIcon,
} from "@/components/BrandIcons";

const inputClass =
  "w-full bg-card border border-border px-3.5 min-h-[46px] text-[0.9375rem] text-foreground placeholder:text-foreground/35 outline-none transition-all focus:border-foreground focus:bg-card focus:shadow-[0_0_0_3px_rgba(10,10,10,0.06)]";
const labelClass =
  "block text-[0.6875rem] font-mono font-medium uppercase tracking-[0.12em] text-muted-foreground mb-2";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [notified, setNotified] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [invalid, setInvalid] = useState({
    name: false,
    email: false,
    message: false,
  });

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    void navigator.clipboard?.writeText(CONTACT.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearFieldError = (field: keyof typeof invalid) => {
    setInvalid(prev => ({ ...prev, [field]: false }));
    if (error) setError("");
  };

  const submitRequest = useAction(api.serviceRequests.submit);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setInvalid({
        name: !trimmedName,
        email: !trimmedEmail,
        message: !trimmedMessage,
      });
      setError("Please fill in all fields before sending.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setInvalid({ name: false, email: true, message: false });
      setError("Please enter a valid email address.");
      return;
    }

    setInvalid({ name: false, email: false, message: false });
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
      <section
        id="contact"
        className="section-pad bg-secondary border-t border-border"
      >
        <div className="container">
          <div className="max-w-xl mx-auto">
            <Surface className="p-6 sm:p-8 text-center">
              <div className="w-11 h-11 mx-auto flex items-center justify-center bg-accent text-accent-foreground mb-4">
                <CheckCircle2 size={22} />
              </div>
              <h2 className="heading-section text-foreground mb-2">
                Message received
              </h2>
              <p className="text-muted-foreground text-xs mt-2">
                Thanks{name.trim() ? `, ${name.trim().split(" ")[0]}` : ""} — I
                reply within 24 hours (Mon–Sat, EAT).
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
                  setInvalid({ name: false, email: false, message: false });
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
    <section
      id="contact"
      className="section-pad bg-secondary border-t border-border"
    >
      <div className="container">
        <div>
          <Reveal className="section-head">
            <div>
              <SectionLabel>Contact</SectionLabel>
              <h2 className="heading-section text-foreground">Let's talk</h2>
            </div>
            <p className="section-note hidden sm:block">
              Replies in 24h · Mon–Sat, EAT
            </p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-4 items-start max-w-4xl">
            {/* left — info */}
            <div className="space-y-4">
              <Reveal delay={1}>
                <Surface className="p-4 space-y-3">
                  <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
                    Direct Contact
                  </p>
                  <p className="text-[0.85rem] text-muted-foreground leading-relaxed">
                    Need cybersecurity content or marketing that converts? I reply to every message.
                  </p>
                  <p className="text-[0.82rem] text-foreground font-medium leading-snug pt-1 border-t border-border/60">
                    Nairobi · Replies within 24h
                  </p>
                  <div className="space-y-1.5 pt-1">
                    <a
                      href={CONTACT.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-1.5 -mx-1.5 text-xs text-foreground hover:bg-secondary/60 transition-all group"
                    >
                      <span className="w-8 h-8 grid place-items-center border border-border bg-card group-hover:border-foreground/50 group-hover:bg-accent group-hover:text-accent-foreground transition-colors shrink-0">
                        <TikTokBrandIcon size={16} />
                      </span>
                      <span className="font-medium">TikTok · @littlabs</span>
                    </a>
                    <div className="flex items-center justify-between p-1.5 -mx-1.5 text-xs text-foreground hover:bg-secondary/60 transition-all group">
                      <a
                        href={CONTACT.emailHref}
                        className="flex items-center gap-3 flex-1 min-w-0"
                      >
                        <span className="w-8 h-8 grid place-items-center border border-border bg-card group-hover:border-foreground/50 group-hover:bg-accent group-hover:text-accent-foreground transition-colors shrink-0">
                          <GmailBrandIcon size={16} />
                        </span>
                        <span className="font-medium truncate">{CONTACT.email}</span>
                      </a>
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        title={copied ? "Copied!" : "Copy email address"}
                        aria-label="Copy email"
                        className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-card border border-transparent hover:border-border transition-colors flex items-center gap-1 shrink-0"
                      >
                        {copied ? (
                          <>
                            <Check size={13} className="text-emerald-500" />
                            <span className="text-emerald-500 font-medium">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={13} />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <a
                      href={CONTACT.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-1.5 -mx-1.5 text-xs text-foreground hover:bg-secondary/60 transition-all group"
                    >
                      <span className="w-8 h-8 grid place-items-center border border-border bg-card group-hover:border-foreground/50 group-hover:bg-accent group-hover:text-accent-foreground transition-colors shrink-0">
                        <WhatsAppBrandIcon size={16} />
                      </span>
                      <span className="font-medium">WhatsApp · {CONTACT.phone}</span>
                    </a>
                    <a
                      href={CONTACT.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-1.5 -mx-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all group"
                    >
                      <span className="w-8 h-8 grid place-items-center border border-border bg-card group-hover:border-foreground/50 transition-colors shrink-0">
                        <LinkedInBrandIcon size={16} />
                      </span>
                      <span>linkedin.com/in/mikeships</span>
                    </a>
                    <a
                      href={CONTACT.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-1.5 -mx-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all group"
                    >
                      <span className="w-8 h-8 grid place-items-center border border-border bg-card group-hover:border-foreground/50 transition-colors shrink-0">
                        <GitHubBrandIcon size={16} />
                      </span>
                      <span>github.com/myk02</span>
                    </a>
                  </div>
                </Surface>
              </Reveal>
            </div>

            {/* right — form */}
            <Reveal delay={1}>
              <form
                onSubmit={handleSubmit}
                noValidate
                className="border border-border bg-card p-4 space-y-3.5"
              >
                <h3 className="font-display font-semibold text-foreground text-[1rem] tracking-[-0.015em] pb-3 border-b border-border">
                  Send a message
                </h3>

                <div
                  className="absolute -left-[9999px] top-auto"
                  aria-hidden="true"
                >
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={e => setHoneypot(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label htmlFor="name" className={labelClass}>
                      Name{" "}
                      <span aria-hidden className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={name}
                      onChange={e => {
                        setName(e.target.value);
                        clearFieldError("name");
                      }}
                      autoComplete="name"
                      aria-required="true"
                      aria-invalid={invalid.name ? "true" : undefined}
                      aria-describedby={error ? "contact-form-error" : undefined}
                      className={inputClass}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Email{" "}
                      <span aria-hidden className="text-destructive">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={email}
                      onChange={e => {
                        setEmail(e.target.value);
                        clearFieldError("email");
                      }}
                      autoComplete="email"
                      aria-required="true"
                      aria-invalid={invalid.email ? "true" : undefined}
                      aria-describedby={error ? "contact-form-error" : undefined}
                      className={inputClass}
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>
                    Message{" "}
                    <span aria-hidden className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={message}
                    onChange={e => {
                      setMessage(e.target.value);
                      clearFieldError("message");
                    }}
                    rows={4}
                    aria-required="true"
                    aria-invalid={invalid.message ? "true" : undefined}
                    aria-describedby={error ? "contact-form-error" : undefined}
                    className={`${inputClass} min-h-28 resize-none py-3`}
                    placeholder="Project, goals, timeline..."
                  />
                </div>

                {error && (
                  <p
                    id="contact-form-error"
                    role="alert"
                    className="text-sm text-destructive border border-destructive/20 bg-destructive/5 px-3 py-2"
                  >
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
