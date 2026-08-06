import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

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
    if (!name.trim() || !email.trim() || !message.trim()) return;
    
    setSubmitting(true);
    setError("");
    try {
      await submitRequest({
        name: name.trim(),
        email: email.trim(),
        projectType: "General Inquiry",
        message: message.trim(),
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
          <div className="max-w-2xl mx-auto text-center py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="heading-serif font-bold text-foreground mb-4" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}>
                Message sent
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Thanks, {name.split(" ")[0]}! I'll get back to you within 24 hours.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setName("");
                  setEmail("");
                  setMessage("");
                }}
                className="btn-ghost"
              >
                Send another message
              </button>
            </motion.div>
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
            <h2 className="heading-serif font-bold text-foreground mb-2" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}>
              Get in touch
            </h2>
            <p className="text-muted-foreground text-base">
              Have a project in mind? Let's talk about it.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-card border border-border px-4 py-3 text-foreground placeholder:text-foreground/55 outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/40"
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-card border border-border px-4 py-3 text-foreground placeholder:text-foreground/55 outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/40"
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
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={4}
                className="w-full bg-card border border-border px-4 py-3 text-foreground placeholder:text-foreground/55 outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/40 resize-none"
                placeholder="Tell me about your project, goals, and timeline..."
              />
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <button
              type="submit"
              disabled={!name.trim() || !email.trim() || !message.trim() || submitting}
              className="btn-accent inline-flex items-center justify-center gap-2 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Sending..." : "Send message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
