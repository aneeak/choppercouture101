"use client";

/**
 * ToothDesigner
 * -------------
 * Grillz-Konfigurator. Gebiss-Render (grill-designer.png, freigestellt) mit
 * exakten Zahn-Vektorpfaden aus Anikas Illustrator-SVG (Grill deisgner.svg).
 *
 * Flow:
 *   1) Zähne anklicken → markiert (rosa). Re-Klick auf gleichen Zahn → abgewählt.
 *   2) Stil wählen → wird auf alle markierten Zähne ohne Stil angewendet
 *      (oder: aktiver Stil-Karte = neu hinzukommende Zähne bekommen ihn).
 *      Klick auf eine Stil-Karte mit bereits markierten Zähnen weist sie zu.
 *   3) Pro Zahn kann ein eigener Stil gewählt werden, indem man die Stil-Karte
 *      wechselt und einen weiteren Zahn klickt — bestehende Zähne können
 *      über die Liste umgestellt werden.
 *
 * Preis-Modell: erster Zahn = first-Preis seines Stils, jeder weitere = add-Preis
 *   Ornamental / Tribal: 180 € / +100 €
 *   Modern / Reduziert:  120 € / +80 €
 */

import { useMemo, useState } from "react";
import Image from "next/image";

// viewBox 1:1 aus illustrator/grill designer/Grill deisgner.svg
const VB_W = 722.6;
const VB_H = 510.27;

type StyleKey = "ornamental" | "tribal" | "modern" | "reduziert";
interface Style {
  key: StyleKey;
  title: string;
  body: string;
  image: string;
  first: number;
  add: number;
}
const STYLES: Style[] = [
  { key: "tribal", title: "Tribal", body: "Spiky, kantig, ein Statement.", image: "/images/styles/tribal.jpg", first: 180, add: 100 },
  { key: "ornamental", title: "Ornamental", body: "Verspielt, kunstvoll, opulent.", image: "/images/styles/ornamental.jpg", first: 180, add: 100 },
  { key: "modern", title: "Modern", body: "Voll Silber, clean, zeitlos.", image: "/images/styles/modern.jpg", first: 120, add: 80 },
  { key: "reduziert", title: "Reduziert", body: "Ein Detail, maximale Wirkung.", image: "/images/styles/reduziert.jpg", first: 120, add: 80 },
];
const styleOf = (k: StyleKey) => STYLES.find((s) => s.key === k)!;

