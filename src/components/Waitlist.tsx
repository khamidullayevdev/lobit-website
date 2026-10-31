"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Mascot } from "./Mascot";

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section id="waitlist" data-bg="base" className="container-x scroll-mt-16 pb-20 md:pb-28">
      <div
        data-aos="zoom-in"
        className="relative mx-auto overflow-hidden rounded-[2.5rem] bg-[#121110] px-6 pb-16 pt-12 text-center text-white ring-1 ring-white/5 sm:px-12 md:pb-20"
      >
        {/* Hexagon pattern, faded toward the edges */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.06] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,#000_20%,transparent_80%)]"
        >
          <defs>
            <pattern id="hex" width="56" height="97" patternUnits="userSpaceOnUse" patternTransform="scale(0.9)">
              <path
                d="M28 0 L56 16.2 L56 48.5 L28 64.7 L0 48.5 L0 16.2 Z M28 64.7 L28 97"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path d="M0 48.5 L-28 64.7 M56 48.5 L84 64.7" fill="none" stroke="currentColor" strokeWidth="2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex)" />
        </svg>
        <div className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-carrot/25 blur-3xl" aria-hidden />

        <div className="relative">
          <Mascot pose="hearts" className="mx-auto h-32 w-auto md:h-36" />
          <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Your first lobby is waiting.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-white/80">
            Get early access. Bring the friends you want to beat.
          </p>

          {done ? (
            <p className="mx-auto mt-10 flex max-w-md items-center justify-center gap-2 rounded-2xl bg-white/15 px-6 py-4 font-display text-lg font-bold">
              <Check className="h-5 w-5" strokeWidth={3} /> You&apos;re on the list. See you in the lobby.
            </p>
          ) : (
            <form
              className="mx-auto mt-9 flex max-w-md flex-col gap-2 rounded-full bg-white/[0.06] p-1.5 ring-1 ring-white/10 backdrop-blur-sm sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: save the email with a Convex mutation once the backend exists.
                setDone(true);
              }}
            >
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-11 flex-1 rounded-full border-2 border-transparent bg-white px-4 text-ink placeholder:text-[#6b6478] focus:border-sun focus:outline-none"
              />
              <button type="submit" className="btn btn-primary h-11">
                Join <ArrowRight className="h-4 w-4" strokeWidth={3} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
