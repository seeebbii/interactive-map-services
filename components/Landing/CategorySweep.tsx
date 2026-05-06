"use client";

import { motion } from "framer-motion";
import type { CategoryMeta } from "@/types";

interface Props {
  categoryCounts: Array<CategoryMeta & { count: number }>;
}

const EASE: [number, number, number, number] = [0.2, 0.7, 0.3, 1];

/**
 * Bottom-of-fold horizontal scan — each category as a swatch with its
 * country count. Subtly hints at the dataset's breadth.
 */
export function CategorySweep({ categoryCounts }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
      className="relative z-10 border-y border-white/[0.04] bg-ink-panel/60 backdrop-blur-md"
    >
      <div className="mx-auto max-w-7xl overflow-x-auto px-6 sm:px-10">
        <div className="flex min-w-max items-stretch gap-0 py-4">
          {categoryCounts.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.65 + i * 0.04,
                ease: EASE,
              }}
              className="group relative flex min-w-[140px] flex-1 items-center gap-3 border-r border-white/[0.05] px-5 py-2 last:border-r-0"
            >
              <span
                className="h-1.5 w-1.5 flex-shrink-0 rounded-full transition-all"
                style={{
                  background: c.hex,
                  boxShadow: `0 0 8px ${c.hex}A0`,
                }}
              />
              <div className="min-w-0">
                <div className="font-mono text-2xs uppercase tracking-widest text-bone-muted">
                  {c.label}
                </div>
                <div className="num mt-0.5 text-sm font-medium tabular-nums text-bone">
                  {c.count}
                  <span className="ml-1 font-mono text-2xs text-bone-dim">
                    countries
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
