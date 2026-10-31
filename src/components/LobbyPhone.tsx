"use client";

import { useEffect, useState } from "react";
import { motion, LayoutGroup } from "motion/react";
import { Flame } from "lucide-react";

type Player = { id: string; name: string; reps: number; color: string; you?: boolean };

const START: Player[] = [
  { id: "m", name: "Maya", reps: 41, color: "bg-plum" },
  { id: "j", name: "Jordan", reps: 33, color: "bg-sky" },
  { id: "y", name: "You", reps: 26, color: "bg-carrot", you: true },
  { id: "d", name: "Dev", reps: 19, color: "bg-mint" },
];

const TARGET = 50;

/** Hero phone: a live lobby where "You" climbs the leaderboard rep by rep. */
export function LobbyPhone() {
  const [players, setPlayers] = useState(START);

  useEffect(() => {
    const id = window.setInterval(() => {
      setPlayers((prev) => {
        const me = prev.find((p) => p.you)!;
        if (me.reps >= TARGET) return START;
        return prev.map((p) =>
          p.you ? { ...p, reps: p.reps + 1 } : Math.random() < 0.18 ? { ...p, reps: Math.min(p.reps + 1, 48) } : p,
        );
      });
    }, 260);
    return () => window.clearInterval(id);
  }, []);

  const sorted = [...players].sort((a, b) => b.reps - a.reps);
  const me = players.find((p) => p.you)!;
  const pct = Math.min(me.reps / TARGET, 1);
  const r = 46;
  const circ = 2 * Math.PI * r;

  return (
    <div className="relative mx-auto w-[290px] rounded-[2.6rem] border-[10px] border-ink bg-ink shadow-[0_30px_60px_-20px_rgba(22,19,31,0.45)] sm:w-[310px]">
      <div className="overflow-hidden rounded-[2rem] bg-cream">
        <div className="flex items-center justify-between px-5 pb-2 pt-4 text-[11px] font-semibold text-fg">
          <span>9:41</span>
          <span className="h-5 w-20 rounded-full bg-ink" />
          <span>100%</span>
        </div>

        <div className="px-5 pb-5">
          <p className="eyebrow text-plum">Office Push-up Wars</p>
          <p className="font-display text-lg font-bold leading-tight">Day 6 · 50 reps to survive</p>

          <div className="mt-4 flex items-center gap-4 rounded-2xl bg-surface p-3 shadow-[0_3px_0_var(--color-line)]">
            <div className="relative h-[108px] w-[108px] shrink-0">
              <svg viewBox="0 0 108 108" className="h-full w-full -rotate-90">
                <circle cx="54" cy="54" r={r} stroke="var(--color-carrot-soft)" strokeWidth="10" fill="none" />
                <circle
                  cx="54"
                  cy="54"
                  r={r}
                  stroke="var(--color-carrot)"
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={circ}
                  strokeDashoffset={circ * (1 - pct)}
                  style={{ transition: "stroke-dashoffset 250ms ease" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-3xl font-extrabold tabular-nums leading-none">{me.reps}</span>
                <span className="text-[10px] font-semibold text-muted">/ {TARGET} reps</span>
              </div>
            </div>
            <div className="text-xs leading-snug text-muted">
              <span className="mb-1 flex items-center gap-1 whitespace-nowrap font-display text-sm font-bold text-mint">
                <span className="h-2 w-2 animate-pulse rounded-full bg-mint" /> Camera on
              </span>
              Every rep checked. Half reps don&apos;t count.
            </div>
          </div>

          <LayoutGroup>
            <ul className="mt-4 space-y-2">
              {sorted.map((p, i) => (
                <motion.li
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 38 }}
                  key={p.id}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm ${
                    p.you ? "bg-carrot-soft ring-2 ring-carrot" : "bg-surface"
                  }`}
                >
                  <span className="w-3 font-display font-bold text-muted">{i + 1}</span>
                  <span className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold text-white ${p.color}`}>
                    {p.name[0]}
                  </span>
                  <span className="flex-1 font-semibold">{p.name}</span>
                  {i === 0 && <Flame className="h-4 w-4 text-carrot" aria-hidden />}
                  <span className="font-display font-bold tabular-nums">{p.reps}</span>
                </motion.li>
              ))}
            </ul>
          </LayoutGroup>
        </div>
      </div>
    </div>
  );
}
