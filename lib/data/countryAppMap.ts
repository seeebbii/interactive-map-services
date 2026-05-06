import type { CountryAppEntry } from "@/types";

/**
 * Country → ranked-apps mapping.
 *
 * IMPORTANT — DATA NOTES (please read before extending):
 *
 *   1. Ranks are ORDINAL estimates derived from public reporting (Statista,
 *      company filings, Wikipedia, regional press). They reflect general
 *      consumer popularity at the time of writing, not precise market share.
 *
 *   2. `marketShare` is intentionally OMITTED for most rows. Where present,
 *      the value is a rough rounded estimate (±5pp) and should be displayed
 *      with a "~" prefix. Don't reverse-engineer competitive intelligence
 *      from these numbers.
 *
 *   3. Centroids are simplified geographic centers — fine for marker
 *      placement, not for navigation.
 *
 *   4. Population is in millions, used to scale visual emphasis.
 *
 *   5. Coverage by region:
 *      - inDrive is added wherever it has a meaningful presence (LATAM,
 *        MENA, South & East Asia, Africa, CIS).
 *      - Pakistan / Bangladesh / Indonesia / Korea / China / India / Russia
 *        get the regional super-stack (food + ride + fintech + streaming).
 *      - International streaming (Netflix / Disney+ / Prime Video) is added
 *        to large markets where it's a meaningful consumer app.
 *
 * To extend: append a new entry below. Keep alpha-3 ISO codes consistent
 * with `lib/data/iso.ts` so the choropleth can resolve the country.
 */

