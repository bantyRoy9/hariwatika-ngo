# 🛠️ Implementation Examples — Premium Components

Quick reference guide for applying the new premium design system to your components.

---

## 📦 Premium Cards

### Basic Card with Hover Effect
```tsx
<div className="card-premium bg-white rounded-xl p-6 border border-outline-variant">
  <h3 className="font-display text-2xl text-on-surface mb-3">
    Vivah Seva
  </h3>
  <p className="text-secondary-text leading-relaxed">
    Supporting marriages for underprivileged families.
  </p>
</div>
```

### 3D Tilt Card
```tsx
function TiltCard({ children }) {
  const ref = useRef(null);
  
  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    el.style.transform = `
      perspective(700px) 
      rotateY(${x * 14}deg) 
      rotateX(${-y * 10}deg) 
      scale3d(1.03, 1.03, 1.03)
    `;
  };
  
  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = '';
    }
  };
  
  return (
    <div
      ref={ref}
      className="tilt-card bg-white rounded-2xl p-6 border border-outline-variant"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-shine" />
      {children}
    </div>
  );
}
```

### Glassmorphism Card
```tsx
<div className="glass-card rounded-2xl p-8">
  <h3 className="font-display text-3xl mb-4">
    Transparent Impact
  </h3>
  <p className="text-on-surface-variant">
    See exactly how your donation makes a difference.
  </p>
</div>
```

---

## 🎯 Premium Buttons

### Primary CTA
```tsx
<button className="btn-premium magnetic-btn bg-primary hover:bg-primary-dark text-white rounded-full px-8 py-4 font-semibold text-base shadow-premium-md transition-all duration-400 ease-elegant">
  Donate Now
  <Heart className="w-5 h-5 fill-current ml-2" />
</button>
```

### Secondary Button
```tsx
<button className="btn-premium magnetic-btn border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-full px-8 py-4 font-semibold transition-all duration-400 ease-elegant">
  Learn More
  <ArrowRight className="w-5 h-5 ml-2" />
</button>
```

### Icon Button
```tsx
<button className="magnetic-btn w-12 h-12 rounded-xl bg-accent/10 hover:bg-accent/20 flex items-center justify-center transition-all duration-300 ease-elegant">
  <Star className="w-5 h-5 text-accent" />
</button>
```

### WhatsApp Button
```tsx
<a
  href="https://wa.me/919473331919"
  className="whatsapp-btn inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold shadow-premium-sm"
>
  <MessageCircle className="w-5 h-5" />
  WhatsApp Us
</a>
```

---

## 📊 Progress Components

### Donation Progress Bar
```tsx
function DonationProgress({ raised, goal }) {
  const percentage = Math.min((raised / goal) * 100, 100);
  
  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm">
        <span className="font-semibold text-on-surface">
          ₹{raised.toLocaleString('en-IN')} raised
        </span>
        <span className="text-secondary-text">
          Goal: ₹{goal.toLocaleString('en-IN')}
        </span>
      </div>
      
      <div className="h-3 bg-surface-muted rounded-full overflow-hidden">
        <div
          className="progress-bar progress-glow h-full rounded-full bg-gradient-to-r from-primary-dark via-accent to-accent-bright"
          style={{ '--progress-width': `${percentage}%` }}
        />
      </div>
      
      <div className="flex items-center gap-2 text-xs text-secondary-text">
        <Users className="w-4 h-4" />
        <span>142 supporters</span>
      </div>
    </div>
  );
}
```

---

## 🎨 Text Effects

### Gradient Heading
```tsx
<h1 className="gradient-text-premium font-display text-6xl font-bold leading-tight">
  Empowering Communities
</h1>
```

### Glowing Text
```tsx
<h2 className="hero-glow-text font-display text-5xl text-white">
  Making a Difference
</h2>
```

### Animated Counter
```tsx
function AnimatedCounter({ target }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let current = 0;
          const increment = target / 50;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setValue(target);
              clearInterval(timer);
            } else {
              setValue(Math.floor(current));
            }
          }, 30);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  
  return (
    <span ref={ref} className="counter-pop font-display text-4xl font-bold text-accent">
      {value.toLocaleString('en-IN')}+
    </span>
  );
}
```

---

## 🎭 Reveal Animations

### Staggered List
```tsx
<div className="space-y-6">
  {items.map((item, index) => (
    <div
      key={item.id}
      className={`reveal-stagger-${Math.min(index + 1, 5)}`}
    >
      <ServiceCard {...item} />
    </div>
  ))}
</div>
```

### Fade-In on Scroll
```tsx
function FadeIn({ children, className = '' }) {
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  
  return (
    <div ref={ref} className={`fade-in-up ${className}`}>
      {children}
    </div>
  );
}

// Usage
<FadeIn>
  <h2>Content appears smoothly</h2>
</FadeIn>
```

---

## 🌊 Parallax Effects

### Hero Background
```tsx
function HeroSection() {
  const bgRef = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        const scrollY = window.scrollY;
        bgRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <section className="relative min-h-screen overflow-hidden">
      <div
        ref={bgRef}
        className="hero-parallax-bg absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-accent"
      />
      
      {/* Content with depth layers */}
      <div className="relative z-10">
        <div className="depth-1">
          <h1>Layer 1 - Subtle</h1>
        </div>
        <div className="depth-2">
          <p>Layer 2 - Medium</p>
        </div>
        <div className="depth-3">
          <button>Layer 3 - Dramatic</button>
        </div>
      </div>
    </section>
  );
}
```

