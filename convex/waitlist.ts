import { mutation, internalQuery } from "./_generated/server";
import { ConvexError, v } from "convex/values";

// Deliberately simple: one "@", something before it, a dot in the domain, no spaces.
// The real check is whether the launch email arrives; this only stops obvious junk.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 254;

export const join = mutation({
  args: { email: v.string(), source: v.optional(v.string()) },
  returns: v.object({ status: v.union(v.literal("joined"), v.literal("already_joined")) }),
  handler: async (ctx, args) => {
    const email = args.email.trim().toLowerCase();
    if (email.length > MAX_EMAIL_LENGTH || !EMAIL_RE.test(email)) {
      throw new ConvexError("Please enter a valid email address.");
    }

    // Mutations are transactions, so two submits of the same email can't both insert.
    const existing = await ctx.db
      .query("waitlist")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique();
    if (existing) return { status: "already_joined" as const };

    await ctx.db.insert("waitlist", {
      email,
      source: (args.source ?? "website").slice(0, 32),
    });
    return { status: "joined" as const };
  },
});

// Not callable from the website. Run it from the Convex dashboard (Functions tab)
// or `npx convex run waitlist:count` to see how many people have signed up.
export const count = internalQuery({
  args: {},
  returns: v.number(),
  handler: async (ctx) => (await ctx.db.query("waitlist").collect()).length,
});
