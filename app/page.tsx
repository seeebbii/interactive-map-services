import { Header } from "@/components/Header";
import { CategoryPills } from "@/components/Filters/CategoryPills";
import { Legend } from "@/components/Legend";
import { WorldMap } from "@/components/Map/WorldMap";
import { CountryInspector } from "@/components/Sidebar/CountryInspector";
import { ReducedMotionBridge } from "@/components/ReducedMotionBridge";
import { COUNTRY_APP_MAP } from "@/lib/data/countryAppMap";
import { APPS } from "@/lib/data/apps";
import { CATEGORIES } from "@/lib/data/categories";

export default function HomePage() {
  const stats = {
    countries: COUNTRY_APP_MAP.length,
    apps: APPS.length,
    categories: CATEGORIES.length,
  };

  return (
    <main className="relative h-dvh w-screen overflow-hidden bg-ink text-bone">
      <ReducedMotionBridge />

      {/* Top chrome */}
      <Header stats={stats} />

      {/* Filter bar */}
      <CategoryPills />

      {/* Map + sidebar layer */}
      <section
        className="absolute inset-0 z-0"
        aria-label="World map"
      >
        <WorldMap />
      </section>

      {/* Sidebar overlays the map */}
      <CountryInspector />

      {/* Legend pinned bottom-left */}
      <Legend />

      {/* Editorial atmospheric vignette so the map fades into the chrome */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(10,10,15,0.65) 100%)",
        }}
      />
    </main>
  );
}
