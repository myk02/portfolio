import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function ServiceRequestForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const submitRequest = useMutation(api.serviceRequests.create);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !projectType || !message.trim()) return;

    setSubmitting(true);
    setError("");
    try {
      await submitRequest({
        name: name.trim(),
        email: email.trim(),
        projectType,
        message: message.trim(),
      });
      setName("");
      setEmail("");
      setProjectType("");
      setMessage("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    } catch {
      setError("Something went wrong sending your request. Please try again or email me directly.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-5 sm:p-6">
        <div className="p-4 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-sm">
          Thank you. I got your request and will reply within 24 hours.
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 form-shell">
      <h3 className="text-base font-bold mb-3 type-form-title section-title-accent">Your project</h3>
      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 form-field focus:outline-none transition text-sm"
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 form-field focus:outline-none transition text-sm"
        />
        <select
          value={projectType}
          onChange={(e) => setProjectType(e.target.value)}
          required
          className="w-full px-3 py-2 form-field focus:outline-none transition text-sm"
        >
          <option value="">Select Project Type</option>
          <option>Software Development</option>
          <option>IT Support & Infrastructure</option>
          <option>UX/UI & Design</option>
          <option>System Integration</option>
          <option>Consultation</option>
          <option>Other</option>
        </select>
        <textarea
          placeholder="What do you need, and when do you need it by?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          required
          className="w-full px-3 py-2 form-field focus:outline-none transition text-sm resize-none"
        />
        <Button
          type="submit"
          disabled={submitting}
          className="w-full btn-gradient font-semibold"
        >
          {submitting ? "Sending..." : "Send Request"}
        </Button>
      </form>
    </div>
  );
}
