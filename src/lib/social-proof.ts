// PLACEHOLDER CONTENT. The app hasn't launched, so these numbers and quotes are
// illustrative. Replace them with real data (e.g. a Convex query for the rep total)
// and real, consented user quotes before the site goes public.

export const repsLastWeek = 2_486_913;

export type Testimonial = {
  quote: string;
  name: string;
  detail: string;
  color: string;
  before: string;
  after: string;
  gain: string;
};

export const testimonials: Testimonial[] = [
  {
    quote: "First one out bought dinner for all 10 of us. It wasn't me. That's all that matters.",
    name: "Marcus T.",
    detail: "Survival lobby · 10 friends",
    color: "bg-carrot",
    before: "20",
    after: "65",
    gain: "+45 push-ups",
  },
  {
    quote: "11B lost to us by 300 pull-ups. Their comedy show in the hallway was the best day of the year.",
    name: "Priya S.",
    detail: "Team vs team · Class 11A",
    color: "bg-plum",
    before: "3",
    after: "14",
    gain: "+11 pull-ups",
  },
  {
    quote: "We all put in $50. I won a new watch for doing squats. Best deal of my life.",
    name: "Jordan K.",
    detail: "Prize pool · 8 friends",
    color: "bg-sky",
    before: "40",
    after: "100",
    gain: "+60 squats",
  },
  {
    quote: "The losing class had to buy the winners game tickets. The kids never trained this hard for a grade.",
    name: "Ms. Alvarez",
    detail: "PE teacher · Westbrook High",
    color: "bg-mint",
    before: "62%",
    after: "94%",
    gain: "class joined in",
  },
  {
    quote: "Loser had to post a cringe dance on their story. I have never done push-ups faster.",
    name: "Dani R.",
    detail: "Survival lobby · 6 friends",
    color: "bg-berry",
    before: "30",
    after: "80",
    gain: "+50 push-ups",
  },
  {
    quote: "No more arguing about who really did their reps. The camera saw it. Pay up.",
    name: "Coach Bell",
    detail: "Team vs team · 18 players",
    color: "bg-sun",
    before: "12",
    after: "18",
    gain: "all 18 finished",
  },
];

/** Bento stats for the "proof" section. Also placeholders. */
export const proof = {
  states: 38,
  lobbies: "12k+",
  streakRate: 72, // % of players who kept a 7-day streak in their first month
  avgGain: 31, // average extra reps per set after 6 weeks
  phoneStats: [
    { label: "Push-ups", value: 64, color: "bg-carrot" },
    { label: "Sit-ups", value: 88, color: "bg-plum" },
    { label: "Pull-ups", value: 12, color: "bg-sky" },
  ],
  phoneQuote: "Not buying dinner for 10. Not happening.",
  feature: {
    quote:
      "I couldn't do ten push-ups. Then my friends bet a dinner on it. Now I'm the one sending the trash talk.",
    name: "Alex M.",
    detail: "Survival lobby · 10 friends",
    before: "8",
    after: "50",
    unit: "push-ups",
  },
};
