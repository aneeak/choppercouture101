"use client";

/**
 * ParticleLogo
 * ------------
 * Full-bleed canvas. The wordmark is rendered as a particle cloud.
 *
 * Mouse model — "Pinsel im Pulver":
 *   The cursor has a small local influence radius (`dragRadius`). Particles
 *   inside that radius pick up a fraction of the cursor's per-frame movement
 *   as a velocity impulse — they get carried with the stroke.
 *
 * Return model — Powder-Settling (kein Spring, kein Glibber):
 *   Movement after impulse:
 *     1. Damping kills the cursor-imparted velocity over a few frames.
 *     2. Position is *linearly* lerped toward `home` each frame
 *        (`x += (hx - x) * settle`).
 *   Because we never write displacement back into velocity, there is NO
 *   spring oscillation — particles cannot overshoot. They settle the way
 *   plaster/metal dust settles: nudged out by a finger, drifting back
 *   without bounce.
 */

import { useEffect, useRef } from "react";

interface Particle {
  hx: number; // home x (forms the logo)
  hy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface ParticleLogoProps {
  src?: string;
  color?: string;
  /** Sample grid step in CSS px — smaller = denser logo. */
  sampleStep?: number;
  /** Width the logo occupies inside the canvas, in CSS px. */
  logoWidth?: number;
  particleSize?: number;
  /** Radius (CSS px) of the cursor's local drag influence. Keep small. */
  dragRadius?: number;
  /** How much of the cursor's per-frame movement is transferred to each
      particle inside `dragRadius`. 1.0 = full match, 0.0 = no drag. */
  dragStrength?: number;
  /** Linear lerp rate toward home position, per frame (0..1).
      0.015 = slow powder drift, 0.05 = quick settle. */
  settle?: number;
  /** Velocity damping per frame (0..1). Lower = momentum dies faster.
      Pure damping, no spring — never causes bounce. */
  damping?: number;
}

export default function ParticleLogo({
  src = "/logo/wordmark-white.svg",
  color = "#f9f9f9",
  sampleStep = 4,
  logoWidth = 840,
  particleSize = 0.9,
  dragRadius = 70,
  dragStrength = 0.55,
  settle = 0.022,
  damping = 0.78,
}: ParticleLogoProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  // Tracks the cursor: current pos + velocity (px/frame) + recency.
  const mouseRef = useRef<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    active: boolean;
    lastMoveAt: number;
  }>({
    x: -9999,
    y: -9999,
    vx: 0,
    vy: 0,
    active: false,
    lastMoveAt: 0,
  });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    const fit = async () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      await buildParticles();
    };

    const buildParticles = () =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => {
          const iw = img.naturalWidth || 340.59;
          const ih = img.naturalHeight || 453.75;

          const targetW = Math.min(logoWidth, width * 0.95);
          const scale = Math.min(targetW / iw, (height * 0.92) / ih);
          const drawW = iw * scale;
          const drawH = ih * scale;
          const offsetX = (width - drawW) / 2;
          const offsetY = (height - drawH) / 2;

          const off = document.createElement("canvas");
          off.width = Math.round(width);
          off.height = Math.round(height);
          const offCtx = off.getContext("2d");
          if (!offCtx) {
            resolve();
            return;
          }
          offCtx.clearRect(0, 0, off.width, off.height);
          offCtx.drawImage(img, offsetX, offsetY, drawW, drawH);

          let data: ImageData;
          try {
            data = offCtx.getImageData(0, 0, off.width, off.height);
          } catch {
            resolve();
            return;
          }

          const particles: Particle[] = [];
          const pixels = data.data;
          const prev = particlesRef.current;
          let pi = 0;
          for (let y = 0; y < off.height; y += sampleStep) {
            for (let x = 0; x < off.width; x += sampleStep) {
              const idx = (y * off.width + x) * 4 + 3;
              if (pixels[idx] > 128) {
                const old = prev[pi];
                particles.push({
                  hx: x,
                  hy: y,
                  x: old ? old.x : x,
                  y: old ? old.y : y,
                  vx: old ? old.vx : 0,
                  vy: old ? old.vy : 0,
                });
                pi++;
              }
            }
          }
          particlesRef.current = particles;
          resolve();
        };
        img.onerror = () => resolve();
        img.src = src;
      });

    const drawIdle = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;
      const ps = particleSize;
      const half = ps / 2;
      for (const p of particlesRef.current) {
        ctx.fillRect(p.x - half, p.y - half, ps, ps);
      }
    };

    const tick = () => {
      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const r2 = dragRadius * dragRadius;

      // The cursor's drag impulse decays after each frame so a single
      // mousemove event doesn't keep dragging particles forever.
      const mvx = mouse.vx;
      const mvy = mouse.vy;
      const dragActive = mouse.active && (mvx * mvx + mvy * mvy) > 0.04;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;
      const ps = particleSize;
      const half = ps / 2;

      let stillMoving = false;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // (a) local drag — particle picks up some of cursor's per-frame
        //     movement when inside the drag radius.
        if (dragActive) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < r2) {
            const falloff = 1 - Math.sqrt(d2) / dragRadius;
            p.vx += mvx * dragStrength * falloff;
            p.vy += mvy * dragStrength * falloff;
          }
        }

        // (b) integrate momentum + damp it (pure exponential decay, no spring)
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= damping;
        p.vy *= damping;

        // (c) settle: linear pull toward home. Decoupled from velocity,
        //     so it can NEVER cause oscillation. Powder/metal feel.
        p.x += (p.hx - p.x) * settle;
        p.y += (p.hy - p.y) * settle;

        const dxh = p.hx - p.x;
        const dyh = p.hy - p.y;
        if (
          Math.abs(p.vx) > 0.05 ||
          Math.abs(p.vy) > 0.05 ||
          dxh * dxh + dyh * dyh > 0.25
        ) {
          stillMoving = true;
        }

        ctx.fillRect(p.x - half, p.y - half, ps, ps);
      }

      // Decay the cursor's recorded velocity so the drag impulse fades out
      // even if no new mousemove fires.
      mouse.vx *= 0.6;
      mouse.vy *= 0.6;

      if (dragActive || stillMoving) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
      }
    };

    const startTick = () => {
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    // --- Cursor tracking ---
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const mouse = mouseRef.current;
      if (mouse.active) {
        // Accumulate movement deltas as cursor velocity (per-frame px).
        // Clamp to keep extreme flicks from yeeting particles off-screen.
        const dx = x - mouse.x;
        const dy = y - mouse.y;
        const clamp = 60;
        mouse.vx = Math.max(-clamp, Math.min(clamp, dx));
        mouse.vy = Math.max(-clamp, Math.min(clamp, dy));
      }
      mouse.x = x;
      mouse.y = y;
      mouse.active = true;
      mouse.lastMoveAt = performance.now();
      startTick();
    };
    const onLeave = () => {
      const mouse = mouseRef.current;
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.vx = 0;
      mouse.vy = 0;
      startTick();
    };

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    const ro = new ResizeObserver(() => {
      fit().then(() => {
        drawIdle();
        startTick();
      });
    });
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    fit().then(drawIdle);

    return () => {
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      ro.disconnect();
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [
    src,
    color,
    sampleStep,
    logoWidth,
    particleSize,
    dragRadius,
    dragStrength,
    settle,
    damping,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 block w-full h-full"
      aria-label="Chopper Couture"
    />
  );
}
