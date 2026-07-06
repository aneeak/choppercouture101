"use client";

/**
 * Homepage — One-Pager
 * --------------------
 * Hero (unverändert) bleibt der Eingang. Darunter alle Hauptsektionen
 * direkt scrollbar:
 *   #process   — die echten 6 Stationen (Alginat → Politur)
 *   #pieces    — Galerie mit echten Grillz-Fotos
 *   #designer  — interaktiver Zahn-Designer
 *   #about     — Story + Werte
 *   #contact   — Anfrage-Formular
 *   Footer
 *
 * Jede Sektion ist mit `data-nav-tone="dark"|"light"` markiert; die
 * Navigation liest das und switcht ihre Schriftfarbe entsprechend.
 *
 * Sub-Pages (/process, /pieces, ...) existieren weiter als eigenständige
 * Routen für Direkt-Links und Detail-Ansichten.
 */

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Hero from "@/components/Hero";
import HeroBreak from "@/components/HeroBreak";
import StickyVideo from "@/components/StickyVideo";
import ToothDesigner from "@/components/ToothDesigner";
import PiecesShowcase from "@/components/PiecesShowcase";
import Footer from "@/components/Footer";

const VALUES = [
  { n: "01", title: "Präzision", body: "Handwerk steht über allem." },
  { n: "02", title: "Inklusion", body: "Für alle, die Zähne haben." },
  { n: "03", title: "Ausdruck", body: "Schmuck als persönliche Sprache." },
  { n: "04", title: "Handwerk", body: "Made to fit. Jedes Stück individuell." },
];

