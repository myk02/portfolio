import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ServiceRequestForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  if (submitted) {
    return (
      <div className="p-8">
        <div className="p-4 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-none text-sm">
          Thank you. I got your request and will reply within 24 hours.
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 form-shell">
      <h3 className="text-2xl font-bold mb-6 section-title-accent">Tell me about your project</h3>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input type="text" placeholder="Full Name" required className="w-full px-4 py-2.5 rounded-none form-field focus:outline-none transition text-sm" />
        <input type="email" placeholder="Email Address" required className="w-full px-4 py-2.5 rounded-none form-field focus:outline-none transition text-sm" />
        <select required className="w-full px-4 py-2.5 rounded-none form-field focus:outline-none transition text-sm">
          <option value="">Select Project Type</option>
          <option>Software Development</option>
          <option>IT Support & Infrastructure</option>
          <option>UX/UI & Design</option>
          <option>System Integration</option>
          <option>Consultation</option>
          <option>Other</option>
        </select>
        <textarea placeholder="What do you need, and when do you need it by?" rows={4} required className="w-full px-4 py-2.5 rounded-none form-field focus:outline-none transition text-sm resize-none" />
        <Button type="submit" className="w-full btn-gradient font-semibold py-2.5 rounded-none">Send Request</Button>
      </form>
    </div>
  );
}
