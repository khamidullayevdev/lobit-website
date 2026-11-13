import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  waitlist: defineTable({
    // Stored trimmed and lowercased, so "Ann@x.com" and "ann@x.com " are one signup.
    email: v.string(),
    // Where the signup came from, e.g. "website". Lets us tell sources apart later.
    source: v.string(),
    // Set when the "Lobbit is live" email has gone out, so a resend skips this person.
    launchEmailSentAt: v.optional(v.number()),
    // Set if the person unsubscribes from the launch email link.
    unsubscribedAt: v.optional(v.number()),
  }).index("by_email", ["email"]),
});
