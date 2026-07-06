/**
 * NewsletterSection (Homepage Section 4)
 * --------------------------------------
 * Bright break from the dark video sections.
 * Big editorial statement + minimal signup field.
 *
 * Brand tonality: confident, refined — no spam disclaimer.
 */

export default function NewsletterSection() {
  return (
    <section className="bg-cc-offwhite text-cc-black px-6 md:px-12 py-20 md:py-48">
      <div className="max-w-5xl">
        <p className="font-mono text-xs tracking-cc-caps uppercase text-cc-black/60 mb-8">
          Newsletter
        </p>
        <h2
          className="font-black uppercase leading-[1.05] tracking-tight mb-16"
          style={{ fontSize: "clamp(2.5rem, 8vw, 8rem)" }}
        >
          Drops. Studio News.
          <br />
          <span className="text-cc-purple">Editorials.</span>
        </h2>

        <form
          action="/api/newsletter"
          method="post"
          className="flex flex-col sm:flex-row gap-3 max-w-xl"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="E-Mail-Adresse"
            className="flex-1 bg-transparent border-b border-cc-black/30 focus:border-cc-black outline-none py-4 text-base placeholder:text-cc-black/40"
          />
          <button
            type="submit"
            className="text-xs tracking-cc-caps uppercase border border-cc-black/40 hover:border-cc-black hover:bg-cc-black hover:text-cc-offwhite px-8 py-4 transition-colors"
          >
            Anmelden
          </button>
        </form>
      </div>
    </section>
  );
}
