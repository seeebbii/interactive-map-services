"use client";

import { useMemo } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronRight } from "lucide-react";
import { useMapStore } from "@/lib/store/useMapStore";
import { COUNTRY_BY_ISO } from "@/lib/data/countryAppMap";
import { APP_BY_ID } from "@/lib/data/apps";
import { CATEGORY_BY_ID, categoryHex } from "@/lib/data/categories";
import type { App, CountryAppRanking } from "@/types";

const PANEL_TRANSITION = {
  type: "spring" as const,
  stiffness: 360,
  damping: 36,
  mass: 0.8,
};

interface ResolvedRow {
  ranking: CountryAppRanking;
  app: App;
}

export function CountryInspector() {
  const selectedIso = useMapStore((s) => s.selectedIso);
  const setSelectedIso = useMapStore((s) => s.setSelectedIso);
  const reducedMotion = useMapStore((s) => s.reducedMotion);

  const entry = selectedIso ? COUNTRY_BY_ISO[selectedIso] : null;

  const rows = useMemo<ResolvedRow[]>(() => {
    if (!entry) return [];
    return entry.apps
      .slice()
      .sort((a, b) => a.rank - b.rank)
      .flatMap((ranking) => {
        const app = APP_BY_ID[ranking.appId];
        return app ? [{ ranking, app }] : [];
      });
  }, [entry]);

  // Pre-compute category breakdown across the country's app stack
  const categoryTally = useMemo(() => {
    if (!entry) return [];
    const map = new Map<string, number>();
    rows.forEach(({ app }) => {
      map.set(app.category, (map.get(app.category) ?? 0) + 1);
    });
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [rows, entry]);

  return (
    <AnimatePresence>
      {entry ? (
        <motion.aside
          key={entry.countryIso}
          initial={
            reducedMotion ? { opacity: 0 } : { x: "100%", opacity: 0 }
          }
          animate={{ x: 0, opacity: 1 }}
          exit={
            reducedMotion ? { opacity: 0 } : { x: "100%", opacity: 0 }
          }
          transition={reducedMotion ? { duration: 0.1 } : PANEL_TRANSITION}
          className="absolute right-0 top-0 z-40 flex h-full w-full max-w-[440px] flex-col border-l border-white/[0.05] bg-ink-panel/95 backdrop-blur-2xl"
          aria-label={`${entry.countryName} app inspector`}
          role="dialog"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3 border-b border-white/[0.04] px-6 pb-5 pt-16">
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-2xs uppercase tracking-widest text-signal">
                  Inspector
                </span>
                <span className="font-mono text-2xs uppercase tracking-widest text-bone-dim">
                  · {entry.countryIso}
                </span>
              </div>
              <h2 className="mt-1 truncate text-3xl font-medium tracking-tighter text-bone">
                {entry.countryName}
              </h2>
              <div className="mt-2 flex items-center gap-4 font-mono text-2xs uppercase tracking-widest text-bone-muted">
                <span>
                  <span className="num text-bone">
                    {entry.populationM.toLocaleString()}M
                  </span>{" "}
                  people
                </span>
                <span>·</span>
                <span>
                  <span className="num text-bone">{rows.length}</span> apps
                </span>
              </div>
            </div>
            <button
              onClick={() => setSelectedIso(null)}
              aria-label="Close inspector"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-white/[0.06] bg-white/[0.03] text-bone-muted transition-colors hover:border-white/[0.14] hover:text-bone"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Body — scrollable */}
          <div className="flex-1 overflow-y-auto px-6 py-5">
            {/* Category tally */}
            {categoryTally.length > 0 ? (
              <div className="mb-6">
                <div className="mb-2 font-mono text-2xs uppercase tracking-widest text-bone-dim">
                  Categories represented
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {categoryTally.map(([catId, count]) => {
                    const meta = CATEGORY_BY_ID[catId as keyof typeof CATEGORY_BY_ID];
                    if (!meta) return null;
                    return (
                      <div
                        key={catId}
                        className="flex items-center gap-1.5 rounded-md border border-white/[0.05] bg-white/[0.02] px-2 py-1"
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: meta.hex }}
                        />
                        <span className="text-2xs tracking-tight text-bone-muted">
                          {meta.short}
                        </span>
                        <span className="num font-mono text-2xs text-bone-dim">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}

            <div className="mb-3 flex items-baseline justify-between">
              <div className="font-mono text-2xs uppercase tracking-widest text-bone-dim">
                Top apps · ranked
              </div>
              <div className="font-mono text-2xs uppercase tracking-widest text-bone-dim">
                est.
              </div>
            </div>

            <ol className="space-y-1.5">
              {rows.map(({ ranking, app }, idx) => (
                <AppRow
                  key={app.id}
                  app={app}
                  ranking={ranking}
                  index={idx}
                  reducedMotion={reducedMotion}
                />
              ))}
            </ol>

            {/* Footnote */}
            <p className="mt-6 border-t border-white/[0.04] pt-4 font-mono text-2xs uppercase leading-relaxed tracking-widest text-bone-dim">
              Ranks are ordinal estimates from public reporting. Market-share
              values shown with “~” are approximate.
            </p>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}

function AppRow({
  app,
  ranking,
  index,
  reducedMotion,
}: {
  app: App;
  ranking: CountryAppRanking;
  index: number;
  reducedMotion: boolean;
}) {
  const meta = CATEGORY_BY_ID[app.category];
  const fill = categoryHex(app.category);
  const isTop = ranking.rank === 1;

  return (
    <motion.li
      initial={
        reducedMotion ? false : { opacity: 0, x: 16 }
      }
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: reducedMotion ? 0 : 0.08 + index * 0.04,
        duration: 0.45,
        ease: [0.2, 0.7, 0.3, 1],
      }}
      className="group relative"
    >
      <div
        className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 transition-colors ${
          isTop
            ? "border-white/[0.08] bg-white/[0.04]"
            : "border-transparent bg-white/[0.015] hover:border-white/[0.05] hover:bg-white/[0.03]"
        }`}
      >
        {/* Rank */}
        <div
          className={`num flex h-9 w-7 flex-shrink-0 items-center justify-center font-mono text-base ${
            isTop ? "text-bone" : "text-bone-dim"
          }`}
        >
          {ranking.rank}
        </div>

        {/* Logo */}
        <div
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-md border border-white/[0.05]"
          style={{ background: `${fill}14` }}
        >
          <Image
            src={app.logo}
            alt={`${app.name} logo`}
            width={32}
            height={32}
            loading="lazy"
            className="h-8 w-8"
          />
        </div>

        {/* Name + category */}
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <span className="truncate text-sm font-medium tracking-tight text-bone">
              {app.name}
            </span>
            {isTop ? (
              <span className="font-mono text-2xs uppercase tracking-widest text-signal">
                #1
              </span>
            ) : null}
          </div>
          <div className="mt-0.5 flex items-center gap-1.5">
            <span
              className="h-1 w-1 flex-shrink-0 rounded-full"
              style={{ background: fill }}
            />
            <span className="font-mono text-2xs uppercase tracking-widest text-bone-muted">
              {meta.short}
            </span>
            {app.flagshipForCategory ? (
              <span className="ml-1 rounded-sm bg-signal/15 px-1 font-mono text-2xs uppercase tracking-widest text-signal">
                Global #1
              </span>
            ) : null}
          </div>
        </div>

        {/* Share */}
        <div className="flex flex-shrink-0 flex-col items-end gap-0.5">
          {ranking.marketShare !== undefined ? (
            <span className="num font-mono text-sm text-bone">
              ~{ranking.marketShare}%
            </span>
          ) : (
            <span className="font-mono text-2xs uppercase tracking-widest text-bone-dim">
              —
            </span>
          )}
          <ChevronRight
            className="h-3.5 w-3.5 text-bone-dim transition-transform group-hover:translate-x-0.5 group-hover:text-bone-muted"
            aria-hidden="true"
          />
        </div>
      </div>
    </motion.li>
  );
}
