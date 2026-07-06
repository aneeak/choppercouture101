/**
 * PageHero
 * --------
 * Re-usable hero block for sub-pages. Just a viewport-tall, brand-toned
 * intro with eyebrow + huge headline + optional kicker. Content goes below.
 */

interface PageHeroProps {
  eyebrow: string;
  headline: string;
  kicker?: string;
  /** Brand tonality. Default = dark canvas (matches lookbook). */
  tone?: "dark" | "light";
}

export default function PageHero({
  eyebrow,
  headline,
  kicker,
  tone = "dark",
}: PageHeroProps) {
  const isDark = tone === "dark";

  return (
    <section
      className={`relative h-screen w-full flex items-end px-6 md:px-12 pb-16 md:pb-24 ${
        isDark ? "bg-cc-black text-cc-offwhite" : "bg-cc-offwhite text-cc-black"
      }`}
    >
      <div className="max-w-6xl">
        <p
          className={`font-mono text-xs tracking-cc-caps uppercase mb-6 ${
            isDark ? "text-cc-offwhite/60" : "text-cc-black/60"
          }`}
        >
          {eyebrow}
        </p>
        <h1
          className="font-black uppercase leading-[1.05] tracking-tight"
          style={{ fontSize: "clamp(3rem, 10vw, 10rem)" }}
        >
          {headline}
        </h1>
        {kicker && (
          <p
            className={`mt-8 max-w-2xl text-base md:text-lg ${
              isDark ? "text-cc-offwhite/75" : "text-cc-black/75"
            }`}
          >
            {kicker}
          </p>
        )}
      </div>
    </section>
  );
}
