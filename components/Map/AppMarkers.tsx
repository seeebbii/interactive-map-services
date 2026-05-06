"use client";

import { useMemo } from "react";
import { Marker } from "react-simple-maps";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useMapStore } from "@/lib/store/useMapStore";
import { COUNTRY_APP_MAP } from "@/lib/data/countryAppMap";
import { APP_BY_ID } from "@/lib/data/apps";
import { categoryHex } from "@/lib/data/categories";
import type { App, CountryAppEntry } from "@/types";

interface Hit {
  country: CountryAppEntry;
  app: App;
}

/**
 * Decide which app should represent a country given the current filter:
 * - No filter active: the country's #1 ranked app
 * - Filter active: the highest-ranked app whose category matches the filter
 */
function pickRepresentative(
  country: CountryAppEntry,
  filter: string | null,
): App | null {
  const sorted = [...country.apps].sort((a, b) => a.rank - b.rank);
  if (filter) {
    const ranked = sorted.find((r) => APP_BY_ID[r.appId]?.category === filter);
    if (!ranked) return null;
    return APP_BY_ID[ranked.appId] ?? null;
  }
  const top = sorted[0];
  if (!top) return null;
  return APP_BY_ID[top.appId] ?? null;
}

export function AppMarkers() {
  const categoryFilter = useMapStore((s) => s.categoryFilter);
  const selectedIso = useMapStore((s) => s.selectedIso);
  const reducedMotion = useMapStore((s) => s.reducedMotion);
  const setSelectedIso = useMapStore((s) => s.setSelectedIso);
  const setHoveredIso = useMapStore((s) => s.setHoveredIso);

  const hits = useMemo<Hit[]>(() => {
    return COUNTRY_APP_MAP.flatMap<Hit>((country) => {
      const app = pickRepresentative(country, categoryFilter);
      return app ? [{ country, app }] : [];
    });
  }, [categoryFilter]);

  return (
    <AnimatePresence mode="popLayout">
      {hits.map(({ country, app }) => {
        const isSelected = selectedIso === country.countryIso;
        const fill = categoryHex(app.category);
        const radius = Math.min(
          22,
          4 + Math.sqrt(Math.max(country.populationM, 1)) * 0.55,
        );
        const fontSize = Math.max(7.5, radius * 0.55);

        const showPulse =
          !reducedMotion &&
          app.flagshipForCategory === true &&
          (categoryFilter === null || app.category === categoryFilter);

        return (
          <Marker
            key={`${country.countryIso}-${app.id}`}
            coordinates={country.centroid}
          >
            <motion.g
              layout
              initial={
                reducedMotion ? false : { opacity: 0, scale: 0.4 }
              }
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.4 }}
              transition={{
                duration: 0.45,
                ease: [0.2, 0.7, 0.3, 1],
              }}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                setSelectedIso(country.countryIso);
              }}
              onMouseEnter={() => setHoveredIso(country.countryIso)}
              onMouseLeave={() => setHoveredIso(null)}
              role="button"
              aria-label={`${country.countryName}: top app ${app.name}`}
              tabIndex={0}
              style={{ cursor: "pointer" }}
            >
              {/* Soft pulsing aura for the global #1 in each category */}
              {showPulse ? (
                <motion.circle
                  r={radius}
                  fill={fill}
                  fillOpacity={0.35}
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 2.1, opacity: 0 }}
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
              ) : null}

              {/* Outer glow */}
              <circle
                r={radius + 1.5}
                fill={fill}
                fillOpacity={0.18}
              />
              {/* Bubble */}
              <circle
                r={radius}
                fill={fill}
                stroke={isSelected ? "#E5E5EC" : "rgba(255,255,255,0.4)"}
                strokeWidth={isSelected ? 1.4 : 0.7}
                style={{
                  transition:
                    "stroke 180ms cubic-bezier(0.2,0.7,0.3,1), stroke-width 180ms cubic-bezier(0.2,0.7,0.3,1)",
                }}
              />
              {/* Monogram glyph (Geist Mono, ink-dark on the chroma) */}
              <text
                textAnchor="middle"
                y={fontSize * 0.35}
                fontSize={fontSize}
                fontFamily="var(--font-geist-mono), ui-monospace"
                fontWeight={700}
                fill="#0A0A0F"
                style={{ pointerEvents: "none", userSelect: "none" }}
              >
                {app.mark}
              </text>
            </motion.g>
          </Marker>
        );
      })}
    </AnimatePresence>
  );
}
