import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About — Chopper Couture",
  description:
    "Hinter Chopper Couture steht Anika Müggler — Zahntechnikerin, Art Direktorin, in Berlin. Dental Jewelry mit medizinischen Standards.",
};

const VALUES = [
  {
    n: "01",
    title: "Präzision",
    body:
      "Zahntechnisches Labor mit medizinischen Standards. Jeder Mikrometer zählt — das ist nicht Anspruch, das ist Voraussetzung.",
  },
  {
    n: "02",
    title: "Filigran",
    body:
      "Grillz dürfen leicht sein. Klein, fein, fast unsichtbar — oder gross und laut. Beides zählt, beides per Hand entschieden.",
  },
  {
    n: "03",
    title: "Im Dialog",
    body:
      "Jedes Stück entsteht in Absprache. Skizze, Sample, Iteration. Erst wenn du sagst Ja, geht's in den Guss.",
  },
  {
    n: "04",
    title: "Inklusion",
    body:
      "Dental Jewelry ist für alle, die Zähne haben. Kein Szene-Code, kein Backstage-Pass. Bring deine Idee.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section
        data-nav-tone="dark"
        className="relative h-screen w-full bg-cc-black text-cc-offwhite flex items-end px-6 md:px-12 pb-16 md:pb-24"
      >
        <div className="max-w-7xl mx-auto w-full">
          <p className="font-mono text-xs tracking-cc-caps uppercase text-cc-offwhite/60 mb-8">
            About
          </p>
          <h1
            className="font-black uppercase leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(3rem, 9vw, 9rem)" }}
          >
            Anika
            <br />
            Müggler.
          </h1>
          <p className="mt-8 max-w-xl font-mono text-xs tracking-cc-caps uppercase text-cc-offwhite/60">
            Zahntechnikerin · Art Direction · Berlin
          </p>
        </div>
      </section>

      {/* STORY — zwei Spalten */}
      <section
        data-nav-tone="light"
        className="bg-cc-offwhite text-cc-black px-6 md:px-12 py-20 md:py-48"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10 md:gap-20">
          <div className="md:col-span-5">
            <p className="font-mono text-xs tracking-cc-caps uppercase text-cc-black/60 mb-6">
              Werdegang
            </p>
            <h2
              className="font-black uppercase leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
            >
              Zahn­technik.
              <br />
              Kunst.
              <br />
              Art Direction.
            </h2>
          </div>
          <div className="md:col-span-7 space-y-6 text-base md:text-lg leading-relaxed text-cc-black/75">
            <p>
              Ausgebildete Zahntechnikerin aus der Schweiz. Danach
              Kunst­schule an der <strong>ZHdK</strong> in Zürich. Mit dem
              Umzug nach Berlin Wirtschafts­kommunikation studiert,
              weiterhin als Zahntechnikerin im Labor gearbeitet.
            </p>
            <p>
              Heute arbeite ich tagsüber als Art Direktorin in einer
              nachhaltigen Werbeagentur — und nebenbei am Schreibtisch,
              am Modell, am Mikroskop: an Chopper Couture.
            </p>
            <p>
              Mein Labor ist zahntechnisch voll ausgerüstet, mit
              medizinischen Standards. Vom Alginat-Abdruck bis zum
              SLM-gedruckten Stück läuft jeder Schritt durch meine Hand.
              Das war mir wichtig. Filigran, präzise, individuell — und
              alles in Absprache mit dir.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section
        data-nav-tone="dark"
        className="bg-cc-black text-cc-offwhite px-6 md:px-12 py-20 md:py-48"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 md:mb-32 max-w-3xl">
            <p className="font-mono text-xs tracking-cc-caps uppercase text-cc-offwhite/60 mb-6">
              Werte
            </p>
            <h2
              className="font-black uppercase leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              Vier Werte.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-20 md:gap-y-24">
            {VALUES.map((v) => (
              <div key={v.n} className="border-t border-cc-offwhite/15 pt-8">
                <p className="font-mono text-xs tracking-cc-caps uppercase text-cc-offwhite/50 mb-6">
                  {v.n}
                </p>
                <h3
                  className="font-black uppercase leading-[1.05] tracking-tight mb-8"
                  style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
                >
                  {v.title}
                </h3>
                <p className="text-base md:text-lg leading-relaxed text-cc-offwhite/75 max-w-md">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND PROMISE */}
      <section
        data-nav-tone="dark"
        className="bg-cc-purple text-cc-offwhite px-6 md:px-12 py-20 md:py-48"
      >
        <div className="max-w-6xl">
          <p className="font-mono text-xs tracking-cc-caps uppercase text-cc-offwhite/70 mb-8">
            Brand Promise
          </p>
          <h2
            className="font-black uppercase leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(3rem, 11vw, 11rem)" }}
          >
            Lifechanging
            <br />
            Smiles.
          </h2>
          <p className="mt-12 max-w-2xl text-lg md:text-xl text-cc-offwhite/85">
            Zahnschmuck der bleibt — in Erinnerung und auf den Zähnen.
          </p>
        </div>
      </section>

      {/* STUDIO INFO + CTA */}
      <section
        data-nav-tone="light"
        className="bg-cc-offwhite text-cc-black px-6 md:px-12 py-20 md:py-48"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10 md:gap-20">
          <div className="md:col-span-7">
            <p className="font-mono text-xs tracking-cc-caps uppercase text-cc-black/60 mb-6">
              Studio
            </p>
            <h2
              className="font-black uppercase leading-[1.05] tracking-tight mb-12"
              style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
            >
              Stralauer Allee 17B.
              <br />
              Berlin.
            </h2>
            <p className="max-w-md text-base md:text-lg text-cc-black/70 leading-relaxed">
              Termine nach Vereinbarung. Schreib mir — wir finden eine
              Zeit, machen einen Abdruck, sprechen über deine Idee.
            </p>
          </div>
          <div className="md:col-span-5 space-y-10 md:pt-12">
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
            <Link
              href="/#contact"
              className="inline-block text-xs tracking-cc-caps uppercase border border-cc-black/40 hover:border-cc-black hover:bg-cc-black hover:text-cc-offwhite px-10 py-5 transition-colors"
            >
              Anfrage senden →
            </Link>
          </div>
        </div>
      </section>

      <div data-nav-tone="dark">
        <Footer />
      </div>
    </>
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
