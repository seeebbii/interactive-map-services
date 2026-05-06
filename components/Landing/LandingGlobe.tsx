"use client";

import { useEffect, useRef, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
} from "react-simple-maps";

/**
 * Decorative globe for the landing hero.
 *
 * - Auto-rotates lambda at ~3°/s (paused if `prefers-reduced-motion`).
 * - Renders all countries with a uniform muted fill (no choropleth).
 * - No interactivity. The hero is the headline; the globe is atmosphere.
 */
export function LandingGlobe({ size = 880 }: { size?: number }) {
  const [topo, setTopo] = useState<unknown | null>(null);
  const [rotate, setRotate] = useState<[number, number, number]>([
    -30, -15, 0,
  ]);
  const [reducedMotion, setReducedMotion] = useState(false);
  const rafRef = useRef<number>(0);

  // Hydrate prefers-reduced-motion locally so we don't depend on the map store
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch("/data/world-110m.json")
      .then((r) => r.json())
      .then((d: unknown) => {
        if (!cancelled) setTopo(d);
      })
      .catch(() => {
        // silent — landing globe is decorative, no need to surface errors
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Auto-rotation loop
  useEffect(() => {
    if (reducedMotion) return;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setRotate((prev) => [prev[0] - dt * 3.4, prev[1], prev[2]]);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reducedMotion]);

  return (
    <div
      aria-hidden="true"
      style={{ width: size, height: size }}
      className="pointer-events-none select-none"
    >
      <ComposableMap
        projection="geoOrthographic"
        projectionConfig={{ scale: size * 0.46, rotate }}
        width={size}
        height={size}
        style={{ width: "100%", height: "100%" }}
      >
        <defs>
          <radialGradient id="lg-ocean" cx="40%" cy="34%" r="72%">
            <stop offset="0%" stopColor="#1A1B23" />
            <stop offset="55%" stopColor="#0E0E15" />
            <stop offset="100%" stopColor="#04040A" />
          </radialGradient>
          <radialGradient id="lg-rim" cx="50%" cy="50%" r="50%">
            <stop offset="92%" stopColor="rgba(0, 229, 255, 0)" />
            <stop offset="98%" stopColor="rgba(0, 229, 255, 0.32)" />
            <stop offset="100%" stopColor="rgba(0, 229, 255, 0)" />
          </radialGradient>
        </defs>

        <circle
          cx={size / 2}
          cy={size / 2}
          r={size * 0.46 + 22}
          fill="url(#lg-rim)"
        />

        <Sphere
          id="lg-sphere"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={0.8}
          fill="url(#lg-ocean)"
        />

        <Graticule
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={0.4}
          step={[15, 15]}
          fill="none"
        />

        {topo ? (
          <Geographies geography={topo}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: "#1B1B26",
                      stroke: "rgba(255,255,255,0.05)",
                      strokeWidth: 0.4,
                      outline: "none",
                    },
                    hover: { fill: "#1B1B26", outline: "none" },
                    pressed: { fill: "#1B1B26", outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>
        ) : null}
      </ComposableMap>
    </div>
  );
}
