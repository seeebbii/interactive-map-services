import type { Category, CategoryMeta } from "@/types";

/**
 * Category metadata. Hex colors map 1:1 to Tailwind tokens in tailwind.config.ts
 * under `cat.*` so pills, country fills, markers, and the legend stay in sync.
 *
 * The palette is a single-chroma sweep across hue (~70% lightness, similar
 * saturation) so it reads as one system instead of seven unrelated colors.
 */
export const CATEGORIES: CategoryMeta[] = [
  { id: "food",      label: "Food delivery", short: "Food",      hex: "#FF6B47" },
  { id: "ride",      label: "Ride-hailing",  short: "Ride",      hex: "#FFC93D" },
  { id: "grocery",   label: "Grocery",       short: "Grocery",   hex: "#5BD68A" },
  { id: "courier",   label: "Courier",       short: "Courier",   hex: "#3DC9F0" },
  { id: "fintech",   label: "Fintech",       short: "Fintech",   hex: "#7B7AFF" },
  { id: "streaming", label: "Streaming",     short: "Stream",    hex: "#D169FF" },
  { id: "superapp",  label: "Super-app",     short: "Super",     hex: "#FF5BB0" },
];

export const CATEGORY_BY_ID: Record<Category, CategoryMeta> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c]),
) as Record<Category, CategoryMeta>;

export function categoryHex(id: Category): string {
  return CATEGORY_BY_ID[id].hex;
}
