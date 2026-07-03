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
          Thank you! Your service request has been received. I'll get back to you within 24 hours.
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h3 className="text-2xl font-bold mb-6">Tell Me About Your Project</h3>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input type="text" placeholder="Full Name" required className="w-full px-4 py-2.5 rounded-none bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition text-sm" />
        <input type="email" placeholder="Email Address" required className="w-full px-4 py-2.5 rounded-none bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition text-sm" />
        <select required className="w-full px-4 py-2.5 rounded-none bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition text-sm">
          <option value="">Select Project Type</option>
          <option>Software Development</option>
          <option>IT Support & Infrastructure</option>
          <option>UX/UI & Design</option>
          <option>System Integration</option>
          <option>Consultation</option>
          <option>Other</option>
        </select>
        <textarea placeholder="Tell me about your project, timeline, and budget..." rows={4} required className="w-full px-4 py-2.5 rounded-none bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition text-sm resize-none" />
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-none">Send Request</Button>
      </form>
    </div>
  );
}
