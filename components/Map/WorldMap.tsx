"use client";

/*
 * WorldMap — react-simple-maps + Framer Motion
 * ────────────────────────────────────────────
 *
 * MAP TECHNOLOGY TRADEOFF
 *
 * We ship react-simple-maps (which wraps d3-geo and renders SVG) over
 * MapLibre GL JS for one decisive reason: every country shape is a real
 * SVG path, so Framer Motion can drive entrance animations, fill
 * interpolation on filter swap, hover lifts, and the click-to-zoom camera
 * declaratively. With WebGL (MapLibre) we'd be locked out of `motion.path`
 * and would have to imitate motion via shader uniforms or CSS layers, both
 * of which fight the renderer instead of cooperating with it.
 *
 * The cost we accept: react-simple-maps cannot draw 100k vector tiles at
 * 60fps. For a 70-feature country choropleth at 110m resolution, that's
 * fine — frames stay smooth and the editorial detail (1px strokes, layered
 * markers, soft pulses) is what makes the visualization feel premium.
 *
 * If this project ever grows into city-level data (think: 50k restaurants
 * pinned), swap to MapLibre GL with deck.gl overlays and accept that
 * country fills become buffer-driven instead of motion-driven.
 *
 * PROJECTION
 *
 * Equal Earth — modern, area-accurate, less Eurocentric than Mercator,
 * cleaner aspect for editorial dataviz than Robinson. Centered slightly
 * above the equator so populated continents anchor the optical center.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { ComposableMap, Geographies, ZoomableGroup } from "react-simple-maps";
import { animate as fmAnimate } from "framer-motion";
import { CountryShape } from "@/components/Map/CountryShape";
import { AppMarkers } from "@/components/Map/AppMarkers";
import { MapTooltip } from "@/components/Map/MapTooltip";
import { useMapStore } from "@/lib/store/useMapStore";
import { COUNTRY_BY_ISO } from "@/lib/data/countryAppMap";

type TopoData = unknown;

const PROJECTION_CONFIG = {
  scale: 175,
  center: [0, 14] as [number, number],
};

const EDITORIAL_EASE: [number, number, number, number] = [0.2, 0.7, 0.3, 1];

export function WorldMap() {
  const [topoData, setTopoData] = useState<TopoData | null>(null);
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState<[number, number]>([0, 14]);
  const selectedIso = useMapStore((s) => s.selectedIso);
  const reducedMotion = useMapStore((s) => s.reducedMotion);
  const animationsRef = useRef<Array<{ stop: () => void }>>([]);

  // Prefetch the world-atlas topojson once. Postinstall script copies the
  // file into /public/data so the path is stable and offline-friendly.
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

  // Camera animation: when a country is selected, smoothly push the
  // ZoomableGroup toward its centroid; on deselect, return to overview.
  useEffect(() => {
    animationsRef.current.forEach((a) => a.stop());
    animationsRef.current = [];

    const target = selectedIso
      ? (() => {
          const entry = COUNTRY_BY_ISO[selectedIso];
          if (!entry) return { zoom: 1, center: [0, 14] as [number, number] };
          return { zoom: 2.6, center: entry.centroid };
        })()
      : { zoom: 1, center: [0, 14] as [number, number] };

    const duration = reducedMotion ? 0 : 0.85;

    const zoomCtl = fmAnimate(zoom, target.zoom, {
      duration,
      ease: EDITORIAL_EASE,
      onUpdate: (v) => setZoom(v),
    });
    const cxCtl = fmAnimate(center[0], target.center[0], {
      duration,
      ease: EDITORIAL_EASE,
      onUpdate: (v) => setCenter((c) => [v, c[1]]),
    });
    const cyCtl = fmAnimate(center[1], target.center[1], {
      duration,
      ease: EDITORIAL_EASE,
      onUpdate: (v) => setCenter((c) => [c[0], v]),
    });
    animationsRef.current = [zoomCtl, cxCtl, cyCtl];

    return () => {
      animationsRef.current.forEach((a) => a.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIso, reducedMotion]);

  return (
    <div className="absolute inset-0 map-canvas">
      {/* Loading silhouette (custom shimmer; no spinner) */}
      {!topoData && <MapShimmer />}

      <div
        className="absolute inset-0"
        style={{
          opacity: topoData ? 1 : 0,
          transition: "opacity 600ms cubic-bezier(0.2, 0.7, 0.3, 1)",
        }}
      >
        <ComposableMap
          projection="geoEqualEarth"
          projectionConfig={PROJECTION_CONFIG}
          width={1600}
          height={780}
          style={{ width: "100%", height: "100%" }}
        >
          <defs>
            {/* Soft inner glow used on selected countries */}
            <filter id="glow-soft" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Background ocean — vast, recedes */}
            <radialGradient id="ocean" cx="50%" cy="50%" r="75%">
              <stop offset="0%" stopColor="#0E0E15" />
              <stop offset="100%" stopColor="#06060A" />
            </radialGradient>
          </defs>

          <rect width="100%" height="100%" fill="url(#ocean)" />

          <ZoomableGroup
            center={center}
            zoom={zoom}
            minZoom={1}
            maxZoom={6}
            onMoveEnd={({ coordinates, zoom }) => {
              // Sync interactive pan/drag state back so subsequent
              // click-to-zoom animates from the user's actual position.
              setCenter(coordinates);
              setZoom(zoom);
            }}
            translateExtent={[
              [-200, -200],
              [1800, 980],
            ]}
          >
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
                <AppMarkers />
              </>
            ) : null}
          </ZoomableGroup>
        </ComposableMap>
      </div>

      <MapTooltip />
    </div>
  );
}

function MapShimmer() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      role="status"
      aria-label="Loading world map"
    >
      <svg
        viewBox="0 0 800 360"
        className="w-3/4 max-w-4xl opacity-40"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="shimmer-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.04)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.10)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.04)" />
            <animate
              attributeName="x1"
              from="-100%"
              to="100%"
              dur="2.4s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="x2"
              from="0%"
              to="200%"
              dur="2.4s"
              repeatCount="indefinite"
            />
          </linearGradient>
        </defs>
        {/* Stylized continents — generic blobs to suggest a map silhouette */}
        <g fill="url(#shimmer-grad)">
          <ellipse cx="180" cy="140" rx="120" ry="55" />
          <ellipse cx="190" cy="240" rx="60" ry="50" />
          <ellipse cx="380" cy="120" rx="100" ry="45" />
          <ellipse cx="420" cy="220" rx="80" ry="60" />
          <ellipse cx="580" cy="150" rx="130" ry="55" />
          <ellipse cx="660" cy="270" rx="50" ry="35" />
        </g>
      </svg>
      <div
        className="absolute bottom-12 font-mono text-2xs uppercase tracking-widest text-bone-muted"
      >
        Loading atlas
      </div>
    </div>
  );
}
