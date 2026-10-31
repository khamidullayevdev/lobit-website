import { BunnyHead } from "./Bunny";

type Pose = "wave" | "dumbbell" | "medal" | "phone" | "hearts";

const ORANGE = "#ff6a2b";
const SHADE = "#e85a1f";
const BELLY = "#ffe3d3";
const INK = "#16131f";

function Paw({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="13" fill={ORANGE} />
      <circle cx={x} cy={y + 3} r="7" fill="#ffb48f" opacity="0.7" />
    </g>
  );
}

/**
 * Full-body Lobit bunny for section headers. Drawn in a 200×260 box.
 * The body is drawn first and the head sits on top of it, so the two always read as one character.
 */
export function Mascot({ pose = "wave", className }: { pose?: Pose; className?: string }) {
  const sideArms = pose === "medal" || pose === "hearts";
  return (
    <svg viewBox="0 0 200 260" className={className} role="img" aria-label="Lobit bunny">
      {/* feet */}
      <ellipse cx="72" cy="248" rx="23" ry="11" fill={SHADE} />
      <ellipse cx="128" cy="248" rx="23" ry="11" fill={SHADE} />

      {/* body and belly */}
      <path
        d="M100 132 C152 132 168 186 164 214 C160 242 134 252 100 252 C66 252 40 242 36 214 C32 186 48 132 100 132Z"
        fill={ORANGE}
      />
      <ellipse cx="100" cy="214" rx="38" ry="32" fill={BELLY} />

      {/* arms that hang at the sides (behind any prop) */}
      {(sideArms || pose === "wave") && (
        <ellipse cx="40" cy="202" rx="13" ry="23" fill={SHADE} transform="rotate(22 40 202)" />
      )}
      {sideArms && <ellipse cx="160" cy="202" rx="13" ry="23" fill={SHADE} transform="rotate(-22 160 202)" />}
      {pose === "wave" && (
        <g>
          <ellipse cx="166" cy="150" rx="13" ry="26" fill={SHADE} transform="rotate(-28 166 150)" />
          <circle cx="176" cy="128" r="14" fill={ORANGE} />
        </g>
      )}

      {/* head */}
      <g transform="translate(22 -4) scale(0.78)">
        <BunnyHead
          eyes={pose === "hearts" ? "hearts" : "normal"}
          mood={pose === "dumbbell" ? "fired-up" : "happy"}
          alive={false}
        />
      </g>

      {/* props held in front */}
      {pose === "medal" && (
        <g>
          <path d="M82 150 L100 196 L118 150" stroke="#5b3df5" strokeWidth="9" fill="none" strokeLinejoin="round" />
          <circle cx="100" cy="206" r="18" fill="#ffc93c" stroke="#e0a514" strokeWidth="3.5" />
          <path d="M100 196 l3.2 6.8 7.4.8 -5.5 5 1.5 7.4 -6.6-3.7 -6.6 3.7 1.5-7.4 -5.5-5 7.4-.8z" fill="#fff" />
        </g>
      )}
      {pose === "phone" && (
        <g>
          <rect x="74" y="176" width="52" height="66" rx="10" fill={INK} />
          <rect x="79" y="182" width="42" height="54" rx="6" fill="#fff" />
          <rect x="85" y="190" width="30" height="6" rx="3" fill={ORANGE} />
          <rect x="85" y="201" width="20" height="6" rx="3" fill="#5b3df5" />
          <rect x="85" y="212" width="26" height="6" rx="3" fill="#1fbf86" />
          <Paw x={74} y={220} />
          <Paw x={126} y={220} />
        </g>
      )}
      {pose === "dumbbell" && (
        <g>
          <rect x="20" y="196" width="160" height="10" rx="5" fill={INK} />
          <rect x="8" y="176" width="18" height="50" rx="6" fill={INK} />
          <rect x="174" y="176" width="18" height="50" rx="6" fill={INK} />
          <rect x="28" y="183" width="9" height="36" rx="3" fill="#3a3448" />
          <rect x="163" y="183" width="9" height="36" rx="3" fill="#3a3448" />
          <Paw x={60} y={201} />
          <Paw x={140} y={201} />
        </g>
      )}
      {pose === "wave" && <Paw x={78} y={222} />}
      {sideArms && (
        <>
          <Paw x={32} y={222} />
          <Paw x={168} y={222} />
        </>
      )}
    </svg>
  );
}
