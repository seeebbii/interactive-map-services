"use client";

import { useEffect, useMemo, useState } from "react";
import { animate, motion } from "framer-motion";
import { useMapStore } from "@/lib/store/useMapStore";
import { CATEGORY_BY_ID } from "@/lib/data/categories";
import { COUNTRY_APP_MAP } from "@/lib/data/countryAppMap";
import { APP_BY_ID } from "@/lib/data/apps";
import type { Category } from "@/types";

/**
 * Stats card — top-right. Shows reach for the active category (or "all"),
 * with a tweening number and a thin progress rail. Editorial, instrument-y.
 */
export function StatsCard() {
  const categoryFilter = useMapStore((s) => s.categoryFilter);
  const reducedMotion = useMapStore((s) => s.reducedMotion);

  const total = COUNTRY_APP_MAP.length;
  const reach = useMemo(() => {
    if (!categoryFilter) return total;
    return COUNTRY_APP_MAP.filter((c) =>
      c.apps.some((a) => APP_BY_ID[a.appId]?.category === categoryFilter),
    ).length;
  }, [categoryFilter, total]);

  const [display, setDisplay] = useState(reach);
  useEffect(() => {
    if (reducedMotion) {
      setDisplay(reach);
      return;
    }
    const ctl = animate(display, reach, {
      duration: 0.6,
      ease: [0.2, 0.7, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => ctl.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reach, reducedMotion]);

  const meta = categoryFilter
    ? CATEGORY_BY_ID[categoryFilter as Category]
    : null;
  const accent = meta?.hex ?? "#00E5FF";
  const pct = Math.max(0, Math.min(1, reach / total));

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: reducedMotion ? 0 : 0.3,
        ease: [0.2, 0.7, 0.3, 1],
      }}
      className="absolute right-6 top-[7rem] z-20 w-[240px] rounded-xl border border-white/[0.05] bg-ink-panel/85 p-4 backdrop-blur-xl"
    >
      <div className="flex items-center gap-2 font-mono text-2xs uppercase tracking-widest text-bone-muted">
        {meta ? (
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: accent, boxShadow: `0 0 6px ${accent}A0` }}
          />
        ) : (
          <span
            className="h-1.5 w-1.5 rounded-full bg-signal"
            style={{ boxShadow: "0 0 6px #00E5FFA0" }}
          />
        )}
        {meta ? meta.label : "All categories"}
      </div>

      <div className="mt-2 flex items-baseline gap-2">
        <span className="num display-hero text-3xl tabular-nums text-bone">
          {display}
        </span>
        <span className="text-xs text-bone-muted">
          of {total} countries
        </span>
      </div>

      {/* Progress rail */}
      <div className="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          className="h-full"
          initial={false}
          animate={{ width: `${pct * 100}%` }}
          transition={{
            duration: reducedMotion ? 0 : 0.6,
            ease: [0.2, 0.7, 0.3, 1],
          }}
          style={{
            background: accent,
            boxShadow: `0 0 8px ${accent}80`,
          }}
        />
      </div>
    </motion.div>
  );
}
