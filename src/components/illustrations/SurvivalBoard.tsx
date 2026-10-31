import { Check, Skull, Utensils } from "lucide-react";

const rows = [
  { name: "Maya", status: "done", reps: 20 },
  { name: "Jordan", status: "done", reps: 20 },
  { name: "You", status: "progress", reps: 14 },
  { name: "Sam", status: "progress", reps: 6 },
  { name: "Dev", status: "out", reps: 0 },
] as const;

export function SurvivalBoard() {
  return (
    <div className="card mx-auto w-full max-w-md p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow text-berry">Survival lobby</p>
          <p className="font-display text-xl font-bold">20 push-ups a day</p>
          <p className="text-sm text-muted">Day 9 · 6 of 10 still in</p>
        </div>
        <span className="shrink-0 whitespace-nowrap rounded-xl bg-sun-soft px-3 py-1.5 font-display text-sm font-bold text-[#a77400]">5h 12m left</span>
      </div>

      <ul className="mt-5 space-y-3">
        {rows.map((r, i) => (
          <li key={r.name} data-aos="fade-left" data-aos-delay={i * 90} className="flex items-center gap-3">
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-bold text-white ${
                r.status === "out" ? "bg-line text-muted" : r.name === "You" ? "bg-carrot" : "bg-plum"
              }`}
            >
              {r.name[0]}
            </span>
            <div className="flex-1">
              <div className="flex justify-between text-sm">
                <span className={`font-semibold ${r.status === "out" ? "text-muted line-through" : ""}`}>{r.name}</span>
                <span className="font-display font-bold tabular-nums text-muted">
                  {r.status === "out" ? "eliminated" : `${r.reps}/20`}
                </span>
              </div>
              <div className="mt-1 h-2.5 overflow-hidden rounded-full bg-cream">
                <div
                  className={`h-full rounded-full ${r.status === "done" ? "bg-mint" : r.status === "out" ? "bg-line" : "bg-carrot"}`}
                  style={{ width: `${(r.reps / 20) * 100}%` }}
                />
              </div>
            </div>
            <span className="w-5">
              {r.status === "done" && <Check className="h-5 w-5 text-mint" strokeWidth={3} />}
              {r.status === "out" && <Skull className="h-5 w-5 text-berry" />}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center gap-3 rounded-2xl bg-plum-soft p-4">
        <Utensils className="h-5 w-5 shrink-0 text-plum" />
        <p className="text-sm">
          <span className="font-bold">The stakes:</span> Dev was out first. Dev buys dinner for all 10.
        </p>
      </div>
    </div>
  );
}
