"use client";

/**
 * Navigation
 * ----------
 * Fixed top, always transparent.
 *
 * Anchor links + logo click both use `lenis.scrollTo()` because Lenis
 * hijacks the native scroll. Without that, clicking "#process" would jump
 * the browser but Lenis would immediately scroll back to its own
 * position — feels broken.
 *
 * Adaptive tone: see comment in the previous version. Sections opt in by
 * setting `data-nav-tone="dark|light"`; whichever sits under the header
 * line wins.
 */

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLenis } from "@/components/providers/SmoothScrollProvider";

const LINKS: { href: string; anchor?: string; label: string }[] = [
  { href: "/", anchor: "#pieces", label: "Pieces" },
  { href: "/", anchor: "#process", label: "The Process" },
  { href: "/", anchor: "#designer", label: "Designer" },
  { href: "/about", label: "About" },
];

type Tone = "dark" | "light";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [tone, setTone] = useState<Tone>("dark");
  const lenis = useLenis();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const update = () => {
      const probeY = 40;
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("[data-nav-tone]")
      );
      let current: HTMLElement | null = null;
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        if (r.top <= probeY && r.bottom > probeY) {
          current = s;
          break;
        }
      }
      const next = (current?.dataset.navTone as Tone) ?? "dark";
      setTone((prev) => (prev === next ? prev : next));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const mo = new MutationObserver(update);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      mo.disconnect();
    };
  }, []);

  /** Smoothly scroll to a target element (Lenis-aware). */
  const scrollTo = (target: string | number) => {
    if (lenis) {
      lenis.scrollTo(target, { offset: target === 0 ? 0 : -10, duration: 1.4 });
    } else {
      // Fallback when reduced-motion disabled Lenis
      if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: "smooth" });
      } else {
        document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  /** Click handler for nav links — handles anchors on / and cross-route. */
  const handleNavClick = (
    e: React.MouseEvent,
    href: string,
    anchor?: string
  ) => {
    if (anchor) {
      // Anchor target lives on "/". If we're already there, just scroll.
      if (pathname === href) {
        e.preventDefault();
        scrollTo(anchor);
      } else {
        // Otherwise let Next route to "/" then scroll once mounted.
        e.preventDefault();
        router.push(`${href}${anchor}`);
        // Wait a tick for the page to mount, then scroll.
        setTimeout(() => scrollTo(anchor), 400);
      }
      setMenuOpen(false);
    }
    // No-anchor links (e.g. /about) fall through to default <Link> behaviour.
  };

  /** Logo click — always scroll to top, even when already on /. */
  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      scrollTo(0);
    }
    // On sub-routes: let <Link> navigate to "/" normally.
    setMenuOpen(false);
  };

  const isLight = tone === "light";
  const textClass = isLight ? "text-cc-black" : "text-white";
  const logoSrc = isLight
    ? "/logo/spike-icon-black.svg"
    : "/logo/spike-icon-white.svg";

  return (
    <>
      {/* Dezenter dunkler Verlauf oben — hebt Nav vom Video ab, ohne
          das Design zu verändern. Nur sichtbar über dunklen Sektionen. */}
      {!isLight && (
        <div className="fixed inset-x-0 top-0 z-40 h-32 pointer-events-none bg-gradient-to-b from-black/45 via-black/15 to-transparent" />
      )}
      <header className="fixed inset-x-0 top-0 z-50 bg-transparent">
        <nav className="flex items-center justify-between px-6 md:px-10 h-20">
          <div className="flex items-center gap-10">
            <Link
              href="/"
              onClick={handleLogoClick}
              className="relative block h-[56px] w-[32px] shrink-0"
              aria-label="Chopper Couture — Startseite / zurück nach oben"
            >
              <Image
                src={logoSrc}
                alt="Chopper Couture"
                fill
                priority
                className="object-contain object-left"
              />
            </Link>

            <ul className="hidden md:flex items-center gap-6">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.anchor ? `${l.href}${l.anchor}` : l.href}
                    onClick={(e) => handleNavClick(e, l.href, l.anchor)}
                    className={`text-[12px] tracking-cc-caps uppercase ${textClass} hover:blur-[4px] transition-[filter,color] duration-400 ease-[var(--ease-cc-out)]`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden md:block">
            <Link
              href="/#contact"
              onClick={(e) => handleNavClick(e, "/", "#contact")}
              className={`text-[12px] tracking-cc-caps uppercase ${textClass} hover:blur-[4px] transition-[filter,color] duration-400 ease-[var(--ease-cc-out)]`}
            >
              Contact
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span
              className={`block h-px w-6 transition-all duration-300 ${
                isLight ? "bg-cc-black" : "bg-cc-offwhite"
              } ${menuOpen ? "translate-y-[3px] rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-6 transition-all duration-300 ${
                isLight ? "bg-cc-black" : "bg-cc-offwhite"
              } ${menuOpen ? "-translate-y-[3px] -rotate-45" : ""}`}
            />
          </button>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-cc-black transition-transform duration-500 ease-[var(--ease-cc-panel)] md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="flex flex-col items-start gap-8 px-8 pt-24">
          {[...LINKS, { href: "/", anchor: "#contact", label: "Contact" }].map(
            (l) => (
              <li key={l.label}>
                <Link
                  href={l.anchor ? `${l.href}${l.anchor}` : l.href}
                  onClick={(e) => handleNavClick(e, l.href, l.anchor)}
                  className="text-3xl font-black uppercase tracking-cc-caps text-cc-offwhite"
                >
                  {l.label}
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
    </>
  );
}
