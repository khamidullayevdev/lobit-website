const items = [
  { label: "Push-ups", tone: "bg-carrot-soft text-carrot-dark" },
  { label: "Pull-ups", tone: "bg-plum-soft text-plum-dark" },
  { label: "Sit-ups", tone: "bg-sky-soft text-[#0b7fb8]" },
  { label: "Running", tone: "bg-mint-soft text-[#0f8a5f]" },
  { label: "Survival mode", tone: "bg-sun-soft text-[#a77400]" },
  { label: "Team vs team", tone: "bg-carrot-soft text-carrot-dark" },
  { label: "School tournaments", tone: "bg-plum-soft text-plum-dark" },
];

export function ExerciseMarquee() {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y-2 border-line py-5" aria-hidden>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--page-bg,var(--bg-base))]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--page-bg,var(--bg-base))]" />
      <div className="flex w-max animate-marquee gap-4">
        {row.map((it, i) => (
          <span key={i} className={`whitespace-nowrap rounded-full px-5 py-2 font-display text-lg font-bold ${it.tone}`}>
            {it.label}
          </span>
        ))}
      </div>
    </div>
  );
}
