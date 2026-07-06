/**
 * Impressum
 * ---------
 * Pflichtangaben nach §5 TMG / §55 RStV.
 * Vor Go-Live: Gewerbe-Nr ergänzen, ggf. USt-ID prüfen.
 */

import Footer from "@/components/Footer";

export const metadata = {
  title: "Impressum — Chopper Couture",
  description: "Anbieterkennzeichnung gemäß §5 TMG.",
};

export default function ImpressumPage() {
  return (
    <>
      <main
        data-nav-tone="light"
        className="bg-cc-offwhite text-cc-black min-h-screen pt-48 md:pt-64 pb-32 md:pb-48 px-6 md:px-12"
      >
        <div className="max-w-3xl">
          <p className="font-mono text-xs tracking-cc-caps uppercase text-cc-black/60 mb-8">
            Legal
          </p>
          <h1
            className="font-black uppercase leading-[1.05] tracking-tight mb-24"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
          >
            Impressum
          </h1>

          <section className="space-y-16 text-base md:text-lg leading-relaxed">
            <div>
              <h2 className="font-mono text-xs tracking-cc-caps uppercase text-cc-black/60 mb-5">
                Angaben gemäß §5 TMG
              </h2>
              <p>
                Chopper Couture
                <br />
                Inhaberin: Anika Müggler
                <br />
                Stralauer Allee 17B
                <br />
                Berlin, Deutschland
              </p>
            </div>

            <div>
              <h2 className="font-mono text-xs tracking-cc-caps uppercase text-cc-black/60 mb-5">
                Kontakt
              </h2>
              <p>
                E-Mail:{" "}
                <a
                  href="mailto:hello@choppercouture.de"
                  className="underline hover:text-cc-purple"
                >
                  hello@choppercouture.de
                </a>
                <br />
                Instagram:{" "}
                <a
                  href="https://instagram.com/choppercouture"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-cc-purple"
                >
                  @choppercouture
                </a>
              </p>
            </div>

            <div>
              <h2 className="font-mono text-xs tracking-cc-caps uppercase text-cc-black/60 mb-5">
                Gewerbe
              </h2>
              <p>
                {/* FILL IN: Gewerbe-Nummer */}
                Gewerbe angemeldet auf Chopper Couture.
                <br />
                Gewerbe-Nr: <span className="text-cc-black/50">wird ergänzt</span>
              </p>
            </div>

            <div>
              <h2 className="font-mono text-xs tracking-cc-caps uppercase text-cc-black/60 mb-5">
                Verantwortlich für den Inhalt nach §55 Abs. 2 RStV
              </h2>
              <p>
                Anika Müggler
                <br />
                Stralauer Allee 17B, Berlin
              </p>
            </div>

            <div>
              <h2 className="font-mono text-xs tracking-cc-caps uppercase text-cc-black/60 mb-5">
                EU-Streitschlichtung
              </h2>
              <p>
                Die Europäische Kommission stellt eine Plattform zur
                Online-Streitbeilegung (OS) bereit:{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-cc-purple"
                >
                  ec.europa.eu/consumers/odr
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="font-mono text-xs tracking-cc-caps uppercase text-cc-black/60 mb-5">
                Verbraucherstreitbeilegung
              </h2>
              <p>
                Wir sind nicht bereit oder verpflichtet, an
                Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>

            <div>
              <h2 className="font-mono text-xs tracking-cc-caps uppercase text-cc-black/60 mb-5">
                Haftung für Inhalte
              </h2>
              <p>
                Als Diensteanbieter sind wir gemäß §7 Abs.1 TMG für eigene
                Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
                verantwortlich. Nach §§8 bis 10 TMG sind wir als
                Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
                gespeicherte fremde Informationen zu überwachen.
              </p>
            </div>

            <div>
              <h2 className="font-mono text-xs tracking-cc-caps uppercase text-cc-black/60 mb-5">
                Urheberrecht
              </h2>
              <p>
                Die durch die Seitenbetreiberin erstellten Inhalte und Werke
                auf diesen Seiten unterliegen dem deutschen Urheberrecht.
                Vervielfältigung, Bearbeitung, Verbreitung und Verwertung
                außerhalb der Grenzen des Urheberrechts bedürfen der
                schriftlichen Zustimmung.
              </p>
            </div>
          </section>
        </div>
      </main>
      <div data-nav-tone="dark">
        <Footer />
      </div>
    </>
  );
}
