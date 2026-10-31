"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, X } from "lucide-react";

/** A pose skeleton doing push-ups while the counter ticks; every fourth rep is a half rep that gets rejected. */
export function CameraReferee() {
  const [count, setCount] = useState(12);
  const [flash, setFlash] = useState<"ok" | "half">("ok");

  useEffect(() => {
    let n = 0;
    const id = window.setInterval(() => {
      n += 1;
      if (n % 4 === 0) {
        setFlash("half");
      } else {
        setFlash("ok");
        setCount((c) => (c >= 30 ? 12 : c + 1));
      }
    }, 1600);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative mx-auto aspect-[4/4] w-full sm:aspect-[4/3.4] max-w-md overflow-hidden rounded-[2rem] bg-ink p-5">
      {/* viewfinder corners */}
      {["left-4 top-4 border-l-4 border-t-4", "right-4 top-4 border-r-4 border-t-4", "bottom-4 left-4 border-b-4 border-l-4", "bottom-4 right-4 border-b-4 border-r-4"].map(
        (c) => (
          <span key={c} className={`absolute h-8 w-8 rounded-sm border-white/30 ${c}`} />
        ),
      )}

      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
          <span className="h-2 w-2 animate-pulse rounded-full bg-berry" /> REC
        </span>
        <span className="rounded-full bg-white/10 px-3 py-1 font-display text-xs font-bold text-white/80">Push-ups</span>
      </div>

      <svg viewBox="0 0 320 150" className="mt-6 w-full">
        <line x1="10" y1="132" x2="310" y2="132" stroke="rgba(255,255,255,0.15)" strokeWidth="3" strokeDasharray="6 8" />
        {/* body pivots at the feet; the upper body moves down and up */}
        <g className="animate-pushup" style={{ transformOrigin: "260px 128px", transformBox: "view-box" }}>
          <g stroke="var(--color-sky)" strokeWidth="5" strokeLinecap="round">
            <line x1="260" y1="128" x2="190" y2="104" />
            <line x1="190" y1="104" x2="100" y2="78" />
            <line x1="100" y1="78" x2="96" y2="128" />
          </g>
          {[
            [260, 128],
            [190, 104],
            [100, 78],
            [96, 128],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="7" fill="var(--color-sun)" />
          ))}
          <circle cx="76" cy="66" r="15" fill="none" stroke="var(--color-sky)" strokeWidth="5" />
        </g>
      </svg>

      <div className="absolute inset-x-5 bottom-5 flex items-end justify-between">
        <div>
          <p className="eyebrow text-[10px] text-white/50">Verified reps</p>
          <motion.p
            key={count}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="font-display text-5xl font-extrabold tabular-nums text-white"
          >
            {count}
          </motion.p>
        </div>
        <AnimatePresence mode="wait">
          {flash === "ok" ? (
            <motion.span
              key={`ok-${count}`}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1.5 rounded-full bg-mint px-3 py-1.5 font-display text-sm font-bold text-white"
            >
              <Check className="h-4 w-4" strokeWidth={3} /> Full rep
            </motion.span>
          ) : (
            <motion.span
              key="half"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1.5 rounded-full bg-berry px-3 py-1.5 font-display text-sm font-bold text-white"
            >
              <X className="h-4 w-4" strokeWidth={3} /> Half rep, not counted
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
