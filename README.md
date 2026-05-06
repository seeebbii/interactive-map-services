# World App Atlas

An interactive editorial dataviz of the most-used delivery, ride-hailing,
fintech, and super-apps in every country, layered on an animated SVG world
map. Built in Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Zustand,
and react-simple-maps.

```
food          ride          grocery       courier       fintech       streaming     super-app
DoorDash      Uber          Instacart     Bykea         Revolut       Netflix       Grab
iFood         Bolt          ...           Dunzo         M-Pesa        Spotify       Rappi
Zomato        Didi                                       PhonePe                     Careem
Wolt          Yango                                      Mercado Pago                Gojek
Glovo         Lyft                                                                   Meituan
...           ...                                                                    ...
```

## Quick start

```bash
npm install        # installs deps + runs scripts/setup.mjs (postinstall)
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve production build
```

`npm install` will:
1. Install all dependencies.
2. Copy `world-atlas/countries-110m.json` → `public/data/world-110m.json`.
3. Generate a monogram SVG per app at `public/logos/{id}.svg`.

If the postinstall hook is skipped (some package managers / `npm ci --ignore-scripts`),
run `npm run setup` manually.

## What this is

An editorial-grade interactive map. The aesthetic point of view:

- **Dark-first.** Deep ink background, bone foreground, electric cyan
  signal accent. Single-chroma category palette so the map reads as a
  system, not a fruit basket of brand colors.
- **Type-forward.** Geist Sans for display + body, Geist Mono for data
  labels and stat numbers (with `tabular-nums` so numbers stop dancing
  during filter swaps).
- **Motion is intentional.** Region-by-region staggered reveal on first
  paint, spring-based inspector slide-in, layout animations on filter
  change, and a soft pulse on the global #1 app per category. Every
  transition uses a non-linear ease — never `linear`.
- **Accessibility.** Full keyboard navigation through countries, ARIA
  labels on every interactive element, visible cyan focus rings, and a
  full `prefers-reduced-motion` branch that disables decorative motion
  while keeping essential transitions.

## Tech stack

| Concern              | Choice                                            |
| -------------------- | ------------------------------------------------- |
| Framework            | Next.js 14 (App Router) + React 18 + TypeScript  |
| Styling              | Tailwind CSS 3.4 (custom design tokens)          |
| Animation            | Framer Motion 11 (`motion.*`, `AnimatePresence`) |
| Map rendering        | `react-simple-maps` (SVG, wraps d3-geo)          |
| Geo data             | `world-atlas` (countries-110m TopoJSON)          |
| State                | Zustand                                           |
| Icons                | Lucide React                                      |
| Type                 | Geist Sans + Geist Mono via `geist/font`         |

### Why react-simple-maps and not MapLibre?

react-simple-maps renders countries as real SVG paths, which means
Framer Motion can drive entrance, fill interpolation, hover lifts, and
camera transitions declaratively. With WebGL (MapLibre), motion has to
be faked with shader uniforms or CSS layers — both of which fight the
renderer instead of cooperating with it.

Tradeoff: react-simple-maps cannot draw 100k vector tiles at 60fps.
For a country-level choropleth at 110m resolution (~70 features), it's
plenty fast. If this ever grows into city-level density (e.g. 50k pinned
restaurants), swap to MapLibre with deck.gl overlays and accept that
country fills become buffer-driven instead of motion-driven. The map
component header has more notes on this tradeoff.

## Routes

- `/` — landing page (editorial cover with auto-rotating decorative globe)
- `/atlas` — the interactive map (drag to rotate, click to zoom, etc.)

## Project structure

