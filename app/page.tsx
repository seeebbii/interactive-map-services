import { Header } from "@/components/Header";
import { CategoryPills } from "@/components/Filters/CategoryPills";
import { Legend } from "@/components/Legend";
import { WorldMap } from "@/components/Map/WorldMap";
import { CountryInspector } from "@/components/Sidebar/CountryInspector";
import { CoordinateReadout } from "@/components/Map/CoordinateReadout";
import { StatsCard } from "@/components/Map/StatsCard";
import { DragHint } from "@/components/Map/DragHint";
import { ReducedMotionBridge } from "@/components/ReducedMotionBridge";
import { COUNTRY_APP_MAP } from "@/lib/data/countryAppMap";
import { APPS } from "@/lib/data/apps";

export default function HomePage() {
  return (
    <main className="relative h-dvh w-screen overflow-hidden bg-ink text-bone">
      <ReducedMotionBridge />

      {/* Top chrome */}
      <Header totalCountries={COUNTRY_APP_MAP.length} totalApps={APPS.length} />
      <CategoryPills />

      {/* The globe */}
      <section className="absolute inset-0 z-0" aria-label="World map">
        <WorldMap />
      </section>

      {/* Instrument readouts overlaying the map */}
      <CoordinateReadout />
      <StatsCard />
      <Legend />
      <DragHint />

      {/* Inspector slides in from the right when a country is selected */}
      <CountryInspector />

      {/* Editorial vignette so the globe focuses optical attention */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at center, transparent 50%, rgba(4,4,10,0.7) 100%)",
        }}
      />
    </main>
  );
}