const MATERIAL = [
  {
    n: "01",
    title: "Das Material",
    body:
      "CoCr-Legierung (Kobalt-Chrom) — ein etabliertes Dentalmetall, seit Jahrzehnten für Zahnersatz im Mund. Nickelfrei, berylliumfrei.",
  },
  {
    n: "02",
    title: "Biokompatibel",
    body:
      "Erfüllt die ISO-Normen für Dentallegierungen, ausgelegt auf Verträglichkeit im Mundraum. Keine fragwürdigen Zusätze.",
  },
  {
    n: "03",
    title: "SLM-Verfahren",
    body:
      "Selective Laser Melting: Metall wird bei über 1400 °C Schicht für Schicht verschmolzen. Ein Stück, ohne Naht, ohne Lötstellen.",
  },
  {
    n: "04",
    title: "Pflege",
    body:
      "Zum Essen rausnehmen, danach kurz unter lauwarmem Wasser abspülen. Kein kochendes Wasser, keine aggressiven Reiniger — dann hält's ewig.",
  },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Scroll-Blur scrub nur auf der Hero-Sektion (wie zuvor — sanft 18px).
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const useBlur = !prefersReduced && !isMobile;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const hero = document.querySelector<HTMLElement>(".cc-hero-scrub");
      if (!hero) return;
      gsap.to(hero, {
        opacity: 0,
        ...(useBlur ? { filter: "blur(18px)" } : {}),
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "bottom bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      {/* --- HERO --- */}
      <div className="cc-hero-scrub" data-nav-tone="dark">
        <Hero videoSrc="/videos/hero-loop.mp4" />
      </div>

      {/* --- HERO-BREAK: Typewriter „Got teeth?" + Wordmark + CTA --- */}
      <HeroBreak />

      {/* --- SMILE-VIDEO (sticky-pin: dockt beim Scrollen ein) --- */}
      <div data-nav-tone="dark">
        <StickyVideo src="/videos/smile.mov" dwell={1.6} />
      </div>

      {/* --- PROCESS-VIDEO (sticky-pin, mit Ton-Toggle) --- */}
      <section id="process" data-nav-tone="dark" className="scroll-mt-20">
        <div className="bg-cc-offwhite text-cc-black px-6 md:px-12 pt-20 md:pt-32 pb-16">
          <div className="max-w-7xl mx-auto">
            <p className="font-mono text-xs tracking-cc-caps uppercase text-cc-black/60 mb-8">
              01 — The Process
            </p>
            <h2
              className="font-black uppercase leading-[1.05] tracking-tight max-w-5xl"
              style={{ fontSize: "clamp(2.5rem, 8vw, 8rem)" }}
            >
              Vom Abdruck
              <br />
              zum Stück.
            </h2>
            <p className="mt-10 max-w-2xl text-base md:text-lg text-cc-black/70 leading-relaxed">
              Der ganze Prozess im Video — von deinem Mund bis zum fertigen
              Grillz. Ton lohnt sich.
            </p>
          </div>
        </div>
        <StickyVideo src="/videos/process.mp4" dwell={1.8} withSound />
      </section>

      {/* --- DESIGNER --- */}
      <section
        id="designer" data-snap
        data-nav-tone="light"
        className="bg-cc-offwhite text-cc-black scroll-mt-20 px-6 md:px-12 py-20 md:py-48"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 max-w-4xl">
            <p className="font-mono text-xs tracking-cc-caps uppercase text-cc-black/60 mb-8">
              02 — Designer
            </p>
            <h2
              className="font-black uppercase leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 8vw, 8rem)" }}
            >
              Design dein
              <br />
              Stück.
            </h2>
            <p className="mt-10 max-w-2xl text-base md:text-lg text-cc-black/70 leading-relaxed">
              Spiel dich durch. Stil aussuchen, Zähne anklicken, abschicken —
              ich meld mich bei dir und wir machen einen Termin klar. Ganz
              unverbindlich.
            </p>
          </div>
          <ToothDesigner />
        </div>
      </section>

      {/* --- PIECES (Galerie, Pin-Scroll) --- */}
      <section
        id="pieces" data-snap
        data-nav-tone="light"
        className="bg-cc-offwhite text-cc-black scroll-mt-20 pt-20 md:pt-48 pb-20 md:pb-48"
      >
        <div className="px-6 md:px-12 mb-16">
          <p className="font-mono text-xs tracking-cc-caps uppercase text-cc-black/60 mb-8">
            03 — Pieces
          </p>
          <h2
            className="font-black uppercase leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 8vw, 8rem)" }}
          >
            Selected
            <br />
            Pieces.
          </h2>
          <p className="mt-10 max-w-2xl text-base md:text-lg text-cc-black/70 leading-relaxed">
            Ein paar Stücke aus dem Studio. Jedes anders, jedes für genau
            einen Menschen gemacht. Vielleicht ist deins als nächstes dabei.
          </p>
        </div>
        <PiecesShowcase />
      </section>

      {/* --- MATERIAL & SICHERHEIT (bleibt für Ehrlichkeit über den Prozess) --- */}
      <section
        id="material"
        data-nav-tone="dark"
        className="bg-cc-black text-cc-offwhite scroll-mt-20 px-6 md:px-12 py-20 md:py-48"
      >
        <div className="max-w-7xl mx-auto">
          <p className="font-mono text-xs tracking-cc-caps uppercase text-cc-offwhite/60 mb-8">
            Material & Sicherheit
          </p>

          {/* Prominente Partner-Aussage */}
          <h2
            className="font-black uppercase leading-[1.05] tracking-tight max-w-5xl mb-10"
            style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
          >
            Gefertigt im Labor{" "}
            <a
              href="https://www.braundentalis.de"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cc-purple hover:opacity-80 transition-opacity"
            >
              Braundentalis
            </a>
            .
            <br />
            SLM-Druck beim{" "}
            <a
              href="https://www.schuetz-zahntechnik.de/standorte/fraeszentrum-glashuette/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cc-purple hover:opacity-80 transition-opacity"
            >
              Schütz Fräszentrum Glashütte
            </a>
            .
          </h2>

          {/* Material-Fakten direkt darunter */}
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12 md:gap-y-16 mt-16">
            {MATERIAL.map((m) => (
              <div key={m.n} className="border-t border-cc-offwhite/15 pt-6">
                <p className="font-mono text-xs tracking-cc-caps uppercase text-cc-offwhite/50 mb-4">
                  {m.n}
                </p>
                <h3 className="font-black uppercase text-xl md:text-2xl mb-3">
                  {m.title}
                </h3>
                <p className="text-sm md:text-base text-cc-offwhite/70 leading-relaxed max-w-md">
                  {m.body}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-16 max-w-2xl text-sm text-cc-offwhite/50 leading-relaxed">
            Grillz sind Schmuck, kein medizinisches Hilfsmittel. Bei Allergien,
            Zahnfleisch-Themen oder Zahnspangen sprich vorher kurz mit deiner
            Zahnärztin oder deinem Zahnarzt.
          </p>
        </div>
      </section>

      {/* Legacy Designer/About wurden entfernt — Designer läuft jetzt oben nach Smile-Video,
          About ist eigene Seite (/about). Nur der lila Brand-Promise-Block bleibt hier. */}
      {false && (
      <section
        data-nav-tone="dark"
        className="bg-cc-black text-cc-offwhite scroll-mt-20"
      >
        <div className="px-6 md:px-12 py-20 md:py-48">
          <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10 md:gap-20">
            <div className="md:col-span-5">
              <p className="font-mono text-xs tracking-cc-caps uppercase text-cc-offwhite/60 mb-8">
                04 — About
              </p>
              <h2
                className="font-black uppercase leading-[1.05] tracking-tight"
                style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)" }}
              >
                Got teeth?
                <br />
                Got options.
              </h2>
            </div>
            <div className="md:col-span-7 space-y-6 text-base md:text-lg leading-relaxed text-cc-offwhite/75">
              <p>
                Chopper Couture macht Dental Jewelry in Berlin. Grillz, die
                nicht nach Klischee aussehen — fein, sauber, fashion. Kein
                Bling-Zwang, kein Szene-Code.
              </p>
              <p>
                Hinter allem steckt eine Person: Anika, Zahntechnikerin mit
                eigenem Labor. Jedes Stück ist ein Gespräch zwischen dir, mir
                und dem Material. Mehr dazu gibt's drüben.
              </p>
              <Link
                href="/about"
                className="inline-block mt-6 font-mono text-xs tracking-cc-caps uppercase text-cc-offwhite/60 hover:text-cc-offwhite"
              >
                Lern mich kennen →
              </Link>
            </div>
          </div>
        </div>

        {/* Werte */}
      </section>
      )}

      {/* Brand-Promise als Lila Bruch */}
      <section
        data-nav-tone="dark"
        className="bg-cc-purple text-cc-offwhite px-6 md:px-12 py-20 md:py-48"
      >
        <div className="max-w-6xl">
          <p className="font-mono text-xs tracking-cc-caps uppercase text-cc-offwhite/70 mb-8">
            Brand Promise
          </p>
          <h2
            className="font-black uppercase leading-[1.02] tracking-tight"
            style={{ fontSize: "clamp(3rem, 11vw, 11rem)" }}
          >
            Lifechanging
            <br />
            Smiles.
          </h2>
          <p className="mt-12 max-w-2xl text-lg md:text-xl text-cc-offwhite/85">
            Schmuck, der bleibt — im Kopf und auf den Zähnen.
          </p>
        </div>
      </section>

      {/* --- CONTACT --- */}
      <section
        id="contact" data-snap
        data-nav-tone="light"
        className="bg-cc-offwhite text-cc-black scroll-mt-20 px-6 md:px-12 py-20 md:py-48"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 max-w-4xl">
            <p className="font-mono text-xs tracking-cc-caps uppercase text-cc-black/60 mb-8">
              05 — Contact
            </p>
            <h2
              className="font-black uppercase leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 8vw, 8rem)" }}
            >
              Let's talk.
            </h2>
            <p className="mt-10 max-w-2xl text-base md:text-lg text-cc-black/70 leading-relaxed">
              Frage, Idee oder einfach Lust auf ein Stück? Schreib mir — du
              landest direkt bei mir, nicht in irgendeinem Support-Postfach.
            </p>
          </div>

          <div className="grid md:grid-cols-12 gap-12 md:gap-20">
            <form
              action="/api/contact"
              method="post"
              className="md:col-span-7 space-y-10"
            >
              <div className="grid sm:grid-cols-2 gap-8">
                <Field label="Name" name="name" required />
                <Field label="E-Mail" name="email" type="email" required />
              </div>
              <Field label="Telefon (optional)" name="phone" type="tel" />
              <div>
                <label
                  htmlFor="message"
                  className="block font-mono text-[11px] tracking-cc-caps uppercase text-cc-black/60 mb-3"
                >
                  Erzähl mir, was du im Kopf hast
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  placeholder="Welche Zähne, welcher Stil, welche Idee — schreib einfach drauflos."
                  className="w-full bg-transparent border-b border-cc-black/30 focus:border-cc-black outline-none py-4 text-base placeholder:text-cc-black/40 resize-none"
                />
              </div>
              <button
                type="submit"
                className="text-xs tracking-cc-caps uppercase border border-cc-black/40 hover:border-cc-black hover:bg-cc-black hover:text-cc-offwhite px-10 py-5 transition-colors"
              >
                Anfrage senden →
              </button>
            </form>

            <aside className="md:col-span-5 space-y-12 md:pt-12">
              <Info label="Studio">
                Stralauer Allee 17B
                <br />
                Berlin
              </Info>
              <Info label="Direkt">
                <a
                  href="mailto:hello@choppercouture.de"
                  className="hover:text-cc-purple transition-colors"
                >
                  hello@choppercouture.de
                </a>
                <br />
                <a
                  href="https://instagram.com/choppercouture"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cc-purple transition-colors"
                >
                  @choppercouture
                </a>
              </Info>
              <Info label="Termine">
                Nach Vereinbarung.
                <br />
                Antwort meist innerhalb von 48 Stunden.
              </Info>
            </aside>
          </div>
        </div>
      </section>

      <div data-nav-tone="dark">
        <Footer />
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block font-mono text-[11px] tracking-cc-caps uppercase text-cc-black/60 mb-3"
      >
        {label}
        {required && <span className="text-cc-purple ml-1">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full bg-transparent border-b border-cc-black/30 focus:border-cc-black outline-none py-4 text-base"
      />
    </div>
  );
}

function Info({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-cc-black/15 pt-6">
      <p className="font-mono text-[11px] tracking-cc-caps uppercase text-cc-black/60 mb-4">
        {label}
      </p>
      <div className="text-base md:text-lg leading-relaxed">{children}</div>
    </div>
  );
}
