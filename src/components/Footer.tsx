import { Smartphone } from "lucide-react";
import { Bunny } from "./Bunny";

const cols = [
  {
    title: "Product",
    links: [
      ["How it works", "#how-it-works"],
      ["Stories", "#stories"],
      ["FAQ", "#faq"],
      ["Join the waitlist", "#waitlist"],
    ],
  },
  {
    title: "Modes",
    links: [
      ["Survival lobby", "#modes"],
      ["Team vs team", "#team-vs-team"],
      ["Stakes ideas", "#stakes"],
    ],
  },
  {
    title: "For groups",
    links: [
      ["Schools", "#team-vs-team"],
      ["Gyms & clubs", "#team-vs-team"],
      ["Offices", "#team-vs-team"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "#"],
      ["Contact", "mailto:hello@lobit.co"],
      ["Privacy", "#"],
      ["Terms", "#"],
    ],
  },
];

// Simple hand-drawn brand marks (lucide ships no brand icons). Links are placeholders.
const socials = [
  {
    name: "Instagram",
    href: "#",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.3" cy="6.7" r="1.3" fill="currentColor" />
      </>
    ),
  },
  {
    name: "TikTok",
    href: "#",
    icon: (
      <path
        d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.4 2.6 2.2 4.4 5 4.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    name: "X",
    href: "#",
    icon: (
      <path d="M4 4l16 16M20 4L4 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    ),
  },
  {
    name: "YouTube",
    href: "#",
    icon: (
      <>
        <rect x="2.5" y="5.5" width="19" height="13" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M10.2 9.3v5.4l4.6-2.7z" fill="currentColor" />
      </>
    ),
  },
];

function StoreBadge({ store }: { store: string }) {
  return (
    <span className="inline-flex items-center gap-2.5 rounded-xl bg-ink px-3.5 py-2 text-white shadow-[0_3px_0_rgba(0,0,0,0.25)]">
      <Smartphone className="h-5 w-5" aria-hidden />
      <span className="leading-tight">
        <span className="block text-[0.65rem] uppercase tracking-wider text-white/60">Coming soon to</span>
        <span className="block font-display text-sm font-bold">{store}</span>
      </span>
    </span>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-carrot text-white">
      <div className="container-x relative grid gap-12 pt-20 md:pt-28 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div>
          <a href="#" className="inline-flex items-center gap-2.5" aria-label="Lobit home">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white">
              <Bunny className="h-9 w-9" alive={false} />
            </span>
            <span className="font-display text-[1.9rem] font-extrabold leading-none tracking-tight">lobit</span>
          </a>
          <p className="mt-5 max-w-sm font-display text-xl font-bold leading-snug">
            Miss your reps. Pay the price.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <StoreBadge store="App Store" />
            <StoreBadge store="Google Play" />
          </div>

          <p className="mt-9 font-display text-sm font-bold uppercase tracking-[0.14em] text-white/75">Follow us</p>
          <ul className="mt-3 flex gap-2.5">
            {socials.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  aria-label={`Lobit on ${s.name}`}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25 transition-colors duration-200 hover:bg-white hover:text-carrot"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                    {s.icon}
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
          {cols.map((c) => (
            <div key={c.title}>
              <p className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white/70">{c.title}</p>
              <ul className="mt-4 space-y-3">
                {c.links.map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="font-medium text-white transition-opacity hover:opacity-70">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="container-x relative mt-20 flex flex-col gap-2 border-t border-white/20 pt-6 text-sm text-white/75 md:flex-row md:justify-between">
        <p>© {year} Lobit. All rights reserved.</p>
        <p className="max-w-xl md:text-right">
          Lobit is not a medical service. Check with a doctor before starting a new exercise routine.
        </p>
      </div>

      {/* Giant faded wordmark, trimmed so it sits exactly on the bottom edge */}
      <p
        aria-hidden
        className="wordmark pointer-events-none mt-10 select-none text-center text-[29vw] font-bold leading-none tracking-[-0.06em] text-white/15 lg:text-[21rem]"
      >
        lobit
      </p>
    </footer>
  );
}
