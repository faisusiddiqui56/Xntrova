# Xntrova Technologies – Homepage Redesign

## 📋 Overview
A complete redesign and rebuild of the Xntrova Technologies homepage using pure HTML, CSS, and JavaScript — no frameworks, no build tools, no unnecessary dependencies. The page is fully responsive, accessible, and optimized for performance and conversion.

## 🔗 Project Structure
```
xntrova-homepage/
├── index.html          # Main homepage (semantic HTML5)
├── css/
│   └── styles.css      # Complete stylesheet (mobile-first responsive)
├── js/
│   └── main.js         # Interactive functionality (vanilla JS)
├── assets/             # Reserved for images/assets
└── README.md           # This file
```

## 🎨 Major Changes & Design Decisions

### 1. **Design Direction: Modern Minimal Premium**
- Moved from the existing Next.js/Tailwind-based layout to a clean, handcrafted HTML/CSS/JS implementation
- Used a refined color palette centered around the existing brand teal (#0075A2) with a modern accent (#00B4D8)
- Applied consistent spacing, typography, and component patterns via CSS custom properties

### 2. **Hero Section: Conversion-Focused Redesign**
- **Before:** Hero had a split layout with inline lead form, which competed for attention
- **After:** Full-width hero with clear headline hierarchy, gradient text treatment, social proof counters, and two prominent CTAs. The lead form is moved to a dedicated Contact section for a cleaner funnel flow
- Added animated scroll indicator and particle-effect background for visual depth

### 3. **Services Section: Card Grid Layout**
- **Before:** Services listed with basic styling
- **After:** 4-column responsive card grid with icon, description, and hover effects (gradient overlay, lift, arrow animation). Dark-themed section creates visual contrast and groups services as a distinct block

### 4. **Why Choose Us: New Section**
- Added a "Why Choose Us" section with 6 differentiators, each with a numbered left-border reveal animation on hover — helps build trust and addresses decision-stage concerns

### 5. **Process Section: Visual Timeline**
- **Before:** No dedicated process section
- **After:** 4-step visual process with numbered indicators, connecting lines (mobile), and clear descriptions. Adapts from vertical list (mobile) → 2-column grid (tablet) → 4-column (desktop)

### 6. **Portfolio / Case Studies: Results-Driven**
- Added results-focused case study cards with quantified metrics (340% sales growth, 5.2x ROAS, etc.) organized by industry — much more persuasive than generic descriptions

### 7. **Testimonial Carousel**
- Full carousel with prev/next buttons, dot indicators, swipe support on mobile, and 5-second autoplay — provides social proof without taking excessive space

### 8. **Contact Section: Improved UX**
- Floating label form with real-time validation, error states, honeypot spam protection, and success feedback
- Contact details (phone, email, address) displayed alongside the form for accessibility

### 9. **Navigation: Responsive & Accessible**
- Desktop: Horizontal nav with active link highlighting based on scroll position, underline hover effects
- Mobile: Hamburger toggle with animated X transition, full-screen menu with smooth slide-down, closes on ESC/outside-click
- Top bar with contact info + social links (desktop only)

### 10. **Performance Improvements**
- Zero external JavaScript dependencies
- Only one external resource: Google Fonts (Inter)
- CSS-only animations where possible (marquee, hover effects, transitions)
- IntersectionObserver for lazy animation triggers (elements only animate when visible)
- Marquee animation paused when off-screen
- `prefers-reduced-motion` media query respected

## 📱 Responsive Breakpoints
| Breakpoint | Layout |
|-----------|--------|
| < 640px   | Mobile: single column, hamburger menu |
| ≥ 640px   | Tablet: 2-column grids, split forms |
| ≥ 1024px  | Desktop: full nav, multi-column grids, side-by-side layouts |
| ≥ 1280px  | Large desktop: wider container |

## ✅ Technical Checklist
- [x] Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- [x] SEO-friendly heading structure (single H1, logical H2-H3 hierarchy)
- [x] Schema.org structured data (Organization, WebSite)
- [x] Open Graph & Twitter Card meta tags
- [x] ARIA attributes (labels, roles, expanded states, live regions)
- [x] Keyboard navigable (focus-visible, ESC to close, tab order)
- [x] `prefers-reduced-motion` support
- [x] Print stylesheet
- [x] BEM-style CSS naming convention
- [x] CSS custom properties for theming
- [x] Mobile-first responsive design
- [x] No unnecessary dependencies (pure HTML/CSS/JS)
- [x] Cross-browser compatible (modern browsers)
- [x] Form validation with honeypot spam protection

## 🛠 Technology Stack
- **HTML5** – Semantic markup
- **CSS3** – Custom properties, Grid, Flexbox, animations, transitions
- **JavaScript (ES6+)** – Vanilla JS with IntersectionObserver, requestAnimationFrame

## 🚀 Getting Started
Simply open `index.html` in a browser. No build step, no server required.

```bash
# Or serve locally:
npx serve .
# or
python -m http.server 8000
```

## 👤 Author
Developed as part of the Xntrova Technologies Web Developer Assessment.

