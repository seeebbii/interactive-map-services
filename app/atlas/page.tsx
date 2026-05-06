import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { CategoryPills } from "@/components/Filters/CategoryPills";
import { Legend } from "@/components/Legend";
import { WorldMap } from "@/components/Map/WorldMap";
import { CountryInspector } from "@/components/Sidebar/CountryInspector";
import { CoordinateReadout } from "@/components/Map/CoordinateReadout";
import { StatsCard } from "@/components/Map/StatsCard";
import { DragHint } from "@/components/Map/DragHint";
import { ZoomControls } from "@/components/Map/ZoomControls";
import { ReducedMotionBridge } from "@/components/ReducedMotionBridge";
import { COUNTRY_APP_MAP } from "@/lib/data/countryAppMap";
import { APPS } from "@/lib/data/apps";

export default function AtlasPage() {
  return (
    <main className="relative h-dvh w-screen overflow-hidden bg-ink text-bone">
      <ReducedMotionBridge />

      {/* Top chrome */}
      <Header totalCountries={COUNTRY_APP_MAP.length} totalApps={APPS.length} />
      <CategoryPills />

      {/* Back-to-landing affordance */}
      <Link
        href="/"
        aria-label="Back to landing"
        className="absolute left-6 top-3.5 z-40 flex h-7 items-center gap-1.5 rounded-md border border-white/[0.06] bg-white/[0.02] px-2 font-mono text-2xs uppercase tracking-widest text-bone-muted transition-colors hover:border-white/[0.14] hover:text-bone"
      >
        <ArrowLeft className="h-3 w-3" />
        Home
      </Link>

      {/* The globe */}
      <section className="absolute inset-0 z-0" aria-label="World map">
        <WorldMap />
      </section>

      {/* Instrument readouts overlaying the map */}
      <CoordinateReadout />
      <StatsCard />
      <ZoomControls />
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
