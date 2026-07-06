/**
 * PlaceholderImage
 * ----------------
 * Brand-toned image tile used until real photography lands. Renders as a
 * full-width block with a chosen aspect ratio, a faint grain-like gradient
 * and a small mono label so it's obvious which slot needs which asset.
 *
 * Replace each instance with <Image src=... /> once real shots arrive.
 */

interface PlaceholderImageProps {
  /** CSS aspect ratio, e.g. "4/3", "16/9", "1/1", "3/4". */
  ratio?: string;
  /** Headline label rendered inside the tile. */
  label: string;
  /** Smaller hint underneath the label — usually the target pixel size. */
  hint?: string;
  /** Visual tone — brand-aligned palettes. */
  tone?: "dark" | "light" | "gradient" | "purple";
  className?: string;
}

const TONES: Record<
  NonNullable<PlaceholderImageProps["tone"]>,
  { bg: string; text: string; pattern: string }
> = {
  dark: {
    bg: "bg-cc-black",
    text: "text-cc-offwhite/50",
    pattern:
      "bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.04),transparent_60%)]",
  },
  light: {
    bg: "bg-cc-offwhite",
    text: "text-cc-black/40",
    pattern:
      "bg-[radial-gradient(circle_at_30%_30%,rgba(0,0,0,0.04),transparent_60%)]",
  },
  gradient: {
    bg: "bg-cc-gradient",
    text: "text-cc-black/50",
    pattern:
      "bg-[radial-gradient(circle_at_70%_30%,rgba(85,51,255,0.15),transparent_60%)]",
  },
  purple: {
    bg: "bg-cc-purple",
    text: "text-cc-offwhite/70",
    pattern:
      "bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.12),transparent_60%)]",
  },
};

export default function PlaceholderImage({
  ratio = "4/3",
  label,
  hint,
  tone = "dark",
  className = "",
}: PlaceholderImageProps) {
  const t = TONES[tone];
  return (
    <div
      className={`relative w-full overflow-hidden ${t.bg} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <div className={`absolute inset-0 ${t.pattern}`} />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
        <p
          className={`font-mono text-[10px] md:text-xs tracking-cc-caps uppercase ${t.text}`}
        >
          {label}
        </p>
        {hint && (
          <p
            className={`font-mono text-[10px] tracking-cc-caps ${t.text} opacity-70`}
          >
            {hint}
          </p>
        )}
      </div>
      {/* Corner crosshairs — printer-style register marks */}
      {(["top-2 left-2", "top-2 right-2", "bottom-2 left-2", "bottom-2 right-2"] as const).map(
        (pos) => (
          <span
            key={pos}
            className={`absolute ${pos} w-3 h-3 border ${t.text} opacity-40`}
            aria-hidden
            style={{
              borderTopWidth: pos.startsWith("top") ? "1px" : 0,
              borderBottomWidth: pos.startsWith("bottom") ? "1px" : 0,
              borderLeftWidth: pos.includes("left") ? "1px" : 0,
              borderRightWidth: pos.includes("right") ? "1px" : 0,
            }}
          />
        )
      )}
    </div>
  );
}
