"use client";
import { useEffect, useState } from "react";

/**
 * Hero
 * ----
 * Full-viewport hero with:
 *   - looping background video
 *   - full-bleed particle wordmark that reacts magnetically to the cursor
 *     (particles flee the mouse, drift back to logo form)
 *   - subline + scroll hint as static chrome on top
 *
 * Stacking:
 *   z-0  video + dark overlay
 *   z-10 ParticleLogo canvas (fills whole hero so particles can roam)
 *   z-20 subline / scroll hint (purely visual; pointer-events:none so the
 *        canvas underneath still receives mouse events)
 */

import ParticleLogo from "@/components/ParticleLogo";

interface HeroProps {
  videoSrc?: string;
  poster?: string;
}

export default function Hero({
  videoSrc = "/videos/hero-loop.mp4",
  poster,
}: HeroProps) {
  // Mobile: kleineres Logo, gröberer Sample-Step → weniger Partikel,
  // schont Akku/CPU auf Handys.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const u = () => setIsMobile(mq.matches);
    u();
    mq.addEventListener("change", u);
    return () => mq.removeEventListener("change", u);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-cc-black">
      {/* z-0: background video */}
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover"
        src={videoSrc}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className="absolute inset-0 z-0 bg-black/20" />

      {/* z-10: full-bleed particle canvas.
          Pulver-Settling (kein Spring, kein Wabbeln):
            - dragRadius 70 → kleine, lokale Pinsel-Zone
            - settle 0.022 → linearer, sanfter Drift zurück zur Form
            - damping 0.78 → Cursor-Impuls stirbt schnell aus
            - Partikel können nicht überschwingen — kein Glibber
       */}
      <div className="absolute inset-0 z-10">
        <ParticleLogo
          src="/logo/wordmark-white.svg"
          color="#f9f9f9"
          sampleStep={isMobile ? 6 : 4}
          logoWidth={isMobile ? 340 : 840}
          particleSize={isMobile ? 1.1 : 0.9}
          dragRadius={isMobile ? 55 : 70}
          dragStrength={0.55}
          settle={0.022}
          damping={0.78}
        />
      </div>

      {/* z-20: subline — left edge, vertically centred (Snow-style editorial
          marginalia). pointer-events-none lets cursor still drive particles. */}
      <p className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-20 pointer-events-none whitespace-nowrap font-mono text-xs md:text-sm tracking-cc-caps uppercase text-cc-offwhite/80">
        Dental Jewellery — Berlin
      </p>

      {/* z-20: scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none font-mono text-[10px] tracking-cc-caps uppercase text-cc-offwhite/60">
        Scroll
      </div>
    </section>
  );
}

/** Kleine Typewriter-Animation für „Got teeth? Got options." */
function TypeClaim() {
  const [txt, setTxt] = useState("");
  const full = "Got teeth? Got options.";
  useEffect(() => {
    let i = 0;
    let cancelled = false;
    const start = setTimeout(() => {
      const tick = () => {
        if (cancelled) return;
        i++;
        setTxt(full.slice(0, i));
        if (i < full.length) setTimeout(tick, 60);
      };
      tick();
    }, 1200);
    return () => {
      cancelled = true;
      clearTimeout(start);
    };
  }, []);
  return (
    <p
      className="absolute right-6 md:right-12 bottom-16 md:bottom-20 z-20 pointer-events-none font-mono text-sm md:text-base tracking-[0.02em] text-cc-offwhite"
      style={{ textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
      aria-label={full}
    >
      {txt}
      <span className="inline-block w-[0.6em] animate-pulse">|</span>
    </p>
  );
}
