"use client";

import { useState, useEffect } from "react";

export interface MousePos { x: number; y: number }

/** Returns normalised mouse position (-0.5 to +0.5) */
export function useMouseParallax() {
  const [mouse, setMouse] = useState<MousePos>({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({
        x: e.clientX / window.innerWidth  - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return mouse;
}
