"use client";

/**
 * Logo
 * ----
 * Brand wordmark "CHOPPER ⚡ COUTURE" with two behaviours:
 *   1. Idle: subtle blur-breathing (0 → 1.5px → 0 over 6s).
 *   2. Hover: blur up to 8px + fade to opacity 0.4 over 600ms,
 *      reverse over 400ms on leave. "Schau hinter die Marke."
 *
 * Uses the real SVG wordmark from the brand book — not a placeholder.
 *
 * `size`:
 *   - "hero":  responsive 4rem → 12vw → 12rem (homepage hero)
 *   - "nav":   compact for the top navigation bar
 */

import Image from "next/image";
import { useState } from "react";

type Variant = "white" | "black";
type Size = "hero" | "nav";

interface LogoProps {
  variant?: Variant;
  size?: Size;
  /** Disable interactive hover blur (e.g. inside nav). */
  interactive?: boolean;
  className?: string;
}

export default function Logo({
  variant = "white",
  size = "hero",
  interactive = true,
  className = "",
}: LogoProps) {
  const [hover, setHover] = useState(false);

  const src = `/logo/wordmark-${variant}.svg`;

  // ASSUMPTION: native CSS transition for the hover state — keeps it cheap,
  // GPU-composited and avoids JS animation overhead.
  const transitionStyle = interactive
    ? {
        filter: hover ? "blur(8px)" : "blur(0px)",
        opacity: hover ? 0.4 : 1,
        transition: hover
          ? "filter 600ms var(--ease-cc-out), opacity 600ms var(--ease-cc-out)"
          : "filter 400ms var(--ease-cc-out), opacity 400ms var(--ease-cc-out)",
      }
    : undefined;

  const sizeClass =
    size === "hero"
      ? "w-[clamp(16rem,40vw,40rem)] aspect-[340/454]"
      : "w-10 aspect-[340/454]";

  return (
    <div
      className={`relative ${sizeClass} ${
        interactive ? "cc-logo-idle cursor-pointer" : ""
      } ${className}`}
      style={transitionStyle}
      onMouseEnter={() => interactive && setHover(true)}
      onMouseLeave={() => interactive && setHover(false)}
      aria-label="Chopper Couture"
    >
      <Image
        src={src}
        alt="Chopper Couture"
        fill
        priority={size === "hero"}
        sizes={size === "hero" ? "(max-width: 768px) 80vw, 40vw" : "40px"}
        className="object-contain"
      />
    </div>
  );
}
