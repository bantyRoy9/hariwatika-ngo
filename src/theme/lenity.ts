/**
 * LENITY THEME TOKENS — light charity look
 * Shared across all pages. Import from "@/theme/lenity".
 */
export const LENITY = {
  // CYBERPUNK dark theme — neon on near-black (token names unchanged so pages recolor for free)
  accent: "#63d2ff",                    // neon cyan
  accentHover: "#00b4d8",
  accentSoft: "rgba(99,210,255,0.12)",  // cyan wash for chips/fills
  ink: "#e8f4ff",                       // light text (was near-black; now flips on dark bg)
  muted: "#7a8fad",
  bg: "#050818",                        // near-black base
  soft: "#090d1f",                      // slightly raised surface
  line: "rgba(99,210,255,0.12)",        // translucent cyan border
  // accent / wash tokens (re-themed)
  yellow: "#63d2ff",                    // cyan (was brand yellow)
  yellowSoft: "rgba(99,210,255,0.15)",  // cyan watercolor wash
  pink: "#b57bff",                      // neon purple (was pink wash)
  pinkSoft: "rgba(181,123,255,0.15)",
  amber: "#ffcc44",
  red: "#ff5555",
  blue: "#63d2ff",
  dark: "#050818",                      // top utility bar background
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
} as const;
