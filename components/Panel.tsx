"use client";

/**
 * Panel
 * -----
 * Full-viewport panel with a background image OR video and a "cover"
 * layer (semi-transparent + blurred) that dissolves on headline hover.
 *
 * Used for the Process and Pieces sections on the homepage.
 *
 * Cover behaviour:
 *   - idle:   opacity 0.6, blur 0
 *   - hover:  opacity 0,   blur 30px
 *   - transition: 800ms cubic-bezier(0.65, 0, 0.35, 1)
 */

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface PanelProps {
  /** Background image — full bleed. */
  image?: string;
  /** Optional looping background video. Wins over `image` if both set. */
  video?: string;
  headline: string;
  sub: string;
  href: string;
  /** Cover tint. Brand: "dark" for product/process, "light" for editorial. */
  coverTone?: "dark" | "light";
}

export default function Panel({
  image,
  video,
  headline,
  sub,
  href,
  coverTone = "dark",
}: PanelProps) {
  const [hover, setHover] = useState(false);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-cc-black">
      {/* Background media */}
      <div className="absolute inset-0">
        {video ? (
          <video
            className="h-full w-full object-cover"
            src={video}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : image ? (
          <Image
            src={image}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        ) : null}
      </div>

      {/* Cover layer — dissolves on hover */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor:
            coverTone === "dark"
              ? "rgba(13, 13, 13, 0.6)"
              : "rgba(249, 249, 249, 0.6)",
          backdropFilter: hover ? "blur(30px)" : "blur(0px)",
          opacity: hover ? 0 : 1,
          transition:
            "opacity 800ms var(--ease-cc-panel), backdrop-filter 800ms var(--ease-cc-panel)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full items-end px-6 md:px-12 pb-16 md:pb-24">
        <Link
          href={href}
          className="block group"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <p
            className={`font-mono text-xs tracking-cc-caps uppercase mb-4 ${
              coverTone === "dark" ? "text-cc-offwhite/70" : "text-cc-black/70"
            }`}
          >
            {sub}
          </p>
          <h2
            className={`font-sans font-black uppercase leading-[1.05] tracking-tight ${
              coverTone === "dark" ? "text-cc-offwhite" : "text-cc-black"
            }`}
            style={{ fontSize: "clamp(3rem, 9vw, 9rem)" }}
          >
            {headline}
          </h2>
        </Link>
      </div>
    </section>
  );
}
