"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  countries: number;
  apps: number;
  categories: number;
}

const EASE: [number, number, number, number] = [0.2, 0.7, 0.3, 1];

const variants = {
  hidden: { opacity: 0, y: 14 },
  shown: { opacity: 1, y: 0 },
};

export function LandingHero({ countries, apps, categories }: HeroProps) {
  return (
    <motion.div
      initial="hidden"
      animate="shown"
      transition={{ staggerChildren: 0.1, delayChildren: 0.1 }}
      className="relative z-10 max-w-2xl"
    >
      {/* Editorial label */}
      <motion.div
        variants={variants}
        transition={{ duration: 0.6, ease: EASE }}
        className="flex items-center gap-2 font-mono text-2xs uppercase tracking-widest text-signal"
      >
        <span
          className="h-1.5 w-1.5 rounded-full bg-signal"
          style={{ boxShadow: "0 0 10px #00E5FF, 0 0 4px #00E5FF" }}
        />
        Atlas · 2026 · live
      </motion.div>

      {/* Hero */}
      <motion.h1
        variants={variants}
        transition={{ duration: 0.7, ease: EASE }}
        className="mt-5 text-[clamp(56px,9vw,112px)] font-medium leading-[0.94] tracking-[-0.04em] text-bone"
      >
        World
        <br />
        <span className="text-bone">App Atlas.</span>
      </motion.h1>

      {/* Tagline */}
      <motion.p
        variants={variants}
        transition={{ duration: 0.6, ease: EASE }}
        className="mt-7 max-w-md text-lg leading-snug text-bone-muted"
      >
        The most-used delivery, ride-hailing, fintech, and super-apps
        in every country, layered on a draggable orthographic globe.
      </motion.p>

      {/* Stats row */}
      <motion.dl
        variants={variants}
        transition={{ duration: 0.6, ease: EASE }}
        className="mt-10 grid max-w-xl grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4"
      >
        <Stat label="Countries" value={countries} />
        <Stat label="Apps" value={apps} />
        <Stat label="Categories" value={categories} />
        <Stat label="Projection" value="Orthographic" mono />
      </motion.dl>

      {/* CTA */}
      <motion.div
        variants={variants}
        transition={{ duration: 0.6, ease: EASE }}
        className="mt-10 flex items-center gap-4"
      >
        <Link
          href="/atlas"
          className="group relative inline-flex items-center gap-3 rounded-md border border-signal/40 bg-signal/[0.04] px-5 py-3 text-sm font-medium tracking-tight text-bone transition-all hover:border-signal/70 hover:bg-signal/[0.08]"
          style={{ boxShadow: "0 0 24px rgba(0, 229, 255, 0.10) inset" }}
        >
          Open the atlas
          <ArrowRight className="h-4 w-4 text-signal transition-transform group-hover:translate-x-0.5" />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-md opacity-0 transition-opacity group-hover:opacity-100"
            style={{ boxShadow: "0 0 32px rgba(0, 229, 255, 0.22)" }}
          />
        </Link>
        <span className="font-mono text-2xs uppercase tracking-widest text-bone-dim">
          ⏎  drag · click · zoom
        </span>
      </motion.div>
    </motion.div>
  );
}

function Stat({
  label,
  value,
  mono,
}: {
  label: string;
  value: number | string;
  mono?: boolean;
}) {
  return (
    <div>
      <dt className="font-mono text-2xs uppercase tracking-widest text-bone-dim">
        {label}
      </dt>
      <dd
        className={`num mt-1 text-2xl font-medium tracking-tighter text-bone ${
          mono ? "text-base font-mono tracking-tight" : ""
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
