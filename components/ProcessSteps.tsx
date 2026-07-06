/**
 * ProcessSteps
 * ------------
 * Die echten 6 Stationen des Herstellungsprozesses mit echten Studio-Fotos.
 *
 * Bildzuordnung (siehe public/images/process/IMAGES.md für die volle Liste):
 *   01 → 01-alginat.jpg       — Auftragsschalen mit Alginat-Material
 *   02 → 02-gipsmodell.jpg    — Gipsmodell mit ersten Grillz
 *   03 → 03-scan.jpg          — 3D-Scanner mit blauen Lasern
 *   04 → 04-3d-modeling.jpg   — 3Shape-Software-Screen
 *   05 → 05-slm.jpg           — SLM-gedrucktes Stück auf Modell
 *   06 → 06-politur.jpg       — finales poliertes Stück
 */

import Image from "next/image";

export const STEPS = [
  {
    n: "01",
    title: "Abdruck",
    body:
      "Wir treffen uns im Studio, ich schiebe dir ne Schale mit Alginat in den Mund — eine Minute, kein Würgen, kein Stress. Tut nix, schmeckt nach nix. Done.",
    src: "/images/process-new/01-abdruck.png",
  },
  {
    n: "02",
    title: "Gipsmodell",
    body:
      "Aus deinem Abdruck gieße ich ein türkises Gipsmodell. Knallhart, millimetergenau — von hier an arbeite ich nur noch mit deinem Modell, nicht mehr mit dir.",
    src: "/images/process-new/02-gipsmodell.png",
  },
  {
    n: "03",
    title: "Scan",
    body:
      "Dein Modell kommt unter den 3D-Scanner. Blaue Laser, ein paar Sekunden, fertig — dein Kiefer existiert jetzt auch digital.",
    src: "/images/process-new/03-scan.jpg",
  },
  {
    n: "04",
    title: "3D-Design",
    body:
      "In 3Shape baue ich dein Grillz direkt auf deinen Zähnen. Du sagst mir, was du willst — wir iterieren so lange, bis es sitzt. Erst dann geht's weiter.",
    src: "/images/process-new/04-3d-design.png",
  },
  {
    n: "05",
    title: "SLM-Druck",
    body:
      "Selective Laser Melting beim Schütz Fräszentrum. Dein Stück wird Schicht für Schicht aus Edelmetall geschmolzen — ein Guss, ohne Naht. Mehr dazu unter Medizinisches.",
    src: "/images/process-new/05-slm.jpg",
  },
  {
    n: "06",
    title: "Politur",
    body:
      "Stundenlang mit dem Stück in der Hand. Jede Kante, jeder Innenraum. Erst wenn's leuchtet, ist es deins.",
    src: "/images/process-new/06-politur.jpg",
  },
];

interface ProcessStepsProps {
  tone?: "light" | "dark";
}

export default function ProcessSteps({ tone = "light" }: ProcessStepsProps) {
  const bg = tone === "light" ? "bg-cc-offwhite text-cc-black" : "bg-cc-black text-cc-offwhite";
  const eyebrow = tone === "light" ? "text-cc-black/50" : "text-cc-offwhite/50";
  const body = tone === "light" ? "text-cc-black/75" : "text-cc-offwhite/75";

  return (
    <>
      {STEPS.map((step, i) => {
        const reversed = i % 2 === 1;
        return (
          <section
            key={step.n}
            data-snap
            className={`${bg} scroll-mt-0`}
          >
            <div
              className={`grid md:grid-cols-2 items-stretch ${
                reversed ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* Bild — voll bis zum Bildschirmrand, randabfallend */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-cc-black">
                <Image
                  src={step.src}
                  alt={step.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              {/* Text — gleiche Höhe wie Bild, vertical-zentriert */}
              <div className="flex items-center px-6 md:px-12 lg:px-20 py-16 md:py-0">
                <div className="max-w-md">
                  <p className={`font-mono text-xs tracking-cc-caps uppercase ${eyebrow} mb-6`}>
                    Step {step.n}
                  </p>
                  <h3
                    className="font-black uppercase leading-[1.05] tracking-tight mb-8"
                    style={{ fontSize: "clamp(2.25rem, 4.5vw, 4rem)" }}
                  >
                    {step.title}
                  </h3>
                  <p className={`text-base md:text-lg leading-relaxed ${body}`}>
                    {step.body}
                  </p>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
