# 🎨 Easy Color Theme Customization Guide

## How to Change Colors

All colors are defined as CSS variables in `/src/app/globals.css`. Simply change the values in the `:root` section to instantly update your entire website!

---

## 📍 Where to Edit

Open: `/src/app/globals.css`

Find the `:root` section at the very top (lines 1-50)

---

## 🎨 Current Theme: "Warm Earth"

```css
:root {
  /* Primary Colors (Main Brand) */
  --color-primary: #8B5A2B;           /* Warm terracotta brown */
  --color-primary-dark: #5D3A1A;      /* Rich dark brown */
  --color-primary-light: #C69C6D;     /* Soft camel */
  
  /* Accent Colors (Highlights & CTAs) */
  --color-accent: #D4A574;            /* Warm gold */
  --color-accent-bright: #E8C4A0;     /* Light cream */
  --color-accent-green: #2D5F4E;      /* Forest green */
  --color-accent-green-light: #4A8A70; /* Sage green */
  
  /* Surface Colors (Backgrounds) */
  --color-surface: #FFFAF5;           /* Warm white */
  --color-surface-soft: #FFF8F0;      /* Soft cream */
  --color-surface-muted: #F5F1EB;     /* Muted beige */
  --color-surface-elevated: #FFFFFF;  /* Pure white for cards */
}
```

---

## 🎭 Alternative Color Schemes

### Theme 1: "Royal Blue" (Trust & Professionalism)
```css
:root {
  --color-primary: #1E40AF;           /* Royal blue */
  --color-primary-dark: #1E3A8A;      /* Navy */
  --color-primary-light: #60A5FA;     /* Sky blue */
  
  --color-accent: #F59E0B;            /* Amber */
  --color-accent-bright: #FCD34D;     /* Yellow */
  --color-accent-green: #059669;      /* Emerald */
  --color-accent-green-light: #34D399; /* Light emerald */
  
  --color-surface: #F8FAFC;           /* Cool white */
  --color-surface-soft: #F1F5F9;      /* Light gray */
  --color-surface-muted: #E2E8F0;     /* Medium gray */
  --color-surface-elevated: #FFFFFF;  /* Pure white */
}
```

### Theme 2: "Forest Green" (Nature & Growth)
```css
:root {
  --color-primary: #166534;           /* Forest green */
  --color-primary-dark: #14532D;      /* Dark green */
  --color-primary-light: #4ADE80;     /* Light green */
  
  --color-accent: #EA580C;            /* Rust orange */
  --color-accent-bright: #FB923C;     /* Light orange */
  --color-accent-green: #047857;      /* Teal green */
  --color-accent-green-light: #10B981; /* Mint */
  
  --color-surface: #F9FBF7;           /* Off-white */
  --color-surface-soft: #F0F9F4;      /* Pale green */
  --color-surface-muted: #E5F3EA;     /* Light mint */
  --color-surface-elevated: #FFFFFF;  /* Pure white */
}
```

### Theme 3: "Elegant Purple" (Luxury & Wisdom)
```css
:root {
  --color-primary: #7C3AED;           /* Vibrant purple */
  --color-primary-dark: #5B21B6;      /* Deep purple */
  --color-primary-light: #A78BFA;     /* Lavender */
  
  --color-accent: #EC4899;            /* Hot pink */
  --color-accent-bright: #F472B6;     /* Light pink */
  --color-accent-green: #059669;      /* Emerald */
  --color-accent-green-light: #34D399; /* Mint */
  
  --color-surface: #FAF9FC;           /* Soft white */
  --color-surface-soft: #F5F3FF;      /* Pale purple */
  --color-surface-muted: #EDE9FE;     /* Light lavender */
  --color-surface-elevated: #FFFFFF;  /* Pure white */
}
```

### Theme 4: "Sunset Orange" (Energy & Warmth)
```css
:root {
  --color-primary: #EA580C;           /* Bright orange */
  --color-primary-dark: #C2410C;      /* Dark orange */
  --color-primary-light: #FB923C;     /* Light orange */
  
  --color-accent: #FBBF24;            /* Golden yellow */
  --color-accent-bright: #FDE68A;     /* Cream */
  --color-accent-green: #059669;      /* Emerald */
  --color-accent-green-light: #34D399; /* Mint */
  
  --color-surface: #FFFBF5;           /* Warm white */
  --color-surface-soft: #FFF7ED;      /* Cream */
  --color-surface-muted: #FFEDD5;     /* Peach */
  --color-surface-elevated: #FFFFFF;  /* Pure white */
}
```

