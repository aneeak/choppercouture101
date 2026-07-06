"use client";

/**
 * ProcessVideo — der komplette Herstellungsprozess als Video mit Ton.
 * Startet standardmäßig muted (autoplay-Policy der Browser), User kann
 * den Ton mit einem Klick einschalten.
 */

import { useRef, useState } from "react";

export default function ProcessVideo({
  src = "/videos/process.mp4",
}: {
  src?: string;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    if (!ref.current) return;
    const v = ref.current;
    v.muted = !v.muted;
    if (!v.muted && v.paused) v.play();
    setMuted(v.muted);
  };

  return (
    <div className="relative w-full aspect-video bg-cc-black overflow-hidden">
      <video
        ref={ref}
        className="h-full w-full object-cover"
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      {/* Sound-Toggle rechts unten */}
      <button
        type="button"
        onClick={toggleSound}
        className="absolute bottom-6 right-6 md:bottom-8 md:right-10 z-10 flex items-center gap-2 rounded-full bg-cc-black/60 backdrop-blur-md px-4 py-2 text-xs tracking-cc-caps uppercase text-cc-offwhite hover:bg-cc-black/80 transition-colors"
        aria-label={muted ? "Ton einschalten" : "Ton ausschalten"}
      >
        <span aria-hidden>{muted ? "🔇" : "🔊"}</span>
        <span>{muted ? "Ton an" : "Ton aus"}</span>
      </button>
    </div>
  );
}
