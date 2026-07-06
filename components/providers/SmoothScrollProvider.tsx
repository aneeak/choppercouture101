"use client";

/**
 * SmoothScrollProvider
 * --------------------
 * Lenis smooth scroll + GSAP ScrollTrigger sync + Context exposure.
 *
 * Proximity-Snapping:
 *   Wenn der Scroll zum Stillstand kommt und ein Stop-Punkt ([data-snap])
 *   nah genug ist (< 28% Viewport-Höhe), gleitet die Seite sanft dorthin —
 *   "leichtes Einrasten" bei Bildern / wichtigen Sektionen. Stoppt man weit
 *   weg von jedem Stop-Punkt, passiert nichts.
 */

import { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LenisCtx = createContext<Lenis | null>(null);
export function useLenis() {
  return useContext(LenisCtx);
}

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const instance = new Lenis({
      duration: 1.4,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      // Etwas weniger pro Wheel-Tick → kontrollierter, leichter zu stoppen.
      wheelMultiplier: 0.9,
    });
    setLenis(instance);

    const raf = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    instance.on("scroll", ScrollTrigger.update);

    // --- Proximity-Snapping ---
    let snapTimer: ReturnType<typeof setTimeout> | null = null;
    let isSnapping = false;

    const checkSnap = () => {
      if (isSnapping) return;
      const targets = Array.from(
        document.querySelectorAll<HTMLElement>("[data-snap]")
      );
      if (!targets.length) return;
      const vh = window.innerHeight;
      const headerOffset = 0;
      let best: HTMLElement | null = null;
      let bestDist = Infinity;
      for (const t of targets) {
        const top = t.getBoundingClientRect().top - headerOffset;
        const dist = Math.abs(top);
        if (dist < bestDist) {
          bestDist = dist;
          best = t;
        }
      }
      // Nur einrasten, wenn nah dran (proximity), aber nicht schon exakt da.
      if (best && bestDist > 6 && bestDist < vh * 0.28) {
        isSnapping = true;
        instance.scrollTo(best, {
          offset: -headerOffset,
          duration: 0.7,
          onComplete: () => {
            isSnapping = false;
          },
        });
      }
    };

    const onScroll = () => {
      if (snapTimer) clearTimeout(snapTimer);
      // Erst wenn ~160ms kein Scroll-Event mehr kam, gilt es als "gestoppt".
      snapTimer = setTimeout(checkSnap, 160);
    };
    instance.on("scroll", onScroll);

    return () => {
      if (snapTimer) clearTimeout(snapTimer);
      gsap.ticker.remove(raf);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisCtx.Provider value={lenis}>{children}</LenisCtx.Provider>;
}
