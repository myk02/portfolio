import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

const inputClass =
  "w-full bg-card border border-border px-4 min-h-[44px] text-[16px] text-foreground placeholder:text-foreground/60 outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/40";

export default function BrandEdgeContact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
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
            <h2 className="heading-section text-foreground mb-2">Get in touch</h2>
            <p className="text-muted-foreground text-sm">
              Let&apos;s talk about your next project.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-6 border border-border bg-card p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  className={inputClass}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className={inputClass}
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className={`${inputClass} min-h-28 resize-none`}
                placeholder="Tell me about your project, goals, and timeline..."
              />
            </div>

            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary w-full sm:w-auto"
            >
              {submitting ? "Sending..." : "Send message"}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Prefer email?{" "}
              <a
                href="mailto:mikegary201@gmail.com"
                className="text-foreground font-medium hover:underline underline-offset-4"
              >
                mikegary201@gmail.com
              </a>
            </p>
            <a
              href="mailto:mikegary201@gmail.com?subject=UI%2FUX%20Designer%20%E2%80%94%20Portfolio%20discussion"
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
