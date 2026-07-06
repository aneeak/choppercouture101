"use client";

/**
 * StickyVideo
 * -----------
 * Video-Wrapper mit „Andocken"-Verhalten: das Video bleibt im Viewport
 * hängen (sticky top-0), während der Nutzer scrollt. Der äußere Container
 * ist ~180vh hoch → Nutzer scrollt „durch" das Video hindurch, es bleibt
 * ein Stück in der Ansicht kleben und wird dann wieder freigegeben.
 *
 * Reine CSS-Lösung (position: sticky) — kein GSAP-Pin nötig, spielt gut
 * mit Lenis zusammen.
 *
 * `dwell` steuert wie lange das Video „klebt": höher = längeres Hängen.
 */

import { useRef, useState } from "react";

interface StickyVideoProps {
  src: string;
  /** Multiplikator der Viewport-Höhe für die Verweildauer. 1.6 = 60% extra Scroll. */
  dwell?: number;
  /** Soll ein Sound-Toggle sichtbar sein? */
  withSound?: boolean;
  /** Hintergrundfarbe außerhalb des Videos */
  bg?: "light" | "dark";
}

export default function StickyVideo({
  src,
  dwell = 1.6,
  withSound = false,
  bg = "light",
}: StickyVideoProps) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);
  const bgClass = bg === "dark" ? "bg-cc-black" : "bg-cc-offwhite";

  const toggleSound = () => {
    if (!ref.current) return;
    ref.current.muted = !ref.current.muted;
    if (!ref.current.muted && ref.current.paused) ref.current.play();
    setMuted(ref.current.muted);
  };

  return (
    <div className={`${bgClass}`} style={{ height: `${dwell * 100}vh` }}>
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-cc-black">
        <video
          ref={ref}
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        {withSound && (
          <button
            type="button"
            onClick={toggleSound}
            className="absolute bottom-6 right-6 md:bottom-10 md:right-12 z-10 flex items-center gap-2 rounded-full bg-cc-black/60 backdrop-blur-md px-4 py-2 text-xs tracking-cc-caps uppercase text-cc-offwhite hover:bg-cc-black/85 transition-colors"
            aria-label={muted ? "Ton einschalten" : "Ton ausschalten"}
          >
            <span aria-hidden>{muted ? "🔇" : "🔊"}</span>
            <span>{muted ? "Ton an" : "Ton aus"}</span>
          </button>
        )}
      </div>
    </div>
  );
}
