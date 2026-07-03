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
  const submitTestimonial = useMutation(api.testimonials.create);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
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
  };

  return (
    <div className="p-8 form-shell">
      <h3 className="text-2xl font-bold mb-2 section-title-accent">Leave a review</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm section-subtitle">
        If we have worked together, I'd appreciate your honest feedback.
      </p>

      {submitted && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-none text-sm">
          Thank you. Your review was sent and will show up after I approve it.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex gap-2">
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
                size={28}
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
          className="w-full px-4 py-2.5 rounded-none form-field focus:outline-none transition text-sm"
        />

        <input
          type="text"
          placeholder="Your Role / Company (optional)"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-4 py-2.5 rounded-none form-field focus:outline-none transition text-sm"
        />

        <textarea
          placeholder="What was it like working with me?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          rows={4}
          className="w-full px-4 py-2.5 rounded-none form-field focus:outline-none transition text-sm resize-none"
        />

        <Button
          type="submit"
          className="w-full btn-gradient font-semibold py-2.5 rounded-none"
        >
          Submit Feedback
        </Button>
      </form>
    </div>
  );
}
