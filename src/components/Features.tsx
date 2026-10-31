import type { ReactNode } from "react";
import { Asterisk, Bell, Clapperboard, Gift, HandHeart, Ticket, Utensils, Zap } from "lucide-react";
import { SurvivalBoard } from "./illustrations/SurvivalBoard";
import { TeamRace } from "./illustrations/TeamRace";
import { YouTube } from "./YouTube";

const VIDEO_ID = "WqeygINVf3Y";

function Points({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <ul className="mt-6 space-y-2.5">
      {items.map((p) => (
        <li
          key={p}
          className={`flex items-center gap-2 font-mono text-[0.72rem] font-medium uppercase tracking-[0.08em] ${
            dark ? "text-white/80" : "text-fg/80"
          }`}
        >
          <Asterisk className="h-4 w-4 shrink-0 text-carrot" strokeWidth={3} aria-hidden />
          {p}
        </li>
      ))}
    </ul>
  );
}

function Chip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`absolute z-10 flex items-center gap-2 rounded-full bg-surface px-3.5 py-2 text-sm font-semibold text-fg shadow-[0_14px_30px_-14px_rgba(18,17,16,0.45)] ring-1 ring-line ${className}`}
    >
      {children}
    </span>
  );
}

function Stage({ tone, children, className = "" }: { tone: string; children: ReactNode; className?: string }) {
  return (
    <div className={`bg-dots relative flex items-center justify-center rounded-[1.5rem] px-5 py-12 sm:px-10 ${tone} ${className}`}>
      {children}
    </div>
  );
}

function ModeText({ n, title, body, points }: { n: string; title: string; body: string; points: string[] }) {
  return (
    <div>
      <p className="eyebrow text-carrot">Mode {n}</p>
      <h3 className="mt-3 text-3xl font-semibold leading-[1.05] sm:text-[2.6rem]">{title}</h3>
      <p className="mt-4 max-w-md text-[1.05rem] leading-relaxed text-muted">{body}</p>
      <Points items={points} />
    </div>
  );
}

const stakes = [
  { icon: Utensils, title: "Dinner", body: "First one out buys everyone dinner." },
  { icon: Gift, title: "Prize pool", body: "Losers chip in $50. Winner gets a new watch." },
  { icon: Clapperboard, title: "Dare", body: "Losers post a cringe video on their story." },
  { icon: HandHeart, title: "Good deed", body: "Loser buys a meal for someone in need." },
  { icon: Ticket, title: "Tickets", body: "Losing team buys the winners game tickets." },
];

export function Features() {
  return (
    <section id="modes" data-bg="base" aria-labelledby="modes-title" className="scroll-mt-20 py-20 md:py-28">
      <div className="container-x">
        <div className="grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-end md:gap-16">
          <div data-aos="fade-up">
            <p className="eyebrow text-carrot">The modes</p>
            <h2 id="modes-title" className="mt-3 text-4xl font-semibold leading-[1.02] sm:text-6xl">
              Two ways to play. Someone always pays.
            </h2>
          </div>
          <p data-aos="fade-up" data-aos-delay="100" className="text-lg leading-relaxed text-muted">
            Pick a mode. Pick a challenge. Pick the stakes.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:mt-16">
          {/* Mode 1 */}
          <article data-aos="fade-up" className="card grid items-center gap-8 !rounded-[2rem] p-3 sm:p-4 md:grid-cols-2">
            <div className="order-2 px-4 pb-6 sm:px-8 md:order-1 md:py-8 lg:px-12">
              <ModeText
                n="01"
                title="Survival lobby"
                body="Up to 10 friends. One daily challenge. Miss a day and you're out."
                points={["Last one standing wins", "Or the first one out pays", "Same challenge, every day"]}
              />
            </div>
            <Stage tone="bg-carrot-soft" className="order-1 md:order-2">
              <Chip className="right-4 top-4 hidden sm:flex">
                <Zap className="h-4 w-4 text-carrot" /> Dev is out
              </Chip>
              <div className="w-full max-w-md">
                <SurvivalBoard />
              </div>
            </Stage>
          </article>

          {/* Mode 2 */}
          <article
            id="team-vs-team"
            data-aos="fade-up"
            className="card grid scroll-mt-24 items-center gap-8 !rounded-[2rem] p-3 sm:p-4 md:grid-cols-2"
          >
            <Stage tone="bg-plum-soft">
              <Chip className="left-4 top-4 hidden sm:flex">
                <Bell className="h-4 w-4 text-plum" /> 11B just hit 87%
              </Chip>
              <div className="w-full max-w-md">
                <TeamRace />
              </div>
              <Chip className="bottom-4 right-4 hidden sm:flex">
                <Zap className="h-4 w-4 text-carrot" /> Jake added 40 reps
              </Chip>
            </Stage>
            <div className="px-4 pb-6 sm:px-8 md:py-8 lg:px-12">
              <ModeText
                n="02"
                title="Team vs team"
                body="Class 11A vs 11B. First team to 10,000 pull-ups wins. Every rep counts for the team."
                points={["Live team score", "Alerts when the other team pulls ahead", "Losing team does the forfeit"]}
              />
            </div>
          </article>

          {/* Stakes */}
          <article id="stakes" data-aos="fade-up" className="card scroll-mt-24 !rounded-[2rem] p-6 sm:p-10 lg:p-12">
            <div className="max-w-xl">
              <p className="eyebrow text-carrot">The stakes</p>
              <h3 className="mt-3 text-3xl font-semibold leading-[1.05] sm:text-[2.6rem]">You set the price of losing.</h3>
              <p className="mt-4 text-[1.05rem] text-muted">Anything your group agrees on. A few favorites:</p>
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {stakes.map(({ icon: Icon, title, body }, i) => (
                <li
                  key={title}
                  data-aos="fade-up"
                  data-aos-delay={i * 70}
                  className="bg-dots rounded-[1.25rem] bg-cream p-5 transition-transform duration-200 hover:-translate-y-1"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-carrot text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-5 text-lg font-semibold">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{body}</p>
                </li>
              ))}
            </ul>
          </article>

          {/* Camera, as a real video */}
          <article
            data-aos="fade-up"
            className="grid items-center gap-10 overflow-hidden rounded-[2rem] bg-[#121110] p-6 ring-1 ring-white/5 sm:p-10 md:grid-cols-[1fr_1.3fr] lg:gap-16 lg:p-14"
          >
            <div>
              <p className="eyebrow text-carrot">No cheating</p>
              <h3 className="mt-3 text-3xl font-semibold leading-[1.05] text-white sm:text-[2.6rem]">The camera is the referee.</h3>
              <p className="mt-4 max-w-md text-[1.05rem] leading-relaxed text-white/65">
                Prop up your phone and go. Only full reps count. No &quot;trust me, I did them.&quot;
              </p>
              <Points dark items={["Push-ups, pull-ups, squats", "Half reps don't count", "Any phone works"]} />
            </div>
            <YouTube id={VIDEO_ID} title="How Lobit counts your reps" />
          </article>
        </div>
      </div>
    </section>
  );
}
