import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    name: v.string(),
    description: v.string(),
    techStack: v.array(v.string()),
    url: v.string(),
    image: v.string(),
    subBrand: v.union(
      v.literal("gmcode"),
      v.literal("gmdesign"),
      v.literal("gmmarketing")
    ),
    order: v.number(),
  }).index("by_subBrand", ["subBrand"]),

  testimonials: defineTable({
    name: v.string(),
    role: v.string(),
    text: v.string(),
    avatar: v.optional(v.string()),
    rating: v.number(),
    isApproved: v.boolean(),
  }).index("by_approved", ["isApproved"]),

  serviceRequests: defineTable({
    name: v.string(),
    email: v.string(),
    projectType: v.string(),
    message: v.string(),
    createdAt: v.number(),
  }),
});
