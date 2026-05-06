"use client";

import { create } from "zustand";
import type { CategoryFilter } from "@/types";

/**
 * Global UI state for the map view.
 *
 * - `selectedIso`: the country whose inspector is open (null = closed)
 * - `hoveredIso`: tooltip target (null = no tooltip)
 * - `categoryFilter`: which category lens is active (null = show all)
 * - `query`: search input from the header
 * - `reducedMotion`: hydrated from `prefers-reduced-motion` so animations
 *    can branch in a single store-driven place rather than per component
 */
export interface MapStore {
  selectedIso: string | null;
  hoveredIso: string | null;
  categoryFilter: CategoryFilter;
  query: string;
  reducedMotion: boolean;

  setSelectedIso: (iso: string | null) => void;
  setHoveredIso: (iso: string | null) => void;
  setCategoryFilter: (cat: CategoryFilter) => void;
  setQuery: (q: string) => void;
  setReducedMotion: (rm: boolean) => void;
}

export const useMapStore = create<MapStore>((set) => ({
  selectedIso: null,
  hoveredIso: null,
  categoryFilter: null,
  query: "",
  reducedMotion: false,

  setSelectedIso: (iso) => set({ selectedIso: iso }),
  setHoveredIso: (iso) => set({ hoveredIso: iso }),
  setCategoryFilter: (cat) => set({ categoryFilter: cat }),
  setQuery: (q) => set({ query: q }),
  setReducedMotion: (rm) => set({ reducedMotion: rm }),
}));
