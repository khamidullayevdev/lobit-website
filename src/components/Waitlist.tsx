"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { joinWaitlist } from "@/app/actions";

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<null | "joined" | "already_joined">(null);

  return (
    <section id="waitlist" data-bg="base" className="container-x scroll-mt-16 pb-20 md:pb-28">
      <div
        data-aos="zoom-in"
        className="relative mx-auto overflow-hidden rounded-[2.5rem] bg-[#121110] px-6 pb-14 pt-[61px] text-center text-white ring-1 ring-white/5 sm:px-12 md:pb-20 md:pt-[88px]"
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
          <h2 className="mx-auto max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Your first lobby is waiting.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-white/80">
            Get early access. Bring the friends you want to beat.
          </p>

          <div className="relative mx-auto mt-[188px] max-w-md md:mt-[224px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/mascot-lounging.webp"
              alt=""
              aria-hidden
              width={900}
              height={587}
              draggable={false}
              className="pointer-events-none absolute bottom-full left-1/2 z-10 w-[210px] -translate-x-1/2 translate-y-[1.4%] select-none drop-shadow-[0_4px_6px_rgba(0,0,0,0.35)] md:left-[39%] md:w-[260px]"
            />
            {done ? (
              <p className="flex items-center justify-center gap-2 rounded-2xl bg-white/15 px-6 py-4 font-display text-lg font-bold">
                <Check className="h-5 w-5" strokeWidth={3} />{" "}
                {done === "already_joined"
                  ? "You're already on the list. See you in the lobby."
                  : "You're on the list. See you in the lobby."}
              </p>
            ) : (
              <form
                className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-2 sm:rounded-full sm:bg-white/[0.06] sm:p-1.5 sm:ring-1 sm:ring-white/10 sm:backdrop-blur-sm"
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (pending) return;
                  setPending(true);
                  setError(null);
                  const result = await joinWaitlist(email, honeypot).catch(() => ({
                    ok: false as const,
                    error: "Couldn't reach the server. Check your connection and try again.",
                  }));
                  setPending(false);
                  if (result.ok) {
                    setDone(result.alreadyJoined ? "already_joined" : "joined");
                  } else {
                    setError(result.error);
                  }
                }}
              >
                {/* Honeypot: hidden from people, filled in by bots. */}
                <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label htmlFor="company">Company</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? "waitlist-error" : undefined}
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="h-14 w-full rounded-full border-2 border-transparent bg-white px-5 text-base text-ink placeholder:text-[#6b6478] focus:border-sun focus:outline-none sm:h-12 sm:flex-1"
                />
                <button
                  type="submit"
                  disabled={pending}
                  className="disabled:cursor-wait disabled:opacity-80 flex h-10 w-full shrink-0 items-center justify-center gap-1.5 self-center rounded-full bg-carrot px-5 text-sm font-semibold text-white shadow-[0_3px_0_var(--color-carrot-dark)] transition-[background-color,transform,box-shadow] duration-150 hover:bg-[#ff7a40] active:translate-y-[3px] active:shadow-none sm:w-auto"
                >
                  {pending ? (
                    <>
                      Joining <Loader2 className="h-4 w-4 animate-spin" strokeWidth={3} />
                    </>
                  ) : (
                    <>
                      Join <ArrowRight className="h-4 w-4" strokeWidth={3} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
          {error && !done && (
            <p id="waitlist-error" role="alert" className="mx-auto mt-3 max-w-md text-sm font-medium text-[#ffb59a]">
              {error}
            </p>
          )}
          {!done && (
            <p className="mx-auto mt-4 max-w-md text-sm text-white/60">
              We&apos;ll only email you when Lobbit launches. No spam.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
