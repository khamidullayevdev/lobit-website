"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Bunny } from "./Bunny";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "#modes", label: "Modes" },
  { href: "#stakes", label: "Stakes" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5">
      <nav
        className={`mx-auto flex h-14 max-w-[1040px] items-center justify-between rounded-full bg-ink pl-5 pr-2 text-white ring-1 ring-white/10 transition-shadow duration-300 dark:bg-[#1d1a27] ${
          scrolled ? "shadow-[0_12px_32px_-12px_rgba(22,19,31,0.45)]" : ""
        }`}
      >
        <a href="#top" aria-label="Lobit home" className="flex items-center gap-2">
          <Bunny className="h-8 w-8" alive={false} />
          <span className="text-[1.35rem] font-bold leading-none tracking-[-0.04em]">lobit</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm font-medium text-white/75 transition-colors hover:text-white">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <ThemeToggle className="text-white/75 hover:bg-white/10 hover:text-white" />
          <a
            href="#waitlist"
            className="flex h-10 items-center gap-1.5 rounded-full bg-white px-4 text-sm font-semibold text-ink transition-colors hover:bg-carrot hover:text-white"
          >
            Join waitlist <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} />
          </a>
        </div>
      </nav>
    </header>
  );
}
