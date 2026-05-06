"use client";

import { motion, animate } from "framer-motion";
import { Plus, Minus, RotateCcw } from "lucide-react";
import { useMapStore } from "@/lib/store/useMapStore";

const STEP_FACTOR = 1.4;
const MIN_SCALE = 220;
const MAX_SCALE = 1600;
const BASE_SCALE = 320;

function clamp(n: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, n));
}

/**
 * Stacked zoom controls — pinned right-center. Animated transitions match
 * the editorial easing used elsewhere on the globe. Reset button bounces
 * the camera back to the overview state.
 */
export function ZoomControls() {
  const setGlobeScale = useMapStore((s) => s.setGlobeScale);
  const setSelectedIso = useMapStore((s) => s.setSelectedIso);
  const reducedMotion = useMapStore((s) => s.reducedMotion);

  const animateScale = (target: number) => {
    const start = useMapStore.getState().globeScale;
    if (reducedMotion) {
      setGlobeScale(target);
      return;
    }
    animate(start, target, {
      duration: 0.35,
      ease: [0.2, 0.7, 0.3, 1],
      onUpdate: (v) => setGlobeScale(v),
    });
  };

  const onZoomIn = () => {
    const next = clamp(
      useMapStore.getState().globeScale * STEP_FACTOR,
      MIN_SCALE,
      MAX_SCALE,
    );
    animateScale(next);
  };

  const onZoomOut = () => {
    const next = clamp(
      useMapStore.getState().globeScale / STEP_FACTOR,
      MIN_SCALE,
      MAX_SCALE,
    );
    animateScale(next);
  };

  const onReset = () => {
    setSelectedIso(null);
    animateScale(BASE_SCALE);
  };

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.5,
        delay: reducedMotion ? 0 : 0.4,
        ease: [0.2, 0.7, 0.3, 1],
      }}
      className="absolute right-6 top-1/2 z-20 flex -translate-y-1/2 flex-col rounded-md border border-white/[0.06] bg-ink-panel/85 p-0.5 backdrop-blur-xl"
      role="group"
      aria-label="Zoom controls"
    >
      <ZoomBtn label="Zoom in" onClick={onZoomIn} icon={<Plus className="h-3.5 w-3.5" />} />
      <div className="mx-1 h-px bg-white/[0.05]" />
      <ZoomBtn label="Zoom out" onClick={onZoomOut} icon={<Minus className="h-3.5 w-3.5" />} />
      <div className="mx-1 h-px bg-white/[0.05]" />
      <ZoomBtn label="Reset view" onClick={onReset} icon={<RotateCcw className="h-3 w-3" />} />
    </motion.div>
  );
}

function ZoomBtn({
  label,
  onClick,
  icon,
}: {
  label: string;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className="flex h-8 w-8 items-center justify-center rounded text-bone-muted transition-colors hover:bg-white/[0.04] hover:text-bone"
    >
      {icon}
    </button>
  );
}
