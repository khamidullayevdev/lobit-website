"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Files live in /public/videos so Next.js serves them as static assets.
const videos = [
  { src: "/videos/video1.mp4", poster: "/videos/video1.jpg", label: "Survival lobby", peek: "bg-carrot" },
  { src: "/videos/video2.mp4", poster: "/videos/video2.jpg", label: "Team vs team", peek: "bg-plum" },
  { src: "/videos/video3.mp4", poster: "/videos/video3.jpg", label: "Prize pool", peek: "bg-sky" },
];

/**
 * Swipeable stack of muted, looping videos.
 * All three stay mounted so each keeps its own playback position:
 * swiping away pauses a video, and swiping back resumes it from the same spot.
 */
export function HeroStack() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [inView, setInView] = useState(true);
  const reduce = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const refs = useRef<(HTMLVideoElement | null)[]>([]);

  const next = videos[(i + 1) % videos.length];
  const after = videos[(i + 2) % videos.length];

  const go = (d: number) => {
    setDir(d);
    setI((v) => (v + d + videos.length) % videos.length);
  };

  // Pause everything while the hero is off screen, to save battery and data.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Only the active video plays. play() continues from the video's current time.
  useEffect(() => {
    refs.current.forEach((v, idx) => {
      if (!v) return;
      if (idx === i && inView && !reduce) {
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [i, inView, reduce]);

  return (
    <div ref={wrap} className="relative mx-auto h-[520px] w-[300px] translate-x-3 sm:h-[610px] sm:w-[350px] sm:translate-x-0">
      {/* Cards peeking out behind, tinted for the next videos */}
      <div
        aria-hidden
        className={`absolute inset-0 -translate-x-7 translate-y-4 -rotate-[6deg] rounded-[1.75rem] opacity-90 transition-colors duration-500 ${after.peek}`}
        style={{ filter: "brightness(0.82)" }}
      />
      <div
        aria-hidden
        className={`absolute inset-0 -translate-x-3.5 translate-y-2 -rotate-[3deg] rounded-[1.75rem] transition-colors duration-500 ${next.peek}`}
        style={{ filter: "brightness(0.92)" }}
      />

      {/* Front card: the active video */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.25}
        onDragEnd={(_, info) => {
          if (info.offset.x < -60) go(1);
          else if (info.offset.x > 60) go(-1);
        }}
        className="absolute inset-0 cursor-grab touch-pan-y overflow-hidden rounded-[1.75rem] bg-ink shadow-[0_30px_60px_-24px_rgba(22,19,31,0.55)] active:cursor-grabbing"
      >
        {videos.map((v, idx) => {
          const active = idx === i;
          return (
            <motion.div
              key={v.src}
              aria-hidden={!active}
              initial={false}
              animate={
                active
                  ? { opacity: 1, x: 0, scale: 1 }
                  : { opacity: 0, x: dir * -40, scale: 0.98 }
              }
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className={`absolute inset-0 ${active ? "z-10" : "z-0"}`}
            >
              <video
                ref={(el) => {
                  refs.current[idx] = el;
                }}
                src={v.src}
                poster={v.poster}
                muted
                loop
                playsInline
                autoPlay={idx === 0 && !reduce}
                preload={idx === 0 ? "auto" : "metadata"}
                disablePictureInPicture
                aria-label={`${v.label} video`}
                className="pointer-events-none h-full w-full select-none object-cover"
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Swipe control */}
      <div className="absolute -bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1 rounded-full bg-ink p-1 text-white shadow-lg ring-1 ring-white/10">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous video"
          className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/15"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <span className="px-1 text-sm font-semibold">Swipe</span>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next video"
          className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/15"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
