"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMapStore } from "@/lib/store/useMapStore";
import { COUNTRY_BY_ISO } from "@/lib/data/countryAppMap";
import { APP_BY_ID } from "@/lib/data/apps";
import { categoryHex, CATEGORY_BY_ID } from "@/lib/data/categories";

/**
 * Floating tooltip that follows the cursor while hovering a country.
 *
 * Mounted at the page level (rendered by WorldMap) so it can escape the
 * map's clipping/SVG context and overlay the inspector if needed.
 */
export function MapTooltip() {
  const hoveredIso = useMapStore((s) => s.hoveredIso);
  const reducedMotion = useMapStore((s) => s.reducedMotion);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!hoveredIso) return;
    const handler = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [hoveredIso]);

  const entry = hoveredIso ? COUNTRY_BY_ISO[hoveredIso] : null;
  const topRanked = entry?.apps.find((a) => a.rank === 1);
  const topApp = topRanked ? APP_BY_ID[topRanked.appId] : null;
  const visible = Boolean(entry && pos);

  // Keep the last cursor position around so the exit animation lands cleanly.
  const x = pos?.x ?? 0;
  const y = pos?.y ?? 0;

  return (
    <AnimatePresence>
      {visible && entry ? (
        <motion.div
          key={entry.countryIso}
          initial={
            reducedMotion ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.96 }
          }
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={
            reducedMotion ? { opacity: 0 } : { opacity: 0, y: 4, scale: 0.97 }
          }
          transition={
            reducedMotion
              ? { duration: 0.05 }
              : { type: "spring", stiffness: 460, damping: 30, mass: 0.6 }
          }
          className="pointer-events-none fixed z-50"
          style={{
            left: Math.min(x + 18, (typeof window !== "undefined" ? window.innerWidth : 1600) - 240),
            top: Math.min(y + 18, (typeof window !== "undefined" ? window.innerHeight : 800) - 140),
          }}
        >
          <div className="rounded-lg border border-white/10 bg-ink-card/85 px-3.5 py-3 shadow-2xl backdrop-blur-xl">
            <div className="font-mono text-2xs uppercase tracking-widest text-bone-muted">
              {entry.countryIso} · selected on hover
            </div>
            <div className="mt-0.5 text-base font-medium tracking-tight text-bone">
              {entry.countryName}
            </div>
            {topApp ? (
              <div className="mt-2.5 flex items-center gap-2.5 border-t border-white/5 pt-2.5">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{
                    background: categoryHex(topApp.category),
                    boxShadow: `0 0 8px ${categoryHex(topApp.category)}80`,
                  }}
                />
                <div className="font-mono text-2xs uppercase tracking-wider text-bone-muted">
                  #1
                </div>
                <div className="text-sm font-medium tracking-tight text-bone">
                  {topApp.name}
                </div>
                <div className="ml-auto font-mono text-2xs uppercase tracking-wider text-bone-dim">
                  {CATEGORY_BY_ID[topApp.category].short}
                </div>
              </div>
            ) : null}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
