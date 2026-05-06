"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const EASE: [number, number, number, number] = [0.2, 0.7, 0.3, 1];

export function LandingTopHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="relative z-30 flex h-14 items-center justify-between gap-6 border-b border-white/[0.04] bg-ink/70 px-6 backdrop-blur-xl sm:px-10"
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <div
            className="h-2.5 w-2.5 rounded-full bg-signal"
            style={{
              boxShadow:
                "inset -2px -2px 0 #00B7CC, 0 0 14px #00E5FF, 0 0 4px #00E5FF",
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-signal"
            animate={{ scale: [1, 2.4, 2.4], opacity: [0.5, 0, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
          />
        </div>
        <div className="flex items-baseline gap-3">
          <span className="text-base font-medium tracking-tight text-bone">
            World App Atlas
          </span>
          <span className="hidden font-mono text-2xs uppercase tracking-widest text-bone-dim sm:inline">
            v 0.2 · 2026
          </span>
        </div>
      </div>

      <Link
        href="/atlas"
        className="group flex items-center gap-1.5 rounded-md border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 font-mono text-2xs uppercase tracking-widest text-bone-muted transition-colors hover:border-signal/40 hover:text-bone"
      >
        Open atlas
        <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </motion.header>
  );
}
