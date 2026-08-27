import { v } from "convex/values";
import { mutation } from "./_generated/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    projectType: v.string(),
    message: v.string(),
    // Honeypot — real users never fill this; bots do.
    website: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Honeypot tripped: pretend success without storing anything.
    if (args.website && args.website.trim() !== "") {
      return null;
    }

    const name = args.name.trim().slice(0, 120);
    const email = args.email.trim().slice(0, 254);
    const projectType = args.projectType.trim().slice(0, 60) || "General Inquiry";
    const message = args.message.trim().slice(0, 5000);

    if (!name || !message) {
      throw new Error("Name and message are required");
    }
    if (!EMAIL_RE.test(email)) {
      throw new Error("A valid email address is required");
    }

    return await ctx.db.insert("serviceRequests", {
      name,
      email,
      projectType,
      message,
      createdAt: Date.now(),
    });
  },
});
