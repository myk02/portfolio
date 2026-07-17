import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const list = query({
  args: { subBrand: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (args.subBrand) {
      return await ctx.db
        .query("projects")
        .withIndex("by_subBrand", (q) => q.eq("subBrand", args.subBrand as "gmcode" | "gmmarketing" | "gmautomation"))
        .order("asc")
        .collect();
    }
    return await ctx.db.query("projects").order("asc").collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    techStack: v.array(v.string()),
    url: v.string(),
    image: v.string(),
    subBrand: v.union(
      v.literal("gmcode"),
      v.literal("gmmarketing"),
      v.literal("gmautomation")
    ),
    order: v.number(),
    workflowJson: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("projects", args);
  },
});
