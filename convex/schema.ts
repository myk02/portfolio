import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  serviceRequests: defineTable({
    name: v.string(),
    email: v.string(),
    message: v.string(),
    createdAt: v.number(),
  }),
  donations: defineTable({
    reference: v.string(),
    email: v.string(),
    amount: v.number(),
    currency: v.string(),
    createdAt: v.number(),
  }).index("by_reference", ["reference"]),
});
