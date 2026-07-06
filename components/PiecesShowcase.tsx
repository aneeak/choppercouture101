"use client";

/**
 * PiecesShowcase
 * --------------
 * Desktop (md+): Pin-Horizontal-Scroll via GSAP — vertikales Scrollen
 *                bewegt die Bilder horizontal (2 pro Viewport).
 * Mobile:        Natives horizontales Swipe mit snap. Kein Pin, weil
 *                Pin-Scroll auf Touch-Geräten unangenehm ist und Nutzer:innen
 *                oft nicht wissen, wie sie „raus" scrollen. Ein Bild pro
 *                Viewport (85vw), snap-x snap-mandatory.
 */

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const DIR = "/images/pieces-new";

const PIECES: { src: string; cap: string }[] = [
  { src: `${DIR}/DSC00550.jpg`, cap: "V-01" },
  { src: `${DIR}/DSC00615.jpg`, cap: "V-02" },
  { src: `${DIR}/DSC00585.jpg`, cap: "V-03" },
  { src: `${DIR}/DSC00412.jpg`, cap: "V-04" },
  { src: `${DIR}/DSC00386.jpg`, cap: "V-05" },
  { src: `${DIR}/DSC00519.jpg`, cap: "V-06" },
  { src: `${DIR}/DSC00572.jpg`, cap: "V-07" },
  { src: `${DIR}/DSC00511.jpg`, cap: "V-08" },
  { src: `${DIR}/DSC00537.jpg`, cap: "V-09" },
  { src: `${DIR}/DSC00444.jpg`, cap: "V-10" },
  { src: `${DIR}/DSC00559.jpg`, cap: "V-11" },
  { src: `${DIR}/DSC00394.jpg`, cap: "V-12" },
  { src: `${DIR}/DSC00381.jpg`, cap: "V-13" },
  { src: `${DIR}/DSC00571.jpg`, cap: "V-14" },
];

function DesktopPinScroll() {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  const skipGallery = () => {
    if (!outerRef.current) return;
    const rect = outerRef.current.getBoundingClientRect();
    // Ans Ende der Pin-Sektion + kleiner Puffer scrollen
    const target = rect.bottom + window.scrollY - window.innerHeight + 4;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  useEffect(() => {
    if (!outerRef.current || !pinRef.current || !trackRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const getDistance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth);
      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: outerRef.current!,
          pin: pinRef.current!,
          start: "top top",
          end: () => `+=${getDistance()}`,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => setProgress(self.progress),
        },
      });
      const onResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener("resize", onResize);
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }, outerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={outerRef} className="relative">
      <div
        ref={pinRef}
        className="relative h-screen w-screen overflow-hidden bg-cc-offwhite"
      >
        <div
          ref={trackRef}
          className="flex h-full will-change-transform"
          style={{ width: `${PIECES.length * 50}vw` }}
        >
          {PIECES.map((p, i) => (
            <figure
              key={`${p.src}-${i}`}
              className="group relative h-full shrink-0 bg-cc-black overflow-hidden"
              style={{ width: "50vw", perspective: "1200px" }}
            >
              <div
                className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform group-hover:scale-[1.04] group-hover:-translate-y-1 group-hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)]"
              >
                <Image
                  src={p.src}
                  alt={p.cap}
                  fill
                  sizes="50vw"
                  className="object-cover"
                  priority={i < 2}
                />
              </div>
              <figcaption
                className="absolute bottom-8 left-8 text-xs tracking-cc-caps uppercase text-cc-offwhite z-10"
                style={{ textShadow: "0 1px 6px rgba(0,0,0,0.85)" }}
              >
                {p.cap}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Skip-Button links unten */}
        <button
          type="button"
          onClick={skipGallery}
          className="absolute bottom-10 left-12 z-10 rounded-full bg-cc-black/60 backdrop-blur-md px-5 py-2.5 text-xs tracking-cc-caps uppercase text-cc-offwhite hover:bg-cc-black/85 transition-colors"
        >
          Galerie überspringen →
        </button>

        {/* Fortschritt rechts unten */}
        <div className="pointer-events-none absolute bottom-10 right-12 flex items-center gap-4">
          <p className="text-xs tracking-cc-caps uppercase text-cc-offwhite mix-blend-difference">
            Scroll · {PIECES.length} Stücke
          </p>
          <div className="relative h-[2px] w-48 bg-cc-offwhite/30">
            <div
              className="absolute inset-y-0 left-0 bg-cc-offwhite"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileSwipe() {
  return (
    <div className="w-full">
      <div className="w-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex gap-3 px-6 pb-4 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
        {PIECES.map((p, i) => (
          <figure
            key={`${p.src}-${i}`}
            className="relative shrink-0 snap-center bg-cc-black rounded-sm"
            style={{ width: "85vw", aspectRatio: "4 / 5" }}
          >
            <Image
              src={p.src}
              alt={p.cap}
              fill
              sizes="85vw"
              className="object-cover"
              priority={i < 2}
            />
            <figcaption
              className="absolute bottom-4 left-4 text-[11px] tracking-cc-caps uppercase text-cc-offwhite"
              style={{ textShadow: "0 1px 6px rgba(0,0,0,0.85)" }}
            >
              {p.cap}
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="px-6 mt-2 text-[11px] tracking-cc-caps uppercase text-cc-black/50">
        ← Wischen · {PIECES.length} Stücke
      </p>
    </div>
  );
}

export default function PiecesShowcase() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // SSR-Fallback: rendere Mobile-Variante bis client-side entschieden ist
  if (isDesktop === null) return <MobileSwipe />;
  return isDesktop ? <DesktopPinScroll /> : <MobileSwipe />;
}
