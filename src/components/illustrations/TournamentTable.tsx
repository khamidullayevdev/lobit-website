import { Trophy, Medal } from "lucide-react";

const rows = [
  { team: "Grade 11 · Room 204", pts: 4820 },
  { team: "Grade 12 · Room 118", pts: 4615 },
  { team: "Grade 10 · Room 309", pts: 4190 },
  { team: "Staff All-Stars", pts: 3870 },
];

const medal = ["text-sun", "text-[#a8a8b8]", "text-[#d08a52]"];

export function TournamentTable() {
  return (
    <div className="card mx-auto w-full max-w-md overflow-hidden">
      <div className="bg-ink p-6 text-white">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sun text-ink">
            <Trophy className="h-6 w-6" />
          </span>
          <div>
            <p className="eyebrow text-[10px] text-white/60">Westbrook High</p>
            <p className="font-display text-xl font-bold">Spring Pull-up Cup</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-white/70">Prize: end-of-term pizza party, sponsored by the PTA</p>
      </div>
      <ol className="divide-y-2 divide-line">
        {rows.map((r, i) => (
          <li key={r.team} data-aos="fade-up" data-aos-delay={i * 80} className="flex items-center gap-4 px-6 py-4">
            <span className="w-6 font-display font-bold text-muted">{i + 1}</span>
            <span className="flex-1 font-semibold">{r.team}</span>
            {i < 3 && <Medal className={`h-5 w-5 ${medal[i]}`} />}
            <span className="font-display font-bold tabular-nums">{r.pts.toLocaleString("en-US")}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
