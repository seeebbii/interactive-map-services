"use client";

/*
 * WorldMap — orthographic globe (react-simple-maps + d3-geo + Framer Motion)
 * ────────────────────────────────────────────────────────────────────────
 *
 * MAP TECHNOLOGY TRADEOFF
 *
 * react-simple-maps wraps d3-geo and renders countries as real SVG paths,
 * so Framer Motion can drive entrance, fill interpolation on filter swap,
 * hover lifts, and the click-to-rotate camera declaratively. WebGL
 * (MapLibre) would force motion through shader uniforms or CSS layers,
 * both of which fight the renderer instead of cooperating with it.
 *
 * Cost: react-simple-maps cannot draw 100k vector tiles at 60fps. For a
 * country-level choropleth at 110m resolution (~70 features), it stays
 * smooth. If this ever grows into city-level density (50k pinned places),
 * swap to MapLibre + deck.gl and accept that fills become buffer-driven
 * rather than motion-driven.
 *
 * PROJECTION — WHY ORTHOGRAPHIC GLOBE
 *
 * The design brief wants a draggable globe (Bloomberg / Pudding lineage),
 * not a flat atlas. Orthographic projection draws a sphere, makes the
 * map feel like a physical instrument, and gives weight to interaction.
 *
 *   • drag → rotate (lambda + phi)
 *   • click country → animate rotation to face it
 *   • back-of-globe countries are auto-clipped by d3-geo's clipAngle(90°)
 *
 * Bubble markers are intentionally absent — the map IS the data via
 * choropleth fills. Country-code labels are an opt-in overlay (vizMode).
 */

import { useEffect, useRef, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Sphere,
  Graticule,
} from "react-simple-maps";
import { animate as fmAnimate } from "framer-motion";
import { CountryShape } from "@/components/Map/CountryShape";
import { CountryLabels } from "@/components/Map/CountryLabels";
import { MapTooltip } from "@/components/Map/MapTooltip";
import { MapShimmer } from "@/components/Map/MapShimmer";
import { useMapStore } from "@/lib/store/useMapStore";
import { COUNTRY_BY_ISO } from "@/lib/data/countryAppMap";

type TopoData = unknown;

const GLOBE_SCALE = 320;
const DRAG_LON_DEG_PER_PX = 0.4;
const DRAG_LAT_DEG_PER_PX = 0.32;
const EDITORIAL_EASE: [number, number, number, number] = [0.2, 0.7, 0.3, 1];

function clamp(n: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, n));
}

/** Shortest-path interpolation target for longitude (handles wrap). */
function shortestLon(from: number, to: number): number {
  let delta = to - from;
  while (delta > 180) delta -= 360;
  while (delta < -180) delta += 360;
  return from + delta;
}