### Theme 5: "Ocean Teal" (Calm & Trustworthy)
```css
:root {
  --color-primary: #0F766E;           /* Teal */
  --color-primary-dark: #134E4A;      /* Dark teal */
  --color-primary-light: #5EEAD4;     /* Light teal */
  
  --color-accent: #0891B2;            /* Cyan */
  --color-accent-bright: #67E8F9;     /* Light cyan */
  --color-accent-green: #059669;      /* Green */
  --color-accent-green-light: #34D399; /* Mint */
  
  --color-surface: #F7FCFC;           /* Soft white */
  --color-surface-soft: #F0FDFA;      /* Pale cyan */
  --color-surface-muted: #CCFBF1;     /* Light mint */
  --color-surface-elevated: #FFFFFF;  /* Pure white */
}
```

---

## 🔧 How to Apply a Theme

1. **Open** `/src/app/globals.css`
2. **Scroll** to the `:root` section (top of file)
3. **Replace** the color values with your chosen theme
4. **Save** the file
5. **Refresh** your browser — done! ✨

---

## 🎨 Custom Theme Builder

Want your own colors? Follow this pattern:

```css
:root {
  /* 1. Choose your main brand color */
  --color-primary: #YOUR_COLOR;
  
  /* 2. Make it darker (for hover states) */
  --color-primary-dark: #DARKER_VERSION;
  
  /* 3. Make it lighter (for backgrounds) */
  --color-primary-light: #LIGHTER_VERSION;
  
  /* 4. Pick a complementary accent color */
  --color-accent: #ACCENT_COLOR;
  --color-accent-bright: #LIGHTER_ACCENT;
  
  /* 5. Add a green accent (for nature/success) */
  --color-accent-green: #GREEN_COLOR;
  --color-accent-green-light: #LIGHT_GREEN;
  
  /* 6. Surface colors (usually very light) */
  --color-surface: #FAFAFF;          /* Main background */
  --color-surface-soft: #F5F5FA;      /* Section backgrounds */
  --color-surface-muted: #ECECF5;     /* Muted areas */
  --color-surface-elevated: #FFFFFF;  /* Cards */
}
```

---

## 🎯 Color Theory Tips

### For NGO Websites:
- **Primary**: Trustworthy colors (blues, greens, browns)
- **Accent**: Warm, hopeful colors (golds, oranges, light greens)
- **Surface**: Light, clean backgrounds (off-whites, very pale tints)

### Avoid:
- ❌ Pure black (use dark gray or brown)
- ❌ Neon colors (too harsh)
- ❌ Low contrast (accessibility issue)

### Test Your Colors:
1. **Contrast**: Text must be readable
2. **Accessibility**: Use tools like [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
3. **Colorblind-friendly**: Test with simulators

---

## 📱 Testing Your Theme

After changing colors:

1. Check all pages (Home, About, Projects, etc.)
2. Test on mobile devices
3. View in both light and dim environments
4. Verify button hover states
5. Check card shadows and borders

---

## 💡 Pro Tips

### Quick Color Picker
Use these tools to find colors:
- [Coolors.co](https://coolors.co/) — Color palette generator
- [Adobe Color](https://color.adobe.com/) — Color wheel
- [ColorHunt](https://colorhunt.co/) — Curated palettes

### Save Your Theme
Before changing colors, **copy the current `:root` section** into a text file so you can revert if needed!

### Shadow Colors
The shadow color is automatically derived from `--shadow-color-primary` (RGB values). Update it to match your theme:

```css
--shadow-color-primary: 90, 60, 30;  /* RGB of your primary color */
```

To convert hex to RGB:
- `#8B5A2B` → `139, 90, 43` → `90, 60, 30` (slightly adjusted)

---

## 🚀 Advanced: Seasonal Themes

You can even create multiple theme files and switch between them!

Create `/src/app/themes/`:
- `spring.css` — Pastel greens and pinks
- `summer.css` — Bright blues and yellows
- `autumn.css` — Warm oranges and browns
- `winter.css` — Cool blues and whites

Then import the active theme in `layout.tsx`!

---

## 🐛 Troubleshooting

**Colors not changing?**
1. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
2. Clear cache
3. Check for typos in variable names
4. Ensure colors are valid hex codes

**Colors look washed out?**
- Surface colors might be too similar to primary
- Increase contrast between surface and text

**Buttons hard to read?**
- Check contrast ratio
- Adjust `--color-accent` to be more distinct

---

Happy theming! 🎨✨
