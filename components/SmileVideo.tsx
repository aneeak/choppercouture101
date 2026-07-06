"use client";

/**
 * SmileVideo — künstlerischer Video-Break zwischen Hero und Designer.
 * Zeigt die Person mit fertigen Grillz im Mund. Autoplay, muted, loop,
 * playsInline für iOS. Weißer Abstand oben/unten trennt es visuell vom
 * schwarzen Hero.
 */

export default function SmileVideo({
  src = "/videos/smile.mov",
}: {
  src?: string;
}) {
  return (
    <div className="bg-cc-offwhite pt-20 md:pt-32 pb-20 md:pb-32">
      <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-cc-black overflow-hidden">
        <video
          className="h-full w-full object-cover"
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>
    </div>
  );
}
