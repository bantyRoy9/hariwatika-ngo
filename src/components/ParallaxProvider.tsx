"use client";

/**
 * ParallaxProvider
 * ─────────────────────────────────────────────────────────────
 * Mounts once at the root layout level and does three things:
 *
 * 1. Writes --mx / --my CSS custom properties on <html> so any
 *    element can use them for mouse-reactive transforms.
 *
 * 2. Renders a fixed, pointer-events-none ambient canvas that
 *    draws drifting gradient orbs behind every page.
 *
 * 3. Adds a passive scroll listener that writes --scroll-y so
 *    elements can use it for CSS-only parallax via translate().
 */

import { useEffect, useRef } from "react";

interface Orb {
  x: number; y: number; vx: number; vy: number;
  r: number; color: string; opacity: number;
}

const ORBS: Orb[] = [
  { x: 0.15, y: 0.20, vx:  0.00012, vy:  0.00008, r: 320, color: "133,83,0",   opacity: 0.13 },
  { x: 0.78, y: 0.65, vx: -0.00009, vy:  0.00011, r: 400, color: "244,164,51", opacity: 0.08 },
  { x: 0.50, y: 0.40, vx:  0.00007, vy: -0.00009, r: 280, color: "0,109,62",   opacity: 0.07 },
  { x: 0.88, y: 0.15, vx: -0.00010, vy:  0.00006, r: 240, color: "133,83,0",   opacity: 0.09 },
  { x: 0.22, y: 0.80, vx:  0.00008, vy: -0.00007, r: 360, color: "244,164,51", opacity: 0.06 },
];

export default function ParallaxProvider({ children }: { children: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orbState  = useRef<Orb[]>(ORBS.map(o => ({ ...o })));
  const mouse     = useRef({ x: 0.5, y: 0.5 });
  const raf       = useRef<number>(0);

  /* ── Mouse tracker → CSS vars ── */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const mx = e.clientX / window.innerWidth;
      const my = e.clientY / window.innerHeight;
      mouse.current = { x: mx, y: my };
      document.documentElement.style.setProperty("--mx", String(mx));
      document.documentElement.style.setProperty("--my", String(my));
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /* ── Scroll → CSS var ── */
  useEffect(() => {
    const onScroll = () => {
      document.documentElement.style.setProperty(
        "--scroll-y",
        String(window.scrollY)
      );
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Ambient canvas animation ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const draw = () => {
      const { width: W, height: H } = canvas;
      ctx.clearRect(0, 0, W, H);

      orbState.current.forEach(orb => {
        /* gentle drift */
        orb.x += orb.vx;
        orb.y += orb.vy;
        if (orb.x < -0.1) orb.x = 1.1;
        if (orb.x >  1.1) orb.x = -0.1;
        if (orb.y < -0.1) orb.y = 1.1;
        if (orb.y >  1.1) orb.y = -0.1;

        /* subtle mouse attraction */
        const cx = orb.x * W + (mouse.current.x - 0.5) * 30;
        const cy = orb.y * H + (mouse.current.y - 0.5) * 20;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, orb.r);
        grad.addColorStop(0,   `rgba(${orb.color},${orb.opacity})`);
        grad.addColorStop(1,   `rgba(${orb.color},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, orb.r, 0, Math.PI * 2);
        ctx.fill();
      });

      raf.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      {/* Ambient parallax canvas — fixed, behind everything */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position:      "fixed",
          inset:         0,
          width:         "100%",
          height:        "100%",
          pointerEvents: "none",
          zIndex:        0,
          mixBlendMode:  "normal",
        }}
      />
      {/* Page content sits above the canvas */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </>
  );
}
