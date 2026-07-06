"use client";

/**
 * HeroBreak
 * ---------
 * Weiße Sektion nach dem Hero.
 *
 * Layout (Desktop, 2 Spalten):
 *   LINKS  — großer Typewriter-Claim „Got teeth? Got options."
 *            direkt darunter: CTA-Button „Design deine Grillz →"
 *   RECHTS — riesiges Chopper-Couture-Wordmark in derselben Partikel-
 *            Struktur wie das Hero-Video-Logo (schwarze Partikel auf weiß).
 *
 * Mobile: stapelt vertikal (Claim → CTA → Wordmark).
 */

import { useEffect, useRef, useState } from "react";
import ParticleLogo from "@/components/ParticleLogo";
import { useLenis } from "@/components/providers/SmoothScrollProvider";

const CLAIM = "Got teeth? Got options.";

export default function HeroBreak() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [typed, setTyped] = useState(0);
  const [started, setStarted] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (!sectionRef.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.25) {
            setStarted(true);
            io.disconnect();
          }
        });
      },
      { threshold: [0, 0.25, 0.5] }
    );
    io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    if (typed >= CLAIM.length) return;
    const t = setTimeout(() => setTyped((n) => n + 1), 80);
    return () => clearTimeout(t);
  }, [started, typed]);

  const scrollToDesigner = () => {
    const el = document.querySelector<HTMLElement>("#designer");
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -10, duration: 1.4 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      data-nav-tone="light"
      className="relative bg-cc-offwhite text-cc-black min-h-screen px-6 md:px-12 py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto h-full grid md:grid-cols-2 gap-12 md:gap-8 items-center min-h-[80vh]">
        {/* LINKS — Claim + CTA linksbündig */}
        <div className="flex flex-col items-start">
          {/* Typewriter-Headline in Mono, linksbündig */}
          <h1
            className="text-left tracking-tight font-mono"
            style={{
              fontSize: "clamp(2rem, 5.5vw, 5rem)",
              lineHeight: 1.15,
              fontWeight: 500,
              letterSpacing: "-0.01em",
            }}
            aria-label={CLAIM}
          >
            <span>{CLAIM.slice(0, typed)}</span>
            <span
              className="inline-block align-baseline"
              style={{
                width: "0.55em",
                marginLeft: "0.05em",
                animation: "cc-cursor-blink 1s steps(2) infinite",
              }}
            >
              |
            </span>
            <style>{`
              @keyframes cc-cursor-blink {
                0%, 50% { opacity: 1; }
                50.01%, 100% { opacity: 0; }
              }
            `}</style>
          </h1>

          {/* CTA direkt unter dem Claim */}
          <button
            type="button"
            onClick={scrollToDesigner}
            className="mt-10 md:mt-14 group inline-flex items-center gap-3 border border-cc-black bg-cc-black text-cc-offwhite hover:bg-cc-purple hover:border-cc-purple transition-colors px-8 md:px-10 py-4 md:py-5 text-xs md:text-sm tracking-cc-caps uppercase"
          >
            Design deine Grillz
            <span className="inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>

          <p className="mt-4 font-mono text-[11px] tracking-cc-caps uppercase text-cc-black/50">
            Klick dich in den Designer
          </p>
        </div>

        {/* RECHTS — riesiges Partikel-Wordmark */}
        <div className="relative flex items-center justify-end">
          <div
            className="relative w-full"
            style={{ aspectRatio: "340.59 / 453.75", maxHeight: "70vh" }}
          >
            <ParticleLogo
              src="/logo/wordmark-black.svg"
              color="#0d0d0d"
              sampleStep={3}
              logoWidth={640}
              particleSize={0.9}
              dragRadius={80}
              dragStrength={0.6}
              settle={0.024}
              damping={0.8}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
