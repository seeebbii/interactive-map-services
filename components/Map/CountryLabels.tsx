"use client";

import { useMemo } from "react";
import { Marker } from "react-simple-maps";
import { motion, AnimatePresence } from "framer-motion";
import { useMapStore } from "@/lib/store/useMapStore";
import { COUNTRY_APP_MAP } from "@/lib/data/countryAppMap";
import { APP_BY_ID } from "@/lib/data/apps";
import { categoryHex } from "@/lib/data/categories";

/**
 * On-globe labels (replacement for crowded circle bubbles).
 *
 * Renders ISO alpha-3 codes in Geist Mono at the centroid of qualifying
 * countries. Designed for editorial restraint:
 *   • back-of-globe countries are skipped (great-circle visibility check)
 *   • when no filter is active and vizMode is "fills" — show nothing
 *   • when a filter is active OR vizMode includes labels — show codes
 *     for relevant countries, in the active category color
 *   • the selected/hovered country gets a brighter, larger label
 *
 * No bubbles. No glyphs. Just typography on the globe.
 */

const TO_RAD = Math.PI / 180;

function isVisibleOnHemisphere(
  lon: number,
  lat: number,
  rotate: [number, number, number],
): boolean {
  const lambda = -rotate[0] * TO_RAD;
  const phi = -rotate[1] * TO_RAD;
  const lon2 = lon * TO_RAD;
  const lat2 = lat * TO_RAD;
  const cosD =
    Math.sin(phi) * Math.sin(lat2) +
    Math.cos(phi) * Math.cos(lat2) * Math.cos(lon2 - lambda);
  return cosD > 0.08; // small margin so labels at the limb don't flicker
}

export function CountryLabels() {
  const rotate = useMapStore((s) => s.rotate);
  const categoryFilter = useMapStore((s) => s.categoryFilter);
  const vizMode = useMapStore((s) => s.vizMode);
  const selectedIso = useMapStore((s) => s.selectedIso);
  const hoveredIso = useMapStore((s) => s.hoveredIso);
  const reducedMotion = useMapStore((s) => s.reducedMotion);
  const setSelectedIso = useMapStore((s) => s.setSelectedIso);
  const setHoveredIso = useMapStore((s) => s.setHoveredIso);

  // Decide which countries should show a label.
  const visible = useMemo(() => {
    const showByDefault = vizMode !== "fills";
    return COUNTRY_APP_MAP.filter((country) => {
      if (!isVisibleOnHemisphere(country.centroid[0], country.centroid[1], rotate)) {
        return false;
      }
      if (categoryFilter !== null) {
        return country.apps.some(
          (a) => APP_BY_ID[a.appId]?.category === categoryFilter,
        );
      }
      if (showByDefault) return true;
      // fills mode + no filter → only show selected/hovered
      return (
        country.countryIso === selectedIso ||
        country.countryIso === hoveredIso
      );
    });
  }, [rotate, categoryFilter, vizMode, selectedIso, hoveredIso]);

  return (
    <g aria-hidden="false">
      <AnimatePresence>
        {visible.map((country) => {
          const isSelected = selectedIso === country.countryIso;
          const isHovered = hoveredIso === country.countryIso;

          // Color: category color when filter on, else cyan signal for
          // selected/hovered, else a subtle bone-muted.
          const color = (() => {
            if (categoryFilter !== null) return categoryHex(categoryFilter);
            if (isSelected) return "#00E5FF";
            if (isHovered) return "#E5E5EC";
            return "rgba(229, 229, 236, 0.62)";
          })();

          const fontSize = isSelected ? 10.5 : isHovered ? 10 : 9;
          const opacity = isSelected ? 1 : isHovered ? 0.96 : 0.82;

          return (
            <Marker
              key={country.countryIso}
              coordinates={country.centroid}
            >
              <motion.g
                initial={
                  reducedMotion ? false : { opacity: 0, scale: 0.6 }
                }
                animate={{ opacity, scale: 1 }}
                exit={
                  reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6 }
                }
                transition={{
                  duration: 0.3,
                  ease: [0.2, 0.7, 0.3, 1],
                }}
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  setSelectedIso(country.countryIso);
                }}
                onMouseEnter={() => setHoveredIso(country.countryIso)}
                onMouseLeave={() => setHoveredIso(null)}
                style={{ cursor: "pointer" }}
              >
                {/* Tick mark — small horizontal line under the label, in
                    category color. Subtle, editorial. */}
                <line
                  x1={-7}
                  x2={7}
                  y1={-7}
                  y2={-7}
                  stroke={color}
                  strokeWidth={isSelected ? 1.4 : 0.9}
                  opacity={isSelected ? 1 : 0.7}
                />
                {/* ISO code */}
                <text
                  textAnchor="middle"
                  y={4}
                  fontSize={fontSize}
                  fontFamily="var(--font-geist-mono), ui-monospace"
                  fontWeight={isSelected ? 700 : 500}
                  fill={color}
                  style={{
                    letterSpacing: "0.12em",
                    paintOrder: "stroke",
                    stroke: "rgba(4, 4, 10, 0.9)",
                    strokeWidth: 3,
                    pointerEvents: "none",
                  }}
                >
                  {country.countryIso}
                </text>
              </motion.g>
            </Marker>
          );
        })}
      </AnimatePresence>
    </g>
  );
}
