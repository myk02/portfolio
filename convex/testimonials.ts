import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { AVATAR_BY_NAME } from "./testimonialData";

export const listApproved = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("testimonials")
      .withIndex("by_approved", (q) => q.eq("isApproved", true))
      .order("desc")
      .collect();
  },
});

export const refreshAvatars = mutation({
  handler: async (ctx) => {
    const testimonials = await ctx.db.query("testimonials").collect();
    let updated = 0;
    for (const testimonial of testimonials) {
      const avatar = AVATAR_BY_NAME[testimonial.name];
      if (avatar && testimonial.avatar !== avatar) {
        await ctx.db.patch(testimonial._id, { avatar });
        updated += 1;
      }
    }
    return { updated, total: testimonials.length };
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
