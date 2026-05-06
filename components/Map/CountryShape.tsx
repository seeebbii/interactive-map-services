"use client";

import { memo, useMemo } from "react";
import { Geography } from "react-simple-maps";
import { motion } from "framer-motion";
import { useMapStore } from "@/lib/store/useMapStore";
import { COUNTRY_BY_ISO } from "@/lib/data/countryAppMap";
import { APP_BY_ID } from "@/lib/data/apps";
import { alpha3FromNumeric } from "@/lib/data/iso";
import { categoryHex } from "@/lib/data/categories";
import type { CountryFeatureProperties } from "@/types";

const COLORS = {
  landNoData: "#0D0D14",
  landBase: "#1B1B26",
  landDim: "#11111A",
  borderBase: "rgba(255,255,255,0.045)",
  borderHover: "rgba(255,255,255,0.22)",
  borderSelected: "#E5E5EC",
  signal: "#00E5FF",
};

interface Geo {
  rsmKey: string;
  id?: string | number;
  properties: CountryFeatureProperties;
}

interface Props {
  geography: Geo;
  index: number;
}

/**
 * Mix a base hex with white by `amount` (0..1). Used for hover lift.
 * Returns the input unchanged if not a 6-digit hex.
 */
function brighten(hex: string, amount = 0.16): string {
  const match = hex.match(/^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!match) return hex;
  const r = Math.min(255, parseInt(match[1]!, 16) + Math.round(amount * 255));
  const g = Math.min(255, parseInt(match[2]!, 16) + Math.round(amount * 255));
  const b = Math.min(255, parseInt(match[3]!, 16) + Math.round(amount * 255));
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

function CountryShapeImpl({ geography, index }: Props) {
  const selectedIso = useMapStore((s) => s.selectedIso);
  const categoryFilter = useMapStore((s) => s.categoryFilter);
  const reducedMotion = useMapStore((s) => s.reducedMotion);
  const setSelectedIso = useMapStore((s) => s.setSelectedIso);
  const setHoveredIso = useMapStore((s) => s.setHoveredIso);

  const alpha3 = alpha3FromNumeric(geography.id);
  const entry = alpha3 ? COUNTRY_BY_ISO[alpha3] : null;
  const isSelected = alpha3 !== null && selectedIso === alpha3;

  const fill = useMemo(() => {
    if (isSelected) {
      return categoryFilter !== null
        ? brighten(categoryHex(categoryFilter), 0.25)
        : COLORS.signal;
    }
    if (categoryFilter !== null && entry) {
      const matched = entry.apps.find(
        (a) => APP_BY_ID[a.appId]?.category === categoryFilter,
      );
      if (matched) return categoryHex(categoryFilter);
      return COLORS.landDim;
    }
    if (categoryFilter !== null) return COLORS.landDim;
    if (entry) return COLORS.landBase;
    return COLORS.landNoData;
  }, [isSelected, categoryFilter, entry]);

  const handleClick = () => {
    if (!alpha3 || !entry) return;
    if (selectedIso === alpha3) {
      setSelectedIso(null);
    } else {
      setSelectedIso(alpha3);
    }
  };

  const handleMouseEnter = () => {
    if (alpha3 && entry) setHoveredIso(alpha3);
  };
  const handleMouseLeave = () => {
    setHoveredIso(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!alpha3 || !entry) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <motion.g
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.8,
        delay: reducedMotion ? 0 : Math.min(0.9, index * 0.004),
        ease: [0.2, 0.7, 0.3, 1],
      }}
    >
      <Geography
        geography={geography}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
        tabIndex={entry ? 0 : -1}
        role={entry ? "button" : "presentation"}
        aria-label={
          entry
            ? `${entry.countryName} — view apps`
            : geography.properties.name
        }
        style={{
          default: {
            fill,
            stroke: isSelected ? COLORS.borderSelected : COLORS.borderBase,
            strokeWidth: isSelected ? 1 : 0.5,
            outline: "none",
            transition:
              "fill 220ms cubic-bezier(0.2,0.7,0.3,1), stroke 180ms cubic-bezier(0.2,0.7,0.3,1), stroke-width 180ms cubic-bezier(0.2,0.7,0.3,1)",
            cursor: entry ? "pointer" : "default",
            filter: isSelected ? "url(#glow-soft)" : "none",
          },
          hover: {
            fill: entry ? brighten(fill, 0.18) : fill,
            stroke: COLORS.borderHover,
            strokeWidth: 0.9,
            outline: "none",
            cursor: entry ? "pointer" : "default",
          },
          pressed: {
            fill: brighten(fill, 0.3),
            stroke: COLORS.borderSelected,
            strokeWidth: 1,
            outline: "none",
          },
        }}
      />
    </motion.g>
  );
}

export const CountryShape = memo(CountryShapeImpl);
