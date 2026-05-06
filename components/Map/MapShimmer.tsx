"use client";

/**
 * Loading silhouette while the topojson resolves. No spinner — a stylized
 * world silhouette with a moving highlight gradient (`shimmer` keyframe in
 * globals.css). Sits centered on the globe area.
 */
export function MapShimmer() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      role="status"
      aria-label="Loading world map"
    >
      <div className="relative h-[640px] w-[640px] max-h-[80vh] max-w-[80vmin]">
        {/* Sphere placeholder */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 38% 34%, #1A1B23, #0E0E15 55%, #04040A 100%)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        />
        {/* Shimmer band */}
        <div
          className="absolute inset-0 rounded-full overflow-hidden"
          style={{
            maskImage:
              "radial-gradient(circle at center, black 60%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(circle at center, black 60%, transparent 70%)",
          }}
        >
          <div className="shimmer h-full w-full" />
        </div>
      </div>
      <div className="absolute bottom-12 font-mono text-2xs uppercase tracking-widest text-bone-muted">
        Loading atlas
      </div>
    </div>
  );
}
