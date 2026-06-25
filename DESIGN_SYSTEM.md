# Premium Design System — Hariwatika NGO

## 🎨 Design Philosophy

This website embodies a **handcrafted, premium aesthetic** that feels organic, intentional, and trustworthy. Every interaction is designed to feel natural and delightful, avoiding the cookie-cutter patterns of AI-generated interfaces.

---

## Color Palette

### Primary Colors
```
Primary Dark:    #5D3A1A (Rich earth brown)
Primary:         #8B5A2B (Warm terracotta)
Primary Light:   #C69C6D (Soft camel)
```

### Accent Colors
```
Accent:          #D4A574 (Warm gold)
Accent Bright:   #E8C4A0 (Light cream)
Accent Green:    #2D5F4E (Forest green)
Accent Green Lt: #4A8A70 (Sage)
```

### Surface Colors
```
Surface:         #FFFAF5 (Warm white)
Surface Soft:    #FFF8F0 (Soft cream)
Surface Muted:   #F5F1EB (Muted beige)
```

### Text Colors
```
On Surface:      #1A1614 (Near black)
On Surface Var:  #4A423A (Dark gray)
Secondary Text:  #6B5F52 (Medium gray)
```

---

## Typography

### Font Families
- **Display**: 'Cormorant' — Elegant headlines with refined serifs
- **Serif**: 'Literata' — Readable body text with warmth
- **Sans**: 'Plus Jakarta Sans' — Clean, modern UI elements

### Hierarchy
```
H1: clamp(2.5rem, 5vw, 4.5rem) — 700 weight
H2: clamp(2rem, 4vw, 3.25rem) — 600 weight
H3: clamp(1.5rem, 3vw, 2.25rem) — 600 weight
H4: clamp(1.25rem, 2.5vw, 1.75rem) — 600 weight
Body: 1rem — 400 weight, 1.7 line-height
```

### Letter Spacing
- Headlines: -0.025em (tighter, more elegant)
- Body: -0.011em (improved readability)
- Tags: +0.1em (uppercase clarity)

---

## Animation System

### Timing Functions
```css
--ease-smooth:  cubic-bezier(0.4, 0.0, 0.2, 1)
--ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1)
--ease-elegant: cubic-bezier(0.25, 0.46, 0.45, 0.94)
```

### Key Animations

#### 1. **Elegant Reveal**
Elements fade in with blur effect and subtle scale
```
Duration: 0.85s–1.2s
Delay: Staggered 0.15s–0.25s
```

#### 2. **Premium Card Hover**
```
Transform: translateY(-8px)
Shadow: Multi-layer with warm tones
Duration: 0.5s elegant ease
```

#### 3. **Organic Blobs**
```
Movement: Natural 3D path with rotation
Duration: 16s–22s
Easing: ease-in-out
```

#### 4. **Magnetic Buttons**
```
Hover: translateY(-3px) scale(1.05)
Active: translateY(-1px) scale(1.02)
Glow: Radial blur on hover
```

#### 5. **Shimmer Effects**
```
Gradient sweep: 110deg diagonal
Duration: 3s–4s linear
Position: -200% to 200%
```

---

## Component Patterns

### Cards (`.card-premium`)
- **Hover**: Lift 8px with multi-layer shadow
- **Overlay**: Gradient shimmer on hover
- **Border**: Soft outline with accent tint
- **Duration**: 0.5s elegant ease

### Buttons (`.btn-premium`)
- **Shine**: Diagonal light sweep on hover (0.8s)
- **Lift**: 2px translateY on hover
- **Press**: Scale 0.96 on active
- **Shadow**: Warm brown shadows that intensify

### 3D Tilt Cards (`.tilt-card`)
- **Perspective**: 700px
- **Rotation**: rotateY(±14deg), rotateX(±10deg)
- **Scale**: 1.03 on tilt
- **Shine**: Radial follow mouse position

### Progress Bars
- **Animation**: 1.6s elegant fill
- **Glow**: Warm accent shadow
- **Highlight**: Moving shine overlay

---

## Spacing System

```
Section Padding: 100px
Section Gap: 60px
Border Radius: xs(0.375rem) → 2xl(2rem)
```

