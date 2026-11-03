import { useId } from "react";

type HeadProps = {
  mood?: "happy" | "fired-up";
  eyes?: "normal" | "hearts";
  /** Wiggle the ears and blink. */
  alive?: boolean;
};

type BunnyProps = HeadProps & { className?: string };

/** The head on its own, drawn in a 200×210 box. Shared by the logo bunny and the full-body mascot. */
export function BunnyHead({ mood = "happy", eyes = "normal", alive = true }: HeadProps) {
  const clip = useId();
  return (
    <g>
      {/* Ears */}
      <g
        className={alive ? "animate-ear-left" : undefined}
        style={{ transformOrigin: "78px 98px", transformBox: "view-box" }}
      >
        <ellipse cx="74" cy="52" rx="19" ry="48" transform="rotate(-12 74 52)" fill="#ff6a2b" />
        <ellipse cx="74" cy="56" rx="8.5" ry="33" transform="rotate(-12 74 56)" fill="#ffb48f" />
      </g>
      <g
        className={alive ? "animate-ear-right" : undefined}
        style={{ transformOrigin: "122px 98px", transformBox: "view-box" }}
      >
        <ellipse cx="126" cy="52" rx="19" ry="48" transform="rotate(12 126 52)" fill="#ff6a2b" />
        <ellipse cx="126" cy="56" rx="8.5" ry="33" transform="rotate(12 126 56)" fill="#ffb48f" />
      </g>

      {/* Head */}
      <clipPath id={clip}>
        <ellipse cx="100" cy="138" rx="72" ry="64" />
      </clipPath>
      <ellipse cx="100" cy="138" rx="72" ry="64" fill="#ff6a2b" />
      <g clipPath={`url(#${clip})`}>
        <rect x="20" y="92" width="160" height="20" fill="#5b3df5" />
        <rect x="20" y="106" width="160" height="6" fill="#4027c9" />
        <ellipse cx="100" cy="196" rx="70" ry="22" fill="#e85a1f" opacity="0.35" />
      </g>

      {/* Eyebrows when fired up */}
      {mood === "fired-up" && eyes === "normal" && (
        <g stroke="#16131f" strokeWidth="6" strokeLinecap="round">
          <line x1="64" y1="122" x2="86" y2="128" />
          <line x1="136" y1="122" x2="114" y2="128" />
        </g>
      )}

      {/* Eyes */}
      {eyes === "hearts" ? (
        <g fill="#701F35">
          <path d="M76 154 L63 140 A7 7 0 0 1 76 131 A7 7 0 0 1 89 140 Z" />
          <path d="M124 154 L111 140 A7 7 0 0 1 124 131 A7 7 0 0 1 137 140 Z" />
        </g>
      ) : (
        <g
          className={alive ? "animate-blink" : undefined}
          style={{ transformOrigin: "100px 140px", transformBox: "view-box" }}
        >
          <ellipse cx="76" cy="141" rx="9.5" ry="11.5" fill="#16131f" />
          <ellipse cx="124" cy="141" rx="9.5" ry="11.5" fill="#16131f" />
          <circle cx="79.5" cy="136.5" r="3.4" fill="#fff" />
          <circle cx="127.5" cy="136.5" r="3.4" fill="#fff" />
        </g>
      )}

      {/* Cheeks */}
      <ellipse cx="56" cy="160" rx="11" ry="7" fill="#ff4d6d" opacity="0.35" />
      <ellipse cx="144" cy="160" rx="11" ry="7" fill="#ff4d6d" opacity="0.35" />

      {/* Muzzle, nose, mouth, teeth */}
      <ellipse cx="100" cy="167" rx="25" ry="18" fill="#ffe3d3" />
      <path d="M92 156 Q100 151 108 156 Q104 163 100 164 Q96 163 92 156Z" fill="#16131f" />
      {/* Teeth sit below the mouth curve so the curve reads as the moustache in front of them. */}
      <rect x="94" y="176" width="5.5" height="7" rx="1.5" fill="#fff" />
      <rect x="100.5" y="176" width="5.5" height="7" rx="1.5" fill="#fff" />
      <path
        d="M100 164 V170 M100 170 Q93 177 87 172 M100 170 Q107 177 113 172"
        stroke="#16131f"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </g>
  );
}

/** Lobbit's mascot head: an orange bunny in a sweatband. Drawn in code so it stays crisp at any size. */
export function Bunny({ className, ...head }: BunnyProps) {
  return (
    <svg viewBox="0 0 200 210" className={className} role="img" aria-label="Lobbit bunny">
      <BunnyHead {...head} />
    </svg>
  );
}
