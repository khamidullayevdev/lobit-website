"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ArrowRight, Camera, Flame } from "lucide-react";
import { Mascot } from "./Mascot";
import { proof } from "@/lib/social-proof";

const R = 56;

/** Dotted globe: a grid of dots clipped to a circle, with a few "active lobby" dots lit up. */
function DottedGlobe() {
  const dots: { x: number; y: number; lit: boolean }[] = [];
  for (let y = -R; y <= R; y += 8) {
    for (let x = -R; x <= R; x += 8) {
      if (x * x + y * y > R * R) continue;
      // Deterministic pseudo-random pattern so server and client render the same dots.
      const h = Math.abs(Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1;
      if (h < 0.28) continue;
      dots.push({ x, y, lit: h > 0.9 });
    }
  }
  return (
    <svg viewBox="-64 -64 128 128" className="h-full w-full" aria-hidden>
      <circle r={R + 4} className="fill-plum-soft" />
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={d.x}
          cy={d.y}
          r={d.lit ? 2.6 : 1.7}
          className={d.lit ? "fill-carrot" : "fill-plum/35"}
        />
      ))}
    </svg>
  );
}

function Gauge({ value }: { value: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const arc = "M 12 70 A 58 58 0 0 1 128 70";
  return (
    <svg ref={ref} viewBox="0 0 140 78" className="w-full max-w-[220px]" aria-hidden>
      <path d={arc} fill="none" strokeWidth="14" strokeLinecap="round" className="stroke-line" />
      <motion.path
        d={arc}
        fill="none"
        strokeWidth="14"
        strokeLinecap="round"
        className="stroke-plum"
        initial={{ pathLength: reduce ? value / 100 : 0.001 }}
        animate={{ pathLength: inView || reduce ? value / 100 : 0.001 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      />
    </svg>
  );
}

function Pill({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-mint-soft px-3 py-1 font-display text-sm font-bold text-[#0f8a5f] dark:text-mint ${className}`}
    >
      {children}
    </span>
  );
}

const cardBase = "card relative overflow-hidden p-6 sm:p-7";

export function ProofGrid() {
  const f = proof.feature;
  return (
    <section data-bg="base" aria-labelledby="proof-title" className="py-20 md:py-28">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <div data-aos="fade-up">
            <Mascot pose="dumbbell" className="mx-auto h-28 w-auto md:h-32" />
          </div>
          <h2
            id="proof-title"
            data-aos="fade-up"
            className="mt-6 font-display text-4xl font-extrabold tracking-tight sm:text-5xl"
          >
            Stakes keep people showing up
          </h2>
          <p data-aos="fade-up" data-aos-delay="80" className="mt-4 text-lg text-muted">
            Nobody wants to be the one who pays.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[auto_auto]">
          {/* States + globe */}
          <div data-aos="fade-up" className={`${cardBase} flex flex-col`}>
            <p className="font-display text-5xl font-extrabold tracking-tight">
              {proof.lobbies}
            </p>
            <p className="mt-2 text-muted">
              lobbies running in <strong className="text-fg">{proof.states} states</strong>
            </p>
            <div className="mx-auto mt-6 w-44 sm:w-48">
              <DottedGlobe />
            </div>
          </div>

          {/* Phone mock, tall in the middle */}
          <div
            data-aos="fade-up"
            data-aos-delay="80"
            className={`${cardBase} flex flex-col items-center justify-center !bg-sky-soft md:row-span-2 lg:col-start-2 lg:row-start-1`}
          >
            <div className="relative mt-2 w-full max-w-[240px] rounded-[2.2rem] border-[6px] border-ink bg-surface p-4 pb-6 shadow-[0_10px_0_rgba(0,0,0,0.08)]">
              <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-line" />
              <p className="font-display text-lg font-extrabold">My stats</p>
              <p className="text-xs text-muted">Best set, last 7 days</p>
              <ul className="mt-4 space-y-3">
                {proof.phoneStats.map((s) => (
                  <li key={s.label}>
                    <div className="flex justify-between text-sm font-bold">
                      <span>{s.label}</span>
                      <span className="tabular-nums">{s.value}</span>
                    </div>
                    <div className="mt-1 h-2.5 overflow-hidden rounded-full bg-cream">
                      <motion.div
                        className={`h-full rounded-full ${s.color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.min(100, s.value)}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-center gap-2 rounded-xl bg-carrot-soft px-3 py-2 text-xs font-bold text-carrot-dark dark:text-carrot">
                <Flame className="h-4 w-4" /> 9-day streak
              </div>
            </div>
            <div className="relative -mt-6 ml-10 max-w-[220px] self-center rounded-2xl rounded-bl-sm bg-plum px-4 py-3 text-sm font-semibold text-white shadow-lg">
              &ldquo;{proof.phoneQuote}&rdquo;
            </div>
          </div>

          {/* Mascot card */}
          <div
            data-aos="fade-up"
            data-aos-delay="160"
            className={`${cardBase} flex flex-col !bg-carrot-soft lg:col-start-3 lg:row-start-1`}
          >
            <p className="max-w-[16rem] font-display text-3xl font-extrabold leading-tight tracking-tight">
              Average <span className="text-carrot">+{proof.avgGain} reps</span> per set in 6 weeks
            </p>
            <div className="mt-auto flex items-end justify-between gap-4 pt-6">
              <a href="#waitlist" className="btn btn-primary mb-2">
                Start your lobby <ArrowRight className="h-4 w-4" strokeWidth={3} />
              </a>
              <Mascot pose="wave" className="-mb-7 h-36 w-auto shrink-0 sm:-mb-8" />
            </div>
          </div>

          {/* Gauge */}
          <div data-aos="fade-up" className={`${cardBase} flex flex-col items-center text-center lg:col-start-1 lg:row-start-2`}>
            <Gauge value={proof.streakRate} />
            <p className="-mt-7 font-display text-5xl font-extrabold tracking-tight">{proof.streakRate}%</p>
            <p className="mt-2 max-w-[16rem] text-muted">of players never miss a day when money or dinner is on the line</p>
            <Pill className="mt-4">Most apps: under 30%</Pill>
          </div>

          {/* Testimonial */}
          <figure
            data-aos="fade-up"
            data-aos-delay="160"
            className={`${cardBase} flex flex-col justify-between !border-ink !bg-ink text-white !shadow-[0_4px_0_#000] dark:!bg-[#0b0a10] lg:col-start-3 lg:row-start-2`}
          >
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-white/60">
              <Camera className="h-4 w-4 text-carrot" /> Camera verified
            </div>
            <blockquote className="mt-4 text-lg leading-relaxed text-white/90">&ldquo;{f.quote}&rdquo;</blockquote>
            <figcaption className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <span>
                <span className="block font-display font-bold">{f.name}</span>
                <span className="block text-sm text-white/55">{f.detail}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 font-display text-sm font-bold">
                {f.before} <ArrowRight className="h-3.5 w-3.5 text-carrot" strokeWidth={3} /> {f.after} {f.unit}
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
