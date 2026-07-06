/**
 * Footer
 * ------
 * Minimal: newsletter signup, link row, copyright.
 * Styling matches snowdiamonds — schlicht, kleine Schrift, viel Luft.
 *
 * ASSUMPTION: Newsletter form posts nowhere yet — placeholder action.
 * Wire to your provider (Mailchimp, Brevo, Resend ...) in /api/newsletter.
 */

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-cc-black text-cc-offwhite px-6 md:px-12 py-16">
      {/* Newsletter */}
      <div className="max-w-3xl mb-20">
        <p className="font-mono text-xs tracking-cc-caps uppercase text-cc-offwhite/60 mb-3">
          Newsletter
        </p>
        <h3
          className="font-black leading-[1.05] mb-8"
          style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
        >
          Neue Stücke, Drops, Studio-Kram. Kein Spam.
        </h3>
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
            className="flex-1 bg-transparent border-b border-cc-offwhite/30 focus:border-cc-offwhite outline-none py-3 text-sm placeholder:text-cc-offwhite/40"
          />
          <button
            type="submit"
            className="text-xs tracking-cc-caps uppercase border border-cc-offwhite/40 hover:border-cc-offwhite px-6 py-3 transition-colors"
          >
            Anmelden
          </button>
        </form>
      </div>

      {/* Link row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-8 border-t border-cc-offwhite/10">
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs tracking-cc-caps uppercase text-cc-offwhite/70">
          <li>
            <Link href="/about" className="hover:text-cc-offwhite">
              About
            </Link>
          </li>
          <li>
            <Link href="/#material" className="hover:text-cc-offwhite">
              Material
            </Link>
          </li>
          <li>
            <Link href="/legal/impressum" className="hover:text-cc-offwhite">
              Impressum
            </Link>
          </li>
          <li>
            <Link href="/legal/datenschutz" className="hover:text-cc-offwhite">
              Datenschutz
            </Link>
          </li>
          <li>
            <Link href="/legal/agb" className="hover:text-cc-offwhite">
              AGB
            </Link>
          </li>
          <li>
            <a
              href="https://instagram.com/choppercouture"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cc-offwhite"
            >
              Instagram
            </a>
          </li>
          <li>
            <a
              href="mailto:hello@choppercouture.de"
              className="hover:text-cc-offwhite"
            >
              E-Mail
            </a>
          </li>
        </ul>
        <p className="font-mono text-[11px] tracking-cc-caps uppercase text-cc-offwhite/50">
          © 2026 Chopper Couture. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
