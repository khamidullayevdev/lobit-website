"use server";

import { fetchMutation } from "convex/nextjs";
import { ConvexError } from "convex/values";
import { api } from "../../convex/_generated/api";

export type JoinWaitlistResult =
  | { ok: true; alreadyJoined: boolean }
  | { ok: false; error: string };

// Runs on the server, so the browser never talks to Convex directly. That keeps the
// Convex client out of the page bundle and gives us one place to add spam protection.
export async function joinWaitlist(email: string, honeypot: string): Promise<JoinWaitlistResult> {
  // Bots fill every field; people never see this one. Pretend it worked and drop it.
  if (honeypot) return { ok: true, alreadyJoined: false };

  try {
    const { status } = await fetchMutation(api.waitlist.join, { email, source: "website" });
    return { ok: true, alreadyJoined: status === "already_joined" };
  } catch (err) {
    if (err instanceof ConvexError && typeof err.data === "string") {
      return { ok: false, error: err.data };
    }
    console.error("joinWaitlist failed", err);
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}