### Floating Decorations
```tsx
<div className="relative">
  {/* Organic floating blob */}
  <div className="absolute top-10 right-10 w-64 h-64 rounded-full hero-blob-1 bg-gradient-radial from-accent/30 to-transparent" />
  
  {/* Floating icon */}
  <div className="float-natural absolute top-20 left-20">
    <Heart className="w-12 h-12 text-accent/40" />
  </div>
  
  {/* Rotating ring */}
  <div className="gradient-ring absolute bottom-20 right-20 w-40 h-40 rounded-full border-2 border-accent/20" />
</div>
```

---

## 🎪 Special Effects

### Shine Sweep Button
```tsx
<button className="shine-sweep relative overflow-hidden bg-primary text-white rounded-full px-8 py-4 font-semibold">
  Hover for Shine
</button>
```

### Pulsing Badge
```tsx
<div className="ring-pulse relative inline-flex items-center gap-2 bg-accent-green text-white rounded-full px-4 py-2">
  <div className="glow-dot w-2 h-2 rounded-full bg-white" />
  <span className="font-semibold">Live Now</span>
</div>
```

### Section Tag
```tsx
<span className="section-tag">
  Our Mission
</span>
```

### Divider
```tsx
<div className="section-divider mx-auto" />
```

---

## 📱 Responsive Patterns

### Mobile-First Card Grid
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {cards.map((card) => (
    <div key={card.id} className="card-premium">
      {/* Content */}
    </div>
  ))}
</div>
```

### Responsive Typography
```tsx
<h1 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
  Responsive Heading
</h1>

<p className="text-sm sm:text-base lg:text-lg text-secondary-text leading-relaxed">
  Responsive body text that scales beautifully.
</p>
```

---

## 🎯 Complete Component Example

### Premium Service Card
```tsx
function ServiceCard({ icon: Icon, title, description, color }) {
  return (
    <FadeIn>
      <TiltCard>
        <div className="shine-sweep">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: `${color}15` }}
          >
            <Icon className="w-7 h-7" style={{ color }} />
          </div>
          
          <h3 className="font-display text-2xl font-semibold text-on-surface mb-3">
            {title}
          </h3>
          
          <p className="text-secondary-text leading-relaxed">
            {description}
          </p>
          
          <button className="magnetic-btn mt-4 inline-flex items-center gap-2 text-primary font-semibold">
            Learn More
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </TiltCard>
    </FadeIn>
  );
}

// Usage
<ServiceCard
  icon={Heart}
  title="Vivah Seva"
  description="Facilitating marriages for underprivileged families"
  color="#8B5A2B"
/>
```

---

## 🎨 Background Patterns

### Hex Grid Section
```tsx
<section className="hex-grid bg-surface py-20">
  <div className="max-w-7xl mx-auto px-6">
    {/* Content */}
  </div>
</section>
```

### Dot Grid Hero
```tsx
<section className="dot-grid bg-gradient-to-br from-primary-dark to-primary py-32">
  <div className="max-w-7xl mx-auto px-6 text-white">
    {/* Content */}
  </div>
</section>
```

### Noise Texture Body
```tsx
<body className="noise-texture bg-surface">
  {children}
</body>
```

---

## ♿ Accessibility Helpers

### Focus Ring
```tsx
<button className="focus:outline-none focus-visible:ring-3 focus-visible:ring-accent focus-visible:ring-offset-2">
  Accessible Button
</button>
```

### Skip to Content
```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded-lg z-50"
>
  Skip to main content
</a>
```

### ARIA Labels
```tsx
<button
  aria-label="Open navigation menu"
  className="magnetic-btn"
>
  <Menu className="w-6 h-6" />
</button>
```

---

## 🚀 Performance Tips

### Lazy Load Heavy Components
```tsx
import dynamic from 'next/dynamic';

const Hero3DCanvas = dynamic(
  () => import('@/components/Hero3DCanvas'),
  {
    ssr: false,
    loading: () => <div className="w-full h-full bg-surface-muted animate-pulse" />
  }
);
```

### Optimize Animations
```tsx
// Use will-change sparingly
<div className="hover:scale-105 [will-change:transform]">
  Optimized Animation
</div>

// Remove after animation
useEffect(() => {
  const el = ref.current;
  el.style.willChange = 'transform';
  
  return () => {
    el.style.willChange = 'auto';
  };
}, []);
```

---

## 📝 Quick Reference

### Color Classes
```tsx
bg-primary / bg-primary-dark / bg-primary-light
bg-accent / bg-accent-bright
bg-surface / bg-surface-soft / bg-surface-muted
text-on-surface / text-on-surface-variant / text-secondary-text
border-outline / border-outline-variant
```

### Shadow Classes
```tsx
shadow-premium-sm / shadow-premium-md
shadow-premium-lg / shadow-premium-xl
shadow-inner-glow
```

### Animation Classes
```tsx
transition-all duration-{300/400/500} ease-elegant
transition-all duration-{300/400/500} ease-spring
transition-all duration-{300/400/500} ease-smooth
```

### Utility Classes
```tsx
card-premium / btn-premium / magnetic-btn
tilt-card / glass-card / shine-sweep
float-natural / hero-blob-{1/2/3}
depth-{1/2/3} / reveal-stagger-{1-5}
fade-in-up / gradient-text-premium
section-tag / section-divider
```

---

**Ready to implement? Start with small components and gradually apply the premium styles across your site!** ✨
