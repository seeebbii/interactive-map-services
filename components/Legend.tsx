"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, animate } from "framer-motion";
import { useMapStore } from "@/lib/store/useMapStore";
import { CATEGORIES } from "@/lib/data/categories";
import { COUNTRY_APP_MAP } from "@/lib/data/countryAppMap";
import { APP_BY_ID } from "@/lib/data/apps";

/**
 * Editorial legend — pinned bottom-left.
 *
 * - The big number ("countries visible") tweens when the category filter
 *   changes, using framer-motion's imperative `animate`.
 * - The category list highlights the active filter and dims the rest.
 */
export function Legend() {
  const categoryFilter = useMapStore((s) => s.categoryFilter);
  const setCategoryFilter = useMapStore((s) => s.setCategoryFilter);
  const reducedMotion = useMapStore((s) => s.reducedMotion);

  // Per-category country count (how many countries have ≥1 app in this cat)
  const counts = useMemo(() => {
    const m: Record<string, number> = {};
    CATEGORIES.forEach((c) => (m[c.id] = 0));
    COUNTRY_APP_MAP.forEach((country) => {
      const cats = new Set(
        country.apps
          .map((a) => APP_BY_ID[a.appId]?.category)
          .filter(Boolean) as string[],
      );
      cats.forEach((c) => {
        m[c] = (m[c] ?? 0) + 1;
      });
    });
    return m;
  }, []);

  const targetCount = useMemo(() => {
    if (categoryFilter === null) return COUNTRY_APP_MAP.length;
    return counts[categoryFilter] ?? 0;
  }, [categoryFilter, counts]);

  const [displayCount, setDisplayCount] = useState(targetCount);

  useEffect(() => {
    if (reducedMotion) {
      setDisplayCount(targetCount);
      return;
    }
    const controls = animate(displayCount, targetCount, {
      duration: 0.6,
      ease: [0.2, 0.7, 0.3, 1],
      onUpdate: (v) => setDisplayCount(Math.round(v)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetCount, reducedMotion]);

  return (
    <motion.aside
      initial={reducedMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: reducedMotion ? 0 : 0.45,
        ease: [0.2, 0.7, 0.3, 1],
      }}
      className="absolute bottom-5 left-5 z-30 w-[280px] rounded-xl border border-white/[0.05] bg-ink-panel/85 p-4 backdrop-blur-xl"
      aria-label="Map legend"
    >
      {/* Big tweening count */}
      <div className="flex items-baseline gap-2">
        <span className="num display-hero text-3xl text-bone">
          {displayCount}
        </span>
        <span className="font-mono text-2xs uppercase tracking-widest text-bone-muted">
          {categoryFilter ? "countries with this" : "countries with data"}
        </span>
      </div>

      {/* Filter context line */}
      <div className="mt-1 font-mono text-2xs uppercase tracking-widest text-bone-dim">
        {categoryFilter
          ? `Filter: ${categoryFilter}`
          : "All categories visible"}
      </div>

      <div className="mt-3 h-px w-full bg-white/[0.06]" />

      {/* Category grid */}
      <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5">
        {CATEGORIES.map((c) => {
          const active = categoryFilter === c.id;
          const dim = categoryFilter !== null && !active;
          return (
            <button
              key={c.id}
              onClick={() =>
                setCategoryFilter(active ? null : c.id)
              }
              className="group flex items-center gap-2 text-left"
              aria-pressed={active}
            >
              <span
                className="h-1.5 w-1.5 flex-shrink-0 rounded-full transition-all"
                style={{
                  background: c.hex,
                  opacity: dim ? 0.3 : 1,
                  boxShadow: active ? `0 0 8px ${c.hex}A0` : undefined,
                }}
              />
              <span
                className={`text-xs tracking-tight transition-colors ${
                  active
                    ? "text-bone"
                    : dim
                      ? "text-bone-dim"
                      : "text-bone-muted group-hover:text-bone"
                }`}
              >
                {c.short}
              </span>
              <span className="num ml-auto font-mono text-2xs text-bone-dim">
                {counts[c.id] ?? 0}
              </span>
            </button>
          );
        })}
      </div>
    </motion.aside>
  );
}
