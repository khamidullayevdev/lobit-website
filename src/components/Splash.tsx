"use client";

import { useState } from "react";
import { Bunny } from "./Bunny";

/**
 * Full-screen white intro that fades from opacity 100 to 0, then unmounts.
 * The fade itself is CSS (see .splash in globals.css), so the page is never
 * stuck behind it if JavaScript is slow or disabled.
 */
export function Splash() {
  const [gone, setGone] = useState(false);
  if (gone) return null;

  return (
    <div
      aria-hidden
      className="splash fixed inset-0 z-[100] flex items-center justify-center bg-[var(--bg-base)]"
      onAnimationEnd={(e) => {
        if (e.animationName === "splash-out") {
          setGone(true);
          window.dispatchEvent(new Event("lobbit:ready"));
        }
      }}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="animate-float">
          <Bunny className="h-28 w-28" />
        </div>
        <span className="font-display text-4xl font-extrabold tracking-tight text-carrot">
          lobbit
        </span>
      </div>
    </div>
  );
}
