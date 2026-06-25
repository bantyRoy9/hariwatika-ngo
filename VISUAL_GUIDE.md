# 🎨 Visual Style Guide — Premium Design System

A visual reference for the premium design elements implemented in your NGO website.

---

## 🌈 Color Swatches

### Primary Palette
```
┌─────────────────────────────────────────────┐
│ Primary Dark    #5D3A1A  ████████████       │
│ Primary         #8B5A2B  ████████████       │
│ Primary Light   #C69C6D  ████████████       │
└─────────────────────────────────────────────┘
Rich, warm earth tones that convey trust and stability
```

### Accent Colors
```
┌─────────────────────────────────────────────┐
│ Accent          #D4A574  ████████████       │
│ Accent Bright   #E8C4A0  ████████████       │
│ Accent Green    #2D5F4E  ████████████       │
│ Accent Green Lt #4A8A70  ████████████       │
└─────────────────────────────────────────────┘
Warm gold and sage green for highlights and CTAs
```

### Surface & Text
```
┌─────────────────────────────────────────────┐
│ Surface         #FFFAF5  ████████████       │
│ Surface Soft    #FFF8F0  ████████████       │
│ Surface Muted   #F5F1EB  ████████████       │
│ On Surface      #1A1614  ████████████       │
│ Secondary Text  #6B5F52  ████████████       │
└─────────────────────────────────────────────┘
Warm whites and grays for backgrounds and readability
```

---

## 🔤 Typography Showcase

### Display Font (Cormorant)
```
Aa Bb Cc Dd Ee Ff Gg
EMPOWERING COMMUNITIES
हरिवाटिका शिव मंदिर

Weight: 300, 400, 500, 600, 700
Use: Hero headlines, major headings
Character: Elegant, refined, trustworthy
```

### Serif Font (Literata)
```
Aa Bb Cc Dd Ee Ff Gg
Making a Difference Since 2000
विवाह सेवा समिति

Weight: 300, 400, 500, 600, 700
Use: Subheadings, body emphasis
Character: Warm, readable, approachable
```

### Sans Font (Plus Jakarta Sans)
```
Aa Bb Cc Dd Ee Ff Gg
Read More • Learn More • Donate Now
होम • परियोजनाएं • संपर्क

Weight: 300, 400, 500, 600, 700, 800
Use: UI elements, buttons, nav
Character: Clean, modern, friendly
```

---

## 📐 Spacing Scale

```
┌──────────────────────────────────────────────────┐
│ 4px   ▓                                          │
│ 8px   ▓▓                                         │
│ 12px  ▓▓▓                                        │
│ 16px  ▓▓▓▓                                       │
│ 24px  ▓▓▓▓▓▓                                     │
│ 32px  ▓▓▓▓▓▓▓▓                                   │
│ 48px  ▓▓▓▓▓▓▓▓▓▓▓▓                               │
│ 64px  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                           │
│ 100px ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                 │
└──────────────────────────────────────────────────┘
```

### Usage
- **4-8px**: Icon spacing, inline elements
- **12-16px**: Text margins, button padding
- **24-32px**: Card padding, section gaps
- **48-64px**: Component spacing
- **100px**: Section padding (desktop)

---

## 🎭 Shadow Depths

### Premium Shadow Sm
```
╔═══════════════════════╗
║                       ║  Elevation: 4px
║   Subtle Card         ║  Blur: 12px
║                       ║  Opacity: 8%
╚═══════════════════════╝
     ▒▒▒▒▒▒▒▒▒▒▒
```

### Premium Shadow Md
```
╔═══════════════════════╗
║                       ║  Elevation: 8px
║   Raised Card         ║  Blur: 24px
║                       ║  Opacity: 12%
╚═══════════════════════╝
      ▒▒▒▒▒▒▒▒▒▒▒▒
```

### Premium Shadow Lg
```
╔═══════════════════════╗
║                       ║  Elevation: 16px
║   Floating Card       ║  Blur: 48px
║                       ║  Opacity: 15%
╚═══════════════════════╝
       ▒▒▒▒▒▒▒▒▒▒▒▒▒▒
```

### Premium Shadow Xl
```
╔═══════════════════════╗
║                       ║  Elevation: 24px
║   Hero Card           ║  Blur: 64px
║                       ║  Opacity: 20%
╚═══════════════════════╝
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
```

All shadows use warm brown: `rgba(139, 90, 43, α)`

---

## 🔘 Border Radius Scale