export function WorldMap() {
  const [topoData, setTopoData] = useState<TopoData | null>(null);
  const rotate = useMapStore((s) => s.rotate);
  const setRotate = useMapStore((s) => s.setRotate);
  const selectedIso = useMapStore((s) => s.selectedIso);
  const reducedMotion = useMapStore((s) => s.reducedMotion);
  const dragRef = useRef<
    | { x: number; y: number; rot: [number, number, number]; moved: boolean }
    | null
  >(null);
  const lastDragMovedRef = useRef<boolean>(false);
  const animationsRef = useRef<{ stop: () => void }[]>([]);

  // Prefetch the world-atlas TopoJSON
  useEffect(() => {
    let cancelled = false;
    fetch("/data/world-110m.json")
      .then((r) => {
        if (!r.ok) throw new Error(`Failed to load world map: ${r.status}`);
        return r.json();
      })
      .then((data: TopoData) => {
        if (!cancelled) setTopoData(data);
      })
      .catch((err: unknown) => {
        // eslint-disable-next-line no-console
        console.error("[WorldMap] failed to load topojson", err);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Camera animation: when a country is selected, rotate the globe to face it.
  useEffect(() => {
    animationsRef.current.forEach((a) => a.stop());
    animationsRef.current = [];

    if (!selectedIso) return;
    const entry = COUNTRY_BY_ISO[selectedIso];
    if (!entry) return;

    const targetLon = shortestLon(rotate[0], -entry.centroid[0]);
    const targetLat = clamp(-entry.centroid[1], -85, 85);
    const duration = reducedMotion ? 0 : 0.95;

    const lonCtl = fmAnimate(rotate[0], targetLon, {
      duration,
      ease: EDITORIAL_EASE,
      onUpdate: (v) =>
        setRotate([
          v,
          useMapStore.getState().rotate[1],
          useMapStore.getState().rotate[2],
        ]),
    });
    const latCtl = fmAnimate(rotate[1], targetLat, {
      duration,
      ease: EDITORIAL_EASE,
      onUpdate: (v) =>
        setRotate([
          useMapStore.getState().rotate[0],
          v,
          useMapStore.getState().rotate[2],
        ]),
    });
    animationsRef.current = [lonCtl, latCtl];

    return () => {
      animationsRef.current.forEach((a) => a.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIso, reducedMotion]);

  // Pointer drag → rotate
  const onPointerDown = (e: React.PointerEvent) => {
    animationsRef.current.forEach((a) => a.stop());
    animationsRef.current = [];
    dragRef.current = {
      x: e.clientX,
      y: e.clientY,
      rot: [...rotate] as [number, number, number],
      moved: false,
    };
    (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.x;
    const dy = e.clientY - dragRef.current.y;
    if (!dragRef.current.moved && Math.hypot(dx, dy) > 3) {
      dragRef.current.moved = true;
    }
    if (!dragRef.current.moved) return;
    const newLon = dragRef.current.rot[0] + dx * DRAG_LON_DEG_PER_PX;
    const newLat = clamp(
      dragRef.current.rot[1] - dy * DRAG_LAT_DEG_PER_PX,
      -85,
      85,
    );
    setRotate([newLon, newLat, dragRef.current.rot[2]]);
  };

  const onPointerEnd = (e: React.PointerEvent) => {
    lastDragMovedRef.current = dragRef.current?.moved ?? false;
    dragRef.current = null;
    (e.currentTarget as Element).releasePointerCapture?.(e.pointerId);
  };

  // Capture-phase click guard — if the previous pointer interaction was a
  // real drag (>3px), swallow the synthesized click so countries/labels
  // don't accidentally select.
  const onClickCapture = (e: React.MouseEvent) => {
    if (lastDragMovedRef.current) {
      e.stopPropagation();
      lastDragMovedRef.current = false;
    }
  };

  const isDragging = dragRef.current !== null;

  return (
    <div
      className={`absolute inset-0 select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      style={{ touchAction: "none" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
      onPointerLeave={onPointerEnd}
      onClickCapture={onClickCapture}
    >
      {!topoData ? <MapShimmer /> : null}

      <div
        className="absolute inset-0"
        style={{
          opacity: topoData ? 1 : 0,
          transition: "opacity 600ms cubic-bezier(0.2, 0.7, 0.3, 1)",
        }}
      >
        <ComposableMap
          projection="geoOrthographic"
          projectionConfig={{ scale: GLOBE_SCALE, rotate }}
          width={1000}
          height={780}
          style={{ width: "100%", height: "100%" }}
        >
          <defs>
            {/* Ocean fill — radial gradient gives a subtle dome */}
            <radialGradient id="globe-ocean" cx="38%" cy="34%" r="72%">
              <stop offset="0%" stopColor="#1A1B23" />
              <stop offset="55%" stopColor="#0E0E15" />
              <stop offset="100%" stopColor="#04040A" />
            </radialGradient>
            {/* Atmospheric rim */}
            <radialGradient id="globe-rim" cx="50%" cy="50%" r="50%">
              <stop offset="92%" stopColor="rgba(0, 229, 255, 0)" />
              <stop offset="98%" stopColor="rgba(0, 229, 255, 0.18)" />
              <stop offset="100%" stopColor="rgba(0, 229, 255, 0)" />
            </radialGradient>
            <filter
              id="glow-soft"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feGaussianBlur stdDeviation="2.4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Globe atmosphere ring (sits behind the sphere) */}
          <circle cx={500} cy={390} r={GLOBE_SCALE + 18} fill="url(#globe-rim)" />

          {/* Ocean sphere */}
          <Sphere
            id="globe-sphere"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={0.8}
            fill="url(#globe-ocean)"
          />

          {/* Graticule */}
          <Graticule
            stroke="rgba(255,255,255,0.045)"
            strokeWidth={0.4}
            step={[15, 15]}
            fill="none"
          />

          {/* Countries */}
          {topoData ? (
            <>
              <Geographies geography={topoData}>
                {({ geographies }) =>
                  geographies.map((geo, i) => (
                    <CountryShape
                      key={geo.rsmKey}
                      geography={geo}
                      index={i}
                    />
                  ))
                }
              </Geographies>
              <CountryLabels />
            </>
          ) : null}
        </ComposableMap>
      </div>

      <MapTooltip />
    </div>
  );
}
