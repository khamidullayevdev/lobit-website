"use client";

import { useEffect } from "react";

/**
 * Fades the page background to the color of whichever [data-bg] section sits
 * in the middle of the screen. Colors live in globals.css (--bg-*), so they
 * also switch with dark mode.
 */
export function ScrollBackground() {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    let current = "";

    const update = () => {
      frame = 0;
      const mid = window.innerHeight * 0.5;
      let key = "base";
      document.querySelectorAll<HTMLElement>("[data-bg]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) key = el.dataset.bg ?? "base";
      });
      if (key !== current) {
        current = key;
        root.style.setProperty("--page-bg", `var(--bg-${key})`);
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
