"use client";

import { motion } from "motion/react";

const GOAL = 10000;
const teams = [
  { name: "Class 11A", reps: 9520, bar: "bg-plum", soft: "bg-plum-soft", members: 5 },
  { name: "Class 11B", reps: 8710, bar: "bg-sky", soft: "bg-sky-soft", members: 5 },
];

export function TeamRace() {
  return (
    <div className="card mx-auto w-full max-w-md p-6">
      <p className="eyebrow text-plum">Team vs team</p>
      <p className="font-display text-xl font-bold">First to 10,000 pull-ups</p>
      <div className="mt-6 space-y-6">
        {teams.map((t, i) => (
          <div key={t.name}>
            <div className="mb-2 flex items-end justify-between">
              <div>
                <p className="font-display text-lg font-bold">{t.name}</p>
                <p className="text-xs text-muted">{t.members} members</p>
              </div>
              <p className="font-display text-2xl font-extrabold tabular-nums">
                {t.reps.toLocaleString("en-US")}
              </p>
            </div>
            <div className={`h-5 overflow-hidden rounded-full ${t.soft}`}>
              <motion.div
                className={`h-full rounded-full ${t.bar}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${(t.reps / GOAL) * 100}%` }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1.4, delay: 0.2 + i * 0.2, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3 text-center">
        {[
          ["Your reps", "1,840"],
          ["To go", "480"],
          ["Day", "12"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-xl bg-cream py-3">
            <p className="font-display text-lg font-bold">{v}</p>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">{k}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
