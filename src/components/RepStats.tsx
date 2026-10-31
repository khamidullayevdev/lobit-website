"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import { ArrowRight, Camera } from "lucide-react";
import { Mascot } from "./Mascot";
import { repsLastWeek, testimonials } from "@/lib/social-proof";

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 2.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums" aria-label={to.toLocaleString("en-US")}>
      {value.toLocaleString("en-US")}
    </span>
  );
}

export function RepStats() {
  return (
    <section
      id="stories"
      data-bg="plum"
      aria-labelledby="stories-title"
      className="relative scroll-mt-16 bg-gradient-to-b from-[var(--bg-plum)] to-[var(--bg-base)] py-20 md:py-28"
    >
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <div data-aos="fade-up">
            <Mascot pose="medal" className="mx-auto h-28 w-auto md:h-32" />
          </div>
          <h2
            id="stories-title"
            data-aos="fade-up"
            className="mt-6 font-display text-4xl font-extrabold tracking-tight sm:text-5xl"
          >
            Join the players behind{" "}
            <span className="whitespace-nowrap">
              <span className="text-plum dark:text-[#b9a9ff]">
                <CountUp to={repsLastWeek} />
              </span>{" "}
              reps
            </span>
          </h2>
          <p data-aos="fade-up" data-aos-delay="80" className="mx-auto mt-4 max-w-xl text-lg text-muted">
            <Camera className="mr-1.5 inline h-5 w-5 -translate-y-0.5 text-carrot" aria-hidden />
            Done last week. Counted by the camera. Here&apos;s who paid up.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              data-aos="fade-up"
              data-aos-delay={(i % 3) * 90}
              className="card flex flex-col p-6 transition-transform duration-200 hover:-translate-y-1"
            >
              <figcaption className="flex items-center gap-3">
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-display text-lg font-bold text-white ${t.color}`}
                  aria-hidden
                >
                  {t.name[0]}
                </span>
                <span>
                  <span className="block font-display font-bold">{t.name}</span>
                  <span className="block text-sm text-muted">{t.detail}</span>
                </span>
              </figcaption>
              <blockquote className="mt-4 flex-1 leading-relaxed text-fg/85">&ldquo;{t.quote}&rdquo;</blockquote>
              <p className="mt-5 inline-flex items-center gap-2 self-start rounded-full bg-cream px-3.5 py-1.5 font-display text-sm font-bold">
                <span className="text-muted">{t.before}</span>
                <ArrowRight className="h-3.5 w-3.5 text-carrot" strokeWidth={3} aria-label="to" />
                <span>{t.after}</span>
                <span className="text-[#0f8a5f] dark:text-mint">{t.gain}</span>
              </p>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
