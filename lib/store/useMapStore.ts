"use client";

import { create } from "zustand";
import type { CategoryFilter } from "@/types";

/**
 * VizMode controls overlay rendering on the globe:
 *  - "fills": choropleth only (default; clean, editorial)
 *  - "labels": choropleth + tiny ISO code labels at country centroids
 *  - "hybrid": choropleth + labels + selected country emphasis
 *
 * Per user feedback the always-on circle bubbles are gone; labels are an
 * opt-in overlay that show country codes (instead of crowded glyph bubbles).
 */
export type VizMode = "fills" | "labels" | "hybrid";

/**
 * Global UI state for the map view.
 *
 * - `selectedIso` / `hoveredIso`: ISO alpha-3 of the country in focus
 * - `categoryFilter`: which category lens is active (null = show all)
 * - `query`: search input from the header
 * - `vizMode`: overlay rendering mode (see VizMode)
 * - `rotate`: orthographic globe rotation [lambda, phi, gamma] in degrees
 * - `reducedMotion`: hydrated from `prefers-reduced-motion`
 */
export interface MapStore {
  selectedIso: string | null;
  hoveredIso: string | null;
  categoryFilter: CategoryFilter;
  query: string;
  vizMode: VizMode;
  rotate: [number, number, number];
  /** d3-geo projection scale — radius of the rendered sphere in viewport px. */
  globeScale: number;
  reducedMotion: boolean;

  setSelectedIso: (iso: string | null) => void;
  setHoveredIso: (iso: string | null) => void;
  setCategoryFilter: (cat: CategoryFilter) => void;
  setQuery: (q: string) => void;
  setVizMode: (mode: VizMode) => void;
  setRotate: (rotate: [number, number, number]) => void;
  setGlobeScale: (s: number) => void;
  setReducedMotion: (rm: boolean) => void;
}

export const useMapStore = create<MapStore>((set) => ({
  selectedIso: null,
  hoveredIso: null,
  categoryFilter: null,
  query: "",
  vizMode: "fills",
  rotate: [-15, -10, 0],
  globeScale: 320,
  reducedMotion: false,

  setSelectedIso: (iso) => set({ selectedIso: iso }),
  setHoveredIso: (iso) => set({ hoveredIso: iso }),
  setCategoryFilter: (cat) => set({ categoryFilter: cat }),
  setQuery: (q) => set({ query: q }),
  setVizMode: (mode) => set({ vizMode: mode }),
  setRotate: (rotate) => set({ rotate }),
  setGlobeScale: (s) => set({ globeScale: s }),
  setReducedMotion: (rm) => set({ reducedMotion: rm }),
}));
