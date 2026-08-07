export default function HeroVisual() {
  return (
    <div className="relative w-full max-w-[320px] sm:max-w-sm">
      <svg
        viewBox="0 0 400 500"
        role="img"
        aria-label="Abstract geometric composition — rings, wireframe card, and accent marks in the brand palette"
        className="block w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        <rect width="400" height="500" fill="var(--background)" stroke="var(--foreground)" strokeWidth="2" />

        <g stroke="var(--foreground)" strokeWidth="2" fill="none">
          <rect x="44" y="60" width="132" height="88" />
          <rect x="56" y="76" width="44" height="10" fill="var(--accent)" stroke="none" />
          <line x1="56" y1="100" x2="160" y2="100" stroke="var(--border)" strokeWidth="2" />
          <line x1="56" y1="112" x2="132" y2="112" stroke="var(--border)" strokeWidth="2" />
          <rect x="56" y="124" width="48" height="16" stroke="var(--border)" strokeWidth="1.5" />
        </g>

        <circle cx="200" cy="262" r="150" fill="none" stroke="var(--foreground)" strokeWidth="2" />
        <circle cx="200" cy="262" r="116" fill="none" stroke="var(--foreground)" strokeWidth="1.5" strokeDasharray="3 9" />
        <circle cx="200" cy="262" r="84" fill="var(--accent)" />
        <circle cx="200" cy="262" r="40" fill="var(--foreground)" />
        <circle cx="200" cy="262" r="12" fill="var(--background)" />

        <g>
          <rect x="316" y="44" width="28" height="28" fill="var(--foreground)" />
          <rect x="316" y="84" width="28" height="28" fill="none" stroke="var(--foreground)" strokeWidth="2" />
          <rect x="352" y="44" width="28" height="28" fill="var(--accent)" />
        </g>

        <g>
          <rect x="48" y="352" width="116" height="76" fill="var(--foreground)" />
          <rect x="60" y="364" width="40" height="6" fill="var(--accent)" />
          <line x1="60" y1="382" x2="148" y2="382" stroke="var(--background)" strokeOpacity="0.7" strokeWidth="2" />
          <line x1="60" y1="394" x2="120" y2="394" stroke="var(--background)" strokeOpacity="0.7" strokeWidth="2" />
        </g>

        <rect x="328" y="416" width="28" height="28" fill="var(--accent)" />
        <rect x="328" y="416" width="28" height="28" fill="none" stroke="var(--foreground)" strokeWidth="2" transform="translate(-6 -6)" />
      </svg>
    </div>
  );
}
