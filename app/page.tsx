import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LandingHero } from "@/components/Landing/LandingHero";
import { LandingGlobe } from "@/components/Landing/LandingGlobe";
import { CategorySweep } from "@/components/Landing/CategorySweep";
import { LandingTopHeader } from "@/components/Landing/LandingTopHeader";
import { COUNTRY_APP_MAP } from "@/lib/data/countryAppMap";
import { APPS } from "@/lib/data/apps";
import { CATEGORIES } from "@/lib/data/categories";
import { APP_BY_ID } from "@/lib/data/apps";

export default function HomePage() {
  // Per-category counts — reused by the bottom sweep
  const categoryCounts = CATEGORIES.map((c) => {
    const count = COUNTRY_APP_MAP.filter((country) =>
      country.apps.some((a) => APP_BY_ID[a.appId]?.category === c.id),
    ).length;
    return { ...c, count };
  });

  return (
    <main className="relative min-h-dvh w-screen overflow-hidden bg-ink text-bone">
      {/* Background grid — editorial Bloomberg/Pudding texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse at 30% 50%, black 30%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 30% 50%, black 30%, transparent 90%)",
        }}
      />

      {/* Atmospheric haze tints */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 700px at 80% 30%, rgba(0,229,255,0.08), transparent 70%), radial-gradient(700px 600px at 10% 100%, rgba(123,122,255,0.05), transparent 65%)",
        }}
      />

      {/* Top header */}
      <LandingTopHeader />

      {/* Decorative globe — bleeds off the right edge for visual weight */}
      <div
        className="absolute right-[-180px] top-[-40px] z-0 hidden md:block"
        aria-hidden="true"
      >
        <LandingGlobe size={920} />
      </div>

      {/* Mobile globe (smaller, in-flow) */}
      <div className="absolute right-[-120px] top-16 z-0 md:hidden" aria-hidden="true">
        <LandingGlobe size={520} />
      </div>

      {/* Hero region */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-32 pt-24 sm:px-10 md:pt-32 lg:pt-40">
        <LandingHero
          countries={COUNTRY_APP_MAP.length}
          apps={APPS.length}
          categories={CATEGORIES.length}
        />
      </section>

      {/* Bottom sweep — categories at a glance */}
      <CategorySweep categoryCounts={categoryCounts} />

      {/* Footer link */}
      <footer className="relative z-10 border-t border-white/[0.04] bg-ink/60 px-6 py-5 backdrop-blur-md sm:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 font-mono text-2xs uppercase tracking-widest text-bone-dim">
          <span>
            Editorial dataviz · curated from public reporting · approximate ranks
          </span>
          <Link
            href="/atlas"
            className="flex items-center gap-1.5 text-bone-muted transition-colors hover:text-bone"
          >
            Launch atlas
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </footer>

      {/* Bottom vignette — anchors the eye to content */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 z-0"
        style={{
          background:
            "linear-gradient(to top, rgba(4,4,10,0.6), transparent)",
        }}
      />
    </main>
  );
}
