import type { App } from "@/types";

/**
 * Real apps from public knowledge — not an exhaustive list, curated for
 * regional coverage. Brand colors are from each company's public visual
 * identity. Logos referenced here are generated as monogram SVGs by
 * `scripts/setup.mjs` so the project is self-contained and ships no
 * third-party trademarked imagery.
 *
 * `flagshipForCategory: true` on a single app per category drives the soft
 * pulse animation on the world map — the globally most-used app in its
 * category gets the spotlight.
 */
export const APPS: App[] = [
  // ── North America ────────────────────────────────────────────────────────
  { id: "uber",        name: "Uber",         category: "ride",      logo: "/logos/uber.svg",        color: "#000000", hqCountry: "USA", mark: "Ub", flagshipForCategory: true },
  { id: "lyft",        name: "Lyft",         category: "ride",      logo: "/logos/lyft.svg",        color: "#FF00BF", hqCountry: "USA", mark: "Ly" },
  { id: "doordash",    name: "DoorDash",     category: "food",      logo: "/logos/doordash.svg",    color: "#FF3008", hqCountry: "USA", mark: "Dd", flagshipForCategory: true },
  { id: "ubereats",    name: "Uber Eats",    category: "food",      logo: "/logos/ubereats.svg",    color: "#06C167", hqCountry: "USA", mark: "Ue" },
  { id: "grubhub",     name: "Grubhub",      category: "food",      logo: "/logos/grubhub.svg",     color: "#F63440", hqCountry: "USA", mark: "Gh" },
  { id: "instacart",   name: "Instacart",    category: "grocery",   logo: "/logos/instacart.svg",   color: "#43B02A", hqCountry: "USA", mark: "Ic", flagshipForCategory: true },
  { id: "venmo",       name: "Venmo",        category: "fintech",   logo: "/logos/venmo.svg",       color: "#3D95CE", hqCountry: "USA", mark: "Vn" },
  { id: "cashapp",     name: "Cash App",     category: "fintech",   logo: "/logos/cashapp.svg",     color: "#00C244", hqCountry: "USA", mark: "Ca" },
  { id: "netflix",     name: "Netflix",      category: "streaming", logo: "/logos/netflix.svg",     color: "#E50914", hqCountry: "USA", mark: "Nf", flagshipForCategory: true },

  // ── Latin America ────────────────────────────────────────────────────────
  { id: "rappi",       name: "Rappi",        category: "superapp",  logo: "/logos/rappi.svg",       color: "#FF441F", hqCountry: "COL", mark: "Rp" },
  { id: "ifood",       name: "iFood",        category: "food",      logo: "/logos/ifood.svg",       color: "#EA1D2C", hqCountry: "BRA", mark: "iF" },
  { id: "noventaenove", name: "99",          category: "ride",      logo: "/logos/noventaenove.svg", color: "#FFD300", hqCountry: "BRA", mark: "99" },
  { id: "mercadopago", name: "Mercado Pago", category: "fintech",   logo: "/logos/mercadopago.svg", color: "#00B0EF", hqCountry: "ARG", mark: "MP" },
  { id: "pedidosya",   name: "PedidosYa",    category: "food",      logo: "/logos/pedidosya.svg",   color: "#FA0050", hqCountry: "URY", mark: "PY" },

  // ── Europe ───────────────────────────────────────────────────────────────
  { id: "bolt",        name: "Bolt",         category: "ride",      logo: "/logos/bolt.svg",        color: "#34D186", hqCountry: "EST", mark: "Bo" },
  { id: "deliveroo",   name: "Deliveroo",    category: "food",      logo: "/logos/deliveroo.svg",   color: "#00CCBC", hqCountry: "GBR", mark: "Dr" },
  { id: "justeat",     name: "Just Eat",     category: "food",      logo: "/logos/justeat.svg",     color: "#FF8000", hqCountry: "GBR", mark: "JE" },
  { id: "wolt",        name: "Wolt",         category: "food",      logo: "/logos/wolt.svg",        color: "#009DE0", hqCountry: "FIN", mark: "Wo" },
  { id: "glovo",       name: "Glovo",        category: "food",      logo: "/logos/glovo.svg",       color: "#FFC244", hqCountry: "ESP", mark: "Gl" },
  { id: "revolut",     name: "Revolut",      category: "fintech",   logo: "/logos/revolut.svg",     color: "#0666EB", hqCountry: "GBR", mark: "Rv", flagshipForCategory: true },
  { id: "spotify",     name: "Spotify",      category: "streaming", logo: "/logos/spotify.svg",     color: "#1DB954", hqCountry: "SWE", mark: "Sp" },

  // ── MENA & South Asia ────────────────────────────────────────────────────
  { id: "careem",      name: "Careem",       category: "superapp",  logo: "/logos/careem.svg",      color: "#0EAB5C", hqCountry: "ARE", mark: "Cr" },
  { id: "talabat",     name: "Talabat",      category: "food",      logo: "/logos/talabat.svg",     color: "#FF5A00", hqCountry: "KWT", mark: "Tb" },
  { id: "foodpanda",   name: "Foodpanda",    category: "food",      logo: "/logos/foodpanda.svg",   color: "#D70F64", hqCountry: "DEU", mark: "Fp" },
  { id: "bykea",       name: "Bykea",        category: "courier",   logo: "/logos/bykea.svg",       color: "#00BFA5", hqCountry: "PAK", mark: "Bk", flagshipForCategory: true },
  { id: "zomato",      name: "Zomato",       category: "food",      logo: "/logos/zomato.svg",      color: "#E23744", hqCountry: "IND", mark: "Zm" },
  { id: "pathao",      name: "Pathao",       category: "ride",      logo: "/logos/pathao.svg",      color: "#E83E2C", hqCountry: "BGD", mark: "Ph" },
  { id: "swiggy",      name: "Swiggy",       category: "food",      logo: "/logos/swiggy.svg",      color: "#FC8019", hqCountry: "IND", mark: "Sw" },
  { id: "dunzo",       name: "Dunzo",        category: "courier",   logo: "/logos/dunzo.svg",       color: "#00D290", hqCountry: "IND", mark: "Dz" },
  { id: "phonepe",     name: "PhonePe",      category: "fintech",   logo: "/logos/phonepe.svg",     color: "#5F259F", hqCountry: "IND", mark: "Pp" },
  { id: "paytm",       name: "Paytm",        category: "fintech",   logo: "/logos/paytm.svg",       color: "#00BAF2", hqCountry: "IND", mark: "Pt" },

  // ── East Asia ────────────────────────────────────────────────────────────
  { id: "meituan",     name: "Meituan",      category: "superapp",  logo: "/logos/meituan.svg",     color: "#FFC300", hqCountry: "CHN", mark: "Mt" },
  { id: "didi",        name: "Didi",         category: "ride",      logo: "/logos/didi.svg",        color: "#FF7A00", hqCountry: "CHN", mark: "Dd" },
  { id: "alipay",      name: "Alipay",       category: "fintech",   logo: "/logos/alipay.svg",      color: "#1677FF", hqCountry: "CHN", mark: "Ap" },
  { id: "coupangeats", name: "Coupang Eats", category: "food",      logo: "/logos/coupangeats.svg", color: "#F94B47", hqCountry: "KOR", mark: "Ce" },
  { id: "baemin",      name: "Baemin",       category: "food",      logo: "/logos/baemin.svg",      color: "#2AC1BC", hqCountry: "KOR", mark: "Bm" },
  { id: "kakaot",      name: "Kakao T",      category: "ride",      logo: "/logos/kakaot.svg",      color: "#FEE500", hqCountry: "KOR", mark: "Kt" },
  { id: "lineman",     name: "LINE MAN",     category: "food",      logo: "/logos/lineman.svg",     color: "#0CC95C", hqCountry: "THA", mark: "Lm" },

  // ── Southeast Asia ───────────────────────────────────────────────────────
  { id: "grab",        name: "Grab",         category: "superapp",  logo: "/logos/grab.svg",        color: "#00B14F", hqCountry: "SGP", mark: "Gr", flagshipForCategory: true },
  { id: "gojek",       name: "Gojek",        category: "superapp",  logo: "/logos/gojek.svg",       color: "#00AA13", hqCountry: "IDN", mark: "Gj" },
  { id: "shopeefood",  name: "Shopee Food",  category: "food",      logo: "/logos/shopeefood.svg",  color: "#EE4D2D", hqCountry: "SGP", mark: "Sf" },

  // ── Africa ───────────────────────────────────────────────────────────────
  { id: "jumia",       name: "Jumia",        category: "superapp",  logo: "/logos/jumia.svg",       color: "#F68B1E", hqCountry: "NGA", mark: "Jm" },
  { id: "yango",       name: "Yango",        category: "ride",      logo: "/logos/yango.svg",       color: "#FFCC00", hqCountry: "NLD", mark: "Yg" },
  { id: "chowdeck",    name: "Chowdeck",     category: "food",      logo: "/logos/chowdeck.svg",    color: "#F15B22", hqCountry: "NGA", mark: "Cd" },
  { id: "mpesa",       name: "M-Pesa",       category: "fintech",   logo: "/logos/mpesa.svg",       color: "#EE2C2C", hqCountry: "KEN", mark: "Mp" },

  // ── Oceania ──────────────────────────────────────────────────────────────
  { id: "menulog",     name: "Menulog",      category: "food",      logo: "/logos/menulog.svg",     color: "#FF8000", hqCountry: "AUS", mark: "Ml" },

  // ── Global ride aggregator (added per regional research) ─────────────────
  { id: "indrive",     name: "inDrive",      category: "ride",      logo: "/logos/indrive.svg",     color: "#C1F11D", hqCountry: "USA", mark: "iD" },

  // ── Pakistan (additional fintech rails) ──────────────────────────────────
  { id: "jazzcash",    name: "JazzCash",     category: "fintech",   logo: "/logos/jazzcash.svg",    color: "#E5202E", hqCountry: "PAK", mark: "JC" },
  { id: "easypaisa",   name: "Easypaisa",    category: "fintech",   logo: "/logos/easypaisa.svg",   color: "#15B473", hqCountry: "PAK", mark: "Ep" },

  // ── India (additional ride / streaming) ──────────────────────────────────
  { id: "ola",         name: "Ola",          category: "ride",      logo: "/logos/ola.svg",         color: "#B6DC03", hqCountry: "IND", mark: "Ol" },
  { id: "hotstar",     name: "Hotstar",      category: "streaming", logo: "/logos/hotstar.svg",     color: "#0F1B2C", hqCountry: "IND", mark: "Hs" },
  { id: "jiocinema",   name: "JioCinema",    category: "streaming", logo: "/logos/jiocinema.svg",   color: "#0048FF", hqCountry: "IND", mark: "Jc" },

  // ── China (additional food / fintech) ───────────────────────────────────
  { id: "elema",       name: "Ele.me",       category: "food",      logo: "/logos/elema.svg",       color: "#0085FF", hqCountry: "CHN", mark: "El" },
  { id: "wechatpay",   name: "WeChat Pay",   category: "fintech",   logo: "/logos/wechatpay.svg",   color: "#7BB32E", hqCountry: "CHN", mark: "WP" },

  // ── Russia / CIS (additional food / ride) ────────────────────────────────
  { id: "yandexgo",    name: "Yandex Go",    category: "ride",      logo: "/logos/yandexgo.svg",    color: "#FFCC00", hqCountry: "RUS", mark: "YG" },
  { id: "yandexeda",   name: "Yandex Eda",   category: "food",      logo: "/logos/yandexeda.svg",   color: "#FC3F1D", hqCountry: "RUS", mark: "Ye" },

  // ── Korea (additional food / fintech) ────────────────────────────────────
  { id: "yogiyo",      name: "Yogiyo",       category: "food",      logo: "/logos/yogiyo.svg",      color: "#FA0050", hqCountry: "KOR", mark: "Yo" },
  { id: "toss",        name: "Toss",         category: "fintech",   logo: "/logos/toss.svg",        color: "#0064FF", hqCountry: "KOR", mark: "Ts" },

  // ── Indonesia (additional fintech) ───────────────────────────────────────
  { id: "gopay",       name: "GoPay",        category: "fintech",   logo: "/logos/gopay.svg",       color: "#0096DC", hqCountry: "IDN", mark: "GP" },
  { id: "ovo",         name: "OVO",          category: "fintech",   logo: "/logos/ovo.svg",         color: "#4C2A86", hqCountry: "IDN", mark: "Ov" },

  // ── Bangladesh (mobile money) ────────────────────────────────────────────
  { id: "bkash",       name: "bKash",        category: "fintech",   logo: "/logos/bkash.svg",       color: "#E2136E", hqCountry: "BGD", mark: "bK" },

  // ── Saudi Arabia (food) ──────────────────────────────────────────────────
  { id: "hungerstation", name: "HungerStation", category: "food",   logo: "/logos/hungerstation.svg", color: "#FFAA00", hqCountry: "SAU", mark: "Hu" },

  // ── Türkiye (food) ───────────────────────────────────────────────────────
  { id: "yemeksepeti", name: "Yemeksepeti",  category: "food",      logo: "/logos/yemeksepeti.svg", color: "#FA0050", hqCountry: "TUR", mark: "Ym" },

  // ── Nigeria (fintech) ────────────────────────────────────────────────────
  { id: "opay",        name: "OPay",         category: "fintech",   logo: "/logos/opay.svg",        color: "#0F8E32", hqCountry: "NGA", mark: "Op" },

  // ── International streaming (curated) ────────────────────────────────────
  { id: "disneyplus",  name: "Disney+",      category: "streaming", logo: "/logos/disneyplus.svg",  color: "#0E2E6E", hqCountry: "USA", mark: "D+" },
  { id: "primevideo",  name: "Prime Video",  category: "streaming", logo: "/logos/primevideo.svg",  color: "#00A8E1", hqCountry: "USA", mark: "PV" },
];

export const APP_BY_ID: Record<string, App> = Object.fromEntries(
  APPS.map((a) => [a.id, a]),
);
