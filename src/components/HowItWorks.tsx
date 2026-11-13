import type { ReactNode } from "react";
import { ArrowUpRight, Check, Copy, Crown } from "lucide-react";

function LobbySetup() {
  return (
    <div className="w-full max-w-[220px] rounded-2xl bg-surface p-3.5 shadow-[0_14px_30px_-16px_rgba(18,17,16,0.4)] ring-1 ring-line">
      <p className="font-mono text-[0.6rem] uppercase tracking-wider text-muted">New lobby</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {["Survival", "Team vs team"].map((e, i) => (
          <span
            key={e}
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${i === 0 ? "bg-carrot text-white" : "bg-cream text-muted"}`}
          >
            {e}
          </span>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-1.5 text-xs">
        <span className="rounded-lg bg-cream px-2.5 py-1.5">
          <b className="block text-sm">20</b>
          <span className="text-muted">push-ups / day</span>
        </span>
        <span className="rounded-lg bg-cream px-2.5 py-1.5">
          <b className="block text-sm">10</b>
          <span className="text-muted">players</span>
        </span>
      </div>
    </div>
  );
}

function Invite() {
  const crew = ["bg-plum", "bg-sky", "bg-mint", "bg-berry", "bg-sun"];
  return (
    <div className="flex w-full max-w-[220px] flex-col items-center gap-3">
      <div className="flex -space-x-2.5">
        {crew.map((c, i) => (
          <span
            key={c}
            className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ring-[3px] ring-[var(--plum-soft)] ${c}`}
          >
            {"MJPDA"[i]}
          </span>
        ))}
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-xs font-bold text-muted ring-[3px] ring-[var(--plum-soft)]">
          +9
        </span>
      </div>
      <span className="flex w-full items-center justify-between gap-2 rounded-full bg-surface py-1.5 pl-3.5 pr-1.5 shadow-[0_14px_30px_-16px_rgba(18,17,16,0.4)] ring-1 ring-line">
        <span className="truncate font-mono text-xs text-muted">Invite code: x7Kp</span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-plum text-white">
          <Copy className="h-3.5 w-3.5" />
        </span>
      </span>
    </div>
  );
}

function Film() {
  return (
    <div className="relative h-[124px] w-full max-w-[200px] rounded-2xl bg-[#121110] p-3 text-white shadow-[0_14px_30px_-16px_rgba(18,17,16,0.6)]">
      {["left-2 top-2 border-l-2 border-t-2", "right-2 top-2 border-r-2 border-t-2", "bottom-2 left-2 border-b-2 border-l-2", "bottom-2 right-2 border-b-2 border-r-2"].map(
        (c) => (
          <span key={c} className={`absolute h-4 w-4 rounded-[3px] border-white/40 ${c}`} />
        ),
      )}
      <span className="flex items-center gap-1.5 pl-1 pt-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-white/70">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-berry" /> Rec
      </span>
      <p className="absolute bottom-3 left-4 text-4xl font-semibold leading-none tracking-[-0.05em] tabular-nums">23</p>
      <span className="absolute bottom-3.5 right-4 flex items-center gap-1 rounded-full bg-mint px-2 py-0.5 text-[0.65rem] font-bold">
        <Check className="h-3 w-3" strokeWidth={3} /> Full rep
      </span>
    </div>
  );
}

function Podium() {
  const bars = [
    { h: "h-12", n: "J", c: "bg-plum", place: 2 },
    { h: "h-20", n: "M", c: "bg-carrot", place: 1 },
    { h: "h-8", n: "P", c: "bg-mint", place: 3 },
  ];
  return (
    <div className="flex items-end gap-2">
      {bars.map((b) => (
        <div key={b.n} className="flex w-14 flex-col items-center">
          {b.place === 1 && <Crown className="mb-1 h-5 w-5 text-[#d99a00]" />}
          <span className={`mb-1.5 flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white ${b.c}`}>
            {b.n}
          </span>
          <span
            className={`flex w-full items-start justify-center rounded-t-xl bg-surface pt-1.5 font-mono text-xs font-semibold text-muted ring-1 ring-line ${b.h}`}
          >
            {b.place}
          </span>
        </div>
      ))}
    </div>
  );
}

const steps: { title: string; body: string; tone: string; visual: ReactNode }[] = [
  { title: "Make a lobby", body: "Pick a mode and a daily challenge.", tone: "bg-carrot-soft", visual: <LobbySetup /> },
  { title: "Invite friends", body: "Send one link. Agree on the stakes.", tone: "bg-plum-soft", visual: <Invite /> },
  { title: "Do your reps", body: "Film them. The camera counts.", tone: "bg-sky-soft", visual: <Film /> },
  { title: "Loser pays up", body: "The board decides. No arguing.", tone: "bg-sun-soft", visual: <Podium /> },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" data-bg="base" className="scroll-mt-20 py-20 md:py-28">
      <div className="container-x">
        <div className="grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-end md:gap-16">
          <div data-aos="fade-up">
            <p className="eyebrow text-carrot">How it works</p>
            <h2 className="mt-3 text-4xl font-semibold leading-[1.02] sm:text-6xl">Set up in a minute. Settle it in a week.</h2>
          </div>
          <div data-aos="fade-up" data-aos-delay="100">
            <p className="text-lg leading-relaxed text-muted">
              All you need is a phone and friends who hate losing.
            </p>
            <a href="#waitlist" className="group mt-6 inline-flex items-center">
              <span className="flex h-11 items-center rounded-full bg-ink px-5 text-sm font-semibold text-white dark:bg-white dark:text-ink">
                Start a lobby
              </span>
              <span className="-ml-1 flex h-11 w-11 items-center justify-center rounded-full bg-carrot text-white transition-transform duration-200 group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} />
              </span>
            </a>
          </div>
        </div>

        <ol className="mt-12 grid gap-5 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} data-aos="fade-up" data-aos-delay={i * 90} className="card flex flex-col !rounded-[1.75rem] p-3 pb-6">
              <div className={`bg-dots flex h-48 items-center justify-center rounded-[1.25rem] px-4 ${s.tone}`}>{s.visual}</div>
              <div className="px-3 pt-5">
                <p className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.1em] text-muted">
                  Step {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1.5 text-xl font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-muted">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
