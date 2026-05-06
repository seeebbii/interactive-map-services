"use client";

import { motion } from "framer-motion";
import { useMapStore } from "@/lib/store/useMapStore";
import type { VizMode } from "@/lib/store/useMapStore";

const OPTIONS: Array<{ id: VizMode; label: string }> = [
  { id: "fills", label: "Fills" },
  { id: "labels", label: "Codes" },
  { id: "hybrid", label: "Hybrid" },
];

/**
 * Three-position viz mode toggle. Lives in the header area.
 * "Fills" = clean choropleth only (default).
 * "Codes" = mono ISO codes at country centroids on the visible hemisphere.
 * "Hybrid" = both.
 */
export function VizToggle() {
  const vizMode = useMapStore((s) => s.vizMode);
  const setVizMode = useMapStore((s) => s.setVizMode);

  return (
    <div
      className="relative flex items-center gap-0.5 rounded-md border border-white/[0.06] bg-white/[0.02] p-0.5"
      role="radiogroup"
      aria-label="Viz mode"
    >
      {OPTIONS.map((opt) => {
        const active = vizMode === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => setVizMode(opt.id)}
            role="radio"
            aria-checked={active}
            className="relative px-2.5 py-1 text-xs font-medium tracking-tight text-bone-muted transition-colors hover:text-bone"
          >
            {active ? (
              <motion.span
                layoutId="viz-active"
                className="absolute inset-0 rounded-[5px] bg-bone"
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 38,
                  mass: 0.6,
                }}
              />
            ) : null}
            <span
              className={`relative ${active ? "text-ink" : ""}`}
            >
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