```
app/
  layout.tsx               root layout, fonts, metadata
  page.tsx                 landing page (server component)
  atlas/page.tsx           interactive map (server component)
  globals.css              design tokens + tailwind directives
components/
  Header.tsx               atlas top bar (title, search, viz toggle)
  Legend.tsx               bottom-left legend with tweening count
  ReducedMotionBridge.tsx  hydrates prefers-reduced-motion into store
  Filters/
    CategoryPills.tsx      pill bar with layoutId active indicator
  Landing/
    LandingTopHeader.tsx   header for the landing route
    LandingHero.tsx        cover hero (title, tagline, stats, CTA)
    LandingGlobe.tsx       decorative auto-rotating globe
    CategorySweep.tsx      bottom row of category swatches
  Map/
    WorldMap.tsx           orchestrator (orthographic globe, drag, zoom)
    CountryShape.tsx       per-country motion.g + Geography
    CountryLabels.tsx      opt-in ISO code overlay (vizMode)
    MapShimmer.tsx         loading silhouette for the globe
    MapTooltip.tsx         floating cursor tooltip
    CoordinateReadout.tsx  LON/LAT instrument readout
    StatsCard.tsx          top-right card with tweening reach
    DragHint.tsx           bottom-right interaction hint
    VizToggle.tsx          fills / codes / hybrid switch
    ZoomControls.tsx       +/-/reset stack (right-center)
  Sidebar/
    CountryInspector.tsx   slide-in panel with ranked app stack
lib/
  data/
    apps.ts                real apps with category, brand color, mark
    countryAppMap.ts       country → ranked apps + centroid + pop
    categories.ts          7 categories with hex colors
    iso.ts                 ISO numeric ⇄ alpha-3 mapping
  store/
    useMapStore.ts         Zustand store (selection, filter, rotate, scale)
public/
  data/world-110m.json     copied by scripts/setup.mjs
  logos/{id}.svg           generated by scripts/setup.mjs
scripts/
  setup.mjs                postinstall: copy atlas + generate logos
types/
  index.ts                 domain types
```

## Extending the dataset

### Add a new app

1. Open `lib/data/apps.ts`.
2. Append an `App` entry:

   ```ts
   {
     id: "newapp",
     name: "NewApp",
     category: "food",            // one of Category
     logo: "/logos/newapp.svg",   // generated automatically
     color: "#FF0000",            // brand hex
     hqCountry: "USA",            // ISO 3166-1 alpha-3
     mark: "Na",                  // 2-letter monogram for the marker
   }
   ```

3. Reference it from one or more countries in `lib/data/countryAppMap.ts`.
4. Run `npm run setup` to regenerate the logo SVG.

If you mark a single app per category with `flagshipForCategory: true`,
that app gets a soft pulsing aura on the world map — reserve it for the
globally most-used app in its category.

### Add a new country

1. Open `lib/data/iso.ts` and add the country's ISO numeric → alpha-3
   mapping (e.g. `"170": "COL"`). Find the numeric code in the
   ISO 3166-1 spec.
2. Open `lib/data/countryAppMap.ts` and append a `CountryAppEntry` with:
   - `countryIso` (alpha-3)
   - `countryName`
   - `centroid` as `[longitude, latitude]` (use any geocoder for an
     approximate centroid — Wikipedia infoboxes usually have one)
   - `populationM` in millions (drives marker bubble radius)
   - `apps` ranked from #1 down (`marketShare` is optional, approximate)

The country will automatically pick up the choropleth fill and a marker
bubble at its centroid. If you skip the ISO mapping but include the
country in the app map, the bubble still draws but the country shape
won't fill.

### Add a new category

1. Add the category id to `Category` in `types/index.ts`.
2. Add a metadata entry in `lib/data/categories.ts` with a hex that
   slots into the existing single-chroma sweep (~70% lightness).
3. Add a Tailwind color token in `tailwind.config.ts` under `cat.*`.
4. Reference the new category from at least one app.

The pill bar, legend, and map fills pick it up automatically.

## Data integrity

Ranks in `countryAppMap.ts` are **ordinal estimates** synthesized from
public reporting (Statista, Wikipedia, company filings, regional press).
They reflect general consumer popularity, not precise market share.

`marketShare` values, when present, are rounded approximations (±5pp)
and are always rendered with a "~" prefix in the UI. Don't reverse-
engineer competitive intelligence from them.

## Accessibility & performance

- Every country shape is keyboard-focusable when it has data; press
  Enter/Space to open the inspector.
- The cyan focus ring is cleared by clicking the close button or
  pressing Escape (browser default on the close button).
- All decorative motion respects `prefers-reduced-motion`. Camera
  transitions, fades, and reveals all collapse to ~0ms when set.
- Country paths are memoized via `React.memo`; only the changed country
  re-renders on hover/select.
- Logo SVGs use `next/image` with `loading="lazy"` and ship as
  generated 64×64 monograms (no third-party imagery).
- The world atlas TopoJSON (110m resolution, ~120kb) is served from
  `/public/data/` so it caches at the CDN edge.

## License & attribution

- App brand names, hex colors, and HQ countries are public knowledge.
- This project ships **zero third-party brand artwork**. App "logos"
  are programmatically generated 2-letter monograms.
- Country geometry is from `world-atlas` (Natural Earth, public domain).
- Code: MIT.
