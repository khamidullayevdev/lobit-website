"use client";

import { useEffect } from "react";
import AOS from "aos";

/** Starts scroll animations once the splash has faded, so the hero animates in view. */
export function AosInit() {
  useEffect(() => {
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      AOS.init({
        duration: 700,
        easing: "ease-out-cubic",
        once: true,
        offset: 60,
        disable: () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      });
    };
    window.addEventListener("lobbit:ready", start);
    const fallback = window.setTimeout(start, 2000);
    return () => {
      window.removeEventListener("lobbit:ready", start);
      window.clearTimeout(fallback);
    };
  }, []);

  return null;
}
