"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMapStore } from "@/lib/store/useMapStore";

/**
 * Bottom-right hint that fades out once the user has interacted with the
 * globe (drag, click, or rotation change beyond a threshold).
 */
export function DragHint() {
  const rotate = useMapStore((s) => s.rotate);
  const selectedIso = useMapStore((s) => s.selectedIso);
  const reducedMotion = useMapStore((s) => s.reducedMotion);
  const [interacted, setInteracted] = useState(false);

  // Snapshot the initial rotation; if the user has moved past a threshold
  // or has selected a country, the hint dismisses.
  useEffect(() => {
    if (interacted) return;
    if (selectedIso) {
      setInteracted(true);
      return;
    }
    const initialLon = -15;
    const initialLat = -10;
    if (
      Math.abs(rotate[0] - initialLon) > 8 ||
      Math.abs(rotate[1] - initialLat) > 8
    ) {
      setInteracted(true);
    }
  }, [rotate, selectedIso, interacted]);

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: interacted ? 0 : 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.2, 0.7, 0.3, 1] }}
      className="pointer-events-none absolute bottom-6 right-6 z-20 font-mono text-2xs uppercase tracking-widest text-bone-dim"
    >
      <span className="mr-1.5 text-bone-muted">↻</span>
      drag to rotate · click country to inspect
    </motion.div>
  );
}