// Exakte Vektorpfade 1:1 aus illustrator/grill designer/Grill deisgner.svg
const TEETH: { id: string; jaw: "OK" | "UK"; d: string }[] = [
  // --- Oberkiefer ---
  { id: "15", jaw: "OK", d: "m123.45,173.9s-3.93-13.18-2.62-17.18c1.31-4,4.78-7.5,10.48-2.5,5.69,5,10.47,9.5,10.47,9.5,0,0,2.62,17.5,5.24,25,2.62,7.5,2.62,7,2.62,7l3.93,10s0,7.5-6.55,3c-6.55-4.5-19.64-21-20.95-25-1.31-4-2.62-9.82-2.62-9.82" },
  { id: "14", jaw: "OK", d: "m139.06,144.59s-2.26-12,1.13-13c3.21-.95,15.81,10,20.33,15s11.3,12,11.3,12l4.52,24c2.26,12,4.52,24.5,4.52,24.5,0,0-9.04,5.83-9.04,6.5s-7.91,9.5-14.68-1c-6.78-10.5-11.63-31.58-13.56-43.5-2.26-14-4.52-24.5-4.52-24.5" },
  { id: "13", jaw: "OK", d: "m172.48,146.43s0-14.83,2.18-18,8.72-7.35,14.17-3.17c5.45,4.17,19.62,20.17,22.89,24.17,3.27,4,7.63,8,7.63,9.5s3.33,41,4.42,44c1.09,3-12.06,6.5-15.33,18-1.87,6.58-10.9,5.5-15.26,2-4.36-3.5-12.55-15.05-13.08-17.5-1.09-5-7.63-40-7.63-47v-12Z" },
  { id: "12", jaw: "OK", d: "m231.77,126.02s7.91-5.5,15.81,1c7.91,6.5,13.55,15,19.2,22,5.65,7,7.91,11,10.17,14,.96,1.27,2.26,39,2.26,39,0,0,2.53,9.89-11.3,10.5-11.3.5-32.76,0-37.28-2.5-4.52-2.5-5.65-1.5-7.91-16-2.26-14.5-3.39-30-3.39-37s4.6-17.68,5.65-20c4.52-10,6.78-11,6.78-11" },
  { id: "11", jaw: "OK", d: "m364.84,219.7l-10,1.5h-63s-11-1.5-12-9.5-2-38.5-2-38.5c0,0-2-17.5,4-32s19-28,28-28c3,0,19,1,27,6.5s26,27,28,31,4,10.5,4,10.5c0,0,.8,38.43,1,45.5.28,10-5,13-5,13" },
  { id: "21", jaw: "OK", d: "m376.99,217.57l10,1.5h63s11-1.5,12-9.5,2-38.5,2-38.5c0,0,2-17.5-4-32s-19-28-28-28c-3,0-19,1-27,6.5s-26,27-28,31-4,10.5-4,10.5c0,0-.8,38.43-1,45.5-.28,10,5,13,5,13" },
  { id: "22", jaw: "OK", d: "m505.84,121.7s-7-5.5-14,1-12,15-17,22-7,11-9,14c-.85,1.27-2,39-2,39,0,0-2.24,9.89,10,10.5,10,.5,29,0,33-2.5s5-1.5,7-16,3-30,3-37-4.07-17.68-5-20c-4-10-6-11-6-11" },
  { id: "23", jaw: "OK", d: "m560.84,140.7s0-14.83-2-18-8-7.35-13-3.17-18,20.17-21,24.17-7,8-7,9.5-3.06,41-4.06,44,11.06,6.5,14.06,18c1.72,6.58,10,5.5,14,2s11.51-15.05,12-17.5c1-5,7-40,7-47v-12Z" },
  { id: "24", jaw: "OK", d: "m590.84,138.7s2-12-1-13c-2.85-.95-14,10-18,15s-10,12-10,12l-4,24c-2,12-4,24.5-4,24.5,0,0,8,5.83,8,6.5s7,9.5,13-1,10.3-31.58,12-43.5c2-14,4-24.5,4-24.5" },
  { id: "25", jaw: "OK", d: "m601.84,168.88s3-13.18,2-17.18-3.65-7.5-8-2.5-8,9.5-8,9.5c0,0-2,17.5-4,25-2,7.5-2,7-2,7l-3,10s0,7.5,5,3,15-21,16-25c1-4,2-9.82,2-9.82" },
  // --- Unterkiefer ---
  { id: "45", jaw: "UK", d: "m190.84,278.61l-7-13.91s-11-10-18-5-12.28,16.5-12.28,25-3.28,25.96,0,30.48c3.28,4.52,8.58,7.02,14.28,4.52s9-6,9-6c0,0,.98-10,3-20.5s5-14.59,11-14.59" },
  { id: "44", jaw: "UK", d: "m222.84,297.7s-10-4-15-8-15-12-18-11-9,4-9,13-4,23-5,28-4,26-1,28,11,8,21,0,18-18.5,18-18.5l9-31.5Z" },
  { id: "43", jaw: "UK", d: "m262.84,335.7s-16,27-19,29.5-16,16.5-23,13.5-11-15-8-37.5,11-48,15-48,9,.5,14,4.5,13,9.61,18,11c3.34.93,3.27,15,3.27,15l-.27,12Z" },
  { id: "42", jaw: "UK", d: "m313.84,314.7l5,15s-1,8-5,16-12,31-20,35-22,6-24-6-8-66-8-66c0,0,0-2,8,0s33,2.91,35,2.91,8,0,9,3.09" },
  { id: "41", jaw: "UK", d: "m370.84,319.2v19.5c0,8.25-9,37-14,41s-22,8.5-27-7c-6.48-20.08-12-53.54-12-53.54,0,0-3.42-7.46,7.58-7.46h35.42s10-1.5,10,7.5" },
  { id: "31", jaw: "UK", d: "m371.98,337.99c0,8.25,9,37,14,41s22,8.5,27-7c6.48-20.08,12-53.54,12-53.54,0,0,3.42-7.46-7.58-7.46h-35.42s-10-1.5-10,7.5" },
  { id: "32", jaw: "UK", d: "m428.8,311.38l-4.89,15s.98,8,4.89,16,11.75,31,19.58,35c7.83,4,21.54,6,23.49-6,1.96-12,7.83-66,7.83-66,0,0,0-2-7.83,0-7.83,2-32.3,2.91-34.26,2.91s-7.83,0-8.81,3.09" },
  { id: "33", jaw: "UK", d: "m478.88,331.98s16,27,19,29.5,16,16.5,23,13.5,11-15,8-37.5-11-48-15-48-9,.5-14,4.5-13,9.61-18,11c-3.34.93-3.27,15-3.27,15l.27,12Z" },
  { id: "34", jaw: "UK", d: "m519.13,290.34s8.32-4,12.48-8c4.16-4,12.48-12,14.97-11s7.48,4,7.48,13,3.33,23,4.16,28,3.33,26,.83,28c-2.5,2-9.15,8-17.47,0-8.32-8-14.97-18.5-14.97-18.5l-7.48-31.5Z" },
  { id: "35", jaw: "UK", d: "m569.31,252.99c7,5,12.28,16.5,12.28,25s3.28,25.96,0,30.48c-3.28,4.52-8.58,7.02-14.28,4.52s-9-6-9-6c0,0-.98-10-3-20.5s-5-14.59-11-14.59l7-13.91" },
];

