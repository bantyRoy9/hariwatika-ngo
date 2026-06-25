/**
 * LENITY THEME TOKENS — light charity look
 * Shared across all pages. Import from "@/theme/lenity".
 */
export const LENITY = {
  accent: "#F97316",
  accentHover: "#ea670c",
  accentSoft: "#F9731614", // ~8% accent for icon chips / fills
  ink: "#1b1c19",
  muted: "#6b6b6b",
  bg: "#ffffff",
  soft: "#f7f7f5",
  line: "#ececea",
  // reference charity theme additions
  amber: "#f0a830",   // "Our Projects" band background
  red: "#e8542a",     // feature card (Crowdfunding)
  blue: "#3a7bd5",    // feature card (Scholarship)
  dark: "#2b2b2b",    // top utility bar background
} as const;

/** NGO contact info for the top utility bar */
export const CONTACT = {
  address: "Sukanya Utsav Bhawan, Hariwatika Chowk, Bettiah, West Champaran, Bihar",
  phone: "+91 94733 31919",
  hours: "Mon–Sat: 9:00–18:00",
} as const;

export const SERIF = "'Literata', serif";

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