```
┌───┐     ┌────┐     ┌─────┐     ┌──────┐
│XS │     │ SM │     │ MD  │     │  LG  │
└───┘     └────┘     └─────┘     └──────┘
0.375rem  0.625rem   0.875rem    1.125rem

┌───────┐     ┌────────┐     ╭─────────╮
│  XL   │     │  2XL   │     │  FULL   │
└───────┘     └────────┘     ╰─────────╯
1.5rem        2rem           9999px
```

### Usage
- **XS-SM**: Buttons, tags, small elements
- **MD-LG**: Cards, inputs, containers
- **XL-2XL**: Hero cards, featured elements
- **FULL**: Pills, badges, avatar

---

## ✨ Animation Timeline

### Entrance Sequence (Hero)
```
Time: 0s ─────────────────────────────────────► 2s

Badge    ██████                                    [0.1s]
Title         ███████                              [0.3s]
Subtitle           ███████                         [0.5s]
Buttons                 ████████                   [0.7s]
Stats                        ████████              [0.9s]
Scroll                            ████████         [1.3s]

Effect: Fade + Blur + Scale
Easing: elegant cubic-bezier
```

### Staggered List
```
Item 1   ████         [0.10s delay]
Item 2      ████      [0.25s delay]
Item 3         ████   [0.40s delay]
Item 4            ████ [0.55s delay]

Each: 0.9s duration
Gap: 0.15s stagger
```

### Button Interaction
```
Rest → Hover → Active
  │      │       │
  │      ├─ Lift 3px (0.35s)
  │      ├─ Scale 1.05
  │      └─ Glow effect
  │
  └─── Press scale 0.96 (0.1s)
```

---

## 🎨 Gradient Patterns

### Primary Gradient
```
┌────────────────────────────────────────┐
│ ▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░    │
│ #5D3A1A → #8B5A2B → #C69C6D           │
└────────────────────────────────────────┘
Dark → Mid → Light (135deg)
```

### Accent Gradient
```
┌────────────────────────────────────────┐
│ ░░░░░░░▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░          │
│ #8B5A2B → #D4A574 → #E8C4A0           │
└────────────────────────────────────────┘
Primary → Accent → Bright (135deg)
```

### Progress Gradient
```
┌────────────────────────────────────────┐
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░         │
│ #5D3A1A → #D4A574 → #E8C4A0           │
└────────────────────────────────────────┘
Dark → Gold → Cream (90deg)
```

---

## 🎪 Pattern Samples

### Hex Grid
```
   ⬡   ⬡   ⬡   ⬡   ⬡
 ⬡   ⬡   ⬡   ⬡   ⬡   ⬡
   ⬡   ⬡   ⬡   ⬡   ⬡
 ⬡   ⬡   ⬡   ⬡   ⬡   ⬡

56×100px repeat
Stroke: #D4A574 @ 8% opacity
Width: 1.5px
```

### Dot Grid
```
·  ·  ·  ·  ·  ·  ·  ·
·  ·  ·  ·  ·  ·  ·  ·
·  ·  ·  ·  ·  ·  ·  ·
·  ·  ·  ·  ·  ·  ·  ·

28×28px repeat
Dot: 1.5px circle
Opacity: 8%
```

### Noise Texture
```
░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒
▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░
▓█▓▒░▒▓█▓▒░▒▓█▓▒░▒

Fractal noise
Frequency: 0.7
Octaves: 5
Opacity: 1.8%
```

---

## 🎯 Component States

### Button States
```
Rest     ┌──────────────┐
         │ Donate Now   │
         └──────────────┘

Hover    ┌──────────────┐  ↑ 3px
         │ Donate Now   │  ◉ Scale 1.05
         └──────────────┘  ✧ Glow
            ▒▒▒▒▒▒▒▒

Active   ┌──────────────┐  ↓ -1px
         │ Donate Now   │  ◉ Scale 1.02
         └──────────────┘
```

### Card States
```
Rest     ╔══════════════╗
         ║  Content     ║
         ║              ║
         ╚══════════════╝

Hover    ╔══════════════╗  ↑ 8px
         ║  Content     ║  ✧ Shine
         ║              ║  ▒ Shadow
         ╚══════════════╝
            ▒▒▒▒▒▒▒▒▒▒
```

### Input States
```
Default  ┌──────────────────┐
         │ Enter email...   │
         └──────────────────┘

Focus    ┌──────────────────┐
         │ user@example.com │◄─ 3px accent
         └──────────────────┘

Error    ┌──────────────────┐
         │ Invalid email    │◄─ 3px red
         └──────────────────┘
```

---

## 🎨 3D Effects

