"use client";

import { useEffect, useRef } from "react";

const PHRASE = "Loser buys dinner  •  Last one standing  •  Team vs team  •  Prize pool for the winner  •  Camera-verified reps  •  ";
const PATH = "M -40 430 C 220 590, 560 630, 800 500 C 1020 380, 1260 320, 1640 480";

/** A soft band that swoops behind the card stack with text sliding along it. */
export function HeroRibbon() {
  const textPath = useRef<SVGTextPathElement>(null);
  const measure = useRef<SVGTextElement>(null);

  useEffect(() => {
    const tp = textPath.current;
    const m = measure.current;
    if (!tp || !m) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const len = m.getComputedTextLength(); // length of one phrase: shifting by this loops seamlessly
    let offset = 0;
    let last = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      offset = (offset + (now - last) * 0.04) % len;
      last = now;
      tp.setAttribute("startOffset", String(-offset));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const text = PHRASE.repeat(6);
  const textClass = "fill-white font-mono text-[11.5px] font-semibold uppercase";

  return (
    <svg
      aria-hidden
      viewBox="0 0 1600 720"
      className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[720px] w-[1600px] -translate-x-1/2 -translate-y-[58%] md:block"
    >
      <defs>
        <linearGradient id="ribbon-fade" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.2" stopColor="#fff" stopOpacity="1" />
          <stop offset="0.8" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="ribbon-mask">
          <rect width="1600" height="720" fill="url(#ribbon-fade)" />
        </mask>
        <path id="ribbon-path" d={PATH} />
      </defs>
      <g mask="url(#ribbon-mask)">
        <use href="#ribbon-path" fill="none" stroke="var(--ribbon)" strokeWidth="26" strokeLinecap="round" />
        <text className={textClass} dy="4" style={{ letterSpacing: "0.1em" }} xmlSpace="preserve">
          <textPath ref={textPath} href="#ribbon-path">
            {text}
          </textPath>
        </text>
      </g>
      {/* invisible copy of one phrase, used to measure its length */}
      <text ref={measure} className={textClass} style={{ letterSpacing: "0.1em" }} opacity="0" xmlSpace="preserve">
        {PHRASE}
      </text>
    </svg>
  );
}
