#!/usr/bin/env node
/**
 * Project setup — runs on `npm install` (postinstall) and is idempotent.
 *
 *   1. Copies world-atlas/countries-110m.json → public/data/world-110m.json
 *      so the WorldMap component can fetch it from a stable, offline URL.
 *
 *   2. Generates a monogram SVG for every app in lib/data/apps.ts at
 *      public/logos/{id}.svg. Generated on the fly so the project ships
 *      no third-party brand artwork.
 */

import { existsSync, mkdirSync, copyFileSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

function ensureDir(p) {
  if (!existsSync(p)) mkdirSync(p, { recursive: true });
}

// ── 1. World atlas TopoJSON ────────────────────────────────────────────────
function copyWorldAtlas() {
  const src = join(root, "node_modules", "world-atlas", "countries-110m.json");
  const destDir = join(root, "public", "data");
  const dest = join(destDir, "world-110m.json");
  if (!existsSync(src)) {
    console.warn(`[setup] world-atlas not yet installed — skipping topojson copy.`);
    return;
  }
  ensureDir(destDir);
  copyFileSync(src, dest);
  console.log(`[setup] copied world-atlas TopoJSON to public/data/world-110m.json`);
}

// ── 2. Logo monograms ──────────────────────────────────────────────────────
/**
 * Naive but reliable parse of lib/data/apps.ts. We pull (id, color, mark)
 * from each entry using matchAll. The dataset has a stable shape; if it
 * changes, update the pattern below.
 */
function parseApps() {
  const appsPath = join(root, "lib", "data", "apps.ts");
  if (!existsSync(appsPath)) {
    console.warn(`[setup] apps.ts not found — skipping logo generation`);
    return [];
  }
  const src = readFileSync(appsPath, "utf8");
  const pattern = /\{\s*id:\s*"([^"]+)"[\s\S]*?color:\s*"(#[A-Fa-f0-9]{3,8})"[\s\S]*?mark:\s*"([^"]+)"/g;
  const out = [];
  for (const match of src.matchAll(pattern)) {
    out.push({ id: match[1], color: match[2], mark: match[3] });
  }
  return out;
}

/**
 * Compute relative luminance for a hex color. Returns 0..1.
 * Used to pick a contrast-safe foreground for the monogram.
 */
function luminance(hex) {
  const h = hex.replace("#", "");
  const expanded = h.length === 3
    ? h.split("").map((c) => c + c).join("")
    : h;
  const r = parseInt(expanded.slice(0, 2), 16) / 255;
  const g = parseInt(expanded.slice(2, 4), 16) / 255;
  const b = parseInt(expanded.slice(4, 6), 16) / 255;
  const lin = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function svgFor({ color, mark }) {
  const fg = luminance(color) > 0.5 ? "#0A0A0F" : "#FFFFFF";
  const safeMark = mark
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  const fontSize = safeMark.length <= 2 ? 24 : 18;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img" aria-label="${safeMark} logo">
  <rect width="64" height="64" rx="14" fill="${color}"/>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-family="ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace" font-weight="700" font-size="${fontSize}" fill="${fg}" letter-spacing="-0.02em">${safeMark}</text>
</svg>
`;
}

function generateLogos() {
  const apps = parseApps();
  if (apps.length === 0) return;
  const outDir = join(root, "public", "logos");
  ensureDir(outDir);
  for (const app of apps) {
    const dest = join(outDir, `${app.id}.svg`);
    writeFileSync(dest, svgFor(app), "utf8");
  }
  console.log(`[setup] generated ${apps.length} logo SVGs in public/logos/`);
}

// ── Run ────────────────────────────────────────────────────────────────────
copyWorldAtlas();
generateLogos();
console.log("[setup] done.");
