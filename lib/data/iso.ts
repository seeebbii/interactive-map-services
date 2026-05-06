/**
 * ISO 3166-1 numeric ⇄ alpha-3 mapping.
 *
 * The `world-atlas` TopoJSON encodes each feature's `id` as a 3-digit ISO
 * numeric code (e.g. "840" for the United States). Our app dataset keys on
 * alpha-3. This table bridges the two — only the countries we have data for
 * need to be present; unmatched features render in the base land color.
 */

export const ISO_NUMERIC_TO_ALPHA3: Record<string, string> = {
  // North America
  "840": "USA",
  "124": "CAN",
  "484": "MEX",
  // Latin America
  "076": "BRA",
  "032": "ARG",
  "170": "COL",
  "152": "CHL",
  "604": "PER",
  "858": "URY",
  // Europe
  "826": "GBR",
  "250": "FRA",
  "276": "DEU",
  "724": "ESP",
  "380": "ITA",
  "528": "NLD",
  "616": "POL",
  "752": "SWE",
  "578": "NOR",
  "246": "FIN",
  "208": "DNK",
  "620": "PRT",
  "372": "IRL",
  "056": "BEL",
  "756": "CHE",
  "040": "AUT",
  "300": "GRC",
  "203": "CZE",
  "642": "ROU",
  "100": "BGR",
  "348": "HUN",
  "233": "EST",
  "428": "LVA",
  "440": "LTU",
  "643": "RUS",
  "804": "UKR",
  // MENA
  "792": "TUR",
  "682": "SAU",
  "784": "ARE",
  "414": "KWT",
  "634": "QAT",
  "048": "BHR",
  "376": "ISR",
  "818": "EGY",
  "504": "MAR",
  "788": "TUN",
  "012": "DZA",
  "364": "IRN",
  "368": "IRQ",
  "400": "JOR",
  "422": "LBN",
  // South Asia
  "356": "IND",
  "586": "PAK",
  "050": "BGD",
  "144": "LKA",
  "524": "NPL",
  // East Asia
  "156": "CHN",
  "392": "JPN",
  "410": "KOR",
  "344": "HKG",
  "158": "TWN",
  // Southeast Asia
  "702": "SGP",
  "458": "MYS",
  "360": "IDN",
  "608": "PHL",
  "704": "VNM",
  "764": "THA",
  "116": "KHM",
  // Africa
  "566": "NGA",
  "404": "KEN",
  "710": "ZAF",
  "288": "GHA",
  "231": "ETH",
  "800": "UGA",
  "834": "TZA",
  "894": "ZMB",
  // Oceania
  "036": "AUS",
  "554": "NZL",
};

export const ALPHA3_TO_ISO_NUMERIC: Record<string, string> = Object.fromEntries(
  Object.entries(ISO_NUMERIC_TO_ALPHA3).map(([k, v]) => [v, k]),
);

export function alpha3FromNumeric(numeric: string | number | undefined): string | null {
  if (numeric === undefined || numeric === null) return null;
  const key = typeof numeric === "number" ? String(numeric).padStart(3, "0") : numeric;
  return ISO_NUMERIC_TO_ALPHA3[key] ?? null;
}
