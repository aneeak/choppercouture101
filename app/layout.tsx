import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import Navigation from "@/components/Navigation";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chopper Couture — Dental Jewelry · Berlin",
  description:
    "Got teeth? Got options. Präzisions-Zahnschmuck für Menschen, die ihre Identität tragen. Custom Grillz aus Berlin.",
};

export const viewport: Viewport = {
  // ASSUMPTION: tief-schwarz als browser-chrome — passt zum Hero.
  themeColor: "#0d0d0d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="bg-white text-cc-black">
        <SmoothScrollProvider>
          <Navigation />
          <main>{children}</main>
          {/* Footer is rendered per-page so the homepage can include it
              inside its scroll narrative as Section 5. Subpages render it
              explicitly. */}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
