/**
 * LENITY THEME TOKENS
 * Shared across all pages. Import from "@/theme/lenity".
 * Public pages use the warm CRY-inspired palette.
 * Admin uses adminBg/adminSoft/adminInk/adminLine tokens.
 */
export const LENITY = {
  // --- PUBLIC: warm, humanitarian (CRY.org-inspired) ---
  accent:      "#E84523",                   // CRY orange-red
  accentHover: "#c93b1d",
  accentSoft:  "rgba(232,69,35,0.10)",
  ink:         "#1a1a1a",                   // near-black text on white
  muted:       "#6b7280",
  bg:          "#ffffff",
  soft:        "#fdf6f0",                   // warm off-white surface
  line:        "rgba(232,69,35,0.15)",
  yellow:      "#f59e0b",
  yellowSoft:  "rgba(245,158,11,0.12)",
  pink:        "#ec4899",
  pinkSoft:    "rgba(236,72,153,0.12)",
  amber:       "#f59e0b",
  red:         "#E84523",
  blue:        "#2563eb",
  dark:        "#1a1a1a",                   // utility bar background
  // --- ADMIN: dark dashboard with semantic data colors ---
  adminBg:     "#0f1117",
  adminSoft:   "#161b27",
  adminLine:   "rgba(255,255,255,0.08)",
  adminInk:    "#e2e8f0",
  adminMuted:  "#64748b",
  green:       "#22c55e",
  greenSoft:   "rgba(34,197,94,0.12)",
} as const;

/** NGO contact info for the top utility bar */
export const CONTACT = {
  address: "Sukanya Utsav Bhawan, Hariwatika Chowk, Bettiah, West Champaran, Bihar",
  phone: "+91 94733 31919",
  hours: "Mon–Sat: 9:00–18:00",
} as const;

export const SERIF = "'Exo 2', sans-serif";

/** Unsplash hotlinks — community / charity / India themed. Plain <img>, no next.config needed. */
export const IMG = {
  hero:     "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80&auto=format&fit=crop",
  about1:   "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=700&q=80&auto=format&fit=crop",
  about2:   "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=700&q=80&auto=format&fit=crop",
  avatar:   "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=200&q=80&auto=format&fit=crop",
  whatWeDo: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=900&q=80&auto=format&fit=crop",
  community:"https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900&q=80&auto=format&fit=crop",
  children: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=900&q=80&auto=format&fit=crop",
  trees:    "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=900&q=80&auto=format&fit=crop",
  relief:   "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=900&q=80&auto=format&fit=crop",
  // --- Local uploads (Our Helpers & Our Donors) ---
  helpers1: "/images/marriage/marriage2.jpeg",
  helpers2: "/images/marriage/marriage4.jpeg",
  donors1:  "/images/marriage/marriage6.jpeg",
  donors2:  "/images/marriage/marriage7.jpeg",
} as const;
