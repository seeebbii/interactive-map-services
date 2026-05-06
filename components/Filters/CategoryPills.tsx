"use client";

import { motion } from "framer-motion";
import { useMapStore } from "@/lib/store/useMapStore";
import { CATEGORIES } from "@/lib/data/categories";
import type { CategoryFilter } from "@/types";

const ENTRANCE = {
  duration: 0.6,
  ease: [0.2, 0.7, 0.3, 1] as [number, number, number, number],
};

export function CategoryPills() {
  const categoryFilter = useMapStore((s) => s.categoryFilter);
  const setCategoryFilter = useMapStore((s) => s.setCategoryFilter);
  const reducedMotion = useMapStore((s) => s.reducedMotion);

  const onPick = (id: CategoryFilter) => {
    setCategoryFilter(categoryFilter === id ? null : id);
  };

  const items: Array<{ id: CategoryFilter; label: string; hex: string | null }> = [
    { id: null, label: "All", hex: null },
    ...CATEGORIES.map((c) => ({ id: c.id as CategoryFilter, label: c.short, hex: c.hex })),
  ];

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...ENTRANCE, delay: reducedMotion ? 0 : 0.12 }}
      className="absolute left-1/2 top-[3.75rem] z-30 -translate-x-1/2 px-3"
      role="toolbar"
      aria-label="Category filter"
    >
      <div className="flex items-center gap-1.5 rounded-full border border-white/[0.05] bg-ink-panel/80 p-1 backdrop-blur-xl">
        {items.map((item) => {
          const active = categoryFilter === item.id;
          return (
            <button
              key={item.id ?? "all"}
              onClick={() => onPick(item.id)}
              aria-pressed={active}
              aria-label={`Filter: ${item.label}`}
              className="relative flex h-7 items-center gap-1.5 rounded-full px-3 text-xs font-medium tracking-tight text-bone-muted transition-colors hover:text-bone"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              {active && (
                <motion.span
                  layoutId="pill-active"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: item.hex
                      ? `${item.hex}25`
                      : "rgba(0, 229, 255, 0.16)",
                    border: `1px solid ${item.hex ?? "#00E5FF"}55`,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 38,
                    mass: 0.6,
                  }}
                />
              )}
              {item.hex ? (
                <span
                  className="relative h-1.5 w-1.5 flex-shrink-0 rounded-full"
                  style={{
                    background: item.hex,
                    boxShadow: active ? `0 0 8px ${item.hex}80` : undefined,
                  }}
                />
              ) : (
                <span
                  className="relative font-mono text-2xs uppercase tracking-widest"
                  aria-hidden="true"
                >
                  ◇
                </span>
              )}
              <span
                className={`relative ${active ? "text-bone" : ""}`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