### Tilt Card Perspective
```
         Normal View
    ┌────────────────┐
    │                │
    │    Content     │
    │                │
    └────────────────┘

      Tilted Left           Tilted Right
  ╱────────────────╲    ╱────────────────╲
 ╱                  ╲  ╱                  ╲
│      Content       ││      Content       │
 ╲                  ╱  ╲                  ╱
  ╲────────────────╱    ╲────────────────╱

Rotation: ±14deg Y-axis, ±10deg X-axis
Scale: 1.03 on tilt
```

### Parallax Depths
```
Layer 3 (Front)  ████████  42px movement
Layer 2 (Mid)       ████   26px movement
Layer 1 (Back)        ██   12px movement
Background            ▓    Static

Mouse: 0% ────────────────── 100%
```

---

## 📱 Responsive Breakpoints

```
Mobile         Tablet        Desktop       Wide
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━►
0px          640px        1024px       1536px
 │            │            │            │
 sm           md           lg           xl/2xl

Stack        2-column     3-column     4-column
Single       Sidebar      Grid         Wide Grid
```

---

## ✨ Special Effects Preview

### Shimmer Effect
```
Frame 1:  █▓▒░░░░░░░░  
Frame 2:  ░█▓▒░░░░░░░  
Frame 3:  ░░█▓▒░░░░░░  
Frame 4:  ░░░█▓▒░░░░░  
Frame 5:  ░░░░█▓▒░░░░  

Duration: 3s
Direction: →
Gradient: transparent → white → transparent
```

### Glow Pulse
```
Frame 1:  ◉ Small glow
          ▒

Frame 2:  ◉ Growing
          ▒▒▒

Frame 3:  ◉ Maximum
          ▒▒▒▒▒

Frame 4:  ◉ Shrinking
          ▒▒▒

Frame 5:  ◉ Small glow
          ▒

Duration: 2.5s
Shadow: 6px → 16px spread
```

### Ring Pulse
```
Frame 1:  ⬤ 
          ◯

Frame 2:  ⬤ 
           ◯

Frame 3:  ⬤ 
            ◯  (fading)

Frame 4:  ⬤ 
             ◯  (disappeared)

Duration: 3s
Scale: 1 → 2.2
Opacity: 0.7 → 0
```

---

## 🎨 Icon System

### Icon Sizes
```
xs    ▢  12×12px  — Inline indicators
sm    ▢  16×16px  — Text supplements
md    ▢  20×20px  — Buttons, nav
lg    ▢  24×24px  — Feature highlights
xl    ▢  32×32px  — Section headers
2xl   ▢  48×48px  — Hero elements
```

### Icon Style
- **Library**: Lucide React
- **Stroke**: 2px (standard)
- **Corners**: Rounded
- **Fill**: Sparingly (hearts, stars)

---

## 🎯 Layout Grid

### Desktop Grid (1440px)
```
┌───┬─────────────────────────────────┬───┐
│ 4 │                                 │ 4 │ rem
├───┼─────────────────────────────────┼───┤
│   │  Max-width: 1280px (7xl)        │   │
│   │  ┌───┬───┬───┬───┐              │   │
│   │  │ 1 │ 2 │ 3 │ 4 │ 4-column     │   │
│   │  └───┴───┴───┴───┘              │   │
│   │                                 │   │
└───┴─────────────────────────────────┴───┘

Columns: 4 (desktop), 3 (tablet), 2 (mobile)
Gap: 1.5rem (24px)
```

---

## 🌈 Color Usage Guidelines

### Do's ✅
```
Primary       → Buttons, links, key actions
Accent        → Highlights, badges, CTAs
Surface       → Backgrounds, cards
On Surface    → Body text, headings
Accent Green  → Success states, nature
```

### Don'ts ❌
```
Primary Dark  ✗ Not for text on light bg
Accent Bright ✗ Not for body text
Surface Muted ✗ Not for important content
On Surface    ✗ Not for backgrounds
```

---

## 📐 Component Sizing

### Buttons
```
Small    px-4 py-2   text-sm   h-9
Medium   px-6 py-3   text-base h-11
Large    px-8 py-4   text-lg   h-14
```

### Cards
```
Compact  p-4   min-h-32
Standard p-6   min-h-48
Feature  p-8   min-h-64
Hero     p-12  min-h-96
```

### Inputs
```
Small    px-3 py-2   text-sm   h-9
Medium   px-4 py-2.5 text-base h-11
Large    px-5 py-3   text-lg   h-14
```

---

**This visual guide provides a reference for all design elements. Use it to maintain consistency across the site!** 🎨