### Responsive Breakpoints
```
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

---

## Shadows (Premium)

```css
premium-sm: 0 4px 12px rgba(139, 90, 43, 0.08)
premium-md: 0 8px 24px rgba(139, 90, 43, 0.12)
premium-lg: 0 16px 48px rgba(139, 90, 43, 0.15)
premium-xl: 0 24px 64px rgba(139, 90, 43, 0.20)
```

All shadows use warm brown tones (139, 90, 43) instead of pure black for a more organic feel.

---

## Patterns & Textures

### Hex Grid
```
Size: 56px × 100px
Stroke: rgba(212,165,116,0.08)
Weight: 1.5px
```

### Dot Grid
```
Size: 28px × 28px
Dot: 1.5px
Opacity: 0.08
```

### Noise Texture
```
Type: Fractal noise
Frequency: 0.7
Octaves: 5
Opacity: 0.018
```

---

## Parallax Depth Layers

```
depth-1: 12px / 8px  — Subtle movement
depth-2: 26px / 18px — Medium depth
depth-3: 42px / 30px — Dramatic parallax
```

**Transition**: 0.22s → 0.14s (faster for deeper layers)
**Easing**: elegant cubic-bezier

---

## Accessibility

### Focus States
```css
outline: 3px solid var(--color-accent)
outline-offset: 3px
border-radius: var(--radius-xs)
```

### Reduced Motion
- Animations: 0.01ms duration
- Transitions: Disabled
- Parallax: Static
- Blobs: No movement

### High Contrast
- Stronger color values
- 2px borders on cards
- Black text on white

---

## Micro-Interactions

### Scroll Indicator
- Animated line with gradient
- Bounce animation: 2.5s
- Chevron pulse: elegant ease

### Counter Pop
- Spring animation on reveal
- Scale: 1 → 1.22 → 0.98 → 1
- Duration: 0.6s

### Ring Pulse
- Expand from 1 to 2.2x
- Fade opacity 0.7 → 0
- Duration: 3s continuous

### Glow Dot
- Pulsing shadow
- Scale: 1 → 1.25
- Shadow: 6px → 16px spread

---

## Usage Guidelines

### DO:
✅ Use elegant easing for all animations
✅ Stagger reveals for visual hierarchy
✅ Layer shadows for depth perception
✅ Apply subtle blur on entrance animations
✅ Use warm browns for shadows (not black)
✅ Implement parallax sparingly
✅ Test reduced motion support

### DON'T:
❌ Use linear easing for important animations
❌ Reveal everything at once
❌ Use pure black (#000) for shadows
❌ Over-animate (keep it subtle)
❌ Ignore accessibility preferences
❌ Use default browser focus rings
❌ Forget mobile optimization

---

## Performance Optimization

### Will-Change Properties
- Applied only to animating elements
- Removed after animation complete
- Limited to transform, opacity

### Hardware Acceleration
```css
transform: translateZ(0)
backface-visibility: hidden
```

### CSS Containment
```css
contain: layout style paint
```

---

## Browser Support

- **Modern browsers**: Full support
- **Safari**: Webkit prefixes included
- **Firefox**: Scrollbar-width fallback
- **IE11**: Not supported (graceful degradation)

---

## File Structure

```
src/
├── app/
│   ├── globals.css          ← All premium styles
│   ├── layout.tsx           ← Font loading
│   └── page.tsx             ← Hero implementation
├── components/
│   ├── Navbar.tsx           ← Premium nav
│   ├── Footer.tsx           ← Elegant footer
│   └── ...
└── tailwind.config.ts       ← Extended theme
```

---

## Future Enhancements

1. **Dark Mode**: Implement with `prefers-color-scheme`
2. **Custom Cursor**: Magnetic follower effect
3. **Page Transitions**: Smooth route animations
4. **Loading States**: Skeleton screens with shimmer
5. **Scroll Animations**: GSAP integration for advanced effects

---

## Credits

**Design System**: Handcrafted premium NGO aesthetic
**Color Theory**: Warm, earthy, trustworthy palette
**Animation**: Natural physics-based motion
**Typography**: Elegant serif + modern sans pairing
**Accessibility**: WCAG AA compliant
