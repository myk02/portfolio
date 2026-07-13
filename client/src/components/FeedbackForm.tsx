import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function FeedbackForm() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [hovered, setHovered] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const submitTestimonial = useMutation(api.testimonials.create);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    setSubmitting(true);
    setError("");
    try {
      await submitTestimonial({
        name: name.trim(),
        role: role.trim() || "Client",
        text: text.trim(),
        rating,
        isApproved: false,
      });
      setName("");
      setRole("");
      setText("");
      setRating(5);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    } catch {
      setError("Something went wrong sending your review. Please try again or email me directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 form-shell">
      <h3 className="text-base font-bold mb-2 type-form-title section-title-accent">Leave a review</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-3 text-xs type-subtitle-hand">
        Honest feedback is always welcome.
      </p>

      {submitted && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-sm">
          Thank you. Your review was sent and will show up after I approve it.
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              className="p-0.5 transition"
            >
              <Star
                size={22}
                className={
                  star <= (hovered || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300 dark:text-gray-600"
                }
              />
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 form-field focus:outline-none transition text-sm"
        />

        <input
          type="text"
          placeholder="Your Role / Company (optional)"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-3 py-2 form-field focus:outline-none transition text-sm"
        />

        <textarea
          placeholder="What was it like working with me?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          rows={3}
          className="w-full px-3 py-2 form-field focus:outline-none transition text-sm resize-none"
        />

        <Button
          type="submit"
          disabled={submitting}
          className="w-full btn-gradient font-semibold"
        >
          {submitting ? "Sending..." : "Submit Feedback"}
        </Button>
      </form>
    </div>
  );
}
