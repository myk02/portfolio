import { v } from "convex/values";
import { action, internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";
import type { Id } from "./_generated/dataModel";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const requestArgs = {
  name: v.string(),
  email: v.string(),
  projectType: v.string(),
  message: v.string(),
  website: v.optional(v.string()),
};

export const insert = internalMutation({
  args: requestArgs,
  handler: async (ctx, args): Promise<Id<"serviceRequests"> | null> => {
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

async function notifyOwner(args: {
  name: string;
  email: string;
  projectType: string;
  message: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY is not set — contact stored in Convex only.");
    return;
  }

  const to = process.env.CONTACT_TO_EMAIL ?? "mikegary201@gmail.com";
  const from =
    process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: args.email,
      subject: `Portfolio inquiry from ${args.name}`,
      text: `From: ${args.name} <${args.email}>\nType: ${args.projectType}\n\n${args.message}`,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    console.error("Resend failed", response.status, body);
  }
}

export const submit = action({
  args: requestArgs,
  handler: async (ctx, args): Promise<Id<"serviceRequests"> | null> => {
    const id: Id<"serviceRequests"> | null = await ctx.runMutation(internal.serviceRequests.insert, args);
    if (!id) return null;

    try {
      await notifyOwner({
        name: args.name.trim(),
        email: args.email.trim(),
        projectType: args.projectType.trim() || "General Inquiry",
        message: args.message.trim(),
      });
    } catch (err) {
      console.error("Contact notify failed", err);
    }

    return id;
  },
});
