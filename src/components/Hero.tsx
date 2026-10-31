import { ArrowUpRight, Asterisk } from "lucide-react";
import { HeroStack } from "./HeroStack";
import { HeroRibbon } from "./HeroRibbon";
import { Mascot } from "./Mascot";

const points = ["The loser pays up", "Solo lobbies or team vs team", "The camera counts every rep"];

export function Hero() {
  return (
    <section id="top" data-bg="base" className="relative overflow-hidden">
      <HeroRibbon />

      <div className="container-x relative grid gap-14 pb-20 pt-12 md:pt-16 lg:grid-cols-[minmax(0,1fr)_350px_minmax(0,1fr)] lg:items-stretch lg:gap-10 lg:pb-20 lg:pt-14">
        {/* Left: headline */}
        <div className="flex flex-col">
          <h1
            data-aos="fade-up"
            className="text-[2.9rem] font-semibold leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-[2.4rem] xl:text-[2.65rem] 2xl:text-[2.75rem]"
          >
            Play against homies.
            <br />
            Miss your reps.
            <br />
            <span className="text-carrot">Pay the price.</span>
          </h1>
          <ul data-aos="fade-up" data-aos-delay="100" className="mt-7 space-y-2.5">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-2 font-mono text-[0.72rem] font-medium uppercase tracking-[0.08em]">
                <Asterisk className="h-4 w-4 text-carrot" strokeWidth={3} aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Center: swipeable challenge cards */}
        <div data-aos="fade-up" data-aos-delay="150" className="relative z-10 flex items-start justify-center pb-5">
          <HeroStack />
        </div>

        {/* Right: side card + pitch + CTA */}
        <div className="flex max-w-[300px] flex-col gap-10 lg:justify-between lg:justify-self-end lg:pb-5">
          <a
            href="#team-vs-team"
            data-aos="fade-up"
            data-aos-delay="200"
            className="group relative flex max-w-[290px] items-center gap-3.5 rounded-2xl bg-surface p-2 pr-10 shadow-[0_1px_0_var(--line),0_12px_30px_-18px_rgba(22,19,31,0.3)] ring-1 ring-line transition-transform duration-200 hover:-translate-y-0.5"
          >
            <span className="flex h-[84px] w-[72px] shrink-0 items-end justify-center overflow-hidden rounded-xl bg-ink dark:bg-[#0b0a10]">
              <Mascot pose="medal" className="-mb-2 h-[78px] w-auto" />
            </span>
            <span>
              <span className="block font-mono text-[0.68rem] uppercase tracking-wider text-plum dark:text-[#b9a9ff]">
                Class vs class?
              </span>
              <span className="mt-1 block font-semibold leading-snug tracking-[-0.02em]">
                Losers do a comedy show in the hallway
              </span>
            </span>
            <span className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-cream text-fg transition-colors group-hover:bg-carrot group-hover:text-white">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </a>

          <div data-aos="fade-up" data-aos-delay="250">
            <p className="max-w-sm text-[0.98rem] leading-relaxed text-muted">
              Pick a daily challenge with your friends and set the stakes. Miss a day and you&apos;re out. The
              loser pays up. The camera counts every rep, so nobody can cheat.
            </p>
            <a href="#waitlist" className="group mt-7 inline-flex items-center">
              <span className="flex h-12 items-center rounded-full bg-ink px-6 font-semibold text-white transition-colors group-hover:bg-[#2a2536] dark:bg-white dark:text-ink">
                Join the waitlist
              </span>
              <span className="-ml-1 flex h-12 w-12 items-center justify-center rounded-full bg-carrot text-white transition-transform duration-200 group-hover:rotate-45">
                <ArrowUpRight className="h-5 w-5" strokeWidth={2.4} />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