export default function ToothDesigner() {
  // Map<toothId, styleKey | null>  → null = ausgewählt, aber noch kein Stil
  const [picks, setPicks] = useState<Map<string, StyleKey | null>>(new Map());
  const [activeStyle, setActiveStyle] = useState<StyleKey | null>(null);
  const [wishes, setWishes] = useState("");

  // Zahn klicken: toggelt Auswahl. Neu hinzugekommene Zähne bekommen
  // den aktiven Stil (falls einer gewählt ist), sonst null.
  const toggleTooth = (id: string) => {
    setPicks((prev) => {
      const n = new Map(prev);
      if (n.has(id)) n.delete(id);
      else n.set(id, activeStyle);
      return n;
    });
  };

  // Stil-Karte klicken: setzt aktiven Stil und weist ihn allen bisher
  // ausgewählten Zähnen ohne Stil zu (sanfter, weil nichts überschrieben wird).
  // Klick auf den bereits aktiven Stil → abwählen (Stil-Auswahl zurücksetzen,
  // existierende Zähne behalten ihren Stil).
  const pickStyle = (sk: StyleKey) => {
    if (activeStyle === sk) {
      setActiveStyle(null);
      return;
    }
    setActiveStyle(sk);
    setPicks((prev) => {
      const n = new Map(prev);
      for (const [id, current] of n) if (current === null) n.set(id, sk);
      return n;
    });
  };

  // Einzelnen Zahn in der Liste umstellen
  const setToothStyle = (id: string, sk: StyleKey) => {
    setPicks((prev) => {
      const n = new Map(prev);
      n.set(id, sk);
      return n;
    });
  };

  const total = useMemo(() => {
    let sum = 0;
    let i = 0;
    for (const [, sk] of picks) {
      if (sk === null) continue;
      const st = styleOf(sk);
      sum += i === 0 ? st.first : st.add;
      i++;
    }
    return sum;
  }, [picks]);

  const selectedCount = picks.size;
  const styledCount = useMemo(() => {
    let c = 0;
    for (const [, sk] of picks) if (sk !== null) c++;
    return c;
  }, [picks]);
  const ready = styledCount > 0;

  const mailHref = useMemo(() => {
    const list = [...picks.entries()]
      .map(([id, sk]) => (sk ? `${id} (${styleOf(sk).title})` : `${id} (Stil offen)`))
      .join(", ");
    const subject = "Designer-Anfrage — Chopper Couture";
    const body =
      `Hey Anika,\n\nich hab mir im Designer was zusammengestellt:\n\n` +
      `Zähne & Stile: ${list || "noch keine Auswahl"}\n` +
      `Grober Preis: ${ready ? `${total.toLocaleString("de-DE")} €` : "–"}\n` +
      (wishes ? `\nSonderwünsche:\n${wishes}\n` : "") +
      `\nMeld dich für einen Termin :)\n`;
    return `mailto:hello@choppercouture.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [picks, total, wishes, ready]);

  return (
    <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
      {/* Gebiss */}
      <div className="lg:col-span-7">
        <div className="relative w-full select-none" style={{ aspectRatio: `${VB_W} / ${VB_H}` }}>
          <Image
            src="/images/designer/grill-designer.png"
            alt="Gebiss — wähle deine Zähne"
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-contain pointer-events-none"
            priority
          />
          <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
            {TEETH.map((t) => (
              <path
                key={t.id}
                className="cc-tooth"
                data-selected={picks.has(t.id)}
                d={t.d}
                onClick={() => toggleTooth(t.id)}
              >
                <title>{`Zahn ${t.id}`}</title>
              </path>
            ))}
          </svg>
        </div>
        <p className="mt-4 text-[11px] tracking-cc-caps uppercase text-cc-black/40">
          {selectedCount === 0
            ? "Step 01 — Klick die Zähne an, die du willst"
            : selectedCount === 1
              ? "1 Zahn gewählt — jetzt Stil aussuchen ↓"
              : `${selectedCount} Zähne gewählt — jetzt Stil aussuchen ↓`}
        </p>
      </div>

      {/* Konfigurator */}
      <aside className="lg:col-span-5 space-y-8">
        {/* Step 02 — Stil-Karten */}
        <div>
          <div className="flex items-baseline justify-between mb-4">
            <p className="text-[11px] tracking-cc-caps uppercase text-cc-black/60">
              Step 02 — Stil {selectedCount === 0 && <span className="text-cc-black/30">(erst Zähne wählen)</span>}
            </p>
            {selectedCount > 0 && (
              <button
                onClick={() => {
                  setPicks(new Map());
                  setActiveStyle(null);
                }}
                className="text-[10px] tracking-cc-caps uppercase text-cc-black/40 hover:text-cc-black"
              >
                Alles löschen
              </button>
            )}
          </div>
          <div
            className={`grid grid-cols-2 gap-3 transition-opacity ${
              selectedCount === 0 ? "opacity-40 pointer-events-none" : "opacity-100"
            }`}
          >
            {STYLES.map((s) => {
              const isActive = activeStyle === s.key;
              return (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => pickStyle(s.key)}
                  data-active={isActive}
                  className="group relative text-left p-4 border transition-all duration-200 border-cc-black/15 hover:border-cc-black data-[active=true]:border-cc-black data-[active=true]:bg-cc-black data-[active=true]:text-cc-offwhite"
                >
                  <p className="text-sm font-medium">{s.title}</p>
                  <p className="text-[10px] text-cc-black/50 group-data-[active=true]:text-cc-offwhite/60 mt-1 leading-snug">
                    {s.body}
                  </p>
                  <p className="text-[10px] tracking-cc-caps uppercase mt-3 text-cc-black/60 group-data-[active=true]:text-cc-offwhite/70">
                    {s.first} € · +{s.add} €
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Auswahlliste — pro Zahn umstellbar */}
        {selectedCount > 0 && (
          <div className="border-t border-cc-black/15 pt-4">
            <p className="text-[11px] tracking-cc-caps uppercase text-cc-black/50 mb-3">
              Deine Auswahl ({selectedCount})
            </p>
            <ul className="space-y-2">
              {[...picks.entries()].map(([id, sk]) => (
                <li key={id} className="flex items-center justify-between gap-3 text-sm border-b border-cc-black/5 pb-2">
                  <span className="font-medium">Zahn {id}</span>
                  <div className="flex items-center gap-1">
                    {STYLES.map((s) => (
                      <button
                        key={s.key}
                        type="button"
                        onClick={() => setToothStyle(id, s.key)}
                        data-active={sk === s.key}
                        title={s.title}
                        className="text-[10px] tracking-cc-caps uppercase px-2 py-1 border border-cc-black/15 hover:border-cc-black data-[active=true]:bg-cc-black data-[active=true]:text-cc-offwhite data-[active=true]:border-cc-black transition-colors"
                      >
                        {s.title.slice(0, 3)}
                      </button>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Sonderwünsche */}
        <div className="border-t border-cc-black/15 pt-4">
          <label htmlFor="wishes" className="block text-[11px] tracking-cc-caps uppercase text-cc-black/50 mb-3">
            Step 03 — Spezielle Wünsche
          </label>
          <textarea
            id="wishes"
            value={wishes}
            onChange={(e) => setWishes(e.target.value)}
            rows={3}
            placeholder="Material, Motiv, Stein, Schriftzug … erzähl einfach."
            className="w-full bg-transparent border-b border-cc-black/30 focus:border-cc-black outline-none py-3 text-base placeholder:text-cc-black/40 resize-none"
          />
        </div>

        {/* Preis */}
        <div className="border-t border-cc-black/15 pt-4">
          <p className="text-[11px] tracking-cc-caps uppercase text-cc-black/50 mb-2">Grober Preis</p>
          <p className="font-black tracking-tight" style={{ fontSize: "clamp(2rem, 3vw, 2.5rem)" }}>
            {ready ? `${total.toLocaleString("de-DE")} €` : "—"}
          </p>
          {ready && (
            <p className="text-xs text-cc-black/50 mt-1">
              Erster Zahn zum Grundpreis, jeder weitere günstiger · finaler Preis nach Absprache
            </p>
          )}
          {selectedCount > styledCount && (
            <p className="text-xs text-cc-pink mt-2">
              {selectedCount - styledCount} {selectedCount - styledCount === 1 ? "Zahn hat" : "Zähne haben"} noch keinen Stil.
            </p>
          )}
        </div>

        {/* CTA */}
        <a
          href={mailHref}
          className={`block text-xs tracking-cc-caps uppercase text-center px-10 py-5 transition-colors ${
            ready ? "bg-cc-black text-cc-offwhite hover:bg-cc-purple" : "border border-cc-black/20 text-cc-black/40 pointer-events-none"
          }`}
        >
          Anfrage senden →
        </a>
      </aside>
    </div>
  );
}
