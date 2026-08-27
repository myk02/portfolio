import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { applicationLine } from "@/data/siteContent";
import { CONTACT } from "@/lib/site";

const inputClass =
  "w-full bg-card border border-border px-4 min-h-[44px] text-[16px] text-foreground placeholder:text-foreground/60 outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/40";
export default function BrandEdgeContact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const submitRequest = useMutation(api.serviceRequests.create);

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
      await submitRequest({
        name: trimmedName,
        email: trimmedEmail,
        projectType: "General Inquiry",
        message: trimmedMessage,
        website: honeypot,
      });
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
          <div className="max-w-2xl mx-auto">
            <div className="border border-border bg-card p-8 sm:p-10 text-center">
              <div className="w-14 h-14 mx-auto flex items-center justify-center bg-accent text-accent-foreground mb-5">
                <CheckCircle2 size={28} />
              </div>
              <h2 className="heading-section text-foreground mb-3">Message received</h2>
              <p className="font-display font-semibold text-xl text-foreground">
                Asante! Thank you! Merci! Grazie!
              </p>
              <p className="text-muted-foreground text-base mt-2">
                Thanks, {name.split(" ")[0]} — I reply within 24 hours.
              </p>
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
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="section-pad bg-secondary border-t border-border">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h2 className="heading-section text-foreground mb-2">Work with me</h2>
            <p className="text-muted-foreground text-sm max-w-lg">
              {applicationLine} Projects, full-time roles, or a working session.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-6 border border-border bg-card p-6 sm:p-8">
            {/* Honeypot field — hidden from humans, catches bots */}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Name <span aria-hidden>*</span>
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
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email <span aria-hidden>*</span>
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
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                Message <span aria-hidden>*</span>
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
                className={`${inputClass} min-h-28 resize-none`}
                placeholder="Tell me about your project, goals, and timeline..."
              />
            </div>

            {error && (
              <p id="contact-form-error" role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary w-full sm:w-auto disabled:opacity-60"
            >
              {submitting ? "Sending..." : "Send message"}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Prefer email?{" "}
              <a
                href={CONTACT.emailHref}
                className="text-foreground font-medium hover:underline underline-offset-4"
              >
                {CONTACT.email}
              </a>
            </p>
            <a
              href={`${CONTACT.emailHref}?subject=Web%20Developer%20%E2%80%94%20Portfolio%20discussion`}
              className="btn btn-secondary text-sm"
            >
              Book a 15-min chat
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
