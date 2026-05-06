"use client";

import { useEffect } from "react";
import { useMapStore } from "@/lib/store/useMapStore";

/**
 * Tiny client-only component that hydrates `prefers-reduced-motion` into the
 * Zustand store on mount and listens for changes. Sits at the page root so
 * every component reads from a single source of truth.
 */
export function ReducedMotionBridge() {
  const setReducedMotion = useMapStore((s) => s.setReducedMotion);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [setReducedMotion]);

  return null;
}
