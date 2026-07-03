import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const listApproved = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("testimonials")
      .withIndex("by_approved", (q) => q.eq("isApproved", true))
      .order("desc")
      .collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    role: v.string(),
    text: v.string(),
    avatar: v.optional(v.string()),
    rating: v.number(),
    isApproved: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("testimonials", args);
  },
});