export const COUNTRY_APP_MAP: CountryAppEntry[] = [
  // ── North America ────────────────────────────────────────────────────────
  {
    countryIso: "USA",
    countryName: "United States",
    centroid: [-98.4, 39.5],
    populationM: 333,
    apps: [
      { appId: "uber",        rank: 1, marketShare: 72 },
      { appId: "doordash",    rank: 2, marketShare: 65 },
      { appId: "ubereats",    rank: 3 },
      { appId: "instacart",   rank: 4 },
      { appId: "venmo",       rank: 5 },
      { appId: "cashapp",     rank: 6 },
      { appId: "netflix",     rank: 7 },
      { appId: "primevideo",  rank: 8 },
      { appId: "disneyplus",  rank: 9 },
      { appId: "lyft",        rank: 10 },
      { appId: "grubhub",     rank: 11 },
    ],
  },
  {
    countryIso: "CAN",
    countryName: "Canada",
    centroid: [-106.3, 56.1],
    populationM: 39,
    apps: [
      { appId: "uber",        rank: 1 },
      { appId: "doordash",    rank: 2 },
      { appId: "ubereats",    rank: 3 },
      { appId: "instacart",   rank: 4 },
      { appId: "netflix",     rank: 5 },
      { appId: "primevideo",  rank: 6 },
    ],
  },
  {
    countryIso: "MEX",
    countryName: "Mexico",
    centroid: [-102.5, 23.6],
    populationM: 128,
    apps: [
      { appId: "rappi",       rank: 1 },
      { appId: "ubereats",    rank: 2 },
      { appId: "uber",        rank: 3 },
      { appId: "didi",        rank: 4 },
      { appId: "indrive",     rank: 5 },
      { appId: "mercadopago", rank: 6 },
      { appId: "netflix",     rank: 7 },
      { appId: "disneyplus",  rank: 8 },
    ],
  },

  // ── Latin America ────────────────────────────────────────────────────────
  {
    countryIso: "BRA",
    countryName: "Brazil",
    centroid: [-51.9, -14.2],
    populationM: 215,
    apps: [
      { appId: "ifood",        rank: 1, marketShare: 80 },
      { appId: "noventaenove", rank: 2 },
      { appId: "uber",         rank: 3 },
      { appId: "indrive",      rank: 4 },
      { appId: "mercadopago",  rank: 5 },
      { appId: "rappi",        rank: 6 },
      { appId: "netflix",      rank: 7 },
      { appId: "primevideo",   rank: 8 },
      { appId: "spotify",      rank: 9 },
    ],
  },
  {
    countryIso: "ARG",
    countryName: "Argentina",
    centroid: [-63.6, -38.4],
    populationM: 46,
    apps: [
      { appId: "mercadopago", rank: 1, marketShare: 55 },
      { appId: "pedidosya",   rank: 2 },
      { appId: "rappi",        rank: 3 },
      { appId: "uber",         rank: 4 },
      { appId: "didi",         rank: 5 },
      { appId: "indrive",      rank: 6 },
      { appId: "netflix",      rank: 7 },
    ],
  },
  {
    countryIso: "COL",
    countryName: "Colombia",
    centroid: [-74.3, 4.6],
    populationM: 51,
    apps: [
      { appId: "rappi",        rank: 1 },
      { appId: "uber",         rank: 2 },
      { appId: "didi",         rank: 3 },
      { appId: "indrive",      rank: 4 },
      { appId: "mercadopago",  rank: 5 },
      { appId: "netflix",      rank: 6 },
    ],
  },
  {
    countryIso: "CHL",
    countryName: "Chile",
    centroid: [-71.5, -35.7],
    populationM: 19,
    apps: [
      { appId: "pedidosya",   rank: 1 },
      { appId: "rappi",       rank: 2 },
      { appId: "uber",        rank: 3 },
      { appId: "indrive",     rank: 4 },
      { appId: "mercadopago", rank: 5 },
    ],
  },
  {
    countryIso: "PER",
    countryName: "Peru",
    centroid: [-75.0, -9.2],
    populationM: 33,
    apps: [
      { appId: "rappi",     rank: 1 },
      { appId: "pedidosya", rank: 2 },
      { appId: "uber",      rank: 3 },
      { appId: "indrive",   rank: 4 },
      { appId: "didi",      rank: 5 },
    ],
  },
  {
    countryIso: "URY",
    countryName: "Uruguay",
    centroid: [-55.8, -32.5],
    populationM: 3,
    apps: [
      { appId: "pedidosya", rank: 1, marketShare: 70 },
      { appId: "rappi",     rank: 2 },
      { appId: "uber",      rank: 3 },
    ],
  },

  // ── Europe ───────────────────────────────────────────────────────────────
  {
    countryIso: "GBR",
    countryName: "United Kingdom",
    centroid: [-3.4, 55.4],
    populationM: 67,
    apps: [
      { appId: "deliveroo",  rank: 1 },
      { appId: "justeat",    rank: 2 },
      { appId: "ubereats",   rank: 3 },
      { appId: "uber",       rank: 4 },
      { appId: "revolut",    rank: 5, marketShare: 38 },
      { appId: "bolt",       rank: 6 },
      { appId: "netflix",    rank: 7 },
      { appId: "primevideo", rank: 8 },
      { appId: "spotify",    rank: 9 },
    ],
  },
  {
    countryIso: "FRA",
    countryName: "France",
    centroid: [2.2, 46.2],
    populationM: 65,
    apps: [
      { appId: "ubereats",   rank: 1 },
      { appId: "deliveroo",  rank: 2 },
      { appId: "uber",       rank: 3 },
      { appId: "bolt",       rank: 4 },
      { appId: "netflix",    rank: 5 },
      { appId: "primevideo", rank: 6 },
      { appId: "spotify",    rank: 7 },
    ],
  },
  {
    countryIso: "DEU",
    countryName: "Germany",
    centroid: [10.4, 51.2],
    populationM: 84,
    apps: [
      { appId: "wolt",      rank: 1 },
      { appId: "foodpanda", rank: 2 },
      { appId: "ubereats",  rank: 3 },
      { appId: "uber",      rank: 4 },
      { appId: "bolt",      rank: 5 },
      { appId: "spotify",   rank: 6 },
      { appId: "netflix",   rank: 7 },
    ],
  },
  {
    countryIso: "ESP",
    countryName: "Spain",
    centroid: [-3.7, 40.5],
    populationM: 47,
    apps: [
      { appId: "glovo",   rank: 1 },
      { appId: "justeat", rank: 2 },
      { appId: "ubereats", rank: 3 },
      { appId: "uber",    rank: 4 },
      { appId: "bolt",    rank: 5 },
      { appId: "netflix", rank: 6 },
    ],
  },
  {
    countryIso: "ITA",
    countryName: "Italy",
    centroid: [12.6, 41.9],
    populationM: 59,
    apps: [
      { appId: "glovo",   rank: 1 },
      { appId: "justeat", rank: 2 },
      { appId: "ubereats", rank: 3 },
      { appId: "uber",    rank: 4 },
      { appId: "spotify", rank: 5 },
      { appId: "netflix", rank: 6 },
    ],
  },
  {
    countryIso: "NLD",
    countryName: "Netherlands",
    centroid: [5.3, 52.1],
    populationM: 17,
    apps: [
      { appId: "justeat", rank: 1 },
      { appId: "uber",    rank: 2 },
      { appId: "bolt",    rank: 3 },
      { appId: "netflix", rank: 4 },
    ],
  },
  {
    countryIso: "POL",
    countryName: "Poland",
    centroid: [19.1, 51.9],
    populationM: 38,
    apps: [
      { appId: "wolt",     rank: 1 },
      { appId: "bolt",     rank: 2 },
      { appId: "glovo",    rank: 3 },
      { appId: "uber",     rank: 4 },
      { appId: "indrive",  rank: 5 },
    ],
  },
  {
    countryIso: "SWE",
    countryName: "Sweden",
    centroid: [18.6, 60.1],
    populationM: 10,
    apps: [
      { appId: "wolt",    rank: 1 },
      { appId: "bolt",    rank: 2 },
      { appId: "spotify", rank: 3 },
      { appId: "uber",    rank: 4 },
    ],
  },
  {
    countryIso: "NOR",
    countryName: "Norway",
    centroid: [8.4, 60.4],
    populationM: 5,
    apps: [
      { appId: "wolt",    rank: 1 },
      { appId: "bolt",    rank: 2 },
      { appId: "spotify", rank: 3 },
      { appId: "netflix", rank: 4 },
    ],
  },
  {
    countryIso: "FIN",
    countryName: "Finland",
    centroid: [25.7, 61.9],
    populationM: 5,
    apps: [
      { appId: "wolt",    rank: 1, marketShare: 80 },
      { appId: "bolt",    rank: 2 },
      { appId: "spotify", rank: 3 },
    ],
  },
  {
    countryIso: "DNK",
    countryName: "Denmark",
    centroid: [9.5, 56.3],
    populationM: 6,
    apps: [
      { appId: "wolt",    rank: 1 },
      { appId: "justeat", rank: 2 },
      { appId: "bolt",    rank: 3 },
    ],
  },
  {
    countryIso: "PRT",
    countryName: "Portugal",
    centroid: [-8.2, 39.4],
    populationM: 10,
    apps: [
      { appId: "glovo",   rank: 1 },
      { appId: "ubereats", rank: 2 },
      { appId: "uber",    rank: 3 },
      { appId: "bolt",    rank: 4 },
      { appId: "netflix", rank: 5 },
    ],
  },
  {
    countryIso: "EST",
    countryName: "Estonia",
    centroid: [25.0, 58.6],
    populationM: 1,
    apps: [
      { appId: "bolt", rank: 1, marketShare: 75 },
      { appId: "wolt", rank: 2 },
    ],
  },
  {
    countryIso: "ROU",
    countryName: "Romania",
    centroid: [25.0, 45.9],
    populationM: 19,
    apps: [
      { appId: "bolt",      rank: 1 },
      { appId: "glovo",     rank: 2 },
      { appId: "foodpanda", rank: 3 },
      { appId: "uber",      rank: 4 },
    ],
  },
  {
    countryIso: "GRC",
    countryName: "Greece",
    centroid: [21.8, 39.1],
    populationM: 11,
    apps: [
      { appId: "wolt", rank: 1 },
      { appId: "bolt", rank: 2 },
      { appId: "uber", rank: 3 },
    ],
  },
  {
    countryIso: "CZE",
    countryName: "Czechia",
    centroid: [15.5, 49.8],
    populationM: 11,
    apps: [
      { appId: "bolt",      rank: 1 },
      { appId: "wolt",      rank: 2 },
      { appId: "foodpanda", rank: 3 },
    ],
  },
  {
    countryIso: "HUN",
    countryName: "Hungary",
    centroid: [19.5, 47.2],
    populationM: 10,
    apps: [
      { appId: "bolt",      rank: 1 },
      { appId: "foodpanda", rank: 2 },
      { appId: "wolt",      rank: 3 },
    ],
  },
  {
    countryIso: "UKR",
    countryName: "Ukraine",
    centroid: [31.2, 48.4],
    populationM: 41,
    apps: [
      { appId: "glovo", rank: 1 },
      { appId: "bolt",  rank: 2 },
      { appId: "uber",  rank: 3 },
      { appId: "indrive", rank: 4 },
    ],
  },
  {
    countryIso: "RUS",
    countryName: "Russia",
    centroid: [105.3, 61.5],
    populationM: 144,
    apps: [
      { appId: "yandexgo",  rank: 1, marketShare: 65 },
      { appId: "yandexeda", rank: 2 },
      { appId: "indrive",   rank: 3 },
    ],
  },

  // ── MENA ─────────────────────────────────────────────────────────────────
  {
    countryIso: "TUR",
    countryName: "Türkiye",
    centroid: [35.2, 39.0],
    populationM: 85,
    apps: [
      { appId: "yemeksepeti", rank: 1, marketShare: 60 },
      { appId: "yango",       rank: 2 },
      { appId: "bolt",        rank: 3 },
      { appId: "indrive",     rank: 4 },
      { appId: "netflix",     rank: 5 },
      { appId: "spotify",     rank: 6 },
    ],
  },
  {
    countryIso: "SAU",
    countryName: "Saudi Arabia",
    centroid: [45.1, 23.9],
    populationM: 36,
    apps: [
      { appId: "hungerstation", rank: 1, marketShare: 35 },
      { appId: "talabat",       rank: 2 },
      { appId: "careem",        rank: 3 },
      { appId: "uber",          rank: 4 },
      { appId: "netflix",       rank: 5 },
    ],
  },
  {
    countryIso: "ARE",
    countryName: "United Arab Emirates",
    centroid: [53.8, 23.4],
    populationM: 10,
    apps: [
      { appId: "careem",    rank: 1, marketShare: 55 },
      { appId: "talabat",   rank: 2 },
      { appId: "deliveroo", rank: 3 },
      { appId: "uber",      rank: 4 },
      { appId: "netflix",   rank: 5 },
    ],
  },
  {
    countryIso: "KWT",
    countryName: "Kuwait",
    centroid: [47.5, 29.3],
    populationM: 4,
    apps: [
      { appId: "talabat", rank: 1 },
      { appId: "careem",  rank: 2 },
      { appId: "uber",    rank: 3 },
    ],
  },
  {
    countryIso: "QAT",
    countryName: "Qatar",
    centroid: [51.2, 25.4],
    populationM: 3,
    apps: [
      { appId: "talabat", rank: 1 },
      { appId: "careem",  rank: 2 },
      { appId: "uber",    rank: 3 },
    ],
  },
  {
    countryIso: "BHR",
    countryName: "Bahrain",
    centroid: [50.6, 26.0],
    populationM: 2,
    apps: [
      { appId: "talabat", rank: 1 },
      { appId: "careem",  rank: 2 },
    ],
  },
  {
    countryIso: "EGY",
    countryName: "Egypt",
    centroid: [30.8, 26.8],
    populationM: 110,
    apps: [
      { appId: "talabat", rank: 1 },
      { appId: "careem",  rank: 2 },
      { appId: "indrive", rank: 3 },
      { appId: "uber",    rank: 4 },
      { appId: "netflix", rank: 5 },
    ],
  },
  {
    countryIso: "MAR",
    countryName: "Morocco",
    centroid: [-7.1, 31.8],
    populationM: 37,
    apps: [
      { appId: "glovo",   rank: 1 },
      { appId: "careem",  rank: 2 },
      { appId: "yango",   rank: 3 },
      { appId: "indrive", rank: 4 },
    ],
  },

  // ── South Asia ───────────────────────────────────────────────────────────
  {
    countryIso: "IND",
    countryName: "India",
    centroid: [78.9, 20.6],
    populationM: 1417,
    apps: [
      { appId: "zomato",     rank: 1, marketShare: 56 },
      { appId: "swiggy",     rank: 2, marketShare: 44 },
      { appId: "phonepe",    rank: 3, marketShare: 46 },
      { appId: "paytm",      rank: 4 },
      { appId: "ola",        rank: 5 },
      { appId: "uber",       rank: 6 },
      { appId: "hotstar",    rank: 7 },
      { appId: "jiocinema",  rank: 8 },
      { appId: "netflix",    rank: 9 },
      { appId: "primevideo", rank: 10 },
      { appId: "dunzo",      rank: 11 },
    ],
  },
  {
    countryIso: "PAK",
    countryName: "Pakistan",
    centroid: [69.3, 30.4],
    populationM: 235,
    apps: [
      { appId: "foodpanda", rank: 1, marketShare: 75 },
      { appId: "careem",    rank: 2 },
      { appId: "indrive",   rank: 3 },
      { appId: "bykea",     rank: 4 },
      { appId: "jazzcash",  rank: 5, marketShare: 50 },
      { appId: "easypaisa", rank: 6, marketShare: 45 },
      { appId: "yango",     rank: 7 },
      { appId: "netflix",   rank: 8 },
    ],
  },
  {
    countryIso: "BGD",
    countryName: "Bangladesh",
    centroid: [90.4, 23.7],
    populationM: 171,
    apps: [
      { appId: "foodpanda", rank: 1 },
      { appId: "pathao",    rank: 2 },
      { appId: "bkash",     rank: 3, marketShare: 65 },
      { appId: "uber",      rank: 4 },
      { appId: "indrive",   rank: 5 },
    ],
  },
  {
    countryIso: "LKA",
    countryName: "Sri Lanka",
    centroid: [80.8, 7.9],
    populationM: 22,
    apps: [
      { appId: "uber",      rank: 1 },
      { appId: "foodpanda", rank: 2 },
      { appId: "indrive",   rank: 3 },
    ],
  },

  // ── East Asia ────────────────────────────────────────────────────────────
  {
    countryIso: "CHN",
    countryName: "China",
    centroid: [104.2, 35.9],
    populationM: 1412,
    apps: [
      { appId: "meituan",   rank: 1, marketShare: 67 },
      { appId: "elema",     rank: 2, marketShare: 30 },
      { appId: "didi",      rank: 3 },
      { appId: "alipay",    rank: 4, marketShare: 55 },
      { appId: "wechatpay", rank: 5, marketShare: 40 },
    ],
  },
  {
    countryIso: "JPN",
    countryName: "Japan",
    centroid: [138.3, 36.2],
    populationM: 124,
    apps: [
      { appId: "ubereats",  rank: 1 },
      { appId: "lineman",   rank: 2 },
      { appId: "uber",      rank: 3 },
      { appId: "netflix",   rank: 4 },
      { appId: "spotify",   rank: 5 },
    ],
  },
  {
    countryIso: "KOR",
    countryName: "South Korea",
    centroid: [127.8, 35.9],
    populationM: 52,
    apps: [
      { appId: "baemin",      rank: 1, marketShare: 60 },
      { appId: "coupangeats", rank: 2 },
      { appId: "yogiyo",      rank: 3 },
      { appId: "kakaot",      rank: 4 },
      { appId: "toss",        rank: 5 },
      { appId: "netflix",     rank: 6 },
      { appId: "disneyplus",  rank: 7 },
    ],
  },

  // ── Southeast Asia ───────────────────────────────────────────────────────
  {
    countryIso: "SGP",
    countryName: "Singapore",
    centroid: [103.8, 1.4],
    populationM: 6,
    apps: [
      { appId: "grab",       rank: 1, marketShare: 60 },
      { appId: "shopeefood", rank: 2 },
      { appId: "foodpanda",  rank: 3 },
      { appId: "deliveroo",  rank: 4 },
      { appId: "netflix",    rank: 5 },
      { appId: "disneyplus", rank: 6 },
    ],
  },
  {
    countryIso: "IDN",
    countryName: "Indonesia",
    centroid: [113.9, -0.8],
    populationM: 275,
    apps: [
      { appId: "gojek",      rank: 1, marketShare: 50 },
      { appId: "grab",       rank: 2, marketShare: 45 },
      { appId: "shopeefood", rank: 3 },
      { appId: "gopay",      rank: 4 },
      { appId: "ovo",        rank: 5 },
      { appId: "netflix",    rank: 6 },
      { appId: "disneyplus", rank: 7 },
    ],
  },
  {
    countryIso: "PHL",
    countryName: "Philippines",
    centroid: [122.0, 13.0],
    populationM: 113,
    apps: [
      { appId: "grab",      rank: 1, marketShare: 70 },
      { appId: "foodpanda", rank: 2 },
      { appId: "indrive",   rank: 3 },
      { appId: "netflix",   rank: 4 },
    ],
  },
  {
    countryIso: "VNM",
    countryName: "Vietnam",
    centroid: [108.3, 14.1],
    populationM: 98,
    apps: [
      { appId: "grab",       rank: 1 },
      { appId: "shopeefood", rank: 2 },
      { appId: "foodpanda",  rank: 3 },
      { appId: "lineman",    rank: 4 },
    ],
  },
  {
    countryIso: "THA",
    countryName: "Thailand",
    centroid: [100.9, 15.9],
    populationM: 71,
    apps: [
      { appId: "lineman",    rank: 1 },
      { appId: "grab",       rank: 2 },
      { appId: "foodpanda",  rank: 3 },
      { appId: "shopeefood", rank: 4 },
      { appId: "indrive",    rank: 5 },
    ],
  },
  {
    countryIso: "MYS",
    countryName: "Malaysia",
    centroid: [101.9, 4.2],
    populationM: 33,
    apps: [
      { appId: "grab",       rank: 1, marketShare: 65 },
      { appId: "foodpanda",  rank: 2 },
      { appId: "shopeefood", rank: 3 },
      { appId: "indrive",    rank: 4 },
    ],
  },

  // ── Africa ───────────────────────────────────────────────────────────────
  {
    countryIso: "NGA",
    countryName: "Nigeria",
    centroid: [8.7, 9.1],
    populationM: 218,
    apps: [
      { appId: "chowdeck", rank: 1 },
      { appId: "jumia",    rank: 2 },
      { appId: "opay",     rank: 3, marketShare: 35 },
      { appId: "bolt",     rank: 4 },
      { appId: "indrive",  rank: 5 },
      { appId: "uber",     rank: 6 },
    ],
  },
  {
    countryIso: "KEN",
    countryName: "Kenya",
    centroid: [37.9, -0.0],
    populationM: 54,
    apps: [
      { appId: "mpesa",   rank: 1, marketShare: 96 },
      { appId: "bolt",    rank: 2 },
      { appId: "uber",    rank: 3 },
      { appId: "indrive", rank: 4 },
      { appId: "jumia",   rank: 5 },
      { appId: "glovo",   rank: 6 },
    ],
  },
  {
    countryIso: "ZAF",
    countryName: "South Africa",
    centroid: [22.9, -30.6],
    populationM: 60,
    apps: [
      { appId: "uber",    rank: 1 },
      { appId: "bolt",    rank: 2 },
      { appId: "indrive", rank: 3 },
      { appId: "netflix", rank: 4 },
    ],
  },
  {
    countryIso: "GHA",
    countryName: "Ghana",
    centroid: [-1.0, 7.9],
    populationM: 33,
    apps: [
      { appId: "bolt",    rank: 1 },
      { appId: "uber",    rank: 2 },
      { appId: "indrive", rank: 3 },
      { appId: "jumia",   rank: 4 },
    ],
  },
  {
    countryIso: "ETH",
    countryName: "Ethiopia",
    centroid: [40.5, 9.1],
    populationM: 123,
    apps: [
      { appId: "jumia",   rank: 1 },
      { appId: "bolt",    rank: 2 },
      { appId: "indrive", rank: 3 },
    ],
  },
  {
    countryIso: "UGA",
    countryName: "Uganda",
    centroid: [32.3, 1.4],
    populationM: 47,
    apps: [
      { appId: "bolt",    rank: 1 },
      { appId: "jumia",   rank: 2 },
      { appId: "mpesa",   rank: 3 },
      { appId: "indrive", rank: 4 },
    ],
  },
  {
    countryIso: "TZA",
    countryName: "Tanzania",
    centroid: [34.9, -6.4],
    populationM: 63,
    apps: [
      { appId: "bolt",    rank: 1 },
      { appId: "mpesa",   rank: 2 },
      { appId: "yango",   rank: 3 },
      { appId: "indrive", rank: 4 },
    ],
  },

  // ── Oceania ──────────────────────────────────────────────────────────────
  {
    countryIso: "AUS",
    countryName: "Australia",
    centroid: [133.8, -25.3],
    populationM: 26,
    apps: [
      { appId: "menulog",    rank: 1 },
      { appId: "doordash",   rank: 2 },
      { appId: "ubereats",   rank: 3 },
      { appId: "uber",       rank: 4 },
      { appId: "deliveroo",  rank: 5 },
      { appId: "netflix",    rank: 6 },
      { appId: "primevideo", rank: 7 },
    ],
  },
  {
    countryIso: "NZL",
    countryName: "New Zealand",
    centroid: [174.9, -40.9],
    populationM: 5,
    apps: [
      { appId: "menulog",  rank: 1 },
      { appId: "uber",     rank: 2 },
      { appId: "doordash", rank: 3 },
    ],
  },
];

export const COUNTRY_BY_ISO: Record<string, CountryAppEntry> = Object.fromEntries(
  COUNTRY_APP_MAP.map((c) => [c.countryIso, c]),
);

export const ALL_COUNTRY_ISO = COUNTRY_APP_MAP.map((c) => c.countryIso);
