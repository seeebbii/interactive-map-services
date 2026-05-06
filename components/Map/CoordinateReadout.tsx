"use client";

import { useMapStore } from "@/lib/store/useMapStore";

/**
 * Lon/Lat instrument readout — top-left of the globe area.
 * Tracks the current orthographic rotation. Mono, padded, monitor-grade.
 */
export function CoordinateReadout() {
  const rotate = useMapStore((s) => s.rotate);
  const lon = Math.round(-rotate[0]);
  const lat = Math.round(-rotate[1]);

  // Wrap longitude into -180..180 for display
  const lonNorm = ((lon + 180) % 360 + 360) % 360 - 180;

  const fmt = (n: number) => {
    const sign = n >= 0 ? "+" : "−";
    const abs = Math.abs(n).toString().padStart(3, "0");
    return `${sign}${abs}°`;
  };

  return (
    <div
      className="pointer-events-none absolute left-6 top-[7rem] z-20 font-mono text-2xs uppercase tracking-widest text-bone-muted"
      aria-label="Globe coordinates"
    >
      <div className="flex items-baseline gap-2">
        <span className="text-bone-dim">LON</span>
        <span className="num text-bone tabular-nums">{fmt(lonNorm)}</span>
      </div>
      <div className="mt-0.5 flex items-baseline gap-2">
        <span className="text-bone-dim">LAT</span>
        <span className="num text-bone tabular-nums">{fmt(lat)}</span>
      </div>
    </div>
  );
}
