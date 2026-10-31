"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Mascot } from "./Mascot";

// Words wrapped in * are drawn in the brand orange once they fill in.
const HEADLINE =
  "Our mission is simple: make working out *fun* by putting something *on* *the* *line.*";

function Word({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const accent = word.startsWith("*");
  const text = word.replace(/\*/g, "");
  // Each word gets its own slice of the scroll range, overlapping a little so it reads as a wave.
  const start = index / total;
  const end = Math.min(1, start + 1.6 / total);
  const opacity = useTransform(progress, [start, end], [0.16, 1]);

  return (
    <motion.span style={{ opacity }} className={`inline-block ${accent ? "text-carrot" : ""}`}>
      {text}
      {" "}
    </motion.span>
  );
}

export function Mission() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.45"] });
  const words = HEADLINE.split(" ");

  return (
    <section data-bg="base" aria-labelledby="mission-title" className="relative pb-24 pt-12 md:pb-36 md:pt-16">
      <div className="container-x">
        <div className="mx-auto max-w-4xl text-center">
          <Mascot pose="phone" className="mx-auto h-28 w-auto md:h-32" />
          <p className="eyebrow mt-6 text-carrot">Our mission</p>

          <div ref={ref}>
            {/* Screen readers and search engines get the plain sentence. */}
            <h2 id="mission-title" className="sr-only">
              {HEADLINE.replace(/\*/g, "")}
            </h2>
            <p
              aria-hidden
              className="mt-5 font-display text-[2rem] font-extrabold leading-[1.15] tracking-tight text-fg sm:text-5xl lg:text-[3.6rem]"
            >
              {reduce
                ? HEADLINE.split(" ").map((w, i) => (
                    <span key={i} className={w.startsWith("*") ? "text-carrot" : ""}>
                      {w.replace(/\*/g, "")}{" "}
                    </span>
                  ))
                : words.map((w, i) => (
                    <Word key={i} word={w} index={i} total={words.length} progress={scrollYProgress} />
                  ))}
            </p>
          </div>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-muted"
          >
            Nobody skips push-ups when skipping means buying dinner for ten.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
