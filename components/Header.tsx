"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useMapStore } from "@/lib/store/useMapStore";

interface HeaderProps {
  stats: {
    countries: number;
    apps: number;
    categories: number;
  };
}

const STAT_TRANSITION = {
  duration: 0.6,
  ease: [0.2, 0.7, 0.3, 1] as [number, number, number, number],
};

export function Header({ stats }: HeaderProps) {
  const query = useMapStore((s) => s.query);
  const setQuery = useMapStore((s) => s.setQuery);
  const reducedMotion = useMapStore((s) => s.reducedMotion);

  return (
    <motion.header
      initial={reducedMotion ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={STAT_TRANSITION}
      className="absolute inset-x-0 top-0 z-30 flex h-14 items-center justify-between gap-6 border-b border-white/[0.04] bg-ink/80 px-6 backdrop-blur-xl"
    >
      {/* Title block */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <div
            className="h-2 w-2 rounded-full bg-signal"
            style={{ boxShadow: "0 0 14px #00E5FF, 0 0 4px #00E5FF" }}
          />
          {!reducedMotion && (
            <motion.div
              className="absolute inset-0 rounded-full bg-signal"
              animate={{ scale: [1, 2.4, 2.4], opacity: [0.5, 0, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            />
          )}
        </div>
        <div className="flex items-baseline gap-3">
          <h1 className="font-medium tracking-tight text-bone">
            World App Atlas
          </h1>
          <span className="hidden font-mono text-2xs uppercase tracking-widest text-bone-dim sm:inline">
            v1 · 2026
          </span>
        </div>
      </div>

      {/* Search */}
      <div className="relative hidden max-w-md flex-1 md:block">
        <Search
          aria-hidden="true"
          className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-bone-dim"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search countries or apps…"
          aria-label="Search countries or apps"
          className="h-9 w-full rounded-md border border-white/[0.06] bg-white/[0.03] pl-9 pr-3 text-sm text-bone placeholder:text-bone-dim focus:border-signal/40 focus:bg-white/[0.05] focus:outline-none"
        />
      </div>

      {/* Stats */}
      <div className="flex items-center gap-5 font-mono text-2xs uppercase tracking-widest">
        <Stat label="Countries" value={stats.countries} />
        <span className="text-bone-dim">·</span>
        <Stat label="Apps" value={stats.apps} />
        <span className="text-bone-dim">·</span>
        <Stat label="Cats" value={stats.categories} />
      </div>
    </motion.header>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="num text-sm font-medium normal-case tracking-tight text-bone">
        {value}
      </span>
      <span className="text-bone-dim">{label}</span>
    </div>
  );
}
